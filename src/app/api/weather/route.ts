import { type NextRequest, NextResponse } from "next/server"

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

const MOCK_WEATHER_DATA: Record<string, WeatherData> = {
  "new york": {
    city: "New York",
    country: "USA",
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    feelsLike: 20,
    icon: "⛅",
  },
  london: {
    city: "London",
    country: "UK",
    temperature: 18,
    condition: "Rainy",
    humidity: 75,
    windSpeed: 18,
    feelsLike: 16,
    icon: "🌧️",
  },
  tokyo: {
    city: "Tokyo",
    country: "Japan",
    temperature: 25,
    condition: "Sunny",
    humidity: 55,
    windSpeed: 8,
    feelsLike: 26,
    icon: "☀️",
  },
  paris: {
    city: "Paris",
    country: "France",
    temperature: 20,
    condition: "Clear",
    humidity: 60,
    windSpeed: 10,
    feelsLike: 19,
    icon: "☀️",
  },
  sydney: {
    city: "Sydney",
    country: "Australia",
    temperature: 28,
    condition: "Sunny",
    humidity: 45,
    windSpeed: 15,
    feelsLike: 29,
    icon: "☀️",
  },
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")?.toLowerCase()

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  const weatherData = MOCK_WEATHER_DATA[city]

  if (!weatherData) {
    return NextResponse.json({ error: "City not found" }, { status: 404 })
  }

  return NextResponse.json(weatherData)
}
