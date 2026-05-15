'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  HeroSection,
  TrustBar,
  WhyChooseUs,
  ProgramCards,
  StatsCounter,
  DailySchedule,
  FacilityGallery,
  TeacherTeam,
  Testimonials,
  NewsGrid,
  PartnersSection,
  LeadCaptureForm,
  VideoSection,
} from '@/components/sections'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* 1. Hero — Full viewport introduction */}
        <HeroSection />

        {/* 2. Trust Bar — Partner logos marquee */}
        <TrustBar />

        {/* 3. Why Choose Us — 6 feature cards */}
        <WhyChooseUs />

        {/* 4. Video Section — Introduction */}
        <VideoSection />

        {/* 5. Programs — 5 bear-themed class cards */}
        <ProgramCards />

        {/* 6. Stats Counter — Count-up numbers */}
        <StatsCounter />

        {/* 7. Daily Schedule — Timeline */}
        <DailySchedule />

        {/* 8. Facility Gallery — Masonry grid + lightbox */}
        <FacilityGallery />

        {/* 9. Teachers — Flip cards */}
        <TeacherTeam />

        {/* 10. Learning Philosophy — Educational approach */}
        <Testimonials />

        {/* 11. News — Blog grid */}
        <NewsGrid />

        {/* 12. Partners — Logo wall */}
        <PartnersSection />

        {/* 13. Lead Capture Form */}
        <LeadCaptureForm />
      </main>
      <Footer />
    </div>
  )
}
