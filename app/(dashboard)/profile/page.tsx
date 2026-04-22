import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Edit, Video, Clock, Trophy, Calendar, BookOpen, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Profile - ZEERO AI",
  description: "View and manage your ZEERO AI profile",
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const firstName = user?.user_metadata?.first_name || "User"
  const lastName = user?.user_metadata?.last_name || ""
  const email = user?.email || ""
  const initials = firstName[0] + (lastName?.[0] || "")
  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently"

  const stats = [
    { label: "Lectures Created", value: "12", icon: Video },
    { label: "Study Hours", value: "48", icon: Clock },
    { label: "Achievements", value: "8", icon: Trophy },
    { label: "Current Streak", value: "7 days", icon: Calendar },
  ]

  const recentActivity = [
    { type: "lecture", title: "Generated 'Intro to ML' lecture", time: "2 hours ago" },
    { type: "achievement", title: "Earned 'Quick Learner' badge", time: "Yesterday" },
    { type: "course", title: "Completed Physics Basics course", time: "2 days ago" },
    { type: "lecture", title: "Generated 'Quantum Physics' lecture", time: "3 days ago" },
  ]

  const badges = [
    { name: "Early Adopter", description: "Joined during beta" },
    { name: "Quick Learner", description: "Complete 5 modules in one day" },
    { name: "Knowledge Seeker", description: "Asked 50+ questions" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Profile</h1>
        <p className="mt-1 text-muted-foreground">
          View your profile and learning statistics
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="border-border/50 bg-card/50 lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-2xl font-semibold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                {firstName} {lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{email}</p>
              <Badge variant="secondary" className="mt-2">
                Pro Member
              </Badge>
              <p className="mt-4 text-xs text-muted-foreground">
                Member since {joinDate}
              </p>
              <Button variant="outline" className="mt-4 w-full gap-2 bg-transparent" asChild>
                <Link href="/settings">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Activity */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription>Your latest actions on ZEERO AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {activity.type === "lecture" && <Video className="h-5 w-5" />}
                      {activity.type === "achievement" && <Award className="h-5 w-5" />}
                      {activity.type === "course" && <BookOpen className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Trophy className="h-5 w-5 text-primary" />
                Badges & Achievements
              </CardTitle>
              <CardDescription>Your earned badges and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {badges.map((badge) => (
                  <div
                    key={badge.name}
                    className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center"
                  >
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Award className="h-6 w-6" />
                    </div>
                    <h4 className="font-medium text-foreground">{badge.name}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Summary */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-foreground">Learning Summary</CardTitle>
              <CardDescription>Your overall progress on ZEERO AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">24</p>
                  <p className="mt-1 text-sm text-muted-foreground">Modules Completed</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">156</p>
                  <p className="mt-1 text-sm text-muted-foreground">Questions Asked</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">78%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Avg. Quiz Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
