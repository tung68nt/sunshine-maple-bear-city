import type { ReactNode } from 'react'
import { Button } from './Button'
import { Heading } from './Heading'
import { OverlayCard } from './patterns'
import { Reveal } from './Reveal'
import { Text } from './Text'

type Img = { src: string; alt: string }
type Action = { label: string; href: string }

/** <OverlayCard> for a longer letter: the card spans most of the photograph and its copy is set in italics. */
export function OverlayLetter({ image, title, children }: { image: Img; title: string; children: ReactNode }) {
  return (
    <div className="ds-overlay-wide">
      <OverlayCard image={image} title={title}>
        {children}
      </OverlayCard>
    </div>
  )
}

type NumberedPanelsProps = {
  items: {
    title: string
    accent?: string
    /** one entry per paragraph */
    text: string[]
    action?: Action
  }[]
}

/** Numbered sequence: each step is a red rule, a gold number tile and a pale panel with heading, copy and an optional button. */
export function NumberedPanels({ items }: NumberedPanelsProps) {
  return (
    <ol className="ds-panels">
      {items.map((item, i) => (
        <li key={item.title} className="ds-panels__item">
          <div className="ds-wrap">
            <div className="ds-panels__panel">
              <Reveal variant="up" className="ds-panels__n">
                {i + 1}
              </Reveal>
              <div className="ds-panels__head">
                <Heading as="h3" tone="ink" accent={item.accent} accentTone="deep">
                  {item.title}
                </Heading>
                {item.action && (
                  <Reveal className="ds-panels__cta">
                    <Button variant="outline" tone="ink" href={item.action.href}>
                      {item.action.label}
                    </Button>
                  </Reveal>
                )}
              </div>
              <Text className="ds-panels__body">
                {item.text.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Text>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
