"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, ChevronDown, Video, Brain, Users, Sparkles, BarChart3, GraduationCap, X, ArrowRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

// Modern Logo Component
const ZeeroLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer Circle */}
    <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2" />
    
    {/* Mountain Peak / Neural Network Design */}
    <path
      d="M30 70 L45 45 L60 60 L75 35 L90 55"
      stroke="url(#gradient1)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Lower Layer */}
    <path
      d="M35 80 L50 60 L70 75 L85 65"
      stroke="url(#gradient2)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.7"
    />
    
    {/* AI Nodes */}
    <circle cx="45" cy="45" r="4" fill="currentColor" className="text-primary" />
    <circle cx="75" cy="35" r="4" fill="currentColor" className="text-accent" />
    <circle cx="60" cy="60" r="5" fill="currentColor" className="text-primary" />
    
    {/* Gradients */}
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

const features = [
  { href: "/features/video-generation", label: "AI Video Lectures", description: "Generate video lectures from text prompts", icon: Video, badge: "New" },
  { href: "/features/ai-tutor", label: "24/7 AI Tutor", description: "Get instant help anytime with AI", icon: Brain },
  { href: "/features/meeting-rooms", label: "Virtual Meeting Rooms", description: "Collaborate with peers in real-time", icon: Users },
  { href: "/features/learning-paths", label: "Personalized Learning", description: "Adaptive paths tailored for you", icon: GraduationCap },
  { href: "/features/smart-content", label: "Smart Content Curation", description: "AI-curated learning materials", icon: Sparkles },
  { href: "/features/analytics", label: "Progress Analytics", description: "Track your learning journey", icon: BarChart3 },
]

const moreLinks = [
  { href: "/about", label: "About Us", description: "Learn about our mission and vision" },
  { href: "/#pricing", label: "Pricing", description: "Flexible plans for everyone" },
  { href: "/blog", label: "Blog", description: "Learning tips and insights" },
  { href: "/#contact", label: "Contact Us", description: "Get in touch with support" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(var(--background-rgb), 0.7)", "rgba(var(--background-rgb), 0.98)"]
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "border-b border-border/50 shadow-xl shadow-primary/5" 
          : "border-b border-border/20 shadow-sm shadow-primary/2"
      )}
      style={{
        backgroundColor,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="px-4 sm:px-6 lg:px-12">
        <nav className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <Link href="/" className="group flex items-center gap-2.5 sm:gap-3">
              <div className="relative">
                <ZeeroLogo className="h-9 w-9 sm:h-10 sm:w-10 text-primary transition-transform group-hover:rotate-12 group-hover:scale-110 duration-300" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-base sm:text-lg font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    ZEERO AI
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">Learn Smarter</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden items-center gap-0.5 lg:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Home Link */}
            <Link
              href="/"
              className={cn(
                "relative px-3 xl:px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-lg",
                pathname === "/" ? "text-primary" : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              Home
              {pathname === "/" && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>

            {/* Features Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-primary  data-[state=open]:text-primary data-[state=open]:bg-muted/50 h-10 rounded-lg">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.div
                      className="w-[600px] p-6 bg-background/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="grid gap-4 md:grid-cols-2">
                        {features.map((feature, index) => (
                          <motion.li
                            key={feature.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                href={feature.href}
                                className="group relative flex items-start gap-3 rounded-xl p-4 transition-all hover:bg-gradient-to-br hover:from-primary/5 hover:to-purple-500/5 hover:shadow-lg"
                              >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 text-primary transition-all group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-purple-500/20 group-hover:scale-110">
                                  <feature.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                      {feature.label}
                                    </div>
                                    {feature.badge && (
                                      <span className="text-[10px] font-bold bg-gradient-to-r from-primary to-purple-500 text-white px-2 py-0.5 rounded-full">
                                        {feature.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                    {feature.description}
                                  </p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                              </Link>
                            </NavigationMenuLink>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <Link
                          href="/features"
                          className="flex items-center justify-center gap-2 rounded-lg p-3 text-sm font-semibold text-primary hover:bg-muted transition-colors group"
                        >
                          Explore All Features
                          <ChevronDown className="h-4 w-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 xl:px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-muted/50 rounded-lg">
                  More
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl rounded-xl p-2">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild className="rounded-lg cursor-pointer p-0">
                    <Link href={link.href} className="flex flex-col items-start gap-1 px-3 py-3 w-full hover:bg-muted rounded-lg transition-colors">
                      <span className="font-medium text-sm text-foreground">{link.label}</span>
                      <span className="text-xs text-muted-foreground">{link.description}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {/* Desktop Actions */}
          <motion.div
            className="hidden items-center gap-3 lg:flex flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* {pathname !== "/" && <ThemeToggle />} */}
            
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="hover:bg-muted rounded-lg font-medium text-muted-foreground hover:text-primary transition-all"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
            
            <Button 
              size="sm" 
              asChild 
              className="bg-gradient-to-r from-primary via-purple-500 to-accent hover:shadow-lg hover:shadow-primary/30 transition-all rounded-lg font-semibold gap-1 group"
            >
              <Link href="/auth/sign-up">
                Get Started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden flex-shrink-0">
            {/* {pathname !== "/" && <ThemeToggle />} */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted rounded-lg">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm bg-background/95 backdrop-blur-xl border-l border-border/50 p-0">
                <motion.div
                  className="flex flex-col gap-8 pt-6 px-6 h-full overflow-y-auto"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <div className="flex items-center gap-2.5">
                      <ZeeroLogo className="h-10 w-10 text-primary" />
                      <div>
                        <span className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                          ZEERO
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-muted"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Home */}
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-base font-semibold transition-colors py-2 px-3 rounded-lg",
                      pathname === "/" 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    )}
                  >
                    Home
                  </Link>

                  {/* Mobile Features */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <p className="text-sm font-bold text-foreground">Features</p>
                    </div>
                    <div className="space-y-2 pl-6">
                      {features.map((feature) => (
                        <Link
                          key={feature.href}
                          href={feature.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors py-2 group"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20">
                            <feature.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium group-hover:text-primary">{feature.label}</div>
                            <div className="text-xs text-muted-foreground">{feature.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Mobile More Links */}
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-foreground">Resources</p>
                    <div className="space-y-2 pl-2">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex flex-col gap-1 py-2.5 px-3 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <span className="font-medium text-sm text-foreground group-hover:text-primary">{link.label}</span>
                          <span className="text-xs text-muted-foreground">{link.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex flex-col gap-3 pt-6 border-t border-border/50 pb-6">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      asChild 
                      className="w-full rounded-lg font-semibold border-border/50"
                    >
                      <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      asChild 
                      className="w-full bg-gradient-to-r from-primary to-purple-500 rounded-lg font-semibold gap-2 group"
                    >
                      <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>
                        Get Started
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </motion.header>
  )
}