import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Video, Users, Clock, TrendingUp, Plus, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard - ZEERO AI",
  description: "Your AI-powered learning dashboard",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const firstName = user?.user_metadata?.first_name || "there"

  const stats = [
    { name: "Lectures Created", value: "0", icon: Video, change: "0 this week" },
    { name: "Study Hours", value: "0", icon: Clock, change: "0 this week" },
    { name: "Meeting Rooms", value: "0", icon: Users, change: "0 active" },
    { name: "Progress", value: "0%", icon: TrendingUp, change: "0% this month" },
  ]

  const recentLectures: any[] = []

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Welcome back, {firstName}!
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here is what is happening with your learning today.
          </p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/dashboard/create">
            <Plus className="h-4 w-4" />
            New Lecture
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Lectures */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Recent Lectures</CardTitle>
              <CardDescription>Your latest AI-generated content</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link href="/dashboard/lectures">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLectures.length === 0 ? (
                <div className="text-center py-6 text-sm text-muted-foreground border border-dashed rounded-lg">
                  No lectures generated yet.
                </div>
              ) : (
                recentLectures.map((lecture) => (
                  <div
                    key={lecture.title}
                    className="flex items-center gap-4 rounded-lg border border-border/50 bg-muted/30 p-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Video className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-foreground">{lecture.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{lecture.subject}</span>
                        <span>-</span>
                        <span>{lecture.duration}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{lecture.date}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent" asChild>
                <Link href="/dashboard/create">
                  <Video className="h-6 w-6 text-primary" />
                  <span>Generate Lecture</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent" asChild>
                <Link href="/dashboard/meetings">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Join Meeting</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent" asChild>
                <Link href="/dashboard/tutor">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>Ask AI Tutor</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent" asChild>
                <Link href="/dashboard/learning">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span>View Progress</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
