'use client'

import { useState, useEffect } from 'react'
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
import { getHomepageSectionsConfig, HomepageSection } from '@/lib/homepage-builder'

export default function Home() {
  const [sections, setSections] = useState<HomepageSection[]>([])

  useEffect(() => {
    setSections(getHomepageSectionsConfig().sort((a, b) => a.order - b.order))

    const handleConfigChange = () => {
      setSections(getHomepageSectionsConfig().sort((a, b) => a.order - b.order))
    }

    window.addEventListener('smbHomepageConfigChange', handleConfigChange)
    return () => window.removeEventListener('smbHomepageConfigChange', handleConfigChange)
  }, [])

  const renderSection = (sec: HomepageSection) => {
    if (!sec.enabled) return null

    switch (sec.id) {
      case 'banner':
        return <HeroSection key={sec.id} />
      case 'why_choose':
        return <WhyChooseUs key={sec.id} />
      case 'philosophy':
        return <PhilosophySection key={sec.id} />
      case 'curriculum':
        return <CanadianCurriculum key={sec.id} />
      case 'gallery':
        return <SchoolGallery key={sec.id} />
      case 'event':
        return <EventSection key={sec.id} />
      case 'around_world':
        return <MBAroundTheWorld key={sec.id} />
      case 'contact':
        return <LeadCaptureForm key={sec.id} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {sections.length > 0 ? (
          sections.map((sec) => renderSection(sec))
        ) : (
          <>
            <HeroSection />
            <WhyChooseUs />
            <PhilosophySection />
            <CanadianCurriculum />
            <SchoolGallery />
            <EventSection />
            <MBAroundTheWorld />
            <LeadCaptureForm />
          </>
        )}
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}
