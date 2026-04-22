"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const blogPosts = [
  {
    title: "The Future of AI in Education",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we learn, making education more personalized, accessible, and effective than ever before.",
    image: "/images/blog/ai-education-future.jpg",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    category: "AI & Education",
    author: "Dr. Sarah Chen",
    gradient: "from-violet-500 to-purple-500",
    featured: true,
  },
  {
    title: "Video Learning Revolution",
    excerpt: "Explore the power of AI-generated video lectures and how they're transforming traditional educational content into engaging, dynamic learning experiences.",
    image: "/images/blog/video-learning.jpg",
    date: "Jan 10, 2026",
    readTime: "4 min read",
    category: "Technology",
    author: "Mark Johnson",
    gradient: "from-blue-500 to-cyan-500",
    featured: false,
  },
  {
    title: "Personalized Learning Paths",
    excerpt: "Learn how adaptive AI creates customized learning journeys for every student, ensuring optimal progress and engagement throughout their educational journey.",
    image: "/images/blog/personalized-learning.jpg",
    date: "Jan 5, 2026",
    readTime: "6 min read",
    category: "Learning",
    author: "Emily Rodriguez",
    gradient: "from-emerald-500 to-teal-500",
    featured: false,
  },
]

// Magnetic Card Effect
const MagneticCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / 10)
    y.set((e.clientY - centerY) / 10)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Featured Blog Card
const FeaturedBlogCard = ({ post }: { post: typeof blogPosts[0] }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <MagneticCard>
      <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
        <motion.div
          className="group relative overflow-hidden rounded-3xl"
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative h-[600px] border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Background Image with Parallax */}
            <motion.div
              className="absolute inset-0"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
            </motion.div>

            {/* Floating Particles */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/40 rounded-full"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: "100%",
                      opacity: 0,
                    }}
                    animate={{
                      y: "-20%",
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
              {/* Category Badge */}
              <motion.div
                className="mb-4 w-fit"
                animate={isHovered ? { y: -5 } : { y: 0 }}
              >
                <span className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg bg-gradient-to-r",
                  post.gradient
                )}>
                  <Sparkles className="h-4 w-4" />
                  {post.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight"
                animate={isHovered ? { x: 10 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {post.title}
              </motion.h3>

              {/* Excerpt */}
              <p className="text-muted-foreground text-lg mb-6 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>

                <motion.div
                  className="flex items-center gap-2 text-primary font-semibold"
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                >
                  Read Article
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </div>

              {/* Author */}
              <motion.div
                className="mt-6 pt-6 border-t border-border/50 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">Contributing Author</p>
                </div>
              </motion.div>
            </div>

            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, var(--primary), transparent)`,
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
          </Card>
        </motion.div>
      </Link>
    </MagneticCard>
  )
}

// Regular Blog Card
const BlogCard = ({ post, index }: { post: typeof blogPosts[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card/50 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500">
          {/* Image Section */}
          <div className="relative h-56 overflow-hidden">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: 2 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            
            {/* Category Badge */}
            <motion.div
              className="absolute top-4 left-4"
              animate={isHovered ? { scale: 1.1, rotate: -3 } : { scale: 1, rotate: 0 }}
            >
              <span className={cn(
                "inline-block px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r",
                post.gradient
              )}>
                {post.category}
              </span>
            </motion.div>

            {/* Reading Time Badge */}
            <motion.div
              className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            >
              <BookOpen className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium text-foreground">{post.readTime}</span>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Date */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Calendar className="h-3 w-3" />
              <span>{post.date}</span>
            </div>

            {/* Title */}
            <motion.h3
              className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              {post.title}
            </motion.h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <span className="text-xs text-muted-foreground">{post.author}</span>
              
              <motion.div
                className="flex items-center gap-1 text-primary text-sm font-medium"
                animate={isHovered ? { x: 5 } : { x: 0 }}
              >
                Read
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className={cn(
              "absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 -z-10 bg-gradient-to-r",
              post.gradient
            )}
            animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
          />
        </Card>
      </Link>
    </motion.div>
  )
}

export default function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <section id="blog" className="relative py-24 overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            animate={{
              boxShadow: [
                "0 0 20px rgba(var(--primary-rgb), 0.1)",
                "0 0 40px rgba(var(--primary-rgb), 0.2)",
                "0 0 20px rgba(var(--primary-rgb), 0.1)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Latest Insights</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Insights & Stories
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore the latest trends in AI education, learning strategies, and technology innovations
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          {/* Featured Post - Takes full width on mobile, half on desktop */}
          {featuredPost && (
            <div className="lg:col-span-1">
              <FeaturedBlogCard post={featuredPost} />
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="lg:col-span-1 grid gap-8">
            {regularPosts.map((post, index) => (
              <BlogCard key={post.title} post={post} index={index} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button
            size="lg"
            variant="outline"
            className="group relative overflow-hidden rounded-full px-8"
            asChild
          >
            <Link href="/blog">
              <span className="relative z-10 flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
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