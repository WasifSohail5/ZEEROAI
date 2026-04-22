import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowRight } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/zeero-logo.png"
              alt="ZEERO AI"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <span className="text-2xl font-bold tracking-tight text-foreground">ZEERO AI</span>
          </Link>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">Check Your Email</CardTitle>
            <CardDescription className="text-base">
              We have sent a confirmation link to your email address. Please click the link to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h3 className="font-medium text-foreground">What happens next?</h3>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  Check your inbox for the confirmation email
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  Click the verification link in the email
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  Start exploring ZEERO AI features
                </li>
              </ul>
            </div>

            <Button className="w-full gap-2" asChild>
              <Link href="/auth/login">
                Continue to Sign In
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              {"Did not receive the email? "}
              <button className="text-primary hover:underline">Resend verification email</button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
