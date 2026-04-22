"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Lightbulb, Heart, Shield, Users, Zap, Globe, Star } from "lucide-react"

const values = [
  { icon: Lightbulb, title: "Radical Innovation", desc: "We challenge conventions and push AI boundaries daily.", color: "from-amber-500 to-orange-500" },
  { icon: Heart, title: "Learner Obsessed", desc: "Every feature is designed with students at the center.", color: "from-rose-500 to-pink-500" },
  { icon: Shield, title: "Unbreakable Trust", desc: "Privacy and data security are non-negotiable.", color: "from-blue-500 to-cyan-500" },
  { icon: Users, title: "Radical Inclusion", desc: "Education should have no borders — geographic or economic.", color: "from-emerald-500 to-teal-500" },
  { icon: Zap, title: "Obsessive Quality", desc: "We settle for nothing less than excellence.", color: "from-purple-500 to-violet-500" },
  { icon: Globe, title: "Global Impact", desc: "Building technology that scales across cultures and continents.", color: "from-indigo-500 to-purple-500" },
]

export default function CoreValues() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" /> OUR DNA
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Values That Define Us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group relative bg-card border border-border/50 rounded-3xl p-8 hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color} mb-6 text-white shadow-xl group-hover:scale-110 transition-transform`}>
                <value.icon className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-8" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}