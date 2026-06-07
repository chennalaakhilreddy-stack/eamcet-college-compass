import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'
import { useExam } from '../hooks/useExam'
import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, Menu, Bell, Search, User, GraduationCap, FlaskConical, Atom } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  onMenuClick: () => void
}

export default function DashboardTopbar({ onMenuClick }: Props) {
  const { isDark, toggleTheme } = useTheme()
  const { user } = useAuth()
  const { selectedExam, examConfig } = useExam()
  const navigate = useNavigate()

  const examAccent = selectedExam === 'jee_main'
    ? 'bg-amber-500/[0.06] text-amber-400/80 border-amber-500/[0.1]'
    : selectedExam === 'jee_advanced'
    ? 'bg-brand-500/[0.06] text-brand-400/80 border-brand-500/[0.1]'
    : 'bg-white/[0.04] text-dark-400 border-white/[0.08]'

  const ExamIcon = selectedExam === 'jee_main' ? FlaskConical : selectedExam === 'jee_advanced' ? Atom : GraduationCap

  return (
    <header className="h-16 border-b border-white/[0.06] bg-black/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-dark-500 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
          id="topbar-menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Exam badge */}
        <div
          className={clsx(
            'hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold',
            examAccent
          )}
          id="topbar-exam-badge"
        >
          <ExamIcon className="w-3.5 h-3.5" />
          <span>{examConfig.name}</span>
          <span className="text-[10px] opacity-50 font-normal">·</span>
          <span className="text-[10px] opacity-50 font-normal">{examConfig.currentYear}</span>
        </div>

        <button
          onClick={() => navigate('/dashboard/search')}
          className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm text-dark-600 hover:text-dark-400 hover:border-white/[0.10] transition-all duration-200 w-56"
          id="topbar-search"
        >
          <Search className="w-4 h-4" />
          <span>Search colleges...</span>
          <span className="ml-auto text-[10px] bg-white/[0.05] px-1.5 py-0.5 rounded font-mono text-dark-600">/</span>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-dark-500 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
          aria-label="Toggle theme"
          id="dashboard-theme-toggle"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center text-dark-500 hover:text-white hover:bg-white/[0.05] transition-all duration-200 relative"
          id="notifications-btn"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
        </button>

        <Link
          to="/dashboard/profile"
          className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-lg hover:bg-white/[0.05] transition-all duration-200"
          id="topbar-profile"
        >
          <div className="w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="hidden md:block text-sm font-medium text-dark-300">{user?.name?.split(' ')[0]}</span>
        </Link>
      </div>
    </header>
  )
}
