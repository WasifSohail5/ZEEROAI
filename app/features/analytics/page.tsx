"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { BarChart3, TrendingUp, Clock, Target, FileText, Share2, ArrowRight, Zap, Award, Brain, Activity, Flame, Lightbulb, Check } from "lucide-react"

const features = [
  { icon: TrendingUp, title: "Progress Visualization", description: "Beautiful charts and graphs showing your learning progress over time across all subjects." },
  { icon: Clock, title: "Time Analytics", description: "Track study time, optimal learning hours, and identify when you're most productive." },
  { icon: Target, title: "Goal Tracking", description: "Set learning goals and monitor your progress towards achieving them with milestone tracking." },
  { icon: FileText, title: "Detailed Reports", description: "Generate comprehensive reports on your learning journey for self-review or sharing." },
  { icon: Share2, title: "Shareable Insights", description: "Share your achievements and progress with teachers, parents, or potential employers." },
  { icon: Brain, title: "Learning Insights", description: "Get AI-powered recommendations based on your learning patterns and performance data." },
]

const metrics = [
  { label: "Learning Streaks", icon: Flame, color: "from-orange-500 to-red-500" },
  { label: "Study Time", icon: Clock, color: "from-blue-500 to-cyan-500" },
  { label: "Accuracy Rate", icon: Target, color: "from-green-500 to-emerald-500" },
  { label: "Skill Level", icon: Award, color: "from-purple-500 to-pink-500" },
]

const insights = [
  { title: "Peak Learning Hours", desc: "You learn best between 9-11 AM" },
  { title: "Top Subject", desc: "Mathematics with 92% mastery" },
  { title: "Learning Velocity", desc: "40% faster than average" },
  { title: "Consistency Score", desc: "8-day active learning streak" },
]

export default function AnalyticsFeature() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-muted/5 to-background">
      <Navbar />
      
      {/* Hero Section - Redesigned */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-primary/3 via-purple-500/3 to-emerald-500/3 rounded-full blur-3xl"></div>
        </div>

        <div className=" relative z-10">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-emerald-500/10 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur-sm">
                  <BarChart3 className="h-4 w-4 animate-pulse" />
                  <span>Advanced Analytics</span>
                </div>
                
                <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-tight">
                  See Your
                  <span className="block bg-gradient-to-r from-primary via-emerald-500 to-cyan-500 bg-clip-text text-transparent mt-2">
                    Real Progress
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform raw learning data into actionable insights. Visual analytics, AI recommendations, and detailed reports that help you learn smarter every single day.
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="border border-border/50 rounded-lg p-4 bg-card/50 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-xs text-muted-foreground mt-1">Analytics Metrics</div>
                  </div>
                  <div className="border border-border/50 rounded-lg p-4 bg-card/50 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-emerald-500">Real-Time</div>
                    <div className="text-xs text-muted-foreground mt-1">Live Updates</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="group shadow-lg shadow-primary/25" asChild>
                    <Link href="/auth/sign-up">
                      View Your Analytics
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-2" asChild>
                    <Link href="#demo">
                      See Dashboard
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right - Analytics Dashboard Mock */}
              <div className="relative">
                {/* Main Dashboard Card */}
                <Card className="border-2 border-border/50 shadow-2xl shadow-primary/20 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {/* Header */}
                      <div>
                        <h3 className="font-bold text-lg text-foreground">Learning Dashboard</h3>
                        <p className="text-xs text-muted-foreground mt-1">This week's performance</p>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {metrics.map((metric, i) => (
                          <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/20 hover:shadow-lg transition-all">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mb-3`}>
                              <metric.icon className="h-5 w-5" />
                            </div>
                            <div className="text-sm font-semibold text-foreground">{metric.label}</div>
                            <div className="text-2xl font-bold text-primary mt-1">
                              {i === 0 ? "8" : i === 1 ? "14h" : i === 2 ? "92%" : "4/5"}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">Weekly Goal</span>
                          <span className="text-sm font-bold text-primary">75%</span>
                        </div>
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-primary to-emerald-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating Card 1 */}
                <div className="absolute -top-6 -right-6 animate-float">
                  <Card className="border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 shadow-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div className="text-sm">
                          <div className="font-bold text-foreground">+25%</div>
                          <div className="text-xs text-muted-foreground">This Month</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute -bottom-6 -left-6 animate-float-delayed">
                  <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 shadow-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <Flame className="h-5 w-5 text-orange-500" />
                        </div>
                        <div className="text-sm">
                          <div className="font-bold text-foreground">8 Days</div>
                          <div className="text-xs text-muted-foreground">Streak</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section - New */}
      <section className="py-20 relative">
        <div className="">
          <div className="container mx-auto">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
                <Activity className="h-4 w-4" />
                <span>AI-Powered Insights</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                Understand Your Learning Patterns
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI analyzes your data to surface meaningful patterns and personalized recommendations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insights.map((insight, i) => (
                <Card 
                  key={i}
                  className="group border-border/50 bg-gradient-to-br from-card to-card/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{insight.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className=" relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold text-foreground">
                Comprehensive Analytics Suite
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to understand and optimize your learning
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, index) => (
                <Card 
                  key={item.title} 
                  className="group border-border/50 bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-emerald-500/10 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
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

      {/* Comparison Section - New */}
      <section className="py-20 relative">
        <div className="">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Track Everything That Matters
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Personal", items: ["Progress charts", "Time tracking", "Goal setting"], icon: Brain },
                { title: "Academic", items: ["Subject mastery", "Performance trends", "Skill analysis"], icon: Award },
                { title: "Social", items: ["Share achievements", "Compare progress", "Leaderboards"], icon: Share2 },
              ].map((category, i) => (
                <Card 
                  key={i}
                  className="border-2 border-border/50 bg-gradient-to-br from-card to-card/50 hover:shadow-xl transition-all"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-500/10 flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg text-foreground">{category.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {category.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-emerald-500/10 to-cyan-500/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className=" relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm px-5 py-2 text-sm text-primary">
              <Zap className="h-4 w-4 animate-pulse" />
              <span>Data-Driven Learning</span>
            </div>
            
            <h2 className="text-5xl font-bold text-foreground">
              Your Learning Data,
              <span className="block mt-2 bg-gradient-to-r from-primary via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Your Superpower
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Turn your learning journey into measurable success. Track progress, identify patterns, and make data-driven decisions to accelerate your growth.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6 shadow-xl shadow-primary/25 group" asChild>
                <Link href="/auth/sign-up">
                  Start Tracking Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2" asChild>
                <Link href="/features/analytics">
                  Learn More
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Real-Time Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>AI Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Shareable Reports</span>
              </div>
            </div>
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