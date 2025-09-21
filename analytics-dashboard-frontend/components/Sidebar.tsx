"use client"

import {
  BarChart3,
  Home,
  Settings,
  Users,
  TrendingUp,
  Globe,
  Activity,
  FileText,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"
import { useTheme } from "@/lib/theme-context"

export default function Sidebar({activeTab, setActiveTab}: {activeTab: string, setActiveTab: (tab: string) => void}) {
  const { theme, setTheme } = useTheme()

  function handleTabClick(tab: string) {
    setActiveTab(tab);
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border p-6 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-sidebar-foreground">Analytics</h2>
        <p className="text-sm text-sidebar-foreground/70">Dashboard</p>
      </div>

      <nav className="space-y-2">
        <a
          href="#"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "dashboard"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          }`}
          onClick={() => handleTabClick("dashboard")}
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </a>
        <a
          href="#"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "Analytics"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          }`}
          onClick={() => handleTabClick("Analytics")}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Analytics</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "Real-time"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          }`}
          onClick={() => handleTabClick("Real-time")}
        >
          <Activity className="w-5 h-5" />
          <span>Real-time</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "Traffic-Sources"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          }`}
          onClick={() => handleTabClick("Traffic-Sources")}
        >
          <Globe className="w-5 h-5" />
          <span>Traffic Sources</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "Audience"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          }`}
          onClick={() => handleTabClick("Audience")}
        >
          <Users className="w-5 h-5" />
          <span>Audience</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "Content"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          }`}
          onClick={() => handleTabClick("Content")}
        >
          <FileText className="w-5 h-5" />
          <span>Content</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "Reports"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          }`}
          onClick={() => handleTabClick("Reports")}
        >
          <TrendingUp className="w-5 h-5" />
          <span>Reports</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            activeTab === "Settings"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          }`}
          onClick={() => handleTabClick("Settings")}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </a>
      </nav>

      <div className="mt-8 pt-6 border-t border-sidebar-border">
        <p className="text-sm text-sidebar-foreground/70 mb-3">Theme</p>
        <div className="flex space-x-1">
          <button
            onClick={() => setTheme("light")}
            className={`p-2 rounded-lg transition-colors ${
              theme === "light"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`p-2 rounded-lg transition-colors ${
              theme === "system"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
