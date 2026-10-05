import { forwardRef } from 'react'
import Link from 'next/link'
import { cx } from './cx'
import { Icon, SocialIcon } from './Icon'
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from './site'

/**
 * Site footer. With `reveal` it sits fixed beneath the page and is uncovered as
 * `main` scrolls away (PageShell wires the spacing); without it, it flows normally.
 */
export const SiteFooter = forwardRef<HTMLElement, { reveal?: boolean }>(function SiteFooter({ reveal }, ref) {
  return (
    <footer ref={ref} className={cx('ds-footer', reveal && 'ds-footer--reveal')}>
      <div className="ds-wrap">
        <div className="ds-footer__name notranslate">
          <strong>{SITE.name}</strong>
          <span>{SITE.descriptor}</span>
        </div>
        <div className="ds-footer__mid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.mascot} alt="Maple Bear" className="ds-footer__logo" loading="lazy" />
            <address className="ds-footer__contact">
              <div>
                <Icon name="pin" />
                <span>
                  {SITE.address[0]}
                  <br />
                  {SITE.address[1]}
                </span>
              </div>
              <a href={SITE.phoneHref} className="notranslate">
                <Icon name="phone" />
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`}>
                <Icon name="mail" />
                {SITE.email}
              </a>
            </address>
          </div>
          <nav className="ds-footer__links" aria-label="Footer">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.label} href={l.href}>
                {l.label}
                <Icon name="chevronDown" strokeWidth={1.5} />
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="ds-footer__bottom">
        <div>{SITE.copyright}</div>
        <div className="ds-footer__social">
          <span>Follow us</span>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <SocialIcon name={s.name} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
})
