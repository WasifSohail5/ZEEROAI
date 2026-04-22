"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  ArrowRight, 
  Target, 
  Lightbulb, 
  Users2, 
  Rocket,
  Award,
  Globe,
  Heart,
  Zap,
  TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"

const values = [
  {
    icon: Target,
    title: "Mission Driven",
    description: "Democratizing quality education through innovative AI technology",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "Pioneering the future of personalized learning experiences",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Users2,
    title: "Student Focused",
    description: "Every feature designed with learners' success in mind",
    gradient: "from-emerald-500 to-teal-500",
  },
]

const stats = [
  { icon: Users2, value: "10K+", label: "Active Students", gradient: "from-violet-500 to-purple-500" },
  { icon: Globe, value: "50+", label: "Countries", gradient: "from-blue-500 to-cyan-500" },
  { icon: Award, value: "95%", label: "Success Rate", gradient: "from-emerald-500 to-teal-500" },
  { icon: Rocket, value: "24/7", label: "AI Support", gradient: "from-orange-500 to-amber-500" },
]

// ── Fixed AnimatedCounter — no render props, plain useState + useEffect ───────
const AnimatedCounter = ({ value, isInView }: { value: string; isInView: boolean }) => {
  const numericValue = parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/[0-9]/g, "")
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const duration = 2000
    const stepTime = 16
    const steps = duration / stepTime
    const increment = numericValue / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, numericValue])

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {count}{suffix}
    </motion.span>
  )
}

// ── 3D Tilting Card ───────────────────────────────────────────────────────────
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setRotateX(((e.clientY - centerY) / rect.height) * -10)
    setRotateY(((e.clientX - centerX) / rect.width) * 10)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0) }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPreview() {
  const ref = useRef(null)
  const imageRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])

  return (
    <section ref={ref} className="relative overflow-hidden py-24" id="about">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }} />
        </div>
        <motion.div
          className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          animate={{ x: [0, -100, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

          {/* Image Side */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="relative"
            style={{ y, opacity }}
          >
            <TiltCard className="relative">
              <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 shadow-2xl shadow-primary/20">
                <Image
                  src="/images/about-hero.jpg"
                  alt="ZEERO AI Team"
                  width={700}
                  height={500}
                  className="h-auto w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <motion.div
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="border-0 bg-card/90 p-6 shadow-2xl backdrop-blur-xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <Heart className="h-4 w-4 text-primary" />
                          <p className="text-xs text-muted-foreground">Founded</p>
                        </div>
                        <p className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent">
                          2024
                        </p>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-accent" />
                          <p className="text-xs text-muted-foreground">Mission</p>
                        </div>
                        <p className="text-lg font-semibold text-foreground">Education</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                className="absolute -right-4 -top-4 rounded-2xl bg-gradient-to-r from-primary to-accent p-4 shadow-2xl"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="h-8 w-8 text-white" />
              </motion.div>

              <div className="absolute -bottom-8 -left-8 grid grid-cols-4 gap-2 opacity-30">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                  />
                ))}
              </div>
            </TiltCard>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="h-4 w-4" />
              <span>About ZEERO AI</span>
            </motion.div>

            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Transforming Education Through{" "}
              <span className="animate-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text bg-[length:200%_auto] text-transparent">
                AI Innovation
              </span>
            </h2>

            <div className="mb-8 space-y-4 leading-relaxed text-muted-foreground">
              <p className="text-lg">
                <span className="font-semibold text-foreground">ZEERO AI</span> stands for{" "}
                <span className="font-medium text-foreground">
                  Zenith of Enhanced Education with Realtime Optimization
                </span>
                . We're on a mission to revolutionize learning through cutting-edge artificial intelligence.
              </p>
              <p>
                Our platform empowers students worldwide with AI-generated video lectures, 24/7 intelligent
                tutoring, and personalized learning paths that adapt to individual needs and pace.
              </p>
            </div>

            {/* Values */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/80 to-card/40 p-4 shadow-lg backdrop-blur-sm">
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-10",
                      value.gradient
                    )} />
                    <div className={cn(
                      "mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                      value.gradient
                    )}>
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-foreground">{value.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={cn(
                    "mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                    stat.gradient
                  )}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent">
                    <AnimatedCounter value={stat.value} isInView={isInView} />
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent px-8 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
                asChild
              >
                <Link href="/about">
                  <span className="relative z-10 flex items-center gap-2">
                    Discover Our Story
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}