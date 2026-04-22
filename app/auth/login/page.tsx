"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff, ArrowRight, GraduationCap, TrendingUp, Clock } from "lucide-react"
import { motion } from "framer-motion"

function ParticleCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4"]
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = []
    for (let i = 0; i < 55; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, r: Math.random() * 1.3 + 0.3, alpha: Math.random() * 0.3 + 0.05, color: colors[Math.floor(Math.random() * colors.length)] })
    }
    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = "#6366f1"; ctx.globalAlpha = (1 - dist / 100) * 0.09; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])
  return <canvas ref={canvasRef} className={className} />
}

function ZenithMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 0.83)} viewBox="0 0 72 60" fill="none">
      <defs>
        <linearGradient id="zmgl" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M4 56 L36 8 L68 56" stroke="url(#zmgl)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M16 56 L36 28 L56 56" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.35" />
      <circle cx="36" cy="8" r="4" fill="#8b5cf6" />
      <circle cx="36" cy="8" r="9" fill="#8b5cf6" opacity="0.2" />
    </svg>
  )
}

function ProgressRing({ percent, color, size = 72 }: { percent: number; color: string; size?: number }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (circ * percent) / 100 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
      />
    </svg>
  )
}

function StatCard({ icon: Icon, label, value, color, delay }: { icon: any; label: string; value: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ flex: 1, padding: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, display: "flex", flexDirection: "column", gap: 8 }}
    >
      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon style={{ width: 15, height: 15, color }} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, background: `linear-gradient(90deg, ${color}, #8b5cf6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>{label}</div>
    </motion.div>
  )
}

const welcomeMessages = ["Welcome back, learner.", "Your lectures are waiting.", "Keep climbing.", "Today is a good day to learn."]

function CyclingMessage() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIdx((i) => (i + 1) % welcomeMessages.length); setVisible(true) }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  return (
    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 8, fontStyle: "italic", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>
      {welcomeMessages[idx]}
    </p>
  )
}

// Bar data with explicit pixel heights
const bars = [
  { day: "M", h: 31, color: "#3b82f6" },
  { day: "T", h: 18, color: "#6366f1" },
  { day: "W", h: 42, color: "#8b5cf6" },
  { day: "T", h: 26, color: "#6366f1" },
  { day: "F", h: 36, color: "#3b82f6" },
  { day: "S", h: 47, color: "#8b5cf6" },
  { day: "S", h: 21, color: "#06b6d4" },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { toast.error(error.message); return }
      toast.success("Welcome back!")
      router.push("/dashboard")
      router.refresh()
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const inp = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "hsl(var(--foreground))", borderRadius: "10px", transition: "border-color 0.2s, background 0.2s" }
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)" }
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)" }

  return (
    <div className="flex min-h-screen bg-background">

      {/* ── Left visual panel — desktop only ── */}
      <div
        className="hidden lg:flex lg:w-[52%]"
        style={{ position: "relative", overflow: "hidden", background: "linear-gradient(145deg, #06060f 0%, #0d0d20 60%, #060d14 100%)", borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        <ParticleCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-55" />

        <div style={{ position: "absolute", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", top: "40%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", bottom: "15%", right: "5%", pointerEvents: "none" }} />

        {/* Brand */}
        <div style={{ position: "absolute", top: 32, left: 40, zIndex: 10, display: "flex", alignItems: "center", gap: 10 }}>
          <ZenithMark size={28} />
          <span style={{ fontSize: 15, fontWeight: 700, background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ZEERO AI</span>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 48px 48px", position: "relative", zIndex: 2 }}>

          {/* Progress rings + zenith */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", width: 160, height: 160, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <ProgressRing percent={78} color="#3b82f6" size={160} />
            </div>
            <div style={{ position: "absolute", top: 16, left: 16 }}>
              <ProgressRing percent={54} color="#8b5cf6" size={128} />
            </div>
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative", zIndex: 2 }}
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.04, 0.12] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ position: "absolute", inset: -30, borderRadius: "50%", background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
              />
              <ZenithMark size={64} />
            </motion.div>
          </motion.div>

          {/* Ring labels */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            {[{ color: "#3b82f6", label: "Lectures", val: "78%" }, { color: "#8b5cf6", label: "Quizzes", val: "54%" }].map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{r.label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: r.color }}>{r.val}</span>
              </div>
            ))}
          </motion.div>

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "white", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Continue your{" "}
              <span style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>journey</span>
            </h2>
            <CyclingMessage />
          </motion.div>

          {/* Stat cards */}
          <div style={{ display: "flex", gap: 10, width: "100%", maxWidth: 340, marginBottom: 16 }}>
            <StatCard icon={GraduationCap} label="Lectures completed" value="24" color="#3b82f6" delay={0.8} />
            <StatCard icon={TrendingUp} label="Avg. progress" value="+42%" color="#8b5cf6" delay={0.95} />
            <StatCard icon={Clock} label="Study hours" value="18h" color="#06b6d4" delay={1.1} />
          </div>

          {/* Bar chart — fixed with pixel heights */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            style={{ width: "100%", maxWidth: 340, padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}
          >
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Weekly activity</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 52 }}>
              {bars.map((bar, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: bar.h }}
                    transition={{ delay: 1.4 + i * 0.07, duration: 0.7, ease: "easeOut" }}
                    style={{ width: "100%", background: `${bar.color}65`, borderRadius: 4 }}
                  />
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", lineHeight: 1 }}>{bar.day}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right form panel — full width on mobile, 48% on desktop ── */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[48%]">
        <motion.div
          className="mx-auto w-full max-w-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mobile logo — only shows on mobile */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <ZenithMark size={28} />
            <span style={{ fontSize: 15, fontWeight: 700, background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ZEERO AI</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>Welcome back</h1>
            <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Continue your learning journey</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Email address</Label>
              <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={inp} onFocus={onFocus} onBlur={onBlur} />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Password</Label>
                <Link href="/auth/forgot-password" className="text-xs transition-opacity hover:opacity-80" style={{ color: "#818cf8" }}>Forgot password?</Link>
              </div>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ ...inp, paddingRight: "2.5rem" }} onFocus={onFocus} onBlur={onBlur} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 cursor-pointer rounded accent-indigo-500" />
              <Label htmlFor="rememberMe" className="cursor-pointer text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Remember me for 30 days</Label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative mt-2 w-full overflow-hidden rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", boxShadow: "0 0 30px rgba(99,102,241,0.2)" }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : <>Sign in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
              </span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }} />
            </button>

            <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-xs" style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)", color: "#34d399" }}>
              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#34d399" }} />
              Secure login with industry-standard encryption
            </div>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            New to ZEERO AI?{" "}
            <Link href="/auth/sign-up" className="font-semibold transition-opacity hover:opacity-80" style={{ color: "#818cf8" }}>Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}