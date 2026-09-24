'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CanvaExactDrawer } from './CanvaExactDrawer'
import { CanvaExactContactForm } from './CanvaExactContactForm'
import { CanvaExactWhyChooseInteractive } from './CanvaExactWhyChooseInteractive'
import { CanvaFadeSection } from './CanvaFadeSection'
import { CanvaExactStickyNav } from './CanvaExactStickyNav'
import { CanvaExactFacilitiesCarousel } from './CanvaExactFacilitiesCarousel'
import './canva-exact.css'

export function CanvaExactHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <CanvaExactStickyNav onOpenMenu={() => setIsMenuOpen(true)} />
      <main className="cv">
        <div className="cv-page" style={{ '--h': 5754 } as React.CSSProperties}>

          {/* Continuous canvas background graphic slices */}
          <img className="cv-bg" src="/canva-exact/bg/home-0.webp" alt="" style={{ '--y': 0, '--h': 1024 } as React.CSSProperties} decoding="async" />
          <img className="cv-bg" src="/canva-exact/bg/home-1.webp" alt="" style={{ '--y': 1024, '--h': 1024 } as React.CSSProperties} decoding="async" />
          <img className="cv-bg" src="/canva-exact/bg/home-2.webp" alt="" style={{ '--y': 2048, '--h': 1024 } as React.CSSProperties} decoding="async" />
          <img className="cv-bg" src="/canva-exact/bg/home-3.webp" alt="" style={{ '--y': 3072, '--h': 1024 } as React.CSSProperties} decoding="async" />
          <img className="cv-bg" src="/canva-exact/bg/home-4.webp" alt="" style={{ '--y': 4096, '--h': 1024 } as React.CSSProperties} decoding="async" />
          <img className="cv-bg" src="/canva-exact/bg/home-5.webp" alt="" style={{ '--y': 5120, '--h': 634 } as React.CSSProperties} decoding="async" />

          {/* Section 1: Header & Hero with Cinematic Background Video */}
          <div
            className="cv-hero-video-wrap"
            style={
              {
                position: 'absolute',
                top: 'calc(42 * var(--u))',
                left: 0,
                width: '100%',
                height: 'calc(455 * var(--u))',
                overflow: 'hidden',
                zIndex: 2,
                pointerEvents: 'none',
              } as React.CSSProperties
            }
          >
            {/* Native HTML5 Background Video Player - Zero YouTube branding */}
            <video
              src="/videos/hero-bg.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
            {/* Cinematic Gradient Vignette Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 50%, rgba(15, 8, 8, 0.25) 0%, rgba(15, 8, 8, 0.58) 100%), linear-gradient(180deg, rgba(20, 10, 10, 0.5) 0%, transparent 40%, rgba(20, 10, 10, 0.7) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          <CanvaFadeSection y={0} h={460} animation="fade-in">
            {/* Bear Mascot on Header */}
            <Link
              href="/"
              aria-label="Sunshine Maple Bear home"
              style={
                {
                  position: 'absolute',
                  left: 'calc(55 * var(--u))',
                  top: 'calc(52 * var(--u))',
                  zIndex: 5,
                  display: 'flex',
                  alignItems: 'center',
                } as React.CSSProperties
              }
            >
              <img
                src="/images/maple-bear-mascot.png"
                alt="Sunshine Maple Bear Mascot"
                style={{
                  height: 'calc(58 * var(--u))',
                  width: 'auto',
                  filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))',
                }}
              />
            </Link>

            {/* Action pills on Header over video */}
            <a
              href="#contact"
              className="cv-hero-btn"
              style={
                {
                  position: 'absolute',
                  left: 'calc(463.3 * var(--u))',
                  top: 'calc(89.1 * var(--u))',
                  width: 'calc(98.2 * var(--u))',
                  height: 'calc(27.6 * var(--u))',
                } as React.CSSProperties
              }
            >
              Book a visit
            </a>
            <a
              href="#contact"
              className="cv-hero-btn"
              style={
                {
                  position: 'absolute',
                  left: 'calc(575.4 * var(--u))',
                  top: 'calc(89.1 * var(--u))',
                  width: 'calc(135.2 * var(--u))',
                  height: 'calc(27.6 * var(--u))',
                } as React.CSSProperties
              }
            >
              General enquiries
            </a>
            <Link
              href="/admissions/founding-families"
              className="cv-hero-btn"
              style={
                {
                  position: 'absolute',
                  left: 'calc(724.4 * var(--u))',
                  top: 'calc(89.1 * var(--u))',
                  width: 'calc(135.2 * var(--u))',
                  height: 'calc(27.6 * var(--u))',
                } as React.CSSProperties
              }
            >
              Register interest
            </Link>

            <span
              className="f0"
              style={
                {
                  position: 'absolute',
                  left: 'calc(879.15 * var(--u))',
                  top: 'calc(94.28 * var(--u))',
                  fontSize: 'calc(13.995 * var(--u) * var(--font-scale, 0.84))',
                  color: '#ffffff',
                  zIndex: 5,
                  fontWeight: 500,
                } as React.CSSProperties
              }
            >
              EN ↓
            </span>

            {/* Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="cv-hero-btn"
              aria-label="Open menu"
              style={
                {
                  position: 'absolute',
                  left: 'calc(928 * var(--u))',
                  top: 'calc(86 * var(--u))',
                  width: 'calc(44 * var(--u))',
                  height: 'calc(34 * var(--u))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'calc(6 * var(--u))',
                } as React.CSSProperties
              }
            >
              <div
                style={{
                  width: 'calc(20 * var(--u))',
                  height: 'calc(14 * var(--u))',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ display: 'block', width: '100%', height: 'calc(2 * var(--u))', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                <span style={{ display: 'block', width: '100%', height: 'calc(2 * var(--u))', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                <span style={{ display: 'block', width: '100%', height: 'calc(2 * var(--u))', backgroundColor: '#ffffff', borderRadius: '1px' }} />
              </div>
            </button>

            {/* Hero titles — perfectly centered horizontally */}
            <h1
              className="f6"
              style={
                {
                  position: 'absolute',
                  left: 0,
                  width: '100%',
                  textAlign: 'center',
                  top: 'calc(218 * var(--u))',
                  fontSize: 'calc(50 * var(--u) * var(--font-scale, 0.84))',
                  lineHeight: 1.15,
                  color: '#ffffff',
                  margin: 0,
                  zIndex: 4,
                  letterSpacing: 'calc(0.5 * var(--u))',
                  textShadow: '0 2px 14px rgba(0,0,0,0.6)',
                } as React.CSSProperties
              }
            >
              SUNSHINE MAPLE BEAR
            </h1>
            <h2
              className="f6"
              style={
                {
                  position: 'absolute',
                  left: 0,
                  width: '100%',
                  textAlign: 'center',
                  top: 'calc(288 * var(--u))',
                  fontSize: 'calc(34 * var(--u) * var(--font-scale, 0.84))',
                  lineHeight: 1.2,
                  color: '#ffffff',
                  margin: 0,
                  zIndex: 4,
                  letterSpacing: 'calc(1 * var(--u))',
                  textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                } as React.CSSProperties
              }
            >
              INTERNATIONAL KINDERGARTEN
            </h2>

            {/* Centered ABOUT US Button */}
            <Link
              href="/about"
              className="cv-hero-cta"
              style={
                {
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: 'calc(360 * var(--u))',
                  padding: 'calc(7 * var(--u)) calc(28 * var(--u))',
                } as React.CSSProperties
              }
            >
              ABOUT US
            </Link>
          </CanvaFadeSection>

          {/* Section 2: Stats Strip - cv-ghost prevents double text/shadow with baked background graphics */}
          <CanvaFadeSection y={510} h={130} animation="fade-in">
            <h2 className="cv-t f0 cv-ghost" style={{ '--x': 114.22, '--y': 531.04, '--s': 35.501, '--c': '#ca9c57' } as React.CSSProperties}>15+</h2>
            <p className="cv-t f6 cv-ghost" style={{ '--x': 76.89, '--y': 577.94, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}>YEARS OF EXCELLENCE</p>
            <h2 className="cv-t f0 cv-ghost" style={{ '--x': 330.17, '--y': 531.04, '--s': 35.501, '--c': '#ca9c57' } as React.CSSProperties}>580+</h2>
            <p className="cv-t f6 cv-ghost" style={{ '--x': 307.98, '--y': 577.94, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}>YEARS OF EXCELLENCE</p>
            <h2 className="cv-t f0 cv-ghost" style={{ '--x': 592.36, '--y': 531, '--s': 33.6, '--c': '#ca9c57' } as React.CSSProperties}>18</h2>
            <p className="cv-t f0 cv-ghost" style={{ '--x': 630.94, '--y': 542.52, '--s': 23.198, '--c': '#ca9c57' } as React.CSSProperties}>m</p>
            <p className="cv-t f6 cv-ghost" style={{ '--x': 563.33, '--y': 577.94, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}> AUTHENTIC CANADIAN</p>
            <p className="cv-t f6 cv-ghost" style={{ '--x': 588.82, '--y': 592.91, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}>CURRICULUM</p>
            <h2 className="cv-t f0 cv-ghost" style={{ '--x': 831.74, '--y': 532.82, '--s': 35.501, '--c': '#ca9c57' } as React.CSSProperties}>100%</h2>
            <p className="cv-t f6 cv-ghost" style={{ '--x': 820.88, '--y': 579.72, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}> AUTHENTIC CANADIAN</p>
            <p className="cv-t f6 cv-ghost" style={{ '--x': 846.37, '--y': 594.69, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}>CURRICULUM</p>
          </CanvaFadeSection>

          {/* Section 3: Introduction */}
          <CanvaFadeSection y={670} h={260} animation="slide-up">
            <h2 className="cv-t f6" style={{ '--x': 89.04, '--y': 689.12, '--s': 36.837, '--c': '#ca9c57' } as React.CSSProperties}>INTRODUCTION</h2>
            <p className="cv-t f0" style={{ '--x': 89.04, '--y': 754.2, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Sunshine Maple Bear Hanoi offers</p>
            <p className="cv-t f0" style={{ '--x': 89.04, '--y': 780.45, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>an authentic 100% Canadian</p>
            <p className="cv-t f0" style={{ '--x': 89.04, '--y': 806.7, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>English immersion environment</p>
            <p className="cv-t f0" style={{ '--x': 89.04, '--y': 832.95, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>designed to cultivate creativity,</p>
            <p className="cv-t f0" style={{ '--x': 89.04, '--y': 859.2, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>compassion, and global</p>
            <p className="cv-t f0" style={{ '--x': 89.04, '--y': 885.45, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>confidence inside Sunshine City.</p>
          </CanvaFadeSection>

          {/* Section 4: Our Promise & Message from Head of School (Video Embedded) */}
          <CanvaFadeSection y={1140} h={600} animation="slide-up">
            <p className="cv-t f0" style={{ '--x': 438.22, '--y': 1155.03, '--s': 19.38, '--c': '#3d3d3d', '--ls': -0.006 } as React.CSSProperties}>OUR PROMISE</p>
            <h2 className="cv-t f6" style={{ '--x': 263.21, '--y': 1201.43, '--s': 37.042, '--c': '#3d3d3d', '--ls': -0.006 } as React.CSSProperties}>SAFE. NURTURING. </h2>
            <h2 className="cv-t f6" style={{ '--x': 585.31, '--y': 1201.43, '--s': 37.042, '--c': '#9b1d22' } as React.CSSProperties}>INSPIRING</h2>
            <p className="cv-t f1" style={{ '--x': 320.19, '--y': 1257.61, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>“A place where children are protected, supported</p>
            <p className="cv-t f1" style={{ '--x': 410.74, '--y': 1283.86, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>and empowered to grow.”</p>
            <p className="cv-t f0" style={{ '--x': 61.25, '--y': 1425.11, '--s': 19.38, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>MS JENNIFER</p>
            <h3 className="cv-t f6" style={{ '--x': 61.25, '--y': 1467.24, '--s': 25.92, '--c': '#ffffff', '--ls': -0.654 } as React.CSSProperties}>MESSAGE FROM HEAD OF SCHOOL</h3>
            <p className="cv-t f1" style={{ '--x': 61.25, '--y': 1522.56, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>“Children thrive when high expectations are</p>
            <p className="cv-t f1" style={{ '--x': 61.25, '--y': 1548.81, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>matched by warmth, consistency and genuine care.</p>
            <p className="cv-t f1" style={{ '--x': 61.25, '--y': 1575.06, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>My responsibility as a school leader is to build an</p>
            <p className="cv-t f1" style={{ '--x': 61.25, '--y': 1601.31, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>environment where every child is known, every</p>
            <p className="cv-t f1" style={{ '--x': 61.25, '--y': 1627.56, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>educator is empowered and every family is a trusted</p>
            <p className="cv-t f1" style={{ '--x': 61.25, '--y': 1653.81, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>partner.”</p>

            {/* Cover static photo in home-1.webp with matching solid red background */}
            <div
              style={
                {
                  position: 'absolute',
                  left: 'calc(600 * var(--u))',
                  top: 'calc(1310 * var(--u))',
                  width: 'calc(424.5 * var(--u))',
                  height: 'calc(440 * var(--u))',
                  backgroundColor: '#9a1c20',
                  zIndex: 2,
                } as React.CSSProperties
              }
            />

            {/* Head of School Video Player - Native HTML5, Zero YouTube branding */}
            <div
              className="cv-head-video-card"
              style={
                {
                  position: 'absolute',
                  left: 'calc(625 * var(--u))',
                  top: 'calc(1420 * var(--u))',
                  width: 'calc(345 * var(--u))',
                  height: 'calc(215 * var(--u))',
                  zIndex: 5,
                  borderRadius: 'calc(6 * var(--u))',
                  overflow: 'hidden',
                  border: 'calc(1.5 * var(--u)) solid rgba(202, 156, 87, 0.75)',
                  boxShadow: '0 calc(8 * var(--u)) calc(24 * var(--u)) rgba(0, 0, 0, 0.45)',
                  backgroundColor: '#000000',
                } as React.CSSProperties
              }
            >
              <video
                src="/videos/head-of-school.mp4"
                poster="/videos/head-of-school-poster.jpg"
                controls
                playsInline
                preload="metadata"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  backgroundColor: '#000000',
                }}
              />
            </div>
            {/* Caption badge under Head of School Video */}
            <p
              className="f0"
              style={
                {
                  position: 'absolute',
                  left: 'calc(625 * var(--u))',
                  top: 'calc(1648 * var(--u))',
                  fontSize: 'calc(11.5 * var(--u) * var(--font-scale, 0.84))',
                  color: '#f6dfb2',
                  letterSpacing: 'calc(0.8 * var(--u))',
                  textTransform: 'uppercase',
                  zIndex: 5,
                  fontWeight: 600,
                  margin: 0,
                } as React.CSSProperties
              }
            >
              ▶ Watch: Welcome Message from Head of School
            </p>
          </CanvaFadeSection>

          {/* Section 5: Why Families Choose */}
          <CanvaFadeSection y={1830} h={460} animation="slide-up">
            <h2 className="cv-t f6" style={{ '--x': 563.75, '--y': 1843.71, '--s': 36.998, '--c': '#000000' } as React.CSSProperties}>WHY FAMILIES CHOOSE</h2>
            <h2 className="cv-t f6" style={{ '--x': 563.75, '--y': 1886.46, '--s': 36.998, '--c': '#9b1d22' } as React.CSSProperties}>MAPLE BEAR</h2>
            <p className="cv-t f3" style={{ '--x': 721.12, '--y': 2009.5, '--s': 14.549, '--c': '#3d3d3d' } as React.CSSProperties}>At Sunshine Maple Bear International</p>
            <p className="cv-t f3" style={{ '--x': 715.53, '--y': 2035.85, '--s': 14.549, '--c': '#3d3d3d' } as React.CSSProperties}>Kindergarten, every day is designed to</p>
            <p className="cv-t f3" style={{ '--x': 717.53, '--y': 2062.21, '--s': 14.549, '--c': '#3d3d3d' } as React.CSSProperties}>inspire curiosity, build confidence and</p>
            <p className="cv-t f3" style={{ '--x': 744.55, '--y': 2088.57, '--s': 14.549, '--c': '#3d3d3d' } as React.CSSProperties}>nurture a lifelong love of learning.</p>
            <p className="cv-t f3" style={{ '--x': 741.82, '--y': 2114.93, '--s': 14.549, '--c': '#3d3d3d' } as React.CSSProperties}>Through the Maple Bear Canadian</p>
            <p className="cv-t f3" style={{ '--x': 701.02, '--y': 2141.29, '--s': 14.549, '--c': '#3d3d3d' } as React.CSSProperties}>Curriculum, caring educators and a safe,</p>
            <p className="cv-t f3" style={{ '--x': 732.78, '--y': 2167.64, '--s': 14.549, '--c': '#3d3d3d' } as React.CSSProperties}>engaging environment, children are</p>
            <p className="cv-t f3" style={{ '--x': 700.74, '--y': 2194, '--s': 14.549, '--c': '#3d3d3d' } as React.CSSProperties}>supported to grow academically, socially</p>
            <p className="cv-t f3" style={{ '--x': 860.78, '--y': 2220.36, '--s': 14.549, '--c': '#3d3d3d' } as React.CSSProperties}>and emotionally.</p>
          </CanvaFadeSection>

          {/* Section 6: Interactive 4 Pillars */}
          <CanvaExactWhyChooseInteractive />

          {/* Section 7: Canadian Curriculum */}
          <CanvaFadeSection y={2930} h={520} animation="slide-up">
            <h2 className="cv-t f6" style={{ '--x': 76.94, '--y': 2947.6, '--s': 37.042, '--c': '#cda330', '--ls': -0.006 } as React.CSSProperties}>A CANADIAN</h2>
            <h2 className="cv-t f6" style={{ '--x': 76.94, '--y': 2991.1, '--s': 37.042, '--c': '#ffffff', '--ls': -0.007 } as React.CSSProperties}>CURRICULUM</h2>
            <p className="cv-t f0" style={{ '--x': 82.44, '--y': 3057.72, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Find out more</p>
            <Link href="/academics" className="cv-a" aria-label="Find out more" style={{ '--x': 77.3, '--y': 3052.6, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />

            <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3025.8, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Language & Literacy</h3>
            <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3050.93, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Bilingual immersion & storytelling</p>

            <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3130.53, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Creative Arts</h3>
            <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3155.65, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Music, drama & visual expression</p>

            <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3225.9, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Math & Logic</h3>
            <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3251.02, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Hands-on problem solving</p>

            <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3326.04, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Science & Discovery</h3>
            <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3351.17, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Curiosity-driven exploration</p>
          </CanvaFadeSection>

          {/* Section 8: Campus & Facilities with Interactive Carousel & Lightbox Gallery */}
          <CanvaFadeSection y={3500} h={480} animation="fade-in">
            <h2 className="cv-t f6 cv-ghost" style={{ '--x': 66.16, '--y': 3534.11, '--s': 88.014, '--c': '#7e0e12' } as React.CSSProperties}>CAMPUS & FACILITIES </h2>
            <h2 className="cv-t f5 cv-ghost" style={{ '--x': 751.88, '--y': 3577.17, '--s': 50.959, '--c': '#ca9c57' } as React.CSSProperties}>Overview</h2>

            {/* Interactive Facilities Carousel with Lightbox Gallery */}
            <CanvaExactFacilitiesCarousel />
          </CanvaFadeSection>

          {/* Section 9: Maple Bear Around the World & Stats */}
          <CanvaFadeSection y={4030} h={560} animation="fade-in">
            <h2 className="cv-t f0 cv-ghost" style={{ '--x': 893.17, '--y': 4049.44, '--s': 35.501, '--c': '#7e0e12' } as React.CSSProperties}>15+</h2>
            <p className="cv-t f6 cv-ghost" style={{ '--x': 830.85, '--y': 4096.34, '--s': 11.409, '--c': '#3d3d3d' } as React.CSSProperties}>YEARS OF EXCELLENCE</p>
            <h2 className="cv-t f0 cv-ghost" style={{ '--x': 859.69, '--y': 4142.6, '--s': 35.501, '--c': '#7e0e12' } as React.CSSProperties}>500+</h2>
            <p className="cv-t f6 cv-ghost" style={{ '--x': 823.09, '--y': 4189.26, '--s': 11.408, '--c': '#3d3d3d' } as React.CSSProperties}>SCHOOLS IN OPERATION</p>
            <h2 className="cv-t f0 cv-ghost" style={{ '--x': 795.45, '--y': 4235.64, '--s': 35.501, '--c': '#7e0e12' } as React.CSSProperties}>70,000+</h2>
            <p className="cv-t f6 cv-ghost" style={{ '--x': 839.36, '--y': 4282.31, '--s': 11.408, '--c': '#3d3d3d' } as React.CSSProperties}>STUDENTS ENROLLED</p>
            <h2 className="cv-t f0 cv-ghost" style={{ '--x': 889.91, '--y': 4328.69, '--s': 35.501, '--c': '#7e0e12' } as React.CSSProperties}>37+</h2>
            <p className="cv-t f6 cv-ghost" style={{ '--x': 890.31, '--y': 4375.35, '--s': 11.408, '--c': '#3d3d3d' } as React.CSSProperties}>COUNTRIES</p>

            <h2 className="cv-t f6" style={{ '--x': 214.96, '--y': 4441.22, '--s': 36.998, '--c': '#7e0e12' } as React.CSSProperties}>MAPLE BEAR </h2>
            <h2 className="cv-t f6" style={{ '--x': 438.05, '--y': 4441.22, '--s': 36.998, '--c': '#000000' } as React.CSSProperties}>AROUND THE WORLD</h2>
            <p className="cv-t f3" style={{ '--x': 108.62, '--y': 4501.45, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Maple Bear is part of a global network of schools in over 37 countries, sharing a commitment to educational excellence.</p>
            <p className="cv-t f0" style={{ '--x': 468.14, '--y': 4537.41, '--s': 12.553, '--c': '#3d3d3d' } as React.CSSProperties}>Find out more</p>
            <Link href="/about" className="cv-a" aria-label="Find out more" style={{ '--x': 463, '--y': 4532.3, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
          </CanvaFadeSection>

          {/* Section 10: Contact Form */}
          <span id="contact" className="cv-anchor" style={{ '--y': 4646.2 } as React.CSSProperties} />
          <CanvaFadeSection y={4640} h={520} animation="slide-up">
            <h2 className="cv-t f6 cv-ghost" style={{ '--x': 111.97, '--y': 4668.58, '--s': 37.042, '--c': '#000000', '--ls': -0.006 } as React.CSSProperties}>CONTACT US</h2>
            <h2 className="cv-t f6" style={{ '--x': 111.97, '--y': 4668.58, '--s': 37.042, '--c': '#2e2e2e', '--ls': -0.008 } as React.CSSProperties}>CONTACT</h2>
            <h2 className="cv-t f6" style={{ '--x': 287.06, '--y': 4668.58, '--s': 37.042, '--c': '#7e0e12' } as React.CSSProperties}> US</h2>
            <p className="cv-t f3" style={{ '--x': 115.22, '--y': 4732.08, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>If you have any questions, please fill in the form below and</p>
            <p className="cv-t f3" style={{ '--x': 115.22, '--y': 4758.33, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>we will get in touch as soon as possible.</p>
            <CanvaExactContactForm x={111.91} y={4786.23} pageTitle="CanvaExactHome" />
            <p className="cv-t f0" style={{ '--x': 298.35, '--y': 5097.67, '--s': 12.553, '--c': '#3d3d3d' } as React.CSSProperties}>Send</p>
            <button type="submit" form="cv-contact" className="cv-a" aria-label="Send" style={{ '--x': 265, '--y': 5092.5, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
          </CanvaFadeSection>

          {/* Section 11: Footer */}
          <CanvaFadeSection y={5180} h={574} animation="fade-in">
            <h2 className="cv-t f6" style={{ '--x': 72.77, '--y': 5202.15, '--s': 81.225, '--c': '#ffffff' } as React.CSSProperties}>SUNSHINE MAPLE BEAR </h2>
            <h2 className="cv-t f6" style={{ '--x': 78.91, '--y': 5299.16, '--s': 57.408, '--c': '#ffffff', 'opacity': 0.46 } as React.CSSProperties}>INTERNATIONAL KINDERGARTEN</h2>

            <h3 className="cv-t f6" style={{ '--x': 835.96, '--y': 5413.1, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>About us </h3>
            <h3 className="cv-t f6" style={{ '--x': 824.02, '--y': 5456.6, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Admission</h3>
            <h3 className="cv-t f6" style={{ '--x': 827.43, '--y': 5500.11, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>Academic</h3>
            <h3 className="cv-t f6" style={{ '--x': 812.13, '--y': 5543.61, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Curriculum</h3>
            <h3 className="cv-t f6" style={{ '--x': 884.41, '--y': 5587.21, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>New</h3>

            <p className="cv-t f2" style={{ '--x': 112.69, '--y': 5522.09, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>S4 Building, Sunshine City, Nam Thang Long</p>
            <p className="cv-t f2" style={{ '--x': 112.69, '--y': 5542.34, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Urban Area, Phu Thuong Ward, Hanoi, Vietnam</p>
            <p className="cv-t f2" style={{ '--x': 113.51, '--y': 5571.12, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>094 254 6655</p>
            <p className="cv-t f2" style={{ '--x': 112.69, '--y': 5599.59, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>admissions@sunshinemaplebear.edu.vn</p>

            <p className="cv-t f3" style={{ '--x': 78.91, '--y': 5695.09, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>© 2026 SUNSHINE MAPLE BEAR INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.</p>
            <p className="cv-t f3" style={{ '--x': 748.77, '--y': 5695.09, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Follow us</p>

            <Link href="/about" className="cv-a" aria-label="About us" style={{ '--x': 832, '--y': 5412.3, '--w': 99, '--h': 28.6 } as React.CSSProperties} />
            <Link href="/admissions" className="cv-a" aria-label="Admission" style={{ '--x': 820, '--y': 5455.8, '--w': 109.6, '--h': 28.6 } as React.CSSProperties} />
            <Link href="/academics" className="cv-a" aria-label="Academic" style={{ '--x': 823.4, '--y': 5499.4, '--w': 105.8, '--h': 28.5 } as React.CSSProperties} />
            <Link href="/academics" className="cv-a" aria-label="Curriculum" style={{ '--x': 808.1, '--y': 5542.9, '--w': 121, '--h': 28.5 } as React.CSSProperties} />
            <Link href="/blog" className="cv-a" aria-label="New" style={{ '--x': 880.4, '--y': 5586.5, '--w': 49.7, '--h': 28.5 } as React.CSSProperties} />
            <a href="tel:0942546655" className="cv-a" aria-label="094 254 6655" style={{ '--x': 109.5, '--y': 5568.1, '--w': 98.6, '--h': 25.8 } as React.CSSProperties} />
            <a href="mailto:admissions@sunshinemaplebear.edu.vn" className="cv-a" aria-label="admissions@sunshinemaplebear.edu.vn" style={{ '--x': 108.7, '--y': 5596.6, '--w': 271.1, '--h': 25.8 } as React.CSSProperties} />
          </CanvaFadeSection>
        </div>
      </main>

      <CanvaExactDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
