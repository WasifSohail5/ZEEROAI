"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Video,
  Users,
  MessageSquare,
  BookOpen,
  Settings,
  HelpCircle,
  Menu,
  Plus,
  Zap,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, comingSoon: false },
  { name: "My Lectures", href: "/dashboard/lectures", icon: Video, comingSoon: false },
  { name: "My Courses", href: "/dashboard/courses", icon: BookOpen, comingSoon: true },
  { name: "AI Tutor", href: "/dashboard/tutor", icon: MessageSquare, comingSoon: true },
  { name: "Meeting Rooms", href: "/dashboard/meetings", icon: Users, comingSoon: true },
]

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
]

function SidebarContent({ 
  pathname, 
  isCollapsed,
  setIsCollapsed 
}: { 
  pathname: string
  isCollapsed: boolean
  setIsCollapsed?: (val: boolean) => void
}) {
  return (
    <div className="flex h-full flex-col overflow-x-hidden">
      {/* Logo */}
      <div className={cn("flex h-16 items-center border-b border-border px-6", isCollapsed ? "justify-center px-0" : "gap-2 justify-between")}>
        <div className="flex items-center gap-2">
          <Image
            src="/images/zeero-logo.png"
            alt="ZEERO AI"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0"
          />
          {!isCollapsed && <span className="text-lg font-bold text-foreground overflow-hidden whitespace-nowrap">ZEERO AI</span>}
        </div>
        {setIsCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8 text-muted-foreground hover:text-foreground", isCollapsed && "mt-2 absolute -right-4 top-16 bg-background border hidden sm:flex")}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}
      </div>

      {/* Create Button */}
      <div className="p-4 flex justify-center">
        <Button className={cn("gap-2", isCollapsed ? "w-10 h-10 px-0 rounded-full" : "w-full")} asChild>
          <Link href="/dashboard/create">
            <Plus className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span className="overflow-hidden whitespace-nowrap">Generate Lecture</span>}
          </Link>
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={cn(
                "flex items-center rounded-lg py-2.5 text-sm font-medium transition-colors",
                isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="overflow-hidden whitespace-nowrap">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Secondary Navigation */}
      <div className="border-t border-border p-3">
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={cn(
                "flex items-center rounded-lg py-2.5 text-sm font-medium transition-colors",
                isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="overflow-hidden whitespace-nowrap">{item.name}</span>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function DashboardSidebar({ 
  user,
  isCollapsed = false,
  setIsCollapsed
}: { 
  user: User
  isCollapsed?: boolean
  setIsCollapsed?: (val: boolean) => void 
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden border-r border-border bg-card lg:block transition-all duration-300",
          isCollapsed ? "w-16" : "w-72"
        )}
      >
        <SidebarContent 
          pathname={pathname} 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-50 lg:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent 
            pathname={pathname} 
            isCollapsed={false} 
            // no setIsCollapsed for mobile
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
