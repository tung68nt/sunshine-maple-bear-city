'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export function LanguageSwitcher({ isLight }: { isLight?: boolean }) {
  const [currentLang, setCurrentLang] = useState('en')
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', label: 'English', flag: '🇬🇧' }
  ]

  useEffect(() => {
    const saved = localStorage.getItem('smb_site_lang') || 'en'
    setCurrentLang(saved)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    setIsOpen(false)
    localStorage.setItem('smb_site_lang', langCode)
    window.dispatchEvent(new CustomEvent('smbLanguageChange', { detail: langCode }))
  }

  const activeLang = languages.find(l => l.code === currentLang) || languages[1]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold transition-all rounded-full border border-neutral-200/80 bg-white/90 hover:bg-white hover:border-[#9E1B1E] text-[#332C2B] shadow-2xs active:scale-95"
        aria-label="Select Language"
      >
        <span className="uppercase font-sans font-bold flex items-center gap-1">
          <span className="text-sm">{activeLang.flag}</span>
          <span className="text-[11px] font-extrabold tracking-wider">{activeLang.code.toUpperCase()}</span>
        </span>
        <ChevronDown size={12} className={`text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#9E1B1E]' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-neutral-200/80 shadow-xl rounded-2xl p-1.5 w-36 z-50 animate-fade-in space-y-0.5">
          {languages.map((lang) => {
            const isSelected = currentLang === lang.code
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-sans rounded-xl transition-all font-semibold ${
                  isSelected
                    ? 'bg-[#9E1B1E] text-white shadow-xs'
                    : 'text-[#332C2B] hover:bg-red-50/60 hover:text-[#9E1B1E]'
                }`}
              >
                <span className="text-sm">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
