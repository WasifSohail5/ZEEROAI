"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Eye, Rocket, ArrowRight } from "lucide-react"
// import { ZeeroLogo } from "./ZeeroLogo"

const missions = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To democratize world-class education using artificial intelligence, removing barriers of geography, economy, and background.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "A future where every student has a personal AI mentor that understands their learning style and helps them reach their highest potential.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Rocket,
    title: "Our North Star",
    desc: "Become the most trusted and impactful AI education platform in the world — used by millions of learners across every continent.",
    color: "from-emerald-500 to-teal-500",
  },
]

export default function MissionVision() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Visual */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-3xl" />
                <div className="relative bg-card border border-border/50 rounded-3xl p-10 shadow-2xl">
                  {/* <ZeeroLogo className="h-16 w-16 mb-6 text-primary" /> */}
                  <h2 className="text-4xl font-bold tracking-tight mb-6">
                    Our Purpose is<br />Clear
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We don’t just build tools.<br />
                    We build futures.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-8">
            {missions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-gradient-to-br from-card to-card/60 border border-border/50 rounded-3xl p-8 hover:border-primary/30 transition-all duration-500 flex gap-6"
              >
                <div className={`flex-shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-7 w-7" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-[15.5px]">{item.desc}</p>
                  
                  <div className="mt-6 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}