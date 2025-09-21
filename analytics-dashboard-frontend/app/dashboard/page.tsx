"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import KPICards from "../../components/KPICards"
import Charts from "../../components/Charts"
import Realtime from "../../components/Realtime"
import TopPages from "../../components/TopPage"
import LiveCount from "@/components/LiveCounts"
import TrafficSources from "@/components/TrafficSources"
import Audience from "@/components/Audiences"
const analyticsData = {
  totalVisits: 120,
  dailyVisits: [
    { date: "2025-09-14T00:00:00.000Z", count: "15" },
    { date: "2025-09-15T00:00:00.000Z", count: "25" },
    { date: "2025-09-16T00:00:00.000Z", count: "20" },
    { date: "2025-09-17T00:00:00.000Z", count: "30" },
    { date: "2025-09-18T00:00:00.000Z", count: "6" },
    { date: "2025-09-19T00:00:00.000Z", count: "12" },
    { date: "2025-09-20T00:00:00.000Z", count: "12" },
  ],
  topPages: [
    { url: "/home", count: "40" },
    { url: "/about", count: "30" },
    { url: "/contact", count: "20" },
    { url: "/blog", count: "15" },
    { url: "/services", count: "15" },
  ],
  deviceStats: [
    { device: "desktop", count: "60" },
    { device: "mobile", count: "45" },
    { device: "tablet", count: "15" },
  ],
}


export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const topDevice = analyticsData.deviceStats?.length
    ? analyticsData.deviceStats.reduce((a: any, b: any) =>
        Number.parseInt(a.count) > Number.parseInt(b.count) ? a : b,
      ).device
    : "-"

  return (
    <div className="flex w-full min-h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />


     <main className="flex-1 ml-64 p-8">
  <Topbar />

  {activeTab === "dashboard" && (
    <>
      <KPICards
        totalVisits={analyticsData.totalVisits}
        topPage={analyticsData.topPages?.[0]?.url || "-"}
        topDevice={topDevice}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <Charts dailyVisits={analyticsData.dailyVisits || []} deviceStats={analyticsData.deviceStats || []} />
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <Realtime initialCount={analyticsData.totalVisits || 0} />
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-card-foreground mb-3">Top browsers</h3>
            <div className="text-sm text-muted-foreground">Chrome • Firefox • Safari</div>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-card border border-border rounded-xl p-6">
        <TopPages topPages={analyticsData.topPages || []} />
      </div>
    </>
  )}

{activeTab === "Analytics" && (
  <div className="bg-card border border-border rounded-xl p-6 w-full h-[80vh]">
    <h2 className="text-2xl font-bold text-foreground mb-4">Analytics Overview</h2>
    <ResponsiveContainer width="100%" height="90%">
      <LineChart 
        data={analyticsData.dailyVisits} 
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} 
          stroke="#8884d8"
        />
        <YAxis 
          stroke="#8884d8" 
          domain={[0, Math.max(...analyticsData.dailyVisits.map(d => Number(d.count))) * 1.2]} // 20% padding
        />
        <Tooltip 
          formatter={(value: any) => [value, "Visits"]} 
          labelFormatter={(label: any) => new Date(label).toLocaleDateString()} 
        />
        <Legend />
        <Line type="monotone" dataKey="count" name="Daily Visits" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}
  {activeTab === "Real-time" && (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* <Realtime initialCount={analyticsData.totalVisits || 0} /> */}
      <LiveCount initialCount={analyticsData.totalVisits || 0} />
    </div>
  )}

  {activeTab === "Traffic-Sources" && (
    <div className="bg-card border border-border rounded-xl p-6">
      <TrafficSources/>
    </div>
  )}

  {
    activeTab === "Audience" && (
      <div className="bg-card border border-border rounded-xl p-6">
        <Audience/>
      </div>
    )
  }

{activeTab === "Content" && (
  <div className="bg-card border border-border rounded-xl p-6">
    <h2 className="text-2xl font-bold text-foreground">Content</h2>
    <p className="text-muted-foreground mt-2">
      Below are some interesting articles you can read to get more insights.
    </p>

    {/* Blog-style content banners */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-foreground">Latest Blog Posts</h3>
      <div className="mt-2 space-y-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h4 className="text-md font-bold text-foreground">Understanding Analytics</h4>
          <p className="text-sm text-muted-foreground">
            A deep dive into analytics and how to leverage data.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <h4 className="text-md font-bold text-foreground">Improving User Engagement</h4>
          <p className="text-sm text-muted-foreground">
            Tips and tricks to boost user engagement on your platform.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <h4 className="text-md font-bold text-foreground">Content Strategy 101</h4>
          <p className="text-sm text-muted-foreground">
            How to plan and execute a content strategy for your website.
          </p>
        </div>
      </div>
    </div>
  </div>
)}
{activeTab === "Reports" && (
  <div className="bg-card border border-border rounded-xl p-6">
    <h2 className="text-2xl font-bold text-foreground">Reports</h2>
    <p className="text-muted-foreground mt-2">
      Summary of generated reports and performance metrics.
    </p>

    {/* Dummy report cards */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <h4 className="text-md font-semibold text-foreground">Weekly Visits</h4>
        <p className="text-sm text-muted-foreground mt-1">Total visits this week: 320</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <h4 className="text-md font-semibold text-foreground">Top Pages Report</h4>
        <p className="text-sm text-muted-foreground mt-1">Home, About, Contact, Blog</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <h4 className="text-md font-semibold text-foreground">Device Breakdown</h4>
        <p className="text-sm text-muted-foreground mt-1">Desktop: 60%, Mobile: 35%, Tablet: 5%</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <h4 className="text-md font-semibold text-foreground">Conversion Report</h4>
        <p className="text-sm text-muted-foreground mt-1">Conversions this month: 42</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <h4 className="text-md font-semibold text-foreground">Bounce Rate</h4>
        <p className="text-sm text-muted-foreground mt-1">Average bounce rate: 27%</p>
      </div>
    </div>
  </div>
)}
{activeTab === "Settings" && (
  <div className="bg-card border border-border rounded-xl p-6">
    <h2 className="text-2xl font-bold text-foreground">Settings</h2>
    <p className="text-muted-foreground mt-2">
      Manage your account preferences and dashboard configurations.
    </p>

    {/* Settings form */}
    <div className="mt-6 space-y-6">
      {/* Profile Settings */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Profile Settings</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Username</label>
            <input type="text" placeholder="Your username" className="w-full border border-border rounded p-2 bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full border border-border rounded p-2 bg-background text-foreground" />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Preferences</h3>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Enable notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Dark mode</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

</main>
    </div>
  )
}
