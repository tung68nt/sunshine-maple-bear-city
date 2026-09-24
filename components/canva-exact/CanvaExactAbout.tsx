'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CanvaExactDrawer } from './CanvaExactDrawer'

export function CanvaExactAbout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <main className="cv">
        <div className="cv-page" style={{ '--h': 3849.75 } as React.CSSProperties}>
        <img className="cv-bg" src="/canva-exact/bg/about-0.webp" alt="" style={{ '--y': 0, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/about-1.webp" alt="" style={{ '--y': 1024, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/about-2.webp" alt="" style={{ '--y': 2048, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/about-3.webp" alt="" style={{ '--y': 3072, '--h': 778 } as React.CSSProperties} decoding="async" />
        <p className="cv-t f6" style={{ '--x': 618.56, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 1</p>
        <p className="cv-t f6" style={{ '--x': 684.34, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 2</p>
        <p className="cv-t f6" style={{ '--x': 753.63, '--y': 10, '--s': 18, '--c': '#304254' } as React.CSSProperties}>Page 3</p>
        <p className="cv-t f6" style={{ '--x': 822.46, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 4</p>
        <p className="cv-t f6" style={{ '--x': 892.02, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 5</p>
        <p className="cv-t f6" style={{ '--x': 960.73, '--y': 10, '--s': 18, '--c': '#304254', 'opacity': 0.61 } as React.CSSProperties}>Page 6</p>
        <p className="cv-t f0" style={{ '--x': 477, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Book a visit</p>
        <p className="cv-t f0" style={{ '--x': 588.7, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Genaral enquiries</p>
        <p className="cv-t f0" style={{ '--x': 741.08, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Register interest</p>
        <p className="cv-t f0" style={{ '--x': 879.15, '--y': 93.28, '--s': 13.995, '--c': '#ffffff' } as React.CSSProperties}>EN ↓</p>
        <h1 className="cv-t f6" style={{ '--x': 72.48, '--y': 471.99, '--s': 120.025, '--c': '#ffffff' } as React.CSSProperties}>ABOUT US</h1>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 713.02, '--s': 19.38, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>INTRODUCTION</p>
        <h2 className="cv-t f6" style={{ '--x': 72.67, '--y': 774.13, '--s': 36.837, '--c': '#ca9c57' } as React.CSSProperties}>SUNSHINE MAPLE BEAR</h2>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 904.15, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>Maple Bear schools offer full Canadian programs</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 930.4, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>utilizing Canadian methodology and curriculum</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 956.65, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>developed by our own experts from the ground up</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 982.9, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>for preschool, elementary, and high school.</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 1009.15, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>We take our responsibility to our students and their</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 1035.4, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>parents very seriously. Strict quality controls ensure</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 1061.65, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>we deliver the very best Canadian practices in</p>
        <p className="cv-t f0" style={{ '--x': 68.13, '--y': 1087.9, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>education.</p>
        <h3 className="cv-t f6" style={{ '--x': 68.13, '--y': 822.75, '--s': 27.065, '--c': '#ca9c57' } as React.CSSProperties}>INTERNATIONAL KINDERGARTEN</h3>
        <p className="cv-t f0" style={{ '--x': 598.94, '--y': 1332.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>“Our</p>
        <p className="cv-t f0" style={{ '--x': 642.73, '--y': 1332.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>goal</p>
        <p className="cv-t f0" style={{ '--x': 682.96, '--y': 1332.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>is</p>
        <p className="cv-t f0" style={{ '--x': 701.69, '--y': 1332.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>to</p>
        <p className="cv-t f0" style={{ '--x': 724.76, '--y': 1332.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>deliver</p>
        <p className="cv-t f0" style={{ '--x': 783.66, '--y': 1332.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 799.63, '--y': 1332.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>student-focused</p>
        <p className="cv-t f0" style={{ '--x': 598.94, '--y': 1358.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>learning</p>
        <p className="cv-t f0" style={{ '--x': 672.76, '--y': 1358.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>system</p>
        <p className="cv-t f0" style={{ '--x': 739.5, '--y': 1358.5, '--s': 15.382, '--c': '#ffffff', '--ls': 0.01 } as React.CSSProperties}>in</p>
        <p className="cv-t f0" style={{ '--x': 765.43, '--y': 1358.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 786.45, '--y': 1358.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>safe,</p>
        <p className="cv-t f0" style={{ '--x': 834.32, '--y': 1358.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>secure</p>
        <p className="cv-t f0" style={{ '--x': 897.63, '--y': 1358.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>and</p>
        <p className="cv-t f0" style={{ '--x': 598.94, '--y': 1384.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>stimulating</p>
        <p className="cv-t f0" style={{ '--x': 699.5, '--y': 1384.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>environment</p>
        <p className="cv-t f0" style={{ '--x': 812.9, '--y': 1384.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>that</p>
        <p className="cv-t f0" style={{ '--x': 859.06, '--y': 1384.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>prepares</p>
        <p className="cv-t f0" style={{ '--x': 598.94, '--y': 1411, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>students</p>
        <p className="cv-t f0" style={{ '--x': 672.06, '--y': 1411, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>for</p>
        <p className="cv-t f0" style={{ '--x': 700.57, '--y': 1411, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>success</p>
        <p className="cv-t f0" style={{ '--x': 767.97, '--y': 1411, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>at</p>
        <p className="cv-t f0" style={{ '--x': 789.7, '--y': 1411, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 805.6, '--y': 1411, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>post</p>
        <p className="cv-t f0" style={{ '--x': 846.52, '--y': 1411, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>secondary</p>
        <p className="cv-t f0" style={{ '--x': 598.94, '--y': 1437.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>level</p>
        <p className="cv-t f0" style={{ '--x': 640.43, '--y': 1437.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>and</p>
        <p className="cv-t f0" style={{ '--x': 675.23, '--y': 1437.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>that</p>
        <p className="cv-t f0" style={{ '--x': 711.37, '--y': 1437.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>instills</p>
        <p className="cv-t f0" style={{ '--x': 763.78, '--y': 1437.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 778.52, '--y': 1437.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>passion</p>
        <p className="cv-t f0" style={{ '--x': 842.4, '--y': 1437.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>for</p>
        <p className="cv-t f0" style={{ '--x': 869.76, '--y': 1437.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>lifelong</p>
        <p className="cv-t f0" style={{ '--x': 598.94, '--y': 1463.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>learning.</p>
        <p className="cv-t f0" style={{ '--x': 679.06, '--y': 1463.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>The</p>
        <p className="cv-t f0" style={{ '--x': 722.38, '--y': 1463.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>Maple</p>
        <p className="cv-t f0" style={{ '--x': 784.93, '--y': 1463.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>Bear</p>
        <p className="cv-t f0" style={{ '--x': 834.41, '--y': 1463.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>Program</p>
        <p className="cv-t f0" style={{ '--x': 914.93, '--y': 1463.5, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>is</p>
        <p className="cv-t f0" style={{ '--x': 598.94, '--y': 1489.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>designed</p>
        <p className="cv-t f0" style={{ '--x': 680.4, '--y': 1489.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>to</p>
        <p className="cv-t f0" style={{ '--x': 706.76, '--y': 1489.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>educate</p>
        <p className="cv-t f0" style={{ '--x': 779.83, '--y': 1489.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>the</p>
        <p className="cv-t f0" style={{ '--x': 815.25, '--y': 1489.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>whole</p>
        <p className="cv-t f0" style={{ '--x': 872.06, '--y': 1489.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>child</p>
        <p className="cv-t f0" style={{ '--x': 919.72, '--y': 1489.75, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>-</p>
        <p className="cv-t f0" style={{ '--x': 598.94, '--y': 1516, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>physically,</p>
        <p className="cv-t f0" style={{ '--x': 686.93, '--y': 1516, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>intellectually,</p>
        <p className="cv-t f0" style={{ '--x': 795.77, '--y': 1516, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>emotionally,</p>
        <p className="cv-t f0" style={{ '--x': 897.63, '--y': 1516, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>and</p>
        <p className="cv-t f0" style={{ '--x': 598.94, '--y': 1542.25, '--s': 15.382, '--c': '#ffffff' } as React.CSSProperties}>socially.”</p>
        <p className="cv-t f0" style={{ '--x': 650.23, '--y': 1592.83, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>More</p>
        <h2 className="cv-t f6" style={{ '--x': 398.55, '--y': 1796.59, '--s': 36.833, '--c': '#3d3d3d' } as React.CSSProperties}>KEY FIGURES</h2>
        <h2 className="cv-t f0" style={{ '--x': 120.44, '--y': 2110.37, '--s': 35.498, '--c': '#ca9c57' } as React.CSSProperties}>500+</h2>
        <p className="cv-t f6" style={{ '--x': 113.49, '--y': 2155.36, '--s': 11.409, '--c': '#3d3d3d' } as React.CSSProperties}>GLOBAL SCHOOLS</p>
        <h2 className="cv-t f0" style={{ '--x': 250.57, '--y': 1937.86, '--s': 35.498, '--c': '#ca9c57' } as React.CSSProperties}>37+</h2>
        <p className="cv-t f6" style={{ '--x': 248.24, '--y': 1982.85, '--s': 11.409, '--c': '#3d3d3d' } as React.CSSProperties}>COUNTRIES WORLDWIDE</p>
        <h2 className="cv-t f0" style={{ '--x': 488.63, '--y': 2113.92, '--s': 35.498, '--c': '#ca9c57' } as React.CSSProperties}>100%</h2>
        <p className="cv-t f6" style={{ '--x': 486.29, '--y': 2158.91, '--s': 11.409, '--c': '#3d3d3d' } as React.CSSProperties}>ENGLISH IMMERSION</p>
        <h2 className="cv-t f0" style={{ '--x': 753.75, '--y': 1937.86, '--s': 35.498, '--c': '#ca9c57' } as React.CSSProperties}>100%</h2>
        <p className="cv-t f6" style={{ '--x': 751.42, '--y': 1982.85, '--s': 11.409, '--c': '#3d3d3d' } as React.CSSProperties}>NATIVE OCT EDUCATORS</p>
        <h2 className="cv-t f6" style={{ '--x': 110.25, '--y': 2345.39, '--s': 36.833, '--c': '#3d3d3d' } as React.CSSProperties}>WHAT MAKES US </h2>
        <h2 className="cv-t f6" style={{ '--x': 402.92, '--y': 2345.39, '--s': 36.833, '--c': '#7e0e12' } as React.CSSProperties}>SPECIAL</h2>
        <h3 className="cv-t f6" style={{ '--x': 110.25, '--y': 2524.6, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Authentic Canadian</h3>
        <h3 className="cv-t f6" style={{ '--x': 110.25, '--y': 2550.1, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>Curriculum</h3>
        <p className="cv-t f3" style={{ '--x': 110.25, '--y': 2585.39, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Authentic Canadian Early</p>
        <p className="cv-t f3" style={{ '--x': 110.25, '--y': 2611.64, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Childhood Curriculum</p>
        <p className="cv-t f3" style={{ '--x': 110.25, '--y': 2637.89, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>designed by leading global</p>
        <p className="cv-t f3" style={{ '--x': 110.25, '--y': 2664.14, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>educational experts.</p>
        <h3 className="cv-t f6" style={{ '--x': 411.97, '--y': 2524.6, '--s': 21.795, '--c': '#2e2e2e', '--ls': -0.006 } as React.CSSProperties}>100%</h3>
        <h3 className="cv-t f6" style={{ '--x': 411.97, '--y': 2550.1, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>English Immersion</h3>
        <p className="cv-t f3" style={{ '--x': 411.97, '--y': 2585.39, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>100% English Immersion</p>
        <p className="cv-t f3" style={{ '--x': 411.97, '--y': 2611.64, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>environment developing</p>
        <p className="cv-t f3" style={{ '--x': 411.97, '--y': 2637.89, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>natural bilingual fluency</p>
        <p className="cv-t f3" style={{ '--x': 411.97, '--y': 2664.14, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>without translation pressure.</p>
        <h3 className="cv-t f6" style={{ '--x': 713.69, '--y': 2530.68, '--s': 21.795, '--c': '#2e2e2e' } as React.CSSProperties}>5-Star</h3>
        <h3 className="cv-t f6" style={{ '--x': 713.69, '--y': 2556.18, '--s': 21.795, '--c': '#2e2e2e', '--ls': -0.006 } as React.CSSProperties}>Modern Campus</h3>
        <p className="cv-t f3" style={{ '--x': 713.69, '--y': 2591.47, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>5-Star Modern Campus</p>
        <p className="cv-t f3" style={{ '--x': 713.69, '--y': 2617.72, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Facilities located inside</p>
        <p className="cv-t f3" style={{ '--x': 713.69, '--y': 2643.97, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>Sunshine City urban complex.</p>
        <p className="cv-t f0" style={{ '--x': 161.53, '--y': 2709.63, '--s': 12.553, '--c': '#7e0e12' } as React.CSSProperties}>More</p>
        <p className="cv-t f0" style={{ '--x': 463.26, '--y': 2709.63, '--s': 12.553, '--c': '#7e0e12' } as React.CSSProperties}>More</p>
        <p className="cv-t f0" style={{ '--x': 764.98, '--y': 2709.63, '--s': 12.553, '--c': '#7e0e12' } as React.CSSProperties}>More</p>
        <h2 className="cv-t f6" style={{ '--x': 61.25, '--y': 2867.75, '--s': 43.41, '--c': '#3d3d3d', '--ls': -0.012 } as React.CSSProperties}>OUR </h2>
        <h2 className="cv-t f6" style={{ '--x': 161.68, '--y': 2867.75, '--s': 43.41, '--c': '#7e0e12', '--ls': -0.009 } as React.CSSProperties}>INVITATION</h2>
        <p className="cv-t f1" style={{ '--x': 61.25, '--y': 2974.27, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>At Sunshine Maple Bear International</p>
        <p className="cv-t f1" style={{ '--x': 61.25, '--y': 3000.52, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Kindergarten, pupils grow into confident</p>
        <p className="cv-t f1" style={{ '--x': 61.25, '--y': 3026.77, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>learners, compassionate friends and thoughtful</p>
        <p className="cv-t f1" style={{ '--x': 61.25, '--y': 3053.02, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>young leaders.</p>
        <p className="cv-t f1" style={{ '--x': 61.25, '--y': 3079.27, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Together with families, we prepare pupils to</p>
        <p className="cv-t f1" style={{ '--x': 61.25, '--y': 3105.52, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>flourish at school, in life and in the world</p>
        <p className="cv-t f1" style={{ '--x': 61.25, '--y': 3131.77, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>beyond.</p>
        <p className="cv-t f0" style={{ '--x': 90.14, '--y': 3182.97, '--s': 12.553, '--c': '#7e0e12' } as React.CSSProperties}>Book a visit</p>
        <h2 className="cv-t f6" style={{ '--x': 78.91, '--y': 3394.91, '--s': 57.408, '--c': '#ffffff', 'opacity': 0.46 } as React.CSSProperties}>INTERNATIONAL KINDERGARTEN</h2>
        <h2 className="cv-t f6" style={{ '--x': 72.77, '--y': 3297.9, '--s': 81.225, '--c': '#ffffff' } as React.CSSProperties}>SUNSHINE MAPLE BEAR </h2>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 3617.84, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>S4 Building, Sunshine City, Nam Thang Long</p>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 3638.09, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Urban Area, Phu Thuong Ward, Hanoi, Vietnam</p>
        <p className="cv-t f2" style={{ '--x': 113.51, '--y': 3666.87, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>094 254 6655</p>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 3695.34, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>admissions@sunshinemaplebear.edu.vn</p>
        <h3 className="cv-t f6" style={{ '--x': 835.96, '--y': 3508.85, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>About us </h3>
        <h3 className="cv-t f6" style={{ '--x': 827.43, '--y': 3595.86, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>Academic</h3>
        <h3 className="cv-t f6" style={{ '--x': 824.02, '--y': 3552.35, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Admission</h3>
        <h3 className="cv-t f6" style={{ '--x': 812.13, '--y': 3639.36, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Curriculum</h3>
        <h3 className="cv-t f6" style={{ '--x': 884.41, '--y': 3682.96, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>New</h3>
        <p className="cv-t f3" style={{ '--x': 78.91, '--y': 3790.84, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>© 2026 SUNSHINE MAPLE BEAR INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.</p>
        <p className="cv-t f3" style={{ '--x': 748.77, '--y': 3790.84, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Follow us</p>
        <Link href="/" className="cv-a" aria-label="Page 1" style={{ '--x': 614.6, '--y': 8.8, '--w': 55.7, '--h': 24.7 } as React.CSSProperties} />
        <button type="button" onClick={() => setIsMenuOpen(true)} className="cv-a" aria-label="Page 2" style={{ '--x': 680.3, '--y': 8.8, '--w': 59.3, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/about" className="cv-a" aria-label="Page 3" style={{ '--x': 749.6, '--y': 8.8, '--w': 58.8, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Page 4" style={{ '--x': 818.5, '--y': 8.8, '--w': 59.5, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/admissions" className="cv-a" aria-label="Page 5" style={{ '--x': 888, '--y': 8.8, '--w': 58.7, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/admissions/founding-families" className="cv-a" aria-label="Page 6" style={{ '--x': 956.7, '--y': 8.8, '--w': 59.8, '--h': 24.7 } as React.CSSProperties} />
        <Link href="/admissions#contact" className="cv-a" aria-label="Book a visit" style={{ '--x': 463.3, '--y': 89.1, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions#contact" className="cv-a" aria-label="Genaral enquiries" style={{ '--x': 575.4, '--y': 89.1, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions/founding-families" className="cv-a" aria-label="Register interest" style={{ '--x': 724.4, '--y': 89.1, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="More" style={{ '--x': 599.3, '--y': 1587.7, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="More" style={{ '--x': 110.6, '--y': 2704.5, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="More" style={{ '--x': 412.3, '--y': 2704.5, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="More" style={{ '--x': 714, '--y': 2704.5, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions#contact" className="cv-a" aria-label="Book a visit" style={{ '--x': 58, '--y': 3177.8, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <a href="tel:0942546655" className="cv-a" aria-label="094 254 6655" style={{ '--x': 109.5, '--y': 3663.9, '--w': 98.6, '--h': 25.8 } as React.CSSProperties} />
        <a href="mailto:admissions@sunshinemaplebear.edu.vn" className="cv-a" aria-label="admissions@sunshinemaplebear.edu.vn" style={{ '--x': 108.7, '--y': 3692.3, '--w': 271.1, '--h': 25.9 } as React.CSSProperties} />
        <Link href="/about" className="cv-a" aria-label="About us" style={{ '--x': 832, '--y': 3508.1, '--w': 99, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Academic" style={{ '--x': 823.4, '--y': 3595.1, '--w': 105.8, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/admissions" className="cv-a" aria-label="Admission" style={{ '--x': 820, '--y': 3551.6, '--w': 109.6, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Curriculum" style={{ '--x': 808.1, '--y': 3638.6, '--w': 121, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/blog" className="cv-a" aria-label="New" style={{ '--x': 880.4, '--y': 3682.2, '--w': 49.7, '--h': 28.5 } as React.CSSProperties} />
        <button type="button" onClick={() => setIsMenuOpen(true)} className="cv-a" aria-label="Open menu" style={{ '--x': 925, '--y': 84, '--w': 50, '--h': 38 } as React.CSSProperties} />
        <Link href="/" className="cv-a" aria-label="Sunshine Maple Bear home" style={{ '--x': 0, '--y': 42, '--w': 270, '--h': 120 } as React.CSSProperties} />
        </div>
      </main>

      <CanvaExactDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
