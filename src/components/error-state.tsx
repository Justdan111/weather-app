import { AlertCircle } from "lucide-react"

interface ErrorStateProps {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="relative bg-linear-to-br from-red-950/50 to-slate-900/50 border border-red-700/50 rounded-3xl backdrop-blur-2xl p-8">
      <div className="flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-red-300 mb-1">Unable to fetch weather</h3>
          <p className="text-red-200/80">{message}</p>
          <p className="text-sm text-red-200/60 mt-2">
            Try searching with a different city name or check your internet connection.
          </p>
        </div>
      </div>
      
    </div>
  )
}
