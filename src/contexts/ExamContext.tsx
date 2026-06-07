import { createContext, useState, useEffect, useMemo, ReactNode } from 'react'
import type { ExamId, ExamConfig, CategoryOption, RankPrediction, RankPredictorFn, ReferenceRow, ChartDataPoint } from '@/data/examTypes'
import { getExamConfig, getExamCategories, getExamRankPredictor, getExamColleges, getExamReferenceRows, getExamChartData } from '@/data/examRegistry'
import type { College } from '@/data/colleges'

interface ExamContextValue {
  /** Currently selected exam id */
  selectedExam: ExamId
  /** Switch to a different exam */
  setExam: (id: ExamId) => void
  /** Full exam configuration */
  examConfig: ExamConfig
  /** Colleges for the selected exam */
  colleges: College[]
  /** Category options for the selected exam */
  categories: CategoryOption[]
  /** Rank predictor function for the selected exam */
  predictRank: RankPredictorFn
  /** Reference table rows for rank predictor UI */
  referenceRows: ReferenceRow[]
  /** Historical chart data for rank predictor UI */
  chartData: ChartDataPoint[]
  /** All available exam ids */
  availableExams: ExamId[]
}

const EXAM_STORAGE_KEY = 'counsello-selected-exam'

function loadSavedExam(): ExamId {
  try {
    const saved = localStorage.getItem(EXAM_STORAGE_KEY)
    if (saved === 'ts_eamcet' || saved === 'jee_main' || saved === 'jee_advanced') return saved
  } catch { /* ignore */ }
  return 'ts_eamcet'
}

export const ExamContext = createContext<ExamContextValue | null>(null)

export function ExamProvider({ children }: { children: ReactNode }) {
  const [selectedExam, setSelectedExam] = useState<ExamId>(loadSavedExam)

  // Persist selection
  useEffect(() => {
    localStorage.setItem(EXAM_STORAGE_KEY, selectedExam)
  }, [selectedExam])

  const setExam = (id: ExamId) => {
    setSelectedExam(id)
  }

  // Derive everything from selectedExam — memoised for performance
  const examConfig = useMemo(() => getExamConfig(selectedExam), [selectedExam])
  const colleges = useMemo(() => getExamColleges(selectedExam), [selectedExam])
  const categories = useMemo(() => getExamCategories(selectedExam), [selectedExam])
  const predictRank = useMemo(() => getExamRankPredictor(selectedExam), [selectedExam])
  const referenceRows = useMemo(() => getExamReferenceRows(selectedExam), [selectedExam])
  const chartData = useMemo(() => getExamChartData(selectedExam), [selectedExam])

  const availableExams: ExamId[] = ['ts_eamcet', 'jee_main', 'jee_advanced']

  const value = useMemo<ExamContextValue>(() => ({
    selectedExam,
    setExam,
    examConfig,
    colleges,
    categories,
    predictRank,
    referenceRows,
    chartData,
    availableExams,
  }), [selectedExam, examConfig, colleges, categories, predictRank, referenceRows, chartData])

  return (
    <ExamContext.Provider value={value}>
      {children}
    </ExamContext.Provider>
  )
}
