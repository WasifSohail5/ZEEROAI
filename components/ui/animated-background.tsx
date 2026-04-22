"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

interface Star {
  x: number
  y: number
  size: number
  twinkleSpeed: number
  twinkleOffset: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)
  const { resolvedTheme } = useTheme()
  const isDarkRef = useRef(true)

  useEffect(() => {
    isDarkRef.current = resolvedTheme === "dark"
  }, [resolvedTheme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
      initStars()
    }

    const initParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000))
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
      particlesRef.current = particles
    }

    const initStars = () => {
      const stars: Star[] = []
      const starCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 10000))
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
      starsRef.current = stars
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      timeRef.current += 0.016
      const isDark = isDarkRef.current

      // Clear with slight fade for trail effect - theme aware
      if (isDark) {
        ctx.fillStyle = "rgba(8, 12, 30, 0.15)"
      } else {
        ctx.fillStyle = "rgba(248, 250, 252, 0.15)"
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const stars = starsRef.current

      // Draw twinkling stars
      stars.forEach((star) => {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * twinkle, 0, Math.PI * 2)
        if (isDark) {
          ctx.fillStyle = `rgba(147, 197, 253, ${0.3 + twinkle * 0.5})`
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${0.2 + twinkle * 0.3})`
        }
        ctx.fill()
      })

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.02
          particle.vx -= dx * force * 0.1
          particle.vy -= dy * force * 0.1
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Draw particle - theme aware
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        if (isDark) {
          ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        } else {
          ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity * 0.8})`
        }
        ctx.fill()

        // Draw connections between nearby particles
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            if (isDark) {
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 120)})`
            } else {
              ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 * (1 - dist / 120)})`
            }
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    // Initial fill - theme aware
    const isDark = isDarkRef.current
    if (isDark) {
      ctx.fillStyle = "rgb(8, 12, 30)"
    } else {
      ctx.fillStyle = "rgb(248, 250, 252)"
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [resolvedTheme])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      
      {/* Background base color */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary/5" />
      
      {/* Floating glowing orbs - theme aware */}
      <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-blue-600/10 dark:bg-blue-600/10 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-blue-500/15 dark:bg-blue-500/10 blur-[100px]" style={{ animationDelay: "1s", animationDuration: "4s" }} />
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-400/10 dark:bg-blue-400/5 blur-[80px]" style={{ animationDelay: "2s", animationDuration: "5s" }} />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}
