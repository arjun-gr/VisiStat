"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Bell, Search, User } from "lucide-react"

export default function Topbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name || "User"}! Here's what's happening.</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute left-2 top-[16px] transform -translate-y-1/2 w-4 h-4 text-muted-foreground">
              <Search className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
             <Bell className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-10">
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2">Notifications</h3>
                <p className="text-sm text-muted-foreground">No new notifications</p>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
              <div className="p-2">
                <div className="px-3 py-2 text-sm text-foreground border-b border-border">{user?.email}</div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
