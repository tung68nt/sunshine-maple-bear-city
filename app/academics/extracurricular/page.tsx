import { Block, CallToAction, Fact, Grid, Heading, ImageText, Lead, PageHero, PageShell, Stack } from '@/components/ds'
import { SCHOOL_IMAGES } from '@/lib/constants'

const clubs = [
  {
    title: 'Music & Movement',
    text: 'Developing rhythm, auditory skills, and self-confidence through piano, choir, and creative dance.',
    image: SCHOOL_IMAGES.render.phongChucNang1,
  },
  {
    title: 'Visual Arts & Crafts',
    text: 'Exploring diverse media from watercolor to clay, fostering fine motor skills and unlimited creativity.',
    image: SCHOOL_IMAGES.render.lopHoc3,
  },
  {
    title: 'Little Olympians',
    text: 'Developing physical fitness, coordination, and team spirit through soccer, swimming, and mini-athletics.',
    image: SCHOOL_IMAGES.render.hanhLang2,
  },
  {
    title: 'Early Coding & Robotics',
    text: 'Introducing logical thinking and problem-solving through age-appropriate digital tools and building sets.',
    image: SCHOOL_IMAGES.render.lopHoc5,
  },
]

const benefits = [
  { title: 'English Mastery', text: 'Practical language use.' },
  { title: 'Social Skills', text: 'New friendships.' },
  { title: 'Talent Discovery', text: 'Find your spark.' },
]

/** Extracurricular clubs: content only — every element comes from the design system. */
export default function ExtracurricularPage() {
  return (
    <PageShell
      hero={
        <PageHero
          title="Extracurricular"
          image={SCHOOL_IMAGES.render.phongChucNang1}
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
          ]}
        />
      }
    >
      <Lead
        kicker="Beyond the Classroom"
        title="Holistic Growth Through Exploration"
        accent="Exploration"
        image={{ src: SCHOOL_IMAGES.render.phongChucNang1, alt: 'Extracurricular Activities' }}
      >
        <p>
          Our enrichment programs are designed to spark curiosity and develop talents in a fun, supportive international environment.
        </p>
        <p>
          At Sunshine Maple Bear, we believe that education extends far beyond traditional lessons. Our after-school and weekend
          enrichment clubs provide students with the opportunity to explore new interests, build deep friendships, and develop
          leadership skills in a 100% English setting.
        </p>
      </Lead>

      {clubs.map((club, i) => (
        <ImageText
          key={club.title}
          reverse={i % 2 === 1}
          tone={i % 2 === 0 ? 'sand' : 'cream'}
          title={club.title}
          image={{ src: club.image, alt: club.title }}
          actions={[{ label: 'Join this Club', href: '/contact', variant: 'soft' }]}
        >
          {club.text}
        </ImageText>
      ))}

      <Block tone="sand">
        <Stack gap="lg">
          <Heading tone="deep" caps={false}>
            Why Join Our Clubs?
          </Heading>
          <Grid cols={3}>
            {benefits.map((benefit, i) => (
              <Fact key={benefit.title} title={benefit.title} text={benefit.text} delay={i * 0.15} />
            ))}
          </Grid>
        </Stack>
      </Block>

      <CallToAction title="Discover Your Passions" actions={[{ label: 'Inquire for Schedule', href: '/contact' }]} />
    </PageShell>
  )
}
