"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff, Check, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "Lowercase letter", met: /[a-z]/.test(formData.password) },
    { label: "Number", met: /\d/.test(formData.password) },
  ]

  const allRequirementsMet = passwordRequirements.every((req) => req.met)
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (!passwordRequirements.every((req) => req.met)) {
      toast.error("Please meet all password requirements")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      })

      if (error) {
        toast.error(error.message)
        return
      }

      router.push("/auth/sign-up-success")
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Marketing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex flex-col justify-center space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Join 50K+ Learners</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                Start Learning
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2">
                  With AI
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get personalized learning paths, AI tutoring, and detailed progress analytics—all in one platform.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                { icon: "🎯", title: "Personalized Learning", desc: "AI adapts to your pace" },
                { icon: "📊", title: "Progress Tracking", desc: "See real-time improvements" },
                { icon: "🤖", title: "24/7 AI Tutor", desc: "Help whenever you need it" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="text-2xl mt-1">{feature.icon}</div>
                  <div>
                    <div className="font-semibold text-foreground">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:max-w-none"
          >
            {/* Logo */}
            <div className="flex flex-col items-center mb-8 lg:hidden">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-primary"
                  >
                    <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                    <path d="M30 70 L45 45 L60 60 L75 35 L90 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="45" cy="45" r="4" fill="currentColor" />
                    <circle cx="75" cy="35" r="4" fill="currentColor" />
                    <circle cx="60" cy="60" r="5" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">ZEERO AI</span>
              </Link>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">Create Account</CardTitle>
                <CardDescription className="text-base">Join thousands of successful learners</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-semibold">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        className="rounded-lg border-border/50 bg-muted/50 focus:bg-background focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-semibold">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        className="rounded-lg border-border/50 bg-muted/50 focus:bg-background focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="rounded-lg border-border/50 bg-muted/50 focus:bg-background focus:border-primary transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="rounded-lg border-border/50 bg-muted/50 focus:bg-background focus:border-primary transition-all pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {/* Password Requirements */}
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 rounded-lg bg-muted/30 space-y-2"
                      >
                        {passwordRequirements.map((req) => (
                          <div
                            key={req.label}
                            className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                              req.met ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                            }`}
                          >
                            <div className={`flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${
                              req.met 
                                ? "border-emerald-600 bg-emerald-600/10" 
                                : "border-muted-foreground"
                            }`}>
                              {req.met && <Check className="h-2.5 w-2.5 text-emerald-600" />}
                            </div>
                            {req.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        className="rounded-lg border-border/50 bg-muted/50 focus:bg-background focus:border-primary transition-all pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formData.confirmPassword && !passwordsMatch && (
                      <p className="text-xs text-destructive font-medium">Passwords do not match</p>
                    )}
                    {formData.confirmPassword && passwordsMatch && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <Check className="h-3 w-3" /> Passwords match
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit" 
                    className="w-full rounded-lg font-semibold gap-2 bg-gradient-to-r from-primary to-purple-500 hover:shadow-lg hover:shadow-primary/25 transition-all group" 
                    disabled={isLoading || !allRequirementsMet || !passwordsMatch}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  {/* Terms */}
                  <p className="text-center text-xs text-muted-foreground">
                    By signing up, you agree to our{" "}
                    <Link href="#" className="text-primary hover:underline font-medium">
                      Terms of Service
                    </Link>
                    {" "}and{" "}
                    <Link href="#" className="text-primary hover:underline font-medium">
                      Privacy Policy
                    </Link>
                  </p>
                </form>

                {/* Divider */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-card px-3 text-muted-foreground font-medium">Already have an account?</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mt-6 rounded-lg border-border/50 hover:bg-muted transition-all font-semibold" 
                    asChild
                  >
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}