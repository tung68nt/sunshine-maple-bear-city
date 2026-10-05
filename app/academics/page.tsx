import { Feature, PageHero, PageShell, PanelSplit, PhotoBand, Section, ShowcaseList, SITE, TierCards, Timeline } from '@/components/ds'

/** Academics: content only — every element comes from the design system (design.pdf, page 4). */
export default function AcademicsPage() {
  return (
    <PageShell hero={<PageHero title="Academics" image="/images/academics/hero.jpg" />}>
      <PanelSplit
        title="Overview"
        image={{ src: '/images/academics/overview.jpg', alt: 'A child standing inside the rope climbing tower' }}
        badge={{ src: SITE.mascot, alt: '' }}
      >
        Representing the pinnacle of Canadian education, Maple Bear International Kindergarten curates a premium bilingual early
        learning experience. From exclusive infant Bear Care to our gold-standard Preschool, we unlock your child&apos;s utmost
        cognitive potential. Through elite language immersion within a luxurious, secure environment, we build a solid launchpad for
        tomorrow&apos;s outstanding global citizens.
      </PanelSplit>

      <TierCards
        title="Early Childhood Programs"
        accent="Early Childhood"
        items={[
          { label: '12M - 24M', title: 'Toddler Class', text: 'Sensory discovery, gross motor & emotional bonding.' },
          { label: '2Y - 3Y', title: 'Nursery Class', text: 'Natural English immersion, vocabulary & peer dialogue.' },
          { label: '3Y - 4Y', title: 'Junior Kindergarten', text: 'Jolly Phonics, mathematical logic & science discovery.' },
          { label: '4Y - 5Y', title: 'Senior Kindergarten', text: 'Advanced STEAM projects & Primary School readiness.' },
        ]}
      />

      <PhotoBand anchor="top" image={{ src: '/images/academics/team.jpg', alt: 'The Sunshine Maple Bear team welcoming families at the school entrance' }} />

      <Section flush>
        <Feature
          title="How children learn"
          tone="gold"
          photo={{ src: '/images/academics/learn-teacher.jpg', alt: 'A teacher and a child working together at the circle time wall' }}
          framed={[
            { src: '/images/academics/learn-net.jpg', alt: 'A child playing in the climbing net' },
            { src: '/images/academics/learn-circle.jpg', alt: 'A teacher leading circle time' },
          ]}
        >
          At Maple Bear, children assimilate knowledge organically through unhindered exploration and purposeful play. Honoring each
          child&apos;s unique developmental pace, our immersive pedagogy translates active observation into practical application,
          masterfully cultivating innate curiosity, independent reasoning, and holistic problem-solving skills.
        </Feature>
        <Timeline
          title="Weekly plan"
          image={{ src: '/images/academics/schedule-studio.jpg', alt: 'The dance and movement studio' }}
          action={{ label: 'More', href: '/academics/daily-schedule' }}
          items={[
            { label: '07:30 - 08:30', text: 'Morning Health Check & Welcome Circle' },
            { label: '08:30 - 11:00', text: 'Jolly Phonics & English Immersion Discovery' },
            { label: '11:30 - 14:00', text: '5-Star Organic Lunch & Rest Time' },
            { label: '14:30 - 16:30', text: 'STEAM Activity & Outdoor Sports' },
            { label: '16:30 - 17:30', text: 'Farewell Circle & Parent Handover' },
          ]}
        />
      </Section>

      <ShowcaseList
        title="Nutrition & program meal"
        accent="Nutrition & program meal"
        action={{ label: 'Find out more', href: '/academics/nutrition' }}
        big={{ src: '/images/academics/nutrition-food.jpg', alt: 'Trays of fresh vegetables in the school kitchen' }}
        small={{ src: '/images/academics/nutrition-kitchen.jpg', alt: 'The kitchen team preparing lunch' }}
        items={[
          { kicker: '100% Organic', title: 'Certified Organic Farm', text: 'Daily fresh delivery from accredited organic farms.' },
          { kicker: 'Calorie balanced', title: 'Pediatric Dietitian Menu', text: 'Calorie-balanced meals designed for child growth.' },
          { kicker: 'Hygiene guarantee', title: '5-Star Hygiene Standards', text: '24-hour food sampling & microbiology audits.' },
        ]}
      />
    </PageShell>
  )
}
