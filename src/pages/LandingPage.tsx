import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import {
  TrendingUp,
  Building2,
  Shuffle,
  BarChart3,
  Shield,
  Zap,
  GraduationCap,
  Star,
  MapPin,
  ArrowRight,
  ChevronRight,
  Users,
  BookOpen,
  Award,
  CheckCircle,
} from 'lucide-react'
import { getCollegesByRank } from '@/data/colleges'
import clsx from 'clsx'

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: TrendingUp,
    title: 'Rank Predictor',
    description:
      'Enter your marks or percentile and get an instant, data-driven rank estimate based on historical exam results.',
    badge: 'AI-Powered',
  },
  {
    icon: Building2,
    title: 'College Predictor',
    description:
      'Discover colleges and branches where you have a high probability of admission based on your rank, category, and preferences.',
    badge: 'Smart Match',
  },
  {
    icon: Shuffle,
    title: 'Mock Allocator',
    description:
      'Simulate the actual seat allotment process and see which seat you would receive based on your choices and competition.',
    badge: 'Realistic',
  },
  {
    icon: BarChart3,
    title: 'Cutoff Viewer',
    description:
      'Explore 3-year closing rank trends for every college, branch, and category combination with interactive charts.',
    badge: '3-Year Data',
  },
  {
    icon: Shield,
    title: 'Category Support',
    description:
      'Full support for all reservation categories — General, OBC, EWS, SC, ST — with accurate cutoff data for each exam.',
    badge: 'All Categories',
  },
  {
    icon: Zap,
    title: 'Always Free',
    description:
      'Every feature, every prediction, every dataset — completely free. No subscriptions, no hidden fees, no credit card needed.',
    badge: '100% Free',
  },
]

const stats = [
  { value: '400+', label: 'Top Colleges', icon: Building2 },
  { value: '3', label: 'Major Exams', icon: BookOpen },
  { value: '3', label: 'Years Historical Data', icon: BarChart3 },
  { value: '100%', label: 'Free to Use', icon: CheckCircle },
]

const heroStats = [
  { value: '400+', label: 'Colleges' },
  { value: '500+', label: 'Cutoff Records' },
  { value: '3', label: 'Exams Supported' },
  { value: '95%', label: 'Accuracy' },
]

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={clsx(
            'transition-colors',
            star <= Math.round(rating)
              ? 'text-amber-500 fill-amber-500'
              : 'text-dark-600 fill-dark-700'
          )}
        />
      ))}
      <span className="ml-1.5 text-[11px] text-dark-500 font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

// ─── LandingPage ─────────────────────────────────────────────────────────────

