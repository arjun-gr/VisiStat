import { ExternalLink } from "lucide-react"

interface TopPagesProps {
  topPages: Array<{ url: string; count: string }>
}

export default function TopPages({ topPages }: TopPagesProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">Top Pages</h3>
      <div className="space-y-3">
        {topPages.length > 0 ? (
          topPages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{page.url}</span>
              </div>
              <span className="text-sm font-semibold text-primary">{page.count} visits</span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <ExternalLink className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No page data available</p>
          </div>
        )}
      </div>
    </div>
  )
}
