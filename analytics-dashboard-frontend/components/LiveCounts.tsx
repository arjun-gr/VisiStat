import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RealtimeProps {
  initialCount: number
}

export default function Realtime({ initialCount }: RealtimeProps) {
  const [visitorCount, setVisitorCount] = useState(initialCount)
  const [timeline, setTimeline] = useState<{ time: string; count: number }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 5) - 2
      setVisitorCount(prev => Math.max(prev + change, 0))

      const now = new Date()
      const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      setTimeline(prev => [
        ...prev.slice(-9),
        { time: formattedTime, count: Math.max(visitorCount + change, 0) },
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [visitorCount])

  const topPages = [
    { url: "/home", count: Math.floor(Math.random() * 10) },
    { url: "/about", count: Math.floor(Math.random() * 8) },
    { url: "/contact", count: Math.floor(Math.random() * 5) },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Live Visitor Count */}
      <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Live Visitors</h3>
          <p className="text-muted-foreground mt-1">Current active users on your site</p>
        </div>
        <div className="text-4xl font-bold text-primary">{visitorCount}</div>
      </div>

      {/* Live Line Chart */}
      <div className="bg-card border border-border rounded-xl p-6 h-96 overflow-hidden pb-20">
        <h3 className="text-lg font-semibold text-foreground mb-4">Visitors Over Time</h3>
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="time" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Top Active Pages</h3>
        <ul className="space-y-2">
          {topPages.map((page, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span className="text-sm text-foreground">{page.url}</span>
              <span className="text-sm font-semibold text-primary">{page.count} users</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
