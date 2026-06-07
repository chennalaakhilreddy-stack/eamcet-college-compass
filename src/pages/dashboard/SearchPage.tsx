import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getAllColleges } from '@/data/colleges'
import { Search, Building2, MapPin, Star, Filter, X, ChevronDown } from 'lucide-react'

const ALL_COLLEGES = getAllColleges()

const ALL_DISTRICTS = [...new Set(ALL_COLLEGES.map(c => c.district))].sort()
const ALL_TYPES = ['Government', 'Autonomous', 'Private', 'Deemed'] as const
const ALL_NAAC = ['A++', 'A+', 'A', 'B+']

const TYPE_COLORS: Record<string, string> = {
  Government: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
  Autonomous: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  Deemed: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  Private: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
}

const NAAC_COLORS: Record<string, string> = {
  'A++': 'bg-emerald-500/20 text-emerald-400',
  'A+': 'bg-green-500/20 text-green-400',
  A: 'bg-blue-500/20 text-blue-400',
  'B+': 'bg-yellow-500/20 text-yellow-400',
}

interface Filters {
  district: string
  type: string
  naac: string
}

function CollegeCard({ college }: { college: (typeof ALL_COLLEGES)[0] }) {
  return (
    <Link
      to={`/dashboard/college/${college.id}`}
      className="card group hover:border-white/20 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-200 flex flex-col"
    >
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[college.type]}`}>
          {college.type}
        </span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${NAAC_COLORS[college.naacGrade] || 'bg-slate-500/20 text-slate-400'}`}>
          NAAC {college.naacGrade}
        </span>
        {college.nbaAccredited && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400">
            NBA
          </span>
        )}
        <span className="ml-auto text-xs text-slate-500">#{college.ranking}</span>
      </div>

      {/* Name */}
      <h3 className="text-white font-semibold text-sm leading-snug mb-1 group-hover:text-brand-300 transition-colors line-clamp-2">
        {college.name}
      </h3>
      <p className="text-xs text-slate-500 mb-3">{college.shortName}</p>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-4">
        <MapPin size={12} />
        {college.location}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <div className="text-emerald-400 font-bold text-sm">{college.avgPackage}</div>
          <div className="text-slate-500 text-xs mt-0.5">Avg LPA</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <div className="text-white font-bold text-sm">{college.totalSeats}</div>
          <div className="text-slate-500 text-xs mt-0.5">Seats</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <div className="text-white font-bold text-sm">{college.highestPackage}</div>
          <div className="text-slate-500 text-xs mt-0.5">High LPA</div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              size={12}
              className={i <= Math.round(college.placementRating) ? 'text-yellow-400 fill-yellow-400' : 'text-dark-600'}
            />
          ))}
        </div>
        <span className="text-xs text-slate-300 font-medium">{college.placementRating}</span>
      </div>

      {/* Branches */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
        {college.branches.slice(0, 4).map(b => (
          <span key={b.id} className="text-xs bg-dark-700 text-slate-400 rounded-md px-2 py-0.5 border border-white/5">
            {b.shortName}
          </span>
        ))}
        {college.branches.length > 4 && (
          <span className="text-xs text-slate-500">+{college.branches.length - 4}</span>
        )}
      </div>
    </Link>
  )
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none input pr-8 text-sm py-2 cursor-pointer"
      >
        <option value="">{label}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
    </div>
  )
}

export default function SearchPage() {
  const searchRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({ district: '', type: '', naac: '' })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()

    return ALL_COLLEGES.filter(college => {
      // Filter checks
      if (filters.district && college.district !== filters.district) return false
      if (filters.type && college.type !== filters.type) return false
      if (filters.naac && college.naacGrade !== filters.naac) return false

      // Search check
      if (!q) return true
      const searchTargets = [
        college.name,
        college.shortName,
        college.location,
        college.district,
        college.affiliation,
        ...college.branches.map(b => b.name),
        ...college.branches.map(b => b.shortName),
      ].join(' ').toLowerCase()

      return searchTargets.includes(q)
    })
  }, [query, filters])

  const clearFilters = () => {
    setFilters({ district: '', type: '', naac: '' })
  }

  const suggestedSearches = ['JNTUH', 'Autonomous', 'CSE', 'Hyderabad', 'Government']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Search Colleges</h1>
        <p className="text-slate-400 text-sm">Find and explore engineering colleges in Telangana</p>
      </div>

      {/* Search + Filter Bar */}
      <div className="space-y-3 mb-6">
        {/* Search Input */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search by college name, location, branch..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="input pl-11 pr-10 w-full text-base py-3"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Toggle + Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowFilters(v => !v)}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg border transition-all duration-200 ${
              showFilters || activeFilterCount > 0
                ? 'bg-brand-500/20 text-brand-400 border-brand-500/30'
                : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            <Filter size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {showFilters && (
            <>
              <FilterSelect
                label="All Districts"
                value={filters.district}
                options={ALL_DISTRICTS}
                onChange={v => setFilters(f => ({ ...f, district: v }))}
              />
              <FilterSelect
                label="All Types"
                value={filters.type}
                options={[...ALL_TYPES]}
                onChange={v => setFilters(f => ({ ...f, type: v }))}
              />
              <FilterSelect
                label="All NAAC"
                value={filters.naac}
                options={ALL_NAAC}
                onChange={v => setFilters(f => ({ ...f, naac: v }))}
              />
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-sm text-rose-400 hover:text-rose-300 transition-colors px-2 py-1"
                >
                  <X size={13} />
                  Clear
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm text-slate-400">
          {results.length === ALL_COLLEGES.length
            ? `Showing all ${results.length} colleges`
            : `${results.length} result${results.length !== 1 ? 's' : ''} found`}
        </span>
        {(query || activeFilterCount > 0) && results.length < ALL_COLLEGES.length && (
          <button
            onClick={() => { setQuery(''); clearFilters() }}
            className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
          >
            Show all
          </button>
        )}
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
            <Building2 size={28} className="text-slate-500" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">No colleges found</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
            Try a different search term or adjust your filters.
          </p>
          <div>
            <p className="text-xs text-slate-500 mb-3">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedSearches.map(s => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); clearFilters() }}
                  className="text-sm bg-dark-700 hover:bg-dark-600 text-slate-300 rounded-lg px-3 py-1.5 border border-white/5 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
