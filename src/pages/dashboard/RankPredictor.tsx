import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useExam } from '@/hooks/useExam'
import { formatRank, getRankColor } from '@/utils/rankPredictor'
import { TrendingUp, Info, Save, CheckCircle, AlertTriangle, GraduationCap } from 'lucide-react'
import SearchableDropdown from '@/components/ui/SearchableDropdown'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { RankPrediction } from '@/data/examTypes'

// ---------------------------------------------------------------------------
// Custom Recharts tooltip
// ---------------------------------------------------------------------------
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-800 border border-white/10 rounded-lg px-3 py-2 shadow-xl text-xs">
        <p className="text-white/50 mb-1">Input: <span className="text-white font-semibold">{label}</span></p>
        <p className="text-brand-400 font-semibold">Rank: {payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------
interface StatCardProps {
  label: string
  value: string
  color: string
  bg: string
  border: string
  description: string
}

function StatCard({ label, value, color, bg, border, description }: StatCardProps) {
  return (
    <div className={`rounded-xl p-4 border ${bg} ${border} flex flex-col gap-1`}>
      <span className="text-xs text-white/50 uppercase tracking-widest font-medium">{label}</span>
      <span className={`text-2xl font-black tracking-tight ${color}`}>{value}</span>
      <span className="text-[11px] text-white/40">{description}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Performance label helper (exam-aware)
// ---------------------------------------------------------------------------
function getPerformanceLabel(prediction: RankPrediction): { label: string; color: string } {
  const { label } = prediction
  switch (label) {
    case 'Exceptional': return { label, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' }
    case 'Excellent': return { label, color: 'text-green-400 bg-green-400/10 border-green-400/30' }
    case 'Very Good': return { label, color: 'text-teal-400 bg-teal-400/10 border-teal-400/30' }
    case 'Good': return { label, color: 'text-brand-400 bg-brand-400/10 border-brand-400/30' }
    case 'Average': return { label, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' }
    case 'Below Average': return { label, color: 'text-orange-400 bg-orange-400/10 border-orange-400/30' }
    default: return { label: label || 'Low', color: 'text-red-400 bg-red-400/10 border-red-400/30' }
  }
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function RankPredictor() {
  const { user } = useAuth()
  const { examConfig, predictRank, referenceRows, chartData } = useExam()

  const isPercentile = examConfig.inputType === 'percentile'
  const defaultValue = isPercentile ? 95 : 120

  const [inputValue, setInputValue] = useState<number>(defaultValue)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [category, setCategory] = useState(examConfig.categories[0]?.value ?? 'General')

  // Derive prediction from input
  const prediction = predictRank(inputValue)
  const perf = getPerformanceLabel(prediction)

  function handleInputChange(val: number) {
    const clamped = Math.max(examConfig.inputMin, Math.min(examConfig.inputMax, val))
    setInputValue(isPercentile ? Math.round(clamped * 100) / 100 : Math.round(clamped))
    setSaved(false)
  }

  async function handleSave() {
    if (!user || saving) return
    setSaving(true)
    try {
      await (user as any).savePrediction?.({ inputValue, prediction })
      setSaved(true)
    } catch {
      // silently ignore
    } finally {
      setSaving(false)
    }
  }

  // Format input display
  const inputDisplay = isPercentile ? inputValue.toFixed(2) : inputValue.toString()
  const progressPct = isPercentile
    ? (inputValue / 100) * 100
    : (inputValue / examConfig.inputMax) * 100

  return (
    <div className="space-y-6 pb-8">
      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-brand-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Rank Predictor</h1>
          <p className="text-sm text-white/40 mt-0.5">
            Estimate your {examConfig.name} rank based on expected {examConfig.inputLabel.toLowerCase()}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Two-column grid                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ================================================================ */}
        {/* LEFT PANEL – input                                                */}
        {/* ================================================================ */}
        <div className="lg:col-span-5 space-y-5">
          <div className="card p-6 space-y-6">
            <div>
              <h2 className="text-base font-semibold text-white mb-1">
                Enter Your {examConfig.inputLabel}
              </h2>
              <p className="text-xs text-white/40">
                {isPercentile
                  ? `Adjust the slider or type a value between ${examConfig.inputMin} – ${examConfig.inputMax}`
                  : `Adjust the slider or type a value between ${examConfig.inputMin} – ${examConfig.inputMax}`}
              </p>
            </div>

            {/* Input display */}
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex justify-between text-xs text-white/40">
                  <span>{examConfig.inputMin}</span>
                  <span>{isPercentile ? 50 : Math.round(examConfig.inputMax / 2)}</span>
                  <span>{examConfig.inputMax}</span>
                </div>
                <input
                  type="range"
                  min={examConfig.inputMin}
                  max={examConfig.inputMax}
                  step={isPercentile ? 0.1 : 1}
                  value={inputValue}
                  onChange={e => handleInputChange(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: '#6366f1' }}
                />
              </div>
              <input
                type="number"
                min={examConfig.inputMin}
                max={examConfig.inputMax}
                step={isPercentile ? 0.01 : 1}
                value={inputValue}
                onChange={e => handleInputChange(Number(e.target.value))}
                className="input w-20 text-center text-lg font-bold py-2"
              />
            </div>

            {/* Visual gauge */}
            <div className="relative">
              <div className="w-full h-2 rounded-full bg-dark-800">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progressPct}%`,
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-white/30">
                <span>{isPercentile ? 'Low' : 'Weak'}</span>
                <span>Average</span>
                <span>Strong</span>
                <span>Elite</span>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-white/5" />

            {/* JEE Advanced Specifics */}
            {examConfig.id === 'jee_advanced' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">Category</label>
                  <SearchableDropdown
                    options={examConfig.categories.map(c => ({ value: c.value, label: c.label }))}
                    value={category}
                    onChange={setCategory}
                  />
                  <p className="text-[10px] text-white/40 mt-1.5">
                    Note: Predicted rank is CRL (Common Rank List). Category ranks vary significantly year to year.
                  </p>
                </div>

                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-100 mb-1">IIT Eligibility Criteria</h4>
                      <ul className="text-xs text-blue-200/70 space-y-1.5 list-disc list-inside">
                        <li>Must secure minimum 75% aggregate marks in Class XII (65% for SC/ST/PwD).</li>
                        <li>Must be within the top 2,50,000 successful candidates in JEE Main.</li>
                        <li>Maximum of two consecutive attempts allowed.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/5" />
              </div>
            )}

            {/* Reference table */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-3.5 h-3.5 text-white/30" />
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
                  {examConfig.inputLabel} Reference
                </span>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/5">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-dark-800/60">
                      <th className="py-2 px-3 text-left text-white/40 font-medium">
                        {examConfig.inputLabel}
                      </th>
                      <th className="py-2 px-3 text-right text-white/40 font-medium">Expected Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceRows.map((row, i) => {
                      const inputNum = row.input
                      const threshold = isPercentile ? 0.5 : 5
                      const isCurrentRow =
                        inputValue >= inputNum - threshold && inputValue <= inputNum + threshold - 0.01
                      return (
                        <tr
                          key={inputNum}
                          className={`border-t border-white/5 transition-colors ${
                            isCurrentRow
                              ? 'bg-brand-500/10'
                              : i % 2 === 0
                              ? 'bg-dark-900/30'
                              : ''
                          }`}
                        >
                          <td className={`py-2 px-3 font-semibold ${isCurrentRow ? 'text-brand-400' : 'text-white/70'}`}>
                            {isPercentile ? inputNum.toFixed(1) : inputNum}
                            {isCurrentRow && (
                              <span className="ml-1.5 text-[9px] text-brand-400/70 font-normal">← you</span>
                            )}
                          </td>
                          <td className={`py-2 px-3 text-right ${isCurrentRow ? 'text-brand-300 font-semibold' : 'text-white/50'}`}>
                            {row.rank}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* RIGHT PANEL – results                                             */}
        {/* ================================================================ */}
        <div className="lg:col-span-7 space-y-5">

          {/* --- Stat cards row --- */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              label="Best Case"
              value={formatRank(prediction.bestCase)}
              color="text-emerald-400"
              bg="bg-emerald-400/5"
              border="border-emerald-400/20"
              description="Optimistic estimate"
            />
            <StatCard
              label="Expected"
              value={formatRank(prediction.expected)}
              color="text-brand-400"
              bg="bg-brand-400/5"
              border="border-brand-400/20"
              description="Most likely rank"
            />
            <StatCard
              label="Worst Case"
              value={formatRank(prediction.worstCase)}
              color="text-orange-400"
              bg="bg-orange-400/5"
              border="border-orange-400/20"
              description="Conservative estimate"
            />
          </div>

          {/* --- Confidence + performance --- */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1 mr-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/50 font-medium">
                    {prediction.confidence}% Confidence — Based on historical data
                  </span>
                  <span className="text-xs font-bold text-brand-400">{prediction.confidence}%</span>
                </div>
                <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${prediction.confidence}%`,
                      background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                    }}
                  />
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${perf.color} whitespace-nowrap`}>
                {perf.label}
              </span>
            </div>

            {/* Range bar visual */}
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className="text-emerald-400 font-medium">{formatRank(prediction.bestCase)}</span>
              <div className="flex-1 relative h-2 bg-dark-800 rounded-full overflow-hidden">
                {/* full range fill */}
                <div
                  className="absolute inset-y-0 rounded-full"
                  style={{
                    left: '0%',
                    right: '0%',
                    background: 'linear-gradient(90deg, #34d399 0%, #6366f1 50%, #fb923c 100%)',
                    opacity: 0.25,
                  }}
                />
                {/* expected marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-400 border-2 border-dark-900 shadow"
                  style={{ left: `calc(${(1 - prediction.expected / 500000) * 100}% - 6px)` }}
                />
              </div>
              <span className="text-orange-400 font-medium">{formatRank(prediction.worstCase)}</span>
            </div>
          </div>

          {/* --- Historical trend chart --- */}
          <div className="card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Historical Trend</h3>
                <p className="text-xs text-white/40 mt-0.5">
                  {examConfig.inputLabel} vs Rank — {examConfig.name}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/30 bg-dark-800 px-2 py-1 rounded-md">
                <div className="w-2 h-2 rounded-full bg-brand-400" />
                Expected Rank
              </div>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData.map(d => ({ [examConfig.inputLabel.toLowerCase()]: d.input, rank: d.rank }))}
                  margin={{ top: 5, right: 5, bottom: 5, left: 10 }}
                >
                  <defs>
                    <linearGradient id="rankGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis
                    dataKey={examConfig.inputLabel.toLowerCase()}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: examConfig.inputLabel, position: 'insideBottom', offset: -2, fill: 'rgba(255,255,255,0.2)', fontSize: 10 }}
                  />
                  <YAxis
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v =>
                      v >= 100000 ? `${(v / 100000).toFixed(0)}L` :
                      v >= 1000   ? `${(v / 1000).toFixed(0)}K` : `${v}`
                    }
                    reversed
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="rank"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fill="url(#rankGradient)"
                    dot={false}
                    activeDot={{ r: 5, fill: '#818cf8', stroke: '#6366f1', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Current input indicator below chart */}
            <div className="flex items-center gap-2 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <span className="text-white/40">Your {examConfig.inputLabel.toLowerCase()}:</span>
              <span className="text-brand-400 font-semibold">{inputDisplay}</span>
              <span className="text-white/20">→</span>
              <span className="text-white/50">Expected rank ~</span>
              <span className="text-white font-semibold">{formatRank(prediction.expected)}</span>
            </div>
          </div>

          {/* --- Save button --- */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                saved
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-400/30 cursor-default'
                  : 'btn-primary'
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Saved!
                </>
              ) : saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Saving…
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Prediction
                </>
              )}
            </button>
            <p className="text-xs text-white/30">
              {examConfig.inputLabel}: <span className="text-white/50 font-medium">{inputDisplay}</span>
              {' '}· Expected: <span className="text-brand-400 font-medium">{formatRank(prediction.expected)}</span>
            </p>
          </div>

          {/* --- Disclaimer --- */}
          <div className="flex gap-3 bg-amber-400/5 border border-amber-400/20 rounded-xl p-4">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-200/70 leading-relaxed">
              <span className="font-semibold text-amber-300">Disclaimer: </span>
              Predictions are based on historical {examConfig.name} data. Actual ranks may vary due to
              exam difficulty, number of candidates, and other factors. Use this as a reference only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
