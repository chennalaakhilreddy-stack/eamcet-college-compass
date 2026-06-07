import { useState, useRef, useEffect, useMemo } from 'react'
import clsx from 'clsx'
import {
  Code2, Brain, Database, Monitor, Cpu, Zap, Settings, HardHat,
  Search, ChevronDown, ChevronUp, Briefcase, DollarSign, Building2,
  GraduationCap, TrendingUp, Sparkles, X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Branch {
  id: string
  name: string
  shortName: string
  icon: LucideIcon
  accentColor: string
  overview: string
  careers: string[]
  salary: { entry: string; mid: string; senior: string }
  companies: string[]
  colleges: string[]
  growth: 'Very High' | 'High' | 'Medium' | 'Low'
  demand: number
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const branches: Branch[] = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    shortName: 'CSE',
    icon: Code2,
    accentColor: 'indigo',
    overview:
      'CSE is the most sought-after branch, covering software development, algorithms, data structures, and system design. It offers unmatched versatility with opportunities spanning web, mobile, cloud, cybersecurity, and emerging technologies like blockchain and quantum computing.',
    careers: ['Software Engineer', 'Data Scientist', 'Cloud Architect', 'Full-Stack Developer'],
    salary: { entry: '6-12 LPA', mid: '15-30 LPA', senior: '35-80+ LPA' },
    companies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
    colleges: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'NIT Trichy'],
    growth: 'Very High',
    demand: 95,
  },
  {
    id: 'aiml',
    name: 'Artificial Intelligence & Machine Learning',
    shortName: 'AI & ML',
    icon: Brain,
    accentColor: 'purple',
    overview:
      'AI & ML is revolutionising every industry from healthcare to finance. This branch focuses on neural networks, deep learning, natural language processing, and computer vision. Graduates are at the forefront of building intelligent systems that shape the future.',
    careers: ['ML Engineer', 'AI Research Scientist', 'NLP Engineer', 'Computer Vision Specialist'],
    salary: { entry: '8-14 LPA', mid: '18-35 LPA', senior: '40-90+ LPA' },
    companies: ['DeepMind', 'OpenAI', 'Google AI', 'NVIDIA', 'Microsoft Research'],
    colleges: ['IIT Hyderabad', 'IIT Bombay', 'IIIT Hyderabad', 'IISc Bangalore'],
    growth: 'Very High',
    demand: 92,
  },
  {
    id: 'ds',
    name: 'Data Science',
    shortName: 'Data Science',
    icon: Database,
    accentColor: 'cyan',
    overview:
      'Data Science combines statistics, programming, and domain expertise to extract insights from massive datasets. With businesses increasingly becoming data-driven, this branch offers exceptional career potential across virtually every sector.',
    careers: ['Data Analyst', 'Business Intelligence Engineer', 'Data Engineer', 'Quantitative Analyst'],
    salary: { entry: '6-11 LPA', mid: '14-28 LPA', senior: '30-60+ LPA' },
    companies: ['Amazon', 'Flipkart', 'Netflix', 'Uber', 'Goldman Sachs'],
    colleges: ['IIT Madras', 'ISI Kolkata', 'IIT Kanpur', 'CMI Chennai'],
    growth: 'Very High',
    demand: 88,
  },
  {
    id: 'it',
    name: 'Information Technology',
    shortName: 'IT',
    icon: Monitor,
    accentColor: 'blue',
    overview:
      'IT focuses on the management and processing of information using computer systems, networks, and databases. It bridges the gap between business needs and technology solutions, making graduates versatile across consulting and enterprise tech.',
    careers: ['Systems Analyst', 'IT Consultant', 'DevOps Engineer', 'Solutions Architect'],
    salary: { entry: '5-10 LPA', mid: '12-25 LPA', senior: '28-55+ LPA' },
    companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant'],
    colleges: ['NIT Warangal', 'NIT Surathkal', 'BITS Pilani', 'DTU Delhi'],
    growth: 'High',
    demand: 82,
  },
  {
    id: 'ece',
    name: 'Electronics & Communication',
    shortName: 'ECE',
    icon: Cpu,
    accentColor: 'amber',
    overview:
      'ECE deals with electronic devices, circuits, communication systems, and signal processing. With the rise of IoT, 5G, and embedded systems, ECE graduates are in high demand for both hardware design and the growing semiconductor industry.',
    careers: ['Embedded Systems Engineer', 'VLSI Designer', 'RF Engineer', 'IoT Developer'],
    salary: { entry: '4-8 LPA', mid: '10-22 LPA', senior: '25-50+ LPA' },
    companies: ['Qualcomm', 'Intel', 'Samsung', 'Texas Instruments', 'Broadcom'],
    colleges: ['IIT Bombay', 'IIT Delhi', 'NIT Trichy', 'BITS Pilani'],
    growth: 'High',
    demand: 78,
  },
  {
    id: 'eee',
    name: 'Electrical & Electronics',
    shortName: 'EEE',
    icon: Zap,
    accentColor: 'yellow',
    overview:
      'EEE covers power systems, electrical machines, renewable energy, and control systems. With India\'s massive push toward green energy and smart grids, this branch is experiencing a significant resurgence in demand and innovation.',
    careers: ['Power Systems Engineer', 'Renewable Energy Engineer', 'Control Systems Engineer', 'Electrical Design Engineer'],
    salary: { entry: '4-7 LPA', mid: '8-18 LPA', senior: '20-40+ LPA' },
    companies: ['Siemens', 'ABB', 'Schneider Electric', 'Adani Green', 'BHEL'],
    colleges: ['IIT Kharagpur', 'IIT Roorkee', 'NIT Warangal', 'BITS Pilani'],
    growth: 'Medium',
    demand: 65,
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    shortName: 'Mechanical',
    icon: Settings,
    accentColor: 'emerald',
    overview:
      'Mechanical Engineering is one of the broadest disciplines, covering thermodynamics, robotics, manufacturing, and materials science. The rise of electric vehicles, automation, and advanced manufacturing is creating exciting new frontiers for mechanical engineers.',
    careers: ['Design Engineer', 'Robotics Engineer', 'Automotive Engineer', 'Manufacturing Manager'],
    salary: { entry: '4-7 LPA', mid: '8-18 LPA', senior: '20-45+ LPA' },
    companies: ['Tata Motors', 'L&T', 'Mahindra', 'Tesla', 'Boeing'],
    colleges: ['IIT Bombay', 'IIT Kanpur', 'IIT Madras', 'NIT Trichy'],
    growth: 'Medium',
    demand: 60,
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    shortName: 'Civil',
    icon: HardHat,
    accentColor: 'rose',
    overview:
      'Civil Engineering is the backbone of infrastructure development — roads, bridges, dams, and smart cities. With India investing heavily in infrastructure through initiatives like Smart Cities Mission and Bharatmala, civil engineers are central to nation-building.',
    careers: ['Structural Engineer', 'Urban Planner', 'Construction Manager', 'Environmental Engineer'],
    salary: { entry: '3-6 LPA', mid: '7-15 LPA', senior: '18-35+ LPA' },
    companies: ['L&T Construction', 'DLF', 'Shapoorji Pallonji', 'NHAI', 'Tata Projects'],
    colleges: ['IIT Roorkee', 'IIT Delhi', 'IIT Madras', 'NIT Surathkal'],
    growth: 'Medium',
    demand: 52,
  },
]

