import { useState, useMemo } from 'react'
import { useExam } from '@/hooks/useExam'
import { predictCutoff } from '@/data/colleges'
import SearchableDropdown from '@/components/ui/SearchableDropdown'
import { BarChart3, TrendingDown, TrendingUp, Filter, AlertTriangle, ArrowRight } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import clsx from 'clsx'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface FilterState {
  collegeId: string
  branchId: string
  category: string
  year: string
}

interface CutoffResult {
  collegeName: string
  collegeShortName: string
  collegeType: string
  collegeLocation: string
  branchName: string
  seats: number
  cutoff2023: number
  cutoff2024: number
  cutoff2025: number
  cutoff2026: number
}

interface TableRow {
  year: string
  rank: number
  change: number | null
  seats: number
  isPredicted: boolean
}

// ---------------------------------------------------------------------------
// Custom Tooltip
// ---------------------------------------------------------------------------
interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="rounded-lg border border-dark-700 bg-dark-800 p-3 shadow-xl text-sm">
      <p className="font-semibold text-slate-200 mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-400">{entry.name}:</span>
          <span className="font-medium text-slate-200">{entry.value.toLocaleString()}</span>
        </div>
      ))}
      <p className="mt-1.5 text-xs text-slate-500">Lower rank = better</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------
interface StatCardProps {
  year: string
  rank: number
  isPredicted?: boolean
  isHighlighted?: boolean
}

