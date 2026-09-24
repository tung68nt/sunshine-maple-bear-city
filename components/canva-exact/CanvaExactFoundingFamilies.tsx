'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CanvaExactDrawer } from './CanvaExactDrawer'
import { CanvaExactContactForm } from './CanvaExactContactForm'

export function CanvaExactFoundingFamilies() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <main className="cv">
        <div className="cv-page" style={{ '--h': 3199.5 } as React.CSSProperties}>
        <img className="cv-bg" src="/canva-exact/bg/founding-families-0.webp" alt="" style={{ '--y': 0, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/founding-families-1.webp" alt="" style={{ '--y': 1024, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/founding-families-2.webp" alt="" style={{ '--y': 2048, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/founding-families-3.webp" alt="" style={{ '--y': 3072, '--h': 127.5 } as React.CSSProperties} decoding="async" />
        <p className="cv-t f6" style={{ '--x': 618.56, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 1</p>
        <p className="cv-t f6" style={{ '--x': 684.34, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 2</p>
        <p className="cv-t f6" style={{ '--x': 753.63, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 3</p>
        <p className="cv-t f6" style={{ '--x': 822.46, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 4</p>
        <p className="cv-t f6" style={{ '--x': 892.02, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 5</p>
        <p className="cv-t f6" style={{ '--x': 960.73, '--y': 10, '--s': 18, '--c': '#304254' } as React.CSSProperties}>Page 6</p>
        <p className="cv-t f0" style={{ '--x': 477, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Book a visit</p>
        <p className="cv-t f0" style={{ '--x': 588.7, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Genaral enquiries</p>
        <p className="cv-t f0" style={{ '--x': 741.08, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Register interest</p>
        <p className="cv-t f0" style={{ '--x': 879.15, '--y': 93.28, '--s': 13.995, '--c': '#ffffff' } as React.CSSProperties}>EN ↓</p>
        <h1 className="cv-t f6" style={{ '--x': 50.13, '--y': 503.3, '--s': 79.288, '--c': '#ffffff' } as React.CSSProperties}>FOUNDING FAMILIES</h1>
        <h2 className="cv-t f0" style={{ '--x': 57.6, '--y': 697.94, '--s': 32.724, '--c': '#3d3d3d', '--ls': -0.013 } as React.CSSProperties}>BECOME</h2>
        <h2 className="cv-t f0" style={{ '--x': 57.6, '--y': 754.93, '--s': 32.724, '--c': '#3d3d3d', '--ls': -0.01 } as React.CSSProperties}>ONE OF OUR</h2>
        <h2 className="cv-t f6" style={{ '--x': 58.29, '--y': 793.39, '--s': 132.464, '--c': '#ca9c57' } as React.CSSProperties}>40</h2>
        <h2 className="cv-t f6" style={{ '--x': 58.29, '--y': 952.9, '--s': 44.716, '--c': '#7e0e12', '--ls': -0.01 } as React.CSSProperties}>FOUNDING</h2>
        <h2 className="cv-t f6" style={{ '--x': 58.29, '--y': 1012.42, '--s': 44.716, '--c': '#7e0e12', '--ls': -0.009 } as React.CSSProperties}>FAMILIES</h2>
        <p className="cv-t f0" style={{ '--x': 75.34, '--y': 1087.99, '--s': 12.553, '--c': '#7e0e12' } as React.CSSProperties}>Register interest</p>
        <h2 className="cv-t f0" style={{ '--x': 724.6, '--y': 1256.18, '--s': 32.73, '--c': '#fff8ee', '--ls': -0.008 } as React.CSSProperties}>AND ENJOY</h2>
        <h2 className="cv-t f0" style={{ '--x': 672.79, '--y': 1313.18, '--s': 32.73, '--c': '#fff8ee', '--ls': -0.007 } as React.CSSProperties}>AN EXCLUSIVE </h2>
        <h2 className="cv-t f6" style={{ '--x': 721.84, '--y': 1356.43, '--s': 132.464, '--c': '#ca9c57' } as React.CSSProperties}>30</h2>
        <h2 className="cv-t f6" style={{ '--x': 878.98, '--y': 1411.04, '--s': 67.753, '--c': '#ca9c57' } as React.CSSProperties}>%</h2>
        <h2 className="cv-t f6" style={{ '--x': 765.77, '--y': 1518.17, '--s': 44.715, '--c': '#ca9c57' } as React.CSSProperties}>TUITION</h2>
        <h2 className="cv-t f6" style={{ '--x': 635.76, '--y': 1578.17, '--s': 44.715, '--c': '#ca9c57' } as React.CSSProperties}>SCHOLARSHIP</h2>
        <p className="cv-t f6" style={{ '--x': 71.54, '--y': 1764.39, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>ENDURING</p>
        <p className="cv-t f6" style={{ '--x': 71.54, '--y': 1783.14, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>COMMITMENT</p>
        <p className="cv-t f6" style={{ '--x': 306.15, '--y': 1761.54, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>PRIORITY</p>
        <p className="cv-t f6" style={{ '--x': 306.15, '--y': 1780.29, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>EDUCATIONAL</p>
        <p className="cv-t f6" style={{ '--x': 306.15, '--y': 1799.04, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>ACCESS</p>
        <p className="cv-t f6" style={{ '--x': 541.31, '--y': 1761.54, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>DISTINGUISHED</p>
        <p className="cv-t f6" style={{ '--x': 541.31, '--y': 1780.29, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>COMMUNITY</p>
        <p className="cv-t f6" style={{ '--x': 541.31, '--y': 1799.04, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>ENGAGEMENT</p>
        <p className="cv-t f6" style={{ '--x': 776.46, '--y': 1758.69, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>BESPOKE</p>
        <p className="cv-t f6" style={{ '--x': 776.46, '--y': 1777.44, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>FOUNDING</p>
        <p className="cv-t f6" style={{ '--x': 776.46, '--y': 1796.19, '--s': 14.407, '--c': '#7e0e12' } as React.CSSProperties}>PRIVILEGES</p>
        <p className="cv-t f3" style={{ '--x': 71.54, '--y': 1831.22, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Privileges maintained</p>
        <p className="cv-t f3" style={{ '--x': 71.54, '--y': 1857.47, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>throughout continuous</p>
        <p className="cv-t f3" style={{ '--x': 71.54, '--y': 1883.72, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>enrollment.</p>
        <p className="cv-t f3" style={{ '--x': 306.15, '--y': 1831.22, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Priority entry to</p>
        <p className="cv-t f3" style={{ '--x': 306.15, '--y': 1857.47, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>specialized workshops &</p>
        <p className="cv-t f3" style={{ '--x': 306.15, '--y': 1883.72, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>educational advisory.</p>
        <p className="cv-t f3" style={{ '--x': 540.76, '--y': 1831.22, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Exclusive invitations</p>
        <p className="cv-t f3" style={{ '--x': 540.76, '--y': 1857.47, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>to parent networking</p>
        <p className="cv-t f3" style={{ '--x': 540.76, '--y': 1883.72, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>events.</p>
        <p className="cv-t f3" style={{ '--x': 775.37, '--y': 1831.22, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Curated honors</p>
        <p className="cv-t f3" style={{ '--x': 775.37, '--y': 1857.47, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>announced across</p>
        <p className="cv-t f3" style={{ '--x': 775.37, '--y': 1883.72, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>school operational</p>
        <p className="cv-t f3" style={{ '--x': 775.37, '--y': 1909.97, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>phases.</p>
        <h2 className="cv-t f6 cv-ghost" style={{ '--x': 111.97, '--y': 2114.08, '--s': 37.042, '--c': '#000000', '--ls': -0.006 } as React.CSSProperties}>CONTACT US</h2>
        <h2 className="cv-t f6" style={{ '--x': 111.97, '--y': 2114.08, '--s': 37.042, '--c': '#2e2e2e', '--ls': -0.008 } as React.CSSProperties}>CONTACT</h2>
        <h2 className="cv-t f6" style={{ '--x': 287.06, '--y': 2114.08, '--s': 37.042, '--c': '#7e0e12' } as React.CSSProperties}> US</h2>
        <p className="cv-t f0" style={{ '--x': 298.35, '--y': 2543.17, '--s': 12.553, '--c': '#3d3d3d' } as React.CSSProperties}>Send</p>
        <p className="cv-t f3" style={{ '--x': 115.22, '--y': 2177.58, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>If you have any questions, please fill in the form below and</p>
        <p className="cv-t f3" style={{ '--x': 115.22, '--y': 2203.83, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>we will get in touch as soon as possible.</p>
        <h2 className="cv-t f6" style={{ '--x': 78.91, '--y': 2744.66, '--s': 57.408, '--c': '#ffffff', 'opacity': 0.46 } as React.CSSProperties}>INTERNATIONAL KINDERGARTEN</h2>
        <h2 className="cv-t f6" style={{ '--x': 72.77, '--y': 2647.65, '--s': 81.225, '--c': '#ffffff' } as React.CSSProperties}>SUNSHINE MAPLE BEAR </h2>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 2967.59, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>S4 Building, Sunshine City, Nam Thang Long</p>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 2987.84, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Urban Area, Phu Thuong Ward, Hanoi, Vietnam</p>
        <p className="cv-t f2" style={{ '--x': 113.51, '--y': 3016.62, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>094 254 6655</p>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 3045.09, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>admissions@sunshinemaplebear.edu.vn</p>
        <h3 className="cv-t f6" style={{ '--x': 835.96, '--y': 2858.6, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>About us </h3>
        <h3 className="cv-t f6" style={{ '--x': 816.4, '--y': 2945.61, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>Academics</h3>
        <h3 className="cv-t f6" style={{ '--x': 814.77, '--y': 2902.1, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Admissions</h3>
        <h3 className="cv-t f6" style={{ '--x': 812.13, '--y': 2989.11, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Curriculum</h3>
        <h3 className="cv-t f6" style={{ '--x': 884.41, '--y': 3032.71, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>New</h3>
        <p className="cv-t f3" style={{ '--x': 78.91, '--y': 3140.59, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>© 2026 SUNSHINE MAPLE BEAR INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.</p>
        <p className="cv-t f3" style={{ '--x': 748.77, '--y': 3140.59, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Follow us</p>
        <Link href="/" className="cv-a" aria-label="Page 1" style={{ '--x': 614.6, '--y': 8.8, '--w': 55.7, '--h': 24.7 } as React.CSSProperties} />
        <button type="button" onClick={() => setIsMenuOpen(true)} className="cv-a" aria-label="Page 2" style={{ '--x': 680.3, '--y': 8.8, '--w': 59.3, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/about" className="cv-a" aria-label="Page 3" style={{ '--x': 749.6, '--y': 8.8, '--w': 58.8, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Page 4" style={{ '--x': 818.5, '--y': 8.8, '--w': 59.5, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/admissions" className="cv-a" aria-label="Page 5" style={{ '--x': 888, '--y': 8.8, '--w': 58.7, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/admissions/founding-families" className="cv-a" aria-label="Page 6" style={{ '--x': 956.7, '--y': 8.8, '--w': 59.8, '--h': 24.7 } as React.CSSProperties} />
        <a href="#contact" className="cv-a" aria-label="Book a visit" style={{ '--x': 463.3, '--y': 89.1, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <a href="#contact" className="cv-a" aria-label="Genaral enquiries" style={{ '--x': 575.4, '--y': 89.1, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions/founding-families" className="cv-a" aria-label="Register interest" style={{ '--x': 724.4, '--y': 89.1, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions/founding-families" className="cv-a" aria-label="Register interest" style={{ '--x': 58.6, '--y': 1082.8, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <button type="submit" form="cv-contact" className="cv-a" aria-label="Send" style={{ '--x': 265, '--y': 2538, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <a href="tel:0942546655" className="cv-a" aria-label="094 254 6655" style={{ '--x': 109.5, '--y': 3013.6, '--w': 98.6, '--h': 25.8 } as React.CSSProperties} />
        <a href="mailto:admissions@sunshinemaplebear.edu.vn" className="cv-a" aria-label="admissions@sunshinemaplebear.edu.vn" style={{ '--x': 108.7, '--y': 3042.1, '--w': 271.1, '--h': 25.8 } as React.CSSProperties} />
        <Link href="/about" className="cv-a" aria-label="About us" style={{ '--x': 832, '--y': 2857.8, '--w': 99, '--h': 28.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Academics" style={{ '--x': 812.4, '--y': 2944.9, '--w': 115.4, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/admissions" className="cv-a" aria-label="Admissions" style={{ '--x': 810.8, '--y': 2901.3, '--w': 119.3, '--h': 28.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Curriculum" style={{ '--x': 808.1, '--y': 2988.4, '--w': 121, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/blog" className="cv-a" aria-label="New" style={{ '--x': 880.4, '--y': 3032, '--w': 49.7, '--h': 28.5 } as React.CSSProperties} />
        <button type="button" onClick={() => setIsMenuOpen(true)} className="cv-a" aria-label="Open menu" style={{ '--x': 925, '--y': 84, '--w': 50, '--h': 38 } as React.CSSProperties} />
        <Link href="/" className="cv-a" aria-label="Sunshine Maple Bear home" style={{ '--x': 0, '--y': 42, '--w': 270, '--h': 120 } as React.CSSProperties} />
        <span id="contact" className="cv-anchor" style={{ '--y': 2091.7 } as React.CSSProperties} />
        <CanvaExactContactForm x={111.91} y={2231.73} pageTitle="CanvaExactFoundingFamilies" />
        </div>
      </main>

      <CanvaExactDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
