import { TrendingUp, Users, Monitor } from "lucide-react"

interface KPICardsProps {
  totalVisits: number
  topPage: string
  topDevice: string
}

export default function KPICards({ totalVisits, topPage, topDevice }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="card rounded-xl p-6 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Visits</p>
            <p className="text-2xl font-bold text-foreground">{totalVisits.toLocaleString()}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="card rounded-xl p-6 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Top Page</p>
            <p className="text-lg font-semibold text-foreground">{topPage}</p>
          </div>
          <Users className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="card rounded-xl p-6 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Top Device</p>
            <p className="text-lg font-semibold text-foreground capitalize">{topDevice}</p>
          </div>
          <Monitor className="w-8 h-8 text-primary" />
        </div>
      </div>
    </div>
  )
}
