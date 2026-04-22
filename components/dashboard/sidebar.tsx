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
  Zap
} from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Lectures", href: "/dashboard/lectures", icon: Video },
  { name: "Meeting Rooms", href: "/dashboard/meetings", icon: Users },
  { name: "AI Tutor", href: "/dashboard/tutor", icon: MessageSquare },
  { name: "Learning Path", href: "/dashboard/learning", icon: BookOpen },
]

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
]

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Image
          src="/images/zeero-logo.png"
          alt="ZEERO AI"
          width={36}
          height={36}
          className="h-9 w-9"
        />
        <span className="text-lg font-bold text-foreground">ZEERO AI</span>
      </div>

      {/* Create Button */}
      <div className="p-4">
        <Button className="w-full gap-2" asChild>
          <Link href="/dashboard/create">
            <Plus className="h-4 w-4" />
            Generate Lecture
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
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
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
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function DashboardSidebar({ user }: { user: User }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 border-r border-border bg-card lg:block">
        <SidebarContent pathname={pathname} />
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
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>
    </>
  )
}
