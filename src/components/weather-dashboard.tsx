"use client"

import { useState } from "react"
import { SearchInput } from "./search-input"
import { WeatherCard } from "./weather-card"
import { LoadingState } from "./loading-state"
import { ErrorState } from "./error-state"
import { useWeather } from "@/hooks/useWeather"

export function WeatherDashboard() {
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [city, setCity] = useState("");
  const { data, isLoading, error } = useWeather(city);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    if (searchCity && !searchHistory.includes(searchCity)) {
      setSearchHistory((prev) => [searchCity, ...prev].slice(0, 5));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Weather</span>
          </h1>
          <p className="text-slate-400 text-lg">Check weather conditions worldwide</p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <SearchInput
            onSearch={handleSearch}
            isLoading={isLoading}
            searchHistory={searchHistory}
            onSelectHistory={handleSearch}
          />
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {isLoading && <LoadingState />}
          {error && <ErrorState message={"error fetching weather data"}  />}
          {data && !isLoading && <WeatherCard weather={data} />}

          {!isLoading && !error && !data && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-base">Search for a city to see weather information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
