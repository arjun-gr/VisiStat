"use client"

import { useState, useEffect } from "react"
import { Activity } from "lucide-react"

interface RealtimeProps {
  initialCount: number
}

export default function Realtime({ initialCount }: RealtimeProps) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCount((prev) => prev + 1)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
        <Activity className="w-4 h-4 mr-2 text-primary" />
        Real-time Visitors
      </h3>
      <div className="text-3xl font-bold text-primary">{count}</div>
      <p className="text-xs text-muted-foreground mt-1">Active now</p>
    </div>
  )
}
