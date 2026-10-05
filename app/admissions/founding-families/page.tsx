import {
  BigFigure,
  Card,
  ContactForm,
  CutoutBand,
  FormBand,
  Grid,
  Heading,
  PageHero,
  PageShell,
  PanelBand,
  Section,
  Stack,
  Text,
} from '@/components/ds'

const PRIVILEGES = [
  { title: 'Enduring commitment', text: 'Privileges maintained throughout continuous enrollment.' },
  { title: 'Priority educational access', text: 'Priority entry to specialized workshops & educational advisory.' },
  { title: 'Distinguished community engagement', text: 'Exclusive invitations to parent networking events.' },
  { title: 'Bespoke founding privileges', text: 'Curated honors announced across school operational phases.' },
]

/** Founding families: content only — every element comes from the design system (design.pdf, page 6). */
export default function FoundingFamiliesPage() {
  return (
    <PageShell hero={<PageHero title="Founding families" image="/images/founding-families/hero.jpg" />}>
      <PanelBand
        tone="cream"
        image={{ src: '/images/founding-families/circle-time.jpg', alt: 'A teacher and a child learning together at the circle-time table' }}
      >
        <BigFigure
          lead={['Become', 'one of our']}
          value="40"
          title="Founding families"
          action={{ label: 'Register interest', href: '#contact' }}
        />
      </PanelBand>

      <CutoutBand image={{ src: '/images/founding-families/child.webp', alt: 'A smiling child holding up both hands' }}>
        <BigFigure lead={['And enjoy', 'an exclusive']} value="30" unit="%" title="Tuition scholarship" align="right" inverse />
      </CutoutBand>

      <Section>
        <Grid cols={4}>
          {PRIVILEGES.map((item, i) => (
            <Card key={item.title} delay={i * 0.3}>
              <Stack>
                <Heading as="h3" size="sm" tone="deep">
                  {item.title}
                </Heading>
                <Text>{item.text}</Text>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Section>

      <FormBand
        id="contact"
        image="/images/founding-families/contact-bg.jpg"
        title="Contact us"
        accent="us"
        intro="If you have any questions, please fill in the form below and we will get in touch as soon as possible."
      >
        <ContactForm source="Founding Families" />
      </FormBand>
    </PageShell>
  )
}
