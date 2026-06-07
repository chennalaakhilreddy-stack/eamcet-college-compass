import { useState, useMemo } from 'react'
import { useExam } from '@/hooks/useExam'
import type { College, BranchData } from '@/data/colleges'
import clsx from 'clsx'
import {
  Star, MapPin, Building2, Users, TrendingUp, Zap, Award,
  ChevronDown, X, GitCompareArrows, CheckCircle2, Plus, BookOpen, GraduationCap
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts'

/* ─── constants ───────────────────────────────────────────────── */

const MAX_COLLEGES = 3

const CHART_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4']

const TYPE_COLORS: Record<string, string> = {
  Government: 'bg-white/[0.04] text-white/80 border border-white/[0.08]',
  Autonomous: 'bg-white/[0.04] text-white/80 border border-white/[0.08]',
  Deemed:     'bg-white/[0.04] text-white/80 border border-white/[0.08]',
  Private:    'bg-white/[0.04] text-white/80 border border-white/[0.08]',
}

const NAAC_COLORS: Record<string, string> = {
  'A++': 'bg-white/[0.04] text-white/80 border border-white/[0.08]',
  'A+':  'bg-white/[0.04] text-white/80 border border-white/[0.08]',
  'A':   'bg-white/[0.04] text-white/80 border border-white/[0.08]',
  'B+':  'bg-white/[0.04] text-white/80 border border-white/[0.08]',
}

/* ─── helpers ─────────────────────────────────────────────────── */

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={13}
          className={i <= Math.round(value) ? 'text-yellow-400 fill-yellow-400' : 'text-dark-700'}
        />
      ))}
      <span className="ml-1 text-sm text-slate-300">{value.toFixed(1)}</span>
    </span>
  )
}

function getCSEBranch(c: College): BranchData | undefined {
  return c.branches.find(b => b.shortName === 'CSE')
}

function getCSECutoff(c: College): number | null {
  const cse = getCSEBranch(c)
  return cse?.cutoffs['OC']?.['2025'] ?? null
}

