interface ChartsProps {
  dailyVisits: Array<{ date: string; count: string }>
  deviceStats: Array<{ device: string; count: string }>
}

export default function Charts({ dailyVisits, deviceStats }: ChartsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Daily Visits</h3>
        <div className="h-64 bg-muted/10 rounded-lg p-4">
          <div className="h-full flex items-end space-x-2">
            {dailyVisits.map((visit, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary rounded-t-sm min-h-[20px]"
                  style={{
                    height: `${(Number.parseInt(visit.count) / Math.max(...dailyVisits.map((v) => Number.parseInt(v.count)))) * 200}px`,
                  }}
                />
                <div className="text-xs text-muted-foreground mt-2">
                  {new Date(visit.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
                <div className="text-xs font-semibold text-foreground">{visit.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Device Stats</h3>
        <div className="space-y-3">
          {deviceStats.map((device, index) => {
            const total = deviceStats.reduce((sum, d) => sum + Number.parseInt(d.count), 0)
            const percentage = total > 0 ? (Number.parseInt(device.count) / total) * 100 : 0

            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-foreground capitalize">{device.device}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-foreground w-8">{device.count}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
