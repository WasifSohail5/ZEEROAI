"use client"

import { useEffect, useRef } from "react"

const technologies = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
]

const technologies2 = [
  { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Jupyter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  { name: "Matplotlib", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
  { name: "Nginx", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
]

function TechRow({ techs, direction }: { techs: typeof technologies; direction: "left" | "right" }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = direction === "left" ? 0 : scrollContainer.scrollWidth / 2

    const scroll = () => {
      if (!scrollContainer) return

      if (direction === "left") {
        scrollPosition += 0.5
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0
        }
      } else {
        scrollPosition -= 0.5
        if (scrollPosition <= 0) {
          scrollPosition = scrollContainer.scrollWidth / 2
        }
      }

      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [direction])

  const duplicatedTechs = [...techs, ...techs]

  return (
    <div
      ref={scrollRef}
      className="flex gap-8 overflow-hidden py-4"
      style={{ scrollBehavior: "auto" }}
    >
      {duplicatedTechs.map((tech, index) => (
        <div
          key={`${tech.name}-${index}`}
          className="group flex shrink-0 items-center gap-3 rounded-xl border border-border/50 bg-card/30 px-6 py-3 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/60"
        >
          <img
            src={tech.logo || "/placeholder.svg"}
            alt={tech.name}
            className="h-8 w-8 object-contain transition-transform group-hover:scale-110"
          />
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function TechStack() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Powered by Modern Technology
          </h2>
          <p className="mt-2 text-muted-foreground">
            Built with industry-leading tools and frameworks
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        {/* Row 1 - Moving Left */}
        <TechRow techs={technologies} direction="left" />

        {/* Row 2 - Moving Right */}
        <TechRow techs={technologies2} direction="right" />
      </div>
    </section>
  )
}