function formatCurrency(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`
  return `₹${n}`
}

type MetricKey =
  | 'placementRating'
  | 'avgPackage'
  | 'highestPackage'
  | 'totalSeats'
  | 'established'
  | 'fees'
  | 'cseCutoff'

/** Returns the index of the "best" college for a given metric, or -1 if no data. */
function bestIndex(colleges: College[], metric: MetricKey): number {
  let best = -1
  let bestVal = -Infinity

  colleges.forEach((c, i) => {
    let val: number | null = null
    switch (metric) {
      case 'placementRating': val = c.placementRating; break
      case 'avgPackage': val = c.avgPackage; break
      case 'highestPackage': val = c.highestPackage; break
      case 'totalSeats': val = c.totalSeats; break
      case 'established': val = c.established; break // older = higher value here
      case 'fees': {
        const fee = c.branches[0]?.fees
        // lower fees = better, so invert
        val = fee != null ? -fee : null
        break
      }
      case 'cseCutoff': {
        const cutoff = getCSECutoff(c)
        // lower cutoff rank = better, so invert
        val = cutoff != null ? -cutoff : null
        break
      }
    }
    if (val != null && val > bestVal) {
      bestVal = val
      best = i
    }
  })

  return best
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="text-white font-semibold text-sm">
            {p.name}: <span className="text-white/80">{p.value} LPA</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

/* ─── selector dropdown ───────────────────────────────────────── */

function CollegeSelector({
  colleges,
  selected,
  usedIds,
  onSelect,
  onClear,
  index,
}: {
  colleges: College[]
  selected: College | null
  usedIds: Set<string>
  onSelect: (c: College) => void
  onClear: () => void
  index: number
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return colleges.filter(
      c =>
        !usedIds.has(c.id) &&
        (c.name.toLowerCase().includes(q) || c.shortName.toLowerCase().includes(q))
    )
  }, [colleges, usedIds, search])

  if (selected) {
    return (
      <div className="card p-4 relative group transition-all duration-300">
        <button
          onClick={onClear}
          className="absolute top-3 right-3 p-1 rounded-lg bg-dark-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Remove college"
        >
          <X size={14} />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
            <Building2 size={18} className="text-white/80" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-tight truncate">{selected.shortName}</p>
            <p className="text-slate-500 text-xs truncate mt-0.5">{selected.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className={clsx('badge text-[10px]', TYPE_COLORS[selected.type])}>
            {selected.type}
          </span>
          <span className={clsx('badge text-[10px]', NAAC_COLORS[selected.naacGrade] || 'bg-slate-500/20 text-slate-400')}>
            NAAC {selected.naacGrade}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          'card w-full p-4 flex items-center gap-3 transition-all duration-200 cursor-pointer',
          'hover:border-brand-500/30 hover:bg-brand-500/5',
          open && 'border-brand-500/40 bg-brand-500/5'
        )}
      >
        <div className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center border border-dashed border-dark-600 shrink-0">
          <Plus size={18} className="text-slate-500" />
        </div>
        <div className="text-left min-w-0">
          <p className="text-slate-400 text-sm font-medium">
            {index === 0 ? 'Select first college' : index === 1 ? 'Select second college' : 'Add third college'}
          </p>
          <p className="text-slate-600 text-xs">Click to choose</p>
        </div>
        <ChevronDown
          size={16}
          className={clsx('text-slate-500 ml-auto transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-2 w-full bg-dark-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search colleges..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input text-sm !py-2 !rounded-lg"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">No colleges found</p>
            ) : (
              filtered.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelect(c)
                    setOpen(false)
                    setSearch('')
                  }}
                  className="w-full text-left px-3 py-2.5 hover:bg-white/5 transition-colors flex items-center gap-3"
                >
                  <Building2 size={14} className="text-slate-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-slate-200 text-sm font-medium truncate">{c.shortName}</p>
                    <p className="text-slate-500 text-xs truncate">{c.location}</p>
                  </div>
                  <span className={clsx('badge text-[10px] ml-auto shrink-0', TYPE_COLORS[c.type])}>
                    {c.type}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── comparison row ──────────────────────────────────────────── */

interface RowProps {
  label: string
  icon: React.ReactNode
  values: (string | React.ReactNode)[]
  winnerIdx?: number
}

function ComparisonRow({ label, icon, values, winnerIdx }: RowProps) {
  return (
    <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] items-start border-b border-white/5 last:border-0">
      <div className="flex items-center gap-2 py-4 px-4 text-slate-400 text-sm font-medium">
        {icon}
        {label}
      </div>
      <div className={clsx('grid gap-px', values.length === 2 ? 'grid-cols-2' : 'grid-cols-3')}>
        {values.map((val, i) => (
          <div
            key={i}
            className={clsx(
              'py-4 px-4 text-sm transition-colors',
              winnerIdx === i
                ? 'bg-emerald-500/5 text-emerald-400 font-semibold'
                : 'text-slate-300'
            )}
          >
            <div className="flex items-center gap-1.5">
              {winnerIdx === i && <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />}
              <span>{val}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── metrics radar card ──────────────────────────────────────── */

interface MetricBarProps {
  label: string
  values: { name: string; value: number; color: string }[]
  max: number
  unit?: string
}

function MetricBar({ label, values, max, unit = '' }: MetricBarProps) {
  return (
    <div className="space-y-2">
      <p className="text-slate-400 text-xs font-medium">{label}</p>
      {values.map(v => (
        <div key={v.name} className="flex items-center gap-3">
          <span className="text-xs text-slate-500 w-20 truncate">{v.name}</span>
          <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.max((v.value / max) * 100, 4)}%`,
                backgroundColor: v.color,
              }}
            />
          </div>
          <span className="text-xs text-slate-300 w-16 text-right font-medium">
            {v.value}{unit}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─── main component ──────────────────────────────────────────── */

