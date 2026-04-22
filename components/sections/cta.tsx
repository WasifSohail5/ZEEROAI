import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 sm:p-12 lg:p-16">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
              Join thousands of students already using ZEERO AI to accelerate their education. Start your journey today with our free trial.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 px-8" asChild>
                <Link href="/auth/sign-up">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
