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
  Monitor,
  Star,
  FolderPlus,
  Tag,
  Folder,
  Copy,
  Languages,
  Check
} from 'lucide-react'
import { SectionRenderer } from '@/components/sections/SectionRenderer'
import { staticPagesRegistry } from '@/lib/static-pages-data'
import { PageSectionBlock } from '@/lib/supabase'
import {
  getHomepageSectionsConfig,
  saveHomepageSectionsConfig,
  getHomepageVariants,
  saveHomepageVariants,
  HomepageSection,
  HomepageVariant,
  INITIAL_HOMEPAGE_SECTIONS
} from '@/lib/homepage-builder'

type CategoryItem = {
  id: string
  name_vi: string
  name_en: string
}

type StaticPage = {
  id: string
  path: string
  title: string
  title_vi?: string
  title_en?: string
  category: string
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

const initialCategoryItems: CategoryItem[] = [
  { id: 'cat-about', name_vi: 'Giới Thiệu', name_en: 'About Us' },
  { id: 'cat-academics', name_vi: 'Chương Trình Học', name_en: 'Academics' },
  { id: 'cat-admissions', name_vi: 'Tuyển Sinh & Tour', name_en: 'Admissions' },
  { id: 'cat-community', name_vi: 'Cộng Đồng Phụ Huynh', name_en: 'Community' }
]

const initialPages: StaticPage[] = Object.values(staticPagesRegistry) as any

export default function AdminPagesPage() {
  const [pages, setPages] = useState<StaticPage[]>(initialPages)
  const [activeTabMode, setActiveTabMode] = useState<'HOMEPAGE_BUILDER' | 'PAGES_TABLE'>('HOMEPAGE_BUILDER')
  const [activePageId, setActivePageId] = useState<string | null>(null)
  const [leftTab, setLeftTab] = useState<'WIDGETS' | 'FIELDS' | 'SEO'>('WIDGETS')
  const [editingSectionIdx, setEditingSectionIdx] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL')
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategoryItems)

  const [savedSuccess, setSavedSuccess] = useState(false)
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true)
  const [adminUiLang, setAdminUiLang] = useState<'vi' | 'en'>('vi')

  // Homepage Builder & Variant State
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>([])
  const [homepageVariants, setHomepageVariants] = useState<HomepageVariant[]>([])

  // Modal States
  const [showAddPageModal, setShowAddPageModal] = useState(false)
  const [showAddVariantModal, setShowAddVariantModal] = useState(false)
  const [showManageCategoryModal, setShowManageCategoryModal] = useState(false)

  // New Page State
  const [newPageTitleVi, setNewPageTitleVi] = useState('')
  const [newPageTitleEn, setNewPageTitleEn] = useState('')
  const [newPagePath, setNewPagePath] = useState('')
  const [newPageCategory, setNewPageCategory] = useState<string>('Giới Thiệu')

  // New Variant State
  const [newVariantTitleVi, setNewVariantTitleVi] = useState('')
  const [newVariantTitleEn, setNewVariantTitleEn] = useState('')
  const [newVariantSlug, setNewVariantSlug] = useState('')
  const [newVariantDescVi, setNewVariantDescVi] = useState('')
  const [newVariantDescEn, setNewVariantDescEn] = useState('')

  // Category State
  const [newCatVi, setNewCatVi] = useState('')
  const [newCatEn, setNewCatEn] = useState('')
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [editingCatVi, setEditingCatVi] = useState('')
  const [editingCatEn, setEditingCatEn] = useState('')

  useEffect(() => {
    const saved = (localStorage.getItem('smb_admin_ui_lang') as 'vi' | 'en') || 'vi'
    setAdminUiLang(saved)

    setHomepageSections(getHomepageSectionsConfig().sort((a, b) => a.order - b.order))
    setHomepageVariants(getHomepageVariants())

    const handleLangChange = (e: CustomEvent) => {
      if (e.detail === 'vi' || e.detail === 'en') {
        setAdminUiLang(e.detail)
      }
    }

    window.addEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
    return () => window.removeEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
  }, [])

  // -------------------------------------------------------------
  // HOMEPAGE VARIANT HANDLERS
  // -------------------------------------------------------------
  const handleSetDefaultVariant = (variantId: string) => {
    const selectedVariant = homepageVariants.find(v => v.id === variantId)
    if (!selectedVariant) return

    const updated = homepageVariants.map(v => ({
      ...v,
      isDefault: v.id === variantId
    }))
    setHomepageVariants(updated)
    saveHomepageVariants(updated)

    if (selectedVariant.sectionsConfig) {
      setHomepageSections(selectedVariant.sectionsConfig.sort((a, b) => a.order - b.order))
      saveHomepageSectionsConfig(selectedVariant.sectionsConfig)
    }
    window.dispatchEvent(new Event('smbHomepageConfigChange'))
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const handleDuplicateVariant = (variantId: string) => {
    const target = homepageVariants.find(v => v.id === variantId)
    if (!target) return

    const newVariant: HomepageVariant = {
      id: `variant-${Date.now()}`,
      title: `${target.title} (Bản Sao Demo)`,
      slug: `/homepage-demo-${Date.now().toString().slice(-4)}`,
      isDefault: false,
      updatedAt: new Date().toLocaleDateString('en-GB'),
      description: `Bản sao nhân bản từ [${target.title}] dùng để test cấu hình Trang Chủ.`,
      sectionsConfig: target.sectionsConfig ? JSON.parse(JSON.stringify(target.sectionsConfig)) : [...INITIAL_HOMEPAGE_SECTIONS]
    }

    const updated = [...homepageVariants, newVariant]
    setHomepageVariants(updated)
    saveHomepageVariants(updated)
  }

  const handleCreateVariant = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newVariantTitleVi || !newVariantSlug) return
    const formattedSlug = newVariantSlug.startsWith('/') ? newVariantSlug : `/${newVariantSlug}`
    const titleCombined = adminUiLang === 'en' && newVariantTitleEn ? newVariantTitleEn : newVariantTitleVi
    const newVariant: HomepageVariant = {
      id: `variant-${Date.now()}`,
      title: titleCombined,
      slug: formattedSlug,
      isDefault: false,
      updatedAt: new Date().toLocaleDateString('en-GB'),
      description: newVariantDescVi || newVariantDescEn || 'Biến thể trang chủ mới tạo.',
      sectionsConfig: [...INITIAL_HOMEPAGE_SECTIONS]
    }
    const updated = [...homepageVariants, newVariant]
    setHomepageVariants(updated)
    saveHomepageVariants(updated)
    setShowAddVariantModal(false)
    setNewVariantTitleVi('')
    setNewVariantTitleEn('')
    setNewVariantSlug('')
    setNewVariantDescVi('')
    setNewVariantDescEn('')
  }

  const handleDeleteVariant = (variantId: string) => {
    const target = homepageVariants.find(v => v.id === variantId)
    if (target?.isDefault) {
      alert(adminUiLang === 'vi' ? 'Không thể xóa biến thể đang là Trang Chủ Mặc Định!' : 'Cannot delete active default homepage!')
      return
    }
    if (confirm(adminUiLang === 'vi' ? 'Bạn có chắc chắn muốn xóa biến thể trang chủ này?' : 'Are you sure you want to delete this variant?')) {
      const updated = homepageVariants.filter(v => v.id !== variantId)
      setHomepageVariants(updated)
      saveHomepageVariants(updated)
    }
  }

  const handleToggleSectionEnabled = (secId: string) => {
    const updated = homepageSections.map(s => s.id === secId ? { ...s, enabled: !s.enabled } : s)
    setHomepageSections(updated)
    saveHomepageSectionsConfig(updated)

    const activeVar = homepageVariants.find(v => v.isDefault)
    if (activeVar) {
      activeVar.sectionsConfig = updated
      saveHomepageVariants(homepageVariants)
    }

    window.dispatchEvent(new Event('smbHomepageConfigChange'))
  }

  const handleMoveHomepageSectionUp = (idx: number) => {
    if (idx === 0) return
    const copy = [...homepageSections]
    const tempOrder = copy[idx].order
    copy[idx].order = copy[idx - 1].order
    copy[idx - 1].order = tempOrder
    copy.sort((a, b) => a.order - b.order)
    setHomepageSections(copy)
    saveHomepageSectionsConfig(copy)

    const activeVar = homepageVariants.find(v => v.isDefault)
    if (activeVar) {
      activeVar.sectionsConfig = copy
      saveHomepageVariants(homepageVariants)
    }

    window.dispatchEvent(new Event('smbHomepageConfigChange'))
  }

  const handleMoveHomepageSectionDown = (idx: number) => {
    if (idx >= homepageSections.length - 1) return
    const copy = [...homepageSections]
    const tempOrder = copy[idx].order
    copy[idx].order = copy[idx + 1].order
    copy[idx + 1].order = tempOrder
    copy.sort((a, b) => a.order - b.order)
    setHomepageSections(copy)
    saveHomepageSectionsConfig(copy)

    const activeVar = homepageVariants.find(v => v.isDefault)
    if (activeVar) {
      activeVar.sectionsConfig = copy
      saveHomepageVariants(homepageVariants)
    }

    window.dispatchEvent(new Event('smbHomepageConfigChange'))
  }

  // -------------------------------------------------------------
  // CATEGORY HANDLERS (BILINGUAL)
  // -------------------------------------------------------------
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatVi) return
    const newCatItem: CategoryItem = {
      id: `cat-${Date.now()}`,
      name_vi: newCatVi.trim(),
      name_en: newCatEn.trim() || newCatVi.trim()
    }
    setCategories([...categories, newCatItem])
    setNewCatVi('')
    setNewCatEn('')
  }

  const handleSaveEditCategory = (catId: string) => {
    if (!editingCatVi) return
    setCategories(categories.map(c => c.id === catId ? { ...c, name_vi: editingCatVi, name_en: editingCatEn || editingCatVi } : c))
    setEditingCatId(null)
  }

  const handleDeleteCategory = (catId: string) => {
    if (categories.length <= 1) {
      alert(adminUiLang === 'vi' ? 'Phải giữ lại ít nhất 1 chuyên mục!' : 'Must keep at least 1 category!')
      return
    }
    setCategories(categories.filter(c => c.id !== catId))
  }

  const handleUpdatePageCategory = (pageId: string, newCat: string) => {
    setPages(pages.map(p => p.id === pageId ? { ...p, category: newCat } : p))
  }

  // -------------------------------------------------------------
  // STATIC PAGE HANDLERS
  // -------------------------------------------------------------
  const handleTogglePageStatus = (pageId: string) => {
    setPages(pages.map(p => {
      if (p.id === pageId) {
        return {
          ...p,
          status: p.status === 'Published' ? 'Draft' : 'Published'
        }
      }
      return p
    }))
  }

  const activePage = pages.find(p => p.id === activePageId)

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPageTitleVi || !newPagePath) return
    const formattedPath = newPagePath.startsWith('/') ? newPagePath : `/${newPagePath}`
    const pageTitle = adminUiLang === 'en' && newPageTitleEn ? newPageTitleEn : newPageTitleVi
    const newPage: StaticPage = {
      id: `page-${Date.now()}`,
      path: formattedPath,
      title: pageTitle,
      title_vi: newPageTitleVi,
      title_en: newPageTitleEn,
      category: newPageCategory,
      status: 'Published',
      pageType: 'SECTION_BUILDER',
      lastUpdated: new Date().toLocaleDateString('en-GB'),
      bannerTag: 'CANADIAN PRESCHOOL PROGRAM',
      bannerTitle: pageTitle,
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
      seoTitle: `${pageTitle} | Sunshine Maple Bear Hanoi`,
      seoDescription: `Learn about ${pageTitle} at Sunshine Maple Bear International Kindergarten Hanoi.`,
      ogImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
      sectionsStack: [
        { id: `sec-${Date.now()}-1`, type: 'HERO', title_vi: `${newPageTitleVi} Hero Banner`, title_en: `${newPageTitleEn || pageTitle} Hero Banner` },
        { id: `sec-${Date.now()}-2`, type: 'BODY', title_vi: 'Đoạn Văn Chi Tiết', title_en: 'Main Description Paragraph' },
        { id: `sec-${Date.now()}-3`, type: 'CTA', title_vi: 'Khối Đặt Tour Tham Quan', title_en: 'Tour Booking Call-To-Action' }
      ]
    }

    setPages([newPage, ...pages])
    setShowAddPageModal(false)
    setNewPageTitleVi('')
    setNewPageTitleEn('')
    setNewPagePath('')
    setActivePageId(newPage.id)
  }

  const handleDeletePage = (id: string) => {
    if (confirm(adminUiLang === 'vi' ? 'Bạn có chắc chắn muốn xóa trang này khỏi hệ thống?' : 'Are you sure you want to delete this page?')) {
      setPages(pages.filter(p => p.id !== id))
      if (activePageId === id) setActivePageId(null)
    }
  }

  const handleUpdatePageField = (field: keyof StaticPage, value: any) => {
    if (!activePage) return
    setPages(pages.map(p => p.id === activePage.id ? { ...p, [field]: value } : p))
  }

  const handleAddSectionBlock = (type: SectionBlock['type']) => {
    if (!activePage) return
    const currentStack = activePage.sectionsStack || []
    const newBlock: PageSectionBlock = {
      id: `sec-${Date.now()}`,
      type: type,
      title_vi: type === 'HERO' ? 'Khối Hero Banner Mới' : type === 'FEATURES' ? 'Khối Tính Năng Nổi Bật' : 'Khối Nội Dung Section',
      title_en: type === 'HERO' ? 'New Hero Banner Section' : type === 'FEATURES' ? 'Key Features Grid' : 'Section Content Block'
    }

    const updatedPage = {
      ...activePage,
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
    const matchesCat = categoryFilter === 'ALL' || p.category.toLowerCase().includes(categoryFilter.toLowerCase())
    return matchesSearch && matchesCat
  })

  // Helper function for category localized name
  const getCategoryDisplayName = (cat: CategoryItem) => {
    return adminUiLang === 'en' ? cat.name_en : cat.name_vi
  }

  // -------------------------------------------------------------
  // VIEW 1: VISUAL BUILDER WORKSPACE
  // -------------------------------------------------------------
  if (activePage) {
    return (
      <div className="space-y-4 text-[#1D1D1B] w-full">
        
        {/* Top Control Header Bar */}
        <div className="bg-[#151513] text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-800 shadow-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActivePageId(null)}
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white transition-colors flex items-center gap-1.5 text-xs font-bold border border-neutral-700 rounded-2xs"
            >
              <ArrowLeft size={16} /> {adminUiLang === 'vi' ? 'Thoát Builder' : 'Exit Builder'}
            </button>

            <button
              onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
              className="px-3.5 py-2 bg-maple-gold/20 hover:bg-maple-gold hover:text-[#1D1D1B] text-maple-gold border border-maple-gold/40 transition-colors text-xs font-bold flex items-center gap-1.5 rounded-2xs"
            >
              <LayoutGrid size={14} />
              {isLeftPanelOpen
                ? (adminUiLang === 'vi' ? '◀ Thu Gọn Panel' : '◀ Collapse Panel')
                : (adminUiLang === 'vi' ? '▶ Mở Panel Builder' : '▶ Expand Panel')}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-maple-gold">{activePage.path}</span>
              </div>
              <h2 className="text-lg font-display font-extrabold text-white">
                {adminUiLang === 'en' && activePage.title_en ? activePage.title_en : (activePage.title_vi || activePage.title)}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={activePage.path}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white transition-colors flex items-center gap-1.5 text-xs font-bold border border-neutral-700 rounded-2xs"
            >
              <Eye size={15} /> {adminUiLang === 'vi' ? 'Xem Live ↗' : 'View Live ↗'}
            </a>

            <button
              onClick={handleSavePage}
              className="px-4 py-2 bg-maple-red hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md rounded-2xs"
            >
              <Save size={16} /> {adminUiLang === 'vi' ? 'Lưu Thay Đổi' : 'Save Changes'}
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 rounded-2xs animate-fade-in">
            <CheckCircle2 size={16} /> {adminUiLang === 'vi' ? `Đã lưu thành công nội dung trang [${activePage.title}] vào hệ thống!` : `Successfully saved page [${activePage.title}]!`}
          </div>
        )}

        {/* Builder Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* Left Sidebar */}
          {isLeftPanelOpen && (
            <div className="lg:col-span-4 bg-white border border-neutral-300 rounded-2xs shadow-md overflow-hidden space-y-4">
              <div className="flex border-b border-neutral-200 bg-[#FDFBF7]">
                <button
                  onClick={() => setLeftTab('WIDGETS')}
                  className={`flex-1 py-2.5 text-xs font-extrabold border-b-2 transition-colors ${
                    leftTab === 'WIDGETS' ? 'border-maple-red text-maple-red bg-white' : 'border-transparent text-neutral-600'
                  }`}
                >
                  🧩 Widgets
                </button>
                <button
                  onClick={() => setLeftTab('FIELDS')}
                  className={`flex-1 py-2.5 text-xs font-extrabold border-b-2 transition-colors ${
                    leftTab === 'FIELDS' ? 'border-maple-red text-maple-red bg-white' : 'border-transparent text-neutral-600'
                  }`}
                >
                  ✍️ {adminUiLang === 'vi' ? 'Nội dung' : 'Content'}
                </button>
                <button
                  onClick={() => setLeftTab('SEO')}
                  className={`flex-1 py-2.5 text-xs font-extrabold border-b-2 transition-colors ${
                    leftTab === 'SEO' ? 'border-maple-red text-maple-red bg-white' : 'border-transparent text-neutral-600'
                  }`}
                >
                  🔍 SEO Tags
                </button>
              </div>

              {/* TAB 1: ADD WIDGET BLOCKS */}
              {leftTab === 'WIDGETS' && (
                <div className="p-4 space-y-3 max-h-[75vh] overflow-y-auto">
                  <div className="border-b border-neutral-200 pb-2">
                    <span className="text-[10px] font-bold text-maple-red uppercase tracking-wider block">Elementor Widget Library</span>
                    <h4 className="text-sm font-display font-extrabold text-[#1D1D1B]">
                      {adminUiLang === 'vi' ? 'Thêm Khối Section Mới Vào Trang' : 'Add New Section Block to Page'}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddSectionBlock('HERO')}
                      className="p-3 bg-[#FDFBF7] hover:bg-red-50 border border-neutral-300 hover:border-maple-red text-left rounded-2xs space-y-1 transition-all"
                    >
                      <ImageIcon size={18} className="text-maple-red" />
                      <div className="font-bold text-xs text-maple-black">Hero Banner</div>
                      <div className="text-[10px] text-neutral-500">Headline & CTA</div>
                    </button>

                    <button
                      onClick={() => handleAddSectionBlock('FEATURES')}
                      className="p-3 bg-[#FDFBF7] hover:bg-red-50 border border-neutral-300 hover:border-maple-red text-left rounded-2xs space-y-1 transition-all"
                    >
                      <LayoutGrid size={18} className="text-maple-gold" />
                      <div className="font-bold text-xs text-maple-black">Features Grid</div>
                      <div className="text-[10px] text-neutral-500">3 Feature Cards</div>
                    </button>

                    <button
                      onClick={() => handleAddSectionBlock('BODY')}
                      className="p-3 bg-[#FDFBF7] hover:bg-red-50 border border-neutral-300 hover:border-maple-red text-left rounded-2xs space-y-1 transition-all"
                    >
                      <FileText size={18} className="text-blue-600" />
                      <div className="font-bold text-xs text-maple-black">Body Text</div>
                      <div className="text-[10px] text-neutral-500">Detailed Paragraph</div>
                    </button>

                    <button
                      onClick={() => handleAddSectionBlock('CTA')}
                      className="p-3 bg-[#FDFBF7] hover:bg-red-50 border border-neutral-300 hover:border-maple-red text-left rounded-2xs space-y-1 transition-all"
                    >
                      <Sparkles size={18} className="text-purple-600" />
                      <div className="font-bold text-xs text-maple-black">CTA Banner</div>
                      <div className="text-[10px] text-neutral-500">Tour Booking Form</div>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: EDIT CONTENT FIELDS */}
              {leftTab === 'FIELDS' && (
                <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
                  <div className="border-b border-neutral-200 pb-2">
                    <span className="text-[10px] font-bold text-maple-gold uppercase tracking-wider block">
                      {adminUiLang === 'vi' ? 'Biên Tập Song Ngữ' : 'Bilingual Editing'}
                    </span>
                    <h4 className="text-sm font-display font-extrabold text-[#1D1D1B]">
                      {adminUiLang === 'vi' ? `Khối Số ${editingSectionIdx + 1}` : `Block #${editingSectionIdx + 1}`}
                    </h4>
                  </div>

                  {activePage.sectionsStack?.[editingSectionIdx] && (() => {
                    const activeBlock = activePage.sectionsStack![editingSectionIdx]
                    return (
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">🇻🇳 Tiêu Đề (Tiếng Việt):</label>
                          <input
                            type="text"
                            value={activeBlock.title_vi || ''}
                            onChange={(e) => handleUpdateSectionBlockField(editingSectionIdx, 'title_vi', e.target.value)}
                            className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black rounded-2xs"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">🇬🇧 Title (English):</label>
                          <input
                            type="text"
                            value={activeBlock.title_en || ''}
                            onChange={(e) => handleUpdateSectionBlockField(editingSectionIdx, 'title_en', e.target.value)}
                            className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black rounded-2xs"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">🇻🇳 Mô Tả Intro (Tiếng Việt):</label>
                          <textarea
                            rows={3}
                            value={activeBlock.intro_vi || ''}
                            onChange={(e) => handleUpdateSectionBlockField(editingSectionIdx, 'intro_vi', e.target.value)}
                            className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-medium text-maple-black rounded-2xs"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">🇨🇦 Intro Description (English):</label>
                          <textarea
                            rows={3}
                            value={activeBlock.intro_en || ''}
                            onChange={(e) => handleUpdateSectionBlockField(editingSectionIdx, 'intro_en', e.target.value)}
                            className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-medium text-maple-black rounded-2xs"
                          />
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* TAB 3: SEO TAGS */}
              {leftTab === 'SEO' && (
                <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
                  <div className="border-b border-neutral-200 pb-2">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">SEO Suite</span>
                    <h4 className="text-sm font-display font-extrabold text-[#1D1D1B]">Meta Tags & Snippets</h4>
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">SEO Title Tag:</label>
                    <input
                      type="text"
                      value={activePage.seoTitle}
                      onChange={(e) => handleUpdatePageField('seoTitle', e.target.value)}
                      className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black rounded-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">SEO Meta Description:</label>
                    <textarea
                      rows={3}
                      value={activePage.seoDescription}
                      onChange={(e) => handleUpdatePageField('seoDescription', e.target.value)}
                      className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-medium text-maple-black rounded-2xs"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right Main Canvas Preview */}
          <div className={isLeftPanelOpen ? 'lg:col-span-8' : 'lg:col-span-12'}>
            <div className="space-y-4">
              {activePage.sectionsStack && activePage.sectionsStack.length > 0 ? (
                activePage.sectionsStack.map((block, idx) => (
                  <div
                    key={block.id || idx}
                    className={`border rounded-2xs transition-all relative overflow-hidden bg-white ${
                      editingSectionIdx === idx ? 'border-maple-red ring-2 ring-maple-red/20 shadow-md' : 'border-neutral-300'
                    }`}
                  >
                    <div className="bg-[#151513] text-white px-4 py-2.5 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-maple-red text-white font-mono font-bold text-[10px] rounded-full flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-maple-gold">{block.type}</span>
                        <span className="text-neutral-400 font-normal">
                          — {adminUiLang === 'en' ? (block.title_en || block.title_vi) : (block.title_vi || block.title_en)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleMoveSectionUp(idx)}
                          disabled={idx === 0}
                          className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white text-[10px] font-bold rounded-2xs border border-neutral-700 flex items-center gap-1"
                        >
                          <MoveUp size={12} /> {adminUiLang === 'vi' ? 'Lên' : 'Up'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveSectionDown(idx)}
                          disabled={idx === (activePage.sectionsStack?.length || 0) - 1}
                          className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white text-[10px] font-bold rounded-2xs border border-neutral-700 flex items-center gap-1"
                        >
                          <MoveDown size={12} /> {adminUiLang === 'vi' ? 'Xuống' : 'Down'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingSectionIdx(idx)
                            setLeftTab('FIELDS')
                          }}
                          className="px-2.5 py-1 bg-maple-red hover:bg-red-700 text-white text-[10px] font-bold rounded-2xs flex items-center gap-1"
                        >
                          <Edit3 size={12} /> {adminUiLang === 'vi' ? 'Sửa Nội Dung' : 'Edit'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteSection(idx)}
                          className="p-1 bg-neutral-800 hover:bg-red-900 text-neutral-400 hover:text-white rounded-2xs transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <SectionRenderer blocks={[block]} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-white border border-neutral-200 text-neutral-500 text-xs rounded-2xs">
                  {adminUiLang === 'vi' ? 'Trang này chưa có Khối Section nào.' : 'This page has no section blocks yet.'}
                </div>
              )}

              <button
                type="button"
                onClick={() => setLeftTab('WIDGETS')}
                className="w-full py-4 border-2 border-dashed border-neutral-400 hover:border-maple-red bg-white hover:bg-[#FDFBF7] text-neutral-600 hover:text-maple-red text-xs font-bold transition-all flex items-center justify-center gap-2 rounded-2xs shadow-2xs"
              >
                <Plus size={16} /> {adminUiLang === 'vi' ? 'Thêm Khối Section Nội Dung Mới Vào Trang' : 'Add New Section Block'}
              </button>
            </div>
          </div>

        </div>

      </div>
    )
  }

  // -------------------------------------------------------------
  // VIEW 2: UNIFIED SLEEK STATIC PAGES & HOMEPAGE MANAGEMENT TABLE
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 w-full text-[#1D1D1B] animate-fade-in pb-12">
      
      {savedSuccess && (
        <div className="p-3 bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 rounded-2xs shadow-md animate-fade-in">
          <CheckCircle2 size={16} />
          {adminUiLang === 'vi' ? 'Đã kích hoạt bản Trang Chủ Mặc Định thành công tại route live `/`!' : 'Active default homepage updated at `/`!'}
        </div>
      )}

      {/* Navigation Mode Tabs */}
      <div className="flex border-b border-neutral-200 bg-white rounded-2xs shadow-2xs overflow-hidden">
        <button
          onClick={() => setActiveTabMode('HOMEPAGE_BUILDER')}
          className={`py-3.5 px-6 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 ${
            activeTabMode === 'HOMEPAGE_BUILDER'
              ? 'border-maple-red text-maple-red bg-white'
              : 'border-transparent text-neutral-500 hover:text-maple-black bg-[#FDFBF7]'
          }`}
        >
          <Settings2 size={16} />
          {adminUiLang === 'vi' ? '⚙️ Cấu Hình Section Builder Trang Chủ (Homepage Manager)' : '⚙️ Homepage Builder Manager'}
        </button>
        <button
          onClick={() => setActiveTabMode('PAGES_TABLE')}
          className={`py-3.5 px-6 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 ${
            activeTabMode === 'PAGES_TABLE'
              ? 'border-maple-red text-maple-red bg-white'
              : 'border-transparent text-neutral-500 hover:text-maple-black bg-[#FDFBF7]'
          }`}
        >
          <Globe size={16} />
          {adminUiLang === 'vi' ? `📄 Danh Sách 14 Trang Tĩnh Website (${pages.length})` : `📄 Static Pages List (${pages.length})`}
        </button>
      </div>

      {/* MODE 1: DEDICATED HOMEPAGE SECTION BUILDER & DYNAMIC VARIANTS TABLE */}
      {activeTabMode === 'HOMEPAGE_BUILDER' && (
        <div className="space-y-6">
          
          {/* Dynamic Homepage Variants List Panel */}
          <div className="bg-white border border-neutral-200 p-6 rounded-2xs shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-maple-red uppercase tracking-wider block">DYNAMIC HOMEPAGE VARIANTS</span>
                <h3 className="text-base font-display font-extrabold text-maple-black">
                  {adminUiLang === 'vi' ? 'Danh Sách Các Bản Trang Chủ & Lựa Chọn Trang Chủ Live (`/`)' : 'Homepage Variants & Active Default Selection (`/`)'}
                </h3>
              </div>
              
              <button
                onClick={() => setShowAddVariantModal(true)}
                className="px-4 py-2 bg-[#151513] text-white hover:bg-maple-red text-xs font-extrabold rounded-2xs transition-all flex items-center gap-1.5 shadow-2xs uppercase tracking-wider"
              >
                <Plus size={15} /> {adminUiLang === 'vi' ? 'Thêm Biến Thể Trang Chủ Mới' : 'Add New Homepage Variant'}
              </button>
            </div>

            {/* Homepage Variants Clean Table */}
            <div className="bg-white border border-neutral-200 overflow-hidden rounded-2xs shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#151513] text-white text-[11px] font-extrabold uppercase tracking-wider border-b border-neutral-800">
                    <th className="py-3.5 px-4">{adminUiLang === 'vi' ? 'Đường Dẫn Route' : 'Route Path'}</th>
                    <th className="py-3.5 px-4">{adminUiLang === 'vi' ? 'Tên Bản Trang Chủ' : 'Variant Name'}</th>
                    <th className="py-3.5 px-4">{adminUiLang === 'vi' ? 'Mô Tả Mục Tiêu Chiến Dịch' : 'Campaign Goal'}</th>
                    <th className="py-3.5 px-4 text-center">{adminUiLang === 'vi' ? 'Trạng Thái Live' : 'Live Status'}</th>
                    <th className="py-3.5 px-4 text-center">{adminUiLang === 'vi' ? 'Thao Tác Biên Tập' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium text-[#1D1D1B]">
                  {homepageVariants.map((variant) => (
                    <tr
                      key={variant.id}
                      className={`transition-colors ${
                        variant.isDefault ? 'bg-red-50/40 hover:bg-red-50/60' : 'hover:bg-[#FDFBF7]'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold">
                        <span className="px-2 py-1 bg-neutral-100 text-maple-red border border-neutral-200 rounded-2xs text-xs inline-block">
                          {variant.slug}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-maple-black">
                        <div>{variant.title}</div>
                        {variant.isDefault && (
                          <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-0.5">
                            🟢 {adminUiLang === 'vi' ? 'Đang được phục vụ trực tiếp tại route `/`' : 'Currently live active at `/`'}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-600 font-light max-w-xs leading-relaxed">
                        {variant.description}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {variant.isDefault ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold rounded-2xs text-[10px]">
                            <CheckCircle2 size={12} className="text-emerald-700" /> 🟢 LIVE Ở `/`
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetDefaultVariant(variant.id)}
                            className="px-3 py-1 bg-white hover:bg-maple-gold hover:text-[#151513] border border-neutral-300 text-neutral-700 font-extrabold text-[10px] rounded-2xs transition-all shadow-2xs"
                          >
                            ★ {adminUiLang === 'vi' ? 'Đặt Làm Trang Chủ Live (`/`)' : 'Set as Live Default (`/`)'}
                          </button>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleDuplicateVariant(variant.id)}
                            className="px-2.5 py-1 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-[10px] font-extrabold rounded-2xs transition-all inline-flex items-center gap-1"
                            title="Nhân bản làm bản sao demo"
                          >
                            <Copy size={12} /> Duplicate Demo
                          </button>

                          {!variant.isDefault && (
                            <button
                              onClick={() => handleDeleteVariant(variant.id)}
                              className="p-1.5 rounded-2xs border border-neutral-200 text-neutral-400 hover:text-red-600 hover:bg-neutral-100 transition-colors"
                              title="Xóa biến thể"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Homepage Live Section Order & Visibility Controls */}
          <div className="bg-white border border-neutral-200 p-6 rounded-2xs shadow-2xs space-y-5">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-maple-gold uppercase tracking-wider block">SECTION BUILDER STACK</span>
                <h3 className="text-base font-display font-extrabold text-maple-black">
                  {adminUiLang === 'vi' ? 'Quản Lý Thứ Tự & Ẩn / Hiện Khối Section Trang Chủ' : 'Reorder & Toggle Homepage Section Blocks'}
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {homepageSections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className={`p-4 border rounded-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                    sec.enabled ? 'bg-white border-neutral-200 shadow-2xs' : 'bg-neutral-50 border-neutral-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-[#151513] text-maple-gold font-mono font-bold text-xs rounded-2xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-maple-black">{sec.name}</span>
                        {sec.enabled ? (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold rounded-2xs">
                            {adminUiLang === 'vi' ? 'Hiển thị' : 'Enabled'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-neutral-200 text-neutral-600 text-[10px] font-bold rounded-2xs">
                            {adminUiLang === 'vi' ? 'Đã ẩn' : 'Hidden'}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-500 font-light block mt-0.5">
                        {sec.customTitle || sec.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleMoveHomepageSectionUp(idx)}
                      disabled={idx === 0}
                      className="p-1.5 bg-white border border-neutral-300 hover:bg-[#FDFBF7] disabled:opacity-30 rounded-2xs transition-colors"
                      title="Chuyển Section lên trên"
                    >
                      <MoveUp size={14} />
                    </button>

                    <button
                      onClick={() => handleMoveHomepageSectionDown(idx)}
                      disabled={idx === homepageSections.length - 1}
                      className="p-1.5 bg-white border border-neutral-300 hover:bg-[#FDFBF7] disabled:opacity-30 rounded-2xs transition-colors"
                      title="Chuyển Section xuống dưới"
                    >
                      <MoveDown size={14} />
                    </button>

                    <button
                      onClick={() => handleToggleSectionEnabled(sec.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-2xs border transition-colors ${
                        sec.enabled
                          ? 'bg-maple-red text-white border-maple-red hover:bg-red-700'
                          : 'bg-neutral-200 text-neutral-700 border-neutral-300 hover:bg-neutral-300'
                      }`}
                    >
                      {sec.enabled
                        ? (adminUiLang === 'vi' ? 'Ẩn Section' : 'Hide Section')
                        : (adminUiLang === 'vi' ? 'Hiện Section' : 'Show Section')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODE 2: CLEAN STATIC PAGES TABLE WITH SONG NGU & CATEGORY MANAGEMENT */}
      {activeTabMode === 'PAGES_TABLE' && (
        <div className="space-y-6">
          
          {/* Header */}
          <div className="bg-white border border-neutral-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xs rounded-2xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
                <span className="text-xs font-bold text-maple-red uppercase tracking-wider">
                  {adminUiLang === 'vi' ? 'HỆ THỐNG CMS QUẢN LÝ TRANG TĨNH' : 'STATIC PAGES CMS ENGINE'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#1D1D1B]">
                {adminUiLang === 'vi' ? `Danh Sách ${pages.length} Trang Tĩnh Website` : `List of ${pages.length} Static Pages`}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowManageCategoryModal(true)}
                className="px-3.5 py-2.5 bg-white text-neutral-800 border border-neutral-300 hover:bg-[#FDFBF7] text-xs font-extrabold transition-all flex items-center gap-1.5 rounded-2xs shadow-2xs"
              >
                <FolderPlus size={15} /> {adminUiLang === 'vi' ? `Quản Lý Chuyên Mục (${categories.length})` : `Manage Categories (${categories.length})`}
              </button>

              <button
                onClick={() => setShowAddPageModal(true)}
                className="px-4 py-2.5 bg-[#151513] text-white text-xs font-extrabold hover:bg-maple-red transition-all flex items-center gap-2 rounded-2xs shadow-2xs uppercase tracking-wider"
              >
                <Plus size={16} />
                {adminUiLang === 'vi' ? 'Tạo Trang Mới' : 'Create New Page'}
              </button>
            </div>
          </div>

          {/* ULTRA CLEAN SEGMENTED CATEGORY FILTER BAR */}
          <div className="bg-white border border-neutral-200 p-4 rounded-2xs shadow-2xs flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            
            {/* Segmented Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <button
                onClick={() => setCategoryFilter('ALL')}
                className={`px-4 py-2 rounded-2xs transition-all ${
                  categoryFilter === 'ALL'
                    ? 'bg-[#151513] text-white shadow-xs'
                    : 'bg-[#FDFBF7] border border-neutral-200 text-neutral-600 hover:text-maple-black hover:border-neutral-300'
                }`}
              >
                {adminUiLang === 'vi' ? `Tất cả (${pages.length})` : `All (${pages.length})`}
              </button>

              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.name_vi)}
                  className={`px-4 py-2 rounded-2xs transition-all flex items-center gap-1.5 ${
                    categoryFilter === cat.name_vi
                      ? 'bg-[#151513] text-white shadow-xs'
                      : 'bg-[#FDFBF7] border border-neutral-200 text-neutral-600 hover:text-maple-black hover:border-neutral-300'
                  }`}
                >
                  <Folder size={13} className="text-maple-gold" />
                  {getCategoryDisplayName(cat)}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder={adminUiLang === 'vi' ? 'Tìm theo tên trang hoặc route...' : 'Search page title or route...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold focus:outline-none focus:border-maple-red rounded-2xs"
              />
            </div>
          </div>

          {/* Clean Table */}
          <div className="bg-white border border-neutral-200 overflow-hidden shadow-2xs rounded-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#151513] text-white text-[11px] font-extrabold uppercase tracking-wider border-b border-neutral-800">
                  <th className="py-3.5 px-4">{adminUiLang === 'vi' ? 'Đường Dẫn Route' : 'Route Path'}</th>
                  <th className="py-3.5 px-4">{adminUiLang === 'vi' ? 'Tiêu Đề Trang Website' : 'Page Title'}</th>
                  <th className="py-3.5 px-4">{adminUiLang === 'vi' ? 'Chuyên Mục' : 'Category'}</th>
                  <th className="py-3.5 px-4 text-center">{adminUiLang === 'vi' ? 'Trạng Thái Trang' : 'Status'}</th>
                  <th className="py-3.5 px-4 text-center">{adminUiLang === 'vi' ? 'Thao Tác Biên Tập' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium text-[#1D1D1B]">
                {filteredPages.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className="px-2 py-1 bg-neutral-100 text-maple-red border border-neutral-200 rounded-2xs text-xs inline-block">
                        {p.path}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-maple-black">
                      <span className="text-sm">
                        {adminUiLang === 'en' && p.title_en ? p.title_en : (p.title_vi || p.title)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={p.category}
                        onChange={(e) => handleUpdatePageCategory(p.id, e.target.value)}
                        className="bg-[#FDFBF7] border border-neutral-300 text-[10px] font-extrabold uppercase tracking-wider p-1.5 rounded-2xs focus:outline-none focus:border-maple-red cursor-pointer"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.name_vi}>{getCategoryDisplayName(c)}</option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleTogglePageStatus(p.id)}
                        className={`px-3 py-1 font-extrabold rounded-2xs text-[10px] border transition-all cursor-pointer ${
                          p.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-neutral-100 text-neutral-600 border-neutral-300 hover:bg-neutral-200'
                        }`}
                        title="Click để đổi trạng thái"
                      >
                        {p.status === 'Published'
                          ? (adminUiLang === 'vi' ? '🟢 Hoạt Động (Published)' : '🟢 Published')
                          : (adminUiLang === 'vi' ? '⚪ Bản Nháp (Draft)' : '⚪ Draft')}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setActivePageId(p.id)}
                          className="px-3.5 py-1.5 bg-[#151513] text-white hover:bg-maple-red text-[11px] font-extrabold rounded-2xs transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                        >
                          <Edit3 size={13} />
                          {adminUiLang === 'vi' ? 'Chỉnh Sửa Trang' : 'Edit Page'}
                        </button>

                        <a
                          href={p.path}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-2xs border border-neutral-200 text-neutral-500 hover:text-maple-black hover:bg-neutral-100 transition-colors"
                          title="Xem trang thực tế"
                        >
                          <ExternalLink size={14} />
                        </a>

                        <button
                          onClick={() => handleDeletePage(p.id)}
                          className="p-1.5 rounded-2xs border border-neutral-200 text-neutral-400 hover:text-red-600 hover:bg-neutral-100 transition-colors"
                          title="Xóa trang"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* BILINGUAL HOMEPAGE VARIANT MODAL */}
      {showAddVariantModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-neutral-200 max-w-lg w-full p-6 space-y-4 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-maple-red rounded-full inline-block" />
                <h3 className="text-base font-display font-extrabold text-[#1D1D1B] uppercase tracking-wide">
                  {adminUiLang === 'vi' ? 'Thêm Biến Thể Trang Chủ Mới' : 'Add New Homepage Variant'}
                </h3>
              </div>
              <button onClick={() => setShowAddVariantModal(false)} className="text-neutral-400 hover:text-black">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateVariant} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">🇻🇳 Tên (Tiếng Việt) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Trang Chủ Chiến Dịch..."
                    value={newVariantTitleVi}
                    onChange={(e) => setNewVariantTitleVi(e.target.value)}
                    className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">🇬🇧 Title (English):</label>
                  <input
                    type="text"
                    placeholder="Campaign Homepage..."
                    value={newVariantTitleEn}
                    onChange={(e) => setNewVariantTitleEn(e.target.value)}
                    className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Route Slug *</label>
                <input
                  type="text"
                  required
                  placeholder="/events/summer-campaign-2026"
                  value={newVariantSlug}
                  onChange={(e) => setNewVariantSlug(e.target.value)}
                  className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Mô tả mục tiêu chiến dịch:</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả mục tiêu..."
                  value={newVariantDescVi}
                  onChange={(e) => setNewVariantDescVi(e.target.value)}
                  className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-medium text-maple-black focus:outline-none rounded-2xs"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowAddVariantModal(false)}
                  className="px-4 py-2 bg-neutral-100 text-[#1D1D1B] font-bold text-xs border border-neutral-300 rounded-2xs"
                >
                  {adminUiLang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#151513] hover:bg-maple-red text-white font-extrabold text-xs transition-colors flex items-center gap-1.5 rounded-2xs shadow-2xs"
                >
                  <Plus size={15} />
                  {adminUiLang === 'vi' ? 'Tạo Biến Thể' : 'Create Variant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BILINGUAL MANAGE CATEGORIES MODAL */}
      {showManageCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-neutral-200 max-w-lg w-full p-6 space-y-5 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Folder size={18} className="text-maple-red" />
                <h3 className="text-base font-display font-extrabold text-[#1D1D1B] uppercase tracking-wide">
                  {adminUiLang === 'vi' ? 'Quản Lý Chuyên Mục Song Ngữ' : 'Manage Bilingual Categories'}
                </h3>
              </div>
              <button onClick={() => setShowManageCategoryModal(false)} className="text-neutral-400 hover:text-black">
                <X size={18} />
              </button>
            </div>

            {/* Add New Category Form */}
            <form onSubmit={handleAddCategory} className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="🇻🇳 Tên Việt (VD: Cơ Sở Vật Chất)..."
                  value={newCatVi}
                  onChange={(e) => setNewCatVi(e.target.value)}
                  className="p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
                <input
                  type="text"
                  placeholder="🇨Ả English (VD: Facilities)..."
                  value={newCatEn}
                  onChange={(e) => setNewCatEn(e.target.value)}
                  className="p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#151513] hover:bg-maple-red text-white font-extrabold text-xs transition-colors rounded-2xs flex items-center gap-1 shadow-2xs"
                >
                  <Plus size={15} /> {adminUiLang === 'vi' ? 'Thêm Chuyên Mục' : 'Add Category'}
                </button>
              </div>
            </form>

            {/* Existing Categories List */}
            <div className="space-y-2 max-h-60 overflow-y-auto border border-neutral-200 p-3 rounded-2xs divide-y divide-neutral-100">
              {categories.map((cat) => (
                <div key={cat.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  {editingCatId === cat.id ? (
                    <div className="flex items-center gap-2 flex-1 mr-2">
                      <input
                        type="text"
                        value={editingCatVi}
                        onChange={(e) => setEditingCatVi(e.target.value)}
                        className="flex-1 p-1 bg-white border border-neutral-300 text-xs font-bold rounded-2xs"
                      />
                      <input
                        type="text"
                        value={editingCatEn}
                        onChange={(e) => setEditingCatEn(e.target.value)}
                        className="flex-1 p-1 bg-white border border-neutral-300 text-xs font-bold rounded-2xs"
                      />
                      <button
                        onClick={() => handleSaveEditCategory(cat.id)}
                        className="px-2.5 py-1 bg-emerald-700 text-white font-bold rounded-2xs text-[10px]"
                      >
                        {adminUiLang === 'vi' ? 'Lưu' : 'Save'}
                      </button>
                    </div>
                  ) : (
                    <div className="font-bold text-maple-black">
                      <span>🇻🇳 {cat.name_vi}</span>
                      <span className="text-neutral-400 font-normal ml-2">| 🇨🇦 {cat.name_en}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    {editingCatId !== cat.id && (
                      <button
                        onClick={() => {
                          setEditingCatId(cat.id)
                          setEditingCatVi(cat.name_vi)
                          setEditingCatEn(cat.name_en)
                        }}
                        className="p-1 text-neutral-500 hover:text-maple-black"
                        title="Đổi tên"
                      >
                        <Edit3 size={13} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1 text-neutral-400 hover:text-red-600"
                      title="Xóa chuyên mục"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setShowManageCategoryModal(false)}
                className="px-4 py-2 bg-neutral-100 text-[#1D1D1B] font-bold text-xs border border-neutral-300 rounded-2xs"
              >
                {adminUiLang === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW STATIC PAGE MODAL */}
      {showAddPageModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-neutral-200 max-w-lg w-full p-6 space-y-4 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-maple-red rounded-full inline-block" />
                <h3 className="text-base font-display font-extrabold text-[#1D1D1B] uppercase tracking-wide">
                  {adminUiLang === 'vi' ? 'Tạo Trang Website Mới' : 'Create New Static Page'}
                </h3>
              </div>
              <button onClick={() => setShowAddPageModal(false)} className="text-neutral-400 hover:text-black">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">🇻🇳 Tiêu đề (Tiếng Việt) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Trang Mới..."
                    value={newPageTitleVi}
                    onChange={(e) => setNewPageTitleVi(e.target.value)}
                    className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">🇬🇧 Title (English):</label>
                  <input
                    type="text"
                    placeholder="New Page Title..."
                    value={newPageTitleEn}
                    onChange={(e) => setNewPageTitleEn(e.target.value)}
                    className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Route Slug *</label>
                <input
                  type="text"
                  required
                  placeholder="/academics/new-program"
                  value={newPagePath}
                  onChange={(e) => setNewPagePath(e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">{adminUiLang === 'vi' ? 'Chuyên mục:' : 'Category:'}</label>
                <select
                  value={newPageCategory}
                  onChange={(e: any) => setNewPageCategory(e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none rounded-2xs cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name_vi}>{getCategoryDisplayName(cat)}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowAddPageModal(false)}
                  className="px-4 py-2 bg-neutral-100 text-[#1D1D1B] font-bold text-xs border border-neutral-300 rounded-2xs"
                >
                  {adminUiLang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#151513] hover:bg-maple-red text-white font-extrabold text-xs transition-colors flex items-center gap-1.5 rounded-2xs shadow-2xs"
                >
                  <Plus size={15} />
                  {adminUiLang === 'vi' ? 'Tạo Trang & Mở Builder' : 'Create & Launch Builder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
