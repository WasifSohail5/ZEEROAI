"use client"

import { motion, useScroll, useTransform } from "framer-motion"
// import { ZeeroLogo } from "./ZeeroLogo"
import { Sparkles, ArrowDown } from "lucide-react"

export default function AboutHero() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const y = useTransform(scrollY, [0, 400], [0, 80])

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }} 
          />
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
          animate={{ x: [0, -90, 0], y: [0, 70, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo with floating animation */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="mx-auto mb-8 flex justify-center"
          >
            <motion.div
              animate={{ y: [-12, 12, -12] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* <ZeeroLogo className="h-28 w-28 text-primary drop-shadow-2xl" /> */}
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4" />
            ESTABLISHED 2024 • PAKISTAN
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            We are redefining<br />
            the future of{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              learning
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            ZEERO AI stands for <strong className="text-foreground">Zenith of Enhanced Education with Realtime Optimization</strong>.
            We build intelligent systems that adapt to every learner’s unique journey.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            style={{ opacity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs tracking-widest">SCROLL TO EXPLORE</span>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}