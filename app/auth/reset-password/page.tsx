"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff, Check, ArrowRight, Lock, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Lowercase letter", met: /[a-z]/.test(password) },
    { label: "Number", met: /\d/.test(password) },
  ]

  const allRequirementsMet = passwordRequirements.every((req) => req.met)
  const passwordsMatch = password === confirmPassword && password.length > 0

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (!allRequirementsMet) {
      toast.error("Please meet all password requirements")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success("Password updated successfully!")
      router.push("/auth/login")
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
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Create New Password</CardTitle>
            <CardDescription className="text-base">
              Your new password must be different from previous passwords
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-5">
              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-lg border-border/50 bg-muted/50 focus:bg-background focus:border-primary transition-all pr-10"
                    autoFocus
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
                {password && (
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
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                {confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-destructive font-medium">Passwords do not match</p>
                )}
                {confirmPassword && passwordsMatch && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="h-3 w-3" /> Passwords match
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full rounded-lg font-semibold gap-2 bg-gradient-to-r from-primary to-purple-500 hover:shadow-lg hover:shadow-primary/25 transition-all group py-6" 
                disabled={isLoading || !allRequirementsMet || !passwordsMatch}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating password...
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              {/* Security Note */}
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  ✓ Your password is encrypted and stored securely
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}