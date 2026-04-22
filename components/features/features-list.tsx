"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Video, Brain, Users, GraduationCap, Sparkles, BarChart3, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Video,
    title: "AI Video Lecture Generation",
    description: "Transform any text prompt into comprehensive video lectures. Our AI generates professional-quality educational content with visuals, animations, and narration tailored to your subject matter.",
    highlights: ["Text-to-video conversion", "Multiple presentation styles", "Auto-generated visuals", "Professional voiceovers"],
    image: "/images/features/video-generation.jpg",
    href: "/features/video-generation",
    reverse: false,
  },
  {
    icon: Brain,
    title: "24/7 AI Tutor Assistant",
    description: "Get instant help anytime with our intelligent AI tutor. Ask questions, request explanations, and receive personalized guidance on any topic, any time of day or night.",
    highlights: ["Instant responses", "Multi-subject expertise", "Concept explanations", "Practice problems"],
    image: "/images/features/ai-tutor.jpg",
    href: "/features/ai-tutor",
    reverse: true,
  },
  {
    icon: Users,
    title: "Virtual Meeting Rooms",
    description: "Connect with peers, tutors, and study groups in immersive virtual classrooms. Real-time collaboration, screen sharing, and interactive whiteboards make remote learning feel personal.",
    highlights: ["HD video conferencing", "Interactive whiteboard", "Screen sharing", "Breakout rooms"],
    image: "/images/features/meeting-room.jpg",
    href: "/features/meeting-rooms",
    reverse: false,
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning Paths",
    description: "Our adaptive AI analyzes your learning style, pace, and preferences to create customized educational journeys. Every student gets a unique path optimized for their success.",
    highlights: ["Adaptive difficulty", "Learning style detection", "Progress tracking", "Smart recommendations"],
    image: "/images/features/learning-path.jpg",
    href: "/features/learning-paths",
    reverse: true,
  },
]

const additionalFeatures = [
  {
    icon: Sparkles,
    title: "Smart Content Curation",
    description: "AI-curated learning materials based on your goals and progress.",
    href: "/features/smart-content",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track your learning progress with detailed insights and metrics.",
    href: "/features/analytics",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col items-center gap-12 py-16 lg:flex-row ${
        feature.reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1 space-y-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <feature.icon className="h-7 w-7" />
        </div>
        <h3 className="text-2xl font-bold text-foreground sm:text-3xl">{feature.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
        <ul className="grid grid-cols-2 gap-3">
          {feature.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {highlight}
            </li>
          ))}
        </ul>
        <Button asChild>
          <Link href={feature.href}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="flex-1">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-2xl shadow-primary/10">
          <Image
            src={feature.image || "/placeholder.svg"}
            alt={feature.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturesList() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Main features */}
        <div className="divide-y divide-border">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Additional features grid */}
        <div className="mt-24">
          <h2 className="mb-12 text-center text-2xl font-bold text-foreground sm:text-3xl">
            And Much More...
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
            {additionalFeatures.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-lg dark:border-border/50 dark:bg-card/50 dark:backdrop-blur-sm dark:hover:bg-card/80"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
