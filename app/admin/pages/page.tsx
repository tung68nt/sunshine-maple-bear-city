'use client'

import { useState, useEffect } from 'react'
import {
  Layers,
  Edit3,
  Globe,
  Save,
  ArrowLeft,
  Search,
  CheckCircle2,
  Eye,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Link2,
  ExternalLink,
  ShieldCheck,
  Plus,
  LayoutGrid,
  Quote,
  HelpCircle,
  Megaphone,
  X,
  MoveUp,
  MoveDown,
  Trash2,
  Settings2,
  Monitor
} from 'lucide-react'
import { SectionRenderer } from '@/components/sections/SectionRenderer'
import { staticPagesRegistry } from '@/lib/static-pages-data'
import { PageSectionBlock } from '@/lib/supabase'

type StaticPage = {
  id: string
  path: string
  title: string
  category: 'ABOUT US' | 'ACADEMICS' | 'ADMISSIONS' | 'COMMUNITY'
  status: 'Published' | 'Draft'
  pageType?: 'SECTION_BUILDER' | 'BLOG_CONVERTED'
  convertedFromArticleId?: string
  convertedArticleAuthor?: string
  convertedArticleHtmlContent?: string
  lastUpdated: string
  bannerTag: string
  bannerTitle: string
  bannerSubheading: string
  bannerIntro: string
  bannerImage: string
  bodyTitle: string
  bodyParagraph: string
  featurePoints: string[]
  ctaPrimaryText: string
  ctaPrimaryUrl: string
  ctaSecondaryText: string
  ctaSecondaryUrl: string
  seoTitle: string
  seoDescription: string
  ogImage: string
  sectionsStack?: PageSectionBlock[]
}

type SectionBlock = {
  id: string
  type: 'HERO' | 'FEATURES' | 'BODY' | 'TESTIMONIALS' | 'FAQ' | 'CTA'
  title: string
}

