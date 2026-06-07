import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link 
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-white transition-colors mb-6 ml-4 sm:ml-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
        
        <div className="glass py-8 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-white/[0.08]">
          {!submitted ? (
            <>
              <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shadow-glow-red-sm">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                  Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-dark-400">
                  Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="email" className="label text-white">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full btn-primary py-3 flex justify-center items-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6 animate-in">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center ring-4 ring-emerald-500/5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Check your inbox</h2>
              <p className="text-dark-400 text-sm mb-8 leading-relaxed">
                We've sent a password reset link to<br />
                <span className="font-medium text-white">{email}</span>
              </p>
              
              <div className="space-y-4">
                <p className="text-xs text-dark-500">
                  Didn't receive the email? Check your spam folder or
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-white hover:text-dark-200 transition-colors underline underline-offset-2 text-sm"
                >
                  try another email address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
