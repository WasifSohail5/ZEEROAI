"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Linkedin, 
  Twitter,
  Phone,
  CheckCircle2,
  Loader2,
  Sparkles
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["founder@zeeroai.me", "info@zeeroai.me"],
    gradient: "from-blue-500 to-cyan-500",
    href: "mailto:founder@zeeroai.me",
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["Pakistan", "Remote-First Company"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Support Hours",
    details: ["24/7 AI Support", "Response within 24h"],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Phone,
    title: "Quick Response",
    details: ["Average response: 2 hours", "Live chat available"],
    gradient: "from-orange-500 to-red-500",
  },
]

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn", gradient: "from-blue-600 to-blue-500" },
  { icon: Twitter, href: "#", label: "Twitter", gradient: "from-sky-500 to-blue-400" },
]

// Animated Input Component
const AnimatedInput = ({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  required = false,
  textarea = false 
}: { 
  id: string
  label: string
  type?: string
  placeholder: string
  required?: boolean
  textarea?: boolean
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const InputComponent = textarea ? Textarea : Input

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Label 
        htmlFor={id}
        className={cn(
          "text-sm font-medium transition-colors",
          isFocused ? "text-primary" : "text-foreground"
        )}
      >
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      <div className="relative mt-2">
        <InputComponent
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className={cn(
            "w-full bg-background/50 border-2 transition-all duration-300",
            isFocused ? "border-primary shadow-lg shadow-primary/20" : "border-border/50",
            textarea && "resize-none min-h-[120px]"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false)
            setHasValue(e.target.value !== "")
          }}
          {...(textarea && { rows: 4 })}
        />
        {isFocused && (
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg -z-10 blur opacity-30"
            layoutId="input-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>
    </motion.div>
  )
}

// Contact Info Card
const ContactCard = ({ info, index }: { info: typeof contactInfo[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <Card className="relative overflow-hidden border-2 border-border/50 bg-card/30 backdrop-blur-xl p-6 group cursor-pointer">
        {/* Gradient Glow */}
        <motion.div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
            info.gradient
          )}
        />

        <div className="relative flex items-start gap-4">
          {/* Icon */}
          <motion.div
            className={cn(
              "flex-shrink-0 p-3 rounded-xl bg-gradient-to-br shadow-lg",
              info.gradient
            )}
            animate={isHovered ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <info.icon className="h-6 w-6 text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {info.title}
            </h3>
            {info.details.map((detail, i) => (
              <p key={i} className="text-sm text-muted-foreground">
                {detail}
              </p>
            ))}
          </div>

          {/* Hover Arrow */}
          {info.href && (
            <motion.div
              className="absolute top-6 right-6 text-primary"
              initial={{ opacity: 0, x: -10 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            >
              <Send className="h-4 w-4" />
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  )

  return info.href ? (
    <a href={info.href} className="block">
      {content}
    </a>
  ) : content
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    toast.success("Message sent successfully! We'll get back to you soon.")
    
    setTimeout(() => {
      setIsSuccess(false);
      (e.target as HTMLFormElement).reset()
    }, 3000)
  }

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="contact">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Let's Connect</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Get in Touch
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-xl p-8 shadow-2xl">
              {!isSuccess ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Send a Message</h3>
                      <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <AnimatedInput
                        id="firstName"
                        label="First Name"
                        placeholder="John"
                        required
                      />
                      <AnimatedInput
                        id="lastName"
                        label="Last Name"
                        placeholder="Doe"
                        required
                      />
                    </div>

                    <AnimatedInput
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />

                    <AnimatedInput
                      id="subject"
                      label="Subject"
                      placeholder="How can we help you?"
                      required
                    />

                    <AnimatedInput
                      id="message"
                      label="Message"
                      placeholder="Tell us more about your inquiry..."
                      textarea
                      required
                    />

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 relative overflow-hidden group"
                        disabled={isSubmitting}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </Button>
                    </motion.div>
                  </form>
                </>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="inline-flex p-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-6"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. We'll get back to you shortly.
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Right Side - Contact Info & Map */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <ContactCard key={info.title} info={info} index={index} />
              ))}
            </div>

            {/* Map */}
            <motion.div
              className="relative overflow-hidden rounded-2xl border-2 border-border/50 bg-card/30 backdrop-blur-xl shadow-2xl h-[300px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618912.5897751483!2d67.70969839999999!3d30.375321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db52d2f8fd751f%3A0x46b7a1f7e614925c!2sPakistan!5e0!3m2!1sen!2s!4v1706000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ZEERO AI Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>

            {/* Social Links */}
            <Card className="border-2 border-border/50 bg-card/30 backdrop-blur-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br shadow-lg text-white",
                      social.gradient
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}