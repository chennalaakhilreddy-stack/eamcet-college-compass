import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { User, Mail, Calendar, Bookmark, Heart, TrendingUp, Edit2, Save, X, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatRelativeDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()

  const [editing, setEditing] = useState(false)
  const [nameValue, setNameValue] = useState(user?.name ?? '')
  const [nameSaving, setNameSaving] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Please log in to view your profile.</p>
      </div>
    )
  }

  const handleSaveName = async () => {
    const trimmed = nameValue.trim()
    if (!trimmed || trimmed === user.name) {
      setEditing(false)
      setNameValue(user.name)
      return
    }
    setNameSaving(true)
    await new Promise(r => setTimeout(r, 300))
    updateUser({ name: trimmed })
    setNameSaving(false)
    setEditing(false)
  }

  const handleCancelEdit = () => {
    setNameValue(user.name)
    setEditing(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const recentActivity = [...user.savedPredictions].slice(0, 3)

  const statCards = [
    {
      icon: <TrendingUp size={20} className="text-brand-400" />,
      label: 'Saved Predictions',
      value: user.savedPredictions.length,
      color: 'text-brand-400',
    },
    {
      icon: <Heart size={20} className="text-rose-400" />,
      label: 'Saved Colleges',
      value: user.savedColleges.length,
      color: 'text-rose-400',
    },
    {
      icon: <Bookmark size={20} className="text-purple-400" />,
      label: 'Mock Allocations',
      value: user.mockHistory.length,
      color: 'text-purple-400',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Profile Hero */}
      <div className="card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl">{getInitials(user.name)}</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="flex items-center gap-2 mb-1">
                <input
                  type="text"
                  value={nameValue}
                  onChange={e => setNameValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSaveName()
                    if (e.key === 'Escape') handleCancelEdit()
                  }}
                  className="input text-lg font-bold py-1.5 px-3 w-full max-w-xs"
                  autoFocus
                  disabled={nameSaving}
                />
                <button
                  onClick={handleSaveName}
                  disabled={nameSaving}
                  className="p-2 rounded-lg bg-brand-500/20 text-brand-400 hover:bg-brand-500/30 transition-colors"
                  title="Save"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition-colors"
                  title="Cancel"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-white">{user.name}</h1>
                <button
                  onClick={() => { setEditing(true); setNameValue(user.name) }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
                  title="Edit name"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail size={13} />
                {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                Joined {formatDate(user.createdAt)}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-rose-400 transition-colors px-3 py-2 rounded-lg hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/20"
          >
            <LogOut size={15} />
            Log Out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {statCards.map(stat => (
          <div key={stat.label} className="card text-center py-5">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Account Details */}
      <div className="card">
        <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <User size={16} className="text-brand-400" />
          Account Details
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <span className="text-sm text-slate-400">Full Name</span>
            <span className="text-sm text-white font-medium">{user.name}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <span className="text-sm text-slate-400">Email Address</span>
            <span className="text-sm text-white font-medium">{user.email}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <span className="text-sm text-slate-400">Account ID</span>
            <span className="text-xs text-slate-500 font-mono">{user.id.slice(0, 16)}...</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-slate-400">Member Since</span>
            <span className="text-sm text-white font-medium">{formatDate(user.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-brand-400" />
          Recent Predictions
        </h2>
        {recentActivity.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No predictions saved yet.</p>
            <a href="/dashboard/rank-predictor" className="text-brand-400 text-sm hover:underline mt-2 inline-block">
              Run your first prediction →
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivity.map(pred => (
              <div
                key={pred.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    pred.type === 'rank'
                      ? 'bg-brand-500/20 text-brand-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {pred.type === 'rank' ? <TrendingUp size={14} /> : <Bookmark size={14} />}
                  </div>
                  <div>
                    <div className="text-sm text-white font-medium capitalize">
                      {pred.type === 'rank' ? 'Rank Prediction' : 'College Prediction'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {(pred.data as any)?.rank
                        ? `Rank: ${(pred.data as any).rank.toLocaleString()}`
                        : '—'}
                      {(pred.data as any)?.category
                        ? ` · ${(pred.data as any).category}`
                        : ''}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500 shrink-0">{formatRelativeDate(pred.date)}</span>
              </div>
            ))}
            {user.savedPredictions.length > 3 && (
              <a
                href="/dashboard/saved-predictions"
                className="block text-center text-sm text-brand-400 hover:text-brand-300 transition-colors py-2"
              >
                View all {user.savedPredictions.length} predictions →
              </a>
            )}
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="card border-rose-500/20">
        <h2 className="text-base font-semibold text-rose-400 mb-1">Session</h2>
        <p className="text-sm text-slate-400 mb-4">
          You are currently signed in as <span className="text-white">{user.email}</span>.
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 transition-all"
        >
          <LogOut size={15} />
          Sign Out of Account
        </button>
      </div>
    </div>
  )
}
