export function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-3xl backdrop-blur-2xl p-8 md:p-12">
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-12 bg-slate-700/40 rounded-lg w-48 animate-pulse"></div>
              <div className="h-4 bg-slate-700/30 rounded w-32 animate-pulse"></div>
            </div>
            <div className="h-24 w-24 bg-slate-700/40 rounded-lg animate-pulse"></div>
          </div>

          {/* Temperature skeleton */}
          <div>
            <div className="h-20 bg-slate-700/40 rounded-lg w-32 animate-pulse mb-4"></div>
            <div className="space-y-2">
              <div className="h-6 bg-slate-700/30 rounded w-40 animate-pulse"></div>
              <div className="h-4 bg-slate-700/30 rounded w-48 animate-pulse"></div>
            </div>
          </div>

          {/* Details skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-700/20 rounded-2xl p-4">
                <div className="h-4 bg-slate-700/40 rounded w-20 mb-3 animate-pulse"></div>
                <div className="h-8 bg-slate-700/40 rounded w-16 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
