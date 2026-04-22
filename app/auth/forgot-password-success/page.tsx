"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, CheckCircle2, Clock, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function ForgotPasswordSuccessPage() {
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  async function handleResendEmail() {
    const email = localStorage.getItem("resetEmail")
    
    if (!email) {
      toast.error("Email not found. Please try again.")
      router.push("/auth/forgot-password")
      return
    }

    setIsResending(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success("Reset email sent again!")
      setCountdown(60)
      setCanResend(false)
    } catch {
      toast.error("Failed to resend email")
    } finally {
      setIsResending(false)
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
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
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center"
            >
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </motion.div>

            <CardTitle className="text-2xl font-bold text-foreground">Check Your Email</CardTitle>
            <CardDescription className="text-base">
              We've sent you a password reset link
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Email Icon */}
            <div className="flex justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
              >
                <Mail className="h-10 w-10 text-primary" />
              </motion.div>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-sm text-muted-foreground text-center">
                  Click the link in the email to reset your password. The link will expire in{" "}
                  <span className="font-semibold text-foreground">1 hour</span> for security.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {[
                  "Check your email inbox",
                  "Click the reset password link",
                  "Create your new password",
                  "Sign in with new credentials",
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{i + 1}</span>
                    </div>
                    <span className="text-muted-foreground">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resend Email */}
            <div className="pt-4 border-t border-border/50">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email?
                </p>
                
                {canResend ? (
                  <Button
                    onClick={handleResendEmail}
                    disabled={isResending}
                    variant="outline"
                    className="w-full rounded-lg border-border/50 hover:bg-muted transition-all font-semibold"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Resend Email
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Resend available in {countdown}s</span>
                  </div>
                )}
              </div>
            </div>

            {/* Spam Notice */}
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs text-amber-700 dark:text-amber-400 font-medium text-center">
                💡 Check your spam folder if you don't see the email
              </p>
            </div>

            {/* Back to Login */}
            <Button 
              variant="ghost" 
              className="w-full rounded-lg font-semibold group" 
              asChild
            >
              <Link href="/auth/login" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Sign In
              </Link>
            </Button>
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
  )
}