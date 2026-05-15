import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Scale, FileSignature, AlertCircle, ArrowRight, Info } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 bg-maple-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-maple-black via-maple-black/90 to-maple-gold/20" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
                <Scale size={18} className="text-maple-gold" />
                <span className="text-sm font-bold uppercase tracking-widest text-white">General Agreement</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Terms of <span className="text-maple-gold">Use</span></h1>
              <p className="text-lg text-white/70 font-light leading-relaxed">
                Please read the following terms carefully before using the website and services of Sunshine Maple Bear.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Sidebar */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="sticky top-24 p-8 bg-neutral-50 rounded-[32px] border border-neutral-100 space-y-6">
                  <h3 className="text-xl font-bold text-maple-black border-b border-neutral-200 pb-4">Current Regulations</h3>
                  <ul className="space-y-4 text-sm font-medium text-neutral-500">
                    <li className="flex items-center gap-3 text-maple-gold cursor-pointer">
                      <div className="w-1.5 h-1.5 rounded-full bg-maple-gold" /> Intellectual Property
                    </li>
                    <li className="flex items-center gap-3 hover:text-maple-gold cursor-pointer transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> User Conduct
                    </li>
                    <li className="flex items-center gap-3 hover:text-maple-gold cursor-pointer transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> Disclaimer
                    </li>
                    <li className="flex items-center gap-3 hover:text-maple-gold cursor-pointer transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> Third-party Links
                    </li>
                  </ul>
                  <div className="pt-6 mt-6 border-t border-neutral-200">
                    <Link href="/privacy" className="flex items-center justify-between group">
                      <span className="font-bold text-maple-black group-hover:text-maple-gold transition-colors">View Privacy Policy</span>
                      <ArrowRight size={18} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-maple-gold transition-all" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-8">
                <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-maple-black prose-p:text-neutral-600 prose-p:leading-relaxed prose-li:text-neutral-600">
                  <div className="bg-maple-gold/10 p-8 rounded-[32px] border border-maple-gold/20 mb-10 flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-maple-gold flex-shrink-0 shadow-sm">
                      <Info size={24} />
                    </div>
                    <p className="text-sm text-maple-black font-medium leading-relaxed m-0 pt-1">
                      By accessing and using this website, you agree to comply with and be bound by the Terms and Conditions below. If you do not agree, please stop using the service.
                    </p>
                  </div>

                  <h2>1. Intellectual Property Rights</h2>
                  <p>All content on the website, including but not limited to: text, graphic design, images, logos, videos, and source code, are the legal property of the Sunshine Maple Bear system and are protected by Vietnamese Intellectual Property law as well as international treaties.</p>
                  <ul>
                    <li>Any act of copying, distributing, publishing, or reusing content for commercial purposes without written consent from the School Management is strictly prohibited.</li>
                    <li>The "Maple Bear" brand and the Maple Bear logo are globally registered trademarks.</li>
                  </ul>

                  <h2>2. Use of Website</h2>
                  <p>You agree to use the website for lawful purposes and NOT to perform the following acts:</p>
                  <ul>
                    <li>Spread malicious code, viruses, or carry out cyber attacks (DDoS) that obstruct server operations.</li>
                    <li>Use information on the website to defame, slander, or adversely affect the school\'s reputation.</li>
                    <li>Unauthorized access to parent and student data storage systems.</li>
                  </ul>

                  <h2>3. Disclaimer</h2>
                  <p>We make every effort to provide the most accurate and complete information on the website. However:</p>
                  <ul>
                    <li>Sunshine Maple Bear does not absolutely guarantee that all information (such as tuition, class schedules, teachers) on the website at any given time is completely free of objective errors.</li>
                    <li>Information on admission policies and curriculum is subject to adjustment and change without prior notice, in accordance with the educational direction of each school year.</li>
                  </ul>

                  <h2>4. Links to Third Parties</h2>
                  <p>The website may contain links to the websites of partners or affiliated educational organizations (e.g., Maple Bear Global Schools). Providing these links is for the convenience of parents. However, we do not control and are not legally responsible for the content or privacy policies of these external websites.</p>

                  <div className="mt-12 p-8 bg-neutral-50 rounded-3xl border border-neutral-200 flex items-start gap-4">
                    <div className="mt-1">
                      <AlertCircle size={24} className="text-neutral-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-maple-black mb-2 mt-0">Effectiveness and Amendments</h4>
                      <p className="text-neutral-600 mb-0 text-sm">
                        These Terms of Use are effective from the time they are publicly posted. Sunshine Maple Bear reserves the right to amend or supplement the terms at any time to comply with the law and the school\'s practical activities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
