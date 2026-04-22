import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import AboutHero from "@/components/about/about-hero"
import Mission from "@/components/about/mission"
import Team from "@/components/about/team"
import Values from "@/components/about/values"

export const metadata: Metadata = {
  title: "About Us - Our Mission, Vision & Team",
  description: "Discover ZEERO AI - Zenith of Enhanced Education with Realtime Optimization. Learn about our mission to democratize education through AI, meet our founding team Wasif Sohail, Shahzeb Mustafa & Iqra Khan.",
  keywords: ['ZEERO AI team', 'AI education startup', 'EdTech founders', 'Wasif Sohail', 'Shahzeb Mustafa', 'Iqra Khan', 'education technology mission'],
  openGraph: {
    title: "About ZEERO AI - Transforming Education with AI",
    description: "Meet the team behind ZEERO AI and learn about our mission to make quality education accessible to everyone through artificial intelligence.",
    images: ['/images/zeero-logo.png'],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AboutHero />
      <Mission />
      <Values />
      {/* <Team /> */}
      <Footer />
    </main>
  )
}
