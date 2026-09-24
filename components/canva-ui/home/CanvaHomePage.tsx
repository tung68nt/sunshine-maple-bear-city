'use client'

import React from 'react'
import { CanvaHeader } from '../CanvaHeader'
import { CanvaFooter } from '../CanvaFooter'
import {
  CanvaHeroSection,
  CanvaIntroPromiseSection,
  CanvaHeadMessageSection,
  CanvaWhyChooseSection,
  CanvaCurriculumSection,
  CanvaFacilitiesSection,
  CanvaWorldMapSection,
  CanvaContactFormSection,
} from './index'

export function CanvaHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <CanvaHeader />
      <main className="flex-1">
        <CanvaHeroSection />
        <CanvaIntroPromiseSection />
        <CanvaHeadMessageSection />
        <CanvaWhyChooseSection />
        <CanvaCurriculumSection />
        <CanvaFacilitiesSection />
        <CanvaWorldMapSection />
        <CanvaContactFormSection />
      </main>
      <CanvaFooter />
    </div>
  )
}
