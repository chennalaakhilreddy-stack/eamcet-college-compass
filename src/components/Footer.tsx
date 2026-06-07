import { Link } from 'react-router-dom'
import { GraduationCap, Twitter, Github, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.04] bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Counsello</span>
            </Link>
            <p className="mt-3 text-sm text-dark-600 leading-relaxed">
              Smart admission guidance for engineering aspirants. Make data-driven decisions for your future.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Github className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-dark-600 mb-4">Product</h3>
            <ul className="space-y-2.5">
              <FooterLink href="/dashboard/rank-predictor">Rank Predictor</FooterLink>
              <FooterLink href="/dashboard/college-predictor">College Predictor</FooterLink>
              <FooterLink href="/dashboard/mock-allocator">Mock Allocator</FooterLink>
              <FooterLink href="/dashboard/cutoff-viewer">Cutoff Viewer</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-dark-600 mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <FooterLink href="/#features">Features</FooterLink>
              <FooterLink href="/#colleges">Top Colleges</FooterLink>
              <FooterLink href="/#stats">Statistics</FooterLink>
              <FooterLink href="/register">Get Started</FooterLink>
            </ul>
          </div>

          {/* Exam Support */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-dark-600 mb-4">Exam Support</h3>
            <ul className="space-y-2.5">
              <li className="text-sm text-dark-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                TS EAMCET
              </li>
              <li className="text-sm text-dark-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" />
                JEE Main
              </li>
              <li className="text-sm text-dark-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500/50 rounded-full" />
                JEE Advanced
              </li>
              <li className="text-sm text-dark-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-dark-800 rounded-full" />
                NEET <span className="text-[10px]">(Coming soon)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-700">
            © {year} Counsello. All rights reserved.
          </p>
          <p className="text-sm text-dark-600 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500" /> for engineering aspirants
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={href} className="text-sm text-dark-500 hover:text-white transition-colors duration-200">
        {children}
      </Link>
    </li>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-dark-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.10] transition-all duration-200"
    >
      {icon}
    </a>
  )
}
