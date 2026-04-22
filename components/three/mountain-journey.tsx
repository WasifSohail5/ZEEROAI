'use client'

import { useState, useEffect } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function MountainJourney() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate random stars matching the image distribution
    const generatedStars: Star[] = []
    const starCount = 15

    for (let i = 0; i < starCount; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.8 + 0.4,
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 2,
      })
    }
    setStars(generatedStars)
  }, [])

  return (
    <div className="w-full h-screen absolute inset-0 bg-black overflow-hidden">
      {/* SVG Starfield */}
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
            .star {
              animation: twinkle ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* Render 4-pointed stars */}
        {stars.map((star) => {
          const s = star.size
          return (
            <g
              key={star.id}
              className="star"
              style={{
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            >
              {/* 4-pointed star shape */}
              <g transform={`translate(${(star.x / 100) * 1200}, ${(star.y / 100) * 800})`}>
                {/* Vertical bar */}
                <rect x={-s / 8} y={-s / 2} width={s / 4} height={s} fill="white" />
                {/* Horizontal bar */}
                <rect x={-s / 2} y={-s / 8} width={s} height={s / 4} fill="white" />
                {/* Center dot */}
                <circle cx={0} cy={0} r={s / 6} fill="white" />
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
