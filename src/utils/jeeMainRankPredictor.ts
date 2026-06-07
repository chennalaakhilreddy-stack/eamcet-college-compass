// ─── JEE Main Rank Predictor ──────────────────────────────────────────────────
// Converts percentile → CRL (Common Rank List) rank
// Updated with realistic prediction ranges based on user-specified data

import type { RankPrediction, ReferenceRow, ChartDataPoint } from '@/data/examTypes'

// ~12 lakh candidates in JEE Main 2025 (Session 1+2)
const TOTAL_CANDIDATES = 1200000

interface PercentileRankPoint {
  percentile: number
  bestCase: number
  expected: number
  worstCase: number
}

// Calibration data: percentile → rank bands
// Based on user-specified realistic ranges
const calibrationData: PercentileRankPoint[] = [
  { percentile: 100.00, bestCase: 1,      expected: 1,       worstCase: 1 },
  { percentile: 99.99,  bestCase: 1,      expected: 8,       worstCase: 15 },
  { percentile: 99.98,  bestCase: 10,     expected: 20,      worstCase: 35 },
  { percentile: 99.95,  bestCase: 40,     expected: 70,      worstCase: 110 },
  { percentile: 99.9,   bestCase: 800,    expected: 1500,    worstCase: 2200 },
  { percentile: 99.8,   bestCase: 1800,   expected: 2800,    worstCase: 3800 },
  { percentile: 99.7,   bestCase: 2800,   expected: 4000,    worstCase: 5200 },
  { percentile: 99.5,   bestCase: 4500,   expected: 7000,    worstCase: 9500 },
  { percentile: 99.3,   bestCase: 7000,   expected: 10000,   worstCase: 13000 },
  { percentile: 99.0,   bestCase: 10000,  expected: 14000,   worstCase: 18000 },
  { percentile: 98.5,   bestCase: 16000,  expected: 22000,   worstCase: 28000 },
  { percentile: 98.0,   bestCase: 24000,  expected: 32000,   worstCase: 40000 },
  { percentile: 97.5,   bestCase: 34000,  expected: 45000,   worstCase: 55000 },
  { percentile: 97.0,   bestCase: 45000,  expected: 58000,   worstCase: 70000 },
  { percentile: 96.0,   bestCase: 60000,  expected: 72000,   worstCase: 85000 },
  { percentile: 95.0,   bestCase: 75000,  expected: 95000,   worstCase: 110000 },
  { percentile: 94.0,   bestCase: 95000,  expected: 115000,  worstCase: 130000 },
  { percentile: 93.0,   bestCase: 115000, expected: 135000,  worstCase: 155000 },
  { percentile: 92.0,   bestCase: 135000, expected: 155000,  worstCase: 180000 },
  { percentile: 91.0,   bestCase: 155000, expected: 180000,  worstCase: 210000 },
  { percentile: 90.0,   bestCase: 175000, expected: 200000,  worstCase: 230000 },
  { percentile: 88.0,   bestCase: 210000, expected: 240000,  worstCase: 280000 },
  { percentile: 86.0,   bestCase: 240000, expected: 280000,  worstCase: 320000 },
  { percentile: 84.0,   bestCase: 270000, expected: 320000,  worstCase: 370000 },
  { percentile: 82.0,   bestCase: 310000, expected: 360000,  worstCase: 420000 },
  { percentile: 80.0,   bestCase: 350000, expected: 400000,  worstCase: 480000 },
  { percentile: 75.0,   bestCase: 250000, expected: 310000,  worstCase: 380000 },
  { percentile: 70.0,   bestCase: 310000, expected: 380000,  worstCase: 460000 },
  { percentile: 60.0,   bestCase: 420000, expected: 500000,  worstCase: 600000 },
  { percentile: 50.0,   bestCase: 530000, expected: 630000,  worstCase: 750000 },
  { percentile: 40.0,   bestCase: 650000, expected: 750000,  worstCase: 880000 },
  { percentile: 30.0,   bestCase: 780000, expected: 880000,  worstCase: 1000000 },
  { percentile: 20.0,   bestCase: 900000, expected: 1000000, worstCase: 1100000 },
  { percentile: 10.0,   bestCase: 1000000,expected: 1100000, worstCase: 1200000 },
  { percentile: 0.0,    bestCase: 1100000,expected: 1200000, worstCase: 1200000 },
]

