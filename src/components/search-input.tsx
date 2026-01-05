"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"

interface SearchInputProps {
  onSearch: (city: string) => void
  isLoading: boolean
  searchHistory: string[]
  onSelectHistory: (city: string) => void
}

export function SearchInput({ onSearch, isLoading, searchHistory, onSelectHistory }: SearchInputProps) {
  const [value, setValue] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowHistory(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSearch(value)
      setValue("")
      setShowHistory(false)
    }
  }

  const handleClear = () => {
    setValue("")
    inputRef.current?.focus()
  }

  const handleHistoryClick = (city: string) => {
    onSelectHistory(city)
    setValue("")
    setShowHistory(false)
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>

          <div className="relative flex items-center gap-3 px-6 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-md hover:border-slate-600/50 transition-colors">
            <Search className="w-5 h-5 text-slate-400" />

            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setShowHistory(e.target.value.length > 0 && searchHistory.length > 0)
              }}
              onFocus={() => setShowHistory(value.length === 0 && searchHistory.length > 0)}
              placeholder="Search for a city..."
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-white placeholder-slate-500 text-lg disabled:opacity-50"
            />

            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 hover:bg-slate-700/30 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading || !value.trim()}
              className="px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {/* Search History Dropdown */}
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-slate-900/80 border border-slate-700/50 rounded-xl backdrop-blur-md overflow-hidden z-10">
          <div className="p-2">
            <p className="text-xs text-slate-500 uppercase tracking-wider px-3 py-2">Recent</p>
            {searchHistory.map((city) => (
              <button
                key={city}
                onClick={() => handleHistoryClick(city)}
                className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
