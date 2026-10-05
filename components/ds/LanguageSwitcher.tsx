'use client'

import { useEffect, useRef, useState } from 'react'
import { cx } from './cx'
import { Button } from './Button'
import { Icon } from './Icon'

const LANGUAGES = [
  { code: 'vi', name: 'Tiếng Việt', short: 'VI' },
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'ko', name: '한국어', short: 'KO' },
]

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googleTranslateElementInit: any
  }
}

/** Language dropdown backed by Google Translate. `button` picks the trigger style. */
export function LanguageSwitcher({ button }: { button?: 'glass' | 'gold' }) {
  const [current, setCurrent] = useState(LANGUAGES[0])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)')?.[2]
    const found = saved && LANGUAGES.find((l) => l.code === saved.split('/').pop())
    if (found) setCurrent(found)

    if (!document.getElementById('google-translate-script')) {
      if (!document.getElementById('google_translate_element')) {
        const mount = document.createElement('div')
        mount.id = 'google_translate_element'
        mount.style.display = 'none'
        document.body.appendChild(mount)
      }
      window.googleTranslateElementInit = () => {
        if (window.google?.translate) {
          new window.google.translate.TranslateElement(
            { pageLanguage: 'vi', includedLanguages: 'en,vi,ko', autoDisplay: false, multilanguagePage: true },
            'google_translate_element'
          )
        }
      }
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    }

    const outside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [])

  const change = (lang: (typeof LANGUAGES)[number]) => {
    setCurrent(lang)
    setOpen(false)
    const value = `/auto/${lang.code}`
    document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname};`
    document.cookie = `googtrans=${value}; path=/;`
    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo')
    if (combo) {
      combo.value = lang.code
      combo.dispatchEvent(new Event('change'))
    } else {
      window.location.reload()
    }
  }

  const label = (
    <>
      <span className="notranslate">{current.short}</span>
      <Icon name="chevron" size={16} />
    </>
  )

  return (
    <div ref={ref} className={cx('ds-dropdown', open && 'is-open')}>
      {button ? (
        <Button variant={button} onClick={() => setOpen(!open)} aria-label="Chọn ngôn ngữ" aria-expanded={open}>
          {label}
        </Button>
      ) : (
        <button type="button" className="ds-dropdown__toggle" onClick={() => setOpen(!open)} aria-label="Chọn ngôn ngữ" aria-expanded={open}>
          {label}
        </button>
      )}
      {open && (
        <div className="ds-dropdown__menu">
          <div className="ds-dropdown__inner">
            {LANGUAGES.map((lang) => (
              <button key={lang.code} type="button" className="notranslate" aria-current={lang.code === current.code} onClick={() => change(lang)}>
                {lang.name} ({lang.short})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
