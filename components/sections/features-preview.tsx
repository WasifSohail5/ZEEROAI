"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Users, Brain, Sparkles, GraduationCap, BarChart3, ArrowRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Video,
    title: "AI Video Generation",
    description: "Transform text prompts into comprehensive video lectures with AI-generated visuals, voiceovers, and animations.",
    href: "/features/video-generation",
    image: "/images/features/video-generation.jpg",
    gradient: "from-purple-500 to-pink-500",
    color: "bg-purple-500",
  },
  {
    icon: Brain,
    title: "24/7 AI Tutor",
    description: "Get instant help anytime with our intelligent AI tutor for personalized guidance on any topic.",
    href: "/features/ai-tutor",
    image: "/images/features/ai-tutor.jpg",
    gradient: "from-blue-500 to-cyan-500",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    title: "Virtual Meeting Rooms",
    description: "Connect with peers and instructors in immersive virtual classrooms for collaborative learning.",
    href: "/features/meeting-rooms",
    image: "/images/features/meeting-room.jpg",
    gradient: "from-emerald-500 to-teal-500",
    color: "bg-emerald-500",
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning",
    description: "Adaptive learning paths that adjust to your pace, preferences, and learning style.",
    href: "/features/learning-paths",
    image: "/images/features/learning-path.jpg",
    gradient: "from-orange-500 to-amber-500",
    color: "bg-orange-500",
  },
  {
    icon: Sparkles,
    title: "Smart Content Curation",
    description: "AI-curated learning materials and resources based on your goals and progress.",
    href: "/features/smart-content",
    image: "/images/features/content-curation.jpg",
    gradient: "from-pink-500 to-rose-500",
    color: "bg-pink-500",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track your learning journey with detailed insights and performance metrics.",
    href: "/features/analytics",
    image: "/images/features/analytics.jpg",
    gradient: "from-indigo-500 to-purple-500",
    color: "bg-indigo-500",
  },
]

// Floating Card Component with 3D Effect
const FloatingFeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <Link href={feature.href}>
        <motion.div
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative group"
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card backdrop-blur-xl shadow-2xl h-full">
            {/* Glowing Border Effect */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r blur-xl",
                feature.gradient
              )}
              style={{ transform: "translateZ(-50px)" }}
            />

            {/* Image Section with Parallax */}
            <div className="relative h-56 overflow-hidden">
              <motion.div
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.6 }}
                className="h-full w-full"
              >
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              {/* Gradient Overlay */}
              <div className={cn("absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90")} />
              
              {/* Floating Icon */}
              <motion.div
                className={cn(
                  "absolute top-4 right-4 p-3 rounded-2xl shadow-2xl",
                  feature.color
                )}
                animate={isHovered ? { y: -5, rotate: 5 } : { y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="p-6 relative" style={{ transform: "translateZ(50px)" }}>
              {/* Title */}
              <motion.h3
                className="text-xl font-bold mb-3 flex items-center gap-2 text-foreground"
                animate={isHovered ? { x: 5 } : { x: 0 }}
              >
                {feature.title}
                <motion.div
                  animate={isHovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0 }}
                >
                  <ArrowRight className="h-5 w-5 text-primary" />
                </motion.div>
              </motion.h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Animated Progress Bar */}
              <motion.div
                className="h-1 rounded-full bg-muted overflow-hidden"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              >
                <motion.div
                  className={cn("h-full bg-gradient-to-r", feature.gradient)}
                  initial={{ x: "-100%" }}
                  animate={isHovered ? { x: 0 } : { x: "-100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Hover Badge */}
              <motion.div
                className="absolute bottom-4 left-6 flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary">Explore Feature</span>
              </motion.div>
            </div>

            {/* Particle Effect */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={cn("absolute w-2 h-2 rounded-full", feature.color)}
                    initial={{
                      x: "50%",
                      y: "50%",
                      opacity: 1,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// Bento Grid Layout Component
const BentoFeatureCard = ({ feature, className }: { feature: typeof features[0]; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={feature.href}>
      <motion.div
        className={cn("group relative overflow-hidden rounded-3xl border-0", className)}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="h-full border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          {/* Image Background with Zoom */}
          <motion.div 
            className="absolute inset-0"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={feature.image || "/placeholder.svg"}
              alt={feature.title}
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70" />
          </motion.div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-8">
            {/* Icon with Glow */}
            <motion.div
              className="relative w-fit"
              animate={isHovered ? { y: -5 } : { y: 0 }}
            >
              <div className={cn("absolute inset-0 blur-xl opacity-50", feature.color)} />
              <div className={cn("relative p-4 rounded-2xl", feature.color)}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            {/* Text Content */}
            <div>
              <motion.h3
                className="text-2xl font-bold mb-3 text-foreground"
                animate={isHovered ? { x: 5 } : { x: 0 }}
              >
                {feature.title}
              </motion.h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Bottom Arrow */}
            <motion.div
              className="flex items-center gap-2 text-primary font-medium"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              <span className="text-sm">Learn More</span>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>

          {/* Animated Border */}
          <motion.div
            className={cn("absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500")}
            style={{
              background: `linear-gradient(45deg, transparent, var(--gradient))`,
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
        </Card>
      </motion.div>
    </Link>
  )
}

export default function FeaturesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [layout, setLayout] = useState<'grid' | 'bento'>('bento')

  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4" />
            <span>Powerful Features</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Revolutionize Your Learning
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover cutting-edge AI technology and innovative tools designed to transform your educational experience.
          </p>
        </motion.div>

        {/* Layout Toggle */}
        <motion.div
          className="flex justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant={layout === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLayout('grid')}
          >
            Grid View
          </Button>
          <Button
            variant={layout === 'bento' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLayout('bento')}
          >
            Bento View
          </Button>
        </motion.div>

        {/* Features Grid Layout */}
        {layout === 'grid' && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FloatingFeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        )}

        {/* Bento Grid Layout */}
        {layout === 'bento' && (
          <div className="grid gap-20 md:gap-10 md:grid-cols-2 lg:grid-cols-4 auto-rows-[240px]">
            <BentoFeatureCard 
              feature={features[0]} 
              className="md:col-span-3 lg:col-span-2 md:row-span-2" 
            />
            <BentoFeatureCard 
              feature={features[1]} 
              className="md:col-span-3 lg:col-span-2" 
            />
            <BentoFeatureCard 
              feature={features[2]} 
              className="md:col-span-2" 
            />
            <BentoFeatureCard 
              feature={features[3]} 
              className="md:col-span-2 lg:col-span-2" 
            />
            <BentoFeatureCard 
              feature={features[4]} 
              className="md:col-span-2" 
            />
            <BentoFeatureCard 
              feature={features[5]} 
              className="md:col-span-3 lg:col-span-2 md:row-span-1" 
            />
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full px-8 bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
            asChild
          >
            <Link href="/features">
              <span className="relative z-10 flex items-center gap-2">
                Explore All Features
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}