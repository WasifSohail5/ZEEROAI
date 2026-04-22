"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Play } from "lucide-react"
import Link from "next/link"

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: {
      x: number; y: number; vx: number; vy: number
      r: number; alpha: number; color: string
    }[] = []

    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#6366f1"]
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.4 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = "#3b82f6"
            ctx.globalAlpha = (1 - dist / 120) * 0.08
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />
}

function ZenithMark() {
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none">
      <defs>
        <linearGradient id="zm1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="zm2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <line x1="0" y1="56" x2="72" y2="56" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M4 56 L36 8 L68 56" stroke="url(#zm1)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M16 56 L36 28 L56 56" stroke="url(#zm2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="36" cy="8" r="4" fill="#8b5cf6" />
      <circle cx="36" cy="8" r="10" fill="#8b5cf6" opacity="0.18" />
    </svg>
  )
}

const words = ["Generate.", "Learn.", "Grow.", "Excel."]

function CyclingWord() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let i = 0
    const el = ref.current
    if (!el) return
    el.textContent = words[0]
    const cycle = setInterval(() => {
      i = (i + 1) % words.length
      el.style.opacity = "0"
      el.style.transform = "translateY(10px)"
      setTimeout(() => {
        if (!el) return
        el.textContent = words[i]
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, 300)
    }, 2000)
    return () => clearInterval(cycle)
  }, [])

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    />
  )
}

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 120])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <ParticleCanvas />

      <div
        className="pointer-events-none absolute left-1/4 top-1/4 rounded-full opacity-[0.07] blur-3xl"
        style={{ width: 600, height: 600, background: "radial-gradient(circle, #3b82f6 0%, #8b5cf6 50%, transparent 80%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 rounded-full opacity-[0.05] blur-3xl"
        style={{ width: 400, height: 400, background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        {/* Symbol */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ZenithMark />
          </motion.div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
            style={{
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.2)",
              color: "#a5b4fc",
              letterSpacing: "0.04em",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Education Platform
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ lineHeight: 1.05, color: "hsl(var(--foreground))" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Learn Without{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Limits
          </span>
        </motion.h1>

        {/* Cycling subheading */}
        <motion.div
          className="mb-6 text-2xl font-semibold sm:text-3xl"
          style={{ color: "hsl(var(--muted-foreground))" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          <CyclingWord />{" "}
          <span style={{ color: "hsl(var(--foreground))", opacity: 0.8 }}>
            with AI that understands you.
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed sm:text-lg"
          style={{ color: "hsl(var(--muted-foreground))", opacity: 0.8 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          One prompt generates a complete video lecture — with verified sources, live Q&A,
          and a quiz at the end. Education the way it should be.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mb-16 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full px-8 py-6 text-base font-semibold"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              border: "none",
              boxShadow: "0 0 40px rgba(99,102,241,0.3)",
            }}
            asChild
          >
            <Link href="/auth/sign-up">
              <span className="relative z-10 flex items-center gap-2">
                Start for free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="group flex items-center gap-2 rounded-full px-6 py-6 text-base"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              color: "hsl(var(--muted-foreground))",
            }}
            asChild
          >
            <Link href="#features">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "rgba(99,102,241,0.15)" }}
              >
                <Play className="h-3.5 w-3.5 fill-current" style={{ color: "#818cf8" }} />
              </div>
              See how it works
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mb-20 flex flex-wrap items-center justify-center gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {[
            { value: "10K+", label: "Active students" },
            { value: "50+", label: "AI features" },
            { value: "24/7", label: "Always available" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              <span
                className="text-3xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </span>
              <span className="mt-1 text-xs" style={{ color: "hsl(var(--muted-foreground))", opacity: 0.6 }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              border: "1px solid rgba(99,102,241,0.2)",
              background: "rgba(255,255,255,0.02)",
              boxShadow: "0 0 80px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#ef4444", opacity: 0.6 }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#f59e0b", opacity: 0.6 }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#10b981", opacity: 0.6 }} />
              </div>
              <div
                className="mx-auto rounded-full px-12 py-1 text-xs"
                style={{ background: "rgba(255,255,255,0.04)", color: "hsl(var(--muted-foreground))", opacity: 0.5 }}
              >
                zeeroai.com/dashboard
              </div>
            </div>

            {/* Mockup content */}
            <div className="grid grid-cols-3 gap-3 p-5">
              <div className="col-span-1 flex flex-col gap-2">
                <div className="h-6 w-3/4 rounded" style={{ background: "rgba(99,102,241,0.2)" }} />
                {["Dashboard", "My Lectures", "My Courses", "AI Tutor"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ background: "rgba(99,102,241,0.15)" }} />
                    <div className="h-2.5 rounded" style={{ background: "rgba(255,255,255,0.06)", width: "60%" }} />
                  </div>
                ))}
              </div>
              <div className="col-span-2 flex flex-col gap-3">
                <div className="h-4 w-1/2 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />
                <div className="grid grid-cols-2 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="mb-2 h-2 w-1/2 rounded" style={{ background: "rgba(99,102,241,0.3)" }} />
                      <div className="h-4 w-3/4 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />
                    </div>
                  ))}
                </div>
                <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 flex-1 rounded" style={{ background: "rgba(99,102,241,0.08)" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
              style={{ background: "linear-gradient(to top, rgba(9,9,18,0.9), transparent)" }}
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}