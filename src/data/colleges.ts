export interface College {
  id: string
  name: string
  shortName: string
  location: string
  district: string
  type: 'Government' | 'Autonomous' | 'Deemed' | 'Private'
  established: number
  affiliation: string
  naacGrade: string
  nbaAccredited: boolean
  ranking: number
  placementRating: number // out of 5
  avgPackage: number // in LPA
  highestPackage: number // in LPA
  totalSeats: number
  website: string
  description: string
  campus: string
  branches: BranchData[]
}

export interface BranchData {
  id: string
  name: string
  shortName: string
  seats: number
  fees: number // per year in INR
  cutoffs: {
    [category: string]: {
      '2023': number
      '2024': number
      '2025': number
    }
  }
}

export type Category = 'OC' | 'EWS' | 'BC_A' | 'BC_B' | 'BC_C' | 'BC_D' | 'BC_E' | 'SC' | 'ST'

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'OC', label: 'OC (Open Category)' },
  { value: 'EWS', label: 'EWS (Economically Weaker Section)' },
  { value: 'BC_A', label: 'BC-A' },
  { value: 'BC_B', label: 'BC-B' },
  { value: 'BC_C', label: 'BC-C' },
  { value: 'BC_D', label: 'BC-D' },
  { value: 'BC_E', label: 'BC-E' },
  { value: 'SC', label: 'SC (Scheduled Caste)' },
  { value: 'ST', label: 'ST (Scheduled Tribe)' },
]

