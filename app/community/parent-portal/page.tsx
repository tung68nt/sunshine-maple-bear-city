import { ImageText, Lead, PageHero, PageShell } from '@/components/ds'

/** Parent Portal: content only — every element comes from the design system. */
export default function ParentPortalPage() {
  return (
    <PageShell hero={<PageHero title="Parent Portal" image="/images/home/why-teacher.jpg" />}>
      <Lead
        kicker="Community portal"
        title="Parent Portal & App"
        image={{ src: '/images/teacher_child_learning.jpg', alt: 'A teacher and a child learning together' }}
      >
        Real-time daily updates, photo sharing, nutrition logs, and direct teacher messaging.
      </Lead>

      <ImageText
        tone="sand"
        reverse
        title="Secure Mobile App for Parents"
        image={{ src: '/images/home/why-circle.jpg', alt: 'Children and their teacher in circle time' }}
      >
        Stay connected with your child&apos;s daily learning journey at Sunshine Maple Bear. Our dedicated mobile application provides
        real-time photo updates, activity reports, and direct communication.
      </ImageText>

      <ImageText
        kicker="Key portal features"
        title="Instant Notifications"
        image={{ src: '/images/organic_kids_meal.jpg', alt: 'A balanced organic meal prepared for the children' }}
      >
        Receive real-time push notifications for school announcements, daily meal updates, photo galleries, and academic progress
        reports.
      </ImageText>
    </PageShell>
  )
}
