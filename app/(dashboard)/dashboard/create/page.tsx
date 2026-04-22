"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Sparkles, Video, Wand2 } from "lucide-react"

const subjects = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Literature",
  "Economics",
  "Psychology",
  "Other",
]

const durations = [
  { value: "short", label: "Short (5-10 min)" },
  { value: "medium", label: "Medium (15-30 min)" },
  { value: "long", label: "Long (45-60 min)" },
]

const styles = [
  { value: "cyber", label: "Cyber" },
  { value: "history", label: "History" },
  { value: "swiss", label: "Swiss / High-Contrast" },
  { value: "brutalist", label: "Brutalist / Raw" },
  { value: "magazine", label: "Magazine / Editorial" },
  { value: "corporate", label: "Corporate / Professional" },
]

export default function CreateLecturePage() {
  const [formData, setFormData] = useState({
    title: "",
    prompt: "",
    subject: "",
    duration: "",
    style: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    
    if (!formData.title || !formData.prompt) {
      toast.error("Please fill in all required fields (title and prompt)")
      return
    }

    setIsGenerating(true)

    try {
      // Split prompt by commas or newlines to act as sections, or fallback to fixed ones
      let sections = formData.prompt.split(',').map(s => s.trim()).filter(Boolean)
      if (sections.length < 2) {
        sections = [formData.title + " Introduction", "Core Concepts", "Conclusion"]
      }

      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8001"
      const response = await fetch(`${backendUrl}/api/generate-lecture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: formData.title,
          sections: sections.slice(0, 4), // limit to max 4 sections to avoid very long gens
          template_name: formData.style || "swiss",
          user_id: user?.id
        }),
      });

      if (!response.ok) {
         throw new Error("Failed to start lecture generation on the backend.")
      }

      toast.success("Lecture generation started! Expected time to be ready: ~10 minutes.", { duration: 10000 })
      router.push("/dashboard/lectures")
    } catch (error) {
      console.error(error)
      toast.error("An error occurred while generating the lecture.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Generate New Lecture</h1>
        <p className="mt-1 text-muted-foreground">
          Describe what you want to learn and our AI will create a personalized video lecture
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6">
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              Lecture Details
            </CardTitle>
            <CardDescription>
              Provide information about the lecture you want to generate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Lecture Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to Neural Networks"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-input"
              />
            </div>

            {/* Prompt */}
            <div className="space-y-2">
              <Label htmlFor="prompt">Describe Your Topic *</Label>
              <Textarea
                id="prompt"
                placeholder="Describe what you want to learn in detail. The more specific you are, the better the generated content will be. For example: 'Explain how neural networks work, including the architecture of neurons, layers, activation functions, and backpropagation. Include practical examples and visual diagrams.'"
                value={formData.prompt}
                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                className="min-h-[150px] bg-input"
              />
              <p className="text-xs text-muted-foreground">
                Tip: Be specific about what concepts you want covered and any particular focus areas
              </p>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Category *</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => setFormData({ ...formData, subject: value })}
              >
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject.toLowerCase()}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Preferred Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Style */}
              <div className="space-y-2">
                <Label htmlFor="style">Presentation Style</Label>
                <Select
                  value={formData.style}
                  onValueChange={(value) => setFormData({ ...formData, style: value })}
                >
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Video className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">AI Video Generation</h3>
              <p className="text-sm text-muted-foreground">
                Our AI will create a comprehensive video lecture with visuals, animations, and narration based on your input.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isGenerating} className="gap-2">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate Lecture
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
