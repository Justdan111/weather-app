"use client"

import { useState } from "react"
import { SearchInput } from "./search-input"
import { WeatherCard } from "./weather-card"
import { LoadingState } from "./loading-state"
import { ErrorState } from "./error-state"

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

export function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const handleSearch = async (city: string) => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      // Simulated API call - replace with real weather API
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)

      if (!response.ok) {
        throw new Error("City not found. Please try another search.")
      }

      const data = await response.json()
      setWeather(data)

      // Add to search history
      setSearchHistory((prev) => [city, ...prev.slice(0, 4)])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data")
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Weather</span>
          </h1>
          <p className="text-slate-400 text-lg">Check weather conditions worldwide</p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <SearchInput
            onSearch={handleSearch}
            isLoading={loading}
            searchHistory={searchHistory}
            onSelectHistory={handleSearch}
          />
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {loading && <LoadingState />}
          {error && <ErrorState message={error} />}
          {weather && !loading && <WeatherCard weather={weather} />}

          {!loading && !error && !weather && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-base">Search for a city to see weather information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
