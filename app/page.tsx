import Navbar from "@/components/layout/navbar"
import Hero from "@/components/sections/hero"
import AnimatedStats from "@/components/sections/animated-stats"
import TechStack from "@/components/sections/tech-stack"
import FeaturesPreview from "@/components/sections/features-preview"
import AboutPreview from "@/components/sections/about-preview"
import BlogSection from "@/components/sections/blog-section"
import PricingSection from "@/components/sections/pricing-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/layout/footer"
import SceneWrapper from "@/components/three/scene-wrapper"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <SceneWrapper />
      <Navbar />
      <Hero />
      <AnimatedStats />
      <TechStack />
      <FeaturesPreview />
      <AboutPreview />
      <BlogSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
