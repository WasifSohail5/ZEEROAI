"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, Mic, Brain, Zap, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "Live Voice Q&A",
    desc: "Pause any lecture and ask questions in real-time — get instant spoken answers",
    color: "#3b82f6",
    delay: "0ms",
  },
  {
    icon: MessageSquare,
    title: "Voice & Text",
    desc: "Communicate however you prefer — speak or type, Zeero understands both",
    color: "#8b5cf6",
    delay: "120ms",
  },
  {
    icon: Brain,
    title: "Context Aware",
    desc: "Answers grounded in exactly where you are in the lecture — not generic AI",
    color: "#06b6d4",
    delay: "240ms",
  },
]

export default function TutorPage() {
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
        if (p >= 68) clearInterval(interval)
      }, 22)
      return () => clearInterval(interval)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string
    }[] = []

    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4"]

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.4 + 0.1,
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

      {/* Particle background */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      />

      {/* Radial glow blobs */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{
          width: 520,
          height: 520,
          background: "radial-gradient(circle, #3b82f6 0%, #8b5cf6 50%, transparent 80%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 rounded-full opacity-[0.07] blur-3xl"
        style={{
          width: 360,
          height: 360,
          background: "radial-gradient(circle, #06b6d4, transparent 70%)",
        }}
      />

      {/* Main card */}
      <div
        className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Icon */}
        <div className="relative mb-8">
          {/* Ping rings */}
          <span
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #3b82f6, transparent 70%)",
              animation: "ping 2.4s cubic-bezier(0,0,0.2,1) infinite",
              transform: "scale(1.6)",
            }}
          />
          <span
            className="absolute inset-0 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
              animation: "ping 2.4s cubic-bezier(0,0,0.2,1) infinite 0.6s",
              transform: "scale(2.2)",
            }}
          />
          <div
            className="relative flex h-24 w-24 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
              border: "1px solid rgba(59,130,246,0.3)",
              boxShadow: "0 0 40px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <MessageSquare
              className="h-11 w-11"
              style={{ color: "#3b82f6", filter: "drop-shadow(0 0 12px rgba(59,130,246,0.6))" }}
            />
          </div>
        </div>

        {/* Badge */}
        <div
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.2)",
            color: "#60a5fa",
            letterSpacing: "0.08em",
          }}
        >
          <Zap className="h-3 w-3" style={{ color: "#60a5fa" }} />
          COMING SOON
        </div>

        {/* Heading */}
        <h1
          className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl"
          style={{ lineHeight: 1.1 }}
        >
          AI{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tutor
          </span>
        </h1>

        <p className="mb-3 max-w-md text-lg text-gray-400">
          Your personal AI teacher is almost here
        </p>
        <p className="mb-10 max-w-lg text-sm leading-relaxed text-gray-500">
          Ask questions mid-lecture, get instant explanations in voice or text,
          and learn at your own pace — powered by AI that knows exactly where you are.
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
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                boxShadow: "0 0 8px rgba(59,130,246,0.5)",
                transition: "width 0.05s linear",
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-600">Feature in development</p>
            <p className="text-xs font-medium text-blue-500">{progress}%</p>
          </div>
        </div>

        {/* Notify button */}
        <button
          className="group mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-200"
          style={{
            border: "1px solid rgba(59,130,246,0.25)",
            color: "#93c5fd",
            background: "rgba(59,130,246,0.05)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(59,130,246,0.12)"
            e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(59,130,246,0.05)"
            e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)"
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
              transitionDelay: f.delay,
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
            <p className="text-sm font-semibold text-white">{f.title}</p>
            <p className="text-xs leading-relaxed text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.3; }
          80%, 100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}