export const BRANCHES = [
  { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE' },
  { id: 'cse_aiml', name: 'CSE (AI & ML)', shortName: 'CSE AI&ML' },
  { id: 'cse_ds', name: 'CSE (Data Science)', shortName: 'CSE DS' },
  { id: 'cse_cs', name: 'CSE (Cyber Security)', shortName: 'CSE CS' },
  { id: 'it', name: 'Information Technology', shortName: 'IT' },
  { id: 'ece', name: 'Electronics & Communication Engineering', shortName: 'ECE' },
  { id: 'eee', name: 'Electrical & Electronics Engineering', shortName: 'EEE' },
  { id: 'mech', name: 'Mechanical Engineering', shortName: 'MECH' },
  { id: 'civil', name: 'Civil Engineering', shortName: 'CIVIL' },
]

// Category multipliers for cutoff calculation (relative to OC)
export const CATEGORY_MULTIPLIERS: Record<Category, number> = {
  OC: 1.0,
  EWS: 1.15,
  BC_A: 1.4,
  BC_B: 1.3,
  BC_C: 1.6,
  BC_D: 1.25,
  BC_E: 1.5,
  SC: 1.8,
  ST: 2.2,
}

const colleges: College[] = [
  {
    id: 'jntuh',
    name: 'JNTUH College of Engineering',
    shortName: 'JNTUH COE',
    location: 'Kukatpally, Hyderabad',
    district: 'Hyderabad',
    type: 'Government',
    established: 1965,
    affiliation: 'JNTUH',
    naacGrade: 'A++',
    nbaAccredited: true,
    ranking: 1,
    placementRating: 4.8,
    avgPackage: 12.5,
    highestPackage: 65,
    totalSeats: 1050,
    website: 'https://jntuhcej.ac.in',
    description: 'JNTUH College of Engineering is one of the premier engineering institutions in Telangana, offering top-quality education with excellent placements and research facilities.',
    campus: 'Kukatpally, Hyderabad',
    branches: [
      {
        id: 'jntuh-cse', name: 'CSE', shortName: 'CSE', seats: 180, fees: 25000,
        cutoffs: {
          OC: { '2023': 1450, '2024': 1380, '2025': 1320 },
          EWS: { '2023': 1650, '2024': 1580, '2025': 1520 },
          BC_A: { '2023': 2100, '2024': 2000, '2025': 1900 },
          BC_B: { '2023': 1900, '2024': 1800, '2025': 1720 },
          BC_C: { '2023': 2500, '2024': 2400, '2025': 2300 },
          BC_D: { '2023': 1800, '2024': 1720, '2025': 1650 },
          BC_E: { '2023': 2200, '2024': 2100, '2025': 2000 },
          SC: { '2023': 3200, '2024': 3100, '2025': 3000 },
          ST: { '2023': 5500, '2024': 5300, '2025': 5100 },
        }
      },
      {
        id: 'jntuh-cse-aiml', name: 'CSE (AI & ML)', shortName: 'CSE AI&ML', seats: 60, fees: 25000,
        cutoffs: {
          OC: { '2023': 1800, '2024': 1700, '2025': 1600 },
          EWS: { '2023': 2000, '2024': 1900, '2025': 1800 },
          BC_A: { '2023': 2600, '2024': 2500, '2025': 2400 },
          BC_B: { '2023': 2400, '2024': 2300, '2025': 2200 },
          BC_C: { '2023': 3000, '2024': 2900, '2025': 2800 },
          BC_D: { '2023': 2200, '2024': 2100, '2025': 2000 },
          BC_E: { '2023': 2700, '2024': 2600, '2025': 2500 },
          SC: { '2023': 4000, '2024': 3800, '2025': 3600 },
          ST: { '2023': 7000, '2024': 6800, '2025': 6600 },
        }
      },
      {
        id: 'jntuh-ece', name: 'ECE', shortName: 'ECE', seats: 120, fees: 25000,
        cutoffs: {
          OC: { '2023': 3200, '2024': 3100, '2025': 3000 },
          EWS: { '2023': 3800, '2024': 3700, '2025': 3600 },
          BC_A: { '2023': 5000, '2024': 4900, '2025': 4800 },
          BC_B: { '2023': 4500, '2024': 4400, '2025': 4300 },
          BC_C: { '2023': 6000, '2024': 5900, '2025': 5800 },
          BC_D: { '2023': 4200, '2024': 4100, '2025': 4000 },
          BC_E: { '2023': 5500, '2024': 5400, '2025': 5300 },
          SC: { '2023': 8000, '2024': 7800, '2025': 7600 },
          ST: { '2023': 14000, '2024': 13500, '2025': 13000 },
        }
      },
      {
        id: 'jntuh-eee', name: 'EEE', shortName: 'EEE', seats: 120, fees: 25000,
        cutoffs: {
          OC: { '2023': 4500, '2024': 4300, '2025': 4100 },
          EWS: { '2023': 5200, '2024': 5000, '2025': 4800 },
          BC_A: { '2023': 7000, '2024': 6800, '2025': 6600 },
          BC_B: { '2023': 6200, '2024': 6000, '2025': 5800 },
          BC_C: { '2023': 8500, '2024': 8200, '2025': 8000 },
          BC_D: { '2023': 5900, '2024': 5700, '2025': 5500 },
          BC_E: { '2023': 7500, '2024': 7300, '2025': 7100 },
          SC: { '2023': 11000, '2024': 10700, '2025': 10400 },
          ST: { '2023': 18000, '2024': 17500, '2025': 17000 },
        }
      },
      {
        id: 'jntuh-mech', name: 'Mechanical', shortName: 'MECH', seats: 120, fees: 25000,
        cutoffs: {
          OC: { '2023': 6000, '2024': 5800, '2025': 5600 },
          EWS: { '2023': 7200, '2024': 7000, '2025': 6800 },
          BC_A: { '2023': 9500, '2024': 9200, '2025': 9000 },
          BC_B: { '2023': 8500, '2024': 8200, '2025': 8000 },
          BC_C: { '2023': 11000, '2024': 10700, '2025': 10400 },
          BC_D: { '2023': 8000, '2024': 7800, '2025': 7600 },
          BC_E: { '2023': 10000, '2024': 9700, '2025': 9400 },
          SC: { '2023': 14000, '2024': 13700, '2025': 13400 },
          ST: { '2023': 22000, '2024': 21000, '2025': 20000 },
        }
      },
    ]
  },
  {
    id: 'ou',
    name: 'OU College of Engineering',
    shortName: 'OU COE',
    location: 'Osmania University, Hyderabad',
    district: 'Hyderabad',
    type: 'Government',
    established: 1929,
    affiliation: 'Osmania University',
    naacGrade: 'A+',
    nbaAccredited: true,
    ranking: 2,
    placementRating: 4.6,
    avgPackage: 10.8,
    highestPackage: 52,
    totalSeats: 900,
    website: 'https://oucoe.edu.in',
    description: 'One of the oldest engineering colleges in Telangana, OU COE has a rich heritage of academic excellence and industry connections.',
    campus: 'Osmania University Campus, Hyderabad',
    branches: [
      {
        id: 'ou-cse', name: 'CSE', shortName: 'CSE', seats: 150, fees: 28000,
        cutoffs: {
          OC: { '2023': 2000, '2024': 1900, '2025': 1800 },
          EWS: { '2023': 2300, '2024': 2200, '2025': 2100 },
          BC_A: { '2023': 3000, '2024': 2900, '2025': 2800 },
          BC_B: { '2023': 2700, '2024': 2600, '2025': 2500 },
          BC_C: { '2023': 3600, '2024': 3500, '2025': 3400 },
          BC_D: { '2023': 2500, '2024': 2400, '2025': 2300 },
          BC_E: { '2023': 3200, '2024': 3100, '2025': 3000 },
          SC: { '2023': 4800, '2024': 4600, '2025': 4400 },
          ST: { '2023': 8000, '2024': 7700, '2025': 7400 },
        }
      },
      {
        id: 'ou-ece', name: 'ECE', shortName: 'ECE', seats: 120, fees: 28000,
        cutoffs: {
          OC: { '2023': 4500, '2024': 4300, '2025': 4100 },
          EWS: { '2023': 5200, '2024': 5000, '2025': 4800 },
          BC_A: { '2023': 7000, '2024': 6800, '2025': 6600 },
          BC_B: { '2023': 6200, '2024': 6000, '2025': 5800 },
          BC_C: { '2023': 8500, '2024': 8200, '2025': 8000 },
          BC_D: { '2023': 5900, '2024': 5700, '2025': 5500 },
          BC_E: { '2023': 7500, '2024': 7300, '2025': 7100 },
          SC: { '2023': 11000, '2024': 10700, '2025': 10400 },
          ST: { '2023': 18000, '2024': 17500, '2025': 17000 },
        }
      },
      {
        id: 'ou-eee', name: 'EEE', shortName: 'EEE', seats: 120, fees: 28000,
        cutoffs: {
          OC: { '2023': 6200, '2024': 6000, '2025': 5800 },
          EWS: { '2023': 7200, '2024': 7000, '2025': 6800 },
          BC_A: { '2023': 9500, '2024': 9200, '2025': 9000 },
          BC_B: { '2023': 8500, '2024': 8200, '2025': 8000 },
          BC_C: { '2023': 11500, '2024': 11200, '2025': 11000 },
          BC_D: { '2023': 8000, '2024': 7800, '2025': 7600 },
          BC_E: { '2023': 10500, '2024': 10200, '2025': 10000 },
          SC: { '2023': 15000, '2024': 14700, '2025': 14400 },
          ST: { '2023': 24000, '2024': 23000, '2025': 22000 },
        }
      },
      {
        id: 'ou-mech', name: 'Mechanical', shortName: 'MECH', seats: 120, fees: 28000,
        cutoffs: {
          OC: { '2023': 8500, '2024': 8200, '2025': 8000 },
          EWS: { '2023': 9800, '2024': 9500, '2025': 9200 },
          BC_A: { '2023': 13000, '2024': 12700, '2025': 12400 },
          BC_B: { '2023': 11500, '2024': 11200, '2025': 11000 },
          BC_C: { '2023': 15500, '2024': 15200, '2025': 15000 },
          BC_D: { '2023': 11000, '2024': 10700, '2025': 10400 },
          BC_E: { '2023': 14000, '2024': 13700, '2025': 13400 },
          SC: { '2023': 20000, '2024': 19500, '2025': 19000 },
          ST: { '2023': 33000, '2024': 32000, '2025': 31000 },
        }
      },
    ]
  },
  {
    id: 'cbit',
    name: 'Chaitanya Bharathi Institute of Technology',
    shortName: 'CBIT',
    location: 'Gandipet, Hyderabad',
    district: 'Hyderabad',
    type: 'Autonomous',
    established: 1979,
    affiliation: 'JNTUH',
    naacGrade: 'A+',
    nbaAccredited: true,
    ranking: 3,
    placementRating: 4.7,
    avgPackage: 14.2,
    highestPackage: 78,
    totalSeats: 1260,
    website: 'https://cbit.ac.in',
    description: 'CBIT is one of the top private engineering colleges in Hyderabad, known for strong placements and industry tie-ups with top MNCs.',
    campus: 'Gandipet, Hyderabad',
    branches: [
      {
        id: 'cbit-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 115000,
        cutoffs: {
          OC: { '2023': 2800, '2024': 2650, '2025': 2500 },
          EWS: { '2023': 3200, '2024': 3050, '2025': 2900 },
          BC_A: { '2023': 4200, '2024': 4000, '2025': 3800 },
          BC_B: { '2023': 3800, '2024': 3600, '2025': 3400 },
          BC_C: { '2023': 5000, '2024': 4800, '2025': 4600 },
          BC_D: { '2023': 3500, '2024': 3350, '2025': 3200 },
          BC_E: { '2023': 4500, '2024': 4300, '2025': 4100 },
          SC: { '2023': 7000, '2024': 6700, '2025': 6400 },
          ST: { '2023': 12000, '2024': 11500, '2025': 11000 },
        }
      },
      {
        id: 'cbit-cse-aiml', name: 'CSE (AI & ML)', shortName: 'CSE AI&ML', seats: 120, fees: 125000,
        cutoffs: {
          OC: { '2023': 3500, '2024': 3300, '2025': 3100 },
          EWS: { '2023': 4000, '2024': 3800, '2025': 3600 },
          BC_A: { '2023': 5200, '2024': 5000, '2025': 4800 },
          BC_B: { '2023': 4700, '2024': 4500, '2025': 4300 },
          BC_C: { '2023': 6200, '2024': 6000, '2025': 5800 },
          BC_D: { '2023': 4400, '2024': 4200, '2025': 4000 },
          BC_E: { '2023': 5600, '2024': 5400, '2025': 5200 },
          SC: { '2023': 8500, '2024': 8200, '2025': 8000 },
          ST: { '2023': 14500, '2024': 14000, '2025': 13500 },
        }
      },
      {
        id: 'cbit-cse-ds', name: 'CSE (Data Science)', shortName: 'CSE DS', seats: 60, fees: 125000,
        cutoffs: {
          OC: { '2023': 3800, '2024': 3600, '2025': 3400 },
          EWS: { '2023': 4400, '2024': 4200, '2025': 4000 },
          BC_A: { '2023': 5700, '2024': 5500, '2025': 5300 },
          BC_B: { '2023': 5200, '2024': 5000, '2025': 4800 },
          BC_C: { '2023': 6800, '2024': 6600, '2025': 6400 },
          BC_D: { '2023': 4900, '2024': 4700, '2025': 4500 },
          BC_E: { '2023': 6200, '2024': 6000, '2025': 5800 },
          SC: { '2023': 9200, '2024': 9000, '2025': 8800 },
          ST: { '2023': 16000, '2024': 15500, '2025': 15000 },
        }
      },
      {
        id: 'cbit-it', name: 'IT', shortName: 'IT', seats: 120, fees: 115000,
        cutoffs: {
          OC: { '2023': 4500, '2024': 4300, '2025': 4100 },
          EWS: { '2023': 5200, '2024': 5000, '2025': 4800 },
          BC_A: { '2023': 7000, '2024': 6800, '2025': 6600 },
          BC_B: { '2023': 6200, '2024': 6000, '2025': 5800 },
          BC_C: { '2023': 8500, '2024': 8200, '2025': 8000 },
          BC_D: { '2023': 5900, '2024': 5700, '2025': 5500 },
          BC_E: { '2023': 7500, '2024': 7300, '2025': 7100 },
          SC: { '2023': 11000, '2024': 10700, '2025': 10400 },
          ST: { '2023': 18000, '2024': 17500, '2025': 17000 },
        }
      },
      {
        id: 'cbit-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 110000,
        cutoffs: {
          OC: { '2023': 6500, '2024': 6300, '2025': 6100 },
          EWS: { '2023': 7500, '2024': 7300, '2025': 7100 },
          BC_A: { '2023': 10000, '2024': 9700, '2025': 9400 },
          BC_B: { '2023': 9000, '2024': 8700, '2025': 8400 },
          BC_C: { '2023': 12000, '2024': 11700, '2025': 11400 },
          BC_D: { '2023': 8500, '2024': 8200, '2025': 8000 },
          BC_E: { '2023': 11000, '2024': 10700, '2025': 10400 },
          SC: { '2023': 15000, '2024': 14700, '2025': 14400 },
          ST: { '2023': 25000, '2024': 24000, '2025': 23000 },
        }
      },
    ]
  },
  {
    id: 'vnrvjiet',
    name: 'VNR Vignana Jyothi Institute of Engineering and Technology',
    shortName: 'VNR VJIET',
    location: 'Bachupally, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Autonomous',
    established: 1997,
    affiliation: 'JNTUH',
    naacGrade: 'A+',
    nbaAccredited: true,
    ranking: 4,
    placementRating: 4.8,
    avgPackage: 15.6,
    highestPackage: 90,
    totalSeats: 1200,
    website: 'https://vnrvjiet.ac.in',
    description: 'VNR VJIET is consistently ranked among the top private engineering colleges in Hyderabad with exceptional placements and research output.',
    campus: 'Bachupally, Hyderabad',
    branches: [
      {
        id: 'vnr-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 130000,
        cutoffs: {
          OC: { '2023': 3200, '2024': 3000, '2025': 2800 },
          EWS: { '2023': 3700, '2024': 3500, '2025': 3300 },
          BC_A: { '2023': 4800, '2024': 4600, '2025': 4400 },
          BC_B: { '2023': 4300, '2024': 4100, '2025': 3900 },
          BC_C: { '2023': 5800, '2024': 5600, '2025': 5400 },
          BC_D: { '2023': 4000, '2024': 3800, '2025': 3600 },
          BC_E: { '2023': 5200, '2024': 5000, '2025': 4800 },
          SC: { '2023': 8000, '2024': 7700, '2025': 7400 },
          ST: { '2023': 14000, '2024': 13500, '2025': 13000 },
        }
      },
      {
        id: 'vnr-cse-aiml', name: 'CSE (AI & ML)', shortName: 'CSE AI&ML', seats: 120, fees: 140000,
        cutoffs: {
          OC: { '2023': 4000, '2024': 3800, '2025': 3600 },
          EWS: { '2023': 4600, '2024': 4400, '2025': 4200 },
          BC_A: { '2023': 6000, '2024': 5800, '2025': 5600 },
          BC_B: { '2023': 5400, '2024': 5200, '2025': 5000 },
          BC_C: { '2023': 7200, '2024': 7000, '2025': 6800 },
          BC_D: { '2023': 5100, '2024': 4900, '2025': 4700 },
          BC_E: { '2023': 6500, '2024': 6300, '2025': 6100 },
          SC: { '2023': 9800, '2024': 9500, '2025': 9200 },
          ST: { '2023': 17000, '2024': 16500, '2025': 16000 },
        }
      },
      {
        id: 'vnr-it', name: 'IT', shortName: 'IT', seats: 120, fees: 130000,
        cutoffs: {
          OC: { '2023': 5200, '2024': 5000, '2025': 4800 },
          EWS: { '2023': 6000, '2024': 5800, '2025': 5600 },
          BC_A: { '2023': 8000, '2024': 7800, '2025': 7600 },
          BC_B: { '2023': 7200, '2024': 7000, '2025': 6800 },
          BC_C: { '2023': 9700, '2024': 9500, '2025': 9300 },
          BC_D: { '2023': 6800, '2024': 6600, '2025': 6400 },
          BC_E: { '2023': 8700, '2024': 8500, '2025': 8300 },
          SC: { '2023': 13000, '2024': 12700, '2025': 12400 },
          ST: { '2023': 22000, '2024': 21000, '2025': 20000 },
        }
      },
      {
        id: 'vnr-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 125000,
        cutoffs: {
          OC: { '2023': 7500, '2024': 7200, '2025': 7000 },
          EWS: { '2023': 8700, '2024': 8400, '2025': 8200 },
          BC_A: { '2023': 11500, '2024': 11200, '2025': 11000 },
          BC_B: { '2023': 10200, '2024': 10000, '2025': 9800 },
          BC_C: { '2023': 14000, '2024': 13700, '2025': 13400 },
          BC_D: { '2023': 9700, '2024': 9500, '2025': 9300 },
          BC_E: { '2023': 12500, '2024': 12200, '2025': 12000 },
          SC: { '2023': 18000, '2024': 17500, '2025': 17000 },
          ST: { '2023': 30000, '2024': 29000, '2025': 28000 },
        }
      },
    ]
  },
  {
    id: 'vasavi',
    name: 'Vasavi College of Engineering',
    shortName: 'Vasavi',
    location: 'Ibrahimbagh, Hyderabad',
    district: 'Hyderabad',
    type: 'Autonomous',
    established: 1981,
    affiliation: 'OU',
    naacGrade: 'A+',
    nbaAccredited: true,
    ranking: 5,
    placementRating: 4.6,
    avgPackage: 13.5,
    highestPackage: 72,
    totalSeats: 1080,
    website: 'https://vasaviengg.ac.in',
    description: 'Vasavi College of Engineering is an autonomous institution affiliated to Osmania University, known for its strong alumni network and placements.',
    campus: 'Ibrahimbagh, Hyderabad',
    branches: [
      {
        id: 'vasavi-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 110000,
        cutoffs: {
          OC: { '2023': 3800, '2024': 3600, '2025': 3400 },
          EWS: { '2023': 4400, '2024': 4200, '2025': 4000 },
          BC_A: { '2023': 5700, '2024': 5500, '2025': 5300 },
          BC_B: { '2023': 5200, '2024': 5000, '2025': 4800 },
          BC_C: { '2023': 6800, '2024': 6600, '2025': 6400 },
          BC_D: { '2023': 4900, '2024': 4700, '2025': 4500 },
          BC_E: { '2023': 6200, '2024': 6000, '2025': 5800 },
          SC: { '2023': 9200, '2024': 9000, '2025': 8800 },
          ST: { '2023': 16000, '2024': 15500, '2025': 15000 },
        }
      },
      {
        id: 'vasavi-it', name: 'IT', shortName: 'IT', seats: 120, fees: 110000,
        cutoffs: {
          OC: { '2023': 6000, '2024': 5800, '2025': 5600 },
          EWS: { '2023': 7000, '2024': 6800, '2025': 6600 },
          BC_A: { '2023': 9200, '2024': 9000, '2025': 8800 },
          BC_B: { '2023': 8200, '2024': 8000, '2025': 7800 },
          BC_C: { '2023': 11000, '2024': 10700, '2025': 10400 },
          BC_D: { '2023': 7800, '2024': 7600, '2025': 7400 },
          BC_E: { '2023': 9900, '2024': 9700, '2025': 9500 },
          SC: { '2023': 14500, '2024': 14200, '2025': 14000 },
          ST: { '2023': 24000, '2024': 23000, '2025': 22000 },
        }
      },
      {
        id: 'vasavi-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 105000,
        cutoffs: {
          OC: { '2023': 8500, '2024': 8200, '2025': 8000 },
          EWS: { '2023': 9800, '2024': 9500, '2025': 9200 },
          BC_A: { '2023': 13000, '2024': 12700, '2025': 12400 },
          BC_B: { '2023': 11500, '2024': 11200, '2025': 11000 },
          BC_C: { '2023': 15500, '2024': 15200, '2025': 15000 },
          BC_D: { '2023': 11000, '2024': 10700, '2025': 10400 },
          BC_E: { '2023': 14000, '2024': 13700, '2025': 13400 },
          SC: { '2023': 20000, '2024': 19500, '2025': 19000 },
          ST: { '2023': 33000, '2024': 32000, '2025': 31000 },
        }
      },
    ]
  },
  {
    id: 'griet',
    name: 'Gokaraju Rangaraju Institute of Engineering and Technology',
    shortName: 'GRIET',
    location: 'Bachupally, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Autonomous',
    established: 1997,
    affiliation: 'JNTUH',
    naacGrade: 'A',
    nbaAccredited: true,
    ranking: 6,
    placementRating: 4.4,
    avgPackage: 11.8,
    highestPackage: 60,
    totalSeats: 1200,
    website: 'https://griet.ac.in',
    description: 'GRIET is an autonomous institution known for its industry-academia collaboration and strong placement record across top IT companies.',
    campus: 'Bachupally, Hyderabad',
    branches: [
      {
        id: 'griet-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 105000,
        cutoffs: {
          OC: { '2023': 5000, '2024': 4800, '2025': 4600 },
          EWS: { '2023': 5800, '2024': 5600, '2025': 5400 },
          BC_A: { '2023': 7500, '2024': 7300, '2025': 7100 },
          BC_B: { '2023': 6700, '2024': 6500, '2025': 6300 },
          BC_C: { '2023': 9000, '2024': 8800, '2025': 8600 },
          BC_D: { '2023': 6300, '2024': 6100, '2025': 5900 },
          BC_E: { '2023': 8100, '2024': 7900, '2025': 7700 },
          SC: { '2023': 12000, '2024': 11700, '2025': 11400 },
          ST: { '2023': 20000, '2024': 19500, '2025': 19000 },
        }
      },
      {
        id: 'griet-cse-aiml', name: 'CSE (AI & ML)', shortName: 'CSE AI&ML', seats: 120, fees: 115000,
        cutoffs: {
          OC: { '2023': 6200, '2024': 6000, '2025': 5800 },
          EWS: { '2023': 7200, '2024': 7000, '2025': 6800 },
          BC_A: { '2023': 9400, '2024': 9200, '2025': 9000 },
          BC_B: { '2023': 8400, '2024': 8200, '2025': 8000 },
          BC_C: { '2023': 11200, '2024': 11000, '2025': 10800 },
          BC_D: { '2023': 7900, '2024': 7700, '2025': 7500 },
          BC_E: { '2023': 10100, '2024': 9900, '2025': 9700 },
          SC: { '2023': 15000, '2024': 14700, '2025': 14400 },
          ST: { '2023': 25000, '2024': 24000, '2025': 23000 },
        }
      },
      {
        id: 'griet-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 100000,
        cutoffs: {
          OC: { '2023': 10000, '2024': 9700, '2025': 9400 },
          EWS: { '2023': 11600, '2024': 11300, '2025': 11000 },
          BC_A: { '2023': 15500, '2024': 15200, '2025': 15000 },
          BC_B: { '2023': 13800, '2024': 13500, '2025': 13200 },
          BC_C: { '2023': 18500, '2024': 18200, '2025': 18000 },
          BC_D: { '2023': 13000, '2024': 12700, '2025': 12400 },
          BC_E: { '2023': 16700, '2024': 16400, '2025': 16200 },
          SC: { '2023': 25000, '2024': 24000, '2025': 23000 },
          ST: { '2023': 40000, '2024': 38000, '2025': 36000 },
        }
      },
    ]
  },
  {
    id: 'mgit',
    name: 'Mahatma Gandhi Institute of Technology',
    shortName: 'MGIT',
    location: 'Gandipet, Hyderabad',
    district: 'Ranga Reddy',
    type: 'Autonomous',
    established: 1997,
    affiliation: 'JNTUH',
    naacGrade: 'A',
    nbaAccredited: true,
    ranking: 7,
    placementRating: 4.3,
    avgPackage: 10.5,
    highestPackage: 55,
    totalSeats: 1200,
    website: 'https://mgit.ac.in',
    description: 'MGIT is a well-established engineering institution known for quality education and good placement support.',
    campus: 'Gandipet, Hyderabad',
    branches: [
      {
        id: 'mgit-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 100000,
        cutoffs: {
          OC: { '2023': 6500, '2024': 6300, '2025': 6100 },
          EWS: { '2023': 7500, '2024': 7300, '2025': 7100 },
          BC_A: { '2023': 9800, '2024': 9500, '2025': 9200 },
          BC_B: { '2023': 8700, '2024': 8400, '2025': 8200 },
          BC_C: { '2023': 11700, '2024': 11400, '2025': 11200 },
          BC_D: { '2023': 8200, '2024': 8000, '2025': 7800 },
          BC_E: { '2023': 10500, '2024': 10200, '2025': 10000 },
          SC: { '2023': 15500, '2024': 15200, '2025': 15000 },
          ST: { '2023': 26000, '2024': 25000, '2025': 24000 },
        }
      },
      {
        id: 'mgit-it', name: 'IT', shortName: 'IT', seats: 120, fees: 100000,
        cutoffs: {
          OC: { '2023': 9000, '2024': 8700, '2025': 8400 },
          EWS: { '2023': 10400, '2024': 10100, '2025': 9800 },
          BC_A: { '2023': 13800, '2024': 13500, '2025': 13200 },
          BC_B: { '2023': 12200, '2024': 12000, '2025': 11800 },
          BC_C: { '2023': 16500, '2024': 16200, '2025': 16000 },
          BC_D: { '2023': 11600, '2024': 11400, '2025': 11200 },
          BC_E: { '2023': 14900, '2024': 14600, '2025': 14400 },
          SC: { '2023': 22000, '2024': 21500, '2025': 21000 },
          ST: { '2023': 36000, '2024': 35000, '2025': 34000 },
        }
      },
      {
        id: 'mgit-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 95000,
        cutoffs: {
          OC: { '2023': 12000, '2024': 11700, '2025': 11400 },
          EWS: { '2023': 14000, '2024': 13700, '2025': 13400 },
          BC_A: { '2023': 18500, '2024': 18200, '2025': 18000 },
          BC_B: { '2023': 16500, '2024': 16200, '2025': 16000 },
          BC_C: { '2023': 22000, '2024': 21500, '2025': 21000 },
          BC_D: { '2023': 15500, '2024': 15200, '2025': 15000 },
          BC_E: { '2023': 20000, '2024': 19500, '2025': 19000 },
          SC: { '2023': 30000, '2024': 29000, '2025': 28000 },
          ST: { '2023': 48000, '2024': 46000, '2025': 44000 },
        }
      },
    ]
  },
  {
    id: 'geethanjali',
    name: 'Geethanjali College of Engineering and Technology',
    shortName: 'Geethanjali',
    location: 'Cheeryal, Keesara',
    district: 'Medchal–Malkajgiri',
    type: 'Private',
    established: 2001,
    affiliation: 'JNTUH',
    naacGrade: 'A',
    nbaAccredited: false,
    ranking: 15,
    placementRating: 3.9,
    avgPackage: 7.8,
    highestPackage: 38,
    totalSeats: 1200,
    website: 'https://geethanjali.ac.in',
    description: 'Geethanjali College of Engineering and Technology offers a range of engineering programs with a focus on skill development.',
    campus: 'Cheeryal, Keesara',
    branches: [
      {
        id: 'geethanjali-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 90000,
        cutoffs: {
          OC: { '2023': 18000, '2024': 17500, '2025': 17000 },
          EWS: { '2023': 21000, '2024': 20500, '2025': 20000 },
          BC_A: { '2023': 28000, '2024': 27500, '2025': 27000 },
          BC_B: { '2023': 25000, '2024': 24500, '2025': 24000 },
          BC_C: { '2023': 34000, '2024': 33500, '2025': 33000 },
          BC_D: { '2023': 23500, '2024': 23000, '2025': 22500 },
          BC_E: { '2023': 31000, '2024': 30500, '2025': 30000 },
          SC: { '2023': 45000, '2024': 44000, '2025': 43000 },
          ST: { '2023': 72000, '2024': 70000, '2025': 68000 },
        }
      },
      {
        id: 'geethanjali-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 85000,
        cutoffs: {
          OC: { '2023': 28000, '2024': 27500, '2025': 27000 },
          EWS: { '2023': 33000, '2024': 32500, '2025': 32000 },
          BC_A: { '2023': 44000, '2024': 43000, '2025': 42000 },
          BC_B: { '2023': 39000, '2024': 38000, '2025': 37000 },
          BC_C: { '2023': 53000, '2024': 52000, '2025': 51000 },
          BC_D: { '2023': 37000, '2024': 36000, '2025': 35000 },
          BC_E: { '2023': 48000, '2024': 47000, '2025': 46000 },
          SC: { '2023': 68000, '2024': 66000, '2025': 64000 },
          ST: { '2023': 100000, '2024': 98000, '2025': 96000 },
        }
      },
    ]
  },
  {
    id: 'snist',
    name: 'Sreenidhi Institute of Science and Technology',
    shortName: 'SNIST',
    location: 'Ghatkesar, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Autonomous',
    established: 1997,
    affiliation: 'JNTUH',
    naacGrade: 'A+',
    nbaAccredited: true,
    ranking: 8,
    placementRating: 4.4,
    avgPackage: 11.2,
    highestPackage: 58,
    totalSeats: 1200,
    website: 'https://sreenidhi.edu.in',
    description: 'SNIST is a well-known autonomous college with strong industry connections, research programs, and consistent placement performance.',
    campus: 'Ghatkesar, Hyderabad',
    branches: [
      {
        id: 'snist-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 108000,
        cutoffs: {
          OC: { '2023': 7000, '2024': 6800, '2025': 6600 },
          EWS: { '2023': 8100, '2024': 7900, '2025': 7700 },
          BC_A: { '2023': 10600, '2024': 10400, '2025': 10200 },
          BC_B: { '2023': 9400, '2024': 9200, '2025': 9000 },
          BC_C: { '2023': 12700, '2024': 12500, '2025': 12300 },
          BC_D: { '2023': 8900, '2024': 8700, '2025': 8500 },
          BC_E: { '2023': 11400, '2024': 11200, '2025': 11000 },
          SC: { '2023': 17000, '2024': 16700, '2025': 16400 },
          ST: { '2023': 28000, '2024': 27000, '2025': 26000 },
        }
      },
      {
        id: 'snist-it', name: 'IT', shortName: 'IT', seats: 120, fees: 108000,
        cutoffs: {
          OC: { '2023': 10000, '2024': 9700, '2025': 9400 },
          EWS: { '2023': 11600, '2024': 11300, '2025': 11000 },
          BC_A: { '2023': 15400, '2024': 15100, '2025': 14800 },
          BC_B: { '2023': 13700, '2024': 13400, '2025': 13100 },
          BC_C: { '2023': 18500, '2024': 18200, '2025': 18000 },
          BC_D: { '2023': 12900, '2024': 12600, '2025': 12400 },
          BC_E: { '2023': 16700, '2024': 16400, '2025': 16200 },
          SC: { '2023': 25000, '2024': 24500, '2025': 24000 },
          ST: { '2023': 41000, '2024': 40000, '2025': 39000 },
        }
      },
      {
        id: 'snist-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 102000,
        cutoffs: {
          OC: { '2023': 13000, '2024': 12700, '2025': 12400 },
          EWS: { '2023': 15100, '2024': 14800, '2025': 14500 },
          BC_A: { '2023': 20100, '2024': 19800, '2025': 19500 },
          BC_B: { '2023': 17900, '2024': 17600, '2025': 17300 },
          BC_C: { '2023': 24000, '2024': 23700, '2025': 23400 },
          BC_D: { '2023': 16900, '2024': 16600, '2025': 16300 },
          BC_E: { '2023': 21700, '2024': 21400, '2025': 21100 },
          SC: { '2023': 33000, '2024': 32000, '2025': 31000 },
          ST: { '2023': 53000, '2024': 51000, '2025': 49000 },
        }
      },
    ]
  },
  {
    id: 'kmit',
    name: 'Keshav Memorial Institute of Technology',
    shortName: 'KMIT',
    location: 'Narayanguda, Hyderabad',
    district: 'Hyderabad',
    type: 'Autonomous',
    established: 2007,
    affiliation: 'JNTUH',
    naacGrade: 'A',
    nbaAccredited: true,
    ranking: 9,
    placementRating: 4.5,
    avgPackage: 12.8,
    highestPackage: 68,
    totalSeats: 720,
    website: 'https://kmit.in',
    description: 'KMIT is known for its industry-oriented curriculum and exceptional placement record with consistent 95%+ placement rates.',
    campus: 'Narayanguda, Hyderabad',
    branches: [
      {
        id: 'kmit-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 120000,
        cutoffs: {
          OC: { '2023': 5500, '2024': 5300, '2025': 5100 },
          EWS: { '2023': 6400, '2024': 6200, '2025': 6000 },
          BC_A: { '2023': 8400, '2024': 8200, '2025': 8000 },
          BC_B: { '2023': 7500, '2024': 7300, '2025': 7100 },
          BC_C: { '2023': 10100, '2024': 9900, '2025': 9700 },
          BC_D: { '2023': 7100, '2024': 6900, '2025': 6700 },
          BC_E: { '2023': 9100, '2024': 8900, '2025': 8700 },
          SC: { '2023': 13500, '2024': 13200, '2025': 13000 },
          ST: { '2023': 22500, '2024': 22000, '2025': 21500 },
        }
      },
      {
        id: 'kmit-it', name: 'IT', shortName: 'IT', seats: 120, fees: 120000,
        cutoffs: {
          OC: { '2023': 7800, '2024': 7600, '2025': 7400 },
          EWS: { '2023': 9000, '2024': 8800, '2025': 8600 },
          BC_A: { '2023': 11900, '2024': 11600, '2025': 11400 },
          BC_B: { '2023': 10600, '2024': 10400, '2025': 10200 },
          BC_C: { '2023': 14300, '2024': 14000, '2025': 13800 },
          BC_D: { '2023': 10100, '2024': 9900, '2025': 9700 },
          BC_E: { '2023': 12900, '2024': 12600, '2025': 12400 },
          SC: { '2023': 19000, '2024': 18700, '2025': 18400 },
          ST: { '2023': 31000, '2024': 30000, '2025': 29000 },
        }
      },
    ]
  },
  {
    id: 'ngit',
    name: 'Nalla Malla Reddy Engineering College',
    shortName: 'NGIT',
    location: 'Ghatkesar, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Private',
    established: 2001,
    affiliation: 'JNTUH',
    naacGrade: 'B+',
    nbaAccredited: false,
    ranking: 18,
    placementRating: 3.7,
    avgPackage: 6.5,
    highestPackage: 30,
    totalSeats: 900,
    website: 'https://ngit.ac.in',
    description: 'NGIT provides quality engineering education with focus on practical skills and industry exposure.',
    campus: 'Ghatkesar, Hyderabad',
    branches: [
      {
        id: 'ngit-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 80000,
        cutoffs: {
          OC: { '2023': 22000, '2024': 21500, '2025': 21000 },
          EWS: { '2023': 25500, '2024': 25000, '2025': 24500 },
          BC_A: { '2023': 34000, '2024': 33000, '2025': 32000 },
          BC_B: { '2023': 30000, '2024': 29000, '2025': 28000 },
          BC_C: { '2023': 41000, '2024': 40000, '2025': 39000 },
          BC_D: { '2023': 28000, '2024': 27000, '2025': 26000 },
          BC_E: { '2023': 37000, '2024': 36000, '2025': 35000 },
          SC: { '2023': 55000, '2024': 53000, '2025': 51000 },
          ST: { '2023': 88000, '2024': 85000, '2025': 82000 },
        }
      },
      {
        id: 'ngit-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 75000,
        cutoffs: {
          OC: { '2023': 38000, '2024': 37000, '2025': 36000 },
          EWS: { '2023': 44000, '2024': 43000, '2025': 42000 },
          BC_A: { '2023': 59000, '2024': 57000, '2025': 55000 },
          BC_B: { '2023': 52000, '2024': 51000, '2025': 50000 },
          BC_C: { '2023': 71000, '2024': 69000, '2025': 67000 },
          BC_D: { '2023': 49000, '2024': 48000, '2025': 47000 },
          BC_E: { '2023': 64000, '2024': 62000, '2025': 60000 },
          SC: { '2023': 90000, '2024': 88000, '2025': 86000 },
          ST: { '2023': 130000, '2024': 128000, '2025': 126000 },
        }
      },
    ]
  },
  {
    id: 'bvrit',
    name: 'B V Raju Institute of Technology',
    shortName: 'BVRIT',
    location: 'Narsapur, Medak',
    district: 'Sangareddy',
    type: 'Autonomous',
    established: 2001,
    affiliation: 'JNTUH',
    naacGrade: 'A',
    nbaAccredited: true,
    ranking: 11,
    placementRating: 4.2,
    avgPackage: 9.8,
    highestPackage: 50,
    totalSeats: 1200,
    website: 'https://bvrit.ac.in',
    description: 'BVRIT is a well-known autonomous engineering college with good placements and modern infrastructure.',
    campus: 'Narsapur, Medak District',
    branches: [
      {
        id: 'bvrit-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 98000,
        cutoffs: {
          OC: { '2023': 9000, '2024': 8700, '2025': 8400 },
          EWS: { '2023': 10400, '2024': 10100, '2025': 9800 },
          BC_A: { '2023': 13800, '2024': 13500, '2025': 13200 },
          BC_B: { '2023': 12200, '2024': 12000, '2025': 11800 },
          BC_C: { '2023': 16500, '2024': 16200, '2025': 16000 },
          BC_D: { '2023': 11600, '2024': 11400, '2025': 11200 },
          BC_E: { '2023': 14900, '2024': 14600, '2025': 14400 },
          SC: { '2023': 22000, '2024': 21500, '2025': 21000 },
          ST: { '2023': 36000, '2024': 35000, '2025': 34000 },
        }
      },
      {
        id: 'bvrit-it', name: 'IT', shortName: 'IT', seats: 120, fees: 98000,
        cutoffs: {
          OC: { '2023': 12500, '2024': 12200, '2025': 12000 },
          EWS: { '2023': 14500, '2024': 14200, '2025': 14000 },
          BC_A: { '2023': 19200, '2024': 18900, '2025': 18600 },
          BC_B: { '2023': 17100, '2024': 16800, '2025': 16500 },
          BC_C: { '2023': 22900, '2024': 22600, '2025': 22300 },
          BC_D: { '2023': 16200, '2024': 15900, '2025': 15600 },
          BC_E: { '2023': 20700, '2024': 20400, '2025': 20100 },
          SC: { '2023': 30000, '2024': 29500, '2025': 29000 },
          ST: { '2023': 50000, '2024': 49000, '2025': 48000 },
        }
      },
      {
        id: 'bvrit-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 93000,
        cutoffs: {
          OC: { '2023': 17000, '2024': 16700, '2025': 16400 },
          EWS: { '2023': 19700, '2024': 19400, '2025': 19100 },
          BC_A: { '2023': 26100, '2024': 25800, '2025': 25500 },
          BC_B: { '2023': 23200, '2024': 22900, '2025': 22600 },
          BC_C: { '2023': 31100, '2024': 30800, '2025': 30500 },
          BC_D: { '2023': 21900, '2024': 21600, '2025': 21300 },
          BC_E: { '2023': 28100, '2024': 27800, '2025': 27500 },
          SC: { '2023': 41000, '2024': 40000, '2025': 39000 },
          ST: { '2023': 67000, '2024': 65000, '2025': 63000 },
        }
      },
    ]
  },
  {
    id: 'vardhaman',
    name: 'Vardhaman College of Engineering',
    shortName: 'Vardhaman',
    location: 'Shamshabad, Hyderabad',
    district: 'Ranga Reddy',
    type: 'Autonomous',
    established: 2000,
    affiliation: 'JNTUH',
    naacGrade: 'A',
    nbaAccredited: true,
    ranking: 12,
    placementRating: 4.1,
    avgPackage: 9.2,
    highestPackage: 45,
    totalSeats: 1200,
    website: 'https://vardhaman.org',
    description: 'Vardhaman College of Engineering is an autonomous institution known for consistent academic quality and good industry relationships.',
    campus: 'Shamshabad, Hyderabad',
    branches: [
      {
        id: 'vardhaman-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 96000,
        cutoffs: {
          OC: { '2023': 11000, '2024': 10700, '2025': 10400 },
          EWS: { '2023': 12800, '2024': 12500, '2025': 12200 },
          BC_A: { '2023': 16900, '2024': 16600, '2025': 16300 },
          BC_B: { '2023': 15100, '2024': 14800, '2025': 14500 },
          BC_C: { '2023': 20300, '2024': 20000, '2025': 19700 },
          BC_D: { '2023': 14200, '2024': 13900, '2025': 13600 },
          BC_E: { '2023': 18300, '2024': 18000, '2025': 17700 },
          SC: { '2023': 27000, '2024': 26500, '2025': 26000 },
          ST: { '2023': 44000, '2024': 43000, '2025': 42000 },
        }
      },
      {
        id: 'vardhaman-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 91000,
        cutoffs: {
          OC: { '2023': 20000, '2024': 19700, '2025': 19400 },
          EWS: { '2023': 23300, '2024': 23000, '2025': 22700 },
          BC_A: { '2023': 31000, '2024': 30700, '2025': 30400 },
          BC_B: { '2023': 27600, '2024': 27300, '2025': 27000 },
          BC_C: { '2023': 37000, '2024': 36700, '2025': 36400 },
          BC_D: { '2023': 26000, '2024': 25700, '2025': 25400 },
          BC_E: { '2023': 33400, '2024': 33100, '2025': 32800 },
          SC: { '2023': 49000, '2024': 48000, '2025': 47000 },
          ST: { '2023': 79000, '2024': 77000, '2025': 75000 },
        }
      },
    ]
  },
  {
    id: 'mlrit',
    name: 'MLR Institute of Technology',
    shortName: 'MLRIT',
    location: 'Dundigal, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Private',
    established: 2007,
    affiliation: 'JNTUH',
    naacGrade: 'B+',
    nbaAccredited: false,
    ranking: 20,
    placementRating: 3.8,
    avgPackage: 7.2,
    highestPackage: 32,
    totalSeats: 900,
    website: 'https://mlrit.ac.in',
    description: 'MLRIT provides engineering education with a practical approach and decent placement support.',
    campus: 'Dundigal, Hyderabad',
    branches: [
      {
        id: 'mlrit-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 82000,
        cutoffs: {
          OC: { '2023': 25000, '2024': 24500, '2025': 24000 },
          EWS: { '2023': 29000, '2024': 28500, '2025': 28000 },
          BC_A: { '2023': 38500, '2024': 38000, '2025': 37500 },
          BC_B: { '2023': 34000, '2024': 33500, '2025': 33000 },
          BC_C: { '2023': 46500, '2024': 46000, '2025': 45500 },
          BC_D: { '2023': 32000, '2024': 31500, '2025': 31000 },
          BC_E: { '2023': 42000, '2024': 41500, '2025': 41000 },
          SC: { '2023': 62000, '2024': 60000, '2025': 58000 },
          ST: { '2023': 100000, '2024': 98000, '2025': 96000 },
        }
      },
    ]
  },
  {
    id: 'cmr',
    name: 'CMR Engineering College',
    shortName: 'CMR',
    location: 'Kandlakoya, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Private',
    established: 2002,
    affiliation: 'JNTUH',
    naacGrade: 'B+',
    nbaAccredited: false,
    ranking: 21,
    placementRating: 3.6,
    avgPackage: 6.8,
    highestPackage: 28,
    totalSeats: 900,
    website: 'https://cmrec.ac.in',
    description: 'CMR Engineering College focuses on providing quality technical education with industry-oriented training programs.',
    campus: 'Kandlakoya, Hyderabad',
    branches: [
      {
        id: 'cmr-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 78000,
        cutoffs: {
          OC: { '2023': 32000, '2024': 31000, '2025': 30000 },
          EWS: { '2023': 37000, '2024': 36000, '2025': 35000 },
          BC_A: { '2023': 49000, '2024': 48000, '2025': 47000 },
          BC_B: { '2023': 44000, '2024': 43000, '2025': 42000 },
          BC_C: { '2023': 59000, '2024': 58000, '2025': 57000 },
          BC_D: { '2023': 41500, '2024': 40500, '2025': 39500 },
          BC_E: { '2023': 53500, '2024': 52500, '2025': 51500 },
          SC: { '2023': 78000, '2024': 76000, '2025': 74000 },
          ST: { '2023': 126000, '2024': 122000, '2025': 118000 },
        }
      },
    ]
  },
  {
    id: 'cmrtc',
    name: 'CMR Technical Campus',
    shortName: 'CMRTC',
    location: 'Medchal, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Private',
    established: 2004,
    affiliation: 'JNTUH',
    naacGrade: 'B',
    nbaAccredited: false,
    ranking: 24,
    placementRating: 3.4,
    avgPackage: 5.8,
    highestPackage: 24,
    totalSeats: 720,
    website: 'https://cmrtc.ac.in',
    description: 'CMR Technical Campus provides engineering education with emphasis on practical skills and industry readiness.',
    campus: 'Medchal, Hyderabad',
    branches: [
      {
        id: 'cmrtc-cse', name: 'CSE', shortName: 'CSE', seats: 180, fees: 72000,
        cutoffs: {
          OC: { '2023': 42000, '2024': 41000, '2025': 40000 },
          EWS: { '2023': 48500, '2024': 47500, '2025': 46500 },
          BC_A: { '2023': 64000, '2024': 63000, '2025': 62000 },
          BC_B: { '2023': 57000, '2024': 56000, '2025': 55000 },
          BC_C: { '2023': 77000, '2024': 76000, '2025': 75000 },
          BC_D: { '2023': 53500, '2024': 52500, '2025': 51500 },
          BC_E: { '2023': 70000, '2024': 69000, '2025': 68000 },
          SC: { '2023': 102000, '2024': 100000, '2025': 98000 },
          ST: { '2023': 160000, '2024': 157000, '2025': 154000 },
        }
      },
    ]
  },
  {
    id: 'anurag',
    name: 'Anurag University',
    shortName: 'Anurag',
    location: 'Venkatapur, Ghatkesar',
    district: 'Medchal–Malkajgiri',
    type: 'Deemed',
    established: 1998,
    affiliation: 'Autonomous (Deemed University)',
    naacGrade: 'A',
    nbaAccredited: true,
    ranking: 13,
    placementRating: 4.0,
    avgPackage: 8.9,
    highestPackage: 42,
    totalSeats: 1200,
    website: 'https://anurag.edu.in',
    description: 'Anurag University (formerly CVSR) is a deemed university with strong focus on research and industry partnerships.',
    campus: 'Venkatapur, Ghatkesar',
    branches: [
      {
        id: 'anurag-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 105000,
        cutoffs: {
          OC: { '2023': 13000, '2024': 12700, '2025': 12400 },
          EWS: { '2023': 15100, '2024': 14800, '2025': 14500 },
          BC_A: { '2023': 20100, '2024': 19800, '2025': 19500 },
          BC_B: { '2023': 17900, '2024': 17600, '2025': 17300 },
          BC_C: { '2023': 24000, '2024': 23700, '2025': 23400 },
          BC_D: { '2023': 16900, '2024': 16600, '2025': 16300 },
          BC_E: { '2023': 21700, '2024': 21400, '2025': 21100 },
          SC: { '2023': 32000, '2024': 31500, '2025': 31000 },
          ST: { '2023': 52000, '2024': 51000, '2025': 50000 },
        }
      },
      {
        id: 'anurag-cse-ds', name: 'CSE (Data Science)', shortName: 'CSE DS', seats: 60, fees: 115000,
        cutoffs: {
          OC: { '2023': 16000, '2024': 15700, '2025': 15400 },
          EWS: { '2023': 18600, '2024': 18300, '2025': 18000 },
          BC_A: { '2023': 24700, '2024': 24400, '2025': 24100 },
          BC_B: { '2023': 21900, '2024': 21600, '2025': 21300 },
          BC_C: { '2023': 29500, '2024': 29200, '2025': 28900 },
          BC_D: { '2023': 20700, '2024': 20400, '2025': 20100 },
          BC_E: { '2023': 26600, '2024': 26300, '2025': 26000 },
          SC: { '2023': 39500, '2024': 39000, '2025': 38500 },
          ST: { '2023': 64000, '2024': 63000, '2025': 62000 },
        }
      },
    ]
  },
  {
    id: 'gnit',
    name: 'Guru Nanak Institutions Technical Campus',
    shortName: 'GNIT',
    location: 'Ibrahimpatnam, Hyderabad',
    district: 'Ranga Reddy',
    type: 'Private',
    established: 2002,
    affiliation: 'JNTUH',
    naacGrade: 'A',
    nbaAccredited: false,
    ranking: 16,
    placementRating: 3.8,
    avgPackage: 7.5,
    highestPackage: 35,
    totalSeats: 960,
    website: 'https://gnit.ac.in',
    description: 'Guru Nanak Institutions Technical Campus offers quality engineering education with a focus on holistic development.',
    campus: 'Ibrahimpatnam, Hyderabad',
    branches: [
      {
        id: 'gnit-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 85000,
        cutoffs: {
          OC: { '2023': 20000, '2024': 19500, '2025': 19000 },
          EWS: { '2023': 23200, '2024': 22700, '2025': 22200 },
          BC_A: { '2023': 30800, '2024': 30300, '2025': 29800 },
          BC_B: { '2023': 27400, '2024': 26900, '2025': 26400 },
          BC_C: { '2023': 36800, '2024': 36300, '2025': 35800 },
          BC_D: { '2023': 25800, '2024': 25300, '2025': 24800 },
          BC_E: { '2023': 33200, '2024': 32700, '2025': 32200 },
          SC: { '2023': 49000, '2024': 48000, '2025': 47000 },
          ST: { '2023': 79000, '2024': 77000, '2025': 75000 },
        }
      },
    ]
  },
  {
    id: 'ace',
    name: 'ACE Engineering College',
    shortName: 'ACE',
    location: 'Ghatkesar, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Private',
    established: 2005,
    affiliation: 'JNTUH',
    naacGrade: 'B+',
    nbaAccredited: false,
    ranking: 22,
    placementRating: 3.5,
    avgPackage: 6.2,
    highestPackage: 26,
    totalSeats: 720,
    website: 'https://aceengg.ac.in',
    description: 'ACE Engineering College provides accessible engineering education with focus on foundational technical skills.',
    campus: 'Ghatkesar, Hyderabad',
    branches: [
      {
        id: 'ace-cse', name: 'CSE', shortName: 'CSE', seats: 180, fees: 74000,
        cutoffs: {
          OC: { '2023': 35000, '2024': 34000, '2025': 33000 },
          EWS: { '2023': 40700, '2024': 39700, '2025': 38700 },
          BC_A: { '2023': 54000, '2024': 53000, '2025': 52000 },
          BC_B: { '2023': 48000, '2024': 47000, '2025': 46000 },
          BC_C: { '2023': 64700, '2024': 63700, '2025': 62700 },
          BC_D: { '2023': 45200, '2024': 44200, '2025': 43200 },
          BC_E: { '2023': 58400, '2024': 57400, '2025': 56400 },
          SC: { '2023': 86000, '2024': 84000, '2025': 82000 },
          ST: { '2023': 138000, '2024': 135000, '2025': 132000 },
        }
      },
    ]
  },
  {
    id: 'tkr',
    name: 'TKR College of Engineering and Technology',
    shortName: 'TKR',
    location: 'Meerpet, Hyderabad',
    district: 'Ranga Reddy',
    type: 'Private',
    established: 2001,
    affiliation: 'JNTUH',
    naacGrade: 'B+',
    nbaAccredited: false,
    ranking: 23,
    placementRating: 3.5,
    avgPackage: 6.0,
    highestPackage: 25,
    totalSeats: 720,
    website: 'https://tkrcet.com',
    description: 'TKR College of Engineering and Technology offers engineering programs with hands-on learning approach.',
    campus: 'Meerpet, Hyderabad',
    branches: [
      {
        id: 'tkr-cse', name: 'CSE', shortName: 'CSE', seats: 180, fees: 72000,
        cutoffs: {
          OC: { '2023': 38000, '2024': 37000, '2025': 36000 },
          EWS: { '2023': 44200, '2024': 43200, '2025': 42200 },
          BC_A: { '2023': 58700, '2024': 57700, '2025': 56700 },
          BC_B: { '2023': 52200, '2024': 51200, '2025': 50200 },
          BC_C: { '2023': 70200, '2024': 69200, '2025': 68200 },
          BC_D: { '2023': 49200, '2024': 48200, '2025': 47200 },
          BC_E: { '2023': 63400, '2024': 62400, '2025': 61400 },
          SC: { '2023': 93500, '2024': 91500, '2025': 89500 },
          ST: { '2023': 150000, '2024': 147000, '2025': 144000 },
        }
      },
    ]
  },
  {
    id: 'mvsr',
    name: 'MVSR Engineering College',
    shortName: 'MVSR',
    location: 'Nadergul, Hyderabad',
    district: 'Ranga Reddy',
    type: 'Autonomous',
    established: 1981,
    affiliation: 'OU',
    naacGrade: 'A',
    nbaAccredited: true,
    ranking: 10,
    placementRating: 4.2,
    avgPackage: 10.0,
    highestPackage: 52,
    totalSeats: 900,
    website: 'https://mvsrec.edu.in',
    description: 'MVSR Engineering College is a reputed autonomous institution affiliated to Osmania University with strong technical education.',
    campus: 'Nadergul, Hyderabad',
    branches: [
      {
        id: 'mvsr-cse', name: 'CSE', shortName: 'CSE', seats: 180, fees: 100000,
        cutoffs: {
          OC: { '2023': 8200, '2024': 8000, '2025': 7800 },
          EWS: { '2023': 9500, '2024': 9300, '2025': 9100 },
          BC_A: { '2023': 12600, '2024': 12400, '2025': 12200 },
          BC_B: { '2023': 11200, '2024': 11000, '2025': 10800 },
          BC_C: { '2023': 15100, '2024': 14900, '2025': 14700 },
          BC_D: { '2023': 10600, '2024': 10400, '2025': 10200 },
          BC_E: { '2023': 13600, '2024': 13400, '2025': 13200 },
          SC: { '2023': 20200, '2024': 20000, '2025': 19800 },
          ST: { '2023': 33000, '2024': 32500, '2025': 32000 },
        }
      },
      {
        id: 'mvsr-ece', name: 'ECE', shortName: 'ECE', seats: 120, fees: 95000,
        cutoffs: {
          OC: { '2023': 14000, '2024': 13700, '2025': 13400 },
          EWS: { '2023': 16300, '2024': 16000, '2025': 15700 },
          BC_A: { '2023': 21600, '2024': 21300, '2025': 21000 },
          BC_B: { '2023': 19200, '2024': 18900, '2025': 18600 },
          BC_C: { '2023': 25900, '2024': 25600, '2025': 25300 },
          BC_D: { '2023': 18100, '2024': 17800, '2025': 17500 },
          BC_E: { '2023': 23300, '2024': 23000, '2025': 22700 },
          SC: { '2023': 34500, '2024': 34000, '2025': 33500 },
          ST: { '2023': 56000, '2024': 55000, '2025': 54000 },
        }
      },
    ]
  },
  {
    id: 'mahindra',
    name: 'Mahindra University',
    shortName: 'Mahindra',
    location: 'Bahadurpally, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Deemed',
    established: 2019,
    affiliation: 'Autonomous (Deemed University)',
    naacGrade: 'NA',
    nbaAccredited: false,
    ranking: 14,
    placementRating: 4.3,
    avgPackage: 13.5,
    highestPackage: 80,
    totalSeats: 600,
    website: 'https://mahindrauniversity.edu.in',
    description: 'Mahindra University is a new-age deemed university backed by the Mahindra Group, offering innovative STEM programs with global exposure.',
    campus: 'Bahadurpally, Hyderabad',
    branches: [
      {
        id: 'mahindra-cse', name: 'CSE', shortName: 'CSE', seats: 120, fees: 265000,
        cutoffs: {
          OC: { '2023': 5800, '2024': 5600, '2025': 5400 },
          EWS: { '2023': 6700, '2024': 6500, '2025': 6300 },
          BC_A: { '2023': 8900, '2024': 8700, '2025': 8500 },
          BC_B: { '2023': 7900, '2024': 7700, '2025': 7500 },
          BC_C: { '2023': 10700, '2024': 10500, '2025': 10300 },
          BC_D: { '2023': 7500, '2024': 7300, '2025': 7100 },
          BC_E: { '2023': 9600, '2024': 9400, '2025': 9200 },
          SC: { '2023': 14200, '2024': 14000, '2025': 13800 },
          ST: { '2023': 23400, '2024': 23000, '2025': 22600 },
        }
      },
      {
        id: 'mahindra-cse-aiml', name: 'CSE (AI & ML)', shortName: 'CSE AI&ML', seats: 60, fees: 280000,
        cutoffs: {
          OC: { '2023': 7200, '2024': 7000, '2025': 6800 },
          EWS: { '2023': 8400, '2024': 8200, '2025': 8000 },
          BC_A: { '2023': 11200, '2024': 11000, '2025': 10800 },
          BC_B: { '2023': 9900, '2024': 9700, '2025': 9500 },
          BC_C: { '2023': 13400, '2024': 13200, '2025': 13000 },
          BC_D: { '2023': 9400, '2024': 9200, '2025': 9000 },
          BC_E: { '2023': 12100, '2024': 11900, '2025': 11700 },
          SC: { '2023': 17900, '2024': 17600, '2025': 17300 },
          ST: { '2023': 29200, '2024': 28800, '2025': 28400 },
        }
      },
    ]
  },
  {
    id: 'iare',
    name: 'Institute of Aeronautical Engineering',
    shortName: 'IARE',
    location: 'Dundigal, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Autonomous',
    established: 2000,
    affiliation: 'JNTUH',
    naacGrade: 'A+',
    nbaAccredited: true,
    ranking: 17,
    placementRating: 4.0,
    avgPackage: 8.5,
    highestPackage: 40,
    totalSeats: 1200,
    website: 'https://iare.ac.in',
    description: 'IARE is a reputed autonomous institution known for quality education in engineering and technical programs.',
    campus: 'Dundigal, Hyderabad',
    branches: [
      {
        id: 'iare-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 95000,
        cutoffs: {
          OC: { '2023': 16000, '2024': 15700, '2025': 15400 },
          EWS: { '2023': 18600, '2024': 18300, '2025': 18000 },
          BC_A: { '2023': 24700, '2024': 24400, '2025': 24100 },
          BC_B: { '2023': 21900, '2024': 21600, '2025': 21300 },
          BC_C: { '2023': 29500, '2024': 29200, '2025': 28900 },
          BC_D: { '2023': 20700, '2024': 20400, '2025': 20100 },
          BC_E: { '2023': 26600, '2024': 26300, '2025': 26000 },
          SC: { '2023': 39500, '2024': 39000, '2025': 38500 },
          ST: { '2023': 64000, '2024': 63000, '2025': 62000 },
        }
      },
      {
        id: 'iare-ece', name: 'ECE', shortName: 'ECE', seats: 180, fees: 90000,
        cutoffs: {
          OC: { '2023': 26500, '2024': 26000, '2025': 25500 },
          EWS: { '2023': 30800, '2024': 30300, '2025': 29800 },
          BC_A: { '2023': 40900, '2024': 40400, '2025': 39900 },
          BC_B: { '2023': 36300, '2024': 35800, '2025': 35300 },
          BC_C: { '2023': 48800, '2024': 48300, '2025': 47800 },
          BC_D: { '2023': 34300, '2024': 33800, '2025': 33300 },
          BC_E: { '2023': 44100, '2024': 43600, '2025': 43100 },
          SC: { '2023': 65000, '2024': 64000, '2025': 63000 },
          ST: { '2023': 105000, '2024': 103000, '2025': 101000 },
        }
      },
    ]
  },
  {
    id: 'hitam',
    name: 'Hyderabad Institute of Technology and Management',
    shortName: 'HITAM',
    location: 'Gowdavalli, Hyderabad',
    district: 'Ranga Reddy',
    type: 'Private',
    established: 2002,
    affiliation: 'JNTUH',
    naacGrade: 'A',
    nbaAccredited: false,
    ranking: 19,
    placementRating: 3.9,
    avgPackage: 7.8,
    highestPackage: 36,
    totalSeats: 900,
    website: 'https://hitam.org',
    description: 'HITAM offers engineering programs with a focus on overall development and industry-ready skills.',
    campus: 'Gowdavalli, Hyderabad',
    branches: [
      {
        id: 'hitam-cse', name: 'CSE', shortName: 'CSE', seats: 240, fees: 85000,
        cutoffs: {
          OC: { '2023': 19000, '2024': 18500, '2025': 18000 },
          EWS: { '2023': 22100, '2024': 21600, '2025': 21100 },
          BC_A: { '2023': 29300, '2024': 28800, '2025': 28300 },
          BC_B: { '2023': 26100, '2024': 25600, '2025': 25100 },
          BC_C: { '2023': 35100, '2024': 34600, '2025': 34100 },
          BC_D: { '2023': 24600, '2024': 24100, '2025': 23600 },
          BC_E: { '2023': 31700, '2024': 31200, '2025': 30700 },
          SC: { '2023': 46500, '2024': 45500, '2025': 44500 },
          ST: { '2023': 75000, '2024': 73000, '2025': 71000 },
        }
      },
      {
        id: 'hitam-cse-aiml', name: 'CSE (AI & ML)', shortName: 'CSE AI&ML', seats: 60, fees: 95000,
        cutoffs: {
          OC: { '2023': 23500, '2024': 23000, '2025': 22500 },
          EWS: { '2023': 27300, '2024': 26800, '2025': 26300 },
          BC_A: { '2023': 36300, '2024': 35800, '2025': 35300 },
          BC_B: { '2023': 32300, '2024': 31800, '2025': 31300 },
          BC_C: { '2023': 43400, '2024': 42900, '2025': 42400 },
          BC_D: { '2023': 30400, '2024': 29900, '2025': 29400 },
          BC_E: { '2023': 39200, '2024': 38700, '2025': 38200 },
          SC: { '2023': 57500, '2024': 56500, '2025': 55500 },
          ST: { '2023': 93000, '2024': 91000, '2025': 89000 },
        }
      },
    ]
  },
  {
    id: 'mallareddy',
    name: 'Malla Reddy Engineering College',
    shortName: 'MREC',
    location: 'Maisammaguda, Hyderabad',
    district: 'Medchal–Malkajgiri',
    type: 'Autonomous',
    established: 2002,
    affiliation: 'JNTUH',
    naacGrade: 'A',
    nbaAccredited: true,
    ranking: 14,
    placementRating: 4.1,
    avgPackage: 9.5,
    highestPackage: 47,
    totalSeats: 1500,
    website: 'https://mrec.ac.in',
    description: 'Malla Reddy Engineering College is one of the largest engineering colleges in Hyderabad with comprehensive technical programs.',
    campus: 'Maisammaguda, Hyderabad',
    branches: [
      {
        id: 'mrec-cse', name: 'CSE', shortName: 'CSE', seats: 360, fees: 93000,
        cutoffs: {
          OC: { '2023': 14500, '2024': 14200, '2025': 14000 },
          EWS: { '2023': 16900, '2024': 16600, '2025': 16300 },
          BC_A: { '2023': 22400, '2024': 22100, '2025': 21800 },
          BC_B: { '2023': 19900, '2024': 19600, '2025': 19300 },
          BC_C: { '2023': 26800, '2024': 26500, '2025': 26200 },
          BC_D: { '2023': 18800, '2024': 18500, '2025': 18200 },
          BC_E: { '2023': 24200, '2024': 23900, '2025': 23600 },
          SC: { '2023': 35700, '2024': 35200, '2025': 34700 },
          ST: { '2023': 58000, '2024': 57000, '2025': 56000 },
        }
      },
      {
        id: 'mrec-cse-aiml', name: 'CSE (AI & ML)', shortName: 'CSE AI&ML', seats: 120, fees: 103000,
        cutoffs: {
          OC: { '2023': 18000, '2024': 17700, '2025': 17400 },
          EWS: { '2023': 20900, '2024': 20600, '2025': 20300 },
          BC_A: { '2023': 27800, '2024': 27500, '2025': 27200 },
          BC_B: { '2023': 24700, '2024': 24400, '2025': 24100 },
          BC_C: { '2023': 33200, '2024': 32900, '2025': 32600 },
          BC_D: { '2023': 23300, '2024': 23000, '2025': 22700 },
          BC_E: { '2023': 30000, '2024': 29700, '2025': 29400 },
          SC: { '2023': 44300, '2024': 43800, '2025': 43300 },
          ST: { '2023': 71800, '2024': 70800, '2025': 69800 },
        }
      },
    ]
  },
]

export default colleges

export function getCollegeById(id: string): College | undefined {
  return colleges.find(c => c.id === id)
}

export function getAllColleges(): College[] {
  return colleges
}

export function getCollegesByRank(maxRank?: number): College[] {
  const sorted = [...colleges].sort((a, b) => a.ranking - b.ranking)
  if (maxRank) return sorted.filter(c => c.ranking <= maxRank)
  return sorted
}

export function predictCutoff(historicalCutoffs: { '2023': number; '2024': number; '2025': number }): number {
  const { '2023': y23, '2024': y24, '2025': y25 } = historicalCutoffs
  // Linear trend extrapolation
  const trend1 = y24 - y23  // change from 23 to 24
  const trend2 = y25 - y24  // change from 24 to 25
  const avgTrend = (trend1 + trend2) / 2
  // Apply trend with slight dampening
  const predicted = Math.round(y25 + avgTrend * 0.8)
  return Math.max(predicted, 100) // Ensure positive
}
