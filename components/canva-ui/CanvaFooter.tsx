'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ChevronRight } from 'lucide-react'

export function CanvaFooter() {
  return (
    <footer className="bg-[#2E0A0C] text-white pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Main Title Heading */}
        <div className="text-left mb-12">
          <h2 className="font-canva-heading text-4xl sm:text-6xl lg:text-[4.5rem] tracking-[0.06em] font-normal text-white uppercase leading-[1.08]">
            Sunshine Maple Bear
          </h2>
          <p className="font-canva-heading text-2xl sm:text-4xl lg:text-[3rem] tracking-[0.14em] text-[#A8908B] uppercase font-light mt-1">
            International Kindergarten
          </p>
        </div>

        {/* Content Row: Left Mascot + Contact, Right Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-12">
          {/* Left Column: Mascot + Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-block">
              <Image
                src="/images/canva/bear_mascot.png"
                alt="Maple Bear Canadian School Mascot"
                width={85}
                height={95}
                className="h-20 w-auto object-contain"
              />
            </div>

            <div className="space-y-3 text-white/90 text-xs sm:text-sm font-sans pt-1 max-w-lg">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  S4 Building, Sunshine City, Nam Thang Long Urban Area, Phu Thuong Ward, Hanoi, Vietnam
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="tel:0942546655" className="hover:text-[#C5A059] transition-colors font-medium">
                  094 254 6655
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="mailto:admissions@sunshinemaplebear.edu.vn" className="hover:text-[#C5A059] transition-colors">
                  admissions@sunshinemaplebear.edu.vn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Menu Items in Gold */}
          <div className="lg:col-span-4 flex flex-col lg:items-end justify-start space-y-4">
            <nav className="space-y-3.5 text-left lg:text-right">
              <div className="flex items-center lg:justify-end gap-1.5 group cursor-pointer">
                <Link href="/about" className="font-canva-heading text-2xl sm:text-3xl text-[#C5A059] hover:text-white transition-colors">
                  About us
                </Link>
                <ChevronRight className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="flex items-center lg:justify-end gap-1.5 group cursor-pointer">
                <Link href="/admissions" className="font-canva-heading text-2xl sm:text-3xl text-[#C5A059] hover:text-white transition-colors">
                  Admission
                </Link>
                <ChevronRight className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="flex items-center lg:justify-end gap-1.5 group cursor-pointer">
                <Link href="/academics" className="font-canva-heading text-2xl sm:text-3xl text-[#C5A059] hover:text-white transition-colors">
                  Academic
                </Link>
                <ChevronRight className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="flex items-center lg:justify-end gap-1.5 group cursor-pointer">
                <Link href="/academics/age-groups" className="font-canva-heading text-2xl sm:text-3xl text-[#C5A059] hover:text-white transition-colors">
                  Curriculum
                </Link>
                <ChevronRight className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="flex items-center lg:justify-end gap-1.5 group cursor-pointer">
                <Link href="/blog" className="font-canva-heading text-2xl sm:text-3xl text-[#C5A059] hover:text-white transition-colors">
                  New
                </Link>
                <ChevronRight className="w-4 h-4 text-[#C5A059]" />
              </div>
            </nav>
          </div>
        </div>

        {/* Full-width Gold Thin Divider Line */}
        <div className="w-full h-[1.5px] bg-[#C5A059]/80 mb-6" />

        {/* Bottom Bar: Copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-white/80">
          <div>
            © 2026 SUNSHINE MAPLE BEAR INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium text-white">Follow us</span>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#2E0A0C] hover:bg-[#C5A059] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#2E0A0C] hover:bg-[#C5A059] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#2E0A0C] hover:bg-[#C5A059] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#2E0A0C] hover:bg-[#C5A059] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
