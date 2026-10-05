import { Block, CallToAction, Divider, Fact, Grid, ImageText, Lead, PageHero, PageShell, StickySteps } from '@/components/ds'
import { SCHOOL_IMAGES } from '@/lib/constants'

const learningAreas = [
  {
    title: 'Literacy & Phonics',
    text: 'Using the Canadian Jolly Phonics method to build strong foundations in reading, writing, and verbal expression in English.',
  },
  {
    title: 'Early Mathematics',
    text: 'Developing logical thinking and number sense through hands-on activities, sorting, and pattern recognition.',
  },
  {
    title: 'Science & Discovery',
    text: 'Nurturing curiosity through experimentation, observation, and exploration of the natural world.',
  },
  {
    title: 'Primary Readiness',
    text: 'Preparing children for the transition to primary school with focus on independence, focus, and social skills.',
  },
]

const highlights = [
  { title: 'STEAM Integration', text: 'Science, Technology, Engineering, Arts, and Mathematics integrated into thematic units.' },
  { title: 'Global Citizenship', text: 'Developing awareness of diverse cultures and environmental responsibility.' },
  { title: 'Project-Based Learning', text: 'In-depth exploration of topics that matter to children, fostering deep engagement.' },
]

/** Kindergarten (3 – 5 years): content only — every element comes from the design system. */
export default function KindergartenPage() {
  return (
    <PageShell
      hero={
        <PageHero
          title="Kindergarten"
          image={SCHOOL_IMAGES.render.lopHoc1}
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
          ]}
        />
      }
    >
      <Lead
        kicker="Ages 3 Years - 5 Years"
        title="Empowering Confident Global Learners"
        accent="Confident"
        image={{ src: SCHOOL_IMAGES.render.lopHoc1, alt: 'Kindergarten Classroom' }}
      >
        Our Kindergarten program bridges the gap between play and structured learning, preparing children for international primary
        success.
      </Lead>

      <ImageText
        reverse
        tone="sand"
        title="A Curriculum that Inspires Inquiry"
        accent="Inspires"
        image={{ src: SCHOOL_IMAGES.render.thuVien3, alt: 'Academic Excellence' }}
      >
        In the Kindergarten years, children transition to more complex cognitive tasks. The Maple Bear curriculum uses an inquiry-based
        approach where children are encouraged to ask &quot;why&quot; and &quot;how,&quot; developing critical thinking skills that
        last a lifetime.
      </ImageText>

      <Block>
        <Grid cols={4}>
          {learningAreas.map((area, i) => (
            <Fact key={area.title} title={area.title} text={area.text} delay={i * 0.15} />
          ))}
        </Grid>
      </Block>

      <Divider />

      <StickySteps
        title="Program Highlights"
        intro="Unique advantages of the Maple Bear Kindergarten experience."
        steps={highlights}
      />

      <CallToAction
        title="Ready for the International Stage"
        text="Our graduates are confidently bilingual, socially adept, and academically prepared for the most rigorous international primary schools in Vietnam and abroad."
        actions={[
          { label: 'Request a Consultation', href: '/admissions' },
          { label: 'Book a Tour', href: '/tour-booking' },
        ]}
      />
    </PageShell>
  )
}
