import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Video, Plus, Search, Play, MoreVertical, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "My Lectures - ZEERO AI",
  description: "Manage your AI-generated video lectures",
}

// Demo lectures for display
const demoLectures = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "A comprehensive overview of ML fundamentals, algorithms, and applications.",
    subject: "Computer Science",
    duration: "45:00",
    created_at: "2024-01-20T10:30:00Z",
    thumbnail: null,
  },
  {
    id: "2",
    title: "Quantum Physics Fundamentals",
    description: "Understanding quantum mechanics, wave-particle duality, and quantum states.",
    subject: "Physics",
    duration: "32:15",
    created_at: "2024-01-19T14:00:00Z",
    thumbnail: null,
  },
  {
    id: "3",
    title: "Advanced Calculus: Derivatives",
    description: "Deep dive into derivatives, chain rule, and practical applications.",
    subject: "Mathematics",
    duration: "28:30",
    created_at: "2024-01-18T09:15:00Z",
    thumbnail: null,
  },
  {
    id: "4",
    title: "World War II: Key Events",
    description: "Major battles, turning points, and historical significance.",
    subject: "History",
    duration: "52:00",
    created_at: "2024-01-17T16:45:00Z",
    thumbnail: null,
  },
  {
    id: "5",
    title: "Organic Chemistry Basics",
    description: "Introduction to carbon compounds, functional groups, and reactions.",
    subject: "Chemistry",
    duration: "38:20",
    created_at: "2024-01-16T11:00:00Z",
    thumbnail: null,
  },
  {
    id: "6",
    title: "English Literature: Shakespeare",
    description: "Analysis of Shakespeare's major works and literary techniques.",
    subject: "Literature",
    duration: "41:45",
    created_at: "2024-01-15T13:30:00Z",
    thumbnail: null,
  },
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function Loading() {
  return null
}

export default async function LecturesPage() {
  const demoLectures: any[] = [] // Empty for genuine flow
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">My Lectures</h1>
            <p className="mt-1 text-muted-foreground">
              Manage and watch your AI-generated video lectures
            </p>
          </div>
          <Button className="gap-2" asChild>
            <Link href="/dashboard/create">
              <Plus className="h-4 w-4" />
              New Lecture
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search lectures..." className="bg-muted/50 pl-10" />
          </div>
        </div>

        {/* Lectures Grid */}
        {demoLectures.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg border-dashed">
            <Video className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Lectures Yet</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              You haven't generated any lectures. Create one to get started.
            </p>
            <Button asChild>
              <Link href="/dashboard/create">
                <Plus className="h-4 w-4 mr-2" />
                Generate Lecture
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demoLectures.map((lecture) => (
              <Card
                key={lecture.id}
                className="group overflow-hidden border-border/50 bg-card/50 transition-all hover:border-primary/50"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    {lecture.duration}
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-foreground line-clamp-1">{lecture.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {lecture.description}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">
                    {lecture.subject}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(lecture.created_at)}
                  </span>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}
      </div>
    </Suspense>
  )
}
