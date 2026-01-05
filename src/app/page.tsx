import { WeatherDashboard } from "@/components/weather-dashboard"

export const metadata = {
  title: "Weather Dashboard",
  description: "Modern weather dashboard with city search and real-time conditions",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900">
      <WeatherDashboard />
    </main>
  )
}
