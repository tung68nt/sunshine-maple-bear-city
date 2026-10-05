'use client'

import { useEffect, useState } from 'react'

export type SiteLanguage = 'vi' | 'en'

/**
 * The visitor's content language, as stored by the site under `smb_site_lang` and
 * broadcast with the `smbLanguageChange` event. English until the stored value is read.
 */
export function useSiteLanguage(): SiteLanguage {
  const [lang, setLang] = useState<SiteLanguage>('en')
  useEffect(() => {
    const saved = localStorage.getItem('smb_site_lang')
    if (saved === 'vi' || saved === 'en') setLang(saved)
    const onChange = (e: Event) => {
      const next = (e as CustomEvent).detail
      if (next === 'vi' || next === 'en') setLang(next)
    }
    window.addEventListener('smbLanguageChange', onChange)
    return () => window.removeEventListener('smbLanguageChange', onChange)
  }, [])
  return lang
}

/** Picks the text for `lang`, falling back to the other language when one is missing. */
export function pickText(lang: SiteLanguage, vi?: string | null, en?: string | null): string {
  return (lang === 'vi' ? vi || en : en || vi) || ''
}
