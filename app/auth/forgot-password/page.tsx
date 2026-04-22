"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, ArrowRight, Sparkles, Mail, ArrowLeft, Shield, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

async function handleResetPassword(e: React.FormEvent) {
  e.preventDefault()
  setIsLoading(true)

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      toast.error(error.message)
      return
    }

    // Store email for resend functionality
    localStorage.setItem("resetEmail", email)
    
    toast.success("Password reset email sent! Check your inbox.")
    router.push("/auth/forgot-password-success")
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/3 to-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Marketing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex flex-col justify-center space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
                <Shield className="h-4 w-4" />
                <span>Secure Recovery</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                Reset Your
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2">
                  Password
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Don't worry! It happens. We'll send you a secure link to reset your password.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {[
                { 
                  icon: <Mail className="h-5 w-5" />, 
                  title: "Enter your email", 
                  desc: "We'll send you a reset link" 
                },
                { 
                  icon: <Clock className="h-5 w-5" />, 
                  title: "Check your inbox", 
                  desc: "Link expires in 1 hour" 
                },
                { 
                  icon: <Shield className="h-5 w-5" />, 
                  title: "Create new password", 
                  desc: "Secure your account again" 
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{step.title}</div>
                    <div className="text-sm text-muted-foreground">{step.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                💡 Tip: Check your spam folder if you don't see the email within a few minutes.
              </p>
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
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">Forgot Password?</CardTitle>
                <CardDescription className="text-base">No worries, we'll send you reset instructions</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-5">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-lg border-border/50 bg-muted/50 focus:bg-background focus:border-primary transition-all"
                      autoFocus
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the email address associated with your account
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full rounded-lg font-semibold gap-2 bg-gradient-to-r from-primary to-purple-500 hover:shadow-lg hover:shadow-primary/25 transition-all group py-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending reset link...
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  {/* Security Note */}
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                      ✓ Password reset link will expire in 1 hour for security
                    </p>
                  </div>
                </form>

                {/* Back to Login */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-card px-3 text-muted-foreground font-medium">Remember your password?</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mt-6 rounded-lg border-border/50 hover:bg-muted transition-all font-semibold group" 
                    asChild
                  >
                    <Link href="/auth/login" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                      Back to Sign In
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need help? Contact{" "}
                <Link href="mailto:support@zeeroai.com" className="text-primary hover:underline font-medium">
                  support@zeeroai.com
                </Link>
              </p>
            </div>
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