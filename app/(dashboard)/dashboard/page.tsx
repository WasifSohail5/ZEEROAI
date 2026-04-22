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

  const firstName = user?.user_metadata?.first_name || user?.email?.split("@")[0] || "there"

  // ── Fetch real data from Supabase ──────────────────────────────────────────

  // Total lectures count
  const { count: totalLectures } = await supabase
    .from("lectures")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id)

  // Lectures created this week
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const { count: weeklyLectures } = await supabase
    .from("lectures")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id)
    .gte("created_at", oneWeekAgo.toISOString())

  // Recent 3 lectures for the card
  const { data: recentLectures } = await supabase
    .from("lectures")
    .select("id, title, status, created_at, image_urls")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(3)

  // ── Stats ──────────────────────────────────────────────────────────────────
  const stats = [
    {
      name: "Lectures Created",
      value: totalLectures ?? 0,
      icon: Video,
      change: `${weeklyLectures ?? 0} this week`,
    },
    {
      name: "Study Hours",
      value: "—",
      icon: Clock,
      change: "Coming soon",
    },
    {
      name: "Meeting Rooms",
      value: "—",
      icon: Users,
      change: "Coming soon",
    },
    {
      name: "Progress",
      value: "—",
      icon: TrendingUp,
      change: "Coming soon",
    },
  ]

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
              {!recentLectures || recentLectures.length === 0 ? (
                <div className="rounded-lg border border-dashed py-6 text-center text-sm text-muted-foreground">
                  No lectures generated yet.
                </div>
              ) : (
                recentLectures.map((lecture) => {
                  const thumbnail =
                    Array.isArray(lecture.image_urls) && lecture.image_urls.length > 0
                      ? lecture.image_urls[0]
                      : null

                  const date = new Date(lecture.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })

                  return (
                    <Link
                      key={lecture.id}
                      href={`/dashboard/lectures`}
                      className="flex items-center gap-4 rounded-lg border border-border/50 bg-muted/30 p-4 transition-colors hover:border-primary/40 hover:bg-muted/50"
                    >
                      {/* Thumbnail or fallback */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-primary">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={lecture.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Video className="h-6 w-6" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1 overflow-hidden">
                        <p className="truncate font-medium text-foreground">
                          {lecture.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {/* Status badge */}
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              lecture.status === "ready"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {lecture.status === "ready" ? "Ready" : "Processing"}
                          </span>
                          <span>{date}</span>
                        </div>
                      </div>

                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  )
                })
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
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 bg-transparent p-4"
                asChild
              >
                <Link href="/dashboard/create">
                  <Video className="h-6 w-6 text-primary" />
                  <span>Generate Lecture</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 bg-transparent p-4"
                asChild
              >
                <Link href="/dashboard/meetings">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Join Meeting</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 bg-transparent p-4"
                asChild
              >
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
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 bg-transparent p-4"
                asChild
              >
                <Link href="/dashboard/lectures">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span>My Lectures</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}