import { Sparkles } from "lucide-react"

export default function FeaturesHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Cutting-Edge AI Technology</span>
          </div>
          
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Features Built for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Modern Learning
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed">
            Explore the innovative features that make ZEERO AI the most advanced AI-powered education platform. From video generation to personalized tutoring, we have everything you need.
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
    </section>
  )
}
