"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const dummyTrafficSources = [
  { source: "Organic Search", value: 45 },
  { source: "Direct", value: 25 },
  { source: "Referral", value: 15 },
  { source: "Social", value: 10 },
  { source: "Email", value: 5 },
]

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

export default function TrafficSources() {
  const [data] = useState(dummyTrafficSources)

  return (
    <div className="bg-card p-6 w-full">
      <h2 className="text-2xl font-bold text-foreground mb-4">Traffic Sources</h2>
      <p className="text-muted-foreground mb-6">
        Distribution of your website visitors by source.
      </p>

      <div className="w-full h-[500px] flex justify-center">
        <ResponsiveContainer width="70%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="source"
              cx="50%"
              cy="50%"
              outerRadius={140}
              innerRadius={70}
              paddingAngle={5}
              stroke="transparent"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => [`${value}%`, "Traffic"]} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((source, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-muted/20 p-3 rounded-lg border"
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
            <span className="text-sm text-foreground ml-2">{source.source}</span>
            <span className="text-sm font-semibold text-primary">{source.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
