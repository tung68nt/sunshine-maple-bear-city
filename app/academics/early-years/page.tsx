import { Block, CallToAction, Divider, Fact, Grid, ImageText, Lead, PageHero, PageShell, Rows, TextBlock } from '@/components/ds'
import { SCHOOL_IMAGES } from '@/lib/constants'

const pillars = [
  {
    title: 'Sensorimotor Development',
    text: 'Focusing on fine and gross motor skills through purposeful play, kids yoga, and sensory exploration activities.',
  },
  {
    title: 'Early Language Acquisition',
    text: '100% English immersion from day one. Children learn through songs, storytelling, and natural daily interactions.',
  },
  {
    title: 'Social-Emotional Learning',
    text: 'Building trust, independence, and the ability to express emotions in a respectful, nurturing environment.',
  },
  {
    title: 'Creative Expression',
    text: 'Encouraging curiosity through open-ended art, music, and dramatic play designed for the youngest learners.',
  },
]

const schedule = [
  { label: 'Welcome & Sensory Play', value: '08:00 - 08:30', note: 'Transitioning into the school day with calming sensory activities.' },
  { label: 'Circle Time & Music', value: '08:30 - 09:15', note: 'English songs, finger plays, and simple storytelling.' },
  { label: 'Outdoor Exploration', value: '09:15 - 10:00', note: 'Guided play in our safe, impact-absorbing playground.' },
  { label: 'Healthy Snack & Hygiene', value: '10:00 - 10:30', note: 'Learning hand-washing and independent eating habits.' },
  { label: 'Thematic Activities', value: '10:30 - 11:15', note: 'Hands-on learning based on our Canadian curriculum units.' },
]

/** Early Years (12 months – 3 years): content only — every element comes from the design system. */
export default function EarlyYearsPage() {
  return (
    <PageShell
      hero={
        <PageHero
          title="Early Years"
          image={SCHOOL_IMAGES.render.lopHoc2}
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
          ]}
        />
      }
    >
      <Lead
        kicker="Ages 12 Months - 3 Years"
        title="Laying the Foundation of Early Discovery"
        accent="Foundation"
        image={{ src: SCHOOL_IMAGES.render.lopHoc2, alt: 'Early Years Classroom' }}
      >
        In our Early Years program, we create a &quot;home away from home&quot; where toddlers feel safe to explore, communicate, and
        grow in a 100% English environment.
      </Lead>

      <ImageText
        tone="sand"
        title="Where Every Step is a Milestone"
        accent="Step"
        image={{ src: SCHOOL_IMAGES.render.lopHoc5, alt: 'Creative Play' }}
      >
        The Maple Bear Early Years curriculum is specifically designed for the critical window of brain development between 12 months
        and 3 years. We focus on the &quot;whole child,&quot; ensuring that physical care and emotional security are the bedrock for
        cognitive and language learning.
      </ImageText>

      <Block>
        <Grid cols={4}>
          {pillars.map((pillar, i) => (
            <Fact key={pillar.title} title={pillar.title} text={pillar.text} delay={i * 0.15} />
          ))}
        </Grid>
      </Block>

      <Divider />

      <TextBlock title="A Day in the Life">
        Predictable routines create a sense of security and help young children thrive.
      </TextBlock>
      <Block>
        <Rows rows={schedule} />
      </Block>

      <ImageText
        reverse
        tone="sand"
        kicker="Language Leadership"
        title="True English Immersion"
        accent="Immersion"
        image={{ src: SCHOOL_IMAGES.render.thuVien5, alt: 'English immersion' }}
      >
        <p>
          At Sunshine Maple Bear, English isn&apos;t a subject—it&apos;s the language of our world. Toddlers acquire English naturally
          through immersion, the same way they learn their first language.
        </p>
        <ul>
          <li>Natural language acquisition</li>
          <li>Native-speaking environments</li>
          <li>Focus on listening &amp; comprehension</li>
          <li>Visual &amp; musical learning cues</li>
        </ul>
      </ImageText>

      <CallToAction
        title="Ready to start the journey?"
        text="Join our next open day to see our Early Years classroom in action."
        actions={[
          { label: 'Enroll Now', href: '/admissions' },
          { label: 'Contact Us', href: '/contact' },
        ]}
      />
    </PageShell>
  )
}
