import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ShieldCheck, Lock, Eye, FileText, ArrowRight, Info } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 bg-maple-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-maple-black via-maple-black/90 to-maple-red/20" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
                <ShieldCheck size={18} className="text-maple-gold" />
                <span className="text-sm font-bold uppercase tracking-widest text-white">Absolute Privacy</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Privacy <span className="text-maple-gold">Policy</span></h1>
              <p className="text-lg text-white/70 font-light leading-relaxed">
                At Sunshine Maple Bear, we are committed to protecting the personal information of parents and students with the highest safety standards.
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
                  <h3 className="text-xl font-bold text-maple-black border-b border-neutral-200 pb-4">Key Content</h3>
                  <ul className="space-y-4 text-sm font-medium text-neutral-500">
                    <li className="flex items-center gap-3 text-maple-red cursor-pointer">
                      <div className="w-1.5 h-1.5 rounded-full bg-maple-red" /> Collection Purpose
                    </li>
                    <li className="flex items-center gap-3 hover:text-maple-red cursor-pointer transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> Scope of Use
                    </li>
                    <li className="flex items-center gap-3 hover:text-maple-red cursor-pointer transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> Security Commitment
                    </li>
                    <li className="flex items-center gap-3 hover:text-maple-red cursor-pointer transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> Client Rights
                    </li>
                  </ul>
                  <div className="pt-6 mt-6 border-t border-neutral-200">
                    <Link href="/terms" className="flex items-center justify-between group">
                      <span className="font-bold text-maple-black group-hover:text-maple-red transition-colors">View Terms of Use</span>
                      <ArrowRight size={18} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-maple-red transition-all" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-8">
                <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-maple-black prose-p:text-neutral-600 prose-p:leading-relaxed prose-li:text-neutral-600">
                  <div className="bg-maple-red/5 p-8 rounded-[32px] border border-maple-red/10 mb-10 flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-maple-red flex-shrink-0 shadow-sm">
                      <Info size={24} />
                    </div>
                    <p className="text-sm text-maple-black font-medium leading-relaxed m-0 pt-1">
                      This privacy policy was last updated on January 1, 2026. We recommend that parents check regularly for the latest changes (if any).
                    </p>
                  </div>

                  <h2>1. Purpose of Information Collection</h2>
                  <p>We collect personal information from parents and students through our website (School Tour Registration, Consultation Registration forms) for the following purposes:</p>
                  <ul>
                    <li>Support, answer questions, and provide the most accurate consultation information about your child\'s learning journey.</li>
                    <li>Arrange school visits and prepare a warm welcome.</li>
                    <li>Send educational newsletters, event announcements, and the latest tuition incentive policies (if parents agree to receive emails).</li>
                    <li>Process enrollment applications when families decide to enroll their child at our school.</li>
                  </ul>

                  <h2>2. Scope of Collection</h2>
                  <p>The information we collect includes, but is not limited to:</p>
                  <ul>
                    <li>Parent information: Full name, Phone number, Email address, Residential address.</li>
                    <li>Student information (if provided): Full name, Date of birth, Interested grade level.</li>
                  </ul>

                  <h2>3. Commitment to Absolute Security</h2>
                  <p>Sunshine Maple Bear values your privacy. We commit to:</p>
                  <ul>
                    <li><strong>Not sell, exchange, or rent</strong> your personal information to any third party for commercial purposes.</li>
                    <li>Store data securely on high-security server systems, with strict access rights limited to authorized personnel.</li>
                    <li>Fully comply with Vietnamese legal regulations on cyber information safety.</li>
                  </ul>

                  <h2>4. Parent Rights</h2>
                  <p>Parents have the full right to:</p>
                  <ul>
                    <li>Request to check, update, adjust, or delete their personal information from our system at any time.</li>
                    <li>Refuse to receive promotional emails and newsletters by clicking the "Unsubscribe" button at the bottom of each email sent from the school.</li>
                  </ul>

                  <div className="mt-12 p-8 bg-neutral-50 rounded-3xl border border-neutral-200">
                    <h4 className="text-xl font-bold text-maple-black mb-4 flex items-center gap-2">
                      <FileText size={24} className="text-neutral-400" />
                      Contact Support
                    </h4>
                    <p className="text-neutral-600 mb-0">
                      If you have any questions about this Privacy Policy, please contact our Customer Service department via Hotline: <strong>094 254 6655</strong> or Email: <strong>tuyensinh@sunshinemaplebear.edu.vn</strong>.
                    </p>
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
