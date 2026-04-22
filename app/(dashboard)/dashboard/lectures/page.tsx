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
import { createClient } from "@/lib/supabase/server"
import { LectureList } from "./lecture-list"

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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: lectures } = await supabase
    .from("lectures")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  const userLectures = lectures || []

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

        <LectureList initialLectures={userLectures} userId={user?.id} />
      </div>
    </Suspense>
  )
}
