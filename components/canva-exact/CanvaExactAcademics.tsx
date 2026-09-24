'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CanvaExactDrawer } from './CanvaExactDrawer'
import { CanvaExactStickyNav } from './CanvaExactStickyNav'

export function CanvaExactAcademics() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <CanvaExactStickyNav onOpenMenu={() => setIsMenuOpen(true)} />
      <main className="cv">
        <div className="cv-page" style={{ '--h': 4278.75 } as React.CSSProperties}>
          {/* Fullwidth footer band (100vw edge-to-edge) */}
          <div
            className="cv-fullbleed"
            aria-hidden="true"
            style={{
              top: 'calc(3704 * var(--u))',
              height: 'calc(575 * var(--u))',
              backgroundColor: '#400e0d',
            }}
          />
          <img className="cv-bg" src="/canva-exact/bg/academics-0.webp" alt="" style={{ '--y': 0, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/academics-1.webp" alt="" style={{ '--y': 1024, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/academics-2.webp" alt="" style={{ '--y': 2048, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/academics-3.webp" alt="" style={{ '--y': 3072, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/academics-4.webp" alt="" style={{ '--y': 4096, '--h': 183 } as React.CSSProperties} decoding="async" />
        <p className="cv-t f0" style={{ '--x': 477, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Book a visit</p>
        <p className="cv-t f0" style={{ '--x': 588.7, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Genaral enquiries</p>
        <p className="cv-t f0" style={{ '--x': 741.08, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Register interest</p>
        <p className="cv-t f0" style={{ '--x': 879.15, '--y': 93.28, '--s': 13.995, '--c': '#ffffff' } as React.CSSProperties}>EN ↓</p>
        <h1 className="cv-t f6" style={{ '--x': 72.48, '--y': 471.99, '--s': 120.025, '--c': '#ffffff' } as React.CSSProperties}>ACADEMICS</h1>
        <h2 className="cv-t f6" style={{ '--x': 68.13, '--y': 775.73, '--s': 67.444, '--c': '#ca9c57' } as React.CSSProperties}>OVER VIEW</h2>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 886.16, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>Representing the pinnacle of Canadian education,</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 912.41, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>Maple Bear International Kindergarten curates a</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 938.66, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>premium bilingual early learning experience. From</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 964.91, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>exclusive infant Bear Care to our gold-standard</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 991.16, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>Preschool, we unlock your child's utmost cognitive</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 1017.41, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>potential. Through elite language immersion within</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 1043.66, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>a luxurious, secure environment, we build a solid</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 1069.91, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>launchpad for tomorrow's outstanding global</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 1096.16, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>citizens.</p>
        <h2 className="cv-t f6" style={{ '--x': 239.96, '--y': 1582.91, '--s': 36.833, '--c': '#7e0e12' } as React.CSSProperties}>EARLY CHILDHOOD</h2>
        <h2 className="cv-t f6" style={{ '--x': 579.59, '--y': 1582.91, '--s': 36.833, '--c': '#3d3d3d' } as React.CSSProperties}> PROGRAMS</h2>
        <p className="cv-t f0" style={{ '--x': 73.87, '--y': 1306.81, '--s': 18.503, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>12M – 24M</p>
        <p className="cv-t f6" style={{ '--x': 71.54, '--y': 1343.38, '--s': 14.407, '--c': '#3d3d3d' } as React.CSSProperties}>TODDLER CLASS</p>
        <p className="cv-t f0" style={{ '--x': 308.48, '--y': 1303.96, '--s': 18.503, '--c': '#ca9c57' } as React.CSSProperties}>2Y – 3Y</p>
        <p className="cv-t f6" style={{ '--x': 306.15, '--y': 1340.53, '--s': 14.407, '--c': '#3d3d3d' } as React.CSSProperties}>NURSERY CLASS</p>
        <p className="cv-t f0" style={{ '--x': 543.64, '--y': 1303.96, '--s': 18.503, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>3Y – 4Y</p>
        <p className="cv-t f6" style={{ '--x': 541.31, '--y': 1340.53, '--s': 14.407, '--c': '#3d3d3d' } as React.CSSProperties}>JUNIOR KINDERGARTEN</p>
        <p className="cv-t f0" style={{ '--x': 778.8, '--y': 1301.11, '--s': 18.503, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>4Y – 5Y</p>
        <p className="cv-t f6" style={{ '--x': 776.46, '--y': 1337.68, '--s': 14.407, '--c': '#3d3d3d' } as React.CSSProperties}>SENIOR KINDERGARTEN</p>
        <p className="cv-t f3" style={{ '--x': 71.54, '--y': 1368.77, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Sensory discovery, gross</p>
        <p className="cv-t f3" style={{ '--x': 71.54, '--y': 1395.02, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>motor & emotional</p>
        <p className="cv-t f3" style={{ '--x': 71.54, '--y': 1421.27, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>bonding.</p>
        <p className="cv-t f3" style={{ '--x': 306.15, '--y': 1368.77, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Natural English</p>
        <p className="cv-t f3" style={{ '--x': 306.15, '--y': 1395.02, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>immersion, vocabulary</p>
        <p className="cv-t f3" style={{ '--x': 306.15, '--y': 1421.27, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>& peer dialogue.</p>
        <p className="cv-t f3" style={{ '--x': 540.76, '--y': 1368.77, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Jolly Phonics,</p>
        <p className="cv-t f3" style={{ '--x': 540.76, '--y': 1395.02, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>mathematical logic &</p>
        <p className="cv-t f3" style={{ '--x': 540.76, '--y': 1421.27, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>science discovery.</p>
        <p className="cv-t f3" style={{ '--x': 775.37, '--y': 1368.77, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Advanced STEAM</p>
        <p className="cv-t f3" style={{ '--x': 775.37, '--y': 1395.02, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>projects & Primary</p>
        <p className="cv-t f3" style={{ '--x': 775.37, '--y': 1421.27, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>School readiness.</p>
        <h2 className="cv-t f6" style={{ '--x': 574.75, '--y': 2124.23, '--s': 36.998, '--c': '#ca9c57' } as React.CSSProperties}>HOW CHILDREN LEARN</h2>
        <p className="cv-t f3" style={{ '--x': 744.49, '--y': 2252.42, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>At Maple Bear, children assimilate</p>
        <p className="cv-t f3" style={{ '--x': 765.36, '--y': 2278.67, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>knowledge organically through</p>
        <p className="cv-t f3" style={{ '--x': 705.61, '--y': 2304.92, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>unhindered exploration and purposeful</p>
        <p className="cv-t f3" style={{ '--x': 741.52, '--y': 2331.17, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>play. Honoring each child's unique</p>
        <p className="cv-t f3" style={{ '--x': 731.2, '--y': 2357.42, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>developmental pace, our immersive</p>
        <p className="cv-t f3" style={{ '--x': 709.76, '--y': 2383.67, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>pedagogy translates active observation</p>
        <p className="cv-t f3" style={{ '--x': 724.22, '--y': 2409.92, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>into practical application, masterfully</p>
        <p className="cv-t f3" style={{ '--x': 702.76, '--y': 2436.17, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>cultivating innate curiosity, independent</p>
        <p className="cv-t f3" style={{ '--x': 708.32, '--y': 2462.42, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>reasoning, and holistic problem-solving</p>
        <p className="cv-t f3" style={{ '--x': 937.71, '--y': 2488.67, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>skills.</p>
        <h2 className="cv-t f6" style={{ '--x': 51.83, '--y': 3017, '--s': 46.823, '--c': '#ca9c57' } as React.CSSProperties}>WEEKLY PLAN</h2>
        <h3 className="cv-t f6" style={{ '--x': 89.99, '--y': 2666.33, '--s': 21.795, '--c': '#7e0e12' } as React.CSSProperties}>07:30 - 08:30</h3>
        <p className="cv-t f3" style={{ '--x': 72.7, '--y': 2691.45, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Morning Health Check & Welcome Circle</p>
        <h3 className="cv-t f6" style={{ '--x': 89.99, '--y': 2735.36, '--s': 21.795, '--c': '#7e0e12' } as React.CSSProperties}>08:30 - 11:00</h3>
        <p className="cv-t f3" style={{ '--x': 72.7, '--y': 2760.47, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Jolly Phonics & English Immersion Discovery</p>
        <h3 className="cv-t f6" style={{ '--x': 89.99, '--y': 2804.23, '--s': 21.795, '--c': '#7e0e12' } as React.CSSProperties}>11:30 - 14:00</h3>
        <p className="cv-t f3" style={{ '--x': 72.7, '--y': 2831.03, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>5-Star Organic Lunch & Rest Time</p>
        <h3 className="cv-t f6" style={{ '--x': 89.99, '--y': 2873.11, '--s': 21.795, '--c': '#7e0e12' } as React.CSSProperties}>14:30 - 16:30</h3>
        <p className="cv-t f3" style={{ '--x': 72.7, '--y': 2902.35, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>STEAM Activity & Outdoor Sports</p>
        <h3 className="cv-t f6" style={{ '--x': 89.99, '--y': 2940.4, '--s': 21.795, '--c': '#7e0e12' } as React.CSSProperties}>16:30 - 17:30</h3>
        <p className="cv-t f3" style={{ '--x': 72.7, '--y': 2967.51, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Farewell Circle & Parent Handover</p>
        <p className="cv-t f0" style={{ '--x': 791.49, '--y': 3037.82, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>More</p>
        <p className="cv-t f0" style={{ '--x': 63.11, '--y': 3283.03, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Find out more</p>
        <h2 className="cv-t f6" style={{ '--x': 57.6, '--y': 3180.17, '--s': 33.639, '--c': '#cda330' } as React.CSSProperties}>NUTRITION &</h2>
        <h2 className="cv-t f6" style={{ '--x': 57.6, '--y': 3218.31, '--s': 33.639, '--c': '#cda330', '--ls': -0.007 } as React.CSSProperties}>PROGRAM MEAL</h2>
        <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3248.64, '--s': 21.795, '--c': '#7e0e12', '--ls': -0.006 } as React.CSSProperties}>100% ORGANIC</h3>
        <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3307.08, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Daily fresh delivery from</p>
        <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3333.33, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>accredited organic farms.</p>
        <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3278.21, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Certified Organic Farm</h3>
        <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3389.77, '--s': 21.795, '--c': '#7e0e12', '--ls': -0.006 } as React.CSSProperties}>CALORIE BALANCED</h3>
        <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3448.21, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Calorie-balanced meals designed</p>
        <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3474.46, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>for child growth.</p>
        <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3419.33, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Pediatric Dietitian Menu</h3>
        <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3530.89, '--s': 21.795, '--c': '#7e0e12', '--ls': -0.006 } as React.CSSProperties}>HYGIENE GUARANTEE</h3>
        <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3589.33, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>24-hour food sampling &</p>
        <p className="cv-t f3" style={{ '--x': 681.13, '--y': 3615.58, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>microbiology audits.</p>
        <h3 className="cv-t f6" style={{ '--x': 681.13, '--y': 3560.46, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>5-Star Hygiene Standards</h3>
        <h2 className="cv-t f6" style={{ '--x': 78.91, '--y': 3823.91, '--s': 57.408, '--c': '#ffffff', 'opacity': 0.46 } as React.CSSProperties}>INTERNATIONAL KINDERGARTEN</h2>
        <h2 className="cv-t f6" style={{ '--x': 72.77, '--y': 3726.9, '--s': 81.225, '--c': '#ffffff' } as React.CSSProperties}>SUNSHINE MAPLE BEAR </h2>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 4046.84, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>S4 Building, Sunshine City, Nam Thang Long</p>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 4067.09, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Urban Area, Phu Thuong Ward, Hanoi, Vietnam</p>
        <p className="cv-t f2" style={{ '--x': 113.51, '--y': 4095.87, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>094 254 6655</p>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 4124.34, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>admissions@sunshinemaplebear.edu.vn</p>
        <h3 className="cv-t f6" style={{ '--x': 835.96, '--y': 3937.85, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>About us </h3>
        <h3 className="cv-t f6" style={{ '--x': 827.43, '--y': 4024.86, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>Academic</h3>
        <h3 className="cv-t f6" style={{ '--x': 824.02, '--y': 3981.35, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Admission</h3>
        <h3 className="cv-t f6" style={{ '--x': 812.13, '--y': 4068.36, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Curriculum</h3>
        <h3 className="cv-t f6" style={{ '--x': 884.41, '--y': 4111.96, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>New</h3>
        <p className="cv-t f3" style={{ '--x': 78.91, '--y': 4219.84, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>© 2026 SUNSHINE MAPLE BEAR INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.</p>
        <p className="cv-t f3" style={{ '--x': 748.77, '--y': 4219.84, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Follow us</p>
        <Link href="/admissions#contact" className="cv-a cv-pill-glass" aria-label="Book a visit" style={{ '--x': 463.3, '--y': 89.1, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions#contact" className="cv-a cv-pill-glass" aria-label="Genaral enquiries" style={{ '--x': 575.4, '--y': 89.1, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions/founding-families" className="cv-a cv-pill-glass" aria-label="Register interest" style={{ '--x': 724.4, '--y': 89.1, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions#contact" className="cv-a" aria-label="More" style={{ '--x': 759, '--y': 3032.7, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions#contact" className="cv-a" aria-label="Find out more" style={{ '--x': 57.9, '--y': 3277.9, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <a href="tel:0942546655" className="cv-a" aria-label="094 254 6655" style={{ '--x': 109.5, '--y': 4092.9, '--w': 98.6, '--h': 25.8 } as React.CSSProperties} />
        <a href="mailto:admissions@sunshinemaplebear.edu.vn" className="cv-a" aria-label="admissions@sunshinemaplebear.edu.vn" style={{ '--x': 108.7, '--y': 4121.3, '--w': 271.1, '--h': 25.9 } as React.CSSProperties} />
        <Link href="/about" className="cv-a" aria-label="About us" style={{ '--x': 832, '--y': 3937.1, '--w': 99, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Academic" style={{ '--x': 823.4, '--y': 4024.1, '--w': 105.8, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/admissions" className="cv-a" aria-label="Admission" style={{ '--x': 820, '--y': 3980.6, '--w': 109.6, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Curriculum" style={{ '--x': 808.1, '--y': 4067.6, '--w': 121, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/blog" className="cv-a" aria-label="New" style={{ '--x': 880.4, '--y': 4111.2, '--w': 49.7, '--h': 28.5 } as React.CSSProperties} />
        <button type="button" onClick={() => setIsMenuOpen(true)} className="cv-a cv-pill-glass" aria-label="Open menu" style={{ '--x': 925, '--y': 84, '--w': 50, '--h': 38 } as React.CSSProperties} />
        <Link href="/" className="cv-a" aria-label="Sunshine Maple Bear home" style={{ '--x': 0, '--y': 42, '--w': 270, '--h': 120 } as React.CSSProperties} />
        </div>
      </main>

      <CanvaExactDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
