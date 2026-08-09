'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import {
  HeroSection,
  WhyChooseUs,
  PhilosophySection,
  CanadianCurriculum,
  SchoolGallery,
  EventSection,
  MBAroundTheWorld,
  LeadCaptureForm,
} from '@/components/sections'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Section 1: Banner / Hero */}
        <HeroSection />

        {/* Section 2: Why Choose */}
        <WhyChooseUs />

        {/* Section 3: Our School Philosophy */}
        <PhilosophySection />

        {/* Section 4: Canadian Curriculum */}
        <CanadianCurriculum />

        {/* Section 5: School Gallery */}
        <SchoolGallery />

        {/* Section 6: Event (Join Us For Openday) */}
        <EventSection />

        {/* Section 7: MB Around the world */}
        <MBAroundTheWorld />

        {/* Section 8: Contact us */}
        <LeadCaptureForm />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}
