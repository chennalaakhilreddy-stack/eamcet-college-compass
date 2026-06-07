import { useParams, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getCollegeById, CATEGORIES, predictCutoff } from '@/data/colleges'
import {
  ArrowLeft, MapPin, Star, Building2, BookOpen, DollarSign,
  Users, Trophy, Heart, ExternalLink, TrendingUp, Award, Zap
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from 'recharts'

const NAAC_COLORS: Record<string, string> = {
  'A++': 'bg-white/[0.04] text-white/80 border border-white/[0.08]',
  'A+':  'bg-white/[0.04] text-white/80 border border-white/[0.08]',
  'A':   'bg-white/[0.04] text-white/80 border border-white/[0.08]',
  'B+':  'bg-white/[0.04] text-white/80 border border-white/[0.08]',
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={14}
          className={i <= Math.round(value) ? 'text-yellow-400 fill-yellow-400' : 'text-dark-700'}
        />
      ))}
      <span className="ml-1 text-sm text-slate-300">{value.toFixed(1)}</span>
    </span>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="text-white font-semibold text-sm">
            {p.name}: <span className="text-white/80">{p.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function CollegeDetails() {
  const { id } = useParams<{ id: string }>()
  const { user, saveCollege, removeCollege, isCollegeSaved } = useAuth()

  const college = getCollegeById(id || '')

  if (!college) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mb-2">
          <Building2 size={28} className="text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">College Not Found</h2>
        <p className="text-slate-400 max-w-sm">
          The college you're looking for doesn't exist or the link may be incorrect.
        </p>
        <Link to="/dashboard/search" className="btn-primary mt-2">
          Search Colleges
        </Link>
      </div>
    )
  }

  const saved = isCollegeSaved(college.id)
  const firstBranch = college.branches[0]
  const ocCutoffs = firstBranch?.cutoffs['OC']

  const cutoffHistory = ocCutoffs
    ? [
        { year: '2023', cutoff: ocCutoffs['2023'] },
        { year: '2024', cutoff: ocCutoffs['2024'] },
        { year: '2025', cutoff: ocCutoffs['2025'] },
        { year: '2026 (Pred.)', cutoff: predictCutoff(ocCutoffs), predicted: true },
      ]
    : []

  const handleSaveToggle = () => {
    if (!user) return
    if (saved) removeCollege(college.id)
    else saveCollege(college.id)
  }

  const typeColors: Record<string, string> = {
    Government: 'bg-white/[0.04] text-white/80 border border-white/[0.08]',
    Autonomous: 'bg-white/[0.04] text-white/80 border border-white/[0.08]',
    Deemed: 'bg-white/[0.04] text-white/80 border border-white/[0.08]',
    Private: 'bg-white/[0.04] text-white/80 border border-white/[0.08]',
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard/search"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back to Search
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400 text-sm truncate">{college.shortName}</span>
      </div>

      {/* Hero Card */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-3">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[college.type]}`}>
                  {college.type}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${NAAC_COLORS[college.naacGrade] || 'bg-slate-500/20 text-slate-400'}`}>
                  NAAC {college.naacGrade}
                </span>
                {college.nbaAccredited && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                    <Award size={11} />
                    NBA Accredited
                  </span>
                )}
              </div>
              {/* Name */}
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {college.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-white/80" />
                  {college.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-white/80" />
                  Est. {college.established}
                </span>
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <ExternalLink size={14} />
                  Website
                </a>
              </div>
            </div>
            {/* Save Button */}
            {user && (
              <button
                onClick={handleSaveToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 shrink-0 ${
                  saved
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Heart size={16} className={saved ? 'fill-rose-400' : ''} />
                {saved ? 'Saved' : 'Save College'}
              </button>
            )}
          </div>

          {/* Stats Row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: <Trophy size={16} className="text-yellow-400" />, label: 'Ranking', value: `#${college.ranking}` },
              { icon: <Star size={16} className="text-yellow-400" />, label: 'Placement Rating', value: `${college.placementRating}/5` },
              { icon: <TrendingUp size={16} className="text-emerald-400" />, label: 'Avg Package', value: `${college.avgPackage} LPA` },
              { icon: <Zap size={16} className="text-brand-400" />, label: 'Highest Package', value: `${college.highestPackage} LPA` },
              { icon: <Users size={16} className="text-sky-400" />, label: 'Total Seats', value: college.totalSeats.toLocaleString() },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/5">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1.5">
                  {stat.icon}
                  {stat.label}
                </div>
                <div className="text-white font-bold text-lg">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <BookOpen size={18} className="text-white/80" />
          About
        </h2>
        <p className="text-slate-300 leading-relaxed">{college.description}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div>
            <span className="text-slate-500">Affiliation:</span>
            <span className="text-slate-200 ml-2 font-medium">{college.affiliation}</span>
          </div>
          <div>
            <span className="text-slate-500">Campus:</span>
            <span className="text-slate-200 ml-2 font-medium">{college.campus}</span>
          </div>
          <div>
            <span className="text-slate-500">District:</span>
            <span className="text-slate-200 ml-2 font-medium">{college.district}</span>
          </div>
        </div>
      </div>

      {/* Branches Table */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-white/80" />
          Available Branches
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-slate-400 font-medium py-3 pr-4">Branch</th>
                <th className="text-right text-slate-400 font-medium py-3 px-4">Seats</th>
                <th className="text-right text-slate-400 font-medium py-3 px-4">Fees/Year</th>
                <th className="text-right text-slate-400 font-medium py-3 px-4">Prev Cutoff (2025)</th>
                <th className="text-right text-slate-400 font-medium py-3 px-4 text-brand-400">Predicted (2026)</th>
                <th className="text-right text-slate-400 font-medium py-3 pl-4">Placement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {college.branches.map(branch => {
                const ocCutoff25 = branch.cutoffs['OC']?.['2025']
                return (
                  <tr
                    key={branch.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-3.5 pr-4">
                      <span className="text-white font-medium">{branch.name}</span>
                      <span className="ml-2 text-xs text-slate-500">({branch.shortName})</span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300">{branch.seats}</td>
                    <td className="py-3.5 px-4 text-right text-slate-300">
                      ₹{(branch.fees / 1000).toFixed(0)}K
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {ocCutoff25 ? (
                        <span className="text-white font-medium">{ocCutoff25.toLocaleString()}</span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {branch.cutoffs['OC'] ? (
                        <span className="text-brand-400 font-semibold bg-brand-500/10 px-2 py-0.5 rounded">
                          {predictCutoff(branch.cutoffs['OC']).toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-3.5 pl-4">
                      <div className="flex justify-end">
                        <StarRating value={college.placementRating} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cutoff History Chart */}
        {cutoffHistory.length > 0 && (
          <div className="card">
            <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
              <TrendingUp size={18} className="text-white/80" />
              Cutoff Trend — {firstBranch.name} (OC)
            </h2>
            <p className="text-xs text-slate-500 mb-5">Rank cutoffs by year with 2026 prediction</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={cutoffHistory} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={52} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="cutoff"
                  name="Cutoff Rank"
                  radius={[6, 6, 0, 0]}
                  fill="url(#barGradient)"
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Category Cutoff Comparison */}
        {firstBranch && (
          <div className="card">
            <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
              <Users size={18} className="text-white/80" />
              Category Cutoffs — {firstBranch.name} (2025)
            </h2>
            <p className="text-xs text-slate-500 mb-5">OC cutoff vs category cutoffs for 2025</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={CATEGORIES.slice(0, 6).map(cat => ({
                  cat: cat.value,
                  cutoff: firstBranch.cutoffs[cat.value]?.['2025'] ?? 0,
                }))}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="cat" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={52} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="cutoff"
                  name="Cutoff Rank"
                  radius={[6, 6, 0, 0]}
                  fill="url(#catGradient)"
                />
                <defs>
                  <linearGradient id="catGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Cutoff Table — All Categories, First Branch */}
      {firstBranch && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <DollarSign size={18} className="text-white/80" />
            Cutoff History by Category — {firstBranch.name}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-slate-400 font-medium py-3 pr-4">Category</th>
                  <th className="text-right text-slate-400 font-medium py-3 px-4">2023</th>
                  <th className="text-right text-slate-400 font-medium py-3 px-4">2024</th>
                  <th className="text-right text-slate-400 font-medium py-3 px-4">2025</th>
                  <th className="text-right text-slate-400 font-medium py-3 pl-4 text-brand-400">
                    2026 (Pred.)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {CATEGORIES.map(cat => {
                  const catCutoffs = firstBranch.cutoffs[cat.value]
                  if (!catCutoffs) return null
                  const pred = predictCutoff(catCutoffs)
                  return (
                    <tr key={cat.value} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 pr-4 text-slate-200 font-medium">{cat.label}</td>
                      <td className="py-3 px-4 text-right text-slate-400">{catCutoffs['2023'].toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-slate-400">{catCutoffs['2024'].toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-white">{catCutoffs['2025'].toLocaleString()}</td>
                      <td className="py-3 pl-4 text-right text-brand-400 font-semibold">{pred.toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CTA */}
      {!user && (
        <div className="card text-center py-8">
          <Heart size={28} className="text-rose-400 mx-auto mb-3" />
          <h3 className="text-white font-semibold text-lg mb-2">Save this college</h3>
          <p className="text-slate-400 text-sm mb-4">Create an account to save colleges and track your shortlist.</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/login" className="btn-secondary">Log In</Link>
            <Link to="/register" className="btn-primary">Sign Up Free</Link>
          </div>
        </div>
      )}
    </div>
  )
}
