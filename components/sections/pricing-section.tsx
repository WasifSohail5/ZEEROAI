"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Check, Sparkles, Zap, Crown, Rocket, Star, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    icon: Rocket,
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for exploring AI education",
    features: [
      "5 AI video generations/month",
      "Basic AI tutor access",
      "Community forum access",
      "Mobile app access",
      "Email support",
    ],
    limitations: [
      "Limited analytics",
      "No offline downloads",
    ],
    cta: "Start Free",
    href: "/auth/sign-up",
    popular: false,
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  {
    name: "Professional",
    icon: Crown,
    monthlyPrice: 19,
    annualPrice: 180,
    description: "For serious learners & creators",
    features: [
      "Unlimited AI video generations",
      "Priority AI tutor (24/7)",
      "Virtual meeting rooms",
      "Advanced analytics dashboard",
      "Custom learning paths",
      "Download videos offline",
      "Priority email & chat support",
      "Early access to new features",
    ],
    limitations: [],
    cta: "Start Free Trial",
    href: "/auth/sign-up",
    popular: true,
    gradient: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  {
    name: "Enterprise",
    icon: Zap,
    monthlyPrice: 49,
    annualPrice: 480,
    description: "For teams & institutions",
    features: [
      "Everything in Professional",
      "Up to 50 team members",
      "Admin dashboard & controls",
      "Team analytics & insights",
      "Custom branding",
      "API access & webhooks",
      "SSO authentication",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    limitations: [],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
    gradient: "from-orange-500 to-red-500",
    glowColor: "rgba(249, 115, 22, 0.5)",
  },
]

// 3D Tilt Card
const PricingCard = ({ plan, index, isAnnual }: { plan: typeof plans[0]; index: number; isAnnual: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    const xPct = mouseXPos / width - 0.5
    const yPct = mouseYPos / height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice
  const displayPrice = isAnnual && plan.annualPrice > 0 ? Math.floor(plan.annualPrice / 12) : price

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative group",
        plan.popular ? "md:-mt-8" : ""
      )}
    >
      {/* Glow Effect */}
      <motion.div
        className={cn(
          "absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10",
          `bg-gradient-to-r ${plan.gradient}`
        )}
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      />

      <Card className={cn(
        "relative overflow-hidden border-2 transition-all duration-500",
        plan.popular 
          ? "border-primary bg-gradient-to-b from-card/90 to-card/50 shadow-2xl scale-105" 
          : "border-border/50 bg-card/30 backdrop-blur-xl"
      )}>
        {/* Popular Badge */}
        {plan.popular && (
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-bl-2xl rounded-tr-2xl text-white font-bold text-sm shadow-lg bg-gradient-to-r",
              plan.gradient
            )}>
              <Star className="h-4 w-4 fill-current" />
              Most Popular
            </div>
          </motion.div>
        )}

        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={cn("absolute w-1 h-1 rounded-full bg-gradient-to-r", plan.gradient)}
                initial={{
                  x: Math.random() * 100 + "%",
                  y: "100%",
                }}
                animate={{
                  y: "-10%",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}

        <div className="p-8" style={{ transform: "translateZ(50px)" }}>
          {/* Icon */}
          <motion.div
            className="mb-6"
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          >
            <div className={cn(
              "inline-flex p-4 rounded-2xl bg-gradient-to-br shadow-lg",
              plan.gradient
            )}>
              <plan.icon className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          {/* Plan Name */}
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {plan.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {plan.description}
          </p>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <motion.span
                className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                key={displayPrice}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ${displayPrice}
              </motion.span>
              <span className="text-muted-foreground">
                {plan.monthlyPrice === 0 ? "" : "/month"}
              </span>
            </div>
            {isAnnual && plan.annualPrice > 0 && (
              <motion.p
                className="text-sm text-primary font-medium mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Save ${plan.monthlyPrice * 12 - plan.annualPrice}/year
              </motion.p>
            )}
          </div>

          {/* CTA Button */}
          <Button
            className={cn(
              "w-full mb-8 relative overflow-hidden group/btn",
              plan.popular 
                ? `bg-gradient-to-r ${plan.gradient} hover:shadow-xl hover:shadow-primary/30` 
                : "bg-gradient-to-r from-primary to-accent"
            )}
            size="lg"
            asChild
          >
            <Link href={plan.href}>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {plan.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Link>
          </Button>

          {/* Features */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              What's Included
            </p>
            {plan.features.map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className={cn(
                  "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br",
                  plan.gradient
                )}>
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm text-foreground/80 leading-tight">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Hover Details */}
          <motion.div
            className="mt-6 pt-6 border-t border-border/50"
            initial={{ opacity: 0, height: 0 }}
            animate={isHovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-muted-foreground text-center">
              {plan.popular ? "🎉 7-day free trial • Cancel anytime" : "No credit card required"}
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="pricing">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
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
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4" />
            <span>Simple, Transparent Pricing</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Choose Your Plan
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free and scale as you grow. All plans include core AI features.
          </p>

          {/* Billing Toggle */}
          <motion.div
            className="inline-flex items-center gap-4 p-2 rounded-full bg-muted/50 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.3 }}
          >
            <span className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            )}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent"
            />
            <span className={cn(
              "px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2",
              isAnnual ? "text-foreground" : "text-muted-foreground"
            )}>
              Annual
              <span className="text-xs bg-gradient-to-r from-primary to-accent text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              index={index} 
              isAnnual={isAnnual}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by 10,000+ learners worldwide
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {["Money-back guarantee", "Cancel anytime", "24/7 Support", "Secure payments"].map((badge, i) => (
              <motion.div
                key={badge}
                className="flex items-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <Check className="h-4 w-4 text-primary" />
                <span>{badge}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}