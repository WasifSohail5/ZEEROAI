"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Play, MoreVertical, Calendar, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function LectureList({
  initialLectures,
  userId
}: {
  initialLectures: any[]
  userId?: string
}) {
  const [lectures, setLectures] = useState(initialLectures)

  useEffect(() => {
    if (!userId) return

    const supabase = createClient()

    const channel = supabase
      .channel('realtime_lectures')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'lectures', filter: `user_id=eq.${userId}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setLectures((prev) => [payload.new, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setLectures((prev) =>
              prev.map((lecture) =>
                lecture.id === payload.new.id ? payload.new : lecture
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setLectures((prev) =>
              prev.filter((lecture) => lecture.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  if (lectures.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg border-dashed">
        <Video className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No Lectures Yet</h3>
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          You haven't generated any lectures. Create one to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {lectures.map((lecture) => {
        const isReady = lecture.status === "ready"
        const imageUrl = lecture.image_urls?.[0] || lecture.thumbnail_url

        return (
          <Card
            key={lecture.id}
            className="group overflow-hidden border-border/50 bg-card/50 transition-all hover:border-primary/50"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-muted border-b border-border/50 overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt="thumbnail" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="h-12 w-12 text-muted-foreground/30" />
                </div>
              )}
              
              {/* Play / Processing Overlay */}
              <div className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity ${!isReady ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {isReady ? (
                  <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full" asChild>
                    <Link href={lecture.video_url || "#"} target="_blank">
                      <Play className="h-6 w-6" />
                    </Link>
                  </Button>
                ) : (
                  <div className="flex flex-col items-center text-white space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="text-xs font-semibold uppercase tracking-wider backdrop-blur-sm bg-black/60 px-3 py-1.5 rounded-full border border-white/10 shadow-xl">
                      Processing video...
                    </span>
                  </div>
                )}
              </div>
              
              {isReady && (
                <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                  Ready to watch
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-foreground line-clamp-1">{lecture.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {lecture.description || "AI-generated video lecture"}
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
                    {isReady && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href={lecture.video_url || "#"} target="_blank">Watch</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={lecture.video_url || "#"} download>Download</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                {lecture.subject && (
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">
                    {lecture.subject}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(lecture.created_at)}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
