"use client"

import React from "react"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"
import { Users, Video, Award, HeadphonesIcon } from "lucide-react"

interface StatProps {
  value: number
  suffix: string
  label: string
  icon: React.ElementType
  duration?: number
}

function AnimatedStat({ value, suffix, label, icon: Icon, duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="group relative text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
        <Icon className="h-8 w-8" />
      </div>
      <div className="text-4xl font-bold text-foreground sm:text-5xl">
        {count.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="mt-2 text-muted-foreground">{label}</p>
    </div>
  )
}

const stats = [
  { value: 10, suffix: "K+", label: "Active Students", icon: Users },
  { value: 500, suffix: "+", label: "Video Lectures", icon: Video },
  { value: 98, suffix: "%", label: "Satisfaction Rate", icon: Award },
  { value: 24, suffix: "/7", label: "AI Support", icon: HeadphonesIcon },
]

export default function AnimatedStats() {
  return (
    <section className="relative py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
