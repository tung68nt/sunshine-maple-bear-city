'use client'

import { useState, useEffect } from 'react'
import { Globe, Loader2, ChevronDown } from 'lucide-react'

export function LanguageSwitcher({ isLight }: { isLight?: boolean }) {
  const [isTranslating, setIsTranslating] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' }
  ]

  useEffect(() => {
    // Check if there's an existing translation cookie on mount
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/)
    if (match) {
      const parts = match[2].split('/')
      const code = parts[parts.length - 1]
      if (code && languages.find(l => l.code === code)) {
        setCurrentLang(code)
      }
    }
  }, [])

  const handleLanguageChange = (langCode: string) => {
    if (langCode === currentLang) {
      setIsOpen(false)
      return
    }

    setIsTranslating(true)
    setIsOpen(false)
    setCurrentLang(langCode)

    // Using Google Translate hidden combo
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement
    
    if (selectElement) {
      selectElement.value = langCode
      selectElement.dispatchEvent(new Event('change'))
    } else {
      // Fallback: set cookie and reload
      document.cookie = `googtrans=/en/${langCode}; path=/`
      document.cookie = `googtrans=/en/${langCode}; domain=.${window.location.hostname}; path=/`
      window.location.reload()
    }

    // Hide loader after a reasonable time for translation to complete
    setTimeout(() => {
      setIsTranslating(false)
    }, 1500)
  }

  const activeLang = languages.find(l => l.code === currentLang) || languages[0]

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-colors rounded-full border ${
            isLight
              ? 'text-maple-black hover:bg-neutral-100 border-neutral-200'
              : 'text-white hover:bg-white/10 border-white/20'
          }`}
          aria-label="Select Language"
        >
          <Globe size={16} />
          <span className="uppercase">{activeLang.code}</span>
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden w-40 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors ${
                  currentLang === lang.code
                    ? 'bg-maple-red/10 text-maple-red'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-maple-red'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full screen loader when translating */}
      {isTranslating && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <Loader2 className="w-12 h-12 text-maple-red animate-spin mb-4" />
          <p className="text-maple-black font-bold text-lg animate-pulse">
            {currentLang === 'vi' ? 'Đang dịch ngôn ngữ...' : 
             currentLang === 'ko' ? '언어를 번역 중입니다...' : 
             'Translating language...'}
          </p>
        </div>
      )}
    </>
  )
}
