'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckCircle2, Award, Users, Target, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-[var(--color-dark)]">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={SCHOOL_IMAGES.render.hanhLang1}
              alt="About Sunshine Maple Bear"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 to-[var(--color-dark)]/30" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">Về Chúng Tôi & Triết Lý Giáo Dục Canada</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Unlocking Every Child&apos;s <br /><span className="text-maple-gold">Potential</span></h1>
              <p className="text-xl text-white/80 font-light leading-relaxed">
                Sunshine Maple Bear is more than a school — it is a nurturing home where dreams are cultivated, character is shaped, and every child is prepared to thrive as a confident global citizen.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-maple-red font-bold uppercase tracking-widest text-sm">Our Story</h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-maple-black leading-tight">
                    Excellence Inspired by <br /> the Land of the Maple Leaf
                  </h3>
                </div>
                <div className="space-y-6 text-lg text-neutral-600 leading-relaxed font-light">
                  <p>
                    Sunshine Maple Bear is a proud member of the Maple Bear Global Schools network, headquartered in Winnipeg, Canada. We bring to Sunshine City a world-class 100% English international education environment where children experience the most advanced teaching methodologies.
                  </p>
                  <p>
                    Here, we believe every child is a unique individual with their own strengths. Our mission is to create a safe, inspiring environment where children freely explore themselves and the world around them.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-maple-red">550+</p>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider">Schools Worldwide</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-maple-red">30+</p>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider">Countries & Territories</p>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="relative z-10 rounded-3xl overflow-hidden aspect-square shadow-2xl">
                  <Image
                    src={SCHOOL_IMAGES.render.lopHoc3}
                    alt="Learning at Maple Bear"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-maple-gold/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-maple-red/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision - Luxury Cards */}
        <section className="py-24 bg-neutral-light-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group bg-white p-12 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-maple-red/5 rounded-2xl flex items-center justify-center text-maple-red mb-8 group-hover:bg-maple-red group-hover:text-white transition-colors">
                  <Target size={40} />
                </div>
                <h3 className="text-3xl font-bold text-maple-black mb-6">Our Mission</h3>
                <p className="text-lg text-neutral-500 leading-relaxed font-light">
                  To build a strong foundation of intellect, emotional intelligence, and character for children through the Maple Bear Canadian education program, empowering them to confidently integrate into the global community.
                </p>
              </div>

              <div className="group bg-white p-12 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-maple-gold/5 rounded-2xl flex items-center justify-center text-maple-gold mb-8 group-hover:bg-maple-gold group-hover:text-white transition-colors">
                  <Sparkles size={40} />
                </div>
                <h3 className="text-3xl font-bold text-maple-black mb-6">Our Vision</h3>
                <p className="text-lg text-neutral-500 leading-relaxed font-light">
                  To become a benchmark of premium early childhood education, where every child is respected and inspired to unlock their hidden talents and shine their brightest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-maple-red font-bold uppercase tracking-widest text-sm">CORE VALUES</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-maple-black">5 Pillars That Guide Everything We Do</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: <ShieldCheck />, title: 'Safety First', desc: 'Physical, emotional and procedural safety at the highest standards.' },
                { icon: <Heart />, title: 'Health & Wellness', desc: 'Scientific nutrition and lifelong healthy habits from day one.' },
                { icon: <Award />, title: 'Character', desc: 'Empathy, respect, independence and social skills through experience.' },
                { icon: <Users />, title: '100% English', desc: 'Full English immersion using Canadian methodology daily.' },
                { icon: <CheckCircle2 />, title: 'Partnership', desc: 'Transparent, professional communication with every family.' },
              ].map((val, idx) => (
                <div key={idx} className="p-10 bg-white rounded-3xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all text-center group">
                  <div className="w-16 h-16 mx-auto bg-neutral-50 rounded-2xl flex items-center justify-center text-maple-red mb-6 group-hover:scale-110 transition-transform">
                    {val.icon}
                  </div>
                  <h4 className="text-xl font-bold text-maple-black mb-3">{val.title}</h4>
                  <p className="text-neutral-500 text-sm font-light">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* International Standards */}
        <section className="py-24 bg-[var(--color-dark)] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="absolute top-10 left-10 w-64 h-64 text-white animate-pulse" viewBox="0 0 14 14" fill="currentColor">
              <path d="M6.7552516 12.9749c0-.014.026-.6078.057-1.3203.07-1.5937.069-1.5091.014-1.5845-.05-.069-.1077-.1023-.1772-.1023-.083 0-.6683.078-1.4387.1904-.7811.1145-1.2022.1714-1.2088.1634 0 0 .049-.178.114-.3894.1362-.4432.1431-.4966.081-.6202-.037-.072-.1235-.1458-1.3903-1.174-.7431-.6032-1.3498-1.1029-1.3482-1.1104 0-.01.1399-.078.3074-.1559.1674-.078.3208-.1578.3409-.1767.047-.044.06-.1153.039-.2162-.01-.044-.1191-.4536-.2445-.9098-.1254-.4562-.2262-.831-.224-.8328 0 0 .3498.069.7726.1586.4228.089.7944.1619.8258.1619.071 0 .1472-.039.186-.096.016-.024.073-.1961.1262-.3829.053-.1868.101-.3477.1063-.3576.01-.012.2307.2294.6279.6742.34.3808.6426.7132.6725.7388.063.054.1597.085.2205.072.09-.02.1459-.1186.1458-.2569 0-.039-.1214-.7149-.2696-1.5015-.1483-.7867-.2675-1.4324-.2648-1.4351 0 0 .196.092.4297.2111.4084.2074.4284.2159.5121.2164.1052.0006.1874-.04.2375-.1163.018-.028.2467-.4496.5077-.937.2609-.4873.4788-.8861.4842-.8861.01 0 .2234.3988.4845.8861.261.4874.4894.9087.5074.9363.037.056.099.098.1693.1137.098.022.1873-.011.6018-.223.2219-.1136.4057-.2042.4084-.2014 0 0-.1162.6486-.2645 1.4353-.1502.7968-.2696 1.4661-.2696 1.5111-.0001.1929.1119.2909.2654.2322.036-.014.086-.043.1113-.065.025-.022.3239-.3516.6633-.7316.3964004-.444.6204004-.6845.6266004-.6729.01.01.053.1708.1064.3576.053.1868.1099.3591.1262.3829.039.057.1148.096.1859.096.032 0 .4031-.073.8259-.1619.4228-.089.7704-.1604.7726-.1586 0 0-.1026.3902-.2328.863s-.2401.8987-.2442.9464c-.011.1313.011.1499.3886.3264.1717.08.3122.1507.3122.1566 0 .01-.6085.5047-1.3523 1.1084-1.2679004 1.0292-1.3548004 1.1025-1.3915004 1.175-.063.1236-.056.177.081.6202.065.2114.1163.3866.114.3894-.01.01-.4278-.049-1.2088-.1634-.7893-.1157-1.3563-.1904-1.4447-.1904-.069 0-.1496.065-.1857.1494-.023.054-.022.1261.01 1.3025.018.6851.033 1.3208.034 1.4128l.0008.1673h-.2206c-.2007 0-.2207 0-.2206-.025z"></path>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h3 className="text-4xl md:text-5xl font-bold leading-tight">Uncompromising <br /><span className="text-maple-gold">International Standards</span></h3>
                <div className="space-y-6">
                  {[
                    'Curriculum developed by Canada\'s leading education experts.',
                    'International-standard child competency assessment system.',
                    'Periodic teacher training and accreditation by Maple Bear Global.',
                    'Facilities designed to optimize experiential learning.',
                    'Fully English-medium environment fostering native-like language fluency.',
                  ].map((text, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-maple-gold/20 flex items-center justify-center text-maple-gold flex-shrink-0 mt-1">
                        <svg className="w-4 h-4" viewBox="0 0 14 14" fill="currentColor">
                          <path d="M6.7552516 12.9749c0-.014.026-.6078.057-1.3203.07-1.5937.069-1.5091.014-1.5845-.05-.069-.1077-.1023-.1772-.1023-.083 0-.6683.078-1.4387.1904-.7811.1145-1.2022.1714-1.2088.1634 0 0 .049-.178.114-.3894.1362-.4432.1431-.4966.081-.6202-.037-.072-.1235-.1458-1.3903-1.174-.7431-.6032-1.3498-1.1029-1.3482-1.1104 0-.01.1399-.078.3074-.1559.1674-.078.3208-.1578.3409-.1767.047-.044.06-.1153.039-.2162-.01-.044-.1191-.4536-.2445-.9098-.1254-.4562-.2262-.831-.224-.8328 0 0 .3498.069.7726.1586.4228.089.7944.1619.8258.1619.071 0 .1472-.039.186-.096.016-.024.073-.1961.1262-.3829.053-.1868.101-.3477.1063-.3576.01-.012.2307.2294.6279.6742.34.3808.6426.7132.6725.7388.063.054.1597.085.2205.072.09-.02.1459-.1186.1458-.2569 0-.039-.1214-.7149-.2696-1.5015-.1483-.7867-.2675-1.4324-.2648-1.4351 0 0 .196.092.4297.2111.4084.2074.4284.2159.5121.2164.1052.0006.1874-.04.2375-.1163.018-.028.2467-.4496.5077-.937.2609-.4873.4788-.8861.4842-.8861.01 0 .2234.3988.4845.8861.261.4874.4894.9087.5074.9363.037.056.099.098.1693.1137.098.022.1873-.011.6018-.223.2219-.1136.4057-.2042.4084-.2014 0 0-.1162.6486-.2645 1.4353-.1502.7968-.2696 1.4661-.2696 1.5111-.0001.1929.1119.2909.2654.2322.036-.014.086-.043.1113-.065.025-.022.3239-.3516.6633-.7316.3964004-.444.6204004-.6845.6266004-.6729.01.01.053.1708.1064.3576.053.1868.1099.3591.1262.3829.039.057.1148.096.1859.096.032 0 .4031-.073.8259-.1619.4228-.089.7704-.1604.7726-.1586 0 0-.1026.3902-.2328.863s-.2401.8987-.2442.9464c-.011.1313.011.1499.3886.3264.1717.08.3122.1507.3122.1566 0 .01-.6085.5047-1.3523 1.1084-1.2679004 1.0292-1.3548004 1.1025-1.3915004 1.175-.063.1236-.056.177.081.6202.065.2114.1163.3866.114.3894-.01.01-.4278-.049-1.2088-.1634-.7893-.1157-1.3563-.1904-1.4447-.1904-.069 0-.1496.065-.1857.1494-.023.054-.022.1261.01 1.3025.018.6851.033 1.3208.034 1.4128l.0008.1673h-.2206c-.2007 0-.2207 0-.2206-.025z"></path>
                        </svg>
                      </div>
                      <p className="text-white/70 font-light">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src={SCHOOL_IMAGES.render.thuVien4}
                  alt="International Standards"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Preview */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-maple-red font-bold uppercase tracking-widest text-sm">FACILITIES</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-maple-black">Five-Star Learning Spaces</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Multi-Purpose Classrooms', image: SCHOOL_IMAGES.render.lopHoc5, desc: 'Open design with optimized natural lighting and comprehensive international learning materials.' },
                { title: 'Knowledge Library', image: SCHOOL_IMAGES.render.thuVien5, desc: 'Thousands of English titles nurturing a love of reading from the earliest years.' },
                { title: 'Activity & Arts Room', image: SCHOOL_IMAGES.render.phongChucNang2, desc: 'Where children develop artistic, musical, and physical talents through creative expression.' },
                { title: 'Campus Amenities', image: SCHOOL_IMAGES.render.hanhLang2, desc: 'Spacious hallways, kindergarten-standard restrooms, and absolute safety throughout the campus.' },
              ].map((f, idx) => (
                <div key={idx} className="group relative h-80 rounded-[32px] overflow-hidden shadow-lg border border-neutral-100">
                  <Image src={f.image} alt={f.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-maple-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h4 className="text-2xl font-bold text-white mb-2">{f.title}</h4>
                    <p className="text-white/70 text-sm font-light">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-maple-red text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">Experience Our International <br /> Environment Today</h2>
              <p className="text-xl text-white/80 font-light">We warmly invite parents to visit our campus and discover firsthand the world-class learning environment we&apos;ve created for your child.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="/tour-booking" className="px-10 py-4 bg-white text-maple-red font-bold rounded-full hover:bg-maple-gold hover:text-maple-black transition-all shadow-xl">Book a Tour</a>
                <a href="/contact" className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-maple-red transition-all">Contact Us</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
