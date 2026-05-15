const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'app/academics/early-years', title: 'Early Years (12mo - 3yo)', subtitle: 'Laying the foundation for a lifetime of discovery.' },
  { path: 'app/academics/kindergarten', title: 'Kindergarten (3yo - 5yo)', subtitle: 'Preparing confident, independent learners for Grade 1.' },
  { path: 'app/academics/extracurricular', title: 'Extracurricular Activities', subtitle: 'Enriching experiences beyond the classroom.' },
  { path: 'app/community/parent-portal', title: 'Parent Portal', subtitle: 'Your child\'s learning journey, at your fingertips.' },
  { path: 'app/community/safeguarding', title: 'Safeguarding & Child Protection', subtitle: 'Absolute commitment to the safety and well-being of every child.' },
  { path: 'app/community/health', title: 'Health & Nutrition', subtitle: 'Scientific nutrition and proactive healthcare.' },
  { path: 'app/admissions/tuition-fees', title: 'Tuition Fees & Scholarships', subtitle: 'Transparent pricing for a world-class education.' }
];

const template = (title, subtitle) => `
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'

export default function GenericPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <section className="relative py-24 md:py-32 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={SCHOOL_IMAGES.render.thuVien3}
              alt="${title}"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maple-black to-maple-black/50" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl md:text-6xl font-display font-black text-white leading-tight">
                ${title}
              </h1>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
                ${subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-maple-black prose-p:text-neutral-600 prose-p:font-light">
            <h2>Under Construction</h2>
            <p>We are currently updating our detailed curriculum and community guidelines to reflect the latest Canadian Maple Bear global standards. Please check back soon or contact our admissions office for immediate information.</p>
            
            <div className="bg-neutral-50 p-8 rounded-3xl mt-12 border border-neutral-100">
              <h3 className="mt-0">Have questions?</h3>
              <p className="mb-0">Our admissions team is ready to provide you with all the details you need. Call us at <strong>094 254 6655</strong> or book a campus tour.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
`;

pages.forEach(p => {
  fs.mkdirSync(p.path, { recursive: true });
  fs.writeFileSync(path.join(p.path, 'page.tsx'), template(p.title, p.subtitle));
  console.log('Created:', p.path);
});
