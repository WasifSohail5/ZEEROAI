import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import FeaturesHero from "@/components/features/features-hero"
import FeaturesList from "@/components/features/features-list"
import HowItWorks from "@/components/features/how-it-works"
import Testimonials from "@/components/features/testimonials"

export const metadata: Metadata = {
  title: "Features - ZEERO AI | AI-Powered Education Platform",
  description: "Discover the powerful features of ZEERO AI: AI video generation, personalized learning paths, virtual meeting rooms, and intelligent tutoring.",
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FeaturesHero />
      <FeaturesList />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  )
}
