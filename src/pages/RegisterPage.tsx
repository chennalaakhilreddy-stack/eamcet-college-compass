import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { GraduationCap, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [targetExam, setTargetExam] = useState('TS EAMCET')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await register(name, email, password)
      if (res.success) {
        navigate('/dashboard')
      } else {
        setError(res.error || 'Failed to register')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative z-10">
        <div className="w-full max-w-md space-y-8 glass py-8 px-4 sm:rounded-3xl sm:px-10 border border-white/[0.08]">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow-red-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Counsello</span>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">Create an account</h1>
            <p className="text-dark-400">
              Start your college admission journey today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="register-name" className="label text-white">
                Full name
              </label>
              <input
                id="register-name"
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="register-email" className="label text-white">
                Email address
              </label>
              <input
                id="register-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="register-password" className="label text-white">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="register-target-exam" className="label text-white">
                Target Exam
              </label>
              <select
                id="register-target-exam"
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="input appearance-none bg-black/40"
                disabled={loading}
              >
                <option value="TS EAMCET">TS EAMCET</option>
                <option value="JEE Main">JEE Main</option>
                <option value="JEE Advanced">JEE Advanced</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !name || !email || !password}
              className="w-full btn-primary py-3 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-dark-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-white font-medium hover:text-dark-200 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
