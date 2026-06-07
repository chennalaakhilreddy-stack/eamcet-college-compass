import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getAllColleges } from '@/data/colleges'
import { Heart, Star, MapPin, ArrowRight, Building2 } from 'lucide-react'

const TYPE_COLORS: Record<string, string> = {
  Government: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
  Autonomous: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  Deemed: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  Private: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
}

const NAAC_COLORS: Record<string, string> = {
  'A++': 'bg-emerald-500/20 text-emerald-400',
  'A+': 'bg-green-500/20 text-green-400',
  A: 'bg-blue-500/20 text-blue-400',
  'B+': 'bg-yellow-500/20 text-yellow-400',
}

export default function FavouriteColleges() {
  const { user, removeCollege } = useAuth()

  const allColleges = getAllColleges()
  const savedIds = user?.savedColleges ?? []
  const favourites = allColleges.filter(c => savedIds.includes(c.id))

  if (favourites.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Favourite Colleges</h1>
          <p className="text-slate-400 text-sm">Colleges you've saved for quick access.</p>
        </div>
        <div className="card text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
            <Heart size={28} className="text-slate-500" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">No saved colleges yet</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
            Browse colleges and click the heart icon to save them to your favourites list.
          </p>
          <Link to="/dashboard/search" className="btn-primary inline-flex items-center gap-2">
            <Building2 size={16} />
            Explore Colleges
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Favourite Colleges</h1>
          <p className="text-slate-400 text-sm">
            {favourites.length} saved college{favourites.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/dashboard/search" className="btn-secondary text-sm flex items-center gap-2">
          <Building2 size={15} />
          Browse More
        </Link>
      </div>

      {/* College Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {favourites.map(college => (
          <div
            key={college.id}
            className="card group hover:border-white/20 transition-all duration-200 flex flex-col"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[college.type]}`}>
                    {college.type}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${NAAC_COLORS[college.naacGrade] || 'bg-slate-500/20 text-slate-400'}`}>
                    {college.naacGrade}
                  </span>
                  {college.nbaAccredited && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400">
                      NBA
                    </span>
                  )}
                </div>
                <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">
                  {college.name}
                </h3>
              </div>
              <button
                onClick={() => removeCollege(college.id)}
                className="shrink-0 p-2 rounded-lg hover:bg-rose-500/20 text-rose-400 transition-all duration-200"
                title="Remove from favourites"
              >
                <Heart size={16} className="fill-rose-400" />
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-4">
              <MapPin size={12} />
              {college.location}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white/5 rounded-lg p-2 text-center">
                <div className="text-white font-bold text-sm">#{college.ranking}</div>
                <div className="text-slate-500 text-xs mt-0.5">Rank</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2 text-center">
                <div className="text-emerald-400 font-bold text-sm">{college.avgPackage} LPA</div>
                <div className="text-slate-500 text-xs mt-0.5">Avg Pkg</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2 text-center">
                <div className="text-white font-bold text-sm">{college.totalSeats}</div>
                <div className="text-slate-500 text-xs mt-0.5">Seats</div>
              </div>
            </div>

            {/* Placement Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-slate-500">Placement:</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star
                    key={i}
                    size={12}
                    className={i <= Math.round(college.placementRating) ? 'text-yellow-400 fill-yellow-400' : 'text-dark-600'}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-300 font-medium">{college.placementRating}</span>
            </div>

            {/* Branches Preview */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {college.branches.slice(0, 4).map(b => (
                <span key={b.id} className="text-xs bg-dark-700 text-slate-400 rounded-md px-2 py-0.5 border border-white/5">
                  {b.shortName}
                </span>
              ))}
              {college.branches.length > 4 && (
                <span className="text-xs text-slate-500">+{college.branches.length - 4}</span>
              )}
            </div>

            {/* View Details Link */}
            <div className="mt-auto pt-2 border-t border-white/5">
              <Link
                to={`/dashboard/college/${college.id}`}
                className="flex items-center justify-between text-sm text-slate-400 hover:text-brand-400 transition-colors group/link"
              >
                <span>View Details</span>
                <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
