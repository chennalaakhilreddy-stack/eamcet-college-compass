import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useExam } from '@/hooks/useExam'
import { getAllExamConfigs } from '@/data/examRegistry'
import {
  TrendingUp, Building2, Shuffle, BarChart3,
  Bookmark, Heart, ArrowRight, Star,
  GraduationCap, Zap, Target, GitCompareArrows, BookOpen, FlaskConical, Atom
} from 'lucide-react'
import clsx from 'clsx'

const quickActions = [
  {
    label: 'Rank Predictor',
    description: 'Enter your marks or percentile, get expected rank',
    href: '/dashboard/rank-predictor',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: 'College Predictor',
    description: 'Find colleges based on rank & category',
    href: '/dashboard/college-predictor',
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    label: 'Mock Allocator',
    description: 'Simulate the seat allocation process',
    href: '/dashboard/mock-allocator',
    icon: <Shuffle className="w-5 h-5" />,
  },
  {
    label: 'Cutoff Viewer',
    description: 'View historical cutoffs with trend graphs',
    href: '/dashboard/cutoff-viewer',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    label: 'Compare Colleges',
    description: 'Side-by-side college comparison',
    href: '/dashboard/compare',
    icon: <GitCompareArrows className="w-5 h-5" />,
  },
  {
    label: 'Branch Explorer',
    description: 'Explore engineering branches & careers',
    href: '/dashboard/branches',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: 'Saved Predictions',
    description: 'View your saved rank & college predictions',
    href: '/dashboard/saved',
    icon: <Bookmark className="w-5 h-5" />,
  },
  {
    label: 'Favourite Colleges',
    description: 'Manage your shortlisted colleges',
    href: '/dashboard/favourites',
    icon: <Heart className="w-5 h-5" />,
  },
]

export default function DashboardHome() {
  const { user } = useAuth()
  const { examConfig, colleges, setExam, selectedExam } = useExam()
  const firstName = user?.name?.split(' ')[0] || 'Student'
  const topColleges = colleges.slice(0, 6)
  
  const allExams = getAllExamConfigs()

  const ExamIcon = examConfig.icon === 'flask' ? FlaskConical : examConfig.icon === 'atom' ? Atom : GraduationCap

  return (
    <div className="space-y-10 animate-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] mb-4">
          <ExamIcon className="w-3.5 h-3.5 text-dark-400" />
          <span className="text-[11px] font-medium text-dark-400 uppercase tracking-wider">
            {examConfig.name} {examConfig.currentYear}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="text-dark-500 mt-1.5 text-[15px] max-w-xl">
          Select your target exam below to load specialized predictors, cutoff trends, and college rankings for your specific goal.
        </p>
      </div>

      {/* Primary Exam Selector Cards */}
      <div>
        <h2 className="text-[11px] font-semibold text-dark-600 uppercase tracking-widest mb-4">Target Exam</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allExams.map(exam => {
            const isSelected = exam.id === selectedExam
            const Icon = exam.icon === 'flask' ? FlaskConical : exam.icon === 'atom' ? Atom : GraduationCap
            return (
              <button
                key={exam.id}
                onClick={() => setExam(exam.id)}
                className={clsx(
                  'group text-left relative p-6 rounded-3xl transition-all duration-300 ease-out border',
                  isSelected 
                    ? 'bg-brand-500/10 border-brand-500/30 shadow-[0_0_40px_rgba(220,38,38,0.1)] hover:-translate-y-1'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.10] hover:-translate-y-1'
                )}
              >
                <div className={clsx(
                  'w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors',
                  isSelected ? 'bg-brand-500/20' : 'bg-white/[0.05] group-hover:bg-white/[0.08]'
                )}>
                  <Icon className={clsx('w-6 h-6', isSelected ? 'text-brand-400' : 'text-white/60')} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{exam.name}</h3>
                <p className="text-sm text-dark-500 leading-relaxed mb-6">{exam.description}</p>
                
                <div className="flex items-center gap-2 text-sm font-medium">
                  {isSelected ? (
                    <span className="text-brand-400 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" /> Active Context
                    </span>
                  ) : (
                    <span className="text-dark-600 group-hover:text-dark-400 transition-colors">Switch to {exam.shortName}</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Top Colleges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[11px] font-semibold text-dark-600 uppercase tracking-widest">Top Colleges</h2>
          <Link to="/dashboard/college-predictor" className="text-[13px] text-dark-500 hover:text-white flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {topColleges.map(college => (
            <Link
              key={college.id}
              to={`/dashboard/colleges/${college.id}`}
              className="group p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[11px] text-brand-500 font-semibold mb-0.5">#{college.ranking}</div>
                  <h3 className="font-semibold text-dark-200 text-sm leading-snug group-hover:text-white transition-colors">
                    {college.shortName}
                  </h3>
                  <p className="text-[11px] text-dark-600 mt-0.5">{college.location}</p>
                </div>
                <span className="badge text-[10px] bg-white/[0.05] text-dark-400 border border-white/[0.06]">
                  {college.type}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-500/80">
                  <Star className="w-3 h-3 fill-amber-500/80" />
                  <span className="font-medium">{college.placementRating}</span>
                  <span className="text-dark-600">placement</span>
                </div>
                <div className="text-dark-500">
                  Avg: <span className="text-dark-300 font-medium">₹{college.avgPackage} LPA</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Pro Tip: Start with Rank Predictor</h3>
              <p className="text-sm text-dark-500 leading-relaxed">
                Enter your {examConfig.inputLabel.toLowerCase()} to get an estimated rank, then use that rank in College Predictor to find the best matching colleges.
              </p>
              <Link to="/dashboard/rank-predictor" className="inline-flex items-center gap-1.5 mt-2.5 text-sm text-brand-500 hover:text-brand-400 font-medium transition-colors">
                Predict my rank <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Mock Counselling Available</h3>
              <p className="text-sm text-dark-500 leading-relaxed">
                Run a mock seat allocation to see which college and branch you'd likely be allotted based on your rank and category.
              </p>
              <Link to="/dashboard/mock-allocator" className="inline-flex items-center gap-1.5 mt-2.5 text-sm text-brand-500 hover:text-brand-400 font-medium transition-colors">
                Run mock allotment <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
