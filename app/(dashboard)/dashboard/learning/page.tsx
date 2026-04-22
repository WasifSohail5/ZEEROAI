import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Trophy, Target, Clock, TrendingUp, CheckCircle2, Circle } from "lucide-react"

export const metadata: Metadata = {
  title: "Learning Path - ZEERO AI",
  description: "Track your personalized learning journey",
}

const learningPaths = [
  {
    id: "1",
    name: "Machine Learning Fundamentals",
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    estimatedTime: "4 hours remaining",
    status: "in-progress",
  },
  {
    id: "2",
    name: "Advanced Mathematics",
    progress: 40,
    totalModules: 10,
    completedModules: 4,
    estimatedTime: "6 hours remaining",
    status: "in-progress",
  },
  {
    id: "3",
    name: "Physics Basics",
    progress: 100,
    totalModules: 8,
    completedModules: 8,
    estimatedTime: "Completed",
    status: "completed",
  },
]

const achievements = [
  { name: "First Lecture", description: "Generated your first AI lecture", earned: true },
  { name: "Study Streak", description: "7 days consecutive learning", earned: true },
  { name: "Quick Learner", description: "Complete 5 modules in one day", earned: true },
  { name: "Knowledge Seeker", description: "Ask 50 questions to AI Tutor", earned: false },
]

const weeklyActivity = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.0 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 4.0 },
  { day: "Sun", hours: 2.8 },
]

const maxHours = Math.max(...weeklyActivity.map((d) => d.hours))

export default function LearningPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Learning Path</h1>
        <p className="mt-1 text-muted-foreground">
          Track your progress and continue your personalized learning journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Modules Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">48h</p>
              <p className="text-sm text-muted-foreground">Total Study Time</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">7</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">78%</p>
              <p className="text-sm text-muted-foreground">Goals Achieved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Learning Paths */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground">Your Learning Paths</CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className="rounded-lg border border-border/50 bg-muted/30 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{path.name}</h3>
                      {path.status === "completed" && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {path.completedModules}/{path.totalModules} modules - {path.estimatedTime}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-primary">{path.progress}%</span>
                </div>
                <Progress value={path.progress} className="mt-3 h-2" />
                {path.status === "in-progress" && (
                  <Button size="sm" className="mt-3">
                    Continue
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Your study hours this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end justify-between gap-2">
              {weeklyActivity.map((day) => (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t bg-primary transition-all hover:bg-primary/80"
                    style={{ height: `${(day.hours / maxHours) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-foreground">17.8 hours</p>
              <p className="text-sm text-muted-foreground">Total this week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Trophy className="h-5 w-5 text-primary" />
            Achievements
          </CardTitle>
          <CardDescription>Your learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.name}
                className={`rounded-lg border p-4 ${
                  achievement.earned
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/50 bg-muted/30 opacity-60"
                }`}
              >
                <div className="flex items-center gap-2">
                  {achievement.earned ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <h4 className="font-medium text-foreground">{achievement.name}</h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
