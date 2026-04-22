"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter, Mail, Github } from "lucide-react"

const team = [
  {
    name: "Wasif Sohail",
    role: "Co-Founder & CEO",
    bio: "Visionary leader driving ZEERO AI's mission to democratize education through artificial intelligence. Passionate about making quality learning accessible to everyone.",
    image: "/images/team/wasif-sohail.jpg",
    email: "wasifsohail66@gmail.com",
    linkedin: "https://www.linkedin.com/in/wasif-sohail-1858463a1",
    github: "https://github.com/WasifSohail5",
  },
  {
    name: "Shahzeb Mustafa",
    role: "Co-Founder & CTO",
    bio: "Technical architect behind ZEERO AI's innovative platform. Expert in AI/ML systems, scalable architecture, and building cutting-edge educational technology solutions.",
    image: "",
    email: "info@zeeroai.me",
    linkedin: "#",
  },
  {
    name: "Iqra Khan",
    role: "AI/ML Engineer",
    bio: "Expert in machine learning and deep learning models powering ZEERO AI's video generation and intelligent tutoring systems. Focused on creating adaptive learning experiences.",
    image: "",
    email: "iqra27863@gmail.com",
    linkedin: "https://www.linkedin.com/in/iqra-khan-779a44266/",
    github: "https://github.com/iqra-khan740",
  },
]

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet Our Founders
          </h2>
          <p className="mt-4 text-muted-foreground">
            The passionate leaders behind ZEERO AI who are dedicated to transforming education with AI
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                  {member.image ? (
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-primary/50">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  <div className="mt-6 flex justify-center gap-3">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    {member.linkedin && member.linkedin !== "#" && (
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.linkedin === "#" && (
                      <a 
                        href={member.linkedin}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {"github" in member && member.github && (
                      <a 
                        href={member.github as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
