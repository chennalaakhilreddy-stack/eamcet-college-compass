import type { College } from '@/data/colleges'

export const jeeAdvancedColleges: College[] = [
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    location: 'Powai, Mumbai, Maharashtra',
    district: 'Mumbai',
    type: 'Government',
    established: 1958,
    affiliation: 'Autonomous (MHRD)',
    naacGrade: 'A++',
    nbaAccredited: true,
    ranking: 1,
    placementRating: 5.0,
    avgPackage: 28.0,
    highestPackage: 230,
    totalSeats: 1050,
    website: 'https://www.iitb.ac.in',
    description: 'India\'s premier engineering institution, consistently ranked #1 among IITs',
    campus: '550-acre campus in Powai, Mumbai with world-class research facilities',
    branches: [
      { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE', seats: 80, fees: 200000,
        cutoffs: {
          General: { '2023': 72, '2024': 68, '2025': 64 },
          OBC_NCL: { '2023': 180, '2024': 170, '2025': 160 },
          SC: { '2023': 360, '2024': 340, '2025': 320 },
          ST: { '2023': 600, '2024': 560, '2025': 520 },
          EWS: { '2023': 100, '2024': 94, '2025': 88 },
        }
      },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 100, fees: 200000,
        cutoffs: {
          General: { '2023': 160, '2024': 150, '2025': 140 },
          OBC_NCL: { '2023': 400, '2024': 375, '2025': 350 },
          SC: { '2023': 800, '2024': 750, '2025': 700 },
          ST: { '2023': 1300, '2024': 1220, '2025': 1140 },
          EWS: { '2023': 220, '2024': 206, '2025': 192 },
        }
      },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'ME', seats: 100, fees: 200000,
        cutoffs: {
          General: { '2023': 380, '2024': 355, '2025': 330 },
          OBC_NCL: { '2023': 950, '2024': 890, '2025': 830 },
          SC: { '2023': 1900, '2024': 1780, '2025': 1660 },
          ST: { '2023': 3200, '2024': 3000, '2025': 2800 },
          EWS: { '2023': 520, '2024': 487, '2025': 455 },
        }
      },
      { id: 'chem', name: 'Chemical Engineering', shortName: 'ChemE', seats: 80, fees: 200000,
        cutoffs: {
          General: { '2023': 580, '2024': 545, '2025': 510 },
          OBC_NCL: { '2023': 1450, '2024': 1360, '2025': 1270 },
          SC: { '2023': 2900, '2024': 2720, '2025': 2540 },
          ST: { '2023': 4800, '2024': 4500, '2025': 4200 },
          EWS: { '2023': 800, '2024': 750, '2025': 700 },
        }
      },
      { id: 'aerospace', name: 'Aerospace Engineering', shortName: 'Aero', seats: 50, fees: 200000,
        cutoffs: {
          General: { '2023': 250, '2024': 235, '2025': 220 },
          OBC_NCL: { '2023': 625, '2024': 586, '2025': 548 },
          SC: { '2023': 1250, '2024': 1172, '2025': 1095 },
          ST: { '2023': 2100, '2024': 1968, '2025': 1840 },
          EWS: { '2023': 345, '2024': 323, '2025': 302 },
        }
      },
    ]
  },
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology Delhi',
    shortName: 'IIT Delhi',
    location: 'Hauz Khas, New Delhi',
    district: 'New Delhi',
    type: 'Government',
    established: 1961,
    affiliation: 'Autonomous (MHRD)',
    naacGrade: 'A++',
    nbaAccredited: true,
    ranking: 2,
    placementRating: 4.9,
    avgPackage: 26.0,
    highestPackage: 210,
    totalSeats: 1000,
    website: 'https://home.iitd.ac.in',
    description: 'Premier IIT located in the heart of Delhi, known for cutting-edge research',
    campus: '325-acre campus in South Delhi with modern infrastructure',
    branches: [
      { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE', seats: 75, fees: 200000,
        cutoffs: {
          General: { '2023': 108, '2024': 102, '2025': 96 },
          OBC_NCL: { '2023': 270, '2024': 255, '2025': 240 },
          SC: { '2023': 540, '2024': 510, '2025': 480 },
          ST: { '2023': 900, '2024': 850, '2025': 800 },
          EWS: { '2023': 150, '2024': 141, '2025': 132 },
        }
      },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 90, fees: 200000,
        cutoffs: {
          General: { '2023': 230, '2024': 216, '2025': 202 },
          OBC_NCL: { '2023': 575, '2024': 540, '2025': 505 },
          SC: { '2023': 1150, '2024': 1080, '2025': 1010 },
          ST: { '2023': 1900, '2024': 1785, '2025': 1670 },
          EWS: { '2023': 318, '2024': 298, '2025': 279 },
        }
      },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'ME', seats: 90, fees: 200000,
        cutoffs: {
          General: { '2023': 520, '2024': 488, '2025': 456 },
          OBC_NCL: { '2023': 1300, '2024': 1220, '2025': 1140 },
          SC: { '2023': 2600, '2024': 2440, '2025': 2280 },
          ST: { '2023': 4300, '2024': 4035, '2025': 3770 },
          EWS: { '2023': 715, '2024': 671, '2025': 627 },
        }
      },
      { id: 'chem', name: 'Chemical Engineering', shortName: 'ChemE', seats: 60, fees: 200000,
        cutoffs: {
          General: { '2023': 800, '2024': 750, '2025': 700 },
          OBC_NCL: { '2023': 2000, '2024': 1875, '2025': 1750 },
          SC: { '2023': 4000, '2024': 3750, '2025': 3500 },
          ST: { '2023': 6600, '2024': 6190, '2025': 5780 },
          EWS: { '2023': 1100, '2024': 1032, '2025': 964 },
        }
      },
      { id: 'textile', name: 'Textile Technology', shortName: 'Textile', seats: 40, fees: 200000,
        cutoffs: {
          General: { '2023': 1800, '2024': 1690, '2025': 1580 },
          OBC_NCL: { '2023': 4500, '2024': 4225, '2025': 3950 },
          SC: { '2023': 9000, '2024': 8445, '2025': 7890 },
          ST: { '2023': 14800, '2024': 13890, '2025': 12980 },
          EWS: { '2023': 2480, '2024': 2328, '2025': 2176 },
        }
      },
    ]
  },
  {
    id: 'iit-madras',
    name: 'Indian Institute of Technology Madras',
    shortName: 'IIT Madras',
    location: 'Chennai, Tamil Nadu',
    district: 'Chennai',
    type: 'Government',
    established: 1959,
    affiliation: 'Autonomous (MHRD)',
    naacGrade: 'A++',
    nbaAccredited: true,
    ranking: 3,
    placementRating: 4.9,
    avgPackage: 24.0,
    highestPackage: 200,
    totalSeats: 1050,
    website: 'https://www.iitm.ac.in',
    description: 'Top-ranked IIT known for research excellence, NIRF #1 multiple times',
    campus: '617-acre campus inside Guindy National Park, Chennai',
    branches: [
      { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE', seats: 75, fees: 200000,
        cutoffs: {
          General: { '2023': 150, '2024': 142, '2025': 134 },
          OBC_NCL: { '2023': 375, '2024': 355, '2025': 335 },
          SC: { '2023': 750, '2024': 710, '2025': 670 },
          ST: { '2023': 1250, '2024': 1183, '2025': 1116 },
          EWS: { '2023': 207, '2024': 196, '2025': 185 },
        }
      },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 90, fees: 200000,
        cutoffs: {
          General: { '2023': 310, '2024': 292, '2025': 274 },
          OBC_NCL: { '2023': 775, '2024': 730, '2025': 685 },
          SC: { '2023': 1550, '2024': 1460, '2025': 1370 },
          ST: { '2023': 2560, '2024': 2410, '2025': 2260 },
          EWS: { '2023': 428, '2024': 403, '2025': 378 },
        }
      },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'ME', seats: 100, fees: 200000,
        cutoffs: {
          General: { '2023': 680, '2024': 638, '2025': 596 },
          OBC_NCL: { '2023': 1700, '2024': 1595, '2025': 1490 },
          SC: { '2023': 3400, '2024': 3190, '2025': 2980 },
          ST: { '2023': 5600, '2024': 5255, '2025': 4910 },
          EWS: { '2023': 935, '2024': 878, '2025': 821 },
        }
      },
      { id: 'chem', name: 'Chemical Engineering', shortName: 'ChemE', seats: 60, fees: 200000,
        cutoffs: {
          General: { '2023': 1100, '2024': 1032, '2025': 964 },
          OBC_NCL: { '2023': 2750, '2024': 2580, '2025': 2410 },
          SC: { '2023': 5500, '2024': 5160, '2025': 4820 },
          ST: { '2023': 9000, '2024': 8445, '2025': 7890 },
          EWS: { '2023': 1518, '2024': 1424, '2025': 1330 },
        }
      },
      { id: 'civil', name: 'Civil Engineering', shortName: 'CE', seats: 60, fees: 200000,
        cutoffs: {
          General: { '2023': 1400, '2024': 1314, '2025': 1228 },
          OBC_NCL: { '2023': 3500, '2024': 3285, '2025': 3070 },
          SC: { '2023': 7000, '2024': 6570, '2025': 6140 },
          ST: { '2023': 11500, '2024': 10790, '2025': 10080 },
          EWS: { '2023': 1932, '2024': 1813, '2025': 1694 },
        }
      },
    ]
  },
  {
    id: 'iit-kanpur',
    name: 'Indian Institute of Technology Kanpur',
    shortName: 'IIT Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    district: 'Kanpur',
    type: 'Government',
    established: 1959,
    affiliation: 'Autonomous (MHRD)',
    naacGrade: 'A++',
    nbaAccredited: true,
    ranking: 4,
    placementRating: 4.8,
    avgPackage: 22.0,
    highestPackage: 180,
    totalSeats: 950,
    website: 'https://www.iitk.ac.in',
    description: 'Known for entrepreneurship and research, one of the original five IITs',
    campus: '1055-acre campus, one of the largest IIT campuses in India',
    branches: [
      { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE', seats: 80, fees: 200000,
        cutoffs: {
          General: { '2023': 300, '2024': 280, '2025': 262 },
          OBC_NCL: { '2023': 750, '2024': 700, '2025': 655 },
          SC: { '2023': 1500, '2024': 1400, '2025': 1310 },
          ST: { '2023': 2500, '2024': 2335, '2025': 2185 },
          EWS: { '2023': 414, '2024': 386, '2025': 361 },
        }
      },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 90, fees: 200000,
        cutoffs: {
          General: { '2023': 600, '2024': 560, '2025': 524 },
          OBC_NCL: { '2023': 1500, '2024': 1400, '2025': 1310 },
          SC: { '2023': 3000, '2024': 2800, '2025': 2620 },
          ST: { '2023': 5000, '2024': 4670, '2025': 4370 },
          EWS: { '2023': 828, '2024': 772, '2025': 722 },
        }
      },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'ME', seats: 100, fees: 200000,
        cutoffs: {
          General: { '2023': 1200, '2024': 1120, '2025': 1048 },
          OBC_NCL: { '2023': 3000, '2024': 2800, '2025': 2620 },
          SC: { '2023': 6000, '2024': 5600, '2025': 5240 },
          ST: { '2023': 9900, '2024': 9245, '2025': 8650 },
          EWS: { '2023': 1656, '2024': 1546, '2025': 1446 },
        }
      },
      { id: 'chem', name: 'Chemical Engineering', shortName: 'ChemE', seats: 60, fees: 200000,
        cutoffs: {
          General: { '2023': 2100, '2024': 1960, '2025': 1834 },
          OBC_NCL: { '2023': 5250, '2024': 4900, '2025': 4585 },
          SC: { '2023': 10500, '2024': 9800, '2025': 9170 },
          ST: { '2023': 17300, '2024': 16160, '2025': 15120 },
          EWS: { '2023': 2898, '2024': 2705, '2025': 2530 },
        }
      },
      { id: 'aerospace', name: 'Aerospace Engineering', shortName: 'Aero', seats: 40, fees: 200000,
        cutoffs: {
          General: { '2023': 850, '2024': 794, '2025': 743 },
          OBC_NCL: { '2023': 2125, '2024': 1985, '2025': 1858 },
          SC: { '2023': 4250, '2024': 3970, '2025': 3715 },
          ST: { '2023': 7000, '2024': 6540, '2025': 6120 },
          EWS: { '2023': 1173, '2024': 1096, '2025': 1025 },
        }
      },
    ]
  },
  {
    id: 'iit-kharagpur',
    name: 'Indian Institute of Technology Kharagpur',
    shortName: 'IIT Kharagpur',
    location: 'Kharagpur, West Bengal',
    district: 'Paschim Medinipur',
    type: 'Government',
    established: 1951,
    affiliation: 'Autonomous (MHRD)',
    naacGrade: 'A++',
    nbaAccredited: true,
    ranking: 5,
    placementRating: 4.7,
    avgPackage: 20.0,
    highestPackage: 170,
    totalSeats: 1500,
    website: 'https://www.iitkgp.ac.in',
    description: 'India\'s first IIT, the largest and most diverse IIT with 20+ departments',
    campus: '2100-acre campus, the largest IIT campus in India',
    branches: [
      { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE', seats: 70, fees: 190000,
        cutoffs: {
          General: { '2023': 450, '2024': 420, '2025': 392 },
          OBC_NCL: { '2023': 1125, '2024': 1050, '2025': 980 },
          SC: { '2023': 2250, '2024': 2100, '2025': 1960 },
          ST: { '2023': 3750, '2024': 3500, '2025': 3270 },
          EWS: { '2023': 621, '2024': 580, '2025': 541 },
        }
      },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 80, fees: 190000,
        cutoffs: {
          General: { '2023': 900, '2024': 840, '2025': 785 },
          OBC_NCL: { '2023': 2250, '2024': 2100, '2025': 1963 },
          SC: { '2023': 4500, '2024': 4200, '2025': 3925 },
          ST: { '2023': 7500, '2024': 7000, '2025': 6540 },
          EWS: { '2023': 1242, '2024': 1160, '2025': 1083 },
        }
      },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'ME', seats: 100, fees: 190000,
        cutoffs: {
          General: { '2023': 1800, '2024': 1680, '2025': 1570 },
          OBC_NCL: { '2023': 4500, '2024': 4200, '2025': 3925 },
          SC: { '2023': 9000, '2024': 8400, '2025': 7850 },
          ST: { '2023': 14800, '2024': 13820, '2025': 12915 },
          EWS: { '2023': 2484, '2024': 2318, '2025': 2166 },
        }
      },
      { id: 'civil', name: 'Civil Engineering', shortName: 'CE', seats: 60, fees: 190000,
        cutoffs: {
          General: { '2023': 3800, '2024': 3550, '2025': 3318 },
          OBC_NCL: { '2023': 9500, '2024': 8875, '2025': 8295 },
          SC: { '2023': 19000, '2024': 17750, '2025': 16590 },
          ST: { '2023': 31000, '2024': 28960, '2025': 27070 },
          EWS: { '2023': 5244, '2024': 4899, '2025': 4579 },
        }
      },
      { id: 'arch', name: 'Architecture', shortName: 'Arch', seats: 30, fees: 190000,
        cutoffs: {
          General: { '2023': 5500, '2024': 5140, '2025': 4804 },
          OBC_NCL: { '2023': 13750, '2024': 12850, '2025': 12010 },
          SC: { '2023': 27500, '2024': 25700, '2025': 24020 },
          ST: { '2023': 45000, '2024': 42050, '2025': 39300 },
          EWS: { '2023': 7590, '2024': 7093, '2025': 6629 },
        }
      },
    ]
  },
  {
    id: 'iit-roorkee',
    name: 'Indian Institute of Technology Roorkee',
    shortName: 'IIT Roorkee',
    location: 'Roorkee, Uttarakhand',
    district: 'Haridwar',
    type: 'Government',
    established: 1847,
    affiliation: 'Autonomous (MHRD)',
    naacGrade: 'A++',
    nbaAccredited: true,
    ranking: 6,
    placementRating: 4.6,
    avgPackage: 18.5,
    highestPackage: 150,
    totalSeats: 1200,
    website: 'https://www.iitr.ac.in',
    description: 'Asia\'s oldest technical institution, IIT since 2001, rich heritage',
    campus: '365-acre campus at the foothills of the Himalayas',
    branches: [
      { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE', seats: 80, fees: 200000,
        cutoffs: {
          General: { '2023': 700, '2024': 660, '2025': 618 },
          OBC_NCL: { '2023': 1750, '2024': 1650, '2025': 1545 },
          SC: { '2023': 3500, '2024': 3300, '2025': 3090 },
          ST: { '2023': 5800, '2024': 5470, '2025': 5122 },
          EWS: { '2023': 966, '2024': 910, '2025': 853 },
        }
      },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 80, fees: 200000,
        cutoffs: {
          General: { '2023': 1100, '2024': 1036, '2025': 970 },
          OBC_NCL: { '2023': 2750, '2024': 2590, '2025': 2425 },
          SC: { '2023': 5500, '2024': 5180, '2025': 4850 },
          ST: { '2023': 9100, '2024': 8570, '2025': 8025 },
          EWS: { '2023': 1518, '2024': 1430, '2025': 1339 },
        }
      },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 90, fees: 200000,
        cutoffs: {
          General: { '2023': 1350, '2024': 1272, '2025': 1190 },
          OBC_NCL: { '2023': 3375, '2024': 3180, '2025': 2975 },
          SC: { '2023': 6750, '2024': 6360, '2025': 5950 },
          ST: { '2023': 11100, '2024': 10460, '2025': 9790 },
          EWS: { '2023': 1863, '2024': 1755, '2025': 1642 },
        }
      },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'ME', seats: 100, fees: 200000,
        cutoffs: {
          General: { '2023': 2800, '2024': 2638, '2025': 2468 },
          OBC_NCL: { '2023': 7000, '2024': 6595, '2025': 6170 },
          SC: { '2023': 14000, '2024': 13190, '2025': 12340 },
          ST: { '2023': 23000, '2024': 21670, '2025': 20275 },
          EWS: { '2023': 3864, '2024': 3640, '2025': 3406 },
        }
      },
      { id: 'civil', name: 'Civil Engineering', shortName: 'CE', seats: 80, fees: 200000,
        cutoffs: {
          General: { '2023': 4200, '2024': 3955, '2025': 3700 },
          OBC_NCL: { '2023': 10500, '2024': 9888, '2025': 9250 },
          SC: { '2023': 21000, '2024': 19775, '2025': 18500 },
          ST: { '2023': 34500, '2024': 32490, '2025': 30390 },
          EWS: { '2023': 5796, '2024': 5458, '2025': 5106 },
        }
      },
    ]
  },
  {
    id: 'iit-hyderabad',
    name: 'Indian Institute of Technology Hyderabad',
    shortName: 'IIT Hyderabad',
    location: 'Kandi, Sangareddy, Telangana',
    district: 'Sangareddy',
    type: 'Government',
    established: 2008,
    affiliation: 'Autonomous (MHRD)',
    naacGrade: 'A+',
    nbaAccredited: true,
    ranking: 7,
    placementRating: 4.5,
    avgPackage: 17.0,
    highestPackage: 130,
    totalSeats: 600,
    website: 'https://www.iith.ac.in',
    description: 'One of the new-generation IITs, rapidly growing with strong industry ties',
    campus: '576-acre campus near Hyderabad with modern facilities',
    branches: [
      { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE', seats: 60, fees: 200000,
        cutoffs: {
          General: { '2023': 1200, '2024': 1130, '2025': 1060 },
          OBC_NCL: { '2023': 3000, '2024': 2825, '2025': 2650 },
          SC: { '2023': 6000, '2024': 5650, '2025': 5300 },
          ST: { '2023': 9900, '2024': 9325, '2025': 8750 },
          EWS: { '2023': 1656, '2024': 1559, '2025': 1463 },
        }
      },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 70, fees: 200000,
        cutoffs: {
          General: { '2023': 2200, '2024': 2072, '2025': 1942 },
          OBC_NCL: { '2023': 5500, '2024': 5180, '2025': 4855 },
          SC: { '2023': 11000, '2024': 10360, '2025': 9710 },
          ST: { '2023': 18100, '2024': 17050, '2025': 15985 },
          EWS: { '2023': 3036, '2024': 2859, '2025': 2680 },
        }
      },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'ME', seats: 70, fees: 200000,
        cutoffs: {
          General: { '2023': 4500, '2024': 4238, '2025': 3970 },
          OBC_NCL: { '2023': 11250, '2024': 10595, '2025': 9925 },
          SC: { '2023': 22500, '2024': 21190, '2025': 19850 },
          ST: { '2023': 37000, '2024': 34850, '2025': 32645 },
          EWS: { '2023': 6210, '2024': 5849, '2025': 5479 },
        }
      },
      { id: 'chem', name: 'Chemical Engineering', shortName: 'ChemE', seats: 40, fees: 200000,
        cutoffs: {
          General: { '2023': 6800, '2024': 6405, '2025': 5996 },
          OBC_NCL: { '2023': 17000, '2024': 16013, '2025': 14990 },
          SC: { '2023': 34000, '2024': 32025, '2025': 29980 },
          ST: { '2023': 55000, '2024': 51800, '2025': 48500 },
          EWS: { '2023': 9384, '2024': 8839, '2025': 8275 },
        }
      },
      { id: 'civil', name: 'Civil Engineering', shortName: 'CE', seats: 40, fees: 200000,
        cutoffs: {
          General: { '2023': 7500, '2024': 7065, '2025': 6613 },
          OBC_NCL: { '2023': 18750, '2024': 17663, '2025': 16533 },
          SC: { '2023': 37500, '2024': 35325, '2025': 33065 },
          ST: { '2023': 61000, '2024': 57460, '2025': 53790 },
          EWS: { '2023': 10350, '2024': 9750, '2025': 9126 },
        }
      },
    ]
  },
  {
    id: 'iit-bhu',
    name: 'Indian Institute of Technology (BHU) Varanasi',
    shortName: 'IIT BHU',
    location: 'Varanasi, Uttar Pradesh',
    district: 'Varanasi',
    type: 'Government',
    established: 1919,
    affiliation: 'Autonomous (MHRD)',
    naacGrade: 'A+',
    nbaAccredited: true,
    ranking: 8,
    placementRating: 4.4,
    avgPackage: 16.0,
    highestPackage: 120,
    totalSeats: 1000,
    website: 'https://www.iitbhu.ac.in',
    description: 'Historic institution within BHU campus, strong in metallurgy and ceramics',
    campus: '1300-acre BHU campus, one of the largest residential universities in Asia',
    branches: [
      { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE', seats: 75, fees: 200000,
        cutoffs: {
          General: { '2023': 1500, '2024': 1420, '2025': 1340 },
          OBC_NCL: { '2023': 3750, '2024': 3550, '2025': 3350 },
          SC: { '2023': 7500, '2024': 7100, '2025': 6700 },
          ST: { '2023': 12400, '2024': 11740, '2025': 11080 },
          EWS: { '2023': 2070, '2024': 1960, '2025': 1849 },
        }
      },
      { id: 'ece', name: 'Electronics & Communication', shortName: 'ECE', seats: 75, fees: 200000,
        cutoffs: {
          General: { '2023': 2400, '2024': 2272, '2025': 2144 },
          OBC_NCL: { '2023': 6000, '2024': 5680, '2025': 5360 },
          SC: { '2023': 12000, '2024': 11360, '2025': 10720 },
          ST: { '2023': 19800, '2024': 18744, '2025': 17688 },
          EWS: { '2023': 3312, '2024': 3136, '2025': 2959 },
        }
      },
      { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', seats: 80, fees: 200000,
        cutoffs: {
          General: { '2023': 2800, '2024': 2650, '2025': 2500 },
          OBC_NCL: { '2023': 7000, '2024': 6625, '2025': 6250 },
          SC: { '2023': 14000, '2024': 13250, '2025': 12500 },
          ST: { '2023': 23100, '2024': 21860, '2025': 20625 },
          EWS: { '2023': 3864, '2024': 3657, '2025': 3450 },
        }
      },
      { id: 'mech', name: 'Mechanical Engineering', shortName: 'ME', seats: 100, fees: 200000,
        cutoffs: {
          General: { '2023': 5500, '2024': 5210, '2025': 4920 },
          OBC_NCL: { '2023': 13750, '2024': 13025, '2025': 12300 },
          SC: { '2023': 27500, '2024': 26050, '2025': 24600 },
          ST: { '2023': 45000, '2024': 42630, '2025': 40260 },
          EWS: { '2023': 7590, '2024': 7190, '2025': 6790 },
        }
      },
      { id: 'metallurgy', name: 'Metallurgical Engineering', shortName: 'Metal', seats: 40, fees: 200000,
        cutoffs: {
          General: { '2023': 9000, '2024': 8525, '2025': 8050 },
          OBC_NCL: { '2023': 22500, '2024': 21313, '2025': 20125 },
          SC: { '2023': 45000, '2024': 42625, '2025': 40250 },
          ST: { '2023': 74000, '2024': 70100, '2025': 66200 },
          EWS: { '2023': 12420, '2024': 11764, '2025': 11109 },
        }
      },
      { id: 'chem', name: 'Chemical Engineering', shortName: 'ChemE', seats: 50, fees: 200000,
        cutoffs: {
          General: { '2023': 7200, '2024': 6820, '2025': 6440 },
          OBC_NCL: { '2023': 18000, '2024': 17050, '2025': 16100 },
          SC: { '2023': 36000, '2024': 34100, '2025': 32200 },
          ST: { '2023': 59000, '2024': 55900, '2025': 52800 },
          EWS: { '2023': 9936, '2024': 9412, '2025': 8887 },
        }
      },
    ]
  },
]

export function getJeeAdvancedCollegeById(id: string): College | undefined {
  return jeeAdvancedColleges.find(c => c.id === id)
}

export function getAllJeeAdvancedColleges(): College[] {
  return jeeAdvancedColleges
}

export function getJeeAdvancedCollegesByRank(maxRank?: number): College[] {
  const sorted = [...jeeAdvancedColleges].sort((a, b) => a.ranking - b.ranking)
  if (maxRank) return sorted.filter(c => c.ranking <= maxRank)
  return sorted
}