const presetTemplates = [
  {
    id: 'hero',
    title: 'Template 01: Standard Hero Banner Section',
    description: 'Header section with Tagline, H1 Title, Subheading, intro paragraph and background image.',
    icon: ImageIcon,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bannerTag: 'CANADIAN EDUCATION EXCELLENCE',
      bannerTitle: `${page.title}`,
      bannerSubheading: 'World-Leading Early Childhood System',
      bannerIntro: 'Nurturing curiosity, character, and lifelong learning in a 5-star campus environment.',
    })
  },
  {
    id: 'features',
    title: 'Template 02: 3-Card Feature Highlights Grid',
    description: 'Grid of 3 key feature points with icons, titles, and descriptions.',
    icon: LayoutGrid,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      featurePoints: [
        '100% English Immersion environment led by Canadian certified educators.',
        'Modern 5-star facilities inside Sunshine City urban complex.',
        'Organic 5-star meal program designed by pediatric nutritionists.'
      ]
    })
  },
  {
    id: 'age-groups',
    title: 'Template 03: Age Group Progression Showcase (12M - 5Y)',
    description: 'Detailed developmental stages for Toddler, Nursery, JK, and SK classes.',
    icon: FileText,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bodyTitle: 'Age-Appropriate Canadian Learning Pathways',
      bodyParagraph: 'Our early childhood curriculum is divided into 4 tailored age groups: Toddler (12-24M), Nursery (2-3Y), Junior Kindergarten (3-4Y), and Senior Kindergarten (4-5Y).',
      featurePoints: [
        'Toddler (12M-24M): Sensory exploration & physical coordination.',
        'Nursery (2Y-3Y): Social emotional growth & natural English immersion.',
        'Junior Kindergarten (3Y-4Y): Jolly Phonics phonetics & mathematical logic.',
        'Senior Kindergarten (4Y-5Y): STEAM inquiry & primary school readiness.'
      ]
    })
  },
  {
    id: 'daily-schedule',
    title: 'Template 04: Daily Activity Flow & Routine',
    description: 'Structured daily rhythm from morning health check to outdoor sports.',
    icon: Sparkles,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bodyTitle: 'A Day at Sunshine Maple Bear',
      bodyParagraph: 'Children thrive in a structured, joyful rhythm combining academic discovery, creative art, organic nutrition, and active outdoor play.',
      featurePoints: [
        '07:30 AM - Morning Health Check & Welcome Circle.',
        '08:30 AM - Jolly Phonics & English Immersion Discovery.',
        '11:30 AM - Organic 5-Star Lunch & Rest Time.',
        '03:00 PM - Afternoon STEAM Activity & Outdoor Playground.'
      ]
    })
  },
  {
    id: 'nutrition',
    title: 'Template 05: 5-Star Organic Culinary & Nutrition Program',
    description: 'Organic meal schedule, pediatric diet planning, and kitchen hygiene.',
    icon: ShieldCheck,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bodyTitle: 'Organic Nutrition & Food Safety Guarantee',
      bodyParagraph: 'Every meal served at Sunshine Maple Bear is prepared fresh in our 5-star on-site kitchen using 100% certified organic ingredients from accredited farms.',
      featurePoints: [
        '100% Certified organic vegetables and fresh meat suppliers.',
        'Calorie-balanced menus designed by pediatric nutritionists.',
        'Strict 5-star kitchen hygiene & 24-hour food sample storage.'
      ]
    })
  },
  {
    id: 'calendar',
    title: 'Template 06: Academic Calendar & 4 School Terms',
    description: 'School term breakdown, holiday schedules, and annual cultural events.',
    icon: Layers,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bodyTitle: 'Academic School Terms & Important Events',
      bodyParagraph: 'The academic year spans from August through July, structured into 4 vibrant terms featuring STEAM discovery fairs, sports days, and graduation concerts.',
      featurePoints: [
        'Term 1: Fall Semester (August - October).',
        'Term 2: Winter Semester & Holiday Festival (November - January).',
        'Term 3: Spring Discovery & STEAM Fair (February - April).',
        'Term 4: Summer Immersion & Graduation (May - July).'
      ]
    })
  },
  {
    id: 'admissions-process',
    title: 'Template 07: 4-Step Admissions Application Guide',
    description: 'Clear 4-step enrollment journey from tour booking to welcome kit.',
    icon: ExternalLink,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bodyTitle: 'Simple 4-Step Enrollment Process',
      bodyParagraph: 'We make joining the Sunshine Maple Bear family warm, supportive, and convenient for parents.',
      featurePoints: [
        'Step 1: Register online enquiry or book a campus visit.',
        'Step 2: Campus tour & Academic consultation with Principal.',
        'Step 3: Gentle child observation & play interaction.',
        'Step 4: Formal enrollment confirmation & welcome uniform kit.'
      ]
    })
  },
  {
    id: 'tuition-table',
    title: 'Template 08: Tuition Fee Structure 2026 Table',
    description: 'Transparent all-inclusive fee schedule by age group.',
    icon: Globe,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bodyTitle: 'Transparent International Standard Fees',
      bodyParagraph: 'Tuition fees cover full-day English immersion, organic meal service, learning kits, field trips, and campus facility access.',
      featurePoints: [
        'Toddler Program (12M-24M): 14,500,000 VND / Month.',
        'Nursery Program (2Y-3Y): 15,800,000 VND / Month.',
        'Kindergarten Program (3Y-5Y): 17,200,000 VND / Month.'
      ]
    })
  },
  {
    id: 'founding-families',
    title: 'Template 09: Founding Families Special Incentive (20% Lifetime)',
    description: 'Lifetime 20% tuition discount package for first 50 registered families.',
    icon: Sparkles,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bannerTag: 'EXCLUSIVE FOUNDING PRIVILEGES',
      bannerTitle: 'Founding Families Program 2026',
      bannerSubheading: 'Lifetime Privileges for First 50 Families',
      bodyTitle: 'Exclusive Lifetime Enrollment Privileges',
      bodyParagraph: 'As a Founding Family at Sunshine City Campus, you enjoy a 20% lifetime tuition discount for your child’s entire enrollment duration.',
      featurePoints: [
        '20% Lifetime Tuition Discount for full enrollment duration.',
        '100% Exemption of Facilities & Application Fee (15,000,000 VND value).',
        'Complimentary Canadian Uniform & Welcome Backpack Kit.'
      ]
    })
  },
  {
    id: 'health-safety',
    title: 'Template 10: Health, Safety & Medical Care Protocol',
    description: 'Daily morning health checks, 5-star clinic, and HEPA air purifiers.',
    icon: ShieldCheck,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bodyTitle: '5-Star Medical Clinic & Campus Hygiene',
      bodyParagraph: 'Our full-time registered nurses conduct daily health checks and enforce strict medical protocols to ensure every child is safe and protected.',
      featurePoints: [
        'Daily morning temperature and physical health checks.',
        'HEPA air purification & non-toxic organic sanitization.',
        'Full-time registered nurses on-site at 5-star medical clinic.'
      ]
    })
  },
  {
    id: 'safeguarding',
    title: 'Template 11: Child Safeguarding & Safety Audit Commitment',
    description: 'Zero-tolerance child protection and annual Canadian safety audits.',
    icon: ShieldCheck,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bodyTitle: 'Canadian International Child Protection Commitment',
      bodyParagraph: 'Sunshine Maple Bear enforces a zero-tolerance child safeguarding policy, adhering strictly to Canadian International Safety Standards.',
      featurePoints: [
        '100% staff background checks & credential verification.',
        'Mandatory annual safeguarding & child protection training.',
        'Unannounced safety audits by Maple Bear Global Quality Faculty.'
      ]
    })
  },
  {
    id: 'testimonials',
    title: 'Template 12: Parent Testimonials & Satisfaction Reviews',
    description: 'Reviews and satisfaction quotes from parents of enrolled students.',
    icon: Quote,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bodyTitle: 'What Parents Say About Sunshine Maple Bear',
      bodyParagraph: '"Sending our child to Sunshine Maple Bear was the best decision we made. The teachers are incredibly caring and our daughter speaks English naturally every day!" — Parent of JK Class Student.',
    })
  },
  {
    id: 'faq',
    title: 'Template 13: FAQ & School Regulations Accordion',
    description: 'Frequently asked questions and policy rules for parents.',
    icon: HelpCircle,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      bodyTitle: 'Frequently Asked Questions & Guidelines',
      featurePoints: [
        'What are the school drop-off and pick-up hours? (07:30 AM - 05:30 PM)',
        'How are meals prepared? (100% organic ingredients in 5-star on-site kitchen)',
        'What is the teacher-to-student ratio? (1:5 for Toddlers, 1:8 for Kindergarten)'
      ]
    })
  },
  {
    id: 'cta',
    title: 'Template 14: Tour Booking CTA Banner',
    description: 'High-contrast banner inviting parents to book a campus tour.',
    icon: Megaphone,
    apply: (page: StaticPage): Partial<StaticPage> => ({
      ctaPrimaryText: 'Book a Campus Tour Now',
      ctaPrimaryUrl: '/#contact-us',
      ctaSecondaryText: 'Explore Tuition Fees',
      ctaSecondaryUrl: '/admissions/tuition'
    })
  }
]

const initialPages: StaticPage[] = Object.values(staticPagesRegistry) as any

