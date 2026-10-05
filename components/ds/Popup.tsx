'use client'

import { useEffect, type ReactNode } from 'react'
import { Button } from './Button'
import { Heading } from './Heading'
import { Icon } from './Icon'

type PopupProps = {
  image?: { src: string; alt: string }
  kicker?: string
  title: string
  accent?: string
  children: ReactNode
  action: { label: string; href: string }
  dismissLabel?: string
  onClose: () => void
}

/**
 * Promotional dialog: photograph on the left, offer on the right. Mounts its own `.ds`
 * scope so it can be used from the root layout; closes on Esc, the backdrop or either button.
 */
export function Popup({ image, kicker, title, accent, children, action, dismissLabel, onClose }: PopupProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="ds ds--overlay">
      <div className="ds-popup" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
        <div className="ds-popup__card" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="ds-popup__close" aria-label="Close" onClick={onClose}>
            <Icon name="close" size={18} strokeWidth={1.5} />
          </button>
          {image && (
            <div className="ds-popup__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} />
            </div>
          )}
          <div className="ds-popup__body">
            {kicker && <div className="ds-popup__kicker">{kicker}</div>}
            <Heading size="lg" tone="deep" accent={accent} accentTone="gold" className="ds-popup__title">
              {title}
            </Heading>
            <div className="ds-text ds-popup__text">{children}</div>
            <div className="ds-popup__actions">
              <Button variant="solid" block href={action.href} onClick={onClose}>
                {action.label}
              </Button>
              {dismissLabel && (
                <button type="button" className="ds-popup__dismiss" onClick={onClose}>
                  {dismissLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
