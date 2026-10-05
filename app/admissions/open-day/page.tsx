import { Block, ContactForm, FormBand, Heading, ImageText, Lead, PageHero, PageShell, Rows, Stack } from '@/components/ds'

/** Open Day: content only — every element comes from the design system. */
export default function OpenDayPage() {
  return (
    <PageShell hero={<PageHero title="Open Day" image="/images/admissions/hero.jpg" />}>
      <Lead
        kicker="Special event"
        title="Open Day Event Registration"
        image={{ src: '/images/school_entrance_team.jpg', alt: 'The Sunshine Maple Bear team at the kindergarten entrance' }}
        actions={[{ label: 'Register Now', href: '#contact-us' }]}
      >
        Saturday, 22 August 2026 at Sunshine City Campus, Ciputra, Hanoi.
      </Lead>

      <ImageText
        id="event"
        tone="sand"
        reverse
        kicker="Join us for"
        title="Open Day"
        image={{ src: '/images/admissions/welcome.jpg', alt: 'A welcome at Sunshine Maple Bear' }}
        actions={[{ label: 'Register Now', href: '#contact-us' }]}
      >
        Experience the Maple Bear difference. Meet our teachers, explore our campus and discover our learning environment.
      </ImageText>

      <Block>
        <Stack gap="lg">
          <Heading tone="deep" caps={false}>
            Event details
          </Heading>
          <Rows
            rows={[
              { label: 'Date', value: 'Saturday, 22 August 2026' },
              { label: 'Time', value: '9:00 AM – 12:00 PM' },
              { label: 'Location', value: 'S4 Building, Sunshine City, Nam Thang Long Urban Area, Phu Thuong Ward, Hanoi' },
            ]}
          />
        </Stack>
      </Block>

      <FormBand id="contact-us" image="/images/admissions/contact-bg.jpg" title="Register Now" accent="Now" intro="Saturday, 22 August 2026 · 9:00 AM – 12:00 PM">
        <ContactForm source="Open Day" />
      </FormBand>
    </PageShell>
  )
}