function interpolate(x: number, x1: number, x2: number, y1: number, y2: number): number {
  if (x1 === x2) return (y1 + y2) / 2
  const t = (x - x1) / (x2 - x1)
  const t2 = t * t * (3 - 2 * t) // smooth cubic interpolation
  return Math.round(y1 + t2 * (y2 - y1))
}

export function predictJeeMainRank(percentile: number): RankPrediction {
  const clamped = Math.max(0, Math.min(100, percentile))

  // Find surrounding calibration points (data sorted high → low percentile)
  let lower: PercentileRankPoint | null = null
  let upper: PercentileRankPoint | null = null

  for (let i = 0; i < calibrationData.length; i++) {
    if (calibrationData[i].percentile <= clamped) {
      upper = calibrationData[i]
      if (i > 0) lower = calibrationData[i - 1]
      break
    }
    lower = calibrationData[i]
  }

  if (!upper && lower) {
    const rawRank = Math.round((100 - clamped) / 100 * TOTAL_CANDIDATES)
    return {
      bestCase: Math.round(rawRank * 0.85),
      expected: rawRank,
      worstCase: Math.round(rawRank * 1.2),
      confidence: 40,
      inputValue: percentile,
      label: 'Very Low',
    }
  }

  if (!lower && upper) {
    return {
      bestCase: upper.bestCase,
      expected: upper.expected,
      worstCase: upper.worstCase,
      confidence: 95,
      inputValue: percentile,
      label: 'Exceptional',
    }
  }

  if (!lower || !upper) {
    return {
      bestCase: 1,
      expected: 5,
      worstCase: 20,
      confidence: 80,
      inputValue: percentile,
      label: 'Top',
    }
  }

  const bestCase = interpolate(clamped, upper.percentile, lower.percentile, upper.bestCase, lower.bestCase)
  const expected = interpolate(clamped, upper.percentile, lower.percentile, upper.expected, lower.expected)
  const worstCase = interpolate(clamped, upper.percentile, lower.percentile, upper.worstCase, lower.worstCase)

  // Confidence
  let confidence = 85
  if (percentile < 10 || percentile > 99.95) confidence = 70
  else if (percentile < 20 || percentile > 99.9) confidence = 75
  else if (percentile >= 90) confidence = 90

  // Label
  let label = 'Good'
  if (expected <= 100) label = 'Exceptional'
  else if (expected <= 1500) label = 'Excellent'
  else if (expected <= 7000) label = 'Very Good'
  else if (expected <= 14000) label = 'Good'
  else if (expected <= 42000) label = 'Average'
  else if (expected <= 120000) label = 'Below Average'
  else label = 'Low'

  return {
    bestCase: Math.max(1, bestCase),
    expected: Math.max(1, expected),
    worstCase: Math.max(1, worstCase),
    confidence,
    inputValue: percentile,
    label,
  }
}

/** Reference table for JEE Main rank predictor UI */
export const jeeMainReferenceRows: ReferenceRow[] = [
  { input: 99.9, rank: '~1,500' },
  { input: 99.5, rank: '~7,000' },
  { input: 99.0, rank: '~14,000' },
  { input: 98.0, rank: '~32,000' },
  { input: 97.0, rank: '~58,000' },
  { input: 96.0, rank: '70,000–75,000' },
  { input: 95.0, rank: '85,000–1,10,000' },
  { input: 93.0, rank: '~1,35,000' },
  { input: 90.0, rank: '~2,00,000' },
  { input: 85.0, rank: '~3,00,000' },
  { input: 80.0, rank: '~4,00,000' },
]

/** Historical chart data for JEE Main */
export const jeeMainChartData: ChartDataPoint[] = [
  { input: 99.9, rank: 1500 },
  { input: 99.5, rank: 7000 },
  { input: 99.0, rank: 14000 },
  { input: 98.0, rank: 32000 },
  { input: 97.0, rank: 58000 },
  { input: 96.0, rank: 72000 },
  { input: 95.0, rank: 95000 },
  { input: 93.0, rank: 135000 },
  { input: 90.0, rank: 200000 },
  { input: 85.0, rank: 300000 },
  { input: 80.0, rank: 400000 },
  { input: 70.0, rank: 380000 },
  { input: 60.0, rank: 500000 },
]
