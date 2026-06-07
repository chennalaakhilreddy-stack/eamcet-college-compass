import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useExam } from '@/hooks/useExam'
import type { College, BranchData } from '@/data/colleges'
import type { CategoryOption } from '@/data/examTypes'
import SearchableDropdown from '@/components/ui/SearchableDropdown'
import { Building2, Star, MapPin, DollarSign, Heart, TrendingUp, Filter, Search, ChevronDown, BookOpen, Trophy } from 'lucide-react'
import clsx from 'clsx'

// ─── Types ───────────────────────────────────────────────────────────────────

type Bucket = 'DREAM' | 'MODERATE' | 'SAFE'
type Gender = 'Male' | 'Female' | 'Any'

interface PredictionResult {
  college: College
  branch: BranchData
  cutoff2025: number
  bucket: Bucket
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BUCKET_CONFIG: Record<
  Bucket,
  { label: string; desc: string; color: string; badge: string; ring: string; dot: string }
> = {
  DREAM: {
    label: 'Dream Colleges',
    desc: 'Highly competitive — requires significant rank improvement',
    color: 'bg-purple-500/10 border-purple-500/20',
    badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    ring: 'ring-purple-500/20',
    dot: 'bg-purple-400',
  },
  MODERATE: {
    label: 'Good Chance',
    desc: 'Competitive — your rank is right at the cutoff zone',
    color: 'bg-blue-500/10 border-blue-500/20',
    badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    ring: 'ring-blue-500/20',
    dot: 'bg-blue-400',
  },
  SAFE: {
    label: 'Safe Colleges',
    desc: 'Very likely — strong chance of admission',
    color: 'bg-emerald-500/10 border-emerald-500/20',
    badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    ring: 'ring-emerald-500/20',
    dot: 'bg-emerald-400',
  },
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

function formatFees(fees: number): string {
  if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L`
  if (fees >= 1000) return `₹${(fees / 1000).toFixed(0)}K`
  return `₹${fees}`
}

function formatRank(rank: number): string {
  return rank.toLocaleString('en-IN')
}

function getTypeStyle(type: College['type']): string {
  switch (type) {
    case 'Government': return 'bg-emerald-500/15 text-emerald-400'
    case 'Autonomous': return 'bg-blue-500/15 text-blue-400'
    case 'Deemed': return 'bg-purple-500/15 text-purple-400'
    default: return 'bg-dark-700/80 text-dark-400'
  }
}

function branchMatchesFilter(branch: BranchData, selectedBranches: string[]): boolean {
  if (selectedBranches.length === 0) return true
  const nameLower = branch.name.toLowerCase()
  return selectedBranches.some(id => {
    switch (id) {
      case 'cse': return nameLower === 'cse' || nameLower === 'computer science & engineering' || nameLower === 'computer science and engineering'
      case 'cse_aiml': case 'csai': return nameLower.includes('ai') && (nameLower.includes('ml') || nameLower.includes('artificial'))
      case 'cse_ds': case 'csd': return nameLower.includes('data science') || nameLower.includes('design')
      case 'cse_cs': return nameLower.includes('cyber')
      case 'it': return nameLower === 'it' || nameLower === 'information technology'
      case 'ece': return nameLower === 'ece' || nameLower.includes('electronics')
      case 'eee': return nameLower === 'eee' || (nameLower.includes('electrical') && nameLower.includes('electronics'))
      case 'mech': return nameLower === 'mech' || nameLower.includes('mechanical')
      case 'civil': return nameLower === 'civil'
      default: return false
    }
  })
}

// ─── Prediction Logic ─────────────────────────────────────────────────────────

function runPrediction(
  rank: number,
  category: string,
  selectedBranches: string[],
  colleges: College[],
): PredictionResult[] {
  const results: PredictionResult[] = []

  for (const college of colleges) {
    for (const branch of college.branches) {
      // Filter by branch preference
      if (!branchMatchesFilter(branch, selectedBranches)) continue

      // Get cutoff for selected category
      const categoryCutoffs = branch.cutoffs[category]
      if (!categoryCutoffs) continue

      const cutoff2025 = categoryCutoffs['2025']
      if (!cutoff2025 || cutoff2025 <= 0) continue

      // Classify bucket
      let bucket: Bucket | null = null
      if (rank <= Math.round(cutoff2025 * 0.85)) {
        bucket = 'DREAM'
      } else if (rank <= cutoff2025) {
        bucket = 'MODERATE'
      } else if (rank <= Math.round(cutoff2025 * 1.3)) {
        bucket = 'SAFE'
      }

      if (bucket) {
        results.push({ college, branch, cutoff2025, bucket })
      }
    }
  }

  // Sort: DREAM → MODERATE → SAFE, then by college ranking within each bucket
  const bucketOrder: Record<Bucket, number> = { DREAM: 0, MODERATE: 1, SAFE: 2 }
  results.sort((a, b) => {
    const bucketDiff = bucketOrder[a.bucket] - bucketOrder[b.bucket]
    if (bucketDiff !== 0) return bucketDiff
    return a.college.ranking - b.college.ranking
  })

  return results
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={clsx(
            'w-3 h-3',
            i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-dark-600'
          )}
        />
      ))}
      <span className="text-xs text-dark-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

function ResultCard({ result, isSaved, onToggleSave }: {
  result: PredictionResult
  isSaved: boolean
  onToggleSave: () => void
}) {
  const { college, branch, cutoff2025, bucket } = result
  const cfg = BUCKET_CONFIG[bucket]

  return (
    <div className={clsx(
      'card p-0 overflow-hidden transition-all duration-200 hover:border-dark-500',
      'hover:shadow-lg hover:shadow-black/20'
    )}>
      {/* Bucket accent strip */}
      <div className={clsx('h-0.5 w-full', cfg.dot)} />

      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          {/* College Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-dark-800 border border-dark-700 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-dark-400" />
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            {/* Top row */}
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className={clsx('badge text-[10px] font-bold uppercase tracking-wider', cfg.badge)}>
                    {bucket}
                  </span>
                  <span className={clsx('badge text-[10px]', getTypeStyle(college.type))}>
                    {college.type}
                  </span>
                  <span className="badge bg-dark-800 text-dark-400 text-[10px]">
                    #{college.ranking}
                  </span>
                </div>
                <Link
                  to={`/dashboard/colleges/${college.id}`}
                  className="block font-semibold text-dark-100 hover:text-brand-400 transition-colors text-sm sm:text-base leading-snug"
                >
                  {college.name}
                </Link>
                <p className="text-xs text-dark-500 mt-0.5">{college.shortName}</p>
              </div>

              {/* Save button */}
              <button
                onClick={onToggleSave}
                aria-label={isSaved ? 'Remove from favourites' : 'Save to favourites'}
                className={clsx(
                  'flex-shrink-0 p-2 rounded-xl border transition-all duration-200 hover:scale-110 active:scale-95',
                  isSaved
                    ? 'bg-red-500/15 border-red-500/30 text-red-400 hover:bg-red-500/25'
                    : 'bg-dark-800 border-dark-700 text-dark-500 hover:text-red-400 hover:border-red-500/30'
                )}
              >
                <Heart className={clsx('w-4 h-4', isSaved && 'fill-red-400')} />
              </button>
            </div>

            {/* Branch name */}
            <div className="flex items-center gap-1.5 mt-2">
              <BookOpen className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
              <span className="text-sm font-medium text-brand-300">{branch.name}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-3 h-3 text-dark-500 flex-shrink-0" />
              <span className="text-xs text-dark-500">{college.location}</span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-dark-800">
              {/* Cutoff */}
              <div>
                <p className="text-[10px] text-dark-500 uppercase tracking-wider mb-0.5">2025 Cutoff</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-orange-400" />
                  <span className="text-sm font-semibold text-dark-100">{formatRank(cutoff2025)}</span>
                </div>
              </div>

              {/* Fees */}
              <div>
                <p className="text-[10px] text-dark-500 uppercase tracking-wider mb-0.5">Fees / Year</p>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-green-400" />
                  <span className="text-sm font-semibold text-dark-100">{formatFees(branch.fees)}</span>
                </div>
              </div>

              {/* Placement Rating */}
              <div>
                <p className="text-[10px] text-dark-500 uppercase tracking-wider mb-0.5">Placement</p>
                <StarRating rating={college.placementRating} />
              </div>

              {/* Avg Package */}
              <div>
                <p className="text-[10px] text-dark-500 uppercase tracking-wider mb-0.5">Avg Package</p>
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  <span className="text-sm font-semibold text-dark-100">₹{college.avgPackage} LPA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer link */}
        <div className="flex justify-end mt-3 pt-2 border-t border-dark-800/60">
          <Link
            to={`/dashboard/colleges/${college.id}`}
            className="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors flex items-center gap-1"
          >
            View full details →
          </Link>
        </div>
      </div>
    </div>
  )
}

function BucketSection({
  bucket,
  results,
  isCollegeSaved,
  onToggleSave,
}: {
  bucket: Bucket
  results: PredictionResult[]
  isCollegeSaved: (id: string) => boolean
  onToggleSave: (collegeId: string) => void
}) {
  if (results.length === 0) return null
  const cfg = BUCKET_CONFIG[bucket]

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className={clsx('rounded-xl border p-3 flex items-center justify-between', cfg.color)}>
        <div className="flex items-center gap-2.5">
          <div className={clsx('w-2 h-2 rounded-full', cfg.dot)} />
          <div>
            <h3 className="font-semibold text-dark-100 text-sm">{cfg.label}</h3>
            <p className="text-xs text-dark-500">{cfg.desc}</p>
          </div>
        </div>
        <span className={clsx('badge text-xs font-bold', cfg.badge)}>
          {results.length} {results.length === 1 ? 'college' : 'colleges'}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-3 pl-0">
        {results.map(result => (
          <ResultCard
            key={`${result.college.id}-${result.branch.id}`}
            result={result}
            isSaved={isCollegeSaved(result.college.id)}
            onToggleSave={() => onToggleSave(result.college.id)}
          />
        ))}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="card p-5">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-dark-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-dark-800 rounded w-3/4" />
              <div className="h-3 bg-dark-800 rounded w-1/2" />
              <div className="h-3 bg-dark-800 rounded w-1/3" />
              <div className="flex gap-4 mt-3">
                {[1, 2, 3, 4].map(j => (
                  <div key={j} className="h-8 bg-dark-800 rounded flex-1" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CollegePredictor() {
  const { saveCollege, removeCollege, isCollegeSaved } = useAuth()
  const { examConfig, colleges, categories } = useExam()

  const allBranches = examConfig.branches.map(b => ({ id: b.id, label: b.shortName }))

  // Form state
  const [rank, setRank] = useState<string>('')
  const [category, setCategory] = useState<string>(categories[0]?.value ?? 'OC')
  const [gender, setGender] = useState<Gender>('Any')
  const [selectedBranches, setSelectedBranches] = useState<string[]>([])
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false)

  // Result state
  const [results, setResults] = useState<PredictionResult[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchRank, setSearchRank] = useState<number | null>(null)

  const handleBranchToggle = (id: string) => {
    setSelectedBranches(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    )
  }

  const handleBranchSelectAll = () => setSelectedBranches([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const rankNum = parseInt(rank, 10)
    if (isNaN(rankNum) || rankNum < 1 || rankNum > 200000) return

    setIsLoading(true)
    setHasSearched(true)
    setSearchRank(rankNum)

    // Small delay for loading effect
    setTimeout(() => {
      const prediction = runPrediction(rankNum, category, selectedBranches, colleges)
      setResults(prediction)
      setIsLoading(false)
    }, 600)
  }

  const handleToggleSave = (collegeId: string) => {
    if (isCollegeSaved(collegeId)) {
      removeCollege(collegeId)
    } else {
      saveCollege(collegeId)
    }
  }

  // Group results
  const dreamResults = results?.filter(r => r.bucket === 'DREAM') ?? []
  const moderateResults = results?.filter(r => r.bucket === 'MODERATE') ?? []
  const safeResults = results?.filter(r => r.bucket === 'SAFE') ?? []

  const branchLabel = selectedBranches.length === 0
    ? 'All Branches'
    : selectedBranches.length === 1
      ? allBranches.find(b => b.id === selectedBranches[0])?.label ?? '1 selected'
      : `${selectedBranches.length} branches`

  // Find category label
  const selectedCategoryLabel = categories.find(c => c.value === category)?.label ?? category

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 bg-brand-500 rounded flex items-center justify-center">
            <Building2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">{examConfig.name} {examConfig.currentYear}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-dark-100">College Predictor</h1>
        <p className="text-dark-400 mt-1 text-sm">
          Enter your rank and category to discover colleges you're likely to get admission to.
        </p>
      </div>

      {/* Layout: Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ─── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-6">
          <form onSubmit={handleSubmit} className="card p-5 space-y-5">
            {/* Filter header */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-400" />
              <h2 className="font-semibold text-dark-200 text-sm">Filter & Predict</h2>
            </div>

            {/* Rank Input */}
            <div>
              <label className="label" htmlFor="rank-input">
                Your {examConfig.name} Rank
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  id="rank-input"
                  type="number"
                  min={1}
                  max={200000}
                  value={rank}
                  onChange={e => setRank(e.target.value)}
                  placeholder="e.g. 5000"
                  className="input pl-9 text-sm"
                  required
                />
              </div>
              <p className="text-[11px] text-dark-600 mt-1">Range: 1 – 2,00,000</p>
            </div>

            {/* Category */}
            <div>
              <label className="label" htmlFor="category-select">Category</label>
              <SearchableDropdown
                className="mt-1"
                options={categories.map(cat => ({ value: cat.value, label: cat.label }))}
                value={category}
                onChange={val => setCategory(val)}
                placeholder="Select category..."
              />
            </div>

            {/* Gender */}
            <div>
              <label className="label" htmlFor="gender-select">Gender</label>
              <SearchableDropdown
                className="mt-1"
                options={[
                  { value: 'Any', label: 'Any' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                ]}
                value={gender}
                onChange={val => setGender(val as Gender)}
                placeholder="Select gender..."
              />
            </div>

            {/* Branch Preference */}
            <div>
              <label className="label">Branch Preference</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setBranchDropdownOpen(prev => !prev)}
                  className="input text-sm text-left flex items-center justify-between"
                >
                  <span className={selectedBranches.length === 0 ? 'text-dark-500' : 'text-dark-100'}>
                    {branchLabel}
                  </span>
                  <ChevronDown className={clsx(
                    'w-4 h-4 text-dark-500 transition-transform duration-200',
                    branchDropdownOpen && 'rotate-180'
                  )} />
                </button>

                {branchDropdownOpen && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 card border-dark-700 shadow-xl overflow-hidden">
                    <div className="p-2 space-y-0.5 max-h-56 overflow-y-auto">
                      <button
                        type="button"
                        onClick={handleBranchSelectAll}
                        className={clsx(
                          'w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                          selectedBranches.length === 0
                            ? 'bg-brand-500/20 text-brand-300'
                            : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'
                        )}
                      >
                        All Branches
                      </button>
                      {allBranches.map(branch => (
                        <button
                          key={branch.id}
                          type="button"
                          onClick={() => handleBranchToggle(branch.id)}
                          className={clsx(
                            'w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-2',
                            selectedBranches.includes(branch.id)
                              ? 'bg-brand-500/20 text-brand-300'
                              : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'
                          )}
                        >
                          <div className={clsx(
                            'w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center',
                            selectedBranches.includes(branch.id)
                              ? 'bg-brand-500 border-brand-500'
                              : 'border-dark-600'
                          )}>
                            {selectedBranches.includes(branch.id) && (
                              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          {branch.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading || !rank}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  Predict Colleges
                </>
              )}
            </button>

            {/* Results count badge */}
            {results !== null && !isLoading && (
              <div className="flex items-center justify-between pt-1 border-t border-dark-800">
                <span className="text-xs text-dark-500">Results found</span>
                <span className={clsx(
                  'badge text-xs font-bold',
                  results.length > 0
                    ? 'bg-brand-500/20 text-brand-400'
                    : 'bg-dark-800 text-dark-500'
                )}>
                  {results.length} options
                </span>
              </div>
            )}
          </form>

          {/* Legend card */}
          <div className="card p-4 mt-4 space-y-3">
            <h3 className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Classification Guide</h3>
            {(['DREAM', 'MODERATE', 'SAFE'] as Bucket[]).map(b => {
              const cfg = BUCKET_CONFIG[b]
              return (
                <div key={b} className="flex items-start gap-2.5">
                  <div className={clsx('w-2 h-2 rounded-full mt-1 flex-shrink-0', cfg.dot)} />
                  <div>
                    <span className="text-xs font-semibold text-dark-300">{b === 'DREAM' ? 'Dream' : b === 'MODERATE' ? 'Moderate' : 'Safe'}</span>
                    <p className="text-[11px] text-dark-600 leading-snug">
                      {b === 'DREAM' && 'Rank ≤ 85% of cutoff'}
                      {b === 'MODERATE' && 'Rank ≤ 100% of cutoff'}
                      {b === 'SAFE' && 'Rank ≤ 130% of cutoff'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>

        {/* ─── Results Area ──────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Click outside to close dropdown */}
          {branchDropdownOpen && (
            <div
              className="fixed inset-0 z-10"
              onClick={() => setBranchDropdownOpen(false)}
            />
          )}

          {/* Loading state */}
          {isLoading && <LoadingSkeleton />}

          {/* Empty state — not yet searched */}
          {!isLoading && !hasSearched && (
            <div className="card p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-dark-200 mb-2">Find Your Best-Fit Colleges</h3>
              <p className="text-sm text-dark-500 max-w-sm">
                Enter your {examConfig.name} rank and category in the form on the left, then click <strong className="text-dark-400">Predict Colleges</strong> to see your options.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {['Dream', 'Moderate', 'Safe'].map((label, i) => (
                  <span
                    key={label}
                    className={clsx(
                      'badge text-xs',
                      i === 0 ? 'bg-purple-500/15 text-purple-400' :
                      i === 1 ? 'bg-blue-500/15 text-blue-400' :
                      'bg-emerald-500/15 text-emerald-400'
                    )}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {!isLoading && hasSearched && results !== null && results.length === 0 && (
            <div className="card p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-dark-800 border border-dark-700 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-dark-500" />
              </div>
              <h3 className="text-lg font-semibold text-dark-300 mb-2">No Matching Colleges Found</h3>
              <p className="text-sm text-dark-500 max-w-sm mb-4">
                No colleges matched rank <strong className="text-dark-300">{searchRank?.toLocaleString('en-IN')}</strong> in the <strong className="text-dark-300">{selectedCategoryLabel}</strong> category.
              </p>
              <ul className="text-xs text-dark-600 space-y-1 text-left list-disc list-inside">
                <li>Try a higher rank (lower number)</li>
                <li>Switch to a different category</li>
                <li>Select "All Branches" for more options</li>
              </ul>
            </div>
          )}

          {/* Results */}
          {!isLoading && hasSearched && results !== null && results.length > 0 && (
            <div className="space-y-6">
              {/* Summary bar */}
              <div className="card p-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <TrendingUp className="w-4 h-4 text-brand-400" />
                  <span className="text-sm text-dark-300">
                    Results for rank{' '}
                    <strong className="text-dark-100 font-semibold">
                      {searchRank?.toLocaleString('en-IN')}
                    </strong>{' '}
                    ·{' '}
                    <strong className="text-dark-100">{selectedCategoryLabel}</strong>{' '}
                    {selectedBranches.length > 0 && (
                      <span className="text-dark-500">· {branchLabel}</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {dreamResults.length > 0 && (
                    <span className="badge bg-purple-500/15 text-purple-400 text-[11px]">
                      {dreamResults.length} Dream
                    </span>
                  )}
                  {moderateResults.length > 0 && (
                    <span className="badge bg-blue-500/15 text-blue-400 text-[11px]">
                      {moderateResults.length} Moderate
                    </span>
                  )}
                  {safeResults.length > 0 && (
                    <span className="badge bg-emerald-500/15 text-emerald-400 text-[11px]">
                      {safeResults.length} Safe
                    </span>
                  )}
                </div>
              </div>

              {/* Bucket sections */}
              <BucketSection
                bucket="DREAM"
                results={dreamResults}
                isCollegeSaved={isCollegeSaved}
                onToggleSave={handleToggleSave}
              />
              <BucketSection
                bucket="MODERATE"
                results={moderateResults}
                isCollegeSaved={isCollegeSaved}
                onToggleSave={handleToggleSave}
              />
              <BucketSection
                bucket="SAFE"
                results={safeResults}
                isCollegeSaved={isCollegeSaved}
                onToggleSave={handleToggleSave}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