const StatCard = ({ year, rank, isPredicted = false, isHighlighted = false }: StatCardProps) => (
  <div
    className={clsx(
      'rounded-xl border p-4 flex flex-col gap-1 transition-all',
      isPredicted
        ? 'border-amber-500/30 bg-amber-500/5'
        : isHighlighted
        ? 'border-brand-500/40 bg-brand-500/5'
        : 'border-dark-700 bg-dark-800',
    )}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{year}</span>
      {isPredicted && (
        <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded-full">
          Predicted
        </span>
      )}
    </div>
    <p
      className={clsx(
        'text-2xl font-bold tabular-nums mt-0.5',
        isPredicted ? 'text-amber-400' : isHighlighted ? 'text-brand-400' : 'text-slate-100',
      )}
    >
      {rank.toLocaleString()}
    </p>
    <p className="text-xs text-slate-500">Cutoff rank</p>
  </div>
)

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function CutoffViewer() {
  const { examConfig, colleges, categories } = useExam()

  const [filters, setFilters] = useState<FilterState>({
    collegeId: '',
    branchId: '',
    category: categories[0]?.value ?? 'OC',
    year: 'All',
  })
  const [submitted, setSubmitted] = useState<FilterState | null>(null)

  // Derive available branches for selected college
  const availableBranches = useMemo(() => {
    if (!filters.collegeId) return []
    const college = colleges.find((c) => c.id === filters.collegeId)
    return college ? college.branches : []
  }, [filters.collegeId, colleges])

  // Reset branch when college changes
  const handleCollegeChange = (collegeId: string) => {
    setFilters((prev) => ({ ...prev, collegeId, branchId: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!filters.collegeId || !filters.branchId) return
    setSubmitted({ ...filters })
  }

  // Compute result from submitted filters
  const result = useMemo<CutoffResult | null>(() => {
    if (!submitted?.collegeId || !submitted?.branchId) return null

    const college = colleges.find((c) => c.id === submitted.collegeId)
    if (!college) return null

    const branch = college.branches.find((b) => b.id === submitted.branchId)
    if (!branch) return null

    const categoryCutoffs = branch.cutoffs[submitted.category]
    if (!categoryCutoffs) return null

    const predicted = predictCutoff(categoryCutoffs)

    return {
      collegeName: college.name,
      collegeShortName: college.shortName,
      collegeType: college.type,
      collegeLocation: college.location,
      branchName: branch.name,
      seats: branch.seats,
      cutoff2023: categoryCutoffs['2023'],
      cutoff2024: categoryCutoffs['2024'],
      cutoff2025: categoryCutoffs['2025'],
      cutoff2026: predicted,
    }
  }, [submitted, colleges])

  // Chart data
  const chartData = useMemo(() => {
    if (!result) return []
    return [
      { year: '2023', actual: result.cutoff2023, predicted: null },
      { year: '2024', actual: result.cutoff2024, predicted: null },
      { year: '2025', actual: result.cutoff2025, predicted: null },
      { year: '2026*', actual: null, predicted: result.cutoff2026 },
    ]
  }, [result])

  // Table rows
  const tableRows = useMemo<TableRow[]>(() => {
    if (!result) return []
    const rows: TableRow[] = [
      { year: '2023', rank: result.cutoff2023, change: null, seats: result.seats, isPredicted: false },
      { year: '2024', rank: result.cutoff2024, change: null, seats: result.seats, isPredicted: false },
      { year: '2025', rank: result.cutoff2025, change: null, seats: result.seats, isPredicted: false },
      { year: '2026*', rank: result.cutoff2026, change: null, seats: result.seats, isPredicted: true },
    ]
    // Compute percentage change
    for (let i = 1; i < rows.length; i++) {
      const prev = rows[i - 1].rank
      const curr = rows[i].rank
      rows[i].change = ((curr - prev) / prev) * 100
    }
    return rows
  }, [result])

  // Trend direction: if rank is decreasing (getting tighter), competition is INCREASING
  const trendDirection = useMemo(() => {
    if (!result) return null
    const delta2324 = result.cutoff2024 - result.cutoff2023
    const delta2425 = result.cutoff2025 - result.cutoff2024
    const overallTrend = delta2324 + delta2425
    return overallTrend < 0 ? 'increasing-competition' : 'decreasing-competition'
  }, [result])

  // Type badge color
  const typeBadgeClass = (type: string) => {
    switch (type) {
      case 'Government':
        return 'bg-green-500/15 text-green-400 border-green-500/30'
      case 'Autonomous':
        return 'bg-brand-500/15 text-brand-400 border-brand-500/30'
      case 'Deemed':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30'
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30'
    }
  }

  const selectedCategoryLabel = categories.find((c) => c.value === filters.category)?.label ?? filters.category

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-dark-950 text-slate-200">
      {/* Page Header */}
      <div className="border-b border-dark-800 bg-dark-900/50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-500/15 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-100">Cutoff Viewer</h1>
            <p className="text-sm text-slate-500">
              {examConfig.name} — Analyze year-over-year cutoff trends and 2026 predictions
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6 items-start">
          {/* ----------------------------------------------------------------
              LEFT SIDEBAR — Filters
          ---------------------------------------------------------------- */}
          <aside className="w-72 flex-shrink-0 sticky top-6">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-5">
                <Filter className="w-4 h-4 text-brand-400" />
                <h2 className="font-semibold text-slate-200">Filters</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* College */}
                <div>
                  <label className="label">College</label>
                  <SearchableDropdown
                    className="mt-1"
                    options={colleges.map(c => ({ value: c.id, label: `${c.shortName} — ${c.location}` }))}
                    value={filters.collegeId}
                    onChange={(val) => handleCollegeChange(val)}
                    placeholder="Search a college..."
                  />
                </div>

                {/* Branch */}
                {filters.collegeId && (
                  <div>
                    <label className="label">Branch</label>
                    <SearchableDropdown
                      className="mt-1"
                      options={availableBranches.map(b => ({ value: b.id, label: b.name }))}
                      value={filters.branchId}
                      onChange={(val) => setFilters(prev => ({ ...prev, branchId: val }))}
                      placeholder="Search a branch..."
                    />
                  </div>
                )}

                {/* Category */}
                <div>
                  <label className="label">Category</label>
                  <SearchableDropdown
                    className="mt-1"
                    options={categories.map(c => ({ value: c.value, label: c.label }))}
                    value={filters.category}
                    onChange={(val) => setFilters(prev => ({ ...prev, category: val }))}
                    placeholder="Search category..."
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="label">Year Focus</label>
                  <SearchableDropdown
                    className="mt-1"
                    options={[
                      { value: 'All', label: 'All Years (Trend)' },
                      { value: '2025', label: '2025' },
                      { value: '2024', label: '2024' },
                      { value: '2023', label: '2023' },
                    ]}
                    value={filters.year}
                    onChange={(val) => setFilters(prev => ({ ...prev, year: val }))}
                    placeholder="Select year..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!filters.collegeId || !filters.branchId}
                  className={clsx(
                    'btn-primary w-full flex items-center justify-center gap-2 mt-2',
                    (!filters.collegeId || !filters.branchId) && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  View Cutoff Trends
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick guide */}
              <div className="mt-5 rounded-lg bg-dark-800 border border-dark-700 p-3">
                <p className="text-xs text-slate-500 leading-relaxed">
                  <span className="text-slate-400 font-medium">Tip:</span> Select a college, choose the branch,
                  then pick your reservation category to see historical cutoffs and 2026 predictions.
                </p>
              </div>
            </div>
          </aside>

          {/* ----------------------------------------------------------------
              RIGHT — Results
          ---------------------------------------------------------------- */}
          <div className="flex-1 min-w-0">
            {/* Empty state */}
            {!result ? (
              <div className="card flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-dark-800 border border-dark-700 flex items-center justify-center mb-4">
                  <BarChart3 className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">No data selected</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Select a college, branch and category to view cutoff trends and predictions.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* College Header */}
                <div className="card p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h2 className="text-xl font-bold text-slate-100">{result.collegeName}</h2>
                        <span
                          className={clsx(
                            'text-xs font-semibold px-2 py-0.5 rounded-full border',
                            typeBadgeClass(result.collegeType),
                          )}
                        >
                          {result.collegeType}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">
                        {result.branchName} · {result.collegeLocation}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-0.5">Category</p>
                      <span className="badge">{selectedCategoryLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <StatCard year="2023" rank={result.cutoff2023} />
                  <StatCard year="2024" rank={result.cutoff2024} />
                  <StatCard year="2025" rank={result.cutoff2025} isHighlighted />
                  <StatCard year="2026*" rank={result.cutoff2026} isPredicted />
                </div>

                {/* Line Chart */}
                <div className="card p-5">
                  <h3 className="font-semibold text-slate-200 mb-1">Cutoff Trend Chart</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Rank axis is inverted — lower rank = more competitive / better
                  </p>

                  <div className="bg-dark-900 rounded-xl p-4 border border-dark-700">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis
                          dataKey="year"
                          stroke="#475569"
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
                          axisLine={{ stroke: '#334155' }}
                          tickLine={false}
                        />
                        <YAxis
                          reversed
                          stroke="#475569"
                          tick={{ fill: '#94a3b8', fontSize: 11 }}
                          axisLine={{ stroke: '#334155' }}
                          tickLine={false}
                          tickFormatter={(v: number) => v.toLocaleString()}
                          width={65}
                          label={{
                            value: 'Rank',
                            angle: -90,
                            position: 'insideLeft',
                            offset: 0,
                            fill: '#64748b',
                            fontSize: 11,
                          }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: '12px' }}
                        />
                        {/* Reference line at 2025 actual */}
                        <ReferenceLine
                          x="2025"
                          stroke="#334155"
                          strokeDasharray="4 4"
                          label={{ value: 'Latest', fill: '#64748b', fontSize: 10 }}
                        />
                        {/* Actual cutoffs line */}
                        <Line
                          type="monotone"
                          dataKey="actual"
                          name="Actual Cutoff"
                          stroke="#6366f1"
                          strokeWidth={2.5}
                          dot={{ r: 5, fill: '#6366f1', strokeWidth: 2, stroke: '#1e1b4b' }}
                          activeDot={{ r: 7, fill: '#818cf8', stroke: '#6366f1', strokeWidth: 2 }}
                          connectNulls={false}
                        />
                        {/* Predicted 2026 line — dashed amber */}
                        <Line
                          type="monotone"
                          dataKey="predicted"
                          name="2026 Prediction"
                          stroke="#f59e0b"
                          strokeWidth={2.5}
                          strokeDasharray="6 4"
                          dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#451a03' }}
                          activeDot={{ r: 8, fill: '#fbbf24', stroke: '#f59e0b', strokeWidth: 2 }}
                          connectNulls={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Trend Analysis Card */}
                <div
                  className={clsx(
                    'card p-5 border',
                    trendDirection === 'increasing-competition'
                      ? 'border-red-500/30 bg-red-500/5'
                      : 'border-green-500/30 bg-green-500/5',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={clsx(
                        'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                        trendDirection === 'increasing-competition'
                          ? 'bg-red-500/15'
                          : 'bg-green-500/15',
                      )}
                    >
                      {trendDirection === 'increasing-competition' ? (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200 mb-1">Trend Analysis</h3>
                      <p
                        className={clsx(
                          'text-sm font-medium',
                          trendDirection === 'increasing-competition' ? 'text-red-400' : 'text-green-400',
                        )}
                      >
                        {trendDirection === 'increasing-competition'
                          ? 'Competition is INCREASING — cutoffs are getting tighter'
                          : 'Competition is DECREASING — cutoffs are loosening'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {trendDirection === 'increasing-competition'
                          ? `The cutoff rank has been decreasing year over year, meaning you need a lower (better) rank to secure admission. This branch is becoming increasingly competitive.`
                          : `The cutoff rank has been increasing year over year, meaning a higher rank can still secure admission. Competition pressure on this branch is easing.`}
                      </p>
                    </div>
                  </div>

                  {/* Mini sparkline of changes */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { label: '2023→2024', a: result.cutoff2023, b: result.cutoff2024 },
                      { label: '2024→2025', a: result.cutoff2024, b: result.cutoff2025 },
                      { label: '2025→2026*', a: result.cutoff2025, b: result.cutoff2026 },
                    ].map(({ label, a, b }) => {
                      const pct = ((b - a) / a) * 100
                      const tighter = pct < 0
                      return (
                        <div
                          key={label}
                          className="rounded-lg bg-dark-800 border border-dark-700 px-3 py-2"
                        >
                          <p className="text-xs text-slate-500 mb-1">{label}</p>
                          <p
                            className={clsx(
                              'text-sm font-semibold tabular-nums',
                              tighter ? 'text-red-400' : 'text-green-400',
                            )}
                          >
                            {pct > 0 ? '+' : ''}
                            {pct.toFixed(1)}%
                          </p>
                          <p className="text-xs text-slate-600">{tighter ? 'tighter' : 'looser'}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Data Table */}
                <div className="card p-5">
                  <h3 className="font-semibold text-slate-200 mb-4">Year-by-Year Data</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-dark-700">
                          <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide pr-4">
                            Year
                          </th>
                          <th className="text-right pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide px-4">
                            Cutoff Rank
                          </th>
                          <th className="text-right pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide px-4">
                            Change
                          </th>
                          <th className="text-right pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide pl-4">
                            Seats
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-800">
                        {tableRows.map((row) => {
                          const changePct = row.change
                          const tighter = changePct !== null && changePct < 0
                          return (
                            <tr
                              key={row.year}
                              className={clsx(
                                'transition-colors',
                                row.isPredicted ? 'bg-amber-500/5' : 'hover:bg-dark-800/50',
                              )}
                            >
                              {/* Year */}
                              <td className="py-3 pr-4">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={clsx(
                                      'font-semibold',
                                      row.isPredicted ? 'text-amber-400' : 'text-slate-200',
                                    )}
                                  >
                                    {row.year}
                                  </span>
                                  {row.isPredicted && (
                                    <span className="text-[10px] font-medium text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full px-1.5 py-0.5">
                                      Predicted
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Cutoff Rank */}
                              <td className="py-3 px-4 text-right">
                                <span
                                  className={clsx(
                                    'font-mono font-semibold tabular-nums',
                                    row.isPredicted ? 'text-amber-400' : 'text-slate-100',
                                  )}
                                >
                                  {row.rank.toLocaleString()}
                                </span>
                              </td>

                              {/* Change */}
                              <td className="py-3 px-4 text-right">
                                {changePct === null ? (
                                  <span className="text-slate-600">—</span>
                                ) : row.isPredicted ? (
                                  <span className="text-slate-500 text-xs">Predicted</span>
                                ) : (
                                  <div className="flex items-center justify-end gap-1">
                                    {tighter ? (
                                      <TrendingDown className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                                    ) : (
                                      <TrendingUp className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                                    )}
                                    <span
                                      className={clsx(
                                        'font-semibold tabular-nums text-xs',
                                        tighter ? 'text-red-400' : 'text-green-400',
                                      )}
                                    >
                                      {changePct > 0 ? '+' : ''}
                                      {changePct.toFixed(1)}%
                                    </span>
                                  </div>
                                )}
                              </td>

                              {/* Seats */}
                              <td className="py-3 pl-4 text-right">
                                <span className="text-slate-400 tabular-nums">{row.seats}</span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-400 mb-1">Disclaimer</p>
                    <p className="text-xs text-amber-300/70 leading-relaxed">
                      Predicted 2026 cutoff is based on historical trends using linear regression. Actual
                      cutoffs depend on total candidates, marks distribution, and seat availability. This
                      prediction is indicative only and should not be used as the sole basis for college
                      selection decisions.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
