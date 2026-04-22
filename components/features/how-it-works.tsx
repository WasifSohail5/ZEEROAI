"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Sign Up & Set Goals",
    description: "Create your free account and tell us about your learning objectives. Our AI will personalize your experience from day one.",
  },
  {
    number: "02",
    title: "Enter Your Topic",
    description: "Simply type in what you want to learn. It can be as simple as 'Explain quantum physics' or as specific as 'Advanced calculus derivatives'.",
  },
  {
    number: "03",
    title: "AI Generates Content",
    description: "Our advanced AI processes your request and generates comprehensive video lectures, study materials, and practice questions.",
  },
  {
    number: "04",
    title: "Learn & Interact",
    description: "Watch your personalized videos, ask questions to the AI tutor, join study groups, and track your progress in real-time.",
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="bg-muted/30 py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How ZEERO AI Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get started in minutes and transform the way you learn
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col items-center gap-8 lg:flex-row ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <div
                    className={`inline-block rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm ${
                      index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
                    }`}
                  >
                    <span className="text-4xl font-bold text-primary/30">{step.number}</span>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 max-w-md text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground">
                  <span className="font-bold">{index + 1}</span>
                </div>

                {/* Spacer */}
                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