export default function LandingPage() {
  const { user } = useAuth()
  const topColleges = getCollegesByRank(6)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-16 hero-gradient grid-pattern overflow-hidden">
        {/* Subtle glow orbs */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32"
          style={{
            background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center animate-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/80 text-[11px] font-medium mb-8 backdrop-blur-sm hover:bg-white/[0.05] transition-colors group cursor-default">
            Trusted by Engineering Aspirants
            <ChevronRight size={12} className="text-dark-500 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* H1 */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 max-w-5xl">
            Smart Admission Guidance{' '}
            <span className="text-dark-400">for Engineering Aspirants</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-dark-500 max-w-2xl leading-relaxed mb-10">
            Predict your rank, discover the best colleges, simulate seat allotment, and explore
            cutoff trends — for TS EAMCET, JEE Main, and JEE Advanced. Completely free.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
            <Link
              to={user ? '/dashboard' : '/register'}
              className="btn-primary text-base px-8 py-3.5"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <Link
              to="#features"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-secondary text-base px-8 py-3.5"
            >
              View Demo
            </Link>
          </div>

          {/* Stats row */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="glass-sm rounded-3xl px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {heroStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-white leading-none mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-dark-500 font-medium tracking-wide uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 relative bg-[#09090b]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 badge bg-white/[0.04] text-dark-400 border border-white/[0.08] mb-4">
              <Zap size={12} className="text-brand-500" />
              Everything You Need
            </div>
            <h2 className="section-title text-white mb-4">
              Powerful Tools, <span className="text-dark-400">Zero Cost</span>
            </h2>
            <p className="section-subtitle mx-auto text-center">
              From rank prediction to mock seat allotment, Counsello gives you every tool to make
              the best decision for your engineering career.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="group relative card p-6 cursor-default hover:bg-white/[0.02]"
                >
                  <div className="relative z-10">
                    {/* Icon + badge row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:border-white/[0.12] transition-colors">
                        <Icon size={20} className="text-white/80" />
                      </div>
                      <span className="badge bg-white/[0.04] text-dark-400 text-[10px] border border-white/[0.06]">
                        {feature.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-dark-500 text-[13px] leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section id="stats" className="py-24 relative bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 badge bg-white/[0.04] text-dark-400 border border-white/[0.08] mb-4">
              <Award size={12} className="text-brand-500" />
              By the Numbers
            </div>
            <h2 className="section-title text-white mb-4">
              Trusted by Thousands of <span className="text-dark-400">Aspirants</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={i}
                  className="group glass-sm rounded-3xl p-8 text-center hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex justify-center mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.1] transition-colors">
                      <Icon size={22} className="text-white/80" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-dark-500 text-[11px] font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              )
            })}
          </div>

          {/* Trust bar */}
          <div className="mt-12 glass-sm rounded-full px-8 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs text-dark-400">
            {[
              { icon: CheckCircle, text: 'Official Exam Data' },
              { icon: Shield, text: 'No Registration Required' },
              { icon: Users, text: 'Community Verified' },
              { icon: Zap, text: 'Instant Results' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon size={14} className="text-dark-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR COLLEGES ──────────────────────────────────────────────── */}
      <section id="colleges" className="py-24 relative bg-[#09090b]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 badge bg-white/[0.04] text-dark-400 border border-white/[0.08] mb-4">
                <GraduationCap size={12} className="text-brand-500" />
                Top Institutions
              </div>
              <h2 className="section-title text-white">
                Popular <span className="text-dark-400">Colleges</span>
              </h2>
              <p className="section-subtitle mt-2">
                Explore top-ranked engineering colleges across India — IITs, NITs, IIITs, and state colleges.
              </p>
            </div>
            <Link
              to="/colleges"
              className="btn-secondary text-sm shrink-0"
            >
              View All Colleges
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* College cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topColleges.map((college, i) => (
              <div
                key={college.id}
                className="group card p-6 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Rank badge + type */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-white/[0.06] text-white text-[10px] font-semibold border border-white/[0.08]">
                      #{college.ranking}
                    </span>
                    <span className="badge text-[9px] font-semibold bg-white/[0.03] text-dark-400 border border-white/[0.06]">
                      {college.type}
                    </span>
                  </div>
                  <span className="badge bg-white/[0.03] text-dark-400 text-[9px] border border-white/[0.06]">
                    NAAC {college.naacGrade}
                  </span>
                </div>

                {/* College name */}
                <h3 className="font-semibold text-white text-sm leading-snug mb-1 group-hover:text-dark-200 transition-colors line-clamp-2">
                  {college.name}
                </h3>
                <p className="text-[11px] font-medium text-dark-500 mb-4">{college.shortName}</p>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-dark-500 text-[11px] mb-5">
                  <MapPin size={12} className="text-dark-600 shrink-0" />
                  {college.location}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mb-5" />

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-[9px] text-dark-600 uppercase tracking-widest mb-1">Placement</p>
                    <StarRating rating={college.placementRating} />
                  </div>
                  <div>
                    <p className="text-[9px] text-dark-600 uppercase tracking-widest mb-1">Avg Package</p>
                    <p className="text-xs font-semibold text-white">
                      ₹{college.avgPackage} LPA
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] text-dark-600 uppercase tracking-widest mb-1">Total Seats</p>
                    <p className="text-xs font-semibold text-white">{college.totalSeats}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-dark-600 uppercase tracking-widest mb-1">Est.</p>
                    <p className="text-xs font-semibold text-white">{college.established}</p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/register"
                  className="w-full flex items-center justify-between text-xs font-medium text-dark-400 group-hover:text-white transition-colors py-2 border-t border-white/[0.04] pt-4"
                >
                  Check Cutoffs
                  <ChevronRight size={14} className="text-dark-600 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-24 relative bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 badge bg-white/[0.04] text-dark-400 border border-white/[0.08] mb-4">
              <BookOpen size={12} className="text-brand-500" />
              Simple Process
            </div>
            <h2 className="section-title text-white mb-4">
              Get Your College List in <span className="text-dark-400">3 Steps</span>
            </h2>
            <p className="section-subtitle mx-auto text-center">
              No complex forms, no lengthy registrations. Start predicting in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {[
              {
                step: '01',
                icon: TrendingUp,
                title: 'Enter Your Marks',
                desc: 'Input your exam marks, percentile, or rank. Select your category for accurate results.',
              },
              {
                step: '02',
                icon: BarChart3,
                title: 'Explore Predictions',
                desc: 'View your predicted rank and see a personalized list of colleges sorted by admission probability.',
              },
              {
                step: '03',
                icon: CheckCircle,
                title: 'Make Your Choice',
                desc: 'Compare cutoffs, placements, and fees. Use the mock allocator to finalize your college choices.',
              },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="flex flex-col p-8 card bg-white/[0.02]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/[0.05] border border-white/[0.08]">
                  <Icon size={20} className="text-white/80" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase mb-2 text-brand-500">
                  Step {step}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-dark-500 text-[13px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 relative bg-[#09090b] overflow-hidden">
        {/* Glow behind CTA */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.06) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6 text-white">
            Start Your Journey <span className="text-dark-500">Today</span>
          </h2>

          <p className="text-base text-dark-500 max-w-xl mx-auto leading-relaxed mb-10">
            Don't leave your college admission to chance. Use Counsello to make data-driven
            decisions and secure your future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/register"
              className="btn-primary text-base px-10 py-4 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="btn-secondary text-base px-10 py-4"
            >
              Log in
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] text-dark-600">
            {[
              'No credit card required',
              'Free forever',
              'TS EAMCET • JEE Main • JEE Advanced',
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle size={12} className="text-dark-700" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
