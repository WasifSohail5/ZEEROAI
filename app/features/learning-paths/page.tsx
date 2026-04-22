"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { GraduationCap, Target, TrendingUp, Award, Compass, Zap, ArrowRight, Sparkles, Brain, Rocket } from "lucide-react"

const features = [
  { icon: Target, title: "Adaptive Difficulty", description: "Content automatically adjusts to your skill level, keeping you challenged but not overwhelmed." },
  { icon: Compass, title: "Learning Style Detection", description: "Our AI identifies how you learn best - visual, auditory, or hands-on - and adapts accordingly." },
  { icon: TrendingUp, title: "Progress Tracking", description: "Detailed analytics show your growth over time with insights on strengths and areas to improve." },
  { icon: Zap, title: "Smart Recommendations", description: "Get personalized suggestions for what to learn next based on your goals and progress." },
  { icon: Award, title: "Achievements & Badges", description: "Earn recognition for your accomplishments and stay motivated throughout your journey." },
  { icon: Brain, title: "Memory Reinforcement", description: "Spaced repetition algorithms ensure you retain what you learn for the long term." },
]

const stats = [
  { value: "10x", label: "Faster Learning" },
  { value: "95%", label: "Completion Rate" },
  { value: "50K+", label: "Active Learners" },
]

export default function LearningPathsFeature() {
  return (
    <main className="min-h-screen bg-gradient-to-b px-12 from-background via-background to-muted/20">
      <Navbar />
      
      {/* Hero Section - Redesigned */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-purple-500/3 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-purple-500/10 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>AI-Powered Personalization</span>
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Learn Smarter,
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2">
                  Not Harder
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Experience education tailored precisely to you. Our AI crafts a unique learning journey that evolves with your progress, ensuring maximum efficiency and engagement.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="group shadow-lg shadow-primary/25" asChild>
                  <Link href="/auth/sign-up">
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2" asChild>
                  <Link href="#demo">
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              {/* Floating Cards */}
              <div className="relative">
                <div className="absolute -top-8 -left-8 z-10 animate-float">
                  <Card className="border-2 border-primary/20 shadow-xl bg-card/80 backdrop-blur-sm w-48">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Rocket className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Progress</div>
                          <div className="text-lg font-bold">87%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute -bottom-6 -right-6 z-10 animate-float-delayed">
                  <Card className="border-2 border-purple-500/20 shadow-xl bg-card/80 backdrop-blur-sm w-44">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <Award className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Streak</div>
                          <div className="text-lg font-bold">12 days</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Image */}
                <div className="overflow-hidden rounded-3xl border-2 border-border/50 shadow-2xl shadow-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
                  <Image
                    src="/images/features/learning-path.jpg"
                    alt="Personalized Learning Paths"
                    width={700}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
              <GraduationCap className="h-4 w-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground">
              AI That Knows How You Learn Best
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our intelligent platform adapts to your unique learning style, pace, and goals
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, index) => (
              <Card 
                key={item.title} 
                className="group border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - New */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to your personalized learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Tell Us Your Goals", desc: "Share what you want to learn and we'll assess your current level" },
              { step: "02", title: "AI Creates Your Path", desc: "Our algorithm designs a custom curriculum tailored to you" },
              { step: "03", title: "Learn & Grow", desc: "Follow your path while AI adjusts based on your progress" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/25">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm px-5 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Join 50,000+ Learners</span>
            </div>
            
            <h2 className="text-5xl font-bold text-foreground">
              Your Perfect Learning Path
              <span className="block mt-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Awaits You
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your personalized learning journey today. No credit card required.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6 shadow-xl shadow-primary/25 group" asChild>
                <Link href="/auth/sign-up">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2" asChild>
                <Link href="/contact">
                  Talk to Sales
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ✓ Free 14-day trial &nbsp; ✓ No credit card required &nbsp; ✓ Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite 1.5s;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </main>
  )
}