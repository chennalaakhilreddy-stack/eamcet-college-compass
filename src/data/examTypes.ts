// ─── Shared Exam Types ────────────────────────────────────────────────────────
// These types power the multi-exam architecture. Adding a new exam means:
// 1. Add its ExamId here
// 2. Create its data file (like jeeMainColleges.ts)
// 3. Register it in examRegistry.ts
// That's it — all pages automatically support it via ExamContext.

export type ExamId = 'ts_eamcet' | 'jee_main' | 'jee_advanced'

export interface ExamConfig {
  id: ExamId
  name: string
  shortName: string
  description: string
  /** 'marks' for TS EAMCET (0-160) / JEE Advanced (0-360), 'percentile' for JEE Main (0-100) */
  inputType: 'marks' | 'percentile'
  inputLabel: string
  inputMax: number
  inputMin: number
  inputStep: number
  /** The primary year for cutoff data, e.g. "2025" */
  currentYear: string
  /** All years with data */
  years: string[]
  /** Category options for this exam */
  categories: CategoryOption[]
  /** Available branches */
  branches: BranchOption[]
  /** Whether the exam uses Home State for counselling */
  hasHomeState: boolean
  /** Available states (only if hasHomeState = true) */
  homeStates: string[]
  /** Color accent for the exam badge */
  accentColor: string
  /** Icon identifier */
  icon: 'graduation' | 'flask' | 'atom'
}

export interface CategoryOption {
  value: string
  label: string
}

export interface BranchOption {
  id: string
  name: string
  shortName: string
}

/** Unified rank prediction result — used by all exams */
export interface RankPrediction {
  bestCase: number
  expected: number
  worstCase: number
  confidence: number
  inputValue: number
  label: string
}

/** A function that takes input (marks or percentile) and returns a prediction */
export type RankPredictorFn = (input: number) => RankPrediction

/** Reference table row for rank predictor UI */
export interface ReferenceRow {
  input: number
  rank: string
}

/** Historical chart data point */
export interface ChartDataPoint {
  input: number
  rank: number
}
