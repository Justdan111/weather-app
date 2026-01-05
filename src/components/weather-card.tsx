"use client"

import { Cloud, Droplets, Wind, Gauge } from "lucide-react"

interface WeatherData {
  city: string
  country: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  feelsLike: number
  icon: string
}

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherGradient = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes("rain")) return "from-slate-600 to-blue-600"
    if (lowerCondition.includes("cloud")) return "from-slate-500 to-slate-700"
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) return "from-yellow-400 to-orange-500"
    if (lowerCondition.includes("snow")) return "from-blue-200 to-cyan-300"
    return "from-blue-500 to-cyan-600"
  }

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes("rain")) return "🌧️"
    if (lowerCondition.includes("cloud")) return "☁️"
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) return "☀️"
    if (lowerCondition.includes("snow")) return "❄️"
    return "🌤️"
  }

  return (
    <div className="group">
      <div
        className={`absolute inset-0 bg-linear-to-br ${getWeatherGradient(weather.condition)} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
      ></div>

      <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-3xl backdrop-blur-2xl p-8 md:p-12 hover:border-slate-600/50 transition-all duration-300 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-1">
              {weather.city}
              <span className="text-slate-400 text-2xl md:text-3xl font-normal">, {weather.country}</span>
            </h2>
            <p className="text-slate-400">Weather conditions</p>
          </div>
          <div className="text-6xl md:text-8xl">{getWeatherIcon(weather.condition)}</div>
        </div>

        {/* Temperature Section */}
        <div className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-7xl md:text-8xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {Math.round(weather.temperature)}°
            </span>
            <span className="text-2xl text-slate-400">C</span>
          </div>
          <div className="space-y-2">
            <p className="text-xl text-slate-300 capitalize font-medium">{weather.condition}</p>
            <p className="text-slate-400">
              Feels like <span className="text-cyan-400 font-medium">{Math.round(weather.feelsLike)}°C</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-slate-700/0 via-slate-700/50 to-slate-700/0 mb-8"></div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Humidity */}
          <div className="bg-slate-700/20 border border-slate-700/30 rounded-2xl p-4 hover:border-slate-600/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Droplets className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-400">Humidity</span>
            </div>
            <p className="text-2xl font-bold text-white">{weather.humidity}%</p>
          </div>

          {/* Wind Speed */}
          <div className="bg-slate-700/20 border border-slate-700/30 rounded-2xl p-4 hover:border-slate-600/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Wind className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-slate-400">Wind</span>
            </div>
            <p className="text-2xl font-bold text-white">{Math.round(weather.windSpeed)} km/h</p>
          </div>

          {/* Condition */}
          <div className="bg-slate-700/20 border border-slate-700/30 rounded-2xl p-4 hover:border-slate-600/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Cloud className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-400">Condition</span>
            </div>
            <p className="text-lg font-bold text-white capitalize truncate">{weather.condition}</p>
          </div>

          {/* Feels Like */}
          <div className="bg-slate-700/20 border border-slate-700/30 rounded-2xl p-4 hover:border-slate-600/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Gauge className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-slate-400">Feels Like</span>
            </div>
            <p className="text-2xl font-bold text-white">{Math.round(weather.feelsLike)}°C</p>
          </div>
        </div>
      </div>
    </div>
  )
}