/* ------------------------------------------------------------------ */
/*  Accent colour helpers                                              */
/* ------------------------------------------------------------------ */

const accentMap: Record<string, { gradient: string; border: string; bg: string; text: string; bar: string; ring: string; badgeBg: string }> = {
  indigo:  { gradient: 'from-white/[0.02] to-transparent',  border: 'border-white/[0.08]',  bg: 'bg-white/[0.04]',  text: 'text-white/80',  bar: 'bg-white/60',  ring: 'ring-white/10',  badgeBg: 'bg-white/[0.04]' },
  purple:  { gradient: 'from-white/[0.02] to-transparent',  border: 'border-white/[0.08]',  bg: 'bg-white/[0.04]',  text: 'text-white/80',  bar: 'bg-white/60',  ring: 'ring-white/10',  badgeBg: 'bg-white/[0.04]' },
  cyan:    { gradient: 'from-white/[0.02] to-transparent',  border: 'border-white/[0.08]',  bg: 'bg-white/[0.04]',  text: 'text-white/80',  bar: 'bg-white/60',  ring: 'ring-white/10',  badgeBg: 'bg-white/[0.04]' },
  blue:    { gradient: 'from-white/[0.02] to-transparent',  border: 'border-white/[0.08]',  bg: 'bg-white/[0.04]',  text: 'text-white/80',  bar: 'bg-white/60',  ring: 'ring-white/10',  badgeBg: 'bg-white/[0.04]' },
  amber:   { gradient: 'from-white/[0.02] to-transparent',    border: 'border-white/[0.08]',   bg: 'bg-white/[0.04]',   text: 'text-white/80',   bar: 'bg-white/60',   ring: 'ring-white/10',   badgeBg: 'bg-white/[0.04]' },
  yellow:  { gradient: 'from-white/[0.02] to-transparent',  border: 'border-white/[0.08]',  bg: 'bg-white/[0.04]',  text: 'text-white/80',  bar: 'bg-white/60',  ring: 'ring-white/10',  badgeBg: 'bg-white/[0.04]' },
  emerald: { gradient: 'from-white/[0.02] to-transparent', border: 'border-white/[0.08]', bg: 'bg-white/[0.04]', text: 'text-white/80', bar: 'bg-white/60', ring: 'ring-white/10', badgeBg: 'bg-white/[0.04]' },
  rose:    { gradient: 'from-white/[0.02] to-transparent',      border: 'border-white/[0.08]',    bg: 'bg-white/[0.04]',    text: 'text-white/80',    bar: 'bg-white/60',    ring: 'ring-white/10',    badgeBg: 'bg-white/[0.04]' },
}

