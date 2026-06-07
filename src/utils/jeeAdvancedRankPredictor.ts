// ─── JEE Advanced Rank Predictor ──────────────────────────────────────────────
// Converts marks (out of 360) → AIR (All India Rank)
// ~1.8 lakh qualify from JEE Main, ~1.6 lakh actually appear
// Calibrated against JEE Advanced 2023-2025 historical patterns

import type { RankPrediction, ReferenceRow, ChartDataPoint } from '@/data/examTypes'

const TOTAL_APPEARED = 160000

interface MarksRankPoint {
  marks: number
  bestCase: number
  expected: number
  worstCase: number
}

// Calibration data: marks (out of 360) → rank bands
// Sorted high → low marks. Best/expected/worst give realistic spread.
const calibrationData: MarksRankPoint[] = [
  { marks: 360, bestCase: 1,     expected: 1,      worstCase: 1 },
  { marks: 340, bestCase: 1,     expected: 1,      worstCase: 3 },
  { marks: 320, bestCase: 1,     expected: 3,      worstCase: 8 },
  { marks: 300, bestCase: 1,     expected: 5,      worstCase: 10 },
  { marks: 280, bestCase: 20,    expected: 35,     worstCase: 50 },
  { marks: 260, bestCase: 50,    expected: 85,     worstCase: 120 },
  { marks: 240, bestCase: 120,   expected: 200,    worstCase: 300 },
  { marks: 220, bestCase: 300,   expected: 500,    worstCase: 700 },
  { marks: 200, bestCase: 700,   expected: 1100,   worstCase: 1500 },
  { marks: 180, bestCase: 1500,  expected: 2200,   worstCase: 3000 },
  { marks: 160, bestCase: 3000,  expected: 4200,   worstCase: 5500 },
  { marks: 140, bestCase: 5500,  expected: 7200,   worstCase: 9000 },
  { marks: 120, bestCase: 9000,  expected: 11500,  worstCase: 14000 },
  { marks: 100, bestCase: 14000, expected: 18000,  worstCase: 22000 },
  { marks: 80,  bestCase: 22000, expected: 28000,  worstCase: 35000 },
  { marks: 60,  bestCase: 35000, expected: 44000,  worstCase: 55000 },
  { marks: 40,  bestCase: 55000, expected: 68000,  worstCase: 85000 },
  { marks: 20,  bestCase: 85000, expected: 110000, worstCase: 140000 },
  { marks: 0,   bestCase: 130000,expected: 155000, worstCase: 160000 },
]

function interpolate(x: number, x1: number, x2: number, y1: number, y2: number): number {
  if (x1 === x2) return (y1 + y2) / 2
  const t = (x - x1) / (x2 - x1)
  const t2 = t * t * (3 - 2 * t) // smooth cubic interpolation
  return Math.round(y1 + t2 * (y2 - y1))
}

export function predictJeeAdvancedRank(marks: number): RankPrediction {
  const clamped = Math.max(0, Math.min(360, marks))

  // Find surrounding calibration points (data sorted high → low marks)
  let lower: MarksRankPoint | null = null
  let upper: MarksRankPoint | null = null

  for (let i = 0; i < calibrationData.length; i++) {
    if (calibrationData[i].marks <= clamped) {
      upper = calibrationData[i]
      if (i > 0) lower = calibrationData[i - 1]
      break
    }
    lower = calibrationData[i]
  }

  if (!upper && lower) {
    // Below minimum calibration point
    const rawRank = Math.round((1 - clamped / 360) * TOTAL_APPEARED)
    return {
      bestCase: Math.round(rawRank * 0.8),
      expected: rawRank,
      worstCase: Math.min(TOTAL_APPEARED, Math.round(rawRank * 1.25)),
      confidence: 40,
      inputValue: marks,
      label: 'Very Low',
    }
  }

  if (!lower && upper) {
    return {
      bestCase: upper.bestCase,
      expected: upper.expected,
      worstCase: upper.worstCase,
      confidence: 95,
      inputValue: marks,
      label: 'Exceptional',
    }
  }

  if (!lower || !upper) {
    return {
      bestCase: 1,
      expected: 3,
      worstCase: 10,
      confidence: 80,
      inputValue: marks,
      label: 'Top',
    }
  }

  // Interpolate between two surrounding calibration points
  const bestCase = interpolate(clamped, upper.marks, lower.marks, upper.bestCase, lower.bestCase)
  const expected = interpolate(clamped, upper.marks, lower.marks, upper.expected, lower.expected)
  const worstCase = interpolate(clamped, upper.marks, lower.marks, upper.worstCase, lower.worstCase)

  // Confidence — higher near mid-range where data is densest
  let confidence = 85
  if (marks < 20 || marks > 340) confidence = 65
  else if (marks < 40 || marks > 300) confidence = 70
  else if (marks >= 100 && marks <= 260) confidence = 90

  // Performance label
  let label = 'Good'
  if (expected <= 10) label = 'Exceptional'
  else if (expected <= 100) label = 'Outstanding'
  else if (expected <= 500) label = 'Excellent'
  else if (expected <= 2000) label = 'Very Good'
  else if (expected <= 7000) label = 'Good'
  else if (expected <= 18000) label = 'Above Average'
  else if (expected <= 40000) label = 'Average'
  else if (expected <= 80000) label = 'Below Average'
  else label = 'Low'

  return {
    bestCase: Math.max(1, bestCase),
    expected: Math.max(1, expected),
    worstCase: Math.max(1, worstCase),
    confidence,
    inputValue: marks,
    label,
  }
}

/** Reference table for JEE Advanced rank predictor UI */
export const jeeAdvancedReferenceRows: ReferenceRow[] = [
  { input: 300, rank: 'Top 10' },
  { input: 280, rank: 'Top 35' },
  { input: 260, rank: 'Top 85' },
  { input: 240, rank: 'Top 200' },
  { input: 220, rank: 'Top 500' },
  { input: 200, rank: 'Top 1,100' },
  { input: 180, rank: 'Top 2,200' },
  { input: 160, rank: 'Top 4,200' },
  { input: 140, rank: 'Top 7,200' },
  { input: 120, rank: 'Top 11,500' },
  { input: 100, rank: 'Top 18,000' },
  { input: 80,  rank: 'Top 28,000' },
  { input: 60,  rank: 'Top 44,000' },
]

/** Historical chart data for JEE Advanced */
export const jeeAdvancedChartData: ChartDataPoint[] = [
  { input: 300, rank: 5 },
  { input: 280, rank: 35 },
  { input: 260, rank: 85 },
  { input: 240, rank: 200 },
  { input: 220, rank: 500 },
  { input: 200, rank: 1100 },
  { input: 180, rank: 2200 },
  { input: 160, rank: 4200 },
  { input: 140, rank: 7200 },
  { input: 120, rank: 11500 },
  { input: 100, rank: 18000 },
  { input: 80,  rank: 28000 },
  { input: 60,  rank: 44000 },
  { input: 40,  rank: 68000 },
]
