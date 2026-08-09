'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export function LanguageSwitcher({ isLight }: { isLight?: boolean }) {
  const [currentLang, setCurrentLang] = useState('en')
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' }
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

  const activeLang = languages.find(l => l.code === currentLang) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-display font-bold transition-colors rounded border ${
          isLight
            ? 'text-[#1D1D1B] hover:bg-neutral-100 border-neutral-300'
            : 'text-white hover:bg-white/10 border-white/20'
        }`}
        aria-label="Select Language"
      >
        <span className="uppercase font-mono flex items-center gap-1">{activeLang.flag} {activeLang.code}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-neutral-200 shadow-xl p-1 w-36 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold transition-colors ${
                currentLang === lang.code
                  ? 'bg-[#1D1D1B] text-white'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-maple-red'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
