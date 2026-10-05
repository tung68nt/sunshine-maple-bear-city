import {
  Carousel,
  ContactForm,
  Feature,
  FormBand,
  Hero,
  MAPLE_BEAR_COUNTRY_COUNT,
  MegaBand,
  Network,
  OverlayCard,
  PageShell,
  Portrait,
  Section,
  Showcase,
  Split,
  Stat,
  Statement,
  Steps,
} from '@/components/ds'

/** Home page: content only — every element comes from the design system (design.pdf, page 1). */
export default function Home() {
  return (
    <PageShell
      variant="home"
      hero={
        <Hero
          title="Sunshine Maple Bear"
          subtitle="International Kindergarten"
          video="/videos/hero-bg.mp4"
          poster="/videos/hero-bg-poster.jpg"
          cta={{ label: 'ABOUT US', href: '/about' }}
          footer={
            <>
              <Stat value="15+" label="Years of excellence" />
              <Stat value="580+" label="Years of excellence" />
              <Stat value="18m" label="Authentic Canadian curriculum" />
              <Stat value="100%" label="Authentic Canadian curriculum" />
            </>
          }
        />
      }
    >
      <OverlayCard image={{ src: '/images/home/intro.jpg', alt: 'The Sunshine Maple Bear library and play area' }} title="Introduction">
        Sunshine Maple Bear Hanoi offers an authentic 100% Canadian English immersion environment designed to cultivate creativity,
        compassion, and global confidence inside Sunshine City.
      </OverlayCard>

      <Statement
        kicker="Our promise"
        title="Safe. Nurturing. Inspiring"
        accent="Inspiring"
        quote="“A place where children are protected, supported and empowered to grow.”"
      />

      <Split
        kicker="Ms Jennifer"
        title="Message from Head of School"
        media={
          <Portrait
            image={{ src: '/images/home/jennifer.jpg', alt: 'Ms Jennifer, Head of School' }}
            video={{ src: '/videos/head-of-school.mp4', poster: '/videos/head-of-school-poster.jpg', label: 'Watch the welcome message' }}
          />
        }
      >
        “Children thrive when high expectations are matched by warmth, consistency and genuine care. My responsibility as a school
        leader is to build an environment where every child is known, every educator is empowered and every family is a trusted
        partner.”
      </Split>

      <Section flush>
        <Feature
          title="Why families choose Maple Bear"
          accent="Maple Bear"
          photo={{ src: '/images/home/why-teacher.jpg', alt: 'A teacher guiding a child at the learning wall' }}
          framed={[
            { src: '/images/home/why-net.jpg', alt: 'A child playing in the climbing net' },
            { src: '/images/home/why-circle.jpg', alt: 'Circle time with a teacher' },
          ]}
        >
          At Sunshine Maple Bear International Kindergarten, every day is designed to inspire curiosity, build confidence and nurture a
          lifelong love of learning. Through the Maple Bear Canadian Curriculum, caring educators and a safe, engaging environment,
          children are supported to grow academically, socially and emotionally.
        </Feature>
        <Steps
          initial={3}
          items={[
            { title: 'Official Canadian Curriculum', image: { src: '/images/canadian_curriculum_kids.jpg', alt: 'Children learning with the Canadian curriculum' } },
            { title: 'Caring International Educators', image: { src: '/images/teacher_child_learning.jpg', alt: 'A teacher learning alongside a child' } },
            { title: 'Safe & Engaging Campus', image: { src: '/images/home/fac-classroom.jpg', alt: 'A Sunshine Maple Bear classroom' } },
            { title: 'Holistic Growth', image: { src: '/images/home/pillar-studio.jpg', alt: 'The dance and movement studio' } },
          ]}
        />
      </Section>

      <Showcase
        title="A Canadian Curriculum"
        accent="A Canadian"
        action={{ label: 'Find out more', href: '/academics' }}
        big={{ src: '/images/home/curriculum-library.jpg', alt: 'The reading and play area' }}
        small={{ src: '/images/home/curriculum-kids.jpg', alt: 'Children learning expressions with their teacher' }}
        items={[
          { icon: 'globe', title: 'Language & Literacy', text: 'Bilingual immersion & storytelling' },
          { icon: 'bulb', title: 'Creative Arts', text: 'Music, drama & visual expression' },
          { icon: 'mind', title: 'Math & Logic', text: 'Hands-on problem solving' },
          { icon: 'atom', title: 'Science & Discovery', text: 'Curiosity-driven exploration' },
        ]}
      />

      <MegaBand title="Campus & Facilities" script="Overview">
        <Carousel
          items={[
            { title: 'Dance studio', src: '/images/home/fac-dance.jpg', alt: 'Dance studio', href: '/gallery' },
            { title: 'Classroom', src: '/images/home/fac-classroom.jpg', alt: 'Classroom', href: '/gallery' },
            { title: 'Library', src: '/images/home/fac-library.jpg', alt: 'Library', href: '/gallery' },
            { title: 'Reception', src: '/images/home/fac-reception.jpg', alt: 'Reception', href: '/gallery' },
          ]}
        />
      </MegaBand>

      <Network
        stats={[
          { value: '15+', label: 'Years of excellence' },
          { value: '500+', label: 'Schools in operation' },
          { value: '70,000+', label: 'Students enrolled' },
          { value: String(MAPLE_BEAR_COUNTRY_COUNT), label: 'Countries' },
        ]}
        title="Maple Bear around the world"
        accent="Maple Bear"
        text={`Maple Bear is part of a global network of schools in ${MAPLE_BEAR_COUNTRY_COUNT} countries, sharing a commitment to educational excellence.`}
        action={{ label: 'Find out more', href: '/about' }}
      />

      <FormBand
        id="apply"
        image="/images/home/contact-bg.jpg"
        title="Contact us"
        accent="us"
        intro="If you have any questions, please fill in the form below and we will get in touch as soon as possible."
      >
        <ContactForm />
      </FormBand>
    </PageShell>
  )
}