const growthColor: Record<string, string> = {
  'Very High': 'bg-white/[0.05] text-white border-white/[0.1]',
  'High':      'bg-white/[0.03] text-dark-300 border-white/[0.06]',
  'Medium':    'bg-white/[0.02] text-dark-500 border-white/[0.04]',
  'Low':       'bg-transparent text-dark-600 border-white/[0.02]',
}

/* ------------------------------------------------------------------ */
/*  Animated demand bar                                                */
/* ------------------------------------------------------------------ */

function DemandBar({ value, color }: { value: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!barRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 },
    )
    observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={barRef} className="flex items-center gap-3">
      <div className="flex-1 h-2.5 bg-dark-800 rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-1000 ease-out', color)}
          style={{ width: visible ? `${value}%` : '0%' }}
        />
      </div>
      <span className="text-sm font-bold text-dark-200 tabular-nums w-10 text-right">{value}%</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Branch Card                                                        */
/* ------------------------------------------------------------------ */

function BranchCard({ branch, isExpanded, onToggle }: { branch: Branch; isExpanded: boolean; onToggle: () => void }) {
  const accent = accentMap[branch.accentColor]
  const Icon = branch.icon
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [isExpanded])

  return (
    <div
      id={`branch-${branch.id}`}
      className={clsx(
        'group relative rounded-2xl border transition-all duration-300',
        'bg-[var(--card-bg)]',
        isExpanded
          ? `border-white/[0.1] shadow-lg shadow-black/40 bg-white/[0.03]`
          : 'border-white/[0.06] hover:border-white/[0.10]',
      )}
    >
      {/* Accent strip along top */}
      <div className={clsx('absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r opacity-80', accent.gradient)} />

      {/* Hover gradient border effect */}
      <div
        className={clsx(
          'absolute -inset-px rounded-2xl bg-gradient-to-r opacity-0 transition-opacity duration-300 -z-10',
          accent.gradient,
          !isExpanded && 'group-hover:opacity-20',
        )}
      />

      {/* Clickable header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 rounded-2xl"
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', accent.bg)}>
            <Icon className={clsx('w-6 h-6', accent.text)} />
          </div>

          {/* Title & overview */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-dark-100">{branch.name}</h3>
              <span className={clsx('badge border text-[10px]', growthColor[branch.growth])}>
                <TrendingUp className="w-3 h-3" />
                {branch.growth} Growth
              </span>
            </div>
            <p className="text-sm text-dark-400 mt-1 line-clamp-2">{branch.overview}</p>

            {/* Demand bar (always visible) */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-dark-500 uppercase tracking-wider">Industry Demand</span>
              </div>
              <DemandBar value={branch.demand} color={accent.bar} />
            </div>
          </div>

          {/* Expand toggle */}
          <div className={clsx(
            'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
            isExpanded ? accent.bg : 'bg-dark-800 group-hover:bg-dark-700',
          )}>
            {isExpanded
              ? <ChevronUp className={clsx('w-4 h-4', accent.text)} />
              : <ChevronDown className="w-4 h-4 text-dark-400 group-hover:text-dark-200" />
            }
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isExpanded ? `${contentHeight}px` : '0px' }}
      >
        <div ref={contentRef} className="px-5 sm:px-6 pb-6 pt-0">
          {/* Divider */}
          <div className={clsx('h-px mb-5', accent.bg)} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Career Prospects */}
            <div>
              <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                <Briefcase className={clsx('w-4 h-4', accent.text)} />
                Career Prospects
              </h4>
              <ul className="space-y-2">
                {branch.careers.map(career => (
                  <li key={career} className="flex items-center gap-2 text-sm text-dark-200">
                    <span className={clsx('w-1.5 h-1.5 rounded-full', accent.bar)} />
                    {career}
                  </li>
                ))}
              </ul>
            </div>

            {/* Salary Ranges */}
            <div>
              <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                <DollarSign className={clsx('w-4 h-4', accent.text)} />
                Salary Ranges
              </h4>
              <div className="space-y-2">
                {[
                  { label: 'Entry Level', value: branch.salary.entry },
                  { label: 'Mid Career', value: branch.salary.mid },
                  { label: 'Senior Level', value: branch.salary.senior },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between text-sm">
                    <span className="text-dark-400">{s.label}</span>
                    <span className="font-semibold text-dark-100">₹{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Recruiters */}
            <div>
              <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                <Building2 className={clsx('w-4 h-4', accent.text)} />
                Top Recruiters
              </h4>
              <div className="flex flex-wrap gap-2">
                {branch.companies.map(company => (
                  <span key={company} className={clsx('badge border', accent.badgeBg, accent.text, accent.border)}>
                    {company}
                  </span>
                ))}
              </div>
            </div>

            {/* Popular Colleges */}
            <div>
              <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                <GraduationCap className={clsx('w-4 h-4', accent.text)} />
                Top Colleges
              </h4>
              <div className="flex flex-wrap gap-2">
                {branch.colleges.map(college => (
                  <span key={college} className="badge bg-dark-800 text-dark-200 border border-dark-700">
                    {college}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Quick Nav Sidebar                                                  */
/* ------------------------------------------------------------------ */

function QuickNav({ branches: items, activeId, onSelect }: { branches: Branch[]; activeId: string | null; onSelect: (id: string) => void }) {
  return (
    <nav className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-24 space-y-1">
        <h3 className="text-xs font-semibold text-dark-500 uppercase tracking-widest mb-3 px-3">Quick Nav</h3>
        {items.map(b => {
          const accent = accentMap[b.accentColor]
          const Icon = b.icon
          return (
            <button
              key={b.id}
              onClick={() => onSelect(b.id)}
              className={clsx(
                'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left',
                activeId === b.id
                  ? `${accent.bg} ${accent.text} ${accent.border} border`
                  : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/60 border border-transparent',
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{b.shortName}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function BranchExplorer() {
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [growthFilter, setGrowthFilter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return branches.filter(b => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.shortName.toLowerCase().includes(q) ||
        b.careers.some(c => c.toLowerCase().includes(q)) ||
        b.companies.some(c => c.toLowerCase().includes(q))

      const matchesGrowth = !growthFilter || b.growth === growthFilter

      return matchesSearch && matchesGrowth
    })
  }, [search, growthFilter])

  const handleToggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  const handleQuickNav = (id: string) => {
    setExpandedId(id)
    const el = document.getElementById(`branch-${id}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const growthOptions = ['Very High', 'High', 'Medium', 'Low']

  return (
    <div className="space-y-8 animate-in">
      {/* ---- Page Header ---- */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 bg-white/[0.05] border border-white/[0.08] rounded flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white/80" />
          </div>
          <span className="text-[11px] font-semibold text-dark-600 uppercase tracking-widest">
            Explore &amp; Compare
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-dark-100">Branch Explorer</h1>
        <p className="text-dark-400 mt-1 max-w-2xl">
          Dive deep into engineering branches — compare career paths, salaries, top recruiters, and growth outlook to make an informed decision.
        </p>
      </div>

      {/* ---- Search & Filter Bar ---- */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search branches, careers, companies…"
            className="input pl-10"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Growth filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {growthOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setGrowthFilter(prev => (prev === opt ? null : opt))}
              className={clsx(
                'badge border cursor-pointer transition-all duration-200 select-none',
                growthFilter === opt
                  ? growthColor[opt]
                  : 'bg-dark-800 text-dark-400 border-dark-700 hover:border-dark-600 hover:text-dark-300',
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* ---- Content Area (Sidebar + Grid) ---- */}
      <div className="flex gap-8 items-start">
        {/* Sidebar */}
        <QuickNav branches={filtered} activeId={expandedId} onSelect={handleQuickNav} />

        {/* Cards Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <Search className="w-10 h-10 text-dark-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-dark-200">No branches found</h3>
              <p className="text-sm text-dark-500 mt-1">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => { setSearch(''); setGrowthFilter(null) }}
                className="btn-secondary mt-4 text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filtered.map(branch => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  isExpanded={expandedId === branch.id}
                  onToggle={() => handleToggle(branch.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
