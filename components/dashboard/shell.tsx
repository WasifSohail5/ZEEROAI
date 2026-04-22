"use client"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import { cn } from "@/lib/utils"
import DashboardSidebar from "@/components/dashboard/sidebar"

export function DashboardShell({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar 
        user={user} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          isCollapsed ? "lg:pl-16" : "lg:pl-72"
        )}
      >
        {children}
      </div>
    </div>
  )
}
