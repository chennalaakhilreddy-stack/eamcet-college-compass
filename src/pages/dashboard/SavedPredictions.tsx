import { useAuth } from '@/hooks/useAuth'
import { Bookmark, TrendingUp, Building2, Trash2, Calendar } from 'lucide-react'
import type { SavedPrediction } from '@/contexts/AuthContext'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function RankPredictionCard({
  prediction,
  onDelete,
}: {
  prediction: SavedPrediction
  onDelete: () => void
}) {
  const data = prediction.data as {
    rank?: number
    category?: string
    best?: string[]
    expected?: string[]
    worst?: string[]
  }

  return (
    <div className="card group hover:border-brand-500/30 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
            <TrendingUp size={18} className="text-brand-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Rank Prediction</h3>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
              <Calendar size={12} />
              {formatDate(prediction.date)}
            </div>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-all duration-200"
          title="Delete prediction"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        {data.rank && (
          <div className="bg-white/5 rounded-lg px-3 py-2 text-center">
            <div className="text-xs text-slate-500 mb-0.5">Rank Used</div>
            <div className="text-white font-bold">{data.rank.toLocaleString()}</div>
          </div>
        )}
        {data.category && (
          <div className="bg-white/5 rounded-lg px-3 py-2 text-center">
            <div className="text-xs text-slate-500 mb-0.5">Category</div>
            <div className="text-brand-400 font-bold">{data.category}</div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {data.best && data.best.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Best Case</span>
              <span className="text-xs text-slate-500">({data.best.length} colleges)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.best.slice(0, 3).map((c: string, i: number) => (
                <span key={i} className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-md px-2 py-0.5">
                  {c}
                </span>
              ))}
              {data.best.length > 3 && (
                <span className="text-xs text-slate-500">+{data.best.length - 3} more</span>
              )}
            </div>
          </div>
        )}
        {data.expected && data.expected.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs font-medium text-blue-400">Expected</span>
              <span className="text-xs text-slate-500">({data.expected.length} colleges)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.expected.slice(0, 3).map((c: string, i: number) => (
                <span key={i} className="text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md px-2 py-0.5">
                  {c}
                </span>
              ))}
              {data.expected.length > 3 && (
                <span className="text-xs text-slate-500">+{data.expected.length - 3} more</span>
              )}
            </div>
          </div>
        )}
        {data.worst && data.worst.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <span className="text-xs font-medium text-orange-400">Safe Options</span>
              <span className="text-xs text-slate-500">({data.worst.length} colleges)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.worst.slice(0, 3).map((c: string, i: number) => (
                <span key={i} className="text-xs bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-md px-2 py-0.5">
                  {c}
                </span>
              ))}
              {data.worst.length > 3 && (
                <span className="text-xs text-slate-500">+{data.worst.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CollegePredictionCard({
  prediction,
  onDelete,
}: {
  prediction: SavedPrediction
  onDelete: () => void
}) {
  const data = prediction.data as {
    rank?: number
    category?: string
    colleges?: string[]
    totalColleges?: number
  }

  return (
    <div className="card group hover:border-purple-500/30 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
            <Building2 size={18} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">College Prediction</h3>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
              <Calendar size={12} />
              {formatDate(prediction.date)}
            </div>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-all duration-200"
          title="Delete prediction"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        {data.rank && (
          <div className="bg-white/5 rounded-lg px-3 py-2 text-center">
            <div className="text-xs text-slate-500 mb-0.5">Rank</div>
            <div className="text-white font-bold">{data.rank.toLocaleString()}</div>
          </div>
        )}
        {data.category && (
          <div className="bg-white/5 rounded-lg px-3 py-2 text-center">
            <div className="text-xs text-slate-500 mb-0.5">Category</div>
            <div className="text-purple-400 font-bold">{data.category}</div>
          </div>
        )}
        {data.totalColleges !== undefined && (
          <div className="bg-white/5 rounded-lg px-3 py-2 text-center">
            <div className="text-xs text-slate-500 mb-0.5">Matches</div>
            <div className="text-white font-bold">{data.totalColleges}</div>
          </div>
        )}
      </div>

      {data.colleges && data.colleges.length > 0 && (
        <div>
          <div className="text-xs text-slate-500 mb-2">Eligible Colleges</div>
          <div className="flex flex-wrap gap-1.5">
            {data.colleges.slice(0, 5).map((c: string, i: number) => (
              <span key={i} className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md px-2 py-0.5">
                {c}
              </span>
            ))}
            {data.colleges.length > 5 && (
              <span className="text-xs text-slate-500">+{data.colleges.length - 5} more</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SavedPredictions() {
  const { user, updateUser } = useAuth()

  const predictions = user?.savedPredictions ?? []

  const handleDelete = (id: string) => {
    if (!user) return
    updateUser({
      savedPredictions: user.savedPredictions.filter(p => p.id !== id),
    })
  }

  const handleClearAll = () => {
    if (!user) return
    if (window.confirm('Are you sure you want to clear all saved predictions?')) {
      updateUser({ savedPredictions: [] })
    }
  }

  if (predictions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Saved Predictions</h1>
          <p className="text-slate-400 text-sm">Your rank and college predictions are stored here.</p>
        </div>
        <div className="card text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
            <Bookmark size={28} className="text-slate-500" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">No saved predictions yet</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
            Run a rank prediction or college check and save the results to track your options.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="/dashboard/rank-predictor" className="btn-primary">
              Rank Predictor
            </a>
            <a href="/dashboard/college-predictor" className="btn-secondary">
              College Predictor
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Saved Predictions</h1>
          <p className="text-slate-400 text-sm">
            {predictions.length} saved prediction{predictions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleClearAll}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-rose-400 transition-colors px-3 py-2 rounded-lg hover:bg-rose-500/10"
        >
          <Trash2 size={15} />
          Clear All
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="card text-center py-4">
          <div className="text-2xl font-bold text-white">{predictions.length}</div>
          <div className="text-xs text-slate-500 mt-1">Total Saved</div>
        </div>
        <div className="card text-center py-4">
          <div className="text-2xl font-bold text-brand-400">
            {predictions.filter(p => p.type === 'rank').length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Rank Predictions</div>
        </div>
        <div className="card text-center py-4">
          <div className="text-2xl font-bold text-purple-400">
            {predictions.filter(p => p.type === 'college').length}
          </div>
          <div className="text-xs text-slate-500 mt-1">College Predictions</div>
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {predictions.map(prediction => (
          prediction.type === 'rank' ? (
            <RankPredictionCard
              key={prediction.id}
              prediction={prediction}
              onDelete={() => handleDelete(prediction.id)}
            />
          ) : (
            <CollegePredictionCard
              key={prediction.id}
              prediction={prediction}
              onDelete={() => handleDelete(prediction.id)}
            />
          )
        ))}
      </div>
    </div>
  )
}
