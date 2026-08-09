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
  Clock,
  Folder,
  FolderTree,
  CornerDownRight
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

export type BlogCategoryNode = {
  id: string
  name: string
  parentId: string | null // null = Root Parent Category
  slug: string
}

const initialBlogCategories: BlogCategoryNode[] = [
  // Parent Root Categories
  { id: 'cat-academics', name: 'CHƯƠNG TRÌNH HỌC (ACADEMICS)', parentId: null, slug: 'academics' },
  { id: 'cat-health', name: 'SỨC KHỎE & DINH DƯỠNG (HEALTH & NUTRITION)', parentId: null, slug: 'health-nutrition' },
  { id: 'cat-community', name: 'GÓC PHỤ HUYNH & CỘNG ĐỒNG (COMMUNITY)', parentId: null, slug: 'community' },
  { id: 'cat-philosophy', name: 'TRIẾT LÝ GIÁO DỤC (EDUCATIONAL PHILOSOPHY)', parentId: null, slug: 'philosophy' },

  // Child Subcategories
  { id: 'sub-earlyyears', name: 'Mầm Non & Khối Mẫu Giáo (Early Years)', parentId: 'cat-academics', slug: 'early-years' },
  { id: 'sub-bilingual', name: 'Song Ngữ Anh-Việt (English Immersion)', parentId: 'cat-academics', slug: 'english-immersion' },
  { id: 'sub-extracurricular', name: 'Ngoại Khóa & Năng Khiếu', parentId: 'cat-academics', slug: 'extracurricular' },

  { id: 'sub-nutrition', name: 'Thực Đơn & Dinh Dưỡng Hữu Cơ', parentId: 'cat-health', slug: 'organic-nutrition' },
  { id: 'sub-safeguarding', name: 'An Toàn & Chăm Sóc Y Tế 24/7', parentId: 'cat-health', slug: 'safeguarding' },

  { id: 'sub-events', name: 'Sự Kiện Trường & Open Day', parentId: 'cat-community', slug: 'events-openday' },
  { id: 'sub-handbook', name: 'Cẩm Nang Đồng Hành Cùng Con', parentId: 'cat-community', slug: 'parent-handbook' }
]

