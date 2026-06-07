// ─── Exam Registry ────────────────────────────────────────────────────────────
// Central registry mapping ExamId → config, data accessors, rank predictor.
// To add a new exam:
// 1. Add its ExamId to examTypes.ts
// 2. Create its data file (colleges + rank predictor)
// 3. Register it here
// All pages auto-support the new exam via ExamContext.

import type { ExamId, ExamConfig, CategoryOption, RankPredictorFn, ReferenceRow, ChartDataPoint } from '@/data/examTypes'
import type { College } from '@/data/colleges'
import { getAllColleges, CATEGORIES } from '@/data/colleges'
import { predictRank as predictEamcetRank } from '@/utils/rankPredictor'
import { predictJeeMainRank, jeeMainReferenceRows, jeeMainChartData } from '@/utils/jeeMainRankPredictor'
import { predictJeeAdvancedRank, jeeAdvancedReferenceRows, jeeAdvancedChartData } from '@/utils/jeeAdvancedRankPredictor'
import { getAllJeeMainColleges } from '@/data/jeeMainColleges'
import { getAllJeeAdvancedColleges } from '@/data/jeeAdvancedColleges'

// ─── Exam Configs ─────────────────────────────────────────────────────────────

const TS_EAMCET_CONFIG: ExamConfig = {
  id: 'ts_eamcet',
  name: 'TS EAMCET',
  shortName: 'EAMCET',
  description: 'Telangana State Engineering, Agriculture & Medical Common Entrance Test',
  inputType: 'marks',
  inputLabel: 'Marks',
  inputMax: 160,
  inputMin: 0,
  inputStep: 1,
  currentYear: '2025',
  years: ['2023', '2024', '2025'],
  categories: CATEGORIES.map(c => ({ value: c.value, label: c.label })),
  branches: [
    { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE' },
    { id: 'cse_aiml', name: 'CSE (AI & ML)', shortName: 'CSE AI&ML' },
    { id: 'cse_ds', name: 'CSE (Data Science)', shortName: 'CSE DS' },
    { id: 'cse_cs', name: 'CSE (Cyber Security)', shortName: 'CSE CS' },
    { id: 'it', name: 'Information Technology', shortName: 'IT' },
    { id: 'ece', name: 'Electronics & Communication Engineering', shortName: 'ECE' },
    { id: 'eee', name: 'Electrical & Electronics Engineering', shortName: 'EEE' },
    { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH' },
    { id: 'civil', name: 'Civil Engineering', shortName: 'CIVIL' },
  ],
  hasHomeState: false,
  homeStates: [],
  accentColor: '#6366f1', // indigo
  icon: 'graduation',
}

const JEE_MAIN_CATEGORIES: CategoryOption[] = [
  { value: 'General', label: 'General (Open)' },
  { value: 'EWS', label: 'EWS (Economically Weaker Section)' },
  { value: 'OBC_NCL', label: 'OBC-NCL (Non-Creamy Layer)' },
  { value: 'SC', label: 'SC (Scheduled Caste)' },
  { value: 'ST', label: 'ST (Scheduled Tribe)' },
]

const JEE_MAIN_CONFIG: ExamConfig = {
  id: 'jee_main',
  name: 'JEE Main',
  shortName: 'JEE',
  description: 'Joint Entrance Examination — Main (NITs, IIITs, GFTIs)',
  inputType: 'percentile',
  inputLabel: 'Percentile',
  inputMax: 100,
  inputMin: 0,
  inputStep: 0.01,
  currentYear: '2025',
  years: ['2023', '2024', '2025'],
  categories: JEE_MAIN_CATEGORIES,
  branches: [
    { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE' },
    { id: 'csai', name: 'CSE (Artificial Intelligence)', shortName: 'CSAI' },
    { id: 'csd', name: 'CSE (Design)', shortName: 'CSD' },
    { id: 'it', name: 'Information Technology', shortName: 'IT' },
    { id: 'ece', name: 'Electronics & Communication Engineering', shortName: 'ECE' },
    { id: 'eee', name: 'Electrical & Electronics Engineering', shortName: 'EEE' },
    { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH' },
  ],
  hasHomeState: true,
  homeStates: [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal',
  ],
  accentColor: '#f59e0b', // amber
  icon: 'flask',
}

const JEE_ADVANCED_CATEGORIES: CategoryOption[] = [
  { value: 'General', label: 'General (Open)' },
  { value: 'EWS', label: 'EWS (Economically Weaker Section)' },
  { value: 'OBC_NCL', label: 'OBC-NCL (Non-Creamy Layer)' },
  { value: 'SC', label: 'SC (Scheduled Caste)' },
  { value: 'ST', label: 'ST (Scheduled Tribe)' },
]

const JEE_ADVANCED_CONFIG: ExamConfig = {
  id: 'jee_advanced',
  name: 'JEE Advanced',
  shortName: 'Adv',
  description: 'Joint Entrance Examination — Advanced (IITs only)',
  inputType: 'marks',
  inputLabel: 'Marks',
  inputMax: 360,
  inputMin: 0,
  inputStep: 1,
  currentYear: '2025',
  years: ['2023', '2024', '2025'],
  categories: JEE_ADVANCED_CATEGORIES,
  branches: [
    { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE' },
    { id: 'ee', name: 'Electrical Engineering', shortName: 'EE' },
    { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE' },
    { id: 'mech', name: 'Mechanical Engineering', shortName: 'ME' },
    { id: 'chem', name: 'Chemical Engineering', shortName: 'ChemE' },
    { id: 'civil', name: 'Civil Engineering', shortName: 'CE' },
    { id: 'aerospace', name: 'Aerospace Engineering', shortName: 'Aero' },
    { id: 'metallurgy', name: 'Metallurgical Engineering', shortName: 'Metal' },
  ],
  hasHomeState: false,
  homeStates: [],
  accentColor: '#ef4444', // red
  icon: 'atom',
}

// ─── TS EAMCET Reference/Chart Data ───────────────────────────────────────────

const EAMCET_REFERENCE_ROWS: ReferenceRow[] = [
  { input: 160, rank: 'Top 100' },
  { input: 140, rank: 'Top 500' },
  { input: 120, rank: 'Top 2,000' },
  { input: 100, rank: 'Top 5,000' },
  { input: 90, rank: '1,000–1,500' },
  { input: 80, rank: '3,000–6,000' },
  { input: 70, rank: '8,000–12,000' },
  { input: 65, rank: '10,000–15,000' },
  { input: 60, rank: '15,000–25,000' },
  { input: 50, rank: '30,000–50,000' },
  { input: 40, rank: '65,000–1,20,000' },
]

const EAMCET_CHART_DATA: ChartDataPoint[] = [
  { input: 40, rank: 90000 },
  { input: 50, rank: 40000 },
  { input: 60, rank: 20000 },
  { input: 65, rank: 13000 },
  { input: 70, rank: 10000 },
  { input: 80, rank: 5000 },
  { input: 90, rank: 10000 },
  { input: 100, rank: 5000 },
  { input: 120, rank: 2000 },
  { input: 140, rank: 500 },
  { input: 160, rank: 5 },
]

// ─── Registry Map ─────────────────────────────────────────────────────────────

const CONFIGS: Record<ExamId, ExamConfig> = {
  ts_eamcet: TS_EAMCET_CONFIG,
  jee_main: JEE_MAIN_CONFIG,
  jee_advanced: JEE_ADVANCED_CONFIG,
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getExamConfig(examId: ExamId): ExamConfig {
  return CONFIGS[examId]
}

export function getExamColleges(examId: ExamId): College[] {
  switch (examId) {
    case 'ts_eamcet':
      return getAllColleges()
    case 'jee_main':
      return getAllJeeMainColleges()
    case 'jee_advanced':
      return getAllJeeAdvancedColleges()
    default:
      return []
  }
}

export function getExamCategories(examId: ExamId): CategoryOption[] {
  return CONFIGS[examId].categories
}

export function getExamRankPredictor(examId: ExamId): RankPredictorFn {
  switch (examId) {
    case 'ts_eamcet':
      return (input: number) => {
        const result = predictEamcetRank(input)
        return {
          bestCase: result.bestCase,
          expected: result.expected,
          worstCase: result.worstCase,
          confidence: result.confidence,
          inputValue: input,
          label: result.label,
        }
      }
    case 'jee_main':
      return predictJeeMainRank
    case 'jee_advanced':
      return predictJeeAdvancedRank
    default:
      return () => ({
        bestCase: 0,
        expected: 0,
        worstCase: 0,
        confidence: 0,
        inputValue: 0,
        label: 'Unknown',
      })
  }
}

export function getExamReferenceRows(examId: ExamId): ReferenceRow[] {
  switch (examId) {
    case 'ts_eamcet':
      return EAMCET_REFERENCE_ROWS
    case 'jee_main':
      return jeeMainReferenceRows
    case 'jee_advanced':
      return jeeAdvancedReferenceRows
    default:
      return []
  }
}

export function getExamChartData(examId: ExamId): ChartDataPoint[] {
  switch (examId) {
    case 'ts_eamcet':
      return EAMCET_CHART_DATA
    case 'jee_main':
      return jeeMainChartData
    case 'jee_advanced':
      return jeeAdvancedChartData
    default:
      return []
  }
}

/** Get all registered exam IDs */
export function getAllExamIds(): ExamId[] {
  return Object.keys(CONFIGS) as ExamId[]
}

/** Get all registered exam configs */
export function getAllExamConfigs(): ExamConfig[] {
  return Object.values(CONFIGS)
}
