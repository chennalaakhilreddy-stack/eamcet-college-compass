import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useExam } from '@/hooks/useExam'
import type { College } from '@/data/colleges'
import {
  Shuffle, Trophy, Building2, BookOpen, ChevronDown,
  Plus, X, AlertTriangle, CheckCircle, Loader2
} from 'lucide-react'
import clsx from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PreferenceRow {
  id: string
  collegeId: string
  branchId: string
}

interface AllocationResult {
  preferenceIndex: number
  collegeName: string
  branchName: string
  cutoffRank: number
  userRank: number
  probability: number
  probabilityLabel: 'High' | 'Moderate' | 'Low'
  isAllotted: boolean
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Your Details' },
  { id: 2, label: 'Preferences' },
  { id: 3, label: 'Result' },
]

const MAX_PREFERENCES = 10

// colleges is now passed via props from the main component

// ─── Helper Components ─────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-8 select-none">
      {STEPS.map((step, idx) => {
        const isDone = current > step.id
        const isActive = current === step.id

        return (
          <div key={step.id} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={clsx(
                  'w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300',
                  isDone && 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30',
                  isActive && 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 ring-4 ring-brand-500/20',
                  !isDone && !isActive && 'bg-dark-800 text-dark-500 border border-dark-700'
                )}
              >
                {isDone ? <CheckCircle className="w-4.5 h-4.5 w-[18px] h-[18px]" /> : step.id}
              </div>
              <span
                className={clsx(
                  'text-xs font-medium transition-colors duration-300 whitespace-nowrap',
                  isActive && 'text-brand-400',
                  isDone && 'text-emerald-400',
                  !isDone && !isActive && 'text-dark-600'
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {idx < STEPS.length - 1 && (
              <div className="mx-3 mb-5 flex-1 h-px w-16 sm:w-24 transition-colors duration-300"
                style={{ background: current > step.id ? 'rgb(16 185 129)' : 'rgb(30 41 59)' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function ProgressBar({ step }: { step: number }) {
  const pct = ((step - 1) / (STEPS.length - 1)) * 100
  return (
    <div className="h-1 w-full bg-dark-800 rounded-full mb-6 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

interface SelectProps {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
  className?: string
}

function Select({ value, onChange, children, className }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={clsx(
          'input appearance-none pr-10 cursor-pointer',
          className
        )}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
    </div>
  )
}

// ─── Probability helpers ───────────────────────────────────────────────────────

function getProbabilityMeta(pct: number): {
  label: 'High' | 'Moderate' | 'Low'
  color: string
  barColor: string
  badge: string
} {
  if (pct > 70) return {
    label: 'High',
    color: 'text-emerald-400',
    barColor: 'bg-emerald-500',
    badge: 'bg-emerald-500/15 text-emerald-400',
  }
  if (pct > 40) return {
    label: 'Moderate',
    color: 'text-amber-400',
    barColor: 'bg-amber-500',
    badge: 'bg-amber-500/15 text-amber-400',
  }
  return {
    label: 'Low',
    color: 'text-red-400',
    barColor: 'bg-red-500',
    badge: 'bg-red-500/15 text-red-400',
  }
}

// ─── Allocation Algorithm ─────────────────────────────────────────────────────

function runAllocation(
  rank: number,
  category: string,
  preferences: PreferenceRow[],
  colleges: College[]
): AllocationResult[] {
  const results: AllocationResult[] = []
  let allotted = false

  for (let i = 0; i < preferences.length; i++) {
    const pref = preferences[i]
    if (!pref.collegeId || !pref.branchId) continue

    const college = colleges.find(c => c.id === pref.collegeId)
    if (!college) continue

    const branch = college.branches.find(b => b.id === pref.branchId)
    if (!branch) continue

    const cutoffData = branch.cutoffs[category]
    if (!cutoffData) continue

    const cutoff = cutoffData['2025']
    const isEligible = rank <= cutoff

    let probability = 0
    if (isEligible) {
      probability = Math.min(100, Math.round(((cutoff - rank) / cutoff) * 100))
    }

    const meta = getProbabilityMeta(probability)

    if (isEligible && !allotted) {
      allotted = true
      results.push({
        preferenceIndex: i,
        collegeName: college.name,
        branchName: branch.name,
        cutoffRank: cutoff,
        userRank: rank,
        probability,
        probabilityLabel: meta.label,
        isAllotted: true,
      })
    } else {
      results.push({
        preferenceIndex: i,
        collegeName: college.name,
        branchName: branch.name,
        cutoffRank: cutoff,
        userRank: rank,
        probability,
        probabilityLabel: meta.label,
        isAllotted: false,
      })
    }
  }

  return results
}

// ─── Step 1: Details Form ─────────────────────────────────────────────────────

interface Step1Props {
  rank: string
  setRank: (v: string) => void
  category: string
  setCategory: (v: string) => void
  gender: string
  setGender: (v: string) => void
  onNext: () => void
  examName: string
  categories: { value: string; label: string }[]
}

function Step1Form({ rank, setRank, category, setCategory, gender, setGender, onNext, examName, categories }: Step1Props) {
  const rankNum = parseInt(rank, 10)
  const isValid = !isNaN(rankNum) && rankNum >= 1 && rankNum <= 200000 && gender !== ''

  return (
    <div className="card p-6 sm:p-8 animate-in space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-brand-500/15 rounded-xl flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-brand-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-dark-100">Enter Your Details</h2>
          <p className="text-sm text-dark-500">We'll use this to simulate your seat allocation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Rank */}
        <div className="sm:col-span-2">
          <label className="label">{examName} Rank</label>
          <input
            type="number"
            min={1}
            max={200000}
            placeholder="e.g. 5420"
            value={rank}
            onChange={e => setRank(e.target.value)}
            className="input"
          />
          {rank && (isNaN(rankNum) || rankNum < 1 || rankNum > 200000) && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Enter a valid rank between 1 and 2,00,000
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <Select
            value={category}
            onChange={v => setCategory(v)}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </Select>
        </div>

        {/* Gender */}
        <div>
          <label className="label">Gender</label>
          <Select
            value={gender}
            onChange={setGender}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-xl bg-brand-500/8 border border-brand-500/20 p-4 text-sm text-dark-400">
        <span className="text-brand-400 font-semibold">Note: </span>
        This tool simulates the {examName} seat allocation using historical cutoff data.
        Results are indicative and may vary from actual counselling outcomes.
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="btn-primary"
        >
          Continue to Preferences →
        </button>
      </div>
    </div>
  )
}

// ─── Step 2: Preferences ──────────────────────────────────────────────────────

interface Step2Props {
  preferences: PreferenceRow[]
  setPreferences: (rows: PreferenceRow[]) => void
  onBack: () => void
  onRun: () => void
  isRunning: boolean
  colleges: College[]
}

function Step2Preferences({ preferences, setPreferences, onBack, onRun, isRunning, colleges }: Step2Props) {
  const filledRows = preferences.filter(p => p.collegeId && p.branchId)
  const canRun = filledRows.length >= 1

  const addRow = () => {
    if (preferences.length >= MAX_PREFERENCES) return
    setPreferences([...preferences, { id: crypto.randomUUID(), collegeId: '', branchId: '' }])
  }

  const removeRow = (id: string) => {
    if (preferences.length <= 1) return
    setPreferences(preferences.filter(p => p.id !== id))
  }

  const updateRow = (id: string, field: 'collegeId' | 'branchId', value: string) => {
    setPreferences(preferences.map(p => {
      if (p.id !== id) return p
      if (field === 'collegeId') return { ...p, collegeId: value, branchId: '' }
      return { ...p, [field]: value }
    }))
  }

  return (
    <div className="card p-6 sm:p-8 animate-in space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center">
          <Building2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-dark-100">College &amp; Branch Preferences</h2>
          <p className="text-sm text-dark-500">
            Add up to {MAX_PREFERENCES} preferences in order of priority
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {preferences.map((pref, idx) => {
          const selectedCollege = colleges.find(c => c.id === pref.collegeId)
          const branches = selectedCollege?.branches ?? []

          return (
            <div
              key={pref.id}
              className="flex items-start gap-3 p-4 rounded-xl bg-dark-800/60 border border-dark-700/60 hover:border-dark-600 transition-colors group"
            >
              {/* Preference number badge */}
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-dark-700 flex items-center justify-center text-xs font-bold text-dark-400 mt-2.5">
                {idx + 1}
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* College select */}
                <div>
                  <label className="text-xs text-dark-500 font-medium mb-1 block">College</label>
                  <Select
                    value={pref.collegeId}
                    onChange={v => updateRow(pref.id, 'collegeId', v)}
                  >
                    <option value="">Select college…</option>
                    {colleges.map(c => (
                      <option key={c.id} value={c.id}>{c.shortName} — {c.location}</option>
                    ))}
                  </Select>
                </div>

                {/* Branch select */}
                <div>
                  <label className="text-xs text-dark-500 font-medium mb-1 block">Branch</label>
                  <Select
                    value={pref.branchId}
                    onChange={v => updateRow(pref.id, 'branchId', v)}
                  >
                    <option value="">Select branch…</option>
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Remove btn */}
              <button
                onClick={() => removeRow(pref.id)}
                disabled={preferences.length <= 1}
                className="flex-shrink-0 mt-2.5 w-8 h-8 rounded-lg bg-dark-700 hover:bg-red-500/20 hover:text-red-400 text-dark-500 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>

      {/* Add row */}
      {preferences.length < MAX_PREFERENCES && (
        <button
          onClick={addRow}
          className="w-full py-3 rounded-xl border border-dashed border-dark-700 hover:border-brand-500/50 text-dark-500 hover:text-brand-400 flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-brand-500/5"
        >
          <Plus className="w-4 h-4" />
          Add preference ({preferences.length}/{MAX_PREFERENCES})
        </button>
      )}

      <div className="flex items-center justify-between gap-3 pt-2">
        <button onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button
          onClick={onRun}
          disabled={!canRun || isRunning}
          className="btn-primary"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Running Allocation…
            </>
          ) : (
            <>
              <Shuffle className="w-4 h-4" />
              Run Mock Allocation
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Step 3: Results ──────────────────────────────────────────────────────────

interface Step3Props {
  results: AllocationResult[]
  rank: number
  category: string
  onReset: () => void
  onSave: () => void
  isSaved: boolean
  categories: { value: string; label: string }[]
}

function Step3Results({ results, rank, category, onReset, onSave, isSaved, categories }: Step3Props) {
  const allotted = results.find(r => r.isAllotted)
  const catLabel = categories.find(c => c.value === category)?.label ?? category

  return (
    <div className="space-y-5 animate-in">
      {/* ── Success / No Allotment Banner ── */}
      {allotted ? (
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-teal-500/8 to-emerald-600/10 p-6 sm:p-8">
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-0.5">
                  Congratulations! Likely Allotment
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-dark-100 leading-tight">
                  {allotted.collegeName}
                </h2>
                <p className="text-emerald-400 font-semibold mt-0.5">{allotted.branchName}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
              <div className="bg-dark-900/60 rounded-xl p-3">
                <p className="text-xs text-dark-500 mb-0.5">Your Rank</p>
                <p className="text-lg font-bold text-dark-100">{rank.toLocaleString()}</p>
              </div>
              <div className="bg-dark-900/60 rounded-xl p-3">
                <p className="text-xs text-dark-500 mb-0.5">2025 Cutoff</p>
                <p className="text-lg font-bold text-dark-100">{allotted.cutoffRank.toLocaleString()}</p>
              </div>
              <div className="bg-dark-900/60 rounded-xl p-3 col-span-2 sm:col-span-1">
                <p className="text-xs text-dark-500 mb-0.5">Category</p>
                <p className="text-sm font-bold text-dark-200">{catLabel}</p>
              </div>
            </div>

            {/* Probability bar */}
            <div className="bg-dark-900/60 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-dark-300">Allotment Probability</span>
                <div className="flex items-center gap-2">
                  <span className={clsx('text-xl font-bold', getProbabilityMeta(allotted.probability).color)}>
                    {allotted.probability}%
                  </span>
                  <span className={clsx('badge', getProbabilityMeta(allotted.probability).badge)}>
                    {allotted.probabilityLabel}
                  </span>
                </div>
              </div>
              <div className="h-3 w-full bg-dark-700 rounded-full overflow-hidden">
                <div
                  className={clsx(
                    'h-full rounded-full transition-all duration-700 ease-out',
                    getProbabilityMeta(allotted.probability).barColor
                  )}
                  style={{ width: `${allotted.probability}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-dark-600 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            <p className="text-xs text-dark-500 mt-4 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Preference #{(allotted.preferenceIndex + 1).toString()} in your list
            </p>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/8 to-dark-800 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-500/15 border border-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <X className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-0.5">
                No Allotment Found
              </p>
              <h2 className="text-xl font-bold text-dark-100">Your rank exceeds all cutoffs</h2>
              <p className="text-sm text-dark-400 mt-1">
                None of your selected preferences match your rank for the {catLabel} category.
                Try adding more preferences with higher cutoffs, or consider other categories.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Preference Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-dark-700/60">
          <h3 className="font-semibold text-dark-200">Allocation Summary</h3>
          <p className="text-xs text-dark-500 mt-0.5">All preferences evaluated in priority order</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-700/60 text-dark-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-semibold">#</th>
                <th className="text-left px-5 py-3 font-semibold">College</th>
                <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">Branch</th>
                <th className="text-right px-5 py-3 font-semibold hidden md:table-cell">Cutoff</th>
                <th className="text-right px-5 py-3 font-semibold hidden md:table-cell">Probability</th>
                <th className="text-center px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {results.map((r, idx) => (
                <tr
                  key={idx}
                  className={clsx(
                    'transition-colors',
                    r.isAllotted
                      ? 'bg-emerald-500/6 hover:bg-emerald-500/10'
                      : 'hover:bg-dark-800/40 opacity-60'
                  )}
                >
                  <td className="px-5 py-3.5 text-dark-500 font-mono text-xs">
                    {r.preferenceIndex + 1}
                  </td>
                  <td className="px-5 py-3.5">
                    <p className={clsx(
                      'font-medium leading-snug',
                      r.isAllotted ? 'text-dark-100' : 'text-dark-400 line-through decoration-dark-600'
                    )}>
                      {r.collegeName}
                    </p>
                    <p className="text-xs text-dark-600 sm:hidden mt-0.5">{r.branchName}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className={clsx(
                      'text-xs font-medium',
                      r.isAllotted ? 'text-emerald-400' : 'text-dark-500'
                    )}>
                      {r.branchName}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-right font-mono text-xs text-dark-400">
                    {r.cutoffRank.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-right">
                    {r.isAllotted ? (
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                          <div
                            className={clsx('h-full rounded-full', getProbabilityMeta(r.probability).barColor)}
                            style={{ width: `${r.probability}%` }}
                          />
                        </div>
                        <span className={clsx('text-xs font-bold', getProbabilityMeta(r.probability).color)}>
                          {r.probability}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-dark-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    {r.isAllotted ? (
                      <span className="badge bg-emerald-500/15 text-emerald-400">
                        <CheckCircle className="w-3 h-3" /> Allotted
                      </span>
                    ) : (
                      <span className="badge bg-dark-700 text-dark-500">
                        <X className="w-3 h-3" /> Not Allotted
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="rounded-xl bg-amber-500/8 border border-amber-500/25 p-4 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-300/80 space-y-1">
          <p className="font-semibold text-amber-400">Simulation Disclaimer</p>
          <p>
            This is a <strong>mock simulation only</strong>. Results are based on 2025 cutoff data and may not
            reflect actual counselling outcomes. Actual seat allotment depends on many additional factors including
            tuition fee payment, document verification, web options order, and real-time seat availability.
            Always refer to official counselling notifications for your exam.
          </p>
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <button
          onClick={onSave}
          disabled={isSaved}
          className={clsx(
            'btn-secondary gap-2',
            isSaved && 'opacity-60 cursor-not-allowed'
          )}
        >
          {isSaved ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Saved to History
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4" />
              Save to History
            </>
          )}
        </button>
        <button onClick={onReset} className="btn-primary">
          <Shuffle className="w-4 h-4" />
          Run Again
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MockAllocator() {
  const { user, updateUser } = useAuth()
  const { examConfig, colleges, categories } = useExam()

  // Step
  const [step, setStep] = useState(1)

  // Step 1 state
  const [rank, setRank] = useState('')
  const [category, setCategory] = useState<string>(categories[0]?.value ?? 'OC')
  const [gender, setGender] = useState('')

  // Step 2 state
  const [preferences, setPreferences] = useState<PreferenceRow[]>([
    { id: crypto.randomUUID(), collegeId: '', branchId: '' },
    { id: crypto.randomUUID(), collegeId: '', branchId: '' },
    { id: crypto.randomUUID(), collegeId: '', branchId: '' },
  ])

  // Step 3 state
  const [results, setResults] = useState<AllocationResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const rankNum = parseInt(rank, 10)

  // ── Navigation ──

  const goToStep2 = () => {
    const n = parseInt(rank, 10)
    if (isNaN(n) || n < 1 || n > 200000 || !gender) return
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToStep1 = () => {
    setStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const runAlloc = () => {
    setIsRunning(true)
    setIsSaved(false)
    // Simulate async processing
    setTimeout(() => {
      const validPrefs = preferences.filter(p => p.collegeId && p.branchId)
      const res = runAllocation(rankNum, category, validPrefs, colleges)
      setResults(res)
      setIsRunning(false)
      setStep(3)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1200)
  }

  const handleReset = () => {
    setStep(1)
    setRank('')
    setCategory('OC')
    setGender('')
    setPreferences([
      { id: crypto.randomUUID(), collegeId: '', branchId: '' },
      { id: crypto.randomUUID(), collegeId: '', branchId: '' },
      { id: crypto.randomUUID(), collegeId: '', branchId: '' },
    ])
    setResults([])
    setIsSaved(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSave = () => {
    if (!user || isSaved) return
    const allotted = results.find(r => r.isAllotted)
    const record = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      result: {
        rank: rankNum,
        category,
        gender,
        allottedCollege: allotted?.collegeName ?? null,
        allottedBranch: allotted?.branchName ?? null,
        probability: allotted?.probability ?? null,
        preferences: results.map(r => ({
          college: r.collegeName,
          branch: r.branchName,
          status: r.isAllotted ? 'Allotted' : 'Not Allotted',
        })),
      },
    }
    updateUser({
      mockHistory: [record, ...(user.mockHistory ?? [])].slice(0, 20),
    })
    setIsSaved(true)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in">
      {/* ── Page header ── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 bg-emerald-500/20 rounded flex items-center justify-center">
            <Shuffle className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            {examConfig.name} {examConfig.currentYear}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-dark-100">Mock Seat Allocator</h1>
        <p className="text-dark-400 mt-1 text-sm">
          Simulate the official counselling seat allotment process with your real rank and preferences.
        </p>
      </div>

      {/* ── Stepper + Progress ── */}
      <ProgressBar step={step} />
      <StepIndicator current={step} />

      {/* ── Step Content ── */}
      {step === 1 && (
        <Step1Form
          rank={rank}
          setRank={setRank}
          category={category}
          setCategory={setCategory}
          gender={gender}
          setGender={setGender}
          onNext={goToStep2}
          examName={examConfig.name}
          categories={categories}
        />
      )}

      {step === 2 && (
        <Step2Preferences
          preferences={preferences}
          setPreferences={setPreferences}
          onBack={goToStep1}
          onRun={runAlloc}
          isRunning={isRunning}
          colleges={colleges}
        />
      )}

      {step === 3 && results.length > 0 && (
        <Step3Results
          results={results}
          rank={rankNum}
          category={category}
          onReset={handleReset}
          onSave={handleSave}
          isSaved={isSaved}
          categories={categories}
        />
      )}
    </div>
  )
}
