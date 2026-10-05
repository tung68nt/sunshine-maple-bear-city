import {
  Button,
  Grid,
  Heading,
  Highlights,
  Media,
  PageHero,
  PageShell,
  PanelBand,
  QuoteCollage,
  Reveal,
  Rule,
  Section,
  SITE,
  Stack,
  StatCollage,
  Text,
} from '@/components/ds'

/** About us: content only — every element comes from the design system (design.pdf, page 3). */
export default function AboutPage() {
  return (
    <PageShell hero={<PageHero title="About us" image="/images/about/hero.jpg" />}>
      <PanelBand
        kicker="Introduction"
        title="Sunshine Maple Bear"
        subtitle="International Kindergarten"
        image={{ src: '/images/about/intro-lobby.jpg', alt: 'The Sunshine Maple Bear lift lobby with its animal murals' }}
        badge={{ src: SITE.logo, alt: '' }}
      >
        <Text tone="white">
          <p>
            Maple Bear schools offer full Canadian programs utilizing Canadian methodology and curriculum developed by our own experts
            from the ground up for preschool, elementary, and high school.
          </p>
          <p>
            We take our responsibility to our students and their parents very seriously. Strict quality controls ensure we deliver the
            very best Canadian practices in education.
          </p>
        </Text>
      </PanelBand>

      <QuoteCollage
        images={[
          { src: '/images/about/quote-net.jpg', alt: 'A boy smiling inside the rope climbing tower' },
          { src: '/images/about/quote-drawing.jpg', alt: 'Children drawing at a classroom table' },
          { src: '/images/about/quote-play.jpg', alt: 'Children laughing with a teacher on the playroom floor' },
        ]}
        action={{ label: 'More', href: '/academics' }}
      >
        “Our goal is to deliver a student-focused learning system in a safe, secure and stimulating environment that prepares students
        for success at a post secondary level and that instills a passion for lifelong learning. The Maple Bear Program is designed to
        educate the whole child - physically, intellectually, emotionally, and socially.”
      </QuoteCollage>

      <StatCollage
        title="Key figures"
        items={[
          { value: '500+', label: 'Global schools', image: { src: '/images/about/figures-1.jpg', alt: 'Guests talking at a reception' } },
          { value: '37+', label: 'Countries worldwide', image: { src: '/images/about/figures-2.jpg', alt: 'A galleried atrium' } },
          {
            value: '100%',
            label: 'English immersion',
            image: { src: '/images/about/figures-3.jpg', alt: 'A door being opened in welcome' },
            framed: true,
          },
          { value: '100%', label: 'Native OCT educators', image: { src: '/images/about/figures-4.jpg', alt: 'A table being laid with care' } },
        ]}
      />

      <Highlights
        image="/images/about/special-bg.jpg"
        title="What makes us special"
        accent="special"
        items={[
          {
            icon: 'cap',
            title: 'Authentic Canadian Curriculum',
            text: 'Authentic Canadian Early Childhood Curriculum designed by leading global educational experts.',
            action: { label: 'More', href: '/academics' },
          },
          {
            icon: 'globe',
            title: '100% English Immersion',
            text: '100% English Immersion environment developing natural bilingual fluency without translation pressure.',
            action: { label: 'More', href: '/academics' },
          },
          {
            icon: 'star',
            title: '5-Star Modern Campus',
            text: '5-Star Modern Campus Facilities located inside Sunshine City urban complex.',
            action: { label: 'More', href: '/academics' },
          },
        ]}
      />

      <Section>
        <Grid cols={2}>
          <Stack>
            <Heading tone="ink" accent="invitation">
              Our invitation
            </Heading>
            <Rule />
            <Text variant="quote">
              <p>
                At Sunshine Maple Bear International Kindergarten, pupils grow into confident learners, compassionate friends and
                thoughtful young leaders.
              </p>
              <p>Together with families, we prepare pupils to flourish at school, in life and in the world beyond.</p>
            </Text>
            <Reveal>
              <Button variant="outline" tone="ink" href="/admissions#contact">
                Book a visit
              </Button>
            </Reveal>
          </Stack>
          <Media
            src="/images/about/invitation-team.jpg"
            alt="The Sunshine Maple Bear team in front of the kindergarten entrance on opening day"
            ratio="landscape"
          />
        </Grid>
      </Section>
    </PageShell>
  )
}
