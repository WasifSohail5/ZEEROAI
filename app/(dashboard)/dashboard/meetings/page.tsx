import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Plus, Video, Calendar, Clock, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export const metadata: Metadata = {
  title: "Meeting Rooms - ZEERO AI",
  description: "Virtual meeting rooms for collaborative learning",
}

const activeMeetings = [
  {
    id: "1",
    name: "ML Study Group",
    host: "Alex Thompson",
    participants: 5,
    maxParticipants: 10,
    startedAt: "30 min ago",
    topic: "Neural Networks Deep Dive",
  },
  {
    id: "2",
    name: "Physics Tutoring",
    host: "Dr. Sarah Kim",
    participants: 3,
    maxParticipants: 5,
    startedAt: "15 min ago",
    topic: "Quantum Mechanics Q&A",
  },
]

const scheduledMeetings = [
  {
    id: "3",
    name: "Calculus Review Session",
    host: "Prof. James Wilson",
    date: "Tomorrow, 3:00 PM",
    duration: "1 hour",
    participants: 8,
  },
  {
    id: "4",
    name: "History Discussion Group",
    host: "Emily Rodriguez",
    date: "Jan 25, 10:00 AM",
    duration: "45 min",
    participants: 4,
  },
]

export default function MeetingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Meeting Rooms</h1>
          <p className="mt-1 text-muted-foreground">
            Join or create virtual study rooms for collaborative learning
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ExternalLink className="h-4 w-4" />
            Join with Code
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Room
          </Button>
        </div>
      </div>

      {/* Quick Join */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row">
          <Input placeholder="Enter meeting code..." className="flex-1 bg-input" />
          <Button className="gap-2">
            <Video className="h-4 w-4" />
            Join Meeting
          </Button>
        </CardContent>
      </Card>

      {/* Active Meetings */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Active Now</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {activeMeetings.map((meeting) => (
            <Card
              key={meeting.id}
              className="border-border/50 bg-card/50 transition-all hover:border-primary/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-foreground">{meeting.name}</CardTitle>
                    <CardDescription>Hosted by {meeting.host}</CardDescription>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Live
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Topic: {meeting.topic}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(meeting.participants, 3) }).map((_, i) => (
                        <Avatar key={i} className="h-8 w-8 border-2 border-card">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">
                            U{i + 1}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {meeting.participants}/{meeting.maxParticipants}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{meeting.startedAt}</span>
                </div>
                <Button className="w-full gap-2">
                  <Video className="h-4 w-4" />
                  Join Room
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Scheduled Meetings */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Scheduled</h2>
        <div className="space-y-3">
          {scheduledMeetings.map((meeting) => (
            <Card
              key={meeting.id}
              className="border-border/50 bg-card/50 transition-all hover:border-primary/50"
            >
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{meeting.name}</h3>
                    <p className="text-sm text-muted-foreground">Hosted by {meeting.host}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {meeting.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {meeting.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {meeting.participants} registered
                  </span>
                </div>
                <Button variant="outline">Set Reminder</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
