'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CanvaExactDrawer } from './CanvaExactDrawer'
import { CanvaExactContactForm } from './CanvaExactContactForm'
import { CanvaExactWhyChooseInteractive } from './CanvaExactWhyChooseInteractive'

export function CanvaExactHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <main className="cv">
        <div className="cv-page" style={{ '--h': 5754 } as React.CSSProperties}>
        <img className="cv-bg" src="/canva-exact/bg/home-0.webp" alt="" style={{ '--y': 0, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/home-1.webp" alt="" style={{ '--y': 1024, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/home-2.webp" alt="" style={{ '--y': 2048, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/home-3.webp" alt="" style={{ '--y': 3072, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/home-4.webp" alt="" style={{ '--y': 4096, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/home-5.webp" alt="" style={{ '--y': 5120, '--h': 634 } as React.CSSProperties} decoding="async" />
        <p className="cv-t f6" style={{ '--x': 618.56, '--y': 10, '--s': 18, '--c': '#304254' } as React.CSSProperties}>Page 1</p>
        <p className="cv-t f6" style={{ '--x': 684.34, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 2</p>
        <p className="cv-t f6" style={{ '--x': 753.63, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 3</p>
        <p className="cv-t f6" style={{ '--x': 822.46, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 4</p>
        <p className="cv-t f6" style={{ '--x': 892.02, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 5</p>
        <p className="cv-t f6" style={{ '--x': 960.73, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 6</p>
        <h2 className="cv-t f6" style={{ '--x': 218.26, '--y': 296.16, '--s': 38.947, '--c': '#ffffff' } as React.CSSProperties}>INTERNATIONAL KINDERGARTEN</h2>
        <p className="cv-t f0" style={{ '--x': 477, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Book a visit</p>
        <h1 className="cv-t f6" style={{ '--x': 214.09, '--y': 220.43, '--s': 55.106, '--c': '#ffffff' } as React.CSSProperties}>SUNSHINE MAPLE BEAR </h1>
        <p className="cv-t f0" style={{ '--x': 588.7, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Genaral enquiries</p>
        <p className="cv-t f0" style={{ '--x': 741.08, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Register interest</p>
        <p className="cv-t f0" style={{ '--x': 879.15, '--y': 93.28, '--s': 13.995, '--c': '#ffffff' } as React.CSSProperties}>EN ↓</p>
        <h2 className="cv-t f0" style={{ '--x': 114.22, '--y': 531.04, '--s': 35.501, '--c': '#ca9c57' } as React.CSSProperties}>15+</h2>
        <p className="cv-t f6" style={{ '--x': 76.89, '--y': 577.94, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}>YEARS OF EXCELLENCE</p>
        <p className="cv-t f0" style={{ '--x': 451.68, '--y': 370.72, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>ABOUT US</p>
        <h2 className="cv-t f0" style={{ '--x': 330.17, '--y': 531.04, '--s': 35.501, '--c': '#ca9c57' } as React.CSSProperties}>580+</h2>
        <p className="cv-t f6" style={{ '--x': 307.98, '--y': 577.94, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}>YEARS OF EXCELLENCE</p>
        <p className="cv-t f6" style={{ '--x': 820.88, '--y': 579.72, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}> AUTHENTIC CANADIAN</p>
        <p className="cv-t f6" style={{ '--x': 846.37, '--y': 594.69, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}>CURRICULUM</p>
        <h2 className="cv-t f0" style={{ '--x': 831.74, '--y': 532.82, '--s': 35.501, '--c': '#ca9c57' } as React.CSSProperties}>100%</h2>
        <p className="cv-t f6" style={{ '--x': 563.33, '--y': 577.94, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}> AUTHENTIC CANADIAN</p>
        <p className="cv-t f6" style={{ '--x': 588.82, '--y': 592.91, '--s': 11.409, '--c': '#ffffff' } as React.CSSProperties}>CURRICULUM</p>
        <h2 className="cv-t f0" style={{ '--x': 592.36, '--y': 531, '--s': 33.6, '--c': '#ca9c57' } as React.CSSProperties}>18</h2>
        <p className="cv-t f0" style={{ '--x': 630.94, '--y': 542.52, '--s': 23.198, '--c': '#ca9c57' } as React.CSSProperties}>m</p>
        <p className="cv-t f0" style={{ '--x': 89.04, '--y': 754.2, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Sunshine Maple Bear Hanoi offers</p>
        <p className="cv-t f0" style={{ '--x': 89.04, '--y': 780.45, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>an authentic 100% Canadian</p>
        <p className="cv-t f0" style={{ '--x': 89.04, '--y': 806.7, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>English immersion environment</p>
        <p className="cv-t f0" style={{ '--x': 89.04, '--y': 832.95, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>designed to cultivate creativity,</p>
        <p className="cv-t f0" style={{ '--x': 89.04, '--y': 859.2, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>compassion, and global</p>
        <p className="cv-t f0" style={{ '--x': 89.04, '--y': 885.45, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>confidence inside Sunshine City.</p>
        <h2 className="cv-t f6" style={{ '--x': 89.04, '--y': 689.12, '--s': 36.837, '--c': '#ca9c57' } as React.CSSProperties}>INTRODUCTION</h2>
        <h2 className="cv-t f6" style={{ '--x': 263.21, '--y': 1201.43, '--s': 37.042, '--c': '#3d3d3d', '--ls': -0.006 } as React.CSSProperties}>SAFE. NURTURING. </h2>
        <h2 className="cv-t f6" style={{ '--x': 585.31, '--y': 1201.43, '--s': 37.042, '--c': '#9b1d22' } as React.CSSProperties}>INSPIRING</h2>
        <p className="cv-t f0" style={{ '--x': 438.22, '--y': 1155.03, '--s': 19.38, '--c': '#3d3d3d', '--ls': -0.006 } as React.CSSProperties}>OUR PROMISE</p>
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
        {/* Interactive Why Choose Pillars: scroll/hover/click active image & info switcher */}
        <CanvaExactWhyChooseInteractive />
        <h2 className="cv-t f6" style={{ '--x': 76.94, '--y': 2947.6, '--s': 37.042, '--c': '#cda330', '--ls': -0.006 } as React.CSSProperties}>A CANADIAN</h2>
        <h2 className="cv-t f6" style={{ '--x': 76.94, '--y': 2991.1, '--s': 37.042, '--c': '#ffffff', '--ls': -0.007 } as React.CSSProperties}>CURRICULUM</h2>
        <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3025.8, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Language & Literacy</h3>
        <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3130.53, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Creative Arts</h3>
        <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3225.9, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Math & Logic</h3>
        <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3326.04, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Science & Discovery</h3>
        <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3050.93, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Bilingual immersion & storytelling</p>
        <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3155.65, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Music, drama & visual expression</p>
        <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3251.02, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Hands-on problem solving</p>
        <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3351.17, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Curiosity-driven exploration</p>
        <p className="cv-t f0" style={{ '--x': 82.44, '--y': 3057.72, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Find out more</p>
        <h2 className="cv-t f6 cv-ghost" style={{ '--x': 66.16, '--y': 3534.11, '--s': 88.014, '--c': '#7e0e12' } as React.CSSProperties}>CAMPUS & FACILITIES </h2>
        <h2 className="cv-t f5 cv-ghost" style={{ '--x': 751.88, '--y': 3577.17, '--s': 50.959, '--c': '#ca9c57' } as React.CSSProperties}>Overview</h2>
        <h3 className="cv-t f6" style={{ '--x': 628.28, '--y': 3896.19, '--s': 21.525, '--c': '#ca9c57' } as React.CSSProperties}>Library</h3>
        <h3 className="cv-t f6" style={{ '--x': 303.99, '--y': 3896.19, '--s': 21.525, '--c': '#ca9c57' } as React.CSSProperties}>Classroom</h3>
        <p className="cv-t f0" style={{ '--x': 468.14, '--y': 4537.41, '--s': 12.553, '--c': '#3d3d3d' } as React.CSSProperties}>Find out more</p>
        <h2 className="cv-t f0" style={{ '--x': 893.17, '--y': 4049.44, '--s': 35.501, '--c': '#7e0e12' } as React.CSSProperties}>15+</h2>
        <p className="cv-t f6" style={{ '--x': 830.85, '--y': 4096.34, '--s': 11.409, '--c': '#3d3d3d' } as React.CSSProperties}>YEARS OF EXCELLENCE</p>
        <h2 className="cv-t f0" style={{ '--x': 859.69, '--y': 4142.6, '--s': 35.501, '--c': '#7e0e12' } as React.CSSProperties}>500+</h2>
        <p className="cv-t f6" style={{ '--x': 823.09, '--y': 4189.26, '--s': 11.408, '--c': '#3d3d3d' } as React.CSSProperties}>SCHOOLS IN OPERATION</p>
        <h2 className="cv-t f0" style={{ '--x': 795.45, '--y': 4235.64, '--s': 35.501, '--c': '#7e0e12' } as React.CSSProperties}>70,000+</h2>
        <p className="cv-t f6" style={{ '--x': 839.36, '--y': 4282.31, '--s': 11.408, '--c': '#3d3d3d' } as React.CSSProperties}>STUDENTS ENROLLED</p>
        <h2 className="cv-t f0" style={{ '--x': 889.91, '--y': 4328.69, '--s': 35.501, '--c': '#7e0e12' } as React.CSSProperties}>37+</h2>
        <p className="cv-t f6" style={{ '--x': 890.31, '--y': 4375.35, '--s': 11.408, '--c': '#3d3d3d' } as React.CSSProperties}>COUNTRIES</p>
        <h2 className="cv-t f6" style={{ '--x': 214.96, '--y': 4441.22, '--s': 36.998, '--c': '#7e0e12' } as React.CSSProperties}>MAPLE BEAR </h2>
        <h2 className="cv-t f6" style={{ '--x': 438.05, '--y': 4441.22, '--s': 36.998, '--c': '#000000' } as React.CSSProperties}>AROUND THE WORLD</h2>
        <p className="cv-t f3" style={{ '--x': 108.62, '--y': 4501.45, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Maple Bear is part of a global network of schools in over 37 countries, sharing a commitment to educational excellence.</p>
        <h2 className="cv-t f6 cv-ghost" style={{ '--x': 111.97, '--y': 4668.58, '--s': 37.042, '--c': '#000000', '--ls': -0.006 } as React.CSSProperties}>CONTACT US</h2>
        <h2 className="cv-t f6" style={{ '--x': 111.97, '--y': 4668.58, '--s': 37.042, '--c': '#2e2e2e', '--ls': -0.008 } as React.CSSProperties}>CONTACT</h2>
        <h2 className="cv-t f6" style={{ '--x': 287.06, '--y': 4668.58, '--s': 37.042, '--c': '#7e0e12' } as React.CSSProperties}> US</h2>
        <p className="cv-t f3" style={{ '--x': 115.22, '--y': 4732.08, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>If you have any questions, please fill in the form below and</p>
        <p className="cv-t f3" style={{ '--x': 115.22, '--y': 4758.33, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>we will get in touch as soon as possible.</p>
        <p className="cv-t f0" style={{ '--x': 298.35, '--y': 5097.67, '--s': 12.553, '--c': '#3d3d3d' } as React.CSSProperties}>Send</p>
        <h2 className="cv-t f6" style={{ '--x': 78.91, '--y': 5299.16, '--s': 57.408, '--c': '#ffffff', 'opacity': 0.46 } as React.CSSProperties}>INTERNATIONAL KINDERGARTEN</h2>
        <h2 className="cv-t f6" style={{ '--x': 72.77, '--y': 5202.15, '--s': 81.225, '--c': '#ffffff' } as React.CSSProperties}>SUNSHINE MAPLE BEAR </h2>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 5522.09, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>S4 Building, Sunshine City, Nam Thang Long</p>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 5542.34, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Urban Area, Phu Thuong Ward, Hanoi, Vietnam</p>
        <p className="cv-t f2" style={{ '--x': 113.51, '--y': 5571.12, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>094 254 6655</p>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 5599.59, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>admissions@sunshinemaplebear.edu.vn</p>
        <h3 className="cv-t f6" style={{ '--x': 835.96, '--y': 5413.1, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>About us </h3>
        <h3 className="cv-t f6" style={{ '--x': 827.43, '--y': 5500.11, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>Academic</h3>
        <h3 className="cv-t f6" style={{ '--x': 824.02, '--y': 5456.6, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Admission</h3>
        <h3 className="cv-t f6" style={{ '--x': 812.13, '--y': 5543.61, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Curriculum</h3>
        <h3 className="cv-t f6" style={{ '--x': 884.41, '--y': 5587.21, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>New</h3>
        <p className="cv-t f3" style={{ '--x': 78.91, '--y': 5695.09, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>© 2026 SUNSHINE MAPLE BEAR INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.</p>
        <p className="cv-t f3" style={{ '--x': 748.77, '--y': 5695.09, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Follow us</p>
        <Link href="/" className="cv-a" aria-label="Page 1" style={{ '--x': 614.6, '--y': 8.8, '--w': 55.7, '--h': 24.7 } as React.CSSProperties} />
        <button type="button" onClick={() => setIsMenuOpen(true)} className="cv-a" aria-label="Page 2" style={{ '--x': 680.3, '--y': 8.8, '--w': 59.3, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/about" className="cv-a" aria-label="Page 3" style={{ '--x': 749.6, '--y': 8.8, '--w': 58.8, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Page 4" style={{ '--x': 818.5, '--y': 8.8, '--w': 59.5, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/admissions" className="cv-a" aria-label="Page 5" style={{ '--x': 888, '--y': 8.8, '--w': 58.7, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/admissions/founding-families" className="cv-a" aria-label="Page 6" style={{ '--x': 956.7, '--y': 8.8, '--w': 59.8, '--h': 24.7 } as React.CSSProperties} />
        <a href="#contact" className="cv-a" aria-label="Book a visit" style={{ '--x': 463.3, '--y': 89.1, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <a href="#contact" className="cv-a" aria-label="Genaral enquiries" style={{ '--x': 575.4, '--y': 89.1, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions/founding-families" className="cv-a" aria-label="Register interest" style={{ '--x': 724.4, '--y': 89.1, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/about" className="cv-a" aria-label="ABOUT US" style={{ '--x': 430, '--y': 362.2, '--w': 113, '--h': 33.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Find out more" style={{ '--x': 77.3, '--y': 3052.6, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/about" className="cv-a" aria-label="Find out more" style={{ '--x': 463, '--y': 4532.3, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <button type="submit" form="cv-contact" className="cv-a" aria-label="Send" style={{ '--x': 265, '--y': 5092.5, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <a href="tel:0942546655" className="cv-a" aria-label="094 254 6655" style={{ '--x': 109.5, '--y': 5568.1, '--w': 98.6, '--h': 25.8 } as React.CSSProperties} />
        <a href="mailto:admissions@sunshinemaplebear.edu.vn" className="cv-a" aria-label="admissions@sunshinemaplebear.edu.vn" style={{ '--x': 108.7, '--y': 5596.6, '--w': 271.1, '--h': 25.8 } as React.CSSProperties} />
        <Link href="/about" className="cv-a" aria-label="About us" style={{ '--x': 832, '--y': 5412.3, '--w': 99, '--h': 28.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Academic" style={{ '--x': 823.4, '--y': 5499.4, '--w': 105.8, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/admissions" className="cv-a" aria-label="Admission" style={{ '--x': 820, '--y': 5455.8, '--w': 109.6, '--h': 28.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Curriculum" style={{ '--x': 808.1, '--y': 5542.9, '--w': 121, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/blog" className="cv-a" aria-label="New" style={{ '--x': 880.4, '--y': 5586.5, '--w': 49.7, '--h': 28.5 } as React.CSSProperties} />
        <button type="button" onClick={() => setIsMenuOpen(true)} className="cv-a" aria-label="Open menu" style={{ '--x': 925, '--y': 84, '--w': 50, '--h': 38 } as React.CSSProperties} />
        <Link href="/" className="cv-a" aria-label="Sunshine Maple Bear home" style={{ '--x': 0, '--y': 42, '--w': 270, '--h': 120 } as React.CSSProperties} />
        <span id="contact" className="cv-anchor" style={{ '--y': 4646.2 } as React.CSSProperties} />
        <CanvaExactContactForm x={111.91} y={4786.23} pageTitle="CanvaExactHome" />
        </div>
      </main>

      <CanvaExactDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
