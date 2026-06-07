import type { College, BranchData } from '@/data/colleges'

// ─────────────────────────────────────────────────────────────
// NIT Tiruchirappalli
// ─────────────────────────────────────────────────────────────
const nitTrichy: College = {
  id: 'nit-trichy',
  name: 'National Institute of Technology Tiruchirappalli',
  shortName: 'NIT Trichy',
  location: 'Tiruchirappalli, Tamil Nadu',
  district: 'Tiruchirappalli',
  type: 'Government',
  established: 1964,
  affiliation: 'Autonomous (MHRD)',
  naacGrade: 'A++',
  nbaAccredited: true,
  ranking: 1,
  placementRating: 4.9,
  avgPackage: 16.5,
  highestPackage: 82,
  totalSeats: 1200,
  website: 'https://www.nitt.edu',
  description:
    'NIT Tiruchirappalli is the top-ranked NIT in India, known for its rigorous academics, vibrant campus culture, and outstanding placement record. It consistently ranks among the top 10 engineering institutions in the country with strong research output and industry collaborations.',
  campus:
    'Sprawling 800-acre campus with state-of-the-art laboratories, central library, hostels, sports complex, and lush greenery along the banks of the Cauvery river.',
  branches: [
    {
      id: 'nit-trichy-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 93,
      fees: 75000,
      cutoffs: {
        General: { '2023': 2800, '2024': 2650, '2025': 2500 },
        OBC_NCL: { '2023': 7800, '2024': 7400, '2025': 7000 },
        SC: { '2023': 16800, '2024': 15900, '2025': 15000 },
        ST: { '2023': 28000, '2024': 26500, '2025': 25000 },
        EWS: { '2023': 4200, '2024': 3970, '2025': 3750 },
      },
    },
    {
      id: 'nit-trichy-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 120,
      fees: 75000,
      cutoffs: {
        General: { '2023': 4900, '2024': 4650, '2025': 4400 },
        OBC_NCL: { '2023': 13700, '2024': 13000, '2025': 12300 },
        SC: { '2023': 29400, '2024': 27900, '2025': 26400 },
        ST: { '2023': 49000, '2024': 46500, '2025': 44000 },
        EWS: { '2023': 7350, '2024': 6975, '2025': 6600 },
      },
    },
    {
      id: 'nit-trichy-eee',
      name: 'Electrical and Electronics Engineering',
      shortName: 'EEE',
      seats: 93,
      fees: 75000,
      cutoffs: {
        General: { '2023': 7000, '2024': 6650, '2025': 6300 },
        OBC_NCL: { '2023': 19600, '2024': 18600, '2025': 17600 },
        SC: { '2023': 42000, '2024': 39900, '2025': 37800 },
        ST: { '2023': 70000, '2024': 66500, '2025': 63000 },
        EWS: { '2023': 10500, '2024': 9975, '2025': 9450 },
      },
    },
    {
      id: 'nit-trichy-mech',
      name: 'Mechanical Engineering',
      shortName: 'Mech',
      seats: 120,
      fees: 75000,
      cutoffs: {
        General: { '2023': 11200, '2024': 10600, '2025': 10000 },
        OBC_NCL: { '2023': 31400, '2024': 29700, '2025': 28000 },
        SC: { '2023': 67200, '2024': 63600, '2025': 60000 },
        ST: { '2023': 112000, '2024': 106000, '2025': 100000 },
        EWS: { '2023': 16800, '2024': 15900, '2025': 15000 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// NIT Karnataka (Surathkal)
// ─────────────────────────────────────────────────────────────
const nitSurathkal: College = {
  id: 'nit-surathkal',
  name: 'National Institute of Technology Karnataka',
  shortName: 'NIT Surathkal',
  location: 'Surathkal, Karnataka',
  district: 'Dakshina Kannada',
  type: 'Government',
  established: 1960,
  affiliation: 'Autonomous (MHRD)',
  naacGrade: 'A+',
  nbaAccredited: true,
  ranking: 2,
  placementRating: 4.8,
  avgPackage: 15.8,
  highestPackage: 78,
  totalSeats: 1100,
  website: 'https://www.nitk.ac.in',
  description:
    'NIT Karnataka, Surathkal is one of the premier NITs with an enviable coastal campus, strong alumni network, and excellent placement statistics. Renowned for its engineering and research programs.',
  campus:
    'A picturesque 300-acre campus nestled between the Arabian Sea and the Western Ghats, featuring modern hostels, well-equipped labs, a private beach, and extensive sports facilities.',
  branches: [
    {
      id: 'nit-surathkal-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 100,
      fees: 75000,
      cutoffs: {
        General: { '2023': 3200, '2024': 3050, '2025': 2900 },
        OBC_NCL: { '2023': 8960, '2024': 8540, '2025': 8120 },
        SC: { '2023': 19200, '2024': 18300, '2025': 17400 },
        ST: { '2023': 32000, '2024': 30500, '2025': 29000 },
        EWS: { '2023': 4800, '2024': 4575, '2025': 4350 },
      },
    },
    {
      id: 'nit-surathkal-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 100,
      fees: 75000,
      cutoffs: {
        General: { '2023': 5600, '2024': 5300, '2025': 5000 },
        OBC_NCL: { '2023': 15700, '2024': 14850, '2025': 14000 },
        SC: { '2023': 33600, '2024': 31800, '2025': 30000 },
        ST: { '2023': 56000, '2024': 53000, '2025': 50000 },
        EWS: { '2023': 8400, '2024': 7950, '2025': 7500 },
      },
    },
    {
      id: 'nit-surathkal-eee',
      name: 'Electrical and Electronics Engineering',
      shortName: 'EEE',
      seats: 80,
      fees: 75000,
      cutoffs: {
        General: { '2023': 8000, '2024': 7600, '2025': 7200 },
        OBC_NCL: { '2023': 22400, '2024': 21300, '2025': 20200 },
        SC: { '2023': 48000, '2024': 45600, '2025': 43200 },
        ST: { '2023': 80000, '2024': 76000, '2025': 72000 },
        EWS: { '2023': 12000, '2024': 11400, '2025': 10800 },
      },
    },
    {
      id: 'nit-surathkal-mech',
      name: 'Mechanical Engineering',
      shortName: 'Mech',
      seats: 120,
      fees: 75000,
      cutoffs: {
        General: { '2023': 12800, '2024': 12200, '2025': 11600 },
        OBC_NCL: { '2023': 35840, '2024': 34160, '2025': 32480 },
        SC: { '2023': 76800, '2024': 73200, '2025': 69600 },
        ST: { '2023': 128000, '2024': 122000, '2025': 116000 },
        EWS: { '2023': 19200, '2024': 18300, '2025': 17400 },
      },
    },
    {
      id: 'nit-surathkal-it',
      name: 'Information Technology',
      shortName: 'IT',
      seats: 60,
      fees: 75000,
      cutoffs: {
        General: { '2023': 4200, '2024': 3950, '2025': 3700 },
        OBC_NCL: { '2023': 11760, '2024': 11060, '2025': 10360 },
        SC: { '2023': 25200, '2024': 23700, '2025': 22200 },
        ST: { '2023': 42000, '2024': 39500, '2025': 37000 },
        EWS: { '2023': 6300, '2024': 5925, '2025': 5550 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// NIT Warangal
// ─────────────────────────────────────────────────────────────
const nitWarangal: College = {
  id: 'nit-warangal',
  name: 'National Institute of Technology Warangal',
  shortName: 'NIT Warangal',
  location: 'Warangal, Telangana',
  district: 'Warangal',
  type: 'Government',
  established: 1959,
  affiliation: 'Autonomous (MHRD)',
  naacGrade: 'A++',
  nbaAccredited: true,
  ranking: 3,
  placementRating: 4.8,
  avgPackage: 15.2,
  highestPackage: 75,
  totalSeats: 1050,
  website: 'https://www.nitw.ac.in',
  description:
    'NIT Warangal is the first NIT established in India, boasting a legacy of excellence in engineering education, research innovation, and a strong entrepreneurial ecosystem. Its alumni network spans global tech giants and leading startups.',
  campus:
    'A lush 250-acre campus with historic architecture, advanced computing centers, well-maintained hostels, a technology business incubator, and vibrant student activity centers.',
  branches: [
    {
      id: 'nit-warangal-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 100,
      fees: 63000,
      cutoffs: {
        General: { '2023': 3500, '2024': 3300, '2025': 3100 },
        OBC_NCL: { '2023': 9800, '2024': 9240, '2025': 8680 },
        SC: { '2023': 21000, '2024': 19800, '2025': 18600 },
        ST: { '2023': 35000, '2024': 33000, '2025': 31000 },
        EWS: { '2023': 5250, '2024': 4950, '2025': 4650 },
      },
    },
    {
      id: 'nit-warangal-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 120,
      fees: 63000,
      cutoffs: {
        General: { '2023': 6100, '2024': 5800, '2025': 5500 },
        OBC_NCL: { '2023': 17100, '2024': 16200, '2025': 15400 },
        SC: { '2023': 36600, '2024': 34800, '2025': 33000 },
        ST: { '2023': 61000, '2024': 58000, '2025': 55000 },
        EWS: { '2023': 9150, '2024': 8700, '2025': 8250 },
      },
    },
    {
      id: 'nit-warangal-eee',
      name: 'Electrical and Electronics Engineering',
      shortName: 'EEE',
      seats: 90,
      fees: 63000,
      cutoffs: {
        General: { '2023': 8750, '2024': 8300, '2025': 7850 },
        OBC_NCL: { '2023': 24500, '2024': 23200, '2025': 22000 },
        SC: { '2023': 52500, '2024': 49800, '2025': 47100 },
        ST: { '2023': 87500, '2024': 83000, '2025': 78500 },
        EWS: { '2023': 13125, '2024': 12450, '2025': 11775 },
      },
    },
    {
      id: 'nit-warangal-mech',
      name: 'Mechanical Engineering',
      shortName: 'Mech',
      seats: 120,
      fees: 63000,
      cutoffs: {
        General: { '2023': 14000, '2024': 13200, '2025': 12400 },
        OBC_NCL: { '2023': 39200, '2024': 36960, '2025': 34720 },
        SC: { '2023': 84000, '2024': 79200, '2025': 74400 },
        ST: { '2023': 140000, '2024': 132000, '2025': 124000 },
        EWS: { '2023': 21000, '2024': 19800, '2025': 18600 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// NIT Calicut
// ─────────────────────────────────────────────────────────────
const nitCalicut: College = {
  id: 'nit-calicut',
  name: 'National Institute of Technology Calicut',
  shortName: 'NIT Calicut',
  location: 'Kozhikode, Kerala',
  district: 'Kozhikode',
  type: 'Government',
  established: 1961,
  affiliation: 'Autonomous (MHRD)',
  naacGrade: 'A+',
  nbaAccredited: true,
  ranking: 4,
  placementRating: 4.6,
  avgPackage: 13.5,
  highestPackage: 68,
  totalSeats: 1000,
  website: 'https://www.nitc.ac.in',
  description:
    'NIT Calicut is a leading NIT in South India known for its strong research culture, consistently high placement statistics, and a beautiful campus surrounded by the hills of Chathamangalam. It excels in computer science and electronics programs.',
  campus:
    'An eco-friendly 120-acre campus amidst the Western Ghats with modern academic blocks, extensive library resources, comfortable hostels, and well-equipped sports grounds.',
  branches: [
    {
      id: 'nit-calicut-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 100,
      fees: 75000,
      cutoffs: {
        General: { '2023': 5500, '2024': 5200, '2025': 4900 },
        OBC_NCL: { '2023': 15400, '2024': 14560, '2025': 13720 },
        SC: { '2023': 33000, '2024': 31200, '2025': 29400 },
        ST: { '2023': 55000, '2024': 52000, '2025': 49000 },
        EWS: { '2023': 8250, '2024': 7800, '2025': 7350 },
      },
    },
    {
      id: 'nit-calicut-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 100,
      fees: 75000,
      cutoffs: {
        General: { '2023': 9350, '2024': 8850, '2025': 8350 },
        OBC_NCL: { '2023': 26200, '2024': 24800, '2025': 23400 },
        SC: { '2023': 56100, '2024': 53100, '2025': 50100 },
        ST: { '2023': 93500, '2024': 88500, '2025': 83500 },
        EWS: { '2023': 14025, '2024': 13275, '2025': 12525 },
      },
    },
    {
      id: 'nit-calicut-eee',
      name: 'Electrical and Electronics Engineering',
      shortName: 'EEE',
      seats: 90,
      fees: 75000,
      cutoffs: {
        General: { '2023': 13750, '2024': 13000, '2025': 12250 },
        OBC_NCL: { '2023': 38500, '2024': 36400, '2025': 34300 },
        SC: { '2023': 82500, '2024': 78000, '2025': 73500 },
        ST: { '2023': 137500, '2024': 130000, '2025': 122500 },
        EWS: { '2023': 20625, '2024': 19500, '2025': 18375 },
      },
    },
    {
      id: 'nit-calicut-mech',
      name: 'Mechanical Engineering',
      shortName: 'Mech',
      seats: 100,
      fees: 75000,
      cutoffs: {
        General: { '2023': 22000, '2024': 20800, '2025': 19600 },
        OBC_NCL: { '2023': 61600, '2024': 58240, '2025': 54880 },
        SC: { '2023': 132000, '2024': 124800, '2025': 117600 },
        ST: { '2023': 220000, '2024': 208000, '2025': 196000 },
        EWS: { '2023': 33000, '2024': 31200, '2025': 29400 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// NIT Rourkela
// ─────────────────────────────────────────────────────────────
const nitRourkela: College = {
  id: 'nit-rourkela',
  name: 'National Institute of Technology Rourkela',
  shortName: 'NIT Rourkela',
  location: 'Rourkela, Odisha',
  district: 'Sundargarh',
  type: 'Government',
  established: 1961,
  affiliation: 'Autonomous (MHRD)',
  naacGrade: 'A+',
  nbaAccredited: true,
  ranking: 5,
  placementRating: 4.5,
  avgPackage: 12.8,
  highestPackage: 62,
  totalSeats: 1000,
  website: 'https://www.nitrkl.ac.in',
  description:
    'NIT Rourkela is a top-tier NIT renowned for its metallurgical, mining, and computer science programs. It has a strong focus on research with several centres of excellence and interdisciplinary programs.',
  campus:
    'A 640-acre campus with world-class infrastructure, central research facility, innovation and incubation centre, expansive hostels, and a multi-purpose indoor stadium.',
  branches: [
    {
      id: 'nit-rourkela-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 80,
      fees: 75000,
      cutoffs: {
        General: { '2023': 7000, '2024': 6700, '2025': 6400 },
        OBC_NCL: { '2023': 19600, '2024': 18760, '2025': 17920 },
        SC: { '2023': 42000, '2024': 40200, '2025': 38400 },
        ST: { '2023': 70000, '2024': 67000, '2025': 64000 },
        EWS: { '2023': 10500, '2024': 10050, '2025': 9600 },
      },
    },
    {
      id: 'nit-rourkela-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 100,
      fees: 75000,
      cutoffs: {
        General: { '2023': 11900, '2024': 11400, '2025': 10900 },
        OBC_NCL: { '2023': 33300, '2024': 31900, '2025': 30500 },
        SC: { '2023': 71400, '2024': 68400, '2025': 65400 },
        ST: { '2023': 119000, '2024': 114000, '2025': 109000 },
        EWS: { '2023': 17850, '2024': 17100, '2025': 16350 },
      },
    },
    {
      id: 'nit-rourkela-eee',
      name: 'Electrical and Electronics Engineering',
      shortName: 'EEE',
      seats: 80,
      fees: 75000,
      cutoffs: {
        General: { '2023': 17500, '2024': 16750, '2025': 16000 },
        OBC_NCL: { '2023': 49000, '2024': 46900, '2025': 44800 },
        SC: { '2023': 105000, '2024': 100500, '2025': 96000 },
        ST: { '2023': 175000, '2024': 167500, '2025': 160000 },
        EWS: { '2023': 26250, '2024': 25125, '2025': 24000 },
      },
    },
    {
      id: 'nit-rourkela-mech',
      name: 'Mechanical Engineering',
      shortName: 'Mech',
      seats: 120,
      fees: 75000,
      cutoffs: {
        General: { '2023': 28000, '2024': 26800, '2025': 25600 },
        OBC_NCL: { '2023': 78400, '2024': 75040, '2025': 71680 },
        SC: { '2023': 168000, '2024': 160800, '2025': 153600 },
        ST: { '2023': 280000, '2024': 268000, '2025': 256000 },
        EWS: { '2023': 42000, '2024': 40200, '2025': 38400 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// MNNIT Allahabad
// ─────────────────────────────────────────────────────────────
const mnnitAllahabad: College = {
  id: 'mnnit-allahabad',
  name: 'Motilal Nehru National Institute of Technology Allahabad',
  shortName: 'MNNIT Allahabad',
  location: 'Prayagraj, Uttar Pradesh',
  district: 'Prayagraj',
  type: 'Government',
  established: 1961,
  affiliation: 'Autonomous (MHRD)',
  naacGrade: 'A',
  nbaAccredited: true,
  ranking: 6,
  placementRating: 4.4,
  avgPackage: 12.0,
  highestPackage: 55,
  totalSeats: 950,
  website: 'https://www.mnnit.ac.in',
  description:
    'MNNIT Allahabad is a prestigious NIT in North India with a storied legacy dating back to its founding as Motilal Nehru Regional Engineering College. It is well-regarded for its computer science, electronics, and civil engineering programs.',
  campus:
    'A compact yet well-equipped 222-acre campus near the confluence of the Ganga and Yamuna, featuring modern labs, a central computing facility, hostels, and recreational amenities.',
  branches: [
    {
      id: 'mnnit-allahabad-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 80,
      fees: 72000,
      cutoffs: {
        General: { '2023': 8500, '2024': 8100, '2025': 7700 },
        OBC_NCL: { '2023': 23800, '2024': 22680, '2025': 21560 },
        SC: { '2023': 51000, '2024': 48600, '2025': 46200 },
        ST: { '2023': 85000, '2024': 81000, '2025': 77000 },
        EWS: { '2023': 12750, '2024': 12150, '2025': 11550 },
      },
    },
    {
      id: 'mnnit-allahabad-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 90,
      fees: 72000,
      cutoffs: {
        General: { '2023': 14450, '2024': 13770, '2025': 13090 },
        OBC_NCL: { '2023': 40460, '2024': 38556, '2025': 36652 },
        SC: { '2023': 86700, '2024': 82620, '2025': 78540 },
        ST: { '2023': 144500, '2024': 137700, '2025': 130900 },
        EWS: { '2023': 21675, '2024': 20655, '2025': 19635 },
      },
    },
    {
      id: 'mnnit-allahabad-eee',
      name: 'Electrical and Electronics Engineering',
      shortName: 'EEE',
      seats: 80,
      fees: 72000,
      cutoffs: {
        General: { '2023': 21250, '2024': 20250, '2025': 19250 },
        OBC_NCL: { '2023': 59500, '2024': 56700, '2025': 53900 },
        SC: { '2023': 127500, '2024': 121500, '2025': 115500 },
        ST: { '2023': 212500, '2024': 202500, '2025': 192500 },
        EWS: { '2023': 31875, '2024': 30375, '2025': 28875 },
      },
    },
    {
      id: 'mnnit-allahabad-mech',
      name: 'Mechanical Engineering',
      shortName: 'Mech',
      seats: 100,
      fees: 72000,
      cutoffs: {
        General: { '2023': 34000, '2024': 32400, '2025': 30800 },
        OBC_NCL: { '2023': 95200, '2024': 90720, '2025': 86240 },
        SC: { '2023': 204000, '2024': 194400, '2025': 184800 },
        ST: { '2023': 340000, '2024': 324000, '2025': 308000 },
        EWS: { '2023': 51000, '2024': 48600, '2025': 46200 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// IIIT Hyderabad
// ─────────────────────────────────────────────────────────────
const iiitHyderabad: College = {
  id: 'iiit-hyderabad',
  name: 'International Institute of Information Technology Hyderabad',
  shortName: 'IIIT Hyderabad',
  location: 'Gachibowli, Hyderabad',
  district: 'Hyderabad',
  type: 'Deemed',
  established: 1998,
  affiliation: 'Deemed University',
  naacGrade: 'A++',
  nbaAccredited: true,
  ranking: 7,
  placementRating: 4.9,
  avgPackage: 20.0,
  highestPackage: 120,
  totalSeats: 300,
  website: 'https://www.iiit.ac.in',
  description:
    'IIIT Hyderabad is one of India\'s most elite institutes for computer science and information technology. Known for its research-driven curriculum, world-class faculty, and exceptional placements with top global tech companies.',
  campus:
    'A modern 66-acre campus in the IT hub of Gachibowli, featuring cutting-edge research labs, incubation centres, smart classrooms, and a vibrant student community.',
  branches: [
    {
      id: 'iiit-hyderabad-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 150,
      fees: 250000,
      cutoffs: {
        General: { '2023': 1800, '2024': 1700, '2025': 1600 },
        OBC_NCL: { '2023': 5400, '2024': 5100, '2025': 4800 },
        SC: { '2023': 10800, '2024': 10200, '2025': 9600 },
        ST: { '2023': 18000, '2024': 17000, '2025': 16000 },
        EWS: { '2023': 2700, '2024': 2550, '2025': 2400 },
      },
    },
    {
      id: 'iiit-hyderabad-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 150,
      fees: 250000,
      cutoffs: {
        General: { '2023': 3060, '2024': 2890, '2025': 2720 },
        OBC_NCL: { '2023': 8570, '2024': 8090, '2025': 7620 },
        SC: { '2023': 18360, '2024': 17340, '2025': 16320 },
        ST: { '2023': 30600, '2024': 28900, '2025': 27200 },
        EWS: { '2023': 4590, '2024': 4335, '2025': 4080 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// IIIT Bangalore
// ─────────────────────────────────────────────────────────────
const iiitBangalore: College = {
  id: 'iiit-bangalore',
  name: 'International Institute of Information Technology Bangalore',
  shortName: 'IIIT Bangalore',
  location: 'Electronic City, Bangalore',
  district: 'Bangalore',
  type: 'Deemed',
  established: 1999,
  affiliation: 'Deemed University',
  naacGrade: 'A+',
  nbaAccredited: true,
  ranking: 8,
  placementRating: 4.7,
  avgPackage: 18.5,
  highestPackage: 95,
  totalSeats: 250,
  website: 'https://www.iiitb.ac.in',
  description:
    'IIIT Bangalore is a leading institution in the heart of India\'s Silicon Valley. Its industry-integrated curriculum, strong placement record, and proximity to major tech companies make it a top choice for aspiring engineers.',
  campus:
    'A compact, modern campus in Electronic City with state-of-the-art computing infrastructure, innovation labs, collaborative workspaces, and comfortable residential facilities.',
  branches: [
    {
      id: 'iiit-bangalore-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 120,
      fees: 340000,
      cutoffs: {
        General: { '2023': 4200, '2024': 3900, '2025': 3600 },
        OBC_NCL: { '2023': 11760, '2024': 10920, '2025': 10080 },
        SC: { '2023': 25200, '2024': 23400, '2025': 21600 },
        ST: { '2023': 42000, '2024': 39000, '2025': 36000 },
        EWS: { '2023': 6300, '2024': 5850, '2025': 5400 },
      },
    },
    {
      id: 'iiit-bangalore-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 130,
      fees: 340000,
      cutoffs: {
        General: { '2023': 7140, '2024': 6630, '2025': 6120 },
        OBC_NCL: { '2023': 19990, '2024': 18560, '2025': 17140 },
        SC: { '2023': 42840, '2024': 39780, '2025': 36720 },
        ST: { '2023': 71400, '2024': 66300, '2025': 61200 },
        EWS: { '2023': 10710, '2024': 9945, '2025': 9180 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// IIIT Delhi
// ─────────────────────────────────────────────────────────────
const iiitDelhi: College = {
  id: 'iiit-delhi',
  name: 'Indraprastha Institute of Information Technology Delhi',
  shortName: 'IIIT Delhi',
  location: 'Okhla, New Delhi',
  district: 'New Delhi',
  type: 'Government',
  established: 2008,
  affiliation: 'Autonomous (Delhi Govt)',
  naacGrade: 'A+',
  nbaAccredited: true,
  ranking: 9,
  placementRating: 4.7,
  avgPackage: 17.8,
  highestPackage: 90,
  totalSeats: 350,
  website: 'https://www.iiitd.ac.in',
  description:
    'IIIT Delhi is a young yet rapidly rising institute offering specialised CSE programs including AI and Design tracks. Its research output, startup culture, and exceptional placements rival much older institutions.',
  campus:
    'A state-of-the-art campus in Okhla Phase III with modern academic buildings, advanced AI and machine learning labs, a well-stocked library, and vibrant co-curricular spaces.',
  branches: [
    {
      id: 'iiit-delhi-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 100,
      fees: 310000,
      cutoffs: {
        General: { '2023': 3800, '2024': 3500, '2025': 3200 },
        OBC_NCL: { '2023': 10640, '2024': 9800, '2025': 8960 },
        SC: { '2023': 22800, '2024': 21000, '2025': 19200 },
        ST: { '2023': 38000, '2024': 35000, '2025': 32000 },
        EWS: { '2023': 5700, '2024': 5250, '2025': 4800 },
      },
    },
    {
      id: 'iiit-delhi-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 100,
      fees: 310000,
      cutoffs: {
        General: { '2023': 6460, '2024': 5950, '2025': 5440 },
        OBC_NCL: { '2023': 18090, '2024': 16660, '2025': 15230 },
        SC: { '2023': 38760, '2024': 35700, '2025': 32640 },
        ST: { '2023': 64600, '2024': 59500, '2025': 54400 },
        EWS: { '2023': 9690, '2024': 8925, '2025': 8160 },
      },
    },
    {
      id: 'iiit-delhi-csai',
      name: 'Computer Science and Engineering (Artificial Intelligence)',
      shortName: 'CSAI',
      seats: 75,
      fees: 310000,
      cutoffs: {
        General: { '2023': 3420, '2024': 3150, '2025': 2880 },
        OBC_NCL: { '2023': 9580, '2024': 8820, '2025': 8060 },
        SC: { '2023': 20520, '2024': 18900, '2025': 17280 },
        ST: { '2023': 34200, '2024': 31500, '2025': 28800 },
        EWS: { '2023': 5130, '2024': 4725, '2025': 4320 },
      },
    },
    {
      id: 'iiit-delhi-csd',
      name: 'Computer Science and Engineering (Design)',
      shortName: 'CSD',
      seats: 75,
      fees: 310000,
      cutoffs: {
        General: { '2023': 4560, '2024': 4200, '2025': 3840 },
        OBC_NCL: { '2023': 12770, '2024': 11760, '2025': 10750 },
        SC: { '2023': 27360, '2024': 25200, '2025': 23040 },
        ST: { '2023': 45600, '2024': 42000, '2025': 38400 },
        EWS: { '2023': 6840, '2024': 6300, '2025': 5760 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// IIIT Allahabad
// ─────────────────────────────────────────────────────────────
const iiitAllahabad: College = {
  id: 'iiit-allahabad',
  name: 'Indian Institute of Information Technology Allahabad',
  shortName: 'IIIT Allahabad',
  location: 'Jhalwa, Prayagraj',
  district: 'Prayagraj',
  type: 'Government',
  established: 1999,
  affiliation: 'Autonomous (MHRD)',
  naacGrade: 'A',
  nbaAccredited: true,
  ranking: 10,
  placementRating: 4.3,
  avgPackage: 13.2,
  highestPackage: 65,
  totalSeats: 400,
  website: 'https://www.iiita.ac.in',
  description:
    'IIIT Allahabad is one of the earliest IIITs established in India, known for its strong IT and CSE programs, competitive coding culture, and a solid placement track record with leading tech companies.',
  campus:
    'A 100-acre campus in Jhalwa with dedicated labs for AI, cybersecurity, and data science, a digital library, sports facilities, and comfortable hostels.',
  branches: [
    {
      id: 'iiit-allahabad-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 120,
      fees: 95000,
      cutoffs: {
        General: { '2023': 5800, '2024': 5500, '2025': 5200 },
        OBC_NCL: { '2023': 16240, '2024': 15400, '2025': 14560 },
        SC: { '2023': 34800, '2024': 33000, '2025': 31200 },
        ST: { '2023': 58000, '2024': 55000, '2025': 52000 },
        EWS: { '2023': 8700, '2024': 8250, '2025': 7800 },
      },
    },
    {
      id: 'iiit-allahabad-it',
      name: 'Information Technology',
      shortName: 'IT',
      seats: 120,
      fees: 95000,
      cutoffs: {
        General: { '2023': 7540, '2024': 7150, '2025': 6760 },
        OBC_NCL: { '2023': 21110, '2024': 20020, '2025': 18930 },
        SC: { '2023': 45240, '2024': 42900, '2025': 40560 },
        ST: { '2023': 75400, '2024': 71500, '2025': 67600 },
        EWS: { '2023': 11310, '2024': 10725, '2025': 10140 },
      },
    },
    {
      id: 'iiit-allahabad-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 100,
      fees: 95000,
      cutoffs: {
        General: { '2023': 9860, '2024': 9350, '2025': 8840 },
        OBC_NCL: { '2023': 27610, '2024': 26180, '2025': 24750 },
        SC: { '2023': 59160, '2024': 56100, '2025': 53040 },
        ST: { '2023': 98600, '2024': 93500, '2025': 88400 },
        EWS: { '2023': 14790, '2024': 14025, '2025': 13260 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// IIIT Gwalior (ABV-IIITM)
// ─────────────────────────────────────────────────────────────
const iiitGwalior: College = {
  id: 'iiit-gwalior',
  name: 'ABV-Indian Institute of Information Technology and Management Gwalior',
  shortName: 'IIIT Gwalior',
  location: 'Gwalior, Madhya Pradesh',
  district: 'Gwalior',
  type: 'Government',
  established: 1997,
  affiliation: 'Autonomous (MHRD)',
  naacGrade: 'A',
  nbaAccredited: true,
  ranking: 11,
  placementRating: 4.2,
  avgPackage: 12.5,
  highestPackage: 58,
  totalSeats: 350,
  website: 'https://www.iiitm.ac.in',
  description:
    'ABV-IIITM Gwalior is one of the pioneering IIITs with a unique blend of IT, management, and design education. It consistently produces graduates who excel in both tech and business domains.',
  campus:
    'A 60-acre campus featuring modern computing labs, a management studies block, innovation hub, well-maintained hostels, and sports infrastructure.',
  branches: [
    {
      id: 'iiit-gwalior-cse',
      name: 'Computer Science and Engineering',
      shortName: 'CSE',
      seats: 90,
      fees: 90000,
      cutoffs: {
        General: { '2023': 7500, '2024': 7100, '2025': 6700 },
        OBC_NCL: { '2023': 21000, '2024': 19880, '2025': 18760 },
        SC: { '2023': 45000, '2024': 42600, '2025': 40200 },
        ST: { '2023': 75000, '2024': 71000, '2025': 67000 },
        EWS: { '2023': 11250, '2024': 10650, '2025': 10050 },
      },
    },
    {
      id: 'iiit-gwalior-it',
      name: 'Information Technology',
      shortName: 'IT',
      seats: 90,
      fees: 90000,
      cutoffs: {
        General: { '2023': 9000, '2024': 8520, '2025': 8040 },
        OBC_NCL: { '2023': 25200, '2024': 23860, '2025': 22510 },
        SC: { '2023': 54000, '2024': 51120, '2025': 48240 },
        ST: { '2023': 90000, '2024': 85200, '2025': 80400 },
        EWS: { '2023': 13500, '2024': 12780, '2025': 12060 },
      },
    },
    {
      id: 'iiit-gwalior-ece',
      name: 'Electronics and Communication Engineering',
      shortName: 'ECE',
      seats: 90,
      fees: 90000,
      cutoffs: {
        General: { '2023': 12750, '2024': 12070, '2025': 11390 },
        OBC_NCL: { '2023': 35700, '2024': 33800, '2025': 31890 },
        SC: { '2023': 76500, '2024': 72420, '2025': 68340 },
        ST: { '2023': 127500, '2024': 120700, '2025': 113900 },
        EWS: { '2023': 19125, '2024': 18105, '2025': 17085 },
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────

export const jeeMainColleges: College[] = [
  nitTrichy,
  nitSurathkal,
  nitWarangal,
  nitCalicut,
  nitRourkela,
  mnnitAllahabad,
  iiitHyderabad,
  iiitBangalore,
  iiitDelhi,
  iiitAllahabad,
  iiitGwalior,
]

export function getJeeMainCollegeById(id: string): College | undefined {
  return jeeMainColleges.find((c) => c.id === id)
}

export function getAllJeeMainColleges(): College[] {
  return jeeMainColleges
}

export function getJeeMainCollegesByRank(maxRank?: number): College[] {
  const sorted = [...jeeMainColleges].sort((a, b) => a.ranking - b.ranking)
  if (maxRank) return sorted.filter((c) => c.ranking <= maxRank)
  return sorted
}
