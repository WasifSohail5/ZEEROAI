"use client"

import { useEffect, useRef, useState } from "react"
import { BookOpen, GraduationCap, Star, ArrowRight, Zap } from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Structured Courses",
    desc: "Full learning paths for IELTS, coding, and more — with lectures, quizzes, and progress tracking",
    color: "#f59e0b",
    delay: "0ms",
  },
  {
    icon: Star,
    title: "Expert Content",
    desc: "AI-curated courses built on verified academic sources — not random internet content",
    color: "#ec4899",
    delay: "120ms",
  },
  {
    icon: BookOpen,
    title: "Learn at Your Pace",
    desc: "Enroll once, access forever — resume anytime from where you left off",
    color: "#8b5cf6",
    delay: "240ms",
  },
]

export default function CoursesPage() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      let p = 0
      const interval = setInterval(() => {
        p += 1
        setProgress(p)
        if (p >= 55) clearInterval(interval)
      }, 25)
      return () => clearInterval(interval)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: {
      x: number; y: number; vx: number; vy: number
      r: number; alpha: number; color: string
    }[] = []

    const colors = ["#f59e0b", "#ec4899", "#8b5cf6"]
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.35 + 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
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
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-hidden px-4">

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      />

      {/* Glow blobs */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #f59e0b 0%, #ec4899 50%, transparent 80%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 rounded-full opacity-[0.07] blur-3xl"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Animated icon */}
        <div className="relative mb-8">
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #f59e0b, transparent 70%)",
              opacity: 0.18,
              animation: "ping 2.6s cubic-bezier(0,0,0.2,1) infinite",
              transform: "scale(1.6)",
            }}
          />
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #ec4899, transparent 70%)",
              opacity: 0.09,
              animation: "ping 2.6s cubic-bezier(0,0,0.2,1) infinite 0.8s",
              transform: "scale(2.3)",
            }}
          />
          <div
            className="relative flex h-24 w-24 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(236,72,153,0.12))",
              border: "1px solid rgba(245,158,11,0.25)",
              boxShadow: "0 0 40px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <BookOpen
              className="h-11 w-11"
              style={{ color: "#f59e0b", filter: "drop-shadow(0 0 12px rgba(245,158,11,0.6))" }}
            />
          </div>
        </div>

        {/* Badge */}
        <div
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            color: "#fcd34d",
            letterSpacing: "0.08em",
          }}
        >
          <Zap className="h-3 w-3" />
          COMING SOON
        </div>

        {/* Heading */}
        <h1
          className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl"
          style={{ color: "hsl(var(--foreground))", lineHeight: 1.1 }}
        >
          My{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Courses
          </span>
        </h1>

        <p
          className="mb-3 max-w-md text-lg"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Full structured courses are coming your way
        </p>
        <p
          className="mb-10 max-w-lg text-sm leading-relaxed"
          style={{ color: "hsl(var(--muted-foreground))", opacity: 0.7 }}
        >
          Enroll in complete AI-generated courses like IELTS prep, coding bootcamps,
          and more — with live Q&A, quizzes after every lecture, and a certificate at the end.
        </p>

        {/* Progress bar */}
        <div className="mb-2 w-full max-w-sm">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #f59e0b, #ec4899)",
                boxShadow: "0 0 8px rgba(245,158,11,0.5)",
                transition: "width 0.05s linear",
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p
              className="text-xs"
              style={{ color: "hsl(var(--muted-foreground))", opacity: 0.5 }}
            >
              Feature in development
            </p>
            <p className="text-xs font-medium" style={{ color: "#fcd34d" }}>
              {progress}%
            </p>
          </div>
        </div>

        {/* Notify button */}
        <button
          className="group mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-200"
          style={{
            border: "1px solid rgba(245,158,11,0.25)",
            color: "#fde68a",
            background: "rgba(245,158,11,0.05)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(245,158,11,0.12)"
            e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(245,158,11,0.05)"
            e.currentTarget.style.borderColor = "rgba(245,158,11,0.25)"
          }}
        >
          Notify me when ready
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Feature cards */}
      <div
        className="relative z-10 mt-14 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
        }}
      >
        {features.map((f) => (
          <div
            key={f.title}
            className="flex flex-col gap-3 rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: `${f.color}14`,
                border: `1px solid ${f.color}30`,
              }}
            >
              <f.icon className="h-5 w-5" style={{ color: f.color }} />
            </div>
            <p
              className="text-sm font-semibold"
              style={{ color: "hsl(var(--foreground))" }}
            >
              {f.title}
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))", opacity: 0.7 }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.25; }
          80%, 100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}