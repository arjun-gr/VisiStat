"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts"

const dummyAudienceData = [
  { segment: "18-24", count: 120 },
  { segment: "25-34", count: 250 },
  { segment: "35-44", count: 180 },
  { segment: "45-54", count: 90 },
  { segment: "55-64", count: 40 },
  { segment: "65+", count: 20 },
]

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6"]

export default function Audience() {
  const [data] = useState(dummyAudienceData)

  return (
    <div className="bg-card rounded-xl p-6 w-full">
      <h2 className="text-2xl font-bold text-foreground mb-4">Audience Demographics</h2>
      <p className="text-muted-foreground mb-6">
        Breakdown of your audience by age segments.
      </p>

      <div className="w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="segment" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="count">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((segment, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-muted/20 p-3 rounded-lg border"
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
            <span className="text-sm text-foreground ml-2">{segment.segment}</span>
            <span className="text-sm font-semibold text-primary">{segment.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
