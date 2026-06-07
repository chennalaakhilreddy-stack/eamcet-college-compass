// ─── TS EAMCET Rank Predictor ─────────────────────────────────────────────────
// Historical marks vs rank data for TS EAMCET
// Updated with realistic prediction ranges based on actual historical trends

interface MarkRankPoint {
  marks: number
  bestCase: number
  expected: number
  worstCase: number
}

// Calibration data points (marks out of 160)
// Based on user-specified realistic ranges
const calibrationData: MarkRankPoint[] = [
  { marks: 160, bestCase: 1,      expected: 1,       worstCase: 5 },
  { marks: 150, bestCase: 5,      expected: 20,      worstCase: 50 },
  { marks: 140, bestCase: 20,     expected: 50,      worstCase: 100 },
  { marks: 130, bestCase: 50,     expected: 100,     worstCase: 200 },
  { marks: 120, bestCase: 100,    expected: 250,     worstCase: 400 },
  { marks: 110, bestCase: 250,    expected: 500,     worstCase: 800 },
  { marks: 100, bestCase: 500,    expected: 800,     worstCase: 1200 },
  { marks: 95,  bestCase: 800,    expected: 1100,    worstCase: 1500 },
  { marks: 90,  bestCase: 1000,   expected: 1500,    worstCase: 2000 },
  { marks: 85,  bestCase: 1500,   expected: 2500,    worstCase: 3500 },
  { marks: 80,  bestCase: 2500,   expected: 4000,    worstCase: 5500 },
  { marks: 75,  bestCase: 4000,   expected: 7000,    worstCase: 9000 },
  { marks: 70,  bestCase: 7000,   expected: 10000,   worstCase: 12000 },
  { marks: 65,  bestCase: 10000,  expected: 13000,   worstCase: 16000 },
  { marks: 60,  bestCase: 13000,  expected: 18000,   worstCase: 22000 },
  { marks: 55,  bestCase: 18000,  expected: 25000,   worstCase: 30000 },
  { marks: 50,  bestCase: 25000,  expected: 35000,   worstCase: 45000 },
  { marks: 45,  bestCase: 35000,  expected: 50000,   worstCase: 65000 },
  { marks: 40,  bestCase: 50000,  expected: 70000,   worstCase: 90000 },
  { marks: 35,  bestCase: 70000,  expected: 90000,   worstCase: 120000 },
  { marks: 30,  bestCase: 90000,  expected: 120000,  worstCase: 150000 },
  { marks: 25,  bestCase: 120000, expected: 150000,  worstCase: 180000 },
  { marks: 20,  bestCase: 150000, expected: 200000,  worstCase: 250000 },
]

function interpolate(x: number, x1: number, x2: number, y1: number, y2: number): number {
  if (x1 === x2) return (y1 + y2) / 2
  const t = (x - x1) / (x2 - x1)
  // Use smooth cubic interpolation for better results
  const t2 = t * t * (3 - 2 * t)
  return Math.round(y1 + t2 * (y2 - y1))
}

export interface RankPrediction {
  bestCase: number
  expected: number
  worstCase: number
  confidence: number
  marksEntered: number
  label: string
}

export function predictRank(marks: number): RankPrediction {
  // Clamp marks to valid range
  const clampedMarks = Math.max(0, Math.min(160, marks))

  // Find surrounding calibration points
  let lower: MarkRankPoint | null = null
  let upper: MarkRankPoint | null = null

  for (let i = 0; i < calibrationData.length; i++) {
    const point = calibrationData[i]
    if (point.marks <= clampedMarks) {
      upper = point
      if (i > 0) lower = calibrationData[i - 1]
      break
    }
    lower = point
  }

  // Edge cases
  if (!upper && lower) {
    // Below minimum data point
    const scale = clampedMarks / calibrationData[calibrationData.length - 1].marks
    const last = calibrationData[calibrationData.length - 1]
    return {
      bestCase: Math.round(last.bestCase / Math.max(scale, 0.1)),
      expected: Math.round(last.expected / Math.max(scale, 0.1)),
      worstCase: Math.round(last.worstCase / Math.max(scale, 0.1)),
      confidence: 40,
      marksEntered: marks,
      label: 'Very Low',
    }
  }

  if (!lower && upper) {
    return {
      bestCase: upper.bestCase,
      expected: upper.expected,
      worstCase: upper.worstCase,
      confidence: 95,
      marksEntered: marks,
      label: 'Exceptional',
    }
  }

  if (!lower || !upper) {
    return {
      bestCase: 1,
      expected: 5,
      worstCase: 20,
      confidence: 80,
      marksEntered: marks,
      label: 'Top',
    }
  }

  // Interpolate between two calibration points
  const bestCase = interpolate(clampedMarks, upper.marks, lower.marks, upper.bestCase, lower.bestCase)
  const expected = interpolate(clampedMarks, upper.marks, lower.marks, upper.expected, lower.expected)
  const worstCase = interpolate(clampedMarks, upper.marks, lower.marks, upper.worstCase, lower.worstCase)

  // Calculate confidence based on how many data points we have near this value
  let confidence = 85
  if (marks < 30 || marks > 155) confidence = 70
  else if (marks < 40 || marks > 150) confidence = 75
  else if (marks >= 60 && marks <= 140) confidence = 90

  // Determine label
  let label = 'Good'
  if (expected <= 100) label = 'Exceptional'
  else if (expected <= 500) label = 'Excellent'
  else if (expected <= 2000) label = 'Very Good'
  else if (expected <= 5000) label = 'Good'
  else if (expected <= 15000) label = 'Average'
  else if (expected <= 50000) label = 'Below Average'
  else label = 'Low'

  return {
    bestCase: Math.max(1, bestCase),
    expected: Math.max(1, expected),
    worstCase: Math.max(1, worstCase),
    confidence,
    marksEntered: marks,
    label,
  }
}

export function formatRank(rank: number): string {
  if (rank <= 0) return 'N/A'
  if (rank < 1000) return `#${rank}`
  if (rank < 100000) return `${(rank / 1000).toFixed(1)}K`
  return `${(rank / 100000).toFixed(2)}L`
}

export function getRankColor(rank: number): string {
  if (rank <= 1000) return 'text-emerald-400'
  if (rank <= 5000) return 'text-green-400'
  if (rank <= 15000) return 'text-yellow-400'
  if (rank <= 40000) return 'text-orange-400'
  return 'text-red-400'
}
