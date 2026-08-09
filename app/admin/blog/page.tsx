'use client'

import { useState, useEffect } from 'react'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import Link from 'next/link'
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Layers,
  ArrowRight,
  X,
  ExternalLink,
  Sparkles,
  Save,
  ArrowLeft,
  Globe,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Tag,
  Calendar,
  User,
  ShieldCheck,
  Check,
  Clock
} from 'lucide-react'

type Article = {
  id: string
  title: string
  slug: string
  category: string
  author: string
  status: 'Published' | 'Draft' | 'Scheduled'
  date: string
  views: number
  coverImage: string
  excerpt: string
  content: string
  scheduledAt?: string
  // Full Manual Bilingual Fields
  title_vi?: string
  title_en?: string
  content_vi?: string
  content_en?: string
  excerpt_vi?: string
  excerpt_en?: string
  seoTitle_vi?: string
  seoTitle_en?: string
  seoDescription_vi?: string
  seoDescription_en?: string
  // Full SEO Suite Fields
  focusKeyword: string
  seoTitle: string
  seoDescription: string
  canonicalUrl: string
  ogImage: string
  isConvertedPage?: boolean
  convertedPath?: string
}

const initialArticles: Article[] = [
  {
    id: '1',
    title: 'Why English Immersion in Early Childhood Matters',
    slug: 'why-english-immersion-matters',
    category: 'ACADEMICS',
    author: 'Sarah Johnson',
    status: 'Published',
    date: '04/08/2026',
    views: 342,
    coverImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
    excerpt: 'Exploring the cognitive and linguistic advantages of 100% English immersion in early childhood education.',
    content: '<h2>The Power of Early Childhood Language Acquisition</h2><p>In early childhood, the human brain undergoes rapid neurological development, creating an unparalleled window of opportunity for natural language learning. At Sunshine Maple Bear, our 100% English immersion environment leverages this critical developmental stage.</p><h3>Key Benefits of Natural Immersion:</h3><ul><li>Natural phonetic pronunciation without native language interference.</li><li>Enhanced cognitive flexibility and executive function skills.</li><li>Seamless transition to international primary and secondary schools.</li></ul>',
    focusKeyword: 'tiếng anh mầm non, english immersion kindergarten',
    seoTitle: 'Why English Immersion in Early Childhood Matters | Sunshine Maple Bear',
    seoDescription: 'Discover the cognitive and linguistic benefits of 100% English immersion for preschool children at Sunshine Maple Bear Hanoi.',
    canonicalUrl: 'https://www.sunshinemaplebear.edu.vn/blog/why-english-immersion-matters',
    ogImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'
  },
  {
    id: '2',
    title: '5 Principles of Maple Bear Canadian Early Childhood Program',
    slug: '5-principles-maple-bear-canada',
    category: 'PHILOSOPHY',
    author: 'Admin Team',
    status: 'Published',
    date: '01/08/2026',
    views: 512,
    coverImage: '/images/render/LOP_HOC_DIEN_HINH_4_.jpg',
    excerpt: 'An overview of the core educational pillars that make Canadian early childhood education world-renowned.',
    content: '<h2>Canadian Educational Philosophy in Action</h2><p>Canadian early childhood education consistently ranks among the top international educational systems worldwide according to global OECD PISA scores.</p><h3>The 5 Foundational Pillars:</h3><ol><li>Child-Centered Active Learning.</li><li>Inquiry and Play-Based Discovery.</li><li>Bilingual English Immersion.</li><li>Positive Character Development & Empathy.</li><li>Continuous Faculty Quality Audits.</li></ol>',
    focusKeyword: 'phương pháp giáo dục canada, maple bear hanoi',
    seoTitle: '5 Principles of Maple Bear Canadian Education | Sunshine Maple Bear',
    seoDescription: 'Learn about the 5 core principles of Canadian early childhood education implemented at Sunshine Maple Bear Campus.',
    canonicalUrl: 'https://www.sunshinemaplebear.edu.vn/blog/5-principles-maple-bear-canada',
    ogImage: '/images/render/LOP_HOC_DIEN_HINH_4_.jpg'
  },
  {
    id: '3',
    title: 'Nutrition & Meal Planning for Kindergarten Children',
    slug: 'nutrition-meal-planning-kindergarten',
    category: 'HEALTH',
    author: 'Dr. Minh Anh',
    status: 'Draft',
    date: '28/07/2026',
    views: 0,
    coverImage: '/images/render/PHONG_CHUC_NANG_1_.jpg',
    excerpt: 'How our 5-star organic kitchen crafts balanced, calorie-optimized meals for growing children.',
    content: '<h2>Organic Culinary Excellence for Growing Bodies</h2><p>Proper nutrition is essential for physical stamina, immune resistance, and cognitive development during early childhood years.</p><p>Our culinary team collaborates with pediatric nutrition specialists to design weekly organic menus tailored to active preschool routines.</p>',
    focusKeyword: 'dinh dưỡng mầm non, thực đơn hữu cơ',
    seoTitle: 'Nutrition & Meal Planning for Children | Sunshine Maple Bear',
    seoDescription: 'Explore our 5-star organic nutrition program designed by pediatric nutrition specialists.',
    canonicalUrl: 'https://www.sunshinemaplebear.edu.vn/blog/nutrition-meal-planning-kindergarten',
    ogImage: '/images/render/PHONG_CHUC_NANG_1_.jpg'
  }
]

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'EDITOR' | 'SEO' | 'PUBLISH'>('EDITOR')
  const [searchTerm, setSearchTerm] = useState('')
  const [convertingArticle, setConvertingArticle] = useState<Article | null>(null)
  const [conversionSuccess, setConversionSuccess] = useState<string | null>(null)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [adminUiLang, setAdminUiLang] = useState<'vi' | 'en'>('vi')

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

  // Convert Form Fields & Manual Bilingual Editor State
  const [targetPath, setTargetPath] = useState('')
  const [targetCategory, setTargetCategory] = useState<'ABOUT US' | 'ACADEMICS' | 'ADMISSIONS' | 'COMMUNITY'>('ACADEMICS')
  const [editContentLang, setEditContentLang] = useState<'vi' | 'en'>('vi')

  const activeArticle = articles.find(a => a.id === activeArticleId)

  const handleUpdateArticleField = (field: keyof Article, value: any) => {
    if (!activeArticleId) return
    setArticles(articles.map(a => a.id === activeArticleId ? { ...a, [field]: value } : a))
  }

  // Get active localized field value (e.g. title_vi or title_en with fallback)
  const getBilingualValue = (fieldBase: 'title' | 'content' | 'excerpt' | 'seoTitle' | 'seoDescription') => {
    if (!activeArticle) return ''
    const specificKey = `${fieldBase}_${editContentLang}` as keyof Article
    if (activeArticle[specificKey] !== undefined && activeArticle[specificKey] !== '') {
      return activeArticle[specificKey] as string
    }
    return (activeArticle[fieldBase] as string) || ''
  }

  // Update active localized field value
  const handleUpdateBilingualField = (fieldBase: 'title' | 'content' | 'excerpt' | 'seoTitle' | 'seoDescription', value: string) => {
    if (!activeArticleId) return
    const specificKey = `${fieldBase}_${editContentLang}`
    setArticles(articles.map(a => {
      if (a.id === activeArticleId) {
        return {
          ...a,
          [specificKey]: value,
          // Sync base field if editing default lang
          ...(editContentLang === 'vi' ? { [fieldBase]: value } : {})
        }
      }
      return a
    }))
  }

  const handleCreateNewArticle = () => {
    const newArt: Article = {
      id: Date.now().toString(),
      title: 'Untitled New Article',
      slug: `new-article-${Date.now()}`,
      category: 'ACADEMICS',
      author: 'Admissions Team',
      status: 'Draft',
      date: new Date().toLocaleDateString('en-GB'),
      views: 0,
      coverImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
      excerpt: 'Enter a short summary excerpt for article listing cards...',
      content: '<h2>Article Section Heading</h2><p>Write your detailed article body content here...</p>',
      focusKeyword: 'mầm non quốc tế',
      seoTitle: 'Untitled New Article | Sunshine Maple Bear',
      seoDescription: 'Enter compelling meta description for search engine listings.',
      canonicalUrl: `https://www.sunshinemaplebear.edu.vn/blog/new-article-${Date.now()}`,
      ogImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'
    }

    setArticles([newArt, ...articles])
    setActiveArticleId(newArt.id)
  }

  const handleDelete = (id: string) => {
    setArticles(articles.filter(a => a.id !== id))
    if (activeArticleId === id) setActiveArticleId(null)
  }

  const openConvertModal = (art: Article) => {
    setConvertingArticle(art)
    const slug = art.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setTargetPath(`/academics/${slug}`)
  }

  const handleConfirmConvert = (e: React.FormEvent) => {
    e.preventDefault()
    if (!convertingArticle || !targetPath) return

    setArticles(articles.map(a => a.id === convertingArticle.id ? { ...a, isConvertedPage: true, convertedPath: targetPath } : a))
    setConversionSuccess(targetPath)
    setConvertingArticle(null)

    setTimeout(() => {
      setConversionSuccess(null)
    }, 5000)
  }

  const handleSaveArticle = () => {
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  // -------------------------------------------------------------
  // VIEW 1: FULL-PAGE PROFESSIONAL BLOG EDITOR & SEO SUITE (NO POPUPS)
  // -------------------------------------------------------------
  if (activeArticle) {
    return (
      <div className="space-y-6 text-[#1D1D1B] w-full">
        
        {/* Editor Top Navigation Bar */}
        <div className="bg-white border border-neutral-200 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveArticleId(null)}
              className="p-2 border border-neutral-300 bg-[#FDFBF7] hover:bg-[#1D1D1B] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft size={16} />
              Back to Articles List
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-maple-red">/blog/{activeArticle.slug}</span>
                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-2xs ${
                  activeArticle.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeArticle.status === 'Published' ? 'Đã xuất bản' : 'Bản nháp'}
                </span>
              </div>
              <h2 className="text-xl font-display font-extrabold text-[#1D1D1B] mt-0.5">
                Editing Article: {activeArticle.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 size={14} /> Article Saved!
              </span>
            )}
            
            <a
              href={`/blog/${activeArticle.id}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-neutral-100 text-[#1D1D1B] text-xs font-semibold border border-neutral-300 hover:bg-neutral-200 flex items-center gap-1.5 rounded-2xs"
            >
              <ExternalLink size={14} />
              {adminUiLang === 'vi' ? 'Xem bài viết' : 'View Live Post'}
            </a>

            <button
              onClick={handleSaveArticle}
              className="px-3.5 py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-semibold transition-colors border border-[#1D1D1B] flex items-center gap-1.5 rounded-2xs shadow-2xs"
            >
              <Save size={15} />
              {adminUiLang === 'vi' ? 'Lưu bài viết' : 'Save Article'}
            </button>
          </div>
        </div>

        {/* Editor Main Canvas Tabs */}
        <div className="flex border-b border-neutral-200 bg-white px-2 shadow-2xs gap-1">
          {[
            { id: 'EDITOR', label: adminUiLang === 'vi' ? '1. Nội dung & Văn bản' : '1. Article Content & Body', icon: FileText },
            { id: 'SEO', label: adminUiLang === 'vi' ? '2. Cấu hình SEO & Google' : '2. Technical SEO & Snippet', icon: Globe },
            { id: 'PUBLISH', label: adminUiLang === 'vi' ? '3. Xuất bản & Metadata' : '3. Publishing & Metadata', icon: Calendar },
          ].map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all border-b-2 -mb-px ${
                  isActive
                    ? 'border-maple-red text-maple-red bg-[#FDFBF7]'
                    : 'border-transparent text-neutral-500 hover:text-[#1D1D1B] hover:border-neutral-300'
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* TAB 1: RICH TEXT EDITOR & CONTENT */}
        {activeTab === 'EDITOR' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Main Form & Rich Text Area (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs">
              
              {/* Manual Bilingual Editor Switcher */}
              <div className="p-3 bg-[#151513] text-white border border-neutral-800 space-y-2 rounded-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-maple-gold flex items-center gap-1.5">
                    <Globe size={14} />
                    {adminUiLang === 'vi' ? 'Biên tập Song ngữ Thủ công (Manual Bilingual Editor)' : 'Manual Bilingual Content Editor'}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {editContentLang === 'vi' ? 'Đang nhập bản Tiếng Việt' : 'Editing English Version'}
                  </span>
                </div>
                <div className="flex gap-1.5 bg-neutral-900 p-1 border border-neutral-800 rounded-2xs">
                  <button
                    type="button"
                    onClick={() => setEditContentLang('vi')}
                    className={`flex-1 py-1.5 px-3 text-xs font-semibold transition-all flex items-center justify-center gap-2 rounded-2xs ${
                      editContentLang === 'vi'
                        ? 'bg-maple-red text-white shadow-xs'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    <span>🇻🇳</span>
                    <span>Biên tập Tiếng Việt (VI)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditContentLang('en')}
                    className={`flex-1 py-1.5 px-3 text-xs font-semibold transition-all flex items-center justify-center gap-2 rounded-2xs ${
                      editContentLang === 'en'
                        ? 'bg-maple-red text-white shadow-xs'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>Edit English Version (EN)</span>
                  </button>
                </div>
              </div>

              <div className="border-b border-neutral-200 pb-2.5">
                <span className="text-[10px] font-semibold text-maple-gold block">
                  {adminUiLang === 'vi' ? `NỘI DUNG BÀI VIẾT (${editContentLang.toUpperCase()})` : `ARTICLE CONTENT (${editContentLang.toUpperCase()})`}
                </span>
                <h3 className="text-base font-display font-bold text-[#1D1D1B]">
                  {adminUiLang === 'vi' 
                    ? `Tiêu đề & Khung Soạn thảo (${editContentLang === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh'})` 
                    : `Headline & Rich Text Body (${editContentLang === 'vi' ? 'Vietnamese' : 'English'})`}
                </h3>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? `Tiêu đề Bài viết (${editContentLang.toUpperCase()}) *` : `Article Title (${editContentLang.toUpperCase()}) *`}
                </label>
                <input
                  type="text"
                  value={getBilingualValue('title')}
                  onChange={(e) => handleUpdateBilingualField('title', e.target.value)}
                  placeholder={editContentLang === 'vi' ? 'Nhập tiêu đề tiếng Việt...' : 'Enter English headline title...'}
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-sm font-bold focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? `Tóm tắt ngắn Excerpt (${editContentLang.toUpperCase()}) *` : `Short Excerpt Summary (${editContentLang.toUpperCase()}) *`}
                </label>
                <textarea
                  rows={2}
                  value={getBilingualValue('excerpt')}
                  onChange={(e) => handleUpdateBilingualField('excerpt', e.target.value)}
                  placeholder={editContentLang === 'vi' ? 'Nhập đoạn tóm tắt tiếng Việt...' : 'Enter English short summary excerpt...'}
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red resize-none"
                />
              </div>

              {/* VISUAL WYSIWYG RICH TEXT EDITOR */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 block">
                  {adminUiLang === 'vi' ? `Nội dung Chi tiết Bài viết (${editContentLang.toUpperCase()}) *` : `Rich Text Article Body (${editContentLang.toUpperCase()}) *`}
                </label>
                <RichTextEditor
                  value={getBilingualValue('content')}
                  onChange={(val) => handleUpdateBilingualField('content', val)}
                />
              </div>

            </div>

            {/* Featured Image & Metadata (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Card 1: Featured Cover Image */}
              <div className="bg-white border border-neutral-200 p-4 space-y-3 shadow-2xs">
                <span className="text-xs font-bold text-neutral-800 block">
                  {adminUiLang === 'vi' ? 'Ảnh đại diện (Cover Image)' : 'Featured Cover Image'}
                </span>
                
                <div className="relative h-40 bg-neutral-900 border border-neutral-300 overflow-hidden shadow-inner">
                  <img src={activeArticle.coverImage || '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'} alt="Cover" className="w-full h-full object-cover" />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-600 block mb-1">
                    {adminUiLang === 'vi' ? 'Đường dẫn URL Ảnh đại diện' : 'Cover Image URL'}
                  </label>
                  <input
                    type="text"
                    value={activeArticle.coverImage}
                    onChange={(e) => handleUpdateArticleField('coverImage', e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono focus:outline-none focus:border-maple-red"
                  />
                </div>

                <div className="pt-2 border-t border-neutral-200 space-y-2">
                  <span className="text-xs font-semibold text-neutral-700 block">
                    {adminUiLang === 'vi' ? 'Chọn nhanh ảnh đại diện' : 'Quick Cover Image Selector'}
                  </span>

                  {/* Extract Images from Article Content Body */}
                  {(() => {
                    const contentImages: string[] = []
                    if (activeArticle.content) {
                      const regex = /src=["']([^"']+)["']/g
                      let match
                      while ((match = regex.exec(activeArticle.content)) !== null) {
                        if (match[1] && !contentImages.includes(match[1])) {
                          contentImages.push(match[1])
                        }
                      }
                    }

                    const libraryPresets = [
                      '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
                      '/images/render/LOP_HOC_DIEN_HINH_3_.jpg',
                      '/images/render/HANH_LANG_1_.jpg',
                      '/images/render/PHONG_CHUC_NANG_1_.jpg'
                    ]

                    return (
                      <div className="space-y-2 text-xs">
                        {contentImages.length > 0 && (
                          <div>
                            <span className="text-[10px] font-semibold text-maple-red block mb-1">
                              {adminUiLang === 'vi' ? `Ảnh trong bài viết (${contentImages.length}):` : `In-Article Images (${contentImages.length}):`}
                            </span>
                            <div className="grid grid-cols-4 gap-1.5">
                              {contentImages.map((imgUrl, i) => (
                                <button
                                  key={`content-${i}`}
                                  type="button"
                                  onClick={() => handleUpdateArticleField('coverImage', imgUrl)}
                                  className={`h-10 border overflow-hidden transition-all ${
                                    activeArticle.coverImage === imgUrl ? 'border-2 border-maple-red shadow-xs scale-105' : 'border-neutral-300 opacity-70 hover:opacity-100'
                                  }`}
                                  title="Đặt làm ảnh đại diện"
                                >
                                  <img src={imgUrl} alt="Article Content" className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <span className="text-[10px] font-semibold text-neutral-500 block mb-1">
                            {adminUiLang === 'vi' ? 'Ảnh từ Thư viện trường:' : 'School Media Library:'}
                          </span>
                          <div className="grid grid-cols-4 gap-1.5">
                            {libraryPresets.map((imgUrl, i) => (
                              <button
                                key={`preset-${i}`}
                                type="button"
                                onClick={() => handleUpdateArticleField('coverImage', imgUrl)}
                                className={`h-10 border overflow-hidden transition-all ${
                                  activeArticle.coverImage === imgUrl ? 'border-2 border-maple-red shadow-xs scale-105' : 'border-neutral-300 opacity-70 hover:opacity-100'
                                }`}
                                title="Đặt làm ảnh đại diện"
                              >
                                <img src={imgUrl} alt="Library Preset" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>

              {/* Card 2: Publishing & Metadata Controls */}
              <div className="bg-white border border-neutral-200 p-4 space-y-3 shadow-2xs">
                <span className="text-xs font-bold text-neutral-800 block">
                  {adminUiLang === 'vi' ? 'Thông tin xuất bản' : 'Publishing & Metadata'}
                </span>
                
                <div>
                  <label className="text-xs font-medium text-neutral-600 block mb-1">
                    {adminUiLang === 'vi' ? 'Trạng thái xuất bản' : 'Publication Status'}
                  </label>
                  <select
                    value={activeArticle.status}
                    onChange={(e) => handleUpdateArticleField('status', e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-maple-red"
                  >
                    <option value="Published">{adminUiLang === 'vi' ? 'Đã xuất bản (Công khai)' : 'Published (Public Site Live)'}</option>
                    <option value="Draft">{adminUiLang === 'vi' ? 'Bản nháp (Nội bộ)' : 'Draft (Internal Review)'}</option>
                    <option value="Scheduled">{adminUiLang === 'vi' ? 'Hẹn giờ đăng (Auto Post)' : 'Scheduled (Auto Post)'}</option>
                  </select>
                </div>

                {/* Scheduled Date & Time Picker */}
                {activeArticle.status === 'Scheduled' && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-2xs space-y-1.5 animate-fade-in text-xs">
                    <label className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                      <Clock size={14} className="text-amber-700" />
                      {adminUiLang === 'vi' ? 'Ngày & Giờ xuất bản *' : 'Scheduled Date & Time *'}
                    </label>
                    <input
                      type="datetime-local"
                      value={activeArticle.scheduledAt || new Date(Date.now() + 86400000).toISOString().slice(0, 16)}
                      onChange={(e) => handleUpdateArticleField('scheduledAt', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-amber-300 text-xs font-mono font-semibold text-neutral-800 focus:outline-none focus:border-maple-red"
                    />
                    <span className="text-[10px] text-amber-700 block">
                      {adminUiLang === 'vi' ? 'Hệ thống tự động đăng bài lên website vào thời điểm này.' : 'System will automatically publish post at this exact time.'}
                    </span>
                  </div>
                )}

                <div>
                  <label className="text-xs font-medium text-neutral-600 block mb-1">
                    {adminUiLang === 'vi' ? 'Chuyên mục' : 'Category'}
                  </label>
                  <select
                    value={activeArticle.category}
                    onChange={(e) => handleUpdateArticleField('category', e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold focus:outline-none focus:border-maple-red"
                  >
                    <option value="ACADEMICS">Academics & Program</option>
                    <option value="PHILOSOPHY">Canadian Philosophy</option>
                    <option value="EVENTS">School Events & Activities</option>
                    <option value="NUTRITION">Health & Nutrition</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-600 block mb-1">
                    {adminUiLang === 'vi' ? 'Tên tác giả' : 'Author Name'}
                  </label>
                  <input
                    type="text"
                    value={activeArticle.author}
                    onChange={(e) => handleUpdateArticleField('author', e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold focus:outline-none focus:border-maple-red"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-600 block mb-1">
                    {adminUiLang === 'vi' ? 'Từ khóa SEO chính' : 'Focus Keywords'}
                  </label>
                  <input
                    type="text"
                    value={activeArticle.focusKeyword}
                    onChange={(e) => handleUpdateArticleField('focusKeyword', e.target.value)}
                    placeholder="e.g. tiếng anh mầm non, canada"
                    className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono focus:outline-none focus:border-maple-red"
                  />
                </div>
              </div>

              {/* Card 3: Google Search SERP Snippet Preview */}
              <div className="bg-[#FDFBF7] border border-neutral-200 p-4 space-y-2 shadow-2xs">
                <span className="text-xs font-bold text-emerald-700 block">
                  {adminUiLang === 'vi' ? 'Xem trước kết quả tìm kiếm Google' : 'Google Search Preview'}
                </span>
                <div className="p-3 bg-[#FDFBF7] border border-neutral-200 space-y-1">
                  <span className="text-[10px] text-neutral-500 font-mono block truncate">
                    sunshinemaplebear.edu.vn › blog › {activeArticle.slug}
                  </span>
                  <h4 className="text-xs font-bold text-blue-700 hover:underline cursor-pointer line-clamp-1">
                    {activeArticle.seoTitle || activeArticle.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-snug line-clamp-2">
                    {activeArticle.seoDescription || activeArticle.excerpt}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: TECHNICAL SEO & GOOGLE SNIPPET */}
        {activeTab === 'SEO' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 space-y-5 shadow-2xs">
              
              {/* Manual Bilingual Editor Switcher */}
              <div className="p-3 bg-[#151513] text-white border border-neutral-800 space-y-2 rounded-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-maple-gold flex items-center gap-1.5">
                    <Globe size={14} />
                    {adminUiLang === 'vi' ? 'Cấu hình SEO Song ngữ Thủ công' : 'Manual Bilingual Technical SEO'}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {editContentLang === 'vi' ? 'Đang chỉnh SEO Tiếng Việt' : 'Editing English SEO Tags'}
                  </span>
                </div>
                <div className="flex gap-1.5 bg-neutral-900 p-1 border border-neutral-800 rounded-2xs">
                  <button
                    type="button"
                    onClick={() => setEditContentLang('vi')}
                    className={`flex-1 py-1.5 px-3 text-xs font-semibold transition-all flex items-center justify-center gap-2 rounded-2xs ${
                      editContentLang === 'vi'
                        ? 'bg-maple-red text-white shadow-xs'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    <span>🇻🇳</span>
                    <span>SEO Tiếng Việt (VI)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditContentLang('en')}
                    className={`flex-1 py-1.5 px-3 text-xs font-semibold transition-all flex items-center justify-center gap-2 rounded-2xs ${
                      editContentLang === 'en'
                        ? 'bg-maple-red text-white shadow-xs'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>SEO English (EN)</span>
                  </button>
                </div>
              </div>

              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-semibold text-maple-gold block">
                  {adminUiLang === 'vi' ? `CẤU HÌNH SEO HỆ THỐNG (${editContentLang.toUpperCase()})` : `TECHNICAL SEO SUITE (${editContentLang.toUpperCase()})`}
                </span>
                <h3 className="text-base font-display font-bold text-[#1D1D1B]">
                  {adminUiLang === 'vi' ? `Thẻ Meta Title & Description (${editContentLang === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh'})` : `Search Engine Optimization Tags (${editContentLang === 'vi' ? 'Vietnamese' : 'English'})`}
                </h3>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Từ khóa SEO chính (Focus Keyword)' : 'Target Focus Keywords *'}
                </label>
                <input
                  type="text"
                  value={activeArticle.focusKeyword}
                  onChange={(e) => handleUpdateArticleField('focusKeyword', e.target.value)}
                  placeholder="e.g. tiếng anh mầm non, mầm non canada"
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Đường dẫn Slug URL *' : 'Custom URL Slug *'}
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-neutral-100 border border-r-0 border-neutral-300 text-xs font-mono text-neutral-500">
                    /blog/
                  </span>
                  <input
                    type="text"
                    value={activeArticle.slug}
                    onChange={(e) => handleUpdateArticleField('slug', e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-semibold focus:outline-none focus:border-maple-red"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-neutral-700 block">
                    {adminUiLang === 'vi' ? `Thẻ Meta Title (${editContentLang.toUpperCase()}) *` : `Meta Title Tag (${editContentLang.toUpperCase()}) *`}
                  </label>
                  <span className="text-[10px] font-mono text-neutral-500">{getBilingualValue('seoTitle').length} / 60 chars</span>
                </div>
                <input
                  type="text"
                  value={getBilingualValue('seoTitle')}
                  onChange={(e) => handleUpdateBilingualField('seoTitle', e.target.value)}
                  placeholder={editContentLang === 'vi' ? 'Nhập tiêu đề SEO tiếng Việt...' : 'Enter English meta title tag...'}
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-neutral-700 block">
                    {adminUiLang === 'vi' ? `Thẻ Meta Description (${editContentLang.toUpperCase()}) *` : `Meta Description Tag (${editContentLang.toUpperCase()}) *`}
                  </label>
                  <span className="text-[10px] font-mono text-neutral-500">{getBilingualValue('seoDescription').length} / 160 chars</span>
                </div>
                <textarea
                  rows={3}
                  value={getBilingualValue('seoDescription')}
                  onChange={(e) => handleUpdateBilingualField('seoDescription', e.target.value)}
                  placeholder={editContentLang === 'vi' ? 'Nhập mô tả SEO tiếng Việt...' : 'Enter English meta description snippet...'}
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Thẻ Canonical URL</label>
                <input
                  type="text"
                  value={activeArticle.canonicalUrl}
                  onChange={(e) => handleUpdateArticleField('canonicalUrl', e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono focus:outline-none focus:border-maple-red"
                />
              </div>
            </div>

            {/* Google Search Snippet Simulation */}
            <div className="lg:col-span-5 bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
              <span className="text-[10px] font-semibold text-emerald-600 block">Xem trước kết quả tìm kiếm Google</span>
              <div className="p-4 bg-[#FDFBF7] border border-neutral-200 space-y-1 font-sans rounded-2xs">
                <div className="text-xs text-neutral-600 font-mono truncate">https://www.sunshinemaplebear.edu.vn/blog/{activeArticle.slug}</div>
                <div className="text-base font-bold text-blue-700 hover:underline cursor-pointer leading-snug">{activeArticle.seoTitle}</div>
                <div className="text-xs text-neutral-600 font-light leading-relaxed line-clamp-2">{activeArticle.seoDescription}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PUBLISHING & METADATA */}
        {activeTab === 'PUBLISH' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-white border border-neutral-200 p-5 space-y-5 shadow-2xs rounded-2xs">
              <div className="border-b border-neutral-200 pb-2.5">
                <span className="text-[10px] font-semibold text-maple-gold block">Cấu hình Xuất bản</span>
                <h3 className="text-base font-display font-bold text-[#1D1D1B]">Trạng thái & Phân quyền Tác giả</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">Trạng thái Bài viết *</label>
                  <select
                    value={activeArticle.status}
                    onChange={(e) => handleUpdateArticleField('status', e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                  >
                    <option value="Published">Xuất bản (Công khai)</option>
                    <option value="Draft">Bản nháp (Draft)</option>
                    <option value="Scheduled">Tự động đăng (Scheduled)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">Tên Tác giả *</label>
                  <input
                    type="text"
                    value={activeArticle.author}
                    onChange={(e) => handleUpdateArticleField('author', e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Chuyên mục *</label>
                <select
                  value={activeArticle.category}
                  onChange={(e) => handleUpdateArticleField('category', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                >
                  <option value="ACADEMICS">Chương trình học (Academics)</option>
                  <option value="PHILOSOPHY">Triết lý giáo dục (Philosophy)</option>
                  <option value="HEALTH">Sức khỏe & Dinh dưỡng (Health)</option>
                  <option value="PARENTING">Góc phụ huynh (Parenting)</option>
                </select>
              </div>
            </div>
          </div>
        )}

      </div>
    )
  }

  // -------------------------------------------------------------
  // VIEW 2: BLOG ARTICLES LISTING TABLE
  // -------------------------------------------------------------
  return (
    <div className="space-y-8 w-full">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-neutral-200 p-5 shadow-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red block">Quản lý Nội dung & Bài viết</span>
          <h2 className="text-xl font-display font-bold text-[#1D1D1B]">Tin tức & Bài viết Blog</h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">Quản lý bài viết, xuất bản tin tức hoặc chuyển đổi bài viết trực tiếp thành Trang tĩnh.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateNewArticle}
            className="px-3.5 py-1.5 bg-[#1D1D1B] text-white text-xs font-semibold hover:bg-maple-red transition-colors border border-[#1D1D1B] flex items-center gap-1.5 shadow-2xs rounded-2xs"
          >
            <Plus size={15} />
            Tạo bài viết mới
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {conversionSuccess && (
        <div className="p-3.5 bg-emerald-900 text-white border border-emerald-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in shadow-2xs rounded-2xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-emerald-300 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-semibold">Đã chuyển đổi bài viết sang Trang tĩnh thành công!</h4>
              <p className="text-xs text-emerald-200 font-mono mt-0.5">Route đích: {conversionSuccess}</p>
            </div>
          </div>
          <Link
            href="/admin/pages"
            className="px-3 py-1.5 bg-white text-emerald-950 font-semibold text-xs hover:bg-emerald-100 transition-colors flex items-center gap-1.5 rounded-2xs"
          >
            Chỉnh sửa tại QL Trang tĩnh <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white border border-neutral-200 p-3.5 shadow-2xs">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết theo tiêu đề hoặc tác giả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-neutral-500" />
          <select className="bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold p-1.5 focus:outline-none">
            <option value="ALL">Tất cả chuyên mục</option>
            <option value="ACADEMICS">Chương trình học</option>
            <option value="PHILOSOPHY">Triết lý giáo dục</option>
            <option value="HEALTH">Sức khỏe & Dinh dưỡng</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden shadow-2xs rounded-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-600 font-semibold bg-[#FDFBF7]">
              <th className="p-3">Tiêu đề bài viết</th>
              <th className="p-3">Chuyên mục</th>
              <th className="p-3">Tác giả</th>
              <th className="p-3">Ngày đăng</th>
              <th className="p-3">Lượt xem</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 font-medium text-[#1D1D1B]">
            {articles
              .filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((art) => (
                <tr key={art.id} className="hover:bg-neutral-50">
                  <td className="p-3 font-semibold max-w-xs leading-snug">
                    {art.title}
                    {art.isConvertedPage && (
                      <span className="text-[10px] text-maple-red font-mono block mt-0.5">
                        → Đã chuyển sang: {art.convertedPath}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-[10px] font-semibold rounded-2xs">
                      {art.category}
                    </span>
                  </td>
                  <td className="p-3 text-neutral-600">{art.author}</td>
                  <td className="p-3 text-neutral-500 font-mono">{art.date}</td>
                  <td className="p-3 font-mono">{art.views}</td>
                  <td className="p-3">
                    {art.isConvertedPage ? (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-900 border border-purple-300 text-[10px] font-semibold rounded-2xs">
                        Trang tĩnh
                      </span>
                    ) : (
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-2xs ${
                        art.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {art.status === 'Published' ? 'Đã xuất bản' : 'Lưu nháp'}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-1.5">
                    <button
                      onClick={() => openConvertModal(art)}
                      className="px-2.5 py-1 bg-[#1D1D1B] hover:bg-maple-red text-white text-[10px] font-semibold transition-colors border border-[#1D1D1B] inline-flex items-center gap-1.5 rounded-2xs shadow-2xs"
                      title="Chuyển bài viết thành Trang thông tin tĩnh"
                    >
                      <Layers size={13} />
                      Tạo Trang tĩnh
                    </button>

                    <button
                      onClick={() => setActiveArticleId(art.id)}
                      className="p-1.5 text-neutral-500 hover:text-maple-red transition-colors"
                      title="Edit Article & SEO"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(art.id)} className="p-1.5 text-neutral-500 hover:text-red-600 transition-colors" title="Delete Article">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* CONVERT MODAL */}
      {convertingArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white text-[#1D1D1B] border border-neutral-300 max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="border-b border-neutral-200 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-semibold text-maple-red block">Công cụ Chuyển đổi Trang tĩnh</span>
                <h3 className="text-base font-display font-bold text-[#1D1D1B]">Chuyển bài viết thành Trang tĩnh</h3>
              </div>
              <button onClick={() => setConvertingArticle(null)} className="text-neutral-400 hover:text-black">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleConfirmConvert} className="space-y-3">
              <div className="p-2.5 bg-[#FDFBF7] border border-neutral-200 space-y-0.5 text-xs rounded-2xs">
                <span className="text-[10px] font-semibold text-neutral-400">Tiêu đề bài viết gốc:</span>
                <p className="font-semibold text-[#1D1D1B] leading-snug">{convertingArticle.title}</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Đường dẫn Route Trang đích *</label>
                <input
                  type="text"
                  required
                  value={targetPath}
                  onChange={(e) => setTargetPath(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Chuyên mục Trang đích *</label>
                <select
                  value={targetCategory}
                  onChange={(e) => setTargetCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                >
                  <option value="ACADEMICS">Chương trình học (Academics)</option>
                  <option value="ABOUT US">Về chúng tôi (About Us)</option>
                  <option value="ADMISSIONS">Tuyển sinh (Admissions)</option>
                  <option value="COMMUNITY">Cộng đồng (Community)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setConvertingArticle(null)}
                  className="px-3.5 py-1.5 bg-neutral-100 text-[#1D1D1B] font-semibold text-xs border border-neutral-300 rounded-2xs"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white font-semibold text-xs border border-[#1D1D1B] transition-colors flex items-center gap-1.5 rounded-2xs shadow-2xs"
                >
                  <Sparkles size={14} />
                  Xác nhận Chuyển đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
