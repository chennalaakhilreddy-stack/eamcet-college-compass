import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useExam } from '../hooks/useExam'
import type { ExamId } from '../data/examTypes'
import { getAllExamConfigs } from '../data/examRegistry'
import clsx from 'clsx'
import {
  GraduationCap,
  LayoutDashboard,
  TrendingUp,
  Building2,
  Shuffle,
  BarChart3,
  Bookmark,
  Heart,
  User,
  Search,
  X,
  LogOut,
  ChevronRight,
  ChevronDown,
  FlaskConical,
  Atom,
  GitCompareArrows,
  BookOpen,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Rank Predictor', href: '/dashboard/rank-predictor', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'College Predictor', href: '/dashboard/college-predictor', icon: <Building2 className="w-4 h-4" /> },
  { label: 'Mock Allocator', href: '/dashboard/mock-allocator', icon: <Shuffle className="w-4 h-4" /> },
  { label: 'Cutoff Viewer', href: '/dashboard/cutoff-viewer', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Compare Colleges', href: '/dashboard/compare', icon: <GitCompareArrows className="w-4 h-4" /> },
  { label: 'Branch Explorer', href: '/dashboard/branches', icon: <BookOpen className="w-4 h-4" /> },
]

const savedItems: NavItem[] = [
  { label: 'Saved Predictions', href: '/dashboard/saved', icon: <Bookmark className="w-4 h-4" /> },
  { label: 'Favourite Colleges', href: '/dashboard/favourites', icon: <Heart className="w-4 h-4" /> },
]

// Exam icon helper
function ExamIcon({ examId, className }: { examId: ExamId; className?: string }) {
  switch (examId) {
    case 'ts_eamcet':
      return <GraduationCap className={className} />
    case 'jee_main':
      return <FlaskConical className={className} />
    case 'jee_advanced':
      return <Atom className={className} />
    default:
      return <GraduationCap className={className} />
  }
}

// Liquid Glass exam accent — very muted, monochrome
function getExamAccent(examId: ExamId) {
  switch (examId) {
    case 'ts_eamcet':
      return {
        bg: 'bg-white/[0.04]',
        border: 'border-white/[0.08]',
        text: 'text-white/80',
        hoverBg: 'hover:bg-white/[0.06]',
        dot: 'bg-white/60',
        ring: 'ring-white/10',
      }
    case 'jee_main':
      return {
        bg: 'bg-amber-500/[0.06]',
        border: 'border-amber-500/[0.12]',
        text: 'text-amber-400/80',
        hoverBg: 'hover:bg-amber-500/[0.08]',
        dot: 'bg-amber-400/70',
        ring: 'ring-amber-500/10',
      }
    case 'jee_advanced':
      return {
        bg: 'bg-brand-500/[0.06]',
        border: 'border-brand-500/[0.12]',
        text: 'text-brand-400/80',
        hoverBg: 'hover:bg-brand-500/[0.08]',
        dot: 'bg-brand-400/70',
        ring: 'ring-brand-500/10',
      }
    default:
      return {
        bg: 'bg-white/[0.04]',
        border: 'border-white/[0.08]',
        text: 'text-white/80',
        hoverBg: 'hover:bg-white/[0.06]',
        dot: 'bg-white/60',
        ring: 'ring-white/10',
      }
  }
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function DashboardSidebar({ open, onClose }: Props) {
  const location = useLocation()
  const { user, logout } = useAuth()
  const { selectedExam, setExam } = useExam()
  const navigate = useNavigate()
  const [examDropdownOpen, setExamDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const allExams = getAllExamConfigs()
  const currentExamConfig = allExams.find(e => e.id === selectedExam) ?? allExams[0]
  const accent = getExamAccent(selectedExam)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExamDropdownOpen(false)
      }
    }
    if (examDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [examDropdownOpen])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleExamSwitch = (examId: ExamId) => {
    setExam(examId)
    setExamDropdownOpen(false)
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed md:relative z-50 md:z-auto',
          'w-64 h-screen md:h-auto flex-shrink-0',
          'bg-dark-950 border-r border-white/[0.06]',
          'flex flex-col transition-transform duration-300',
          'md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/[0.06]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/15">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">Counsello</span>
          </Link>
          <button onClick={onClose} className="md:hidden btn-ghost p-1.5">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Exam Selector ── */}
        <div className="px-3 py-3 border-b border-white/[0.04]" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setExamDropdownOpen(prev => !prev)}
              className={clsx(
                'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all duration-200',
                'text-sm font-medium',
                accent.bg, accent.border, accent.text,
                examDropdownOpen && `ring-2 ${accent.ring}`
              )}
              id="exam-selector"
            >
              <div className={clsx('w-7 h-7 rounded-lg flex items-center justify-center', accent.bg)}>
                <ExamIcon examId={selectedExam} className="w-4 h-4" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[10px] text-dark-600 font-normal leading-none mb-0.5">Exam</div>
                <div className={clsx('font-semibold text-sm leading-none', accent.text)}>
                  {currentExamConfig.name}
                </div>
              </div>
              <ChevronDown className={clsx(
                'w-4 h-4 transition-transform duration-200 text-dark-600',
                examDropdownOpen && 'rotate-180'
              )} />
            </button>

            {/* Dropdown */}
            {examDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl bg-dark-900/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/60 overflow-hidden animate-in">
                <div className="p-1.5 space-y-0.5">
                  {allExams.map(exam => {
                    const a = getExamAccent(exam.id)
                    const isSelected = exam.id === selectedExam
                    return (
                      <button
                        key={exam.id}
                        onClick={() => handleExamSwitch(exam.id)}
                        className={clsx(
                          'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-150',
                          isSelected
                            ? `${a.bg} ${a.text} border ${a.border}`
                            : 'text-dark-500 hover:text-dark-300 hover:bg-white/[0.04] border border-transparent'
                        )}
                      >
                        <div className={clsx(
                          'w-7 h-7 rounded-lg flex items-center justify-center',
                          isSelected ? a.bg : 'bg-white/[0.04]'
                        )}>
                          <ExamIcon examId={exam.id} className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-semibold">{exam.name}</div>
                          <div className="text-[10px] text-dark-600 font-normal mt-0.5">{exam.description}</div>
                        </div>
                        {isSelected && (
                          <div className={clsx('w-2 h-2 rounded-full', a.dot)} />
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="px-3 py-2 border-t border-white/[0.04]">
                  <p className="text-[10px] text-dark-700">More exams coming soon: NEET, BITSAT</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search button */}
        <div className="px-3 py-3">
          <Link
            to="/dashboard/search"
            className="flex items-center gap-2.5 w-full px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm text-dark-600 hover:text-dark-400 hover:border-white/[0.10] transition-all duration-200 group"
            id="sidebar-search"
          >
            <Search className="w-4 h-4" />
            <span>Search colleges...</span>
            <span className="ml-auto text-[10px] bg-white/[0.05] px-1.5 py-0.5 rounded font-mono text-dark-700">/</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          <SidebarSection label="Tools">
            {navItems.map(item => (
              <SidebarLink key={item.href} item={item} active={isActive(item.href)} onClick={onClose} />
            ))}
          </SidebarSection>

          <div className="pt-3">
            <SidebarSection label="Saved">
              {savedItems.map(item => (
                <SidebarLink key={item.href} item={item} active={isActive(item.href)} onClick={onClose} />
              ))}
            </SidebarSection>
          </div>

          <div className="pt-3">
            <SidebarSection label="Account">
              <SidebarLink
                item={{ label: 'Profile', href: '/dashboard/profile', icon: <User className="w-4 h-4" /> }}
                active={isActive('/dashboard/profile')}
                onClick={onClose}
              />
            </SidebarSection>
          </div>
        </nav>

        {/* User */}
        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user?.name}</div>
              <div className="text-[11px] text-dark-600 truncate">{user?.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-dark-600 hover:text-dark-400 hover:bg-white/[0.05] transition-all duration-200"
              title="Sign out"
              id="sidebar-logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

function SidebarSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-2 py-1.5 text-[10px] font-semibold text-dark-700 uppercase tracking-widest">{label}</div>
      {children}
    </div>
  )
}

function SidebarLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group',
        active
          ? 'bg-white/[0.06] text-white'
          : 'text-dark-500 hover:text-dark-300 hover:bg-white/[0.03]'
      )}
    >
      <span className={clsx('flex-shrink-0', active ? 'text-white' : 'text-dark-600 group-hover:text-dark-400')}>
        {item.icon}
      </span>
      {item.label}
      {item.badge && (
        <span className="ml-auto badge bg-brand-500/10 text-brand-500">{item.badge}</span>
      )}
      {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-dark-600" />}
    </Link>
  )
}