export default function AdminPagesPage() {
  const [pages, setPages] = useState<StaticPage[]>(initialPages)
  const [activePageId, setActivePageId] = useState<string | null>(null)
  const [leftTab, setLeftTab] = useState<'WIDGETS' | 'FIELDS' | 'SEO'>('WIDGETS')
  const [editingSectionIdx, setEditingSectionIdx] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL')
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true)
  const [contentEditLang, setContentEditLang] = useState<'vi' | 'en'>('vi')
  const [adminUiLang, setAdminUiLang] = useState<'vi' | 'en'>('vi')

  // Create Static Page Modal State
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPageTitle, setNewPageTitle] = useState('')
  const [newPagePath, setNewPagePath] = useState('')
  const [newPageCategory, setNewPageCategory] = useState<'ABOUT US' | 'ACADEMICS' | 'ADMISSIONS' | 'COMMUNITY'>('ACADEMICS')

  useEffect(() => {
    const saved = (localStorage.getItem('smb_admin_ui_lang') as 'vi' | 'en') || 'vi'
    setAdminUiLang(saved)

    const handleLangChange = (e: CustomEvent) => {
      if (e.detail === 'vi' || e.detail === 'en') {
        setAdminUiLang(e.detail)
      }
    }

    window.addEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
    return () => window.removeEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
  }, [])

  // Elementor Page Section Stack State
  const [sectionsStack, setSectionsStack] = useState<SectionBlock[]>([
    { id: 'sec-1', type: 'HERO', title: 'Header Hero Banner Section' },
    { id: 'sec-2', type: 'BODY', title: 'Main Body Paragraph & Description' },
    { id: 'sec-3', type: 'FEATURES', title: '3-Card Feature Highlights Grid' },
    { id: 'sec-4', type: 'CTA', title: 'Tour Booking Call-To-Action Banner' }
  ])

  const activePage = pages.find(p => p.id === activePageId)

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPageTitle || !newPagePath) return
    const formattedPath = newPagePath.startsWith('/') ? newPagePath : `/${newPagePath}`
    const newPage: StaticPage = {
      id: `page-${Date.now()}`,
      path: formattedPath,
      title: newPageTitle,
      category: newPageCategory,
      status: 'Published',
      pageType: 'SECTION_BUILDER',
      lastUpdated: new Date().toLocaleDateString('en-GB'),
      bannerTag: 'CANADIAN PRESCHOOL PROGRAM',
      bannerTitle: newPageTitle,
      bannerSubheading: 'Sunshine Maple Bear International Kindergarten',
      bannerIntro: 'Nurturing curiosity, character, and organic English immersion.',
      bannerImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
      bodyTitle: 'Educational Philosophy & Curriculum Highlights',
      bodyParagraph: 'Designed according to Canadian Early Childhood Education standards.',
      featurePoints: [
        '100% English Immersion environment led by Canadian certified educators.',
        '5-Star Campus facilities inside Sunshine City urban complex.',
        'Organic nutrition program curated by pediatric experts.'
      ],
      ctaPrimaryText: 'Book a Campus Visit',
      ctaPrimaryUrl: '/#contact-us',
      ctaSecondaryText: 'Explore Academics',
      ctaSecondaryUrl: '/academics/age-groups',
      seoTitle: `${newPageTitle} | Sunshine Maple Bear Hanoi`,
      seoDescription: `Learn about ${newPageTitle} at Sunshine Maple Bear International Kindergarten Hanoi.`,
      ogImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'
    }

    setPages([newPage, ...pages])
    setShowAddModal(false)
    setNewPageTitle('')
    setNewPagePath('')
    setActivePageId(newPage.id)
  }

  const handleDeletePage = (id: string) => {
    if (confirm(adminUiLang === 'vi' ? 'Bạn có chắc chắn muốn xóa trang tĩnh này không?' : 'Are you sure you want to delete this static page?')) {
      setPages(pages.filter(p => p.id !== id))
      if (activePageId === id) setActivePageId(null)
    }
  }

  const handleSwitchToSectionBuilder = (id: string) => {
    setPages(pages.map(p => p.id === id ? { ...p, pageType: 'SECTION_BUILDER' } : p))
  }

  const handleUpdatePageField = (field: keyof StaticPage, value: any) => {
    if (!activePageId) return
    setPages(pages.map(p => p.id === activePageId ? { ...p, [field]: value, lastUpdated: new Date().toLocaleDateString('en-GB') } : p))
  }

  const handleUpdateFeaturePoint = (index: number, value: string) => {
    if (!activePage) return
    const updated = [...activePage.featurePoints]
    updated[index] = value
    handleUpdatePageField('featurePoints', updated)
  }

  const handleAddFeaturePoint = () => {
    if (!activePage) return
    handleUpdatePageField('featurePoints', [...activePage.featurePoints, 'New key feature point...'])
  }

  const handleRemoveFeaturePoint = (index: number) => {
    if (!activePage) return
    const updated = activePage.featurePoints.filter((_, i) => i !== index)
    handleUpdatePageField('featurePoints', updated)
  }

  const handleApplyPresetTemplate = (preset: typeof presetTemplates[0]) => {
    if (!activePage) return
    const currentStack = activePage.sectionsStack || []
    
    // Map preset ID to PageSectionBlock type
    let blockType: any = 'FEATURES'
    if (preset.id === 'hero') blockType = 'HERO'
    if (preset.id === 'age-groups') blockType = 'AGE_GROUPS'
    if (preset.id === 'daily-schedule') blockType = 'DAILY_SCHEDULE'
    if (preset.id === 'nutrition') blockType = 'NUTRITION'
    if (preset.id === 'facilities') blockType = 'FACILITIES'
    if (preset.id === 'calendar') blockType = 'CALENDAR'
    if (preset.id === 'admissions-process') blockType = 'ADMISSIONS_PROCESS'
    if (preset.id === 'tuition-table') blockType = 'TUITION_TABLE'

    const newBlock: PageSectionBlock = {
      id: `sec-${Date.now()}`,
      type: blockType,
      title_vi: preset.title,
      title_en: preset.title
    }

    const updates = preset.apply(activePage)
    const updatedPage = {
      ...activePage,
      ...updates,
      sectionsStack: [...currentStack, newBlock]
    }
    setPages(pages.map(p => p.id === activePage.id ? updatedPage : p))
  }

  const handleMoveSectionUp = (index: number) => {
    if (!activePage || !activePage.sectionsStack || index === 0) return
    const updatedStack = [...activePage.sectionsStack]
    const temp = updatedStack[index]
    updatedStack[index] = updatedStack[index - 1]
    updatedStack[index - 1] = temp
    handleUpdatePageField('sectionsStack', updatedStack)
  }

  const handleMoveSectionDown = (index: number) => {
    if (!activePage || !activePage.sectionsStack || index >= activePage.sectionsStack.length - 1) return
    const updatedStack = [...activePage.sectionsStack]
    const temp = updatedStack[index]
    updatedStack[index] = updatedStack[index + 1]
    updatedStack[index + 1] = temp
    handleUpdatePageField('sectionsStack', updatedStack)
  }

  const handleDeleteSection = (index: number) => {
    if (!activePage || !activePage.sectionsStack) return
    const updatedStack = activePage.sectionsStack.filter((_, i) => i !== index)
    handleUpdatePageField('sectionsStack', updatedStack)
  }

  const handleUpdateSectionBlockField = (sectionIdx: number, field: string, value: any) => {
    if (!activePage || !activePage.sectionsStack) return
    const updatedStack = [...activePage.sectionsStack]
    if (!updatedStack[sectionIdx]) return

    updatedStack[sectionIdx] = {
      ...updatedStack[sectionIdx],
      [field]: value
    }

    handleUpdatePageField('sectionsStack', updatedStack)
  }

  const handleSavePage = () => {
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const filteredPages = pages.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.path.includes(searchTerm)
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter
    return matchesSearch && matchesCat
  })

  // -------------------------------------------------------------
  // VIEW 1: ELEMENTOR WORDPRESS VISUAL PAGE BUILDER WORKSPACE
  // -------------------------------------------------------------
  if (activePage) {
    return (
      <div className="space-y-4 text-[#1D1D1B] w-full">
        
        {/* Top Control Header Bar */}
        <div className="bg-[#151513] text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-800 shadow-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActivePageId(null)}
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white transition-colors flex items-center gap-1.5 text-xs font-bold border border-neutral-700"
            >
              <ArrowLeft size={16} /> Exit Builder
            </button>

            <button
              onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
              className="px-3 py-2 bg-maple-gold/20 hover:bg-maple-gold hover:text-[#1D1D1B] text-maple-gold border border-maple-gold/40 transition-colors text-xs font-bold flex items-center gap-1.5"
            >
              <LayoutGrid size={14} />
              {isLeftPanelOpen ? '◀ Thu Gọn Panel Builder' : '▶ Mở Panel Builder'}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-maple-gold">{activePage.path}</span>
                {activePage.pageType === 'BLOG_CONVERTED' ? (
                  <span className="px-2 py-0.5 bg-purple-900 text-purple-200 border border-purple-700 text-[10px] font-semibold rounded-2xs inline-flex items-center gap-1">
                    📰 Chuyển từ Blog
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-blue-900 text-blue-200 border border-blue-700 text-[10px] font-semibold rounded-2xs inline-flex items-center gap-1">
                    🧩 Section Builder
                  </span>
                )}
              </div>
              <h2 className="text-lg font-display font-extrabold text-white mt-0.5">
                {activePage.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activePage.pageType === 'BLOG_CONVERTED' && (
              <button
                onClick={() => handleSwitchToSectionBuilder(activePage.id)}
                className="px-3 py-1.5 bg-purple-900 hover:bg-purple-800 text-white text-xs font-semibold border border-purple-700 transition-colors flex items-center gap-1.5 rounded-2xs shadow-2xs"
                title="Chuyển trang này sang cấu trúc Section Blocks"
              >
                <Layers size={14} /> Chuyển sang Section Builder
              </button>
            )}
            {savedSuccess && (
              <span className="px-3 py-1.5 bg-emerald-900 text-emerald-200 border border-emerald-700 text-xs font-bold flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 size={14} /> Page Published!
              </span>
            )}

            <a
              href={activePage.path}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-neutral-800 text-white text-xs font-semibold border border-neutral-700 hover:bg-neutral-700 flex items-center gap-1.5 rounded-2xs"
            >
              <ExternalLink size={14} /> {adminUiLang === 'vi' ? 'Xem trang' : 'View Live Site'}
            </a>

            <button
              onClick={handleSavePage}
              className="px-3.5 py-1.5 bg-maple-red hover:bg-red-700 text-white text-xs font-semibold transition-colors border border-maple-red flex items-center gap-1.5 rounded-2xs shadow-2xs"
            >
              <Save size={15} /> {adminUiLang === 'vi' ? 'Lưu & Xuất bản' : 'Save & Publish'}
            </button>
          </div>
        </div>

        {/* ELEMENTOR 2-COLUMN WORKSPACE: LEFT WIDGET PALETTE (320px) | RIGHT LIVE STAGE (70%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
          
          {/* ------------------------------------------------------------- */}
          {/* LEFT COLUMN: ELEMENTOR WIDGET PALETTE & SECTION SETTINGS */}
          {/* ------------------------------------------------------------- */}
          {isLeftPanelOpen && (
            <div className="lg:col-span-4 bg-white border border-neutral-300 shadow-md overflow-hidden space-y-0 animate-fade-in">
              
              {/* Widget Palette Navigation Tabs (Sleek Dark Segmented Bar) */}
              <div className="p-2 bg-[#151513] border-b border-neutral-800 flex gap-1">
                <button
                  type="button"
                  onClick={() => setLeftTab('WIDGETS')}
                  className={`flex-1 py-2 px-1 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                    leftTab === 'WIDGETS'
                      ? 'bg-maple-red text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <LayoutGrid size={13} />
                  <span>01. Widgets</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLeftTab('FIELDS')}
                  className={`flex-1 py-2 px-1 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                    leftTab === 'FIELDS'
                      ? 'bg-maple-red text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <Settings2 size={13} />
                  <span>02. Fields</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLeftTab('SEO')}
                  className={`flex-1 py-2 px-1 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                    leftTab === 'SEO'
                      ? 'bg-maple-red text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <Globe size={13} />
                  <span>03. SEO</span>
                </button>
              </div>

              {/* TAB 1: SECTION WIDGETS LIBRARY */}
              {leftTab === 'WIDGETS' && (
                <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
                  <div className="border-b border-neutral-200 pb-2">
                    <span className="text-[10px] font-semibold text-maple-gold block">
                      {adminUiLang === 'vi' ? 'BẢNG KHỐI GIAO DIỆN' : 'BLOCK SECTION PALETTE'}
                    </span>
                    <h4 className="text-sm font-display font-bold text-[#1D1D1B]">Click to Add Section Widget</h4>
                  </div>

                  <div className="space-y-2.5">
                    {presetTemplates.map((tmpl) => {
                      const Icon = tmpl.icon
                      return (
                        <div
                          key={tmpl.id}
                          onClick={() => handleApplyPresetTemplate(tmpl)}
                          className="p-3 bg-[#FDFBF7] border border-neutral-300 hover:border-maple-red hover:bg-white transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white border border-neutral-200 group-hover:bg-maple-red group-hover:text-white transition-colors">
                              <Icon size={16} />
                            </div>
                            <div>
                              <h5 className="font-bold text-xs text-[#1D1D1B] group-hover:text-maple-red">{tmpl.title}</h5>
                              <span className="text-[10px] text-neutral-500 line-clamp-1">{tmpl.description}</span>
                            </div>
                          </div>
                          <Plus size={16} className="text-neutral-400 group-hover:text-maple-red flex-shrink-0" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: SECTION CONTENT FIELDS (MANUAL BILINGUAL EDITOR) */}
              {leftTab === 'FIELDS' && (
                <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
                  
                  {/* Active Section Block Selector */}
                  <div className="p-3 bg-[#151513] text-white border border-neutral-800 space-y-2 rounded-2xs shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-maple-gold">🎯 Chọn Khối Section Cần Biên Tập</span>
                      <span className="text-[9px] text-neutral-400">{activePage.sectionsStack?.length || 0} Khối</span>
                    </div>
                    <select
                      value={editingSectionIdx}
                      onChange={(e) => setEditingSectionIdx(Number(e.target.value))}
                      className="w-full p-2 bg-neutral-900 border border-neutral-700 text-xs font-bold text-white focus:outline-none focus:border-maple-gold rounded-2xs"
                    >
                      {activePage.sectionsStack?.map((sBlock, sIdx) => (
                        <option key={sBlock.id || sIdx} value={sIdx}>
                          Khối 0{sIdx + 1}: {sBlock.type} — {sBlock.title_vi || sBlock.title_en || sBlock.title || 'Mẫu Section'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Manual Bilingual Editor Switcher */}
                  <div className="p-2.5 bg-neutral-900 text-white border border-neutral-800 space-y-2 rounded-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-neutral-300">Biên tập Song ngữ Thủ công</span>
                      <span className="text-[9px] text-neutral-400">Không dịch tự động</span>
                    </div>
                    <div className="flex gap-1 bg-neutral-950 p-1 border border-neutral-800 rounded-2xs">
                      <button
                        type="button"
                        onClick={() => setContentEditLang('vi')}
                        className={`flex-1 py-1.5 px-2 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 rounded-2xs ${
                          contentEditLang === 'vi'
                            ? 'bg-maple-red text-white shadow-xs'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span>🇻🇳</span>
                        <span>Tiếng Việt</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setContentEditLang('en')}
                        className={`flex-1 py-1.5 px-2 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 rounded-2xs ${
                          contentEditLang === 'en'
                            ? 'bg-maple-red text-white shadow-xs'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span>🇬🇧</span>
                        <span>English</span>
                      </button>
                    </div>
                  </div>

                  {/* FIELDS FORM FOR SELECTED SECTION */}
                  {(() => {
                    const activeBlock = activePage.sectionsStack?.[editingSectionIdx] || activePage.sectionsStack?.[0]
                    if (!activeBlock) return <div className="text-xs text-neutral-500">Chưa chọn khối section nào.</div>

                    const taglineKey = contentEditLang === 'vi' ? 'tagline_vi' : 'tagline_en'
                    const titleKey = contentEditLang === 'vi' ? 'title_vi' : 'title_en'
                    const subheadKey = contentEditLang === 'vi' ? 'subheading_vi' : 'subheading_en'
                    const introKey = contentEditLang === 'vi' ? 'intro_vi' : 'intro_en'
                    const bodyKey = contentEditLang === 'vi' ? 'body_paragraph_vi' : 'body_paragraph_en'
                    const ctaKey = contentEditLang === 'vi' ? 'cta_primary_text_vi' : 'cta_primary_text_en'

                    return (
                      <div className="space-y-3.5">
                        <div className="border-b border-neutral-200 pb-2">
                          <span className="text-[10px] font-semibold text-maple-red block">
                            Đang sửa Khối 0{editingSectionIdx + 1}: {activeBlock.type}
                          </span>
                          <h4 className="text-sm font-display font-bold text-[#1D1D1B]">
                            {contentEditLang === 'vi' ? 'Trường Nội dung Tiếng Việt' : 'English Content Fields'}
                          </h4>
                        </div>

                        {/* Tagline Field */}
                        <div>
                          <label className="text-xs font-semibold text-neutral-700 block mb-1">Tagline / Dòng Nhãn Banner</label>
                          <input
                            type="text"
                            value={activeBlock[taglineKey] || activeBlock.tagline || ''}
                            onChange={(e) => handleUpdateSectionBlockField(editingSectionIdx, taglineKey, e.target.value)}
                            placeholder="VD: CANADIAN EDUCATION EXCELLENCE"
                            className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-maple-red"
                          />
                        </div>

                        {/* Section Title Field */}
                        <div>
                          <label className="text-xs font-semibold text-neutral-700 block mb-1">Tiêu đề Khối (Section Title H1/H2)</label>
                          <input
                            type="text"
                            value={activeBlock[titleKey] || activeBlock.title || ''}
                            onChange={(e) => handleUpdateSectionBlockField(editingSectionIdx, titleKey, e.target.value)}
                            placeholder="Nhập tiêu đề khối..."
                            className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold focus:outline-none focus:border-maple-red"
                          />
                        </div>

                        {/* Subheading Field */}
                        <div>
                          <label className="text-xs font-semibold text-neutral-700 block mb-1">Tiêu đề Phụ (Subheading)</label>
                          <input
                            type="text"
                            value={activeBlock[subheadKey] || activeBlock.subheading || ''}
                            onChange={(e) => handleUpdateSectionBlockField(editingSectionIdx, subheadKey, e.target.value)}
                            placeholder="Nhập tiêu đề phụ nghiêng..."
                            className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
                          />
                        </div>

                        {/* Intro / Short Description */}
                        <div>
                          <label className="text-xs font-semibold text-neutral-700 block mb-1">Đoạn Giới thiệu (Intro Paragraph)</label>
                          <textarea
                            rows={2}
                            value={activeBlock[introKey] || activeBlock.intro || ''}
                            onChange={(e) => {
                              handleUpdateSectionBlockField(editingSectionIdx, introKey, e.target.value)
                              e.target.style.height = 'auto'
                              e.target.style.height = e.target.scrollHeight + 'px'
                            }}
                            onFocus={(e) => {
                              e.target.style.height = 'auto'
                              e.target.style.height = e.target.scrollHeight + 'px'
                            }}
                            placeholder="Nhập đoạn giới thiệu ngắn..."
                            className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red focus:bg-white resize-none overflow-hidden transition-all font-medium"
                          />
                        </div>

                        {/* Detailed Body Paragraph */}
                        <div>
                          <label className="text-xs font-semibold text-neutral-700 block mb-1">Nội dung Chi tiết (Body Paragraph)</label>
                          <textarea
                            rows={3}
                            value={activeBlock[bodyKey] || activeBlock.body_paragraph || ''}
                            onChange={(e) => {
                              handleUpdateSectionBlockField(editingSectionIdx, bodyKey, e.target.value)
                              e.target.style.height = 'auto'
                              e.target.style.height = e.target.scrollHeight + 'px'
                            }}
                            onFocus={(e) => {
                              e.target.style.height = 'auto'
                              e.target.style.height = e.target.scrollHeight + 'px'
                            }}
                            placeholder="Nhập nội dung mô tả chi tiết..."
                            className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs leading-relaxed focus:outline-none focus:border-maple-red focus:bg-white resize-none overflow-hidden transition-all font-medium"
                          />
                        </div>

                        {/* CTA Button Text & Link */}
                        <div className="pt-2 border-t border-neutral-200 space-y-2">
                          <label className="text-xs font-semibold text-neutral-700 block">Nút Kích hoạt Hành động (CTA Button)</label>
                          <input
                            type="text"
                            value={activeBlock[ctaKey] || activeBlock.cta_primary_text || ''}
                            onChange={(e) => handleUpdateSectionBlockField(editingSectionIdx, ctaKey, e.target.value)}
                            placeholder="Tên nút (VD: Đăng ký Tham quan)"
                            className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                          />
                          <input
                            type="text"
                            value={activeBlock.cta_primary_url || ''}
                            onChange={(e) => handleUpdateSectionBlockField(editingSectionIdx, 'cta_primary_url', e.target.value)}
                            placeholder="Đường dẫn nút (VD: /#contact-us)"
                            className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono"
                          />
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* TAB 3: TECHNICAL SEO */}
              {leftTab === 'SEO' && (
                <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
                  <div className="border-b border-neutral-200 pb-2">
                    <span className="text-[10px] font-semibold text-emerald-600 block">Cấu hình SEO Hẹn giờ</span>
                    <h4 className="text-sm font-display font-bold text-[#1D1D1B]">Thẻ Meta & Xem trước Google Snippet</h4>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">SEO Title Tag</label>
                    <input
                      type="text"
                      value={activePage.seoTitle}
                      onChange={(e) => handleUpdatePageField('seoTitle', e.target.value)}
                      className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">SEO Description Tag</label>
                    <textarea
                      rows={2}
                      value={activePage.seoDescription}
                      onChange={(e) => {
                        handleUpdatePageField('seoDescription', e.target.value)
                        e.target.style.height = 'auto'
                        e.target.style.height = e.target.scrollHeight + 'px'
                      }}
                      onFocus={(e) => {
                        e.target.style.height = 'auto'
                        e.target.style.height = e.target.scrollHeight + 'px'
                      }}
                      className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs leading-relaxed focus:outline-none focus:border-maple-red focus:bg-white resize-none overflow-hidden transition-all font-medium"
                    />
                  </div>

                  <div className="p-3 bg-[#FDFBF7] border border-neutral-200 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 block">Google Snippet Preview:</span>
                    <div className="text-[10px] text-neutral-500 font-mono truncate">https://www.sunshinemaplebear.edu.vn{activePage.path}</div>
                    <div className="text-xs font-bold text-blue-700 leading-snug">{activePage.seoTitle}</div>
                    <div className="text-xs text-neutral-600 line-clamp-2">{activePage.seoDescription}</div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* RIGHT COLUMN: LIVE PAGE STAGE (ELEMENTOR CANVAS FULL WIDTH DYNAMIC) */}
          {/* ------------------------------------------------------------- */}
          <div className={`${isLeftPanelOpen ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4 transition-all duration-300`}>
            
            <div className="bg-[#151513] text-white p-3 border border-neutral-800 flex justify-between items-center rounded-2xs">
              <span className="text-xs font-semibold text-maple-gold flex items-center gap-1.5">
                <Monitor size={14} /> KHUNG XEM TRỰC QUAN PAGE STAGE ({activePage.sectionsStack?.length || 0} KHỐI NỘI DUNG MULTI-SECTION)
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                {isLeftPanelOpen ? 'Chế độ 70% Tiêu chuẩn' : '✨ Chế độ Toàn màn hình Ultra-Wide'}
              </span>
            </div>

            {/* STACK OF SECTION BLOCKS WITH CONTROL BARS */}
            <div className="space-y-6 max-h-[82vh] overflow-y-auto bg-[#F5F5F0] p-5 sm:p-6 border border-neutral-300 rounded-2xs shadow-inner">
              {activePage.sectionsStack && activePage.sectionsStack.length > 0 ? (
                activePage.sectionsStack.map((block, idx) => (
                  <div key={block.id || idx} className="relative group bg-white border-2 border-neutral-300 hover:border-maple-red transition-all rounded-2xs overflow-hidden shadow-sm">
                    
                    {/* TOP CONTROL BAR FOR EDITING / REORDERING / DELETING */}
                    <div className="bg-[#151513] text-white px-4 py-2 flex items-center justify-between gap-4 border-b border-neutral-800">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-maple-gold flex-shrink-0" />
                        <span className="text-xs font-bold text-maple-gold truncate">
                          KHỐI 0{idx + 1}: {block.type} — {block.title_vi || block.title_en || block.title || 'Khối Nội dung Section'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {/* Move Up */}
                        <button
                          type="button"
                          onClick={() => handleMoveSectionUp(idx)}
                          disabled={idx === 0}
                          className="px-2.5 py-1 h-7 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white text-xs font-semibold rounded-2xs border border-neutral-700 inline-flex items-center gap-1 whitespace-nowrap transition-colors"
                          title="Chuyển Khối Lên Trên"
                        >
                          <MoveUp size={13} /> Lên
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          onClick={() => handleMoveSectionDown(idx)}
                          disabled={idx === (activePage.sectionsStack?.length || 0) - 1}
                          className="px-2.5 py-1 h-7 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white text-xs font-semibold rounded-2xs border border-neutral-700 inline-flex items-center gap-1 whitespace-nowrap transition-colors"
                          title="Chuyển Khối Xuống Dưới"
                        >
                          <MoveDown size={13} /> Xuống
                        </button>

                        {/* Edit Content */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSectionIdx(idx)
                            setLeftTab('FIELDS')
                          }}
                          className="px-3 py-1 h-7 bg-maple-red hover:bg-red-700 text-white text-xs font-semibold rounded-2xs inline-flex items-center gap-1 border border-maple-red whitespace-nowrap transition-colors shadow-2xs"
                          title="Chỉnh sửa Chi tiết Nội dung Khối"
                        >
                          <Edit3 size={13} /> Sửa Khối
                        </button>

                        {/* Delete Block */}
                        <button
                          type="button"
                          onClick={() => handleDeleteSection(idx)}
                          className="px-2.5 py-1 h-7 bg-neutral-800 hover:bg-red-900 text-neutral-300 hover:text-white border border-neutral-700 rounded-2xs text-xs font-semibold inline-flex items-center gap-1 whitespace-nowrap transition-colors"
                          title="Xóa Khối Này"
                        >
                          <Trash2 size={13} /> Xóa
                        </button>
                      </div>
                    </div>

                    {/* SECTION PREVIEW */}
                    <div className="p-2 sm:p-4 bg-white overflow-hidden">
                      <SectionRenderer blocks={[block]} />
                    </div>

                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-white border border-neutral-200 text-neutral-500 text-xs">
                  Trang này chưa có Khối Section nào. Hãy nhấp nút thêm bên dưới để chọn Khối Widget.
                </div>
              )}

              {/* ADD NEW BLOCK BUTTON */}
              <button
                type="button"
                onClick={() => setLeftTab('WIDGETS')}
                className="w-full py-4 border-2 border-dashed border-neutral-400 hover:border-maple-red bg-white hover:bg-[#FDFBF7] text-neutral-600 hover:text-maple-red text-xs font-bold transition-all flex items-center justify-center gap-2 rounded-2xs shadow-2xs mt-8"
              >
                <Plus size={16} /> Nhấp để thêm Khối Widget Nội dung Mới vào Trang
              </button>
            </div>

          </div>

        </div>

      </div>
    )
  }

  // -------------------------------------------------------------
  // VIEW 2: STATIC PAGES LISTING TABLE (ALL 14 PAGES)
  // -------------------------------------------------------------
  return (
    <div className="space-y-4 w-full text-[#1D1D1B]">
      
      {/* Header */}
      <div className="bg-white border border-neutral-200 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red block">
            {adminUiLang === 'vi' ? 'Quản lý Trang Tĩnh CMS' : 'Static Pages CMS'}
          </span>
          <h2 className="text-xl font-display font-bold text-[#1D1D1B]">
            {adminUiLang === 'vi' ? `Quản lý Nội dung ${pages.length} Trang Tĩnh Website` : `Static Information Pages Manager (${pages.length} Pages)`}
          </h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">
            {adminUiLang === 'vi'
              ? 'Tùy chỉnh cấu trúc section block hoặc xem trang chuyển đổi từ bài viết blog.'
              : 'Edit section block stacks or manage pages converted from blog posts.'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-[#1D1D1B] text-white text-xs font-semibold hover:bg-maple-red transition-colors border border-[#1D1D1B] flex items-center gap-1.5 rounded-2xs shadow-2xs"
          >
            <Plus size={15} />
            {adminUiLang === 'vi' ? 'Thêm Trang Tĩnh Mới' : 'Add New Static Page'}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white border border-neutral-200 p-3 shadow-2xs">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder={adminUiLang === 'vi' ? 'Tìm kiếm trang theo đường dẫn slug hoặc tiêu đề...' : 'Search static pages by route or title...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold p-1.5 focus:outline-none"
          >
            <option value="ALL">{adminUiLang === 'vi' ? `Tất cả Chuyên mục (${pages.length})` : `All Categories (${pages.length})`}</option>
            <option value="ABOUT US">About Us (4 Pages)</option>
            <option value="ACADEMICS">Academics (5 Pages)</option>
            <option value="ADMISSIONS">Admissions (3 Pages)</option>
            <option value="COMMUNITY">Community (2 Pages)</option>
          </select>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden shadow-2xs rounded-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-600 font-semibold bg-[#FDFBF7]">
              <th className="py-2.5 px-3">{adminUiLang === 'vi' ? 'Đường dẫn Slug' : 'Route Path'}</th>
              <th className="py-2.5 px-3">{adminUiLang === 'vi' ? 'Tiêu đề trang' : 'Page Title'}</th>
              <th className="py-2.5 px-3">{adminUiLang === 'vi' ? 'Chuyên mục' : 'Category'}</th>
              <th className="py-2.5 px-3">{adminUiLang === 'vi' ? 'Loại Trang CMS' : 'Page CMS Type'}</th>
              <th className="py-2.5 px-3">{adminUiLang === 'vi' ? 'Cập nhật' : 'Last Updated'}</th>
              <th className="py-2.5 px-3">{adminUiLang === 'vi' ? 'Trạng thái' : 'Status'}</th>
              <th className="py-2.5 px-3 text-right">{adminUiLang === 'vi' ? 'Thao tác' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 font-medium text-[#1D1D1B]">
            {filteredPages.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-2.5 px-3 font-mono font-bold text-maple-red">{p.path}</td>
                <td className="py-2.5 px-3 font-semibold">{p.title}</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-[10px] font-semibold rounded-2xs">
                    {p.category}
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  {p.pageType === 'BLOG_CONVERTED' ? (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-900 border border-purple-300 text-[10px] font-semibold rounded-2xs inline-flex items-center gap-1">
                      📰 Chuyển từ Blog
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-semibold rounded-2xs inline-flex items-center gap-1">
                      🧩 Section Builder
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-3 text-neutral-500 font-mono">{p.lastUpdated}</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded-2xs">
                    {adminUiLang === 'vi' ? 'Đã xuất bản' : p.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right space-x-1.5">
                  <button
                    onClick={() => setActivePageId(p.id)}
                    className="px-2.5 py-1 bg-[#1D1D1B] text-white hover:bg-maple-red font-semibold text-xs transition-colors border border-[#1D1D1B] inline-flex items-center gap-1.5 rounded-2xs shadow-2xs"
                  >
                    <Edit3 size={13} />
                    {adminUiLang === 'vi' ? 'Mở Trình biên tập' : 'Open Visual Builder'}
                  </button>

                  <button
                    onClick={() => handleDeletePage(p.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors inline-block"
                    title={adminUiLang === 'vi' ? 'Xóa trang tĩnh' : 'Delete Static Page'}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE NEW STATIC PAGE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 max-w-md w-full p-5 space-y-4 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-200 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-semibold text-maple-red block">Khởi tạo Trang Tĩnh Mới</span>
                <h3 className="text-base font-display font-bold text-[#1D1D1B]">Thêm Trang Tĩnh vào Hệ thống</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-black">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Tiêu đề Trang *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Câu lạc bộ Ngoại khóa & Thể thao"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Đường dẫn Route URL Slug *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /academics/extracurricular"
                  value={newPagePath}
                  onChange={(e) => setNewPagePath(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Chuyên mục Danh mục *</label>
                <select
                  value={newPageCategory}
                  onChange={(e) => setNewPageCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                >
                  <option value="ABOUT US">Về chúng tôi (About Us)</option>
                  <option value="ACADEMICS">Chương trình học (Academics)</option>
                  <option value="ADMISSIONS">Tuyển sinh (Admissions)</option>
                  <option value="COMMUNITY">Cộng đồng (Community)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 bg-neutral-100 text-[#1D1D1B] font-semibold text-xs border border-neutral-300 rounded-2xs"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white font-semibold text-xs border border-[#1D1D1B] transition-colors flex items-center gap-1.5 rounded-2xs shadow-2xs"
                >
                  <Plus size={14} />
                  Tạo Trang & Mở Builder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
