"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff, Check, ArrowRight, Video, Brain, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.4 + 0.3, alpha: Math.random() * 0.35 + 0.06, color: colors[Math.floor(Math.random() * colors.length)] })
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
            ctx.strokeStyle = "#6366f1"; ctx.globalAlpha = (1 - dist / 100) * 0.1; ctx.lineWidth = 0.5; ctx.stroke()
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
        <linearGradient id="zmgs" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M4 56 L36 8 L68 56" stroke="url(#zmgs)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M16 56 L36 28 L56 56" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.35" />
      <circle cx="36" cy="8" r="4" fill="#8b5cf6" />
      <circle cx="36" cy="8" r="9" fill="#8b5cf6" opacity="0.2" />
    </svg>
  )
}

const featureCards = [
  { icon: Video, label: "AI Lecture", desc: "Neural Networks 101", color: "#3b82f6", progress: 72 },
  { icon: Brain, label: "Live Q&A", desc: "Ask mid-lecture, get instant answers", color: "#8b5cf6", progress: null },
  { icon: Zap, label: "Quiz Ready", desc: "3 questions — test your knowledge", color: "#06b6d4", progress: null },
]

function FloatingCard({ card, delay, topPercent }: { card: typeof featureCards[0]; delay: number; topPercent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "absolute", left: 0, top: topPercent, width: 256 }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay: delay * 0.4 }}
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 16px", backdropFilter: "blur(12px)", boxShadow: `0 0 28px ${card.color}15` }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${card.color}18`, border: `1px solid ${card.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <card.icon style={{ width: 16, height: 16, color: card.color }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: card.color, marginBottom: 2 }}>{card.label}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{card.desc}</p>
          </div>
        </div>
        {card.progress && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Progress</span>
              <span style={{ fontSize: 10, color: card.color }}>{card.progress}%</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${card.progress}%` }} transition={{ delay: delay + 0.5, duration: 1.2, ease: "easeOut" }} style={{ height: "100%", background: `linear-gradient(90deg, ${card.color}, #8b5cf6)`, borderRadius: 2 }} />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function SignUpPage() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "Lowercase letter", met: /[a-z]/.test(formData.password) },
    { label: "Number", met: /\d/.test(formData.password) },
  ]
  const allRequirementsMet = passwordRequirements.every((r) => r.met)
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) { toast.error("Passwords do not match"); return }
    if (!allRequirementsMet) { toast.error("Please meet all password requirements"); return }
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: { first_name: formData.firstName, last_name: formData.lastName },
        },
      })
      if (error) { toast.error(error.message); return }
      router.push("/auth/sign-up-success")
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const inp = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "hsl(var(--foreground))", borderRadius: "10px", transition: "border-color 0.2s, background 0.2s" }
  const focus = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)" }
  const blur = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)" }

  return (
    <div className="flex min-h-screen bg-background">

      {/* ── Left visual panel ── */}
      <div
        className="hidden lg:flex lg:w-[52%]"
        style={{ position: "relative", overflow: "hidden", background: "linear-gradient(145deg, #06060f 0%, #0d0d20 60%, #060d14 100%)", borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        <ParticleCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-55" />

        {/* Glow orbs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", top: "30%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", bottom: "10%", right: "10%", pointerEvents: "none" }} />

        {/* Brand */}
        <div style={{ position: "absolute", top: 32, left: 40, zIndex: 10, display: "flex", alignItems: "center", gap: 10 }}>
          <ZenithMark size={28} />
          <span style={{ fontSize: 15, fontWeight: 700, background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ZEERO AI</span>
        </div>

        {/* Central content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 48px 160px", position: "relative", zIndex: 2 }}>

          {/* Large zenith icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", marginBottom: 32 }}
          >
            <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative" }}>
              <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.04, 0.12] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: "absolute", inset: -60, borderRadius: "50%", background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
              <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.02, 0.06] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} style={{ position: "absolute", inset: -90, borderRadius: "50%", background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />
              <ZenithMark size={100} />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} style={{ textAlign: "center", marginBottom: 12 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "white", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Reach your{" "}
              <span style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>zenith</span>
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>AI lectures, live Q&A, and instant quizzes</p>
          </motion.div>

          {/* Floating cards */}
          <div style={{ position: "relative", width: 256, height: 300, marginTop: 8 }}>
            <FloatingCard card={featureCards[0]} delay={0.7} topPercent="2%" />
            <FloatingCard card={featureCards[1]} delay={0.9} topPercent="36%" />
            <FloatingCard card={featureCards[2]} delay={1.1} topPercent="68%" />
          </div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} style={{ display: "flex", gap: 36, marginTop: 16 }}>
            {[{ v: "10K+", l: "Students" }, { v: "95%", l: "Success rate" }, { v: "24/7", l: "AI support" }].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 17, fontWeight: 700, background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex w-full flex-col items-center justify-center overflow-y-auto px-6 py-12 lg:w-[48%]">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <ZenithMark size={28} />
            <span style={{ fontSize: 15, fontWeight: 700, background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ZEERO AI</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>Create account</h1>
            <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Start your AI learning journey today</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>First name</Label>
                <Input placeholder="John" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Last name</Label>
                <Input placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required style={inp} onFocus={focus} onBlur={blur} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Email address</Label>
              <Input type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required style={inp} onFocus={focus} onBlur={blur} />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Password</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required style={{ ...inp, paddingRight: "2.5rem" }} onFocus={focus} onBlur={blur} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <AnimatePresence>
                {formData.password && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="grid grid-cols-2 gap-1.5 overflow-hidden pt-2">
                    {passwordRequirements.map((req) => (
                      <div key={req.label} className="flex items-center gap-1.5 text-xs" style={{ color: req.met ? "#34d399" : "hsl(var(--muted-foreground))" }}>
                        <div className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: req.met ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${req.met ? "#34d399" : "rgba(255,255,255,0.1)"}` }}>
                          {req.met && <Check className="h-2 w-2" />}
                        </div>
                        {req.label}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Confirm password</Label>
              <div className="relative">
                <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required style={{ ...inp, paddingRight: "2.5rem" }} onFocus={focus} onBlur={blur} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.confirmPassword && !passwordsMatch && <p className="text-xs" style={{ color: "#f87171" }}>Passwords do not match</p>}
              {formData.confirmPassword && passwordsMatch && <p className="flex items-center gap-1 text-xs" style={{ color: "#34d399" }}><Check className="h-3 w-3" /> Passwords match</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || !allRequirementsMet || !passwordsMatch}
              className="group relative mt-2 w-full overflow-hidden rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", boxShadow: "0 0 30px rgba(99,102,241,0.2)" }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</> : <>Create account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
              </span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }} />
            </button>

            <p className="text-center text-xs" style={{ color: "hsl(var(--muted-foreground))", opacity: 0.55 }}>
              By signing up, you agree to our{" "}
              <Link href="#" style={{ color: "#818cf8" }} className="underline underline-offset-2">Terms</Link>{" "}and{" "}
              <Link href="#" style={{ color: "#818cf8" }} className="underline underline-offset-2">Privacy Policy</Link>
            </p>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold transition-opacity hover:opacity-80" style={{ color: "#818cf8" }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}