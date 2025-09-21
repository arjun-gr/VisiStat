import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "@/styles/globals.css"
import { AuthProvider } from "@/lib/auth"
import { ThemeProvider } from "@/lib/theme-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Track your page hits",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
        <div className="min-h-screen">
          <ThemeProvider>
            <AuthProvider>
              <Suspense fallback={null}>{children}</Suspense>
            </AuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