export default function CollegeComparison() {
  const { colleges } = useExam()
  const [selectedIds, setSelectedIds] = useState<(string | null)[]>([null, null])

  const selected: (College | null)[] = selectedIds.map(
    id => (id ? colleges.find(c => c.id === id) ?? null : null)
  )
  const usedIds = new Set(selectedIds.filter(Boolean) as string[])
  const filled = selected.filter(Boolean) as College[]
  const hasComparison = filled.length >= 2

  function handleSelect(index: number, c: College) {
    setSelectedIds(prev => {
      const next = [...prev]
      next[index] = c.id
      // Auto-add a 3rd slot if user fills slot 2 and we only have 2
      if (index === next.length - 1 && next.length < MAX_COLLEGES) {
        next.push(null)
      }
      return next
    })
  }

  function handleClear(index: number) {
    setSelectedIds(prev => {
      const next = prev.filter((_, i) => i !== index)
      // always keep at least 2 slots
      while (next.length < 2) next.push(null)
      return next
    })
  }

  /* ── chart data ── */
  const packageData = useMemo(() => {
    if (!hasComparison) return []
    return [
      {
        label: 'Avg Package',
        ...Object.fromEntries(filled.map(c => [c.shortName, c.avgPackage])),
      },
      {
        label: 'Highest Package',
        ...Object.fromEntries(filled.map(c => [c.shortName, c.highestPackage])),
      },
    ]
  }, [filled, hasComparison])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
            <GitCompareArrows size={20} className="text-white/80" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              College Comparison
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Select up to {MAX_COLLEGES} colleges to compare side by side
            </p>
          </div>
        </div>
      </div>

      {/* ── College Selectors ── */}
      <div
        className={clsx(
          'grid gap-4',
          selectedIds.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
        )}
      >
        {selectedIds.map((_, i) => (
          <CollegeSelector
            key={i}
            index={i}
            colleges={colleges}
            selected={selected[i]}
            usedIds={usedIds}
            onSelect={c => handleSelect(i, c)}
            onClear={() => handleClear(i)}
          />
        ))}
      </div>

      {/* ── Empty state ── */}
      {!hasComparison && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mx-auto mb-4">
            <GitCompareArrows size={28} className="text-slate-600" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Select colleges to compare</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Choose at least 2 colleges from the dropdowns above to see a detailed side-by-side comparison
            of academics, placements, fees, and more.
          </p>
        </div>
      )}

      {/* ── Comparison content ── */}
      {hasComparison && (
        <div className="space-y-6 animate-in">
          {/* ── Comparison Table ── */}
          <div className="card overflow-hidden">
            {/* Table header */}
            <div
              className={clsx(
                'grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] border-b border-white/10'
              )}
            >
              <div className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Metric
              </div>
              <div
                className={clsx(
                  'grid gap-px',
                  filled.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                )}
              >
                {filled.map((c, i) => (
                  <div
                    key={c.id}
                    className="py-4 px-4 font-semibold text-white text-sm flex items-center gap-2"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: CHART_COLORS[i] }}
                    />
                    {c.shortName}
                  </div>
                ))}
              </div>
            </div>

            {/* Name & Type */}
            <ComparisonRow
              label="College Type"
              icon={<Building2 size={14} />}
              values={filled.map(c => (
                <span className={clsx('badge text-[10px]', TYPE_COLORS[c.type])}>
                  {c.type}
                </span>
              ))}
            />

            {/* Location */}
            <ComparisonRow
              label="Location"
              icon={<MapPin size={14} />}
              values={filled.map(c => c.location)}
            />

            {/* Established */}
            <ComparisonRow
              label="Established"
              icon={<GraduationCap size={14} />}
              values={filled.map(c => String(c.established))}
              winnerIdx={bestIndex(filled, 'established')}
            />

            {/* NAAC Grade */}
            <ComparisonRow
              label="NAAC Grade"
              icon={<Award size={14} />}
              values={filled.map(c => (
                <span className={clsx('badge text-[10px]', NAAC_COLORS[c.naacGrade] || 'bg-slate-500/20 text-slate-400')}>
                  {c.naacGrade}
                </span>
              ))}
            />

            {/* Total Seats */}
            <ComparisonRow
              label="Total Seats"
              icon={<Users size={14} />}
              values={filled.map(c => c.totalSeats.toLocaleString())}
              winnerIdx={bestIndex(filled, 'totalSeats')}
            />

            {/* Placement Rating */}
            <ComparisonRow
              label="Placements"
              icon={<Star size={14} />}
              values={filled.map(c => <StarRating value={c.placementRating} />)}
              winnerIdx={bestIndex(filled, 'placementRating')}
            />

            {/* Avg Package */}
            <ComparisonRow
              label="Avg Package"
              icon={<TrendingUp size={14} />}
              values={filled.map(c => `${c.avgPackage} LPA`)}
              winnerIdx={bestIndex(filled, 'avgPackage')}
            />

            {/* Highest Package */}
            <ComparisonRow
              label="Highest Package"
              icon={<Zap size={14} />}
              values={filled.map(c => `${c.highestPackage} LPA`)}
              winnerIdx={bestIndex(filled, 'highestPackage')}
            />

            {/* Fees */}
            <ComparisonRow
              label="Fees (1st Yr)"
              icon={<TrendingUp size={14} />}
              values={filled.map(c =>
                c.branches[0] ? formatCurrency(c.branches[0].fees) + '/yr' : '—'
              )}
              winnerIdx={bestIndex(filled, 'fees')}
            />

            {/* Branches */}
            <ComparisonRow
              label="Branches"
              icon={<BookOpen size={14} />}
              values={filled.map(c => (
                <div className="flex flex-wrap gap-1">
                  {c.branches.map(b => (
                    <span key={b.id} className="badge bg-dark-800 text-slate-300 border border-dark-700 text-[10px]">
                      {b.shortName}
                    </span>
                  ))}
                </div>
              ))}
            />

            {/* CSE Cutoff */}
            <ComparisonRow
              label="CSE Cutoff (OC)"
              icon={<TrendingUp size={14} />}
              values={filled.map(c => {
                const cutoff = getCSECutoff(c)
                return cutoff != null ? (
                  <span className="text-white font-medium">Rank {cutoff.toLocaleString()}</span>
                ) : (
                  <span className="text-slate-600">—</span>
                )
              })}
              winnerIdx={bestIndex(filled, 'cseCutoff')}
            />
          </div>

          {/* ── Charts Row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Package Comparison Bar Chart */}
            <div className="card p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                <TrendingUp size={18} className="text-white/80" />
                Package Comparison
              </h2>
              <p className="text-xs text-slate-500 mb-5">Average & highest packages in LPA</p>

              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={packageData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {filled.map((c, i) => (
                    <Bar
                      key={c.id}
                      dataKey={c.shortName}
                      name={c.shortName}
                      fill={CHART_COLORS[i]}
                      radius={[6, 6, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                {filled.map((c, i) => (
                  <div key={c.id} className="flex items-center gap-1.5 text-xs text-slate-400">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[i] }}
                    />
                    {c.shortName}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics Comparison */}
            <div className="card p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                <Zap size={18} className="text-white/80" />
                Key Metrics
              </h2>
              <p className="text-xs text-slate-500 mb-5">Side-by-side metric breakdown</p>

              <div className="space-y-5">
                <MetricBar
                  label="Placement Rating (/5)"
                  values={filled.map((c, i) => ({
                    name: c.shortName,
                    value: c.placementRating,
                    color: CHART_COLORS[i],
                  }))}
                  max={5}
                />
                <MetricBar
                  label="Avg Package (LPA)"
                  values={filled.map((c, i) => ({
                    name: c.shortName,
                    value: c.avgPackage,
                    color: CHART_COLORS[i],
                  }))}
                  max={Math.max(...filled.map(c => c.avgPackage)) * 1.2}
                  unit=" LPA"
                />
                <MetricBar
                  label="Highest Package (LPA)"
                  values={filled.map((c, i) => ({
                    name: c.shortName,
                    value: c.highestPackage,
                    color: CHART_COLORS[i],
                  }))}
                  max={Math.max(...filled.map(c => c.highestPackage)) * 1.2}
                  unit=" LPA"
                />
                <MetricBar
                  label="Total Seats"
                  values={filled.map((c, i) => ({
                    name: c.shortName,
                    value: c.totalSeats,
                    color: CHART_COLORS[i],
                  }))}
                  max={Math.max(...filled.map(c => c.totalSeats)) * 1.2}
                />
                <MetricBar
                  label="Fees (1st Branch, ₹/yr)"
                  values={filled.map((c, i) => ({
                    name: c.shortName,
                    value: c.branches[0]?.fees ?? 0,
                    color: CHART_COLORS[i],
                  }))}
                  max={Math.max(...filled.map(c => c.branches[0]?.fees ?? 0)) * 1.2}
                />
              </div>
            </div>
          </div>

          {/* ── Winner Highlights ── */}
          <div className="card p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              Winner Summary
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Which college leads in each category
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(
                [
                  { key: 'placementRating' as MetricKey, label: 'Best Placements', icon: <Star size={14} className="text-yellow-400" /> },
                  { key: 'avgPackage' as MetricKey, label: 'Highest Avg Package', icon: <TrendingUp size={14} className="text-emerald-400" /> },
                  { key: 'highestPackage' as MetricKey, label: 'Top Package', icon: <Zap size={14} className="text-white/80" /> },
                  { key: 'totalSeats' as MetricKey, label: 'Most Seats', icon: <Users size={14} className="text-sky-400" /> },
                  { key: 'fees' as MetricKey, label: 'Lowest Fees', icon: <TrendingUp size={14} className="text-green-400" /> },
                  { key: 'cseCutoff' as MetricKey, label: 'Best CSE Cutoff', icon: <Award size={14} className="text-purple-400" /> },
                ] as const
              ).map(({ key, label, icon }) => {
                const wi = bestIndex(filled, key)
                const winner = wi >= 0 ? filled[wi] : null
                return (
                  <div
                    key={key}
                    className={clsx(
                      'rounded-xl p-3.5 border transition-colors',
                      winner
                        ? 'bg-emerald-500/5 border-emerald-500/20'
                        : 'bg-dark-800/50 border-white/5'
                    )}
                  >
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                      {icon}
                      {label}
                    </div>
                    {winner ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span className="text-white font-semibold text-sm">{winner.shortName}</span>
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: CHART_COLORS[wi] }}
                        />
                      </div>
                    ) : (
                      <span className="text-slate-600 text-sm">N/A</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
