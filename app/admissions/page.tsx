import { ContactForm, FormBand, NumberedPanels, OverlayLetter, PageHero, PageShell, Statement } from '@/components/ds'

/** Admissions: content only — every element comes from the design system (design.pdf, page 5). */
export default function AdmissionsPage() {
  return (
    <PageShell hero={<PageHero title="Admissions" image="/images/admissions/hero.jpg" />}>
      <OverlayLetter
        title="A most distinguished welcome"
        image={{ src: '/images/admissions/welcome.jpg', alt: 'Looking up through the rope climbing net' }}
      >
        <p>Welcome to Sunshine Maple Bear International Kindergarten.</p>
        <p>
          Powered by Canada&apos;s world-leading educational methodology, we are proud to offer a safe, loving environment where
          curiosity and holistic growth thrive. In our care, every child is valued as an independent learner, encouraged to explore
          and excel through proven Canadian inquiry-based learning.
        </p>
        <p>
          Understanding that choosing a school is a vital choice, our Admissions Team is committed to walking alongside you with
          transparent, dedicated, and tailored guidance at every stage.
        </p>
        <p>We look forward to welcoming you and partnering with your family to pave the way for your children’s future.</p>
      </OverlayLetter>

      <Statement
        kicker="Navigate"
        title="Admissions Process"
        accent="Process"
        quote="“Below is a clear, step-by-step guide designed to support your family throughout this admissions journey.”"
      />

      <NumberedPanels
        items={[
          {
            title: 'Experience Sunshine Maple Bear',
            accent: 'Sunshine Maple Bear',
            action: { label: 'Book a visit', href: '#contact' },
            text: [
              'Nothing compares to experiencing our school firsthand.',
              'We warmly encourage families to visit us through an Open Day or an individual school tour. This visit provides a clear insight into our child-centered approach, an opportunity to meet our caring educators, and a true sense of the loving, inspiring community we build every day.',
            ],
          },
          {
            title: 'Application & Inquiry',
            accent: 'Application',
            text: [
              'When you feel Sunshine Maple Bear International Kindergarten aligns with your family’s vision, the next step is to register your interest.',
              'This enables our Admissions Team to provide personalized care, share timely information, and assist you seamlessly throughout the entire admissions journey.',
            ],
          },
          {
            title: 'Our approach to assessment',
            text: [
              'We view assessment as a way to deeply understand each child as a unique individual. Through gentle, play-based observation and a collaborative conversation with parents, this pressure-free experience allows us to learn about your child’s milestones and school readiness in a warm environment where they can naturally shine.',
            ],
          },
          {
            title: 'Offer of admission',
            accent: 'admission',
            text: [
              'Following the admissions process, families will be promptly notified of the outcome.',
              "When an offer of admission is extended, it reflects our complete confidence that your child will thrive within Sunshine Maple Bear's warm, Canadian educational environment—growing happily, confidently, and holistically.",
            ],
          },
          {
            title: 'Joining our community',
            accent: 'our community',
            action: { label: 'Register interest', href: '/admissions/founding-families' },
            text: [
              'Upon confirming enrollment, your family officially becomes part of the Sunshine Maple Bear family.',
              'We share thoughtful preparation guidelines and host orientation activities so both parents and children feel completely at home. From day one of confirmation, our team walks hand-in-hand with your family to guarantee a seamless and happy transition for your child.',
            ],
          },
        ]}
      />

      <FormBand
        id="contact"
        image="/images/admissions/contact-bg.jpg"
        title="Contact us"
        accent="us"
        intro="If you have any questions, please fill in the form below and we will get in touch as soon as possible."
      >
        <ContactForm source="Admissions" />
      </FormBand>
    </PageShell>
  )
}