const initialArticles: Article[] = [
  {
    id: '1',
    title: 'Why English Immersion in Early Childhood Matters',
    slug: 'why-english-immersion-matters',
    category: 'Song Ngữ Anh-Việt (English Immersion)',
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
    category: 'CHƯƠNG TRÌNH HỌC (ACADEMICS)',
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
    category: 'Thực Đơn & Dinh Dưỡng Hữu Cơ',
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
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [blogCategories, setBlogCategories] = useState<BlogCategoryNode[]>(initialBlogCategories)

  // Category Modal States
  const [showManageCatModal, setShowManageCatModal] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [newCatParentId, setNewCatParentId] = useState<string | null>(null)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [editingCatName, setEditingCatName] = useState('')

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

  // -------------------------------------------------------------
  // HIERARCHICAL CATEGORY HANDLERS
  // -------------------------------------------------------------
  const handleAddBlogCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName) return
    const formattedName = newCatName.trim()
    const newCatNode: BlogCategoryNode = {
      id: `cat-${Date.now()}`,
      name: formattedName,
      parentId: newCatParentId,
      slug: formattedName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }

    setBlogCategories([...blogCategories, newCatNode])
    setNewCatName('')
    setNewCatParentId(null)
  }

  const handleSaveEditCat = (catId: string) => {
    if (!editingCatName) return
    setBlogCategories(blogCategories.map(c => c.id === catId ? { ...c, name: editingCatName.trim() } : c))
    setEditingCatId(null)
    setEditingCatName('')
  }

  const handleDeleteBlogCat = (catId: string) => {
    const targetCat = blogCategories.find(c => c.id === catId)
    if (!targetCat) return

    const hasChildren = blogCategories.some(c => c.parentId === catId)
    if (hasChildren) {
      alert(`Không thể xóa Chuyên mục cha [${targetCat.name}] vì còn các Chuyên mục con đang trực thuộc!`)
      return
    }

    if (confirm(`Bạn có chắc muốn xóa chuyên mục [${targetCat.name}]?`)) {
      setBlogCategories(blogCategories.filter(c => c.id !== catId))
    }
  }

  // Convert Form Fields & Manual Bilingual Editor State
  const [targetPath, setTargetPath] = useState('')
  const [targetCategory, setTargetCategory] = useState<string>('ACADEMICS')
  const [editContentLang, setEditContentLang] = useState<'vi' | 'en'>('vi')

  const activeArticle = articles.find(a => a.id === activeArticleId)

  const handleUpdateArticleField = (field: keyof Article, value: any) => {
    if (!activeArticleId) return
    setArticles(articles.map(a => a.id === activeArticleId ? { ...a, [field]: value } : a))
  }

  const getBilingualValue = (fieldBase: 'title' | 'content' | 'excerpt' | 'seoTitle' | 'seoDescription') => {
    if (!activeArticle) return ''
    const specificKey = `${fieldBase}_${editContentLang}` as keyof Article
    if (activeArticle[specificKey] !== undefined && activeArticle[specificKey] !== '') {
      return activeArticle[specificKey] as string
    }
    return (activeArticle[fieldBase] as string) || ''
  }

  const handleUpdateBilingualField = (fieldBase: 'title' | 'content' | 'excerpt' | 'seoTitle' | 'seoDescription', val: string) => {
    if (!activeArticleId) return
    const specificKey = `${fieldBase}_${editContentLang}` as keyof Article

    setArticles(articles.map(a => {
      if (a.id === activeArticleId) {
        const updated = { ...a, [specificKey]: val }
        if (editContentLang === 'vi') {
          updated[fieldBase as keyof Article] = val as any
        }
        return updated
      }
      return a
    }))
  }

  const handleCreateNewArticle = () => {
    const newArt: Article = {
      id: `art-${Date.now()}`,
      title: 'Bài viết tin tức mới tạo',
      slug: `bai-viet-moi-${Date.now()}`,
      category: 'Song Ngữ Anh-Việt (English Immersion)',
      author: 'Ban Biên Tập Sunshine Maple Bear',
      status: 'Draft',
      date: new Date().toLocaleDateString('en-GB'),
      views: 0,
      coverImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
      excerpt: 'Nhập tóm tắt bài viết tin tức...',
      content: '<p>Nhập nội dung bài viết tại đây...</p>',
      focusKeyword: 'tin tuc mam non, maple bear',
      seoTitle: 'Bài viết mới | Sunshine Maple Bear',
      seoDescription: 'Mô tả bài viết mới...',
      canonicalUrl: `https://www.sunshinemaplebear.edu.vn/blog/bai-viet-moi-${Date.now()}`,
      ogImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'
    }

    setArticles([newArt, ...articles])
    setActiveArticleId(newArt.id)
    setActiveTab('EDITOR')
  }

  const handleDeleteArticle = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này khỏi hệ thống?')) {
      setArticles(articles.filter(a => a.id !== id))
      if (activeArticleId === id) setActiveArticleId(null)
    }
  }

  const handleSaveArticle = () => {
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const handleConfirmConvert = (e: React.FormEvent) => {
    e.preventDefault()
    if (!convertingArticle || !targetPath) return

    setArticles(articles.map(a => {
      if (a.id === convertingArticle.id) {
        return {
          ...a,
          isConvertedPage: true,
          convertedPath: targetPath
        }
      }
      return a
    }))

    setConversionSuccess(targetPath)
    setConvertingArticle(null)
    setTargetPath('')
    setTimeout(() => setConversionSuccess(null), 5000)
  }

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.slug.includes(searchTerm)
    const matchesCat = categoryFilter === 'ALL' || a.category === categoryFilter
    return matchesSearch && matchesCat
  })

  // Separate Parent & Child categories for clean rendering
  const rootCategories = blogCategories.filter(c => c.parentId === null)

  // -------------------------------------------------------------
  // VIEW 1: ARTICLE EDITOR WORKSPACE
  // -------------------------------------------------------------
  if (activeArticle) {
    return (
      <div className="space-y-6 w-full text-[#1D1D1B] animate-fade-in pb-12">
        
        {/* Top Action Bar */}
        <div className="bg-[#151513] text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-800 shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveArticleId(null)}
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white transition-colors flex items-center gap-1.5 text-xs font-bold border border-neutral-700 rounded-2xs"
            >
              <ArrowLeft size={16} /> Quay lại Danh Sách
            </button>

            <div>
              <span className="text-[10px] text-maple-gold font-mono uppercase tracking-wider block">
                {activeArticle.category} — ID: {activeArticle.id}
              </span>
              <h2 className="text-base font-display font-extrabold text-white line-clamp-1">{activeArticle.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`/blog/${activeArticle.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-colors border border-neutral-700 flex items-center gap-1.5 rounded-2xs"
            >
              <Eye size={15} /> Xem Live ↗
            </a>

            <button
              onClick={handleSaveArticle}
              className="px-4 py-2 bg-maple-red hover:bg-red-700 text-white text-xs font-extrabold transition-colors flex items-center gap-1.5 shadow-md rounded-2xs"
            >
              <Save size={16} /> Lưu Bài Viết
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 rounded-2xs animate-fade-in">
            <CheckCircle2 size={16} /> Đã lưu bài viết [{activeArticle.title}] thành công!
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-200 bg-white shadow-2xs">
          {[
            { id: 'EDITOR', label: '1. Nội dung & Văn bản', icon: FileText },
            { id: 'SEO', label: '2. Cấu hình SEO & Google', icon: Globe },
            { id: 'PUBLISH', label: '3. Xuất bản & Chuyên mục', icon: Calendar },
          ].map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-extrabold transition-all border-b-2 ${
                  isActive
                    ? 'border-maple-red text-maple-red bg-white'
                    : 'border-transparent text-neutral-500 hover:text-maple-black bg-[#FDFBF7]'
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* TAB 1: CONTENT EDITOR */}
        {activeTab === 'EDITOR' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-8 bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
              
              {/* Bilingual Switcher */}
              <div className="p-3 bg-[#151513] text-white border border-neutral-800 space-y-2 rounded-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-maple-gold flex items-center gap-1.5">
                    <Globe size={14} /> Trình Biên Tập Song Ngữ Thủ Công
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {editContentLang === 'vi' ? '🇻🇳 Đang nhập bản Tiếng Việt' : '🇨🇦 Editing English Version'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditContentLang('vi')}
                    className={`flex-1 py-1.5 text-xs font-bold transition-all rounded-2xs ${
                      editContentLang === 'vi' ? 'bg-maple-red text-white' : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    🇻🇳 Bản Tiếng Việt
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditContentLang('en')}
                    className={`flex-1 py-1.5 text-xs font-bold transition-all rounded-2xs ${
                      editContentLang === 'en' ? 'bg-maple-red text-white' : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    🇨🇦 Bản Tiếng Anh
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Tiêu đề Bài viết *</label>
                <input
                  type="text"
                  value={getBilingualValue('title')}
                  onChange={(e) => handleUpdateBilingualField('title', e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-sm font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Tóm tắt ngắn (Excerpt) *</label>
                <textarea
                  rows={2}
                  value={getBilingualValue('excerpt')}
                  onChange={(e) => handleUpdateBilingualField('excerpt', e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-medium text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Nội dung chi tiết (WYSIWYG Rich Text) *</label>
                <RichTextEditor
                  value={getBilingualValue('content')}
                  onChange={(html) => handleUpdateBilingualField('content', html)}
                />
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
              <h4 className="text-xs font-extrabold text-maple-black uppercase border-b pb-2">Ảnh Đại Diện (Cover Image)</h4>
              <div className="aspect-video bg-neutral-100 relative rounded-2xs overflow-hidden border border-neutral-300">
                <img src={activeArticle.coverImage} alt="Cover" className="w-full h-full object-cover" />
              </div>
              <input
                type="text"
                value={activeArticle.coverImage}
                onChange={(e) => handleUpdateArticleField('coverImage', e.target.value)}
                className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono rounded-2xs"
              />
            </div>
          </div>
        )}

        {/* TAB 3: PUBLISHING & CATEGORY SELECTION */}
        {activeTab === 'PUBLISH' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-8 bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
              <div className="border-b border-neutral-100 pb-2">
                <span className="text-[10px] font-bold text-maple-gold uppercase block">XUẤT BẢN & PHÂN CẤP CHUYÊN MỤC</span>
                <h3 className="text-base font-display font-extrabold text-[#1D1D1B]">Chọn Chuyên Mục Trực Thuộc</h3>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Chuyên mục bài viết *</label>
                <select
                  value={activeArticle.category}
                  onChange={(e) => handleUpdateArticleField('category', e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs cursor-pointer"
                >
                  {rootCategories.map(parent => {
                    const children = blogCategories.filter(c => c.parentId === parent.id)
                    return (
                      <optgroup key={parent.id} label={`📁 ${parent.name}`}>
                        <option value={parent.name}>📁 Tất cả {parent.name} (Chuyên Mục Gốc)</option>
                        {children.map(child => (
                          <option key={child.id} value={child.name}>
                            └─ 📄 {child.name}
                          </option>
                        ))}
                      </optgroup>
                    )
                  })}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Trạng thái bài viết</label>
                  <select
                    value={activeArticle.status}
                    onChange={(e) => handleUpdateArticleField('status', e.target.value as any)}
                    className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold rounded-2xs"
                  >
                    <option value="Published">🟢 Xuất Bản (Published)</option>
                    <option value="Draft">⚪ Bản Nháp (Draft)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Tác giả</label>
                  <input
                    type="text"
                    value={activeArticle.author}
                    onChange={(e) => handleUpdateArticleField('author', e.target.value)}
                    className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold rounded-2xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    )
  }

  // -------------------------------------------------------------
  // VIEW 2: BLOG ARTICLES TABLE & CATEGORY TREE MANAGER
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 w-full text-[#1D1D1B] animate-fade-in pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-neutral-200 p-6 shadow-2xs rounded-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
            <span className="text-xs font-bold text-maple-red uppercase tracking-wider">HỆ THỐNG CMS QUẢN LÝ BLOG TIN TỨC</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#1D1D1B]">
            Tin Tức & Bài Viết Blog Phân Cấp
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowManageCatModal(true)}
            className="px-3.5 py-2.5 bg-white text-neutral-800 border border-neutral-300 hover:bg-[#FDFBF7] text-xs font-extrabold transition-all flex items-center gap-1.5 rounded-2xs shadow-2xs"
          >
            <FolderTree size={16} className="text-maple-red" />
            Quản Lý Chuyên Mục Cha - Con ({blogCategories.length})
          </button>

          <button
            onClick={handleCreateNewArticle}
            className="px-4 py-2.5 bg-[#151513] text-white text-xs font-extrabold hover:bg-maple-red transition-all flex items-center gap-1.5 rounded-2xs shadow-2xs uppercase tracking-wider"
          >
            <Plus size={16} />
            Tạo Bài Viết Mới
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-neutral-200 p-4 rounded-2xs shadow-2xs flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-3 py-1.5 rounded-2xs transition-all ${
              categoryFilter === 'ALL' ? 'bg-[#151513] text-white shadow-xs' : 'bg-[#FDFBF7] border border-neutral-200 text-neutral-600 hover:text-maple-black'
            }`}
          >
            Tất cả ({articles.length})
          </button>

          {rootCategories.map(root => (
            <button
              key={root.id}
              onClick={() => setCategoryFilter(root.name)}
              className={`px-3 py-1.5 rounded-2xs transition-all flex items-center gap-1 ${
                categoryFilter === root.name ? 'bg-[#151513] text-white shadow-xs' : 'bg-[#FDFBF7] border border-neutral-200 text-neutral-600 hover:text-maple-black'
              }`}
            >
              📁 {root.name}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold focus:outline-none focus:border-maple-red rounded-2xs"
          />
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden shadow-2xs rounded-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#151513] text-white text-[11px] font-extrabold uppercase tracking-wider border-b border-neutral-800">
              <th className="py-3.5 px-4">Bài Viết</th>
              <th className="py-3.5 px-4">Chuyên Mục (Cha / Con)</th>
              <th className="py-3.5 px-4">Tác Giả</th>
              <th className="py-3.5 px-4 text-center">Trạng Thái</th>
              <th className="py-3.5 px-4 text-center">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-medium text-[#1D1D1B]">
            {filteredArticles.map((art) => (
              <tr key={art.id} className="hover:bg-[#FDFBF7] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img src={art.coverImage} alt="Thumb" className="w-12 h-9 object-cover rounded-2xs border border-neutral-200" />
                    <div>
                      <span className="font-bold text-sm text-maple-black block">{art.title}</span>
                      <span className="text-[10px] font-mono text-neutral-400">/blog/{art.slug}</span>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 bg-red-50 text-maple-red border border-red-200 font-extrabold rounded-2xs text-[10px] inline-block uppercase tracking-wider">
                    {art.category}
                  </span>
                </td>

                <td className="py-3.5 px-4 font-bold text-neutral-700">
                  {art.author}
                </td>

                <td className="py-3.5 px-4 text-center">
                  <span className={`px-2.5 py-1 font-extrabold rounded-2xs text-[10px] border ${
                    art.status === 'Published' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                  }`}>
                    {art.status === 'Published' ? '🟢 Xuất bản' : '⚪ Bản nháp'}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setActiveArticleId(art.id)}
                      className="px-3 py-1.5 bg-[#151513] text-white hover:bg-maple-red text-[11px] font-extrabold rounded-2xs transition-colors inline-flex items-center gap-1 shadow-2xs"
                    >
                      <Edit2 size={13} /> Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(art.id)}
                      className="p-1.5 rounded-2xs border border-neutral-200 text-neutral-400 hover:text-red-600 hover:bg-neutral-100 transition-colors"
                      title="Xóa bài viết"
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

      {/* HIERARCHICAL PARENT-CHILD CATEGORIES MANAGER MODAL */}
      {showManageCatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-neutral-200 max-w-xl w-full p-6 space-y-5 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FolderTree size={20} className="text-maple-red" />
                <div>
                  <span className="text-[10px] font-bold text-maple-gold uppercase tracking-wider block">PHÂN CẤP CÂY CHUYÊN MỤC</span>
                  <h3 className="text-base font-display font-extrabold text-[#1D1D1B]">
                    Quản Lý Chuyên Mục Cha - Chuyên Mục Con
                  </h3>
                </div>
              </div>
              <button onClick={() => setShowManageCatModal(false)} className="text-neutral-400 hover:text-black">
                <X size={18} />
              </button>
            </div>

            {/* Form Add Category Node */}
            <form onSubmit={handleAddBlogCategory} className="bg-[#FDFBF7] border border-neutral-200 p-3.5 rounded-2xs space-y-3 text-xs">
              <span className="font-extrabold text-maple-black uppercase text-[11px] block">
                + Thêm Chuyên Mục Mới
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Tên chuyên mục..."
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="p-2 bg-white border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />

                <select
                  value={newCatParentId || ''}
                  onChange={(e) => setNewCatParentId(e.target.value ? e.target.value : null)}
                  className="p-2 bg-white border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none rounded-2xs cursor-pointer"
                >
                  <option value="">📁 -- Tạo làm Chuyên Mục Cha (Root) --</option>
                  {rootCategories.map(root => (
                    <option key={root.id} value={root.id}>
                      ↳ Trực thuộc Cha: {root.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#151513] hover:bg-maple-red text-white font-extrabold text-xs transition-colors rounded-2xs flex items-center gap-1 shadow-2xs"
                >
                  <Plus size={15} /> Thêm Vào Cây Chuyên Mục
                </button>
              </div>
            </form>

            {/* Category Tree View */}
            <div className="space-y-3 max-h-80 overflow-y-auto border border-neutral-200 p-3 rounded-2xs">
              {rootCategories.map((parentRoot) => {
                const childNodes = blogCategories.filter(c => c.parentId === parentRoot.id)
                return (
                  <div key={parentRoot.id} className="bg-white border border-neutral-200 rounded-2xs overflow-hidden shadow-2xs">
                    
                    {/* Parent Root Header */}
                    <div className="bg-[#151513] text-white p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Folder size={16} className="text-maple-gold" />
                        {editingCatId === parentRoot.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editingCatName}
                              onChange={(e) => setEditingCatName(e.target.value)}
                              className="p-1 text-black font-bold rounded-2xs text-xs"
                            />
                            <button
                              onClick={() => handleSaveEditCat(parentRoot.id)}
                              className="px-2 py-0.5 bg-emerald-700 text-white font-bold text-[10px] rounded-2xs"
                            >
                              Lưu
                            </button>
                          </div>
                        ) : (
                          <span className="font-extrabold tracking-wide uppercase">{parentRoot.name}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {editingCatId !== parentRoot.id && (
                          <button
                            onClick={() => {
                              setEditingCatId(parentRoot.id)
                              setEditingCatName(parentRoot.name)
                            }}
                            className="p-1 text-neutral-400 hover:text-white"
                            title="Đổi tên chuyên mục cha"
                          >
                            <Edit2 size={13} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBlogCat(parentRoot.id)}
                          className="p-1 text-neutral-500 hover:text-red-400"
                          title="Xóa chuyên mục cha"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Children List */}
                    <div className="p-3 bg-[#FDFBF7] space-y-2">
                      {childNodes.length > 0 ? (
                        childNodes.map((child) => (
                          <div key={child.id} className="flex items-center justify-between text-xs pl-4 border-l-2 border-maple-red/30 py-1">
                            <div className="flex items-center gap-2">
                              <CornerDownRight size={14} className="text-maple-red" />
                              {editingCatId === child.id ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={editingCatName}
                                    onChange={(e) => setEditingCatName(e.target.value)}
                                    className="p-1 border border-neutral-300 text-black font-bold rounded-2xs text-xs"
                                  />
                                  <button
                                    onClick={() => handleSaveEditCat(child.id)}
                                    className="px-2 py-0.5 bg-emerald-700 text-white font-bold text-[10px] rounded-2xs"
                                  >
                                    Lưu
                                  </button>
                                </div>
                              ) : (
                                <span className="font-bold text-neutral-800">{child.name}</span>
                              )}
                            </div>

                            <div className="flex items-center gap-1">
                              {editingCatId !== child.id && (
                                <button
                                  onClick={() => {
                                    setEditingCatId(child.id)
                                    setEditingCatName(child.name)
                                  }}
                                  className="p-1 text-neutral-400 hover:text-black"
                                  title="Đổi tên"
                                >
                                  <Edit2 size={13} />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteBlogCat(child.id)}
                                className="p-1 text-neutral-400 hover:text-red-600"
                                title="Xóa chuyên mục con"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-[11px] text-neutral-400 font-light italic pl-4">
                          Chưa có chuyên mục con. Hãy chọn thuộc về chuyên mục cha này khi thêm mới.
                        </div>
                      )}
                    </div>

                  </div>
                )
              })}
            </div>

            <div className="flex justify-end pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setShowManageCatModal(false)}
                className="px-4 py-2 bg-neutral-100 text-[#1D1D1B] font-bold text-xs border border-neutral-300 rounded-2xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
