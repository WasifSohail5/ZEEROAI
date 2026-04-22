"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"
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

// Animated Counter
const AnimatedCounter = ({ value, isInView }: { value: string; isInView: boolean }) => {
  const numericValue = parseInt(value.replace(/\D/g, ''))
  const suffix = value.replace(/[0-9]/g, '')

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        {isInView && (
          <motion.span
            initial={{ count: 0 }}
            animate={{ count: numericValue }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {({ count }: { count: number }) => Math.floor(count)}
          </motion.span>
        )}
        {suffix}
      </motion.span>
    </motion.span>
  )
}

// 3D Tilting Card
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXValue = ((e.clientY - centerY) / rect.height) * -10
    const rotateYValue = ((e.clientX - centerX) / rect.width) * 10
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
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
    <section ref={ref} className="relative py-24 overflow-hidden" id="about">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </div>

        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Image Side with Parallax */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="relative"
            style={{ y, opacity }}
          >
            <TiltCard className="relative">
              {/* Main Image Card */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 shadow-2xl shadow-primary/20">
                <Image
                  src="/images/about-hero.jpg"
                  alt="ZEERO AI Team"
                  width={700}
                  height={500}
                  className="w-full h-auto"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {/* Floating Stats Card */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="border-0 bg-card/90 backdrop-blur-xl p-6 shadow-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Heart className="h-4 w-4 text-primary" />
                          <p className="text-xs text-muted-foreground">Founded</p>
                        </div>
                        <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          2024
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="h-4 w-4 text-accent" />
                          <p className="text-xs text-muted-foreground">Mission</p>
                        </div>
                        <p className="text-lg font-semibold text-foreground">
                          Education
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-accent p-4 rounded-2xl shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="h-8 w-8 text-white" />
              </motion.div>

              {/* Decorative Dots */}
              <div className="absolute -bottom-8 -left-8 grid grid-cols-4 gap-2 opacity-30">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
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
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="h-4 w-4" />
              <span>About ZEERO AI</span>
            </motion.div>

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Transforming Education Through{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                AI Innovation
              </span>
            </h2>
            
            {/* Description */}
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p className="text-lg">
                <span className="text-foreground font-semibold">ZEERO AI</span> stands for{" "}
                <span className="text-foreground font-medium">
                  Zenith of Enhanced Education with Realtime Optimization
                </span>
                . We're on a mission to revolutionize learning through cutting-edge artificial intelligence.
              </p>

              <p>
                Our platform empowers students worldwide with AI-generated video lectures, 24/7 intelligent tutoring, 
                and personalized learning paths that adapt to individual needs and pace.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm p-4 shadow-lg group">
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
                      value.gradient
                    )} />
                    
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl mb-3 bg-gradient-to-br shadow-lg",
                      value.gradient
                    )}>
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-sm font-bold text-foreground mb-1">
                      {value.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
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
                    "inline-flex h-12 w-12 items-center justify-center rounded-xl mb-2 bg-gradient-to-br",
                    stat.gradient
                  )}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.value} isInView={isInView} />
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full px-8 bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
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