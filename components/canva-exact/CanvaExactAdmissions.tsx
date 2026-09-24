'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CanvaExactDrawer } from './CanvaExactDrawer'
import { CanvaExactContactForm } from './CanvaExactContactForm'

export function CanvaExactAdmissions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <main className="cv">
        <div className="cv-page" style={{ '--h': 4336.5 } as React.CSSProperties}>
        <img className="cv-bg" src="/canva-exact/bg/admissions-0.webp" alt="" style={{ '--y': 0, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/admissions-1.webp" alt="" style={{ '--y': 1024, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/admissions-2.webp" alt="" style={{ '--y': 2048, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/admissions-3.webp" alt="" style={{ '--y': 3072, '--h': 1024 } as React.CSSProperties} decoding="async" />
        <img className="cv-bg" src="/canva-exact/bg/admissions-4.webp" alt="" style={{ '--y': 4096, '--h': 240.5 } as React.CSSProperties} decoding="async" />
        <p className="cv-t f0" style={{ '--x': 477, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Book a visit</p>
        <p className="cv-t f0" style={{ '--x': 588.7, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Genaral enquiries</p>
        <p className="cv-t f0" style={{ '--x': 741.08, '--y': 94.28, '--s': 12.553, '--c': '#ffffff' } as React.CSSProperties}>Register interest</p>
        <p className="cv-t f0" style={{ '--x': 879.15, '--y': 93.28, '--s': 13.995, '--c': '#ffffff' } as React.CSSProperties}>EN ↓</p>
        <h1 className="cv-t f6" style={{ '--x': 72.48, '--y': 471.99, '--s': 120.025, '--c': '#ffffff' } as React.CSSProperties}>ADMISSIONS</h1>
        <p className="cv-t f1" style={{ '--x': 89.04, '--y': 754.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Welcome to Sunshine Maple Bear International Kindergarten.</p>
        <p className="cv-t f1" style={{ '--x': 89.04, '--y': 780.98, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Powered</p>
        <p className="cv-t f1" style={{ '--x': 163.29, '--y': 780.98, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>by</p>
        <p className="cv-t f1" style={{ '--x': 188.18, '--y': 780.98, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Canada's</p>
        <p className="cv-t f1" style={{ '--x': 268.63, '--y': 780.98, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>world-leading</p>
        <p className="cv-t f1" style={{ '--x': 382.26, '--y': 780.98, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>educational</p>
        <p className="cv-t f1" style={{ '--x': 480.6, '--y': 780.98, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>methodology,</p>
        <p className="cv-t f1" style={{ '--x': 594, '--y': 780.98, '--s': 15.382, '--c': '#3d3d3d', '--ls': -0.006 } as React.CSSProperties}>we</p>
        <p className="cv-t f1" style={{ '--x': 622.04, '--y': 780.98, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>are</p>
        <p className="cv-t f1" style={{ '--x': 653.01, '--y': 780.98, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>proud</p>
        <p className="cv-t f1" style={{ '--x': 89.04, '--y': 807.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to offer a safe, loving environment where curiosity and holistic growth thrive. In</p>
        <p className="cv-t f1" style={{ '--x': 89.04, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>our</p>
        <p className="cv-t f1" style={{ '--x': 123.27, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>care,</p>
        <p className="cv-t f1" style={{ '--x': 171.49, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>every</p>
        <p className="cv-t f1" style={{ '--x': 222.91, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>child</p>
        <p className="cv-t f1" style={{ '--x': 269.03, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>is</p>
        <p className="cv-t f1" style={{ '--x': 289.17, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>valued</p>
        <p className="cv-t f1" style={{ '--x': 350.53, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>as</p>
        <p className="cv-t f1" style={{ '--x': 377.07, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>an</p>
        <p className="cv-t f1" style={{ '--x': 405.83, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>independent</p>
        <p className="cv-t f1" style={{ '--x': 512.59, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>learner,</p>
        <p className="cv-t f1" style={{ '--x': 580.25, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>encouraged</p>
        <p className="cv-t f1" style={{ '--x': 683.52, '--y': 833.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to</p>
        <p className="cv-t f1" style={{ '--x': 89.04, '--y': 859.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>explore and excel through proven Canadian inquiry-based learning.</p>
        <p className="cv-t f1" style={{ '--x': 89.04, '--y': 885.98, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Understanding that choosing a school is a vital choice, our Admissions Team is</p>
        <p className="cv-t f1" style={{ '--x': 89.04, '--y': 912.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>committed</p>
        <p className="cv-t f1" style={{ '--x': 178.52, '--y': 912.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to</p>
        <p className="cv-t f1" style={{ '--x': 199.13, '--y': 912.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>walking</p>
        <p className="cv-t f1" style={{ '--x': 263.99, '--y': 912.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>alongside</p>
        <p className="cv-t f1" style={{ '--x': 344.41, '--y': 912.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>you</p>
        <p className="cv-t f1" style={{ '--x': 378.16, '--y': 912.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>with</p>
        <p className="cv-t f1" style={{ '--x': 415.75, '--y': 912.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>transparent,</p>
        <p className="cv-t f1" style={{ '--x': 515.66, '--y': 912.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>dedicated,</p>
        <p className="cv-t f1" style={{ '--x': 604.36, '--y': 912.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>and</p>
        <p className="cv-t f1" style={{ '--x': 639.65, '--y': 912.23, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>tailored</p>
        <p className="cv-t f1" style={{ '--x': 89.04, '--y': 938.48, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>guidance at every stage.</p>
        <p className="cv-t f1" style={{ '--x': 89.04, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d', '--ls': -0.009 } as React.CSSProperties}>We</p>
        <p className="cv-t f1" style={{ '--x': 122.59, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>look</p>
        <p className="cv-t f1" style={{ '--x': 161.35, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>forward</p>
        <p className="cv-t f1" style={{ '--x': 228.97, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to</p>
        <p className="cv-t f1" style={{ '--x': 251.24, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>welcoming</p>
        <p className="cv-t f1" style={{ '--x': 342.84, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>you</p>
        <p className="cv-t f1" style={{ '--x': 378.25, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>and</p>
        <p className="cv-t f1" style={{ '--x': 415.2, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>partnering</p>
        <p className="cv-t f1" style={{ '--x': 503.07, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>with</p>
        <p className="cv-t f1" style={{ '--x': 542.33, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>your</p>
        <p className="cv-t f1" style={{ '--x': 583.6, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>family</p>
        <p className="cv-t f1" style={{ '--x': 638, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to</p>
        <p className="cv-t f1" style={{ '--x': 660.26, '--y': 964.73, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>pave</p>
        <p className="cv-t f1" style={{ '--x': 89.04, '--y': 990.98, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>the way for your children’s future.</p>
        <h2 className="cv-t f6" style={{ '--x': 89.04, '--y': 699.2, '--s': 36.837, '--c': '#ca9c57' } as React.CSSProperties}>A MOST DISTINGUISHED WELCOME</h2>
        <h2 className="cv-t f6" style={{ '--x': 313.34, '--y': 1202.93, '--s': 37.042, '--c': '#3d3d3d', '--ls': -0.007 } as React.CSSProperties}>ADMISSIONS </h2>
        <h2 className="cv-t f6" style={{ '--x': 538.24, '--y': 1202.93, '--s': 37.042, '--c': '#7e0e12', '--ls': -0.007 } as React.CSSProperties}>PROCESS</h2>
        <p className="cv-t f0" style={{ '--x': 457.47, '--y': 1156.53, '--s': 19.38, '--c': '#3d3d3d', '--ls': -0.006 } as React.CSSProperties}>NAVIGATE</p>
        <p className="cv-t f1" style={{ '--x': 290.34, '--y': 1259.11, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>“Below is a clear, step-by-step guide designed to support</p>
        <p className="cv-t f1" style={{ '--x': 325.92, '--y': 1285.36, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>your family throughout this admissions journey.”</p>
        <h2 className="cv-t f6" style={{ '--x': 95.22, '--y': 1435.34, '--s': 37.222, '--c': '#2e2e2e' } as React.CSSProperties}>EXPERIENCE </h2>
        <h2 className="cv-t f6" style={{ '--x': 317.8, '--y': 1435.34, '--s': 37.222, '--c': '#7e0e12' } as React.CSSProperties}>SUNSHINE MAPLE BEAR</h2>
        <h2 className="cv-t f4" style={{ '--x': 117.15, '--y': 1344.1, '--s': 53.91, '--c': '#7e0e12' } as React.CSSProperties}>1</h2>
        <p className="cv-t f0" style={{ '--x': 98.57, '--y': 1498.43, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Nothing compares to experiencing our school firsthand.</p>
        <p className="cv-t f0" style={{ '--x': 98.57, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d', '--ls': -0.009 } as React.CSSProperties}>We</p>
        <p className="cv-t f0" style={{ '--x': 131.31, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>warmly</p>
        <p className="cv-t f0" style={{ '--x': 193.02, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>encourage</p>
        <p className="cv-t f0" style={{ '--x': 281.04, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>families</p>
        <p className="cv-t f0" style={{ '--x': 344.74, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to</p>
        <p className="cv-t f0" style={{ '--x': 366.36, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>visit</p>
        <p className="cv-t f0" style={{ '--x': 402.38, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>us</p>
        <p className="cv-t f0" style={{ '--x': 425.45, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>through</p>
        <p className="cv-t f0" style={{ '--x': 492.41, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>an</p>
        <p className="cv-t f0" style={{ '--x': 516.64, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Open</p>
        <p className="cv-t f0" style={{ '--x': 565.57, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Day</p>
        <p className="cv-t f0" style={{ '--x': 601.66, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>or</p>
        <p className="cv-t f0" style={{ '--x': 623.27, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>an</p>
        <p className="cv-t f0" style={{ '--x': 647.5, '--y': 1524.68, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>individual</p>
        <p className="cv-t f0" style={{ '--x': 98.57, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>school</p>
        <p className="cv-t f0" style={{ '--x': 155.05, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>tour.</p>
        <p className="cv-t f0" style={{ '--x': 196.78, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>This</p>
        <p className="cv-t f0" style={{ '--x': 234.01, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>visit</p>
        <p className="cv-t f0" style={{ '--x': 270.31, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>provides</p>
        <p className="cv-t f0" style={{ '--x': 342.7, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 357.48, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>clear</p>
        <p className="cv-t f0" style={{ '--x': 400.59, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>insight</p>
        <p className="cv-t f0" style={{ '--x': 457.68, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>into</p>
        <p className="cv-t f0" style={{ '--x': 493.21, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>our</p>
        <p className="cv-t f0" style={{ '--x': 524.81, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>child-centered</p>
        <p className="cv-t f0" style={{ '--x': 643.67, '--y': 1550.93, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>approach,</p>
        <p className="cv-t f0" style={{ '--x': 98.57, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>an</p>
        <p className="cv-t f0" style={{ '--x': 124.72, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>opportunity</p>
        <p className="cv-t f0" style={{ '--x': 223.11, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to</p>
        <p className="cv-t f0" style={{ '--x': 246.65, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>meet</p>
        <p className="cv-t f0" style={{ '--x': 293.85, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>our</p>
        <p className="cv-t f0" style={{ '--x': 327.1, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>caring</p>
        <p className="cv-t f0" style={{ '--x': 382.59, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>educators,</p>
        <p className="cv-t f0" style={{ '--x': 471.32, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>and</p>
        <p className="cv-t f0" style={{ '--x': 507.81, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 524.25, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>true</p>
        <p className="cv-t f0" style={{ '--x': 562.68, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>sense</p>
        <p className="cv-t f0" style={{ '--x': 613.93, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>of</p>
        <p className="cv-t f0" style={{ '--x': 637.14, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>the</p>
        <p className="cv-t f0" style={{ '--x': 669.73, '--y': 1577.18, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>loving,</p>
        <p className="cv-t f0" style={{ '--x': 98.57, '--y': 1603.43, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>inspiring community we build every day.</p>
        <p className="cv-t f0" style={{ '--x': 841.96, '--y': 1443.4, '--s': 12.553, '--c': '#7e0e12' } as React.CSSProperties}>Book a visit</p>
        <h2 className="cv-t f6" style={{ '--x': 97.04, '--y': 1796.99, '--s': 37.222, '--c': '#7e0e12' } as React.CSSProperties}>APPLICATION</h2>
        <h2 className="cv-t f6" style={{ '--x': 329.4, '--y': 1796.99, '--s': 37.222, '--c': '#2e2e2e' } as React.CSSProperties}> & INQUIRY</h2>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d', '--ls': -0.006 } as React.CSSProperties}>When</p>
        <p className="cv-t f0" style={{ '--x': 152.72, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>you</p>
        <p className="cv-t f0" style={{ '--x': 187.49, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>feel</p>
        <p className="cv-t f0" style={{ '--x': 221.53, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Sunshine</p>
        <p className="cv-t f0" style={{ '--x': 296.82, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Maple</p>
        <p className="cv-t f0" style={{ '--x': 351, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Bear</p>
        <p className="cv-t f0" style={{ '--x': 392.11, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>International</p>
        <p className="cv-t f0" style={{ '--x': 493.96, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Kindergarten</p>
        <p className="cv-t f0" style={{ '--x': 599.28, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>aligns</p>
        <p className="cv-t f0" style={{ '--x': 649.43, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>with</p>
        <p className="cv-t f0" style={{ '--x': 688.16, '--y': 1860.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>your</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 1886.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>family’s vision, the next step is to register your interest.</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>This</p>
        <p className="cv-t f0" style={{ '--x': 139.44, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>enables</p>
        <p className="cv-t f0" style={{ '--x': 206.28, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>our</p>
        <p className="cv-t f0" style={{ '--x': 239.71, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Admissions</p>
        <p className="cv-t f0" style={{ '--x': 335.13, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Team</p>
        <p className="cv-t f0" style={{ '--x': 386.02, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to</p>
        <p className="cv-t f0" style={{ '--x': 409.73, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>provide</p>
        <p className="cv-t f0" style={{ '--x': 476.37, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>personalized</p>
        <p className="cv-t f0" style={{ '--x': 581.21, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>care,</p>
        <p className="cv-t f0" style={{ '--x': 626.63, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>share</p>
        <p className="cv-t f0" style={{ '--x': 675.71, '--y': 1912.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>timely</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 1938.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>information, and assist you seamlessly throughout the entire admissions journey.</p>
        <h2 className="cv-t f4" style={{ '--x': 117.15, '--y': 1703.35, '--s': 53.91, '--c': '#7e0e12' } as React.CSSProperties}>2</h2>
        <h2 className="cv-t f6" style={{ '--x': 97.04, '--y': 2162.24, '--s': 37.222, '--c': '#2e2e2e' } as React.CSSProperties}>OUR APPROACH TO ASSESSMENT</h2>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d', '--ls': -0.009 } as React.CSSProperties}>We</p>
        <p className="cv-t f0" style={{ '--x': 135.67, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>view</p>
        <p className="cv-t f0" style={{ '--x': 179.53, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>assessment</p>
        <p className="cv-t f0" style={{ '--x': 276.11, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>as</p>
        <p className="cv-t f0" style={{ '--x': 300.74, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 317.78, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>way</p>
        <p className="cv-t f0" style={{ '--x': 357.28, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to</p>
        <p className="cv-t f0" style={{ '--x': 381.43, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>deeply</p>
        <p className="cv-t f0" style={{ '--x': 442.15, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>understand</p>
        <p className="cv-t f0" style={{ '--x': 537.64, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>each</p>
        <p className="cv-t f0" style={{ '--x': 582.96, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>child</p>
        <p className="cv-t f0" style={{ '--x': 628.41, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>as</p>
        <p className="cv-t f0" style={{ '--x': 653.03, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 670.08, '--y': 2225.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>unique</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2251.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>individual.</p>
        <p className="cv-t f0" style={{ '--x': 194.58, '--y': 2251.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Through</p>
        <p className="cv-t f0" style={{ '--x': 276.26, '--y': 2251.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>gentle,</p>
        <p className="cv-t f0" style={{ '--x': 345.55, '--y': 2251.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>play-based</p>
        <p className="cv-t f0" style={{ '--x': 447.11, '--y': 2251.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>observation</p>
        <p className="cv-t f0" style={{ '--x': 553.77, '--y': 2251.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>and</p>
        <p className="cv-t f0" style={{ '--x': 598.95, '--y': 2251.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 624.06, '--y': 2251.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>collaborative</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>conversation</p>
        <p className="cv-t f0" style={{ '--x': 204.46, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>with</p>
        <p className="cv-t f0" style={{ '--x': 242.46, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>parents,</p>
        <p className="cv-t f0" style={{ '--x': 309.46, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>this</p>
        <p className="cv-t f0" style={{ '--x': 341.72, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>pressure-free</p>
        <p className="cv-t f0" style={{ '--x': 449.22, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>experience</p>
        <p className="cv-t f0" style={{ '--x': 539.28, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>allows</p>
        <p className="cv-t f0" style={{ '--x': 591.94, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>us</p>
        <p className="cv-t f0" style={{ '--x': 614.44, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to</p>
        <p className="cv-t f0" style={{ '--x': 635.47, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>learn</p>
        <p className="cv-t f0" style={{ '--x': 678.22, '--y': 2277.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>about</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>your</p>
        <p className="cv-t f0" style={{ '--x': 140.6, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>child’s</p>
        <p className="cv-t f0" style={{ '--x': 195.11, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>milestones</p>
        <p className="cv-t f0" style={{ '--x': 282.84, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>and</p>
        <p className="cv-t f0" style={{ '--x': 317.16, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>school</p>
        <p className="cv-t f0" style={{ '--x': 373.12, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>readiness</p>
        <p className="cv-t f0" style={{ '--x': 451.03, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>in</p>
        <p className="cv-t f0" style={{ '--x': 470.19, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 484.44, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>warm</p>
        <p className="cv-t f0" style={{ '--x': 532.85, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>environment</p>
        <p className="cv-t f0" style={{ '--x': 635.76, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>where</p>
        <p className="cv-t f0" style={{ '--x': 688.82, '--y': 2304.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>they</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2330.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>can naturally shine.</p>
        <h2 className="cv-t f4" style={{ '--x': 117.15, '--y': 2068.6, '--s': 53.91, '--c': '#7e0e12' } as React.CSSProperties}>3</h2>
        <h2 className="cv-t f6" style={{ '--x': 97.04, '--y': 2527.49, '--s': 37.222, '--c': '#3d3d3d' } as React.CSSProperties}>OFFER OF </h2>
        <h2 className="cv-t f6" style={{ '--x': 280.31, '--y': 2527.49, '--s': 37.222, '--c': '#7e0e12' } as React.CSSProperties}>ADMISSION</h2>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2590.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Following the admissions process, families will be promptly</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2616.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>notified of the outcome.</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d', '--ls': -0.006 } as React.CSSProperties}>When</p>
        <p className="cv-t f0" style={{ '--x': 151.71, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>an</p>
        <p className="cv-t f0" style={{ '--x': 175.09, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>offer</p>
        <p className="cv-t f0" style={{ '--x': 216.22, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>of</p>
        <p className="cv-t f0" style={{ '--x': 236.66, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>admission</p>
        <p className="cv-t f0" style={{ '--x': 318.37, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>is</p>
        <p className="cv-t f0" style={{ '--x': 334.79, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>extended,</p>
        <p className="cv-t f0" style={{ '--x': 416.86, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>it</p>
        <p className="cv-t f0" style={{ '--x': 431.54, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>reflects</p>
        <p className="cv-t f0" style={{ '--x': 493.06, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>our</p>
        <p className="cv-t f0" style={{ '--x': 523.54, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>complete</p>
        <p className="cv-t f0" style={{ '--x': 601.45, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>confidence</p>
        <p className="cv-t f0" style={{ '--x': 692.71, '--y': 2643.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>that</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>your</p>
        <p className="cv-t f0" style={{ '--x': 141.3, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>child</p>
        <p className="cv-t f0" style={{ '--x': 184.65, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>will</p>
        <p className="cv-t f0" style={{ '--x': 215.95, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>thrive</p>
        <p className="cv-t f0" style={{ '--x': 265.81, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>within</p>
        <p className="cv-t f0" style={{ '--x': 318.47, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Sunshine</p>
        <p className="cv-t f0" style={{ '--x': 394.05, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Maple</p>
        <p className="cv-t f0" style={{ '--x': 448.52, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Bear's</p>
        <p className="cv-t f0" style={{ '--x': 500.85, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>warm,</p>
        <p className="cv-t f0" style={{ '--x': 554.37, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Canadian</p>
        <p className="cv-t f0" style={{ '--x': 633.37, '--y': 2669.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>educational</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2695.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>environment—growing happily, confidently, and holistically.</p>
        <h2 className="cv-t f4" style={{ '--x': 117.15, '--y': 2433.85, '--s': 53.91, '--c': '#7e0e12' } as React.CSSProperties}>4</h2>
        <h2 className="cv-t f6" style={{ '--x': 97.04, '--y': 2892.74, '--s': 37.222, '--c': '#3d3d3d' } as React.CSSProperties}>JOINING</h2>
        <h2 className="cv-t f6" style={{ '--x': 234.87, '--y': 2892.74, '--s': 37.222, '--c': '#7e0e12' } as React.CSSProperties}> OUR COMMUNITY</h2>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Upon</p>
        <p className="cv-t f0" style={{ '--x': 147.94, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>confirming</p>
        <p className="cv-t f0" style={{ '--x': 236.54, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>enrollment,</p>
        <p className="cv-t f0" style={{ '--x': 328.96, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>your</p>
        <p className="cv-t f0" style={{ '--x': 369.06, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>family</p>
        <p className="cv-t f0" style={{ '--x': 420.68, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>officially</p>
        <p className="cv-t f0" style={{ '--x': 489.89, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>becomes</p>
        <p className="cv-t f0" style={{ '--x': 566.1, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>part</p>
        <p className="cv-t f0" style={{ '--x': 602.27, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>of</p>
        <p className="cv-t f0" style={{ '--x': 623.19, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>the</p>
        <p className="cv-t f0" style={{ '--x': 653.49, '--y': 2955.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Sunshine</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 2982.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>Maple Bear family.</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 3008.33, '--s': 15.382, '--c': '#3d3d3d', '--ls': -0.009 } as React.CSSProperties}>We</p>
        <p className="cv-t f0" style={{ '--x': 135.97, '--y': 3008.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>share</p>
        <p className="cv-t f0" style={{ '--x': 185.78, '--y': 3008.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>thoughtful</p>
        <p className="cv-t f0" style={{ '--x': 274.73, '--y': 3008.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>preparation</p>
        <p className="cv-t f0" style={{ '--x': 372, '--y': 3008.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>guidelines</p>
        <p className="cv-t f0" style={{ '--x': 458.74, '--y': 3008.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>and</p>
        <p className="cv-t f0" style={{ '--x': 496.15, '--y': 3008.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>host</p>
        <p className="cv-t f0" style={{ '--x': 537.9, '--y': 3008.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>orientation</p>
        <p className="cv-t f0" style={{ '--x': 629.37, '--y': 3008.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>activities</p>
        <p className="cv-t f0" style={{ '--x': 705.28, '--y': 3008.33, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>so</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>both</p>
        <p className="cv-t f0" style={{ '--x': 149.74, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>parents</p>
        <p className="cv-t f0" style={{ '--x': 220.58, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>and</p>
        <p className="cv-t f0" style={{ '--x': 262.83, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>children</p>
        <p className="cv-t f0" style={{ '--x': 338.3, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>feel</p>
        <p className="cv-t f0" style={{ '--x': 379.85, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>completely</p>
        <p className="cv-t f0" style={{ '--x': 479.34, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>at</p>
        <p className="cv-t f0" style={{ '--x': 507.37, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>home.</p>
        <p className="cv-t f0" style={{ '--x': 569.14, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>From</p>
        <p className="cv-t f0" style={{ '--x': 623.18, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>day</p>
        <p className="cv-t f0" style={{ '--x': 664.84, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>one</p>
        <p className="cv-t f0" style={{ '--x': 707.33, '--y': 3034.58, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>of</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>confirmation,</p>
        <p className="cv-t f0" style={{ '--x': 211.65, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>our</p>
        <p className="cv-t f0" style={{ '--x': 246.63, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>team</p>
        <p className="cv-t f0" style={{ '--x': 294.96, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>walks</p>
        <p className="cv-t f0" style={{ '--x': 346.32, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>hand-in-hand</p>
        <p className="cv-t f0" style={{ '--x': 459.83, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>with</p>
        <p className="cv-t f0" style={{ '--x': 502.05, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>your</p>
        <p className="cv-t f0" style={{ '--x': 546.17, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>family</p>
        <p className="cv-t f0" style={{ '--x': 601.82, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>to</p>
        <p className="cv-t f0" style={{ '--x': 627.09, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>guarantee</p>
        <p className="cv-t f0" style={{ '--x': 714.12, '--y': 3060.83, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>a</p>
        <p className="cv-t f0" style={{ '--x': 100.39, '--y': 3087.08, '--s': 15.382, '--c': '#3d3d3d' } as React.CSSProperties}>seamless and happy transition for your child.</p>
        <h2 className="cv-t f4" style={{ '--x': 117.15, '--y': 2799.1, '--s': 53.91, '--c': '#7e0e12' } as React.CSSProperties}>5</h2>
        <p className="cv-t f0" style={{ '--x': 811.73, '--y': 2905.67, '--s': 12.553, '--c': '#7e0e12' } as React.CSSProperties}>Register interest</p>
        <h2 className="cv-t f6 cv-ghost" style={{ '--x': 111.97, '--y': 3251.08, '--s': 37.042, '--c': '#000000', '--ls': -0.006 } as React.CSSProperties}>CONTACT US</h2>
        <h2 className="cv-t f6" style={{ '--x': 111.97, '--y': 3251.08, '--s': 37.042, '--c': '#2e2e2e', '--ls': -0.008 } as React.CSSProperties}>CONTACT</h2>
        <h2 className="cv-t f6" style={{ '--x': 287.06, '--y': 3251.08, '--s': 37.042, '--c': '#7e0e12' } as React.CSSProperties}> US</h2>
        <p className="cv-t f3" style={{ '--x': 115.22, '--y': 3314.58, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>If you have any questions, please fill in the form below and</p>
        <p className="cv-t f3" style={{ '--x': 115.22, '--y': 3340.83, '--s': 14.55, '--c': '#3d3d3d' } as React.CSSProperties}>we will get in touch as soon as possible.</p>
        <p className="cv-t f0" style={{ '--x': 298.35, '--y': 3680.17, '--s': 12.553, '--c': '#3d3d3d' } as React.CSSProperties}>Send</p>
        <h2 className="cv-t f6" style={{ '--x': 78.91, '--y': 3881.66, '--s': 57.408, '--c': '#ffffff', 'opacity': 0.46 } as React.CSSProperties}>INTERNATIONAL KINDERGARTEN</h2>
        <h2 className="cv-t f6" style={{ '--x': 72.77, '--y': 3784.65, '--s': 81.225, '--c': '#ffffff' } as React.CSSProperties}>SUNSHINE MAPLE BEAR </h2>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 4104.59, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>S4 Building, Sunshine City, Nam Thang Long</p>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 4124.84, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Urban Area, Phu Thuong Ward, Hanoi, Vietnam</p>
        <p className="cv-t f2" style={{ '--x': 113.51, '--y': 4153.62, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>094 254 6655</p>
        <p className="cv-t f2" style={{ '--x': 112.69, '--y': 4182.09, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>admissions@sunshinemaplebear.edu.vn</p>
        <h3 className="cv-t f6" style={{ '--x': 835.96, '--y': 3995.6, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>About us </h3>
        <h3 className="cv-t f6" style={{ '--x': 816.4, '--y': 4082.61, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>Academics</h3>
        <h3 className="cv-t f6" style={{ '--x': 814.77, '--y': 4039.1, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Admissions</h3>
        <h3 className="cv-t f6" style={{ '--x': 812.13, '--y': 4126.11, '--s': 21.795, '--c': '#ca9c57' } as React.CSSProperties}>Curriculum</h3>
        <h3 className="cv-t f6" style={{ '--x': 884.41, '--y': 4169.71, '--s': 21.795, '--c': '#ca9c57', '--ls': -0.006 } as React.CSSProperties}>New</h3>
        <p className="cv-t f3" style={{ '--x': 78.91, '--y': 4277.59, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>© 2026 SUNSHINE MAPLE BEAR INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.</p>
        <p className="cv-t f3" style={{ '--x': 748.77, '--y': 4277.59, '--s': 14.55, '--c': '#ffffff' } as React.CSSProperties}>Follow us</p>
        <a href="#contact" className="cv-a" aria-label="Book a visit" style={{ '--x': 463.3, '--y': 89.1, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <a href="#contact" className="cv-a" aria-label="Genaral enquiries" style={{ '--x': 575.4, '--y': 89.1, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions/founding-families" className="cv-a" aria-label="Register interest" style={{ '--x': 724.4, '--y': 89.1, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <a href="#contact" className="cv-a" aria-label="Book a visit" style={{ '--x': 828.3, '--y': 1438.3, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <Link href="/admissions/founding-families" className="cv-a" aria-label="Register interest" style={{ '--x': 795, '--y': 2900.5, '--w': 135.2, '--h': 27.6 } as React.CSSProperties} />
        <button type="submit" form="cv-contact" className="cv-a" aria-label="Send" style={{ '--x': 265, '--y': 3675, '--w': 98.2, '--h': 27.6 } as React.CSSProperties} />
        <a href="tel:0942546655" className="cv-a" aria-label="094 254 6655" style={{ '--x': 109.5, '--y': 4150.6, '--w': 98.6, '--h': 25.8 } as React.CSSProperties} />
        <a href="mailto:admissions@sunshinemaplebear.edu.vn" className="cv-a" aria-label="admissions@sunshinemaplebear.edu.vn" style={{ '--x': 108.7, '--y': 4179.1, '--w': 271.1, '--h': 25.8 } as React.CSSProperties} />
        <Link href="/about" className="cv-a" aria-label="About us" style={{ '--x': 832, '--y': 3994.8, '--w': 99, '--h': 28.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Academics" style={{ '--x': 812.4, '--y': 4081.9, '--w': 115.4, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/admissions" className="cv-a" aria-label="Admissions" style={{ '--x': 810.8, '--y': 4038.3, '--w': 119.3, '--h': 28.6 } as React.CSSProperties} />
        <Link href="/academics" className="cv-a" aria-label="Curriculum" style={{ '--x': 808.1, '--y': 4125.4, '--w': 121, '--h': 28.5 } as React.CSSProperties} />
        <Link href="/blog" className="cv-a" aria-label="New" style={{ '--x': 880.4, '--y': 4169, '--w': 49.7, '--h': 28.5 } as React.CSSProperties} />
        <button type="button" onClick={() => setIsMenuOpen(true)} className="cv-a" aria-label="Open menu" style={{ '--x': 925, '--y': 84, '--w': 50, '--h': 38 } as React.CSSProperties} />
        <Link href="/" className="cv-a" aria-label="Sunshine Maple Bear home" style={{ '--x': 0, '--y': 42, '--w': 270, '--h': 120 } as React.CSSProperties} />
        <span id="contact" className="cv-anchor" style={{ '--y': 3228.7 } as React.CSSProperties} />
        <CanvaExactContactForm x={111.91} y={3368.73} pageTitle="CanvaExactAdmissions" />
        </div>
      </main>

      <CanvaExactDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
