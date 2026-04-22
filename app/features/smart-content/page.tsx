"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Sparkles, Search, Filter, BookMarked, RefreshCw, Star, ArrowRight, Zap, TrendingUp, Award, Check } from "lucide-react"

const features = [
  { icon: Search, title: "Intelligent Discovery", description: "AI finds the most relevant content from millions of resources based on what you're learning." },
  { icon: Filter, title: "Quality Filtering", description: "Only the best educational materials make it through our AI quality assessment system." },
  { icon: BookMarked, title: "Curated Collections", description: "Pre-built learning collections for popular topics, curated by AI and education experts." },
  { icon: RefreshCw, title: "Always Updated", description: "Content recommendations stay current as new materials are published and old ones become outdated." },
  { icon: Star, title: "Community Ratings", description: "See what other learners found helpful with integrated ratings and reviews." },
  { icon: Zap, title: "Instant Access", description: "Get immediate access to thousands of verified educational resources in one place." },
]

const contentTypes = [
  { label: "Video Tutorials", count: "25K+" },
  { label: "Interactive Exercises", count: "50K+" },
  { label: "Articles & Guides", count: "100K+" },
  { label: "Practice Tests", count: "15K+" },
]

const benefits = [
  "AI-verified quality across all resources",
  "Personalized recommendations based on your progress",
  "Save hours of searching and filtering",
  "Multi-format learning materials",
]

export default function SmartContentFeature() {
  return (
    <main className="min-h-screen px-12 bg-gradient-to-b from-background via-muted/10 to-background">
      <Navbar />
      
      {/* Hero Section - Redesigned */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-primary/3 to-purple-500/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-purple-500/10 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span>AI-Powered Content Discovery</span>
                </div>
                
                <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-tight">
                  Stop Searching.
                  <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2">
                    Start Learning.
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Our AI instantly curates the perfect learning materials from millions of resources. Quality-verified, perfectly matched to your goals, and always up-to-date.
                </p>

                {/* Benefits List */}
                <div className="space-y-3 pt-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground/80">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="group shadow-lg shadow-primary/25" asChild>
                    <Link href="/auth/sign-up">
                      Explore Content Now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-2" asChild>
                    <Link href="#features">
                      See How It Works
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right - Content Stats Grid */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {contentTypes.map((item, i) => (
                    <Card 
                      key={i} 
                      className="border-2 border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                          {item.count}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">{item.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-6 -right-6 animate-float">
                  <div className="bg-gradient-to-br from-primary to-purple-500 text-white px-4 py-3 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      <div className="text-sm font-bold">99.9% Quality</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned */}
      <section id="features" className="py-24 relative">
        <div className="">
          <div className="container mx-auto">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
                <TrendingUp className="h-4 w-4" />
                <span>Intelligent Curation</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                AI That Knows What You Need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our smart curation engine analyzes millions of resources to surface only the best content for you
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, index) => (
                <Card 
                  key={item.title} 
                  className="group border-border/50 bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden relative"
                >
                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - New Section */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className=" relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold text-foreground">How Smart Curation Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From millions of resources to your perfect learning material in seconds
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: "1", title: "You Set Goals", desc: "Tell us what you want to learn", icon: Search },
                { num: "2", title: "AI Analyzes", desc: "We scan millions of resources", icon: Sparkles },
                { num: "3", title: "Quality Check", desc: "Only the best materials pass", icon: Filter },
                { num: "4", title: "You Learn", desc: "Get personalized content feed", icon: BookMarked },
              ].map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  {/* <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 text-white font-bold flex items-center justify-center shadow-lg">
                    {step.num}
                  </div> */}
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className=" relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm px-5 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>No More Wasted Time Searching</span>
            </div>
            
            <h2 className="text-5xl font-bold text-foreground">
              Ready for Smarter
              <span className="block mt-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Content Discovery?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners who've stopped wasting time on irrelevant content. Let AI find exactly what you need.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6 shadow-xl shadow-primary/25 group" asChild>
                <Link href="/auth/sign-up">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2" asChild>
                <Link href="/content-library">
                  Browse Content Library
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>190K+ Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>AI Quality Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Always Updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
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