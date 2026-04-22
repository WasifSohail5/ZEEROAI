"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

// Same Logo Component
const ZeeroLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2" />
    <path
      d="M30 70 L45 45 L60 60 L75 35 L90 55"
      stroke="url(#gradient1)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M35 80 L50 60 L70 75 L85 65"
      stroke="url(#gradient2)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.7"
    />
    <circle cx="45" cy="45" r="4" fill="currentColor" className="text-primary" />
    <circle cx="75" cy="35" r="4" fill="currentColor" className="text-accent" />
    <circle cx="60" cy="60" r="5" fill="currentColor" className="text-primary" />
    <defs>
      <linearGradient id="gradient1" x1="30" y1="35" x2="90" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="oklch(0.55 0.25 264)" />
        <stop offset="100%" stopColor="oklch(0.75 0.15 195)" />
      </linearGradient>
      <linearGradient id="gradient2" x1="35" y1="60" x2="85" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="oklch(0.70 0.20 264)" />
        <stop offset="100%" stopColor="oklch(0.65 0.20 150)" />
      </linearGradient>
    </defs>
  </svg>
)

// Floating Orbs Background
const FloatingOrb = ({ delay = 0, duration = 20, size, pos }: { delay?: number; duration?: number; size: number; pos: {x: number, y: number} }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${pos.x}%`,
      top: `${pos.y}%`,
    }}
    animate={{
      x: [0, Math.random() * 100 - 50, 0],
      y: [0, Math.random() * 100 - 50, 0],
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
)

// Grid Pattern
const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
    <div className="absolute inset-0" style={{
      backgroundImage: `
        linear-gradient(to right, currentColor 1px, transparent 1px),
        linear-gradient(to bottom, currentColor 1px, transparent 1px)
      `,
      backgroundSize: '80px 80px',
    }} />
  </div>
)

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        {/* Grid Pattern */}
        <GridPattern />
        
        {/* Floating Orbs */}
        <FloatingOrb delay={0} duration={20} size={350} pos={{x: 80, y: 20}} />
        <FloatingOrb delay={5} duration={25} size={250} pos={{x: 20, y: 60}} />
        <FloatingOrb delay={10} duration={30} size={400} pos={{x: 60, y: 80}} />
      </div>

      {/* Content */}
      <motion.div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{ y, opacity }}
      >
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
            className="mb-8 sm:mb-10"
          >
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ZeeroLogo className="h-24 w-24 sm:h-28 sm:w-28 lg:h-36 lg:w-36 text-primary drop-shadow-2xl" />
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Education Platform</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% auto",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center", "0% center"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ZEERO AI
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-foreground/90 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Zenith of Enhanced Education with Realtime Optimization
          </motion.p>

          {/* Description */}
          <motion.p
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Climb your learning journey. Reach new heights with AI-powered education designed to help you reach your peak potential.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
              asChild
            >
              <Link href="/auth/sign-up">
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </Link>
            </Button>
          </motion.div>

          {/* Stats or Social Proof */}
          <motion.div
            className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            {[
              { value: "10K+", label: "Active Students" },
              { value: "50+", label: "AI Features" },
              { value: "24/7", label: "AI Support" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex flex-col"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
              >
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}