"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"

// Same Logo Component from Navbar/Hero
const ZeeroLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2" />
    <path
      d="M30 70 L45 45 L60 60 L75 35 L90 55"
      stroke="url(#gradient1)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M35 80 L50 60 L70 75 L85 65"
      stroke="url(#gradient2)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.7"
    />
    <circle cx="45" cy="45" r="4" fill="currentColor" className="text-primary" />
    <circle cx="75" cy="35" r="4" fill="currentColor" className="text-accent" />
    <circle cx="60" cy="60" r="5" fill="currentColor" className="text-primary" />
    <defs>
      <linearGradient id="gradient1" x1="30" y1="35" x2="90" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="oklch(0.55 0.25 264)" />
        <stop offset="100%" stopColor="oklch(0.75 0.15 195)" />
      </linearGradient>
      <linearGradient id="gradient2" x1="35" y1="60" x2="85" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="oklch(0.70 0.20 264)" />
        <stop offset="100%" stopColor="oklch(0.65 0.20 150)" />
      </linearGradient>
    </defs>
  </svg>
)

const footerLinks = {
  product: [
    { href: "/features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/about", label: "About Us" },
    { href: "/#contact", label: "Contact Us" },
  ],
  features: [
    { href: "/features/video-generation", label: "AI Video Lectures" },
    { href: "/features/ai-tutor", label: "24/7 AI Tutor" },
    { href: "/features/meeting-rooms", label: "Meeting Rooms" },
    { href: "/features/learning-paths", label: "Learning Paths" },
  ],
  resources: [
    { href: "/blog", label: "Blog" },
    { href: "/docs", label: "Documentation" },
    { href: "/support", label: "Support" },
    { href: "/community", label: "Community" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/licenses", label: "Licenses" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter", gradient: "from-sky-500 to-blue-400" },
  { icon: Github, href: "#", label: "GitHub", gradient: "from-gray-700 to-gray-600" },
  { icon: Linkedin, href: "#", label: "LinkedIn", gradient: "from-blue-600 to-blue-500" },
  { icon: Mail, href: "mailto:founder@zeeroai.me", label: "Email", gradient: "from-purple-500 to-pink-500" },
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success("Thanks for subscribing! Check your email for confirmation.")
    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <footer className="relative border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section - Takes more space */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ZeeroLogo className="h-10 w-10 text-primary transition-transform" />
              </motion.div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ZEERO AI
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              <span className="font-semibold text-foreground">Zenith of Enhanced Education with Realtime Optimization.</span>
              {" "}Revolutionizing education through AI-powered personalized learning experiences.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                Stay Updated
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-gradient-to-r from-primary to-accent shrink-0"
                  disabled={isSubmitting}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Connect With Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="group relative"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 border border-border/50 transition-all group-hover:border-primary/50">
                      <social.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                Product
                <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Features Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                Features
                <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              </h3>
              <ul className="space-y-3">
                {footerLinks.features.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                Resources
                <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                Legal
                <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-border/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold text-foreground">ZEERO AI</span>. All rights reserved.
              {/* {" "}Built with{" "}
              <span className="text-red-500">♥</span>
              {" "}for learners worldwide. */}
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <motion.a
                href="/sitemap"
                className="hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Sitemap
              </motion.a>
              <motion.a
                href="/status"
                className="hover:text-primary transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                All Systems Operational
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}