'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export function GoogleTranslate() {
  useEffect(() => {
    // Make function available globally
    ;(window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,vi,ko',
          autoDisplay: false,
        },
        'google_translate_element'
      )
    }
  }, [])

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  )
}
