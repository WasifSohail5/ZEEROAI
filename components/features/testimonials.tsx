"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    content: "ZEERO AI has completely transformed how I study. The AI-generated video lectures are incredibly detailed and easy to follow. I have improved my grades significantly!",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Medical Student",
    content: "The personalized learning paths are a game-changer. The AI understands my weak areas and creates content specifically to help me improve. Highly recommended!",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "MBA Candidate",
    content: "Being able to get instant help from the AI tutor at 2 AM when I am studying for exams is invaluable. It is like having a personal tutor available 24/7.",
    rating: 5,
    initials: "ER",
  },
  {
    name: "David Park",
    role: "High School Teacher",
    content: "I use ZEERO AI to create supplementary materials for my students. The quality of the generated content is impressive and saves me hours of preparation time.",
    rating: 5,
    initials: "DP",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by Learners Worldwide
          </h2>
          <p className="mt-4 text-muted-foreground">
            See what students and educators are saying about ZEERO AI
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
