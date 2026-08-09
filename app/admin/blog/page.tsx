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
  CornerDownRight,
  Languages,
  ListTree,
  Target,
  BarChart2,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Monitor
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
  name_vi: string
  name_en: string
  parentId: string | null // null = Root Parent Category
  slug: string
}

const initialBlogCategories: BlogCategoryNode[] = [
  // Parent Root Categories
  { id: 'cat-academics', name_vi: 'Chương Trình Học', name_en: 'Academics', parentId: null, slug: 'academics' },
  { id: 'cat-health', name_vi: 'Sức Khỏe & Dinh Dưỡng', name_en: 'Health & Nutrition', parentId: null, slug: 'health-nutrition' },
  { id: 'cat-community', name_vi: 'Góc Phụ Huynh & Cộng Đồng', name_en: 'Parenting & Community', parentId: null, slug: 'community' },
  { id: 'cat-philosophy', name_vi: 'Triết Lý Giáo Dục', name_en: 'Educational Philosophy', parentId: null, slug: 'philosophy' },

  // Child Subcategories
  { id: 'sub-earlyyears', name_vi: 'Mầm Non & Khối Mẫu Giáo', name_en: 'Early Years & Kindergarten', parentId: 'cat-academics', slug: 'early-years' },
  { id: 'sub-bilingual', name_vi: 'Song Ngữ Anh-Việt', name_en: 'Bilingual English Immersion', parentId: 'cat-academics', slug: 'english-immersion' },
  { id: 'sub-extracurricular', name_vi: 'Ngoại Khóa & Năng Khiếu', name_en: 'Extracurricular Activities', parentId: 'cat-academics', slug: 'extracurricular' },

  { id: 'sub-nutrition', name_vi: 'Thực Đơn & Dinh Dưỡng Hữu Cơ', name_en: 'Organic Nutrition & Dining', parentId: 'cat-health', slug: 'organic-nutrition' },
  { id: 'sub-safeguarding', name_vi: 'An Toàn & Y Tế 24/7', name_en: 'Child Safety & Medical Care', parentId: 'cat-health', slug: 'safeguarding' },

  { id: 'sub-events', name_vi: 'Sự Kiện Trường & Open Day', name_en: 'School Events & Open Day', parentId: 'cat-community', slug: 'events-openday' },
  { id: 'sub-handbook', name_vi: 'Cẩm Nang Đồng Hành Cùng Con', name_en: 'Parenting Handbook', parentId: 'cat-community', slug: 'parent-handbook' }
]

const initialArticles: Article[] = [
  {
    id: '1',
    title: 'Why English Immersion in Early Childhood Matters',
    title_vi: 'Tại sao Môi trường Song ngữ 100% Tiếng Anh lại Quan trọng ở Lứa tuổi Mầm non?',
    title_en: 'Why English Immersion in Early Childhood Matters',
    slug: 'why-english-immersion-matters',
    category: 'Song Ngữ Anh-Việt',
    author: 'Sarah Johnson',
    status: 'Published',
    date: '04/08/2026',
    views: 342,
    coverImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
    excerpt: 'Exploring the cognitive and linguistic advantages of 100% English immersion in early childhood education.',
    excerpt_vi: 'Khám phá các lợi ích phát triển tư duy ngôn ngữ độc quyền khi trẻ được học tập trong môi trường thẩm thấu Tiếng Anh tự nhiên chuẩn Canada.',
    excerpt_en: 'Exploring the cognitive and linguistic advantages of 100% English immersion in early childhood education.',
    content: '<h2>Sức mạnh của việc Thẩm thấu Ngôn ngữ Mầm non</h2><p>Trong giai đoạn 0-6 tuổi, bộ não của trẻ nhỏ phát triển vượt bậc về liên kết thần kinh ngôn ngữ. Tại Sunshine Maple Bear, môi trường 100% Tiếng Anh giúp trẻ tiếp thu tự nhiên như tiếng mẹ đẻ.</p><h3>Lợi ích nổi bật của Thẩm thấu Tự nhiên:</h3><ul><li>Phát âm chuẩn âm tiết mà không bị ảnh hưởng bởi tư duy dịch nhẩm.</li><li>Tăng cường sự linh hoạt nhận thức và kỹ năng điều hành não bộ.</li><li>Chuyển tiếp mượt mà lên các cấp học quốc tế.</li></ul>',
    content_vi: '<h2>Sức mạnh của việc Thẩm thấu Ngôn ngữ Mầm non</h2><p>Trong giai đoạn 0-6 tuổi, bộ não của trẻ nhỏ phát triển vượt bậc về liên kết thần kinh ngôn ngữ. Tại Sunshine Maple Bear, môi trường 100% Tiếng Anh giúp trẻ tiếp thu tự nhiên như tiếng mẹ đẻ.</p><h3>Lợi ích nổi bật của Thẩm thấu Tự nhiên:</h3><ul><li>Phát âm chuẩn âm tiết mà không bị ảnh hưởng bởi tư duy dịch nhẩm.</li><li>Tăng cường sự linh hoạt nhận thức và kỹ năng điều hành não bộ.</li><li>Chuyển tiếp mượt mà lên các cấp học quốc tế.</li></ul>',
    content_en: '<h2>The Power of Early Childhood Language Acquisition</h2><p>In early childhood, the human brain undergoes rapid neurological development, creating an unparalleled window of opportunity for natural language learning. At Sunshine Maple Bear, our 100% English immersion environment leverages this critical developmental stage.</p><h3>Key Benefits of Natural Immersion:</h3><ul><li>Natural phonetic pronunciation without native language interference.</li><li>Enhanced cognitive flexibility and executive function skills.</li><li>Seamless transition to international primary and secondary schools.</li></ul>',
    focusKeyword: 'tiếng anh mầm non',
    seoTitle: 'Why English Immersion in Early Childhood Matters | Sunshine Maple Bear',
    seoDescription: 'Discover the cognitive and linguistic benefits of 100% English immersion for preschool children at Sunshine Maple Bear Hanoi.',
    canonicalUrl: 'https://www.sunshinemaplebear.edu.vn/blog/why-english-immersion-matters',
    ogImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'
  },
  {
    id: '2',
    title: '5 Principles of Maple Bear Canadian Early Childhood Program',
    title_vi: '5 Nguyên Tắc Giáo Dục Mầm Non Chuẩn Canada Tại Maple Bear',
    title_en: '5 Principles of Maple Bear Canadian Early Childhood Program',
    slug: '5-principles-maple-bear-canada',
    category: 'Chương Trình Học',
    author: 'Admin Team',
    status: 'Published',
    date: '01/08/2026',
    views: 512,
    coverImage: '/images/render/LOP_HOC_DIEN_HINH_4_.jpg',
    excerpt: 'An overview of the core educational pillars that make Canadian early childhood education world-renowned.',
    excerpt_vi: 'Tổng quan 5 trụ cột giáo dục mầm non hàng đầu thế giới từ hệ thống giáo dục Canada.',
    excerpt_en: 'An overview of the core educational pillars that make Canadian early childhood education world-renowned.',
    content: '<h2>Triết lý Giáo dục Canada Trong Thực Tế</h2><p>Hệ thống giáo dục mầm non Canada luôn nằm trong top đầu thế giới về chỉ số phát triển năng lực tư duy của trẻ nhỏ.</p><h3>5 Trụ Cột Nền Tảng:</h3><ol><li>Học tập chủ động lấy trẻ làm trung tâm.</li><li>Khám phá dựa trên truy vấn và trò chơi.</li><li>Môi trường song ngữ Anh-Việt toàn diện.</li></ol>',
    content_vi: '<h2>Triết lý Giáo dục Canada Trong Thực Tế</h2><p>Hệ thống giáo dục mầm non Canada luôn nằm trong top đầu thế giới về chỉ số phát triển năng lực tư duy của trẻ nhỏ.</p><h3>5 Trụ Cột Nền Tảng:</h3><ol><li>Học tập chủ động lấy trẻ làm trung tâm.</li><li>Khám phá dựa trên truy vấn và trò chơi.</li><li>Môi trường song ngữ Anh-Việt toàn diện.</li></ol>',
    content_en: '<h2>Canadian Educational Philosophy in Action</h2><p>Canadian early childhood education consistently ranks among the top international educational systems worldwide according to global OECD PISA scores.</p>',
    focusKeyword: 'phương pháp giáo dục canada',
    seoTitle: '5 Principles of Maple Bear Canadian Education | Sunshine Maple Bear',
    seoDescription: 'Learn about the 5 core principles of Canadian early childhood education implemented at Sunshine Maple Bear Campus.',
    canonicalUrl: 'https://www.sunshinemaplebear.edu.vn/blog/5-principles-maple-bear-canada',
    ogImage: '/images/render/LOP_HOC_DIEN_HINH_4_.jpg'
  },
  {
    id: '3',
    title: 'Nutrition & Meal Planning for Kindergarten Children',
    title_vi: 'Chế Độ Dinh Dưỡng Hữu Cơ & Thực Đơn Cho Bé Mầm Non',
    title_en: 'Nutrition & Meal Planning for Kindergarten Children',
    slug: 'nutrition-meal-planning-kindergarten',
    category: 'Thực Đơn & Dinh Dưỡng Hữu Cơ',
    author: 'Dr. Minh Anh',
    status: 'Draft',
    date: '28/07/2026',
    views: 0,
    coverImage: '/images/render/PHONG_CHUC_NANG_1_.jpg',
    excerpt: 'How our 5-star organic kitchen crafts balanced, calorie-optimized meals for growing children.',
    excerpt_vi: 'Khám phá bếp ăn hữu cơ 5 sao và quy trình lên thực đơn cân bằng calo cho bé mầm non Sunshine Maple Bear.',
    excerpt_en: 'How our 5-star organic kitchen crafts balanced, calorie-optimized meals for growing children.',
    content: '<h2>Ẩm Thực Hữu Cơ Cho Sự Phát Triển Của Bé</h2><p>Dinh dưỡng chuẩn hóa là nền tảng giúp bé phát triển thể chất và trí tuệ vượt trội.</p>',
    content_vi: '<h2>Ẩm Thực Hữu Cơ Cho Sự Phát Triển Của Bé</h2><p>Dinh dưỡng chuẩn hóa là nền tảng giúp bé phát triển thể chất và trí tuệ vượt trội.</p>',
    content_en: '<h2>Organic Culinary Excellence for Growing Bodies</h2><p>Proper nutrition is essential for physical stamina, immune resistance, and cognitive development during early childhood years.</p>',
    focusKeyword: 'dinh dưỡng mầm non',
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
  const [seoPreviewMode, setSeoPreviewMode] = useState<'desktop' | 'mobile'>('desktop')

  // Category Modal States (Bilingual)
  const [showManageCatModal, setShowManageCatModal] = useState(false)
  const [newCatVi, setNewCatVi] = useState('')
  const [newCatEn, setNewCatEn] = useState('')
  const [newCatParentId, setNewCatParentId] = useState<string | null>(null)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [editingCatVi, setEditingCatVi] = useState('')
  const [editingCatEn, setEditingCatEn] = useState('')

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

  // Helper for category localized display
  const getCatName = (cat: BlogCategoryNode) => {
    return adminUiLang === 'en' ? cat.name_en : cat.name_vi
  }

  // -------------------------------------------------------------
  // BILINGUAL HIERARCHICAL CATEGORY HANDLERS
  // -------------------------------------------------------------
  const handleAddBlogCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatVi) return
    const newCatNode: BlogCategoryNode = {
      id: `cat-${Date.now()}`,
      name_vi: newCatVi.trim(),
      name_en: newCatEn.trim() || newCatVi.trim(),
      parentId: newCatParentId,
      slug: (newCatEn || newCatVi).toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }

    setBlogCategories([...blogCategories, newCatNode])
    setNewCatVi('')
    setNewCatEn('')
    setNewCatParentId(null)
  }

  const handleSaveEditCat = (catId: string) => {
    if (!editingCatVi) return
    setBlogCategories(blogCategories.map(c => c.id === catId ? {
      ...c,
      name_vi: editingCatVi.trim(),
      name_en: editingCatEn.trim() || editingCatVi.trim()
    } : c))
    setEditingCatId(null)
  }

  const handleDeleteBlogCat = (catId: string) => {
    const targetCat = blogCategories.find(c => c.id === catId)
    if (!targetCat) return

    const hasChildren = blogCategories.some(c => c.parentId === catId)
    if (hasChildren) {
      alert(adminUiLang === 'vi'
        ? `Không thể xóa Chuyên mục cha [${targetCat.name_vi}] vì còn các Chuyên mục con đang trực thuộc!`
        : `Cannot delete Parent Category [${targetCat.name_en}] while child categories exist!`)
      return
    }

    if (confirm(adminUiLang === 'vi' ? `Bạn có chắc muốn xóa chuyên mục [${targetCat.name_vi}]?` : `Delete category [${targetCat.name_en}]?`)) {
      setBlogCategories(blogCategories.filter(c => c.id !== catId))
    }
  }

  // Convert Form Fields & Manual Bilingual Editor State
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
      title: adminUiLang === 'vi' ? 'Bài viết tin tức mới tạo' : 'New blog article post',
      title_vi: 'Bài viết tin tức mới tạo',
      title_en: 'New blog article post',
      slug: `bai-viet-moi-${Date.now()}`,
      category: 'Song Ngữ Anh-Việt',
      author: 'Sunshine Maple Bear Editorial Board',
      status: 'Draft',
      date: new Date().toLocaleDateString('en-GB'),
      views: 0,
      coverImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
      excerpt: 'Nhập tóm tắt bài viết...',
      excerpt_vi: 'Nhập tóm tắt bài viết...',
      excerpt_en: 'Enter article excerpt summary...',
      content: '<h2>Tiêu đề mục 1</h2><p>Nhập nội dung bài viết tại đây...</p>',
      content_vi: '<h2>Tiêu đề mục 1</h2><p>Nhập nội dung bài viết tại đây...</p>',
      content_en: '<h2>Heading Section 1</h2><p>Enter article content body here...</p>',
      focusKeyword: 'tin tuc mam non',
      seoTitle: 'Bài viết mới | Sunshine Maple Bear',
      seoDescription: 'Mô tả bài viết mới chuẩn SEO cho Sunshine Maple Bear Hanoi.',
      canonicalUrl: `https://www.sunshinemaplebear.edu.vn/blog/bai-viet-moi-${Date.now()}`,
      ogImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'
    }

    setArticles([newArt, ...articles])
    setActiveArticleId(newArt.id)
    setActiveTab('EDITOR')
  }

  const handleDeleteArticle = (id: string) => {
    if (confirm(adminUiLang === 'vi' ? 'Bạn có chắc muốn xóa bài viết này khỏi hệ thống?' : 'Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id))
      if (activeArticleId === id) setActiveArticleId(null)
    }
  }

  const handleSaveArticle = () => {
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  // -------------------------------------------------------------
  // SEO & TABLE OF CONTENTS ANALYZER HELPERS
  // -------------------------------------------------------------
  const currentContent = activeArticle ? getBilingualValue('content') : ''
  
  // Extract Headings for Table of Contents (TOC)
  const extractHeadingsFromHTML = (html: string) => {
    if (!html) return []
    const regex = /<h([2-4])[^>]*>(.*?)<\/h[2-4]>/gi
    const headings: { level: number; text: string }[] = []
    let match
    while ((match = regex.exec(html)) !== null) {
      const cleanText = match[2].replace(/<[^>]+>/g, '').trim()
      if (cleanText) {
        headings.push({ level: parseInt(match[1]), text: cleanText })
      }
    }
    return headings
  }

  const tocHeadings = extractHeadingsFromHTML(currentContent)

  // Calculate SEO Stats & Word Count
  const cleanBodyText = currentContent.replace(/<[^>]+>/gi, ' ').trim()
  const wordCount = cleanBodyText ? cleanBodyText.split(/\s+/).length : 0
  const readingTimeMins = Math.ceil(wordCount / 200) || 1

  // Count Links
  const internalLinkMatches = (currentContent.match(/href=["'](\/[^"']*|https?:\/\/(www\.)?sunshinemaplebear[^"']*)/gi) || []).length
  const externalLinkMatches = (currentContent.match(/href=["']https?:\/\/(?!(www\.)?sunshinemaplebear)[^"']*/gi) || []).length

  // Focus Keyword Density
  const focusKw = activeArticle?.focusKeyword?.toLowerCase().trim() || ''
  const kwOccurrences = focusKw ? (cleanBodyText.toLowerCase().split(focusKw).length - 1) : 0
  const kwDensityPct = wordCount > 0 && focusKw ? ((kwOccurrences * focusKw.split(/\s+/).length / wordCount) * 100).toFixed(1) : '0.0'

  // SEO Score Calculator
  const calcSeoScore = () => {
    if (!activeArticle) return 0
    let score = 50
    if (activeArticle.seoTitle.length >= 40 && activeArticle.seoTitle.length <= 65) score += 15
    if (activeArticle.seoDescription.length >= 100 && activeArticle.seoDescription.length <= 160) score += 15
    if (focusKw && activeArticle.seoTitle.toLowerCase().includes(focusKw)) score += 10
    if (focusKw && activeArticle.seoDescription.toLowerCase().includes(focusKw)) score += 10
    if (internalLinkMatches > 0) score += 5
    if (tocHeadings.length >= 2) score += 5
    return Math.min(100, score)
  }

  const overallSeoScore = calcSeoScore()

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.slug.includes(searchTerm)
    const matchesCat = categoryFilter === 'ALL' || a.category.toLowerCase().includes(categoryFilter.toLowerCase())
    return matchesSearch && matchesCat
  })

  // Separate Parent & Child categories for clean rendering
  const rootCategories = blogCategories.filter(c => c.parentId === null)

  // -------------------------------------------------------------
  // VIEW 1: BILINGUAL ARTICLE EDITOR WORKSPACE
  // -------------------------------------------------------------
  if (activeArticle) {
    return (
      <div className="space-y-6 w-full text-[#1D1D1B] animate-fade-in pb-12">
        
        {/* Top Control Header Bar */}
        <div className="bg-[#151513] text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-800 shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveArticleId(null)}
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white transition-colors flex items-center gap-1.5 text-xs font-bold border border-neutral-700 rounded-2xs"
            >
              <ArrowLeft size={16} /> {adminUiLang === 'vi' ? 'Quay lại Danh Sách' : 'Back to Articles'}
            </button>

            <div>
              <span className="text-[10px] text-maple-gold font-mono uppercase tracking-wider block">
                {activeArticle.category} — ID: {activeArticle.id}
              </span>
              <h2 className="text-base font-display font-extrabold text-white line-clamp-1">
                {adminUiLang === 'en' && activeArticle.title_en ? activeArticle.title_en : (activeArticle.title_vi || activeArticle.title)}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`/blog/${activeArticle.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-colors border border-neutral-700 flex items-center gap-1.5 rounded-2xs"
            >
              <Eye size={15} /> {adminUiLang === 'vi' ? 'Xem Live ↗' : 'View Live ↗'}
            </a>

            <button
              onClick={handleSaveArticle}
              className="px-4 py-2 bg-maple-red hover:bg-red-700 text-white text-xs font-extrabold transition-colors flex items-center gap-1.5 shadow-md rounded-2xs"
            >
              <Save size={16} /> {adminUiLang === 'vi' ? 'Lưu Bài Viết' : 'Save Article'}
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 rounded-2xs animate-fade-in">
            <CheckCircle2 size={16} /> {adminUiLang === 'vi' ? `Đã lưu bài viết [${activeArticle.title}] thành công!` : `Successfully saved article!`}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-200 bg-white shadow-2xs">
          {[
            { id: 'EDITOR', label: adminUiLang === 'vi' ? '1. Nội dung & Văn bản' : '1. Article Body & Text', icon: FileText },
            { id: 'SEO', label: adminUiLang === 'vi' ? '2. Cấu hình SEO & Google Studio' : '2. Technical SEO Studio', icon: Globe },
            { id: 'PUBLISH', label: adminUiLang === 'vi' ? '3. Xuất bản & Chuyên mục' : '3. Publishing & Categories', icon: Calendar },
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

        {/* TAB 1: BILINGUAL CONTENT EDITOR */}
        {activeTab === 'EDITOR' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Main Rich Text Editor Canvas (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
              
              {/* Bilingual Switcher */}
              <div className="p-3 bg-[#151513] text-white border border-neutral-800 space-y-2 rounded-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-maple-gold flex items-center gap-1.5">
                    <Globe size={14} /> Trình Biên Tập Song Ngữ Thủ Công
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {editContentLang === 'vi' ? '🇻🇳 Đang nhập bản Tiếng Việt' : '🇬🇧 Editing UK English Version'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditContentLang('vi')}
                    className={`flex-1 py-1.5 text-xs font-bold transition-all rounded-2xs flex items-center justify-center gap-1.5 ${
                      editContentLang === 'vi' ? 'bg-maple-red text-white' : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    🇻🇳 Bản Tiếng Việt
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditContentLang('en')}
                    className={`flex-1 py-1.5 text-xs font-bold transition-all rounded-2xs flex items-center justify-center gap-1.5 ${
                      editContentLang === 'en' ? 'bg-maple-red text-white' : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    🇬🇧 Bản Tiếng Anh (English)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  {editContentLang === 'vi' ? '🇻🇳 Tiêu đề Bài viết (Tiếng Việt) *' : '🇬🇧 Article Title (UK English) *'}
                </label>
                <input
                  type="text"
                  value={getBilingualValue('title')}
                  onChange={(e) => handleUpdateBilingualField('title', e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-sm font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  {editContentLang === 'vi' ? '🇻🇳 Tóm tắt ngắn Excerpt (Tiếng Việt) *' : '🇬🇧 Short Excerpt (UK English) *'}
                </label>
                <textarea
                  rows={2}
                  value={getBilingualValue('excerpt')}
                  onChange={(e) => handleUpdateBilingualField('excerpt', e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-medium text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  {editContentLang === 'vi' ? '🇻🇳 Nội dung chi tiết (WYSIWYG Rich Text) *' : '🇬🇧 Detailed Content Body (WYSIWYG) *'}
                </label>
                <RichTextEditor
                  value={getBilingualValue('content')}
                  onChange={(html) => handleUpdateBilingualField('content', html)}
                />
              </div>
            </div>

            {/* Right Sidebar: Cover Image, TOC & Live Word Audit (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Cover Image Box */}
              <div className="bg-white border border-neutral-200 p-4 space-y-3 shadow-2xs rounded-2xs">
                <h4 className="text-xs font-extrabold text-maple-black uppercase border-b pb-2">
                  {adminUiLang === 'vi' ? 'Ảnh Đại Diện Cover' : 'Cover Image'}
                </h4>
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

              {/* AUTO-GENERATED TABLE OF CONTENTS (TOC) WIDGET */}
              <div className="bg-white border border-neutral-200 p-4 space-y-3 shadow-2xs rounded-2xs">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                  <span className="text-xs font-extrabold text-maple-black uppercase flex items-center gap-1.5">
                    <ListTree size={15} className="text-maple-red" />
                    Mục Lục Bài Viết Auto TOC ({tocHeadings.length})
                  </span>
                  <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded-2xs text-neutral-600 font-bold">
                    ~{wordCount} từ · {readingTimeMins} phút đọc
                  </span>
                </div>

                {tocHeadings.length > 0 ? (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                    {tocHeadings.map((h, i) => (
                      <div
                        key={i}
                        className={`text-[11px] font-medium py-1 px-2 hover:bg-[#FDFBF7] rounded-2xs transition-colors flex items-center gap-1.5 ${
                          h.level === 2 ? 'font-bold text-maple-black border-l-2 border-maple-red pl-2' : 'text-neutral-600 pl-4'
                        }`}
                      >
                        <span className="text-neutral-400 font-mono text-[9px]">{h.level === 2 ? 'H2' : 'H3'}</span>
                        <span className="truncate">{h.text}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-[#FDFBF7] border border-neutral-200 text-[11px] text-neutral-500 italic rounded-2xs">
                    Chưa có thẻ Heading H2/H3. Sử dụng menu Soạn Thảo để thêm Tiêu Đề Mục (Heading) giúp tự động tạo Mục Lục bài viết.
                  </div>
                )}
              </div>

              {/* QUICK SEO SCORECARD SUMMARY */}
              <div className="bg-white border border-neutral-200 p-4 space-y-3 shadow-2xs rounded-2xs">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                  <span className="text-xs font-extrabold text-maple-black uppercase flex items-center gap-1.5">
                    <BarChart2 size={15} className="text-emerald-600" />
                    Điểm SEO Bài Viết
                  </span>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-2xs">
                    {overallSeoScore}/100 🟢
                  </span>
                </div>

                <div className="space-y-2 text-xs font-medium">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-600">Từ khóa chính (Focus Keyword):</span>
                    <span className="font-bold font-mono text-maple-black">{focusKw || 'Chưa nhập'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-600">Mật độ từ khóa (Density):</span>
                    <span className="font-bold font-mono text-emerald-700">{kwDensityPct}% ({kwOccurrences} lần)</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-600">Liên kết nội bộ (Internal Links):</span>
                    <span className="font-bold font-mono text-blue-700">{internalLinkMatches} link</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-600">Liên kết ngoài (External Links):</span>
                    <span className="font-bold font-mono text-purple-700">{externalLinkMatches} link</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: COMPLETE TECHNICAL SEO STUDIO & GOOGLE SNIPPET PREVIEW */}
        {activeTab === 'SEO' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Main SEO Studio Settings (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 space-y-5 shadow-2xs rounded-2xs">
              <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-maple-red uppercase tracking-wider block">SEARCH ENGINE OPTIMIZATION</span>
                  <h3 className="text-base font-display font-extrabold text-[#1D1D1B]">Cấu Hình SEO Google & Meta Tags</h3>
                </div>
                
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold text-xs rounded-2xs">
                  Chỉ số SEO: {overallSeoScore}/100 🟢
                </span>
              </div>

              {/* Focus Keyword */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 block flex items-center justify-between">
                  <span>Từ Khóa Chính (Focus Keyword) *</span>
                  <span className="text-[10px] text-neutral-400 font-normal">Từ khóa khách hàng sẽ tìm trên Google</span>
                </label>
                <input
                  type="text"
                  value={activeArticle.focusKeyword || ''}
                  onChange={(e) => handleUpdateArticleField('focusKeyword', e.target.value)}
                  placeholder="Ví dụ: tiếng anh mầm non, trường mầm non canada..."
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              {/* SEO Title Tag */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-neutral-800">
                  <span>SEO Title Tag (Thẻ Tiêu Đề Google) *</span>
                  <span className={`text-[10px] font-mono ${
                    activeArticle.seoTitle.length >= 40 && activeArticle.seoTitle.length <= 65 ? 'text-emerald-700 font-bold' : 'text-amber-600'
                  }`}>
                    {activeArticle.seoTitle.length} / 60 ký tự (Khuyến nghị 50-60)
                  </span>
                </div>
                <input
                  type="text"
                  value={activeArticle.seoTitle}
                  onChange={(e) => handleUpdateArticleField('seoTitle', e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              {/* SEO Meta Description */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-neutral-800">
                  <span>SEO Meta Description (Thẻ Mô Tả Google) *</span>
                  <span className={`text-[10px] font-mono ${
                    activeArticle.seoDescription.length >= 120 && activeArticle.seoDescription.length <= 160 ? 'text-emerald-700 font-bold' : 'text-amber-600'
                  }`}>
                    {activeArticle.seoDescription.length} / 160 ký tự (Khuyến nghị 120-160)
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={activeArticle.seoDescription}
                  onChange={(e) => handleUpdateArticleField('seoDescription', e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-medium text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              {/* Canonical URL & OG Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Canonical URL Slug:</label>
                  <input
                    type="text"
                    value={activeArticle.canonicalUrl || ''}
                    onChange={(e) => handleUpdateArticleField('canonicalUrl', e.target.value)}
                    className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono rounded-2xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Open Graph Image (Social Share):</label>
                  <input
                    type="text"
                    value={activeArticle.ogImage || activeArticle.coverImage}
                    onChange={(e) => handleUpdateArticleField('ogImage', e.target.value)}
                    className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono rounded-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Google Live Snippet Preview & SEO Checklist (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Live Google Search Preview Box */}
              <div className="bg-white border border-neutral-200 p-5 space-y-3 shadow-2xs rounded-2xs">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                  <span className="text-xs font-extrabold text-maple-black uppercase flex items-center gap-1.5">
                    <Globe size={15} className="text-blue-600" />
                    Xem Trước Google Search Snippet
                  </span>
                  <div className="flex items-center bg-neutral-100 p-0.5 rounded-2xs text-[10px] font-bold">
                    <button
                      onClick={() => setSeoPreviewMode('desktop')}
                      className={`px-2 py-0.5 rounded-2xs flex items-center gap-1 ${seoPreviewMode === 'desktop' ? 'bg-white text-black shadow-xs' : 'text-neutral-500'}`}
                    >
                      <Monitor size={10} /> Máy tính
                    </button>
                    <button
                      onClick={() => setSeoPreviewMode('mobile')}
                      className={`px-2 py-0.5 rounded-2xs flex items-center gap-1 ${seoPreviewMode === 'mobile' ? 'bg-white text-black shadow-xs' : 'text-neutral-500'}`}
                    >
                      <Smartphone size={10} /> Di động
                    </button>
                  </div>
                </div>

                {/* Simulated Google Search Result */}
                <div className={`p-4 bg-white border border-neutral-200 rounded-2xs space-y-1 ${seoPreviewMode === 'mobile' ? 'max-w-xs mx-auto' : ''}`}>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#202124] truncate">
                    <span className="w-4 h-4 rounded-full bg-maple-red text-white text-[8px] font-bold flex items-center justify-center">M</span>
                    <span className="truncate">sunshinemaplebear.edu.vn › blog › {activeArticle.slug}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer line-clamp-1 leading-snug">
                    {activeArticle.seoTitle || activeArticle.title}
                  </h4>
                  <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed font-light">
                    {activeArticle.seoDescription || activeArticle.excerpt}
                  </p>
                </div>
              </div>

              {/* Interactive SEO Audit Checklist */}
              <div className="bg-white border border-neutral-200 p-5 space-y-3 shadow-2xs rounded-2xs">
                <span className="text-xs font-extrabold text-maple-black uppercase block border-b pb-2">
                  Danh Sách Kiểm Tra Chuẩn SEO Bài Viết
                </span>

                <div className="space-y-2 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    {activeArticle.seoTitle.length >= 40 ? <CheckCircle size={14} className="text-emerald-600" /> : <AlertTriangle size={14} className="text-amber-500" />}
                    <span>Độ dài SEO Title đạt chuẩn (50-60 ký tự)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeArticle.seoDescription.length >= 100 ? <CheckCircle size={14} className="text-emerald-600" /> : <AlertTriangle size={14} className="text-amber-500" />}
                    <span>Độ dài Meta Description đạt chuẩn (120-160 ký tự)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {focusKw && activeArticle.seoTitle.toLowerCase().includes(focusKw) ? <CheckCircle size={14} className="text-emerald-600" /> : <AlertTriangle size={14} className="text-amber-500" />}
                    <span>Từ khóa chính xuất hiện trong SEO Title</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {focusKw && activeArticle.seoDescription.toLowerCase().includes(focusKw) ? <CheckCircle size={14} className="text-emerald-600" /> : <AlertTriangle size={14} className="text-amber-500" />}
                    <span>Từ khóa chính xuất hiện trong Meta Description</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {internalLinkMatches > 0 ? <CheckCircle size={14} className="text-emerald-600" /> : <AlertTriangle size={14} className="text-amber-500" />}
                    <span>Có liên kết nội bộ (Internal Links): {internalLinkMatches} link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {tocHeadings.length >= 2 ? <CheckCircle size={14} className="text-emerald-600" /> : <AlertTriangle size={14} className="text-amber-500" />}
                    <span>Cấu trúc thẻ Heading (H2/H3): {tocHeadings.length} tiêu đề</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: PUBLISHING & HIERARCHICAL CATEGORY SELECTION */}
        {activeTab === 'PUBLISH' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-8 bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
              <div className="border-b border-neutral-100 pb-2">
                <span className="text-[10px] font-bold text-maple-gold uppercase block">XUẤT BẢN & PHÂN CẤP CHUYÊN MỤC</span>
                <h3 className="text-base font-display font-extrabold text-[#1D1D1B]">
                  {adminUiLang === 'vi' ? 'Chọn Chuyên Mục Trực Thuộc' : 'Assign Article Category'}
                </h3>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Chuyên mục bài viết *' : 'Article Category *'}
                </label>
                <select
                  value={activeArticle.category}
                  onChange={(e) => handleUpdateArticleField('category', e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs cursor-pointer"
                >
                  {rootCategories.map(parent => {
                    const children = blogCategories.filter(c => c.parentId === parent.id)
                    return (
                      <optgroup key={parent.id} label={`📁 ${getCatName(parent)}`}>
                        <option value={getCatName(parent)}>📁 Tất cả {getCatName(parent)} (Chuyên Mục Gốc)</option>
                        {children.map(child => (
                          <option key={child.id} value={getCatName(child)}>
                            └─ 📄 {getCatName(child)}
                          </option>
                        ))}
                      </optgroup>
                    )
                  })}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">{adminUiLang === 'vi' ? 'Trạng thái bài viết' : 'Publish Status'}</label>
                  <select
                    value={activeArticle.status}
                    onChange={(e) => handleUpdateArticleField('status', e.target.value as any)}
                    className="w-full p-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold rounded-2xs"
                  >
                    <option value="Published">🟢 {adminUiLang === 'vi' ? 'Xuất Bản (Published)' : 'Published'}</option>
                    <option value="Draft">⚪ {adminUiLang === 'vi' ? 'Bản Nháp (Draft)' : 'Draft'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">{adminUiLang === 'vi' ? 'Tác giả' : 'Author'}</label>
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
            <span className="text-xs font-bold text-maple-red uppercase tracking-wider">
              {adminUiLang === 'vi' ? 'HỆ THỐNG CMS QUẢN LÝ BLOG TIN TỨC' : 'BLOG & ARTICLES CMS ENGINE'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#1D1D1B]">
            {adminUiLang === 'vi' ? 'Tin Tức & Bài Viết Blog Phân Cấp Song Ngữ' : 'Bilingual Hierarchical News & Articles'}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowManageCatModal(true)}
            className="px-3.5 py-2.5 bg-white text-neutral-800 border border-neutral-300 hover:bg-[#FDFBF7] text-xs font-extrabold transition-all flex items-center gap-1.5 rounded-2xs shadow-2xs"
          >
            <FolderTree size={16} className="text-maple-red" />
            {adminUiLang === 'vi' ? `Quản Lý Cây Chuyên Mục (${blogCategories.length})` : `Manage Category Tree (${blogCategories.length})`}
          </button>

          <button
            onClick={handleCreateNewArticle}
            className="px-4 py-2.5 bg-[#151513] text-white text-xs font-extrabold hover:bg-maple-red transition-all flex items-center gap-1.5 rounded-2xs shadow-2xs uppercase tracking-wider"
          >
            <Plus size={16} />
            {adminUiLang === 'vi' ? 'Tạo Bài Viết Mới' : 'Create Article'}
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
            {adminUiLang === 'vi' ? `Tất cả (${articles.length})` : `All (${articles.length})`}
          </button>

          {rootCategories.map(root => (
            <button
              key={root.id}
              onClick={() => setCategoryFilter(getCatName(root))}
              className={`px-4 py-2 rounded-2xs transition-all flex items-center gap-1.5 ${
                categoryFilter === getCatName(root)
                  ? 'bg-[#151513] text-white shadow-xs'
                  : 'bg-[#FDFBF7] border border-neutral-200 text-neutral-600 hover:text-maple-black hover:border-neutral-300'
              }`}
            >
              <Folder size={13} className="text-maple-gold" />
              {getCatName(root)}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder={adminUiLang === 'vi' ? 'Tìm bài viết...' : 'Search articles...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold focus:outline-none focus:border-maple-red rounded-2xs"
          />
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden shadow-2xs rounded-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#151513] text-white text-[11px] font-extrabold uppercase tracking-wider border-b border-neutral-800">
              <th className="py-3.5 px-4">{adminUiLang === 'vi' ? 'Bài Viết' : 'Article Title'}</th>
              <th className="py-3.5 px-4">{adminUiLang === 'vi' ? 'Chuyên Mục (Cha / Con)' : 'Category (Parent / Child)'}</th>
              <th className="py-3.5 px-4">{adminUiLang === 'vi' ? 'Tác Giả' : 'Author'}</th>
              <th className="py-3.5 px-4 text-center">{adminUiLang === 'vi' ? 'Trạng Thái' : 'Status'}</th>
              <th className="py-3.5 px-4 text-center">{adminUiLang === 'vi' ? 'Thao Tác' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-medium text-[#1D1D1B]">
            {filteredArticles.map((art) => (
              <tr key={art.id} className="hover:bg-[#FDFBF7] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img src={art.coverImage} alt="Thumb" className="w-12 h-9 object-cover rounded-2xs border border-neutral-200" />
                    <div>
                      <span className="font-bold text-sm text-maple-black block">
                        {adminUiLang === 'en' && art.title_en ? art.title_en : (art.title_vi || art.title)}
                      </span>
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
                    {art.status === 'Published'
                      ? (adminUiLang === 'vi' ? '🟢 Xuất bản' : '🟢 Published')
                      : (adminUiLang === 'vi' ? '⚪ Bản nháp' : '⚪ Draft')}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setActiveArticleId(art.id)}
                      className="px-3.5 py-1.5 bg-[#151513] text-white hover:bg-maple-red text-[11px] font-extrabold rounded-2xs transition-colors inline-flex items-center gap-1 shadow-2xs"
                    >
                      <Edit2 size={13} /> {adminUiLang === 'vi' ? 'Sửa' : 'Edit'}
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

      {/* BILINGUAL HIERARCHICAL PARENT-CHILD CATEGORIES MANAGER MODAL */}
      {showManageCatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-neutral-200 max-w-xl w-full p-6 space-y-5 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FolderTree size={20} className="text-maple-red" />
                <div>
                  <span className="text-[10px] font-bold text-maple-gold uppercase tracking-wider block">BILINGUAL CATEGORY TREE</span>
                  <h3 className="text-base font-display font-extrabold text-[#1D1D1B]">
                    {adminUiLang === 'vi' ? 'Quản Lý Cây Chuyên Mục Song Ngữ Cha - Con' : 'Manage Bilingual Category Tree Hierarchy'}
                  </h3>
                </div>
              </div>
              <button onClick={() => setShowManageCatModal(false)} className="text-neutral-400 hover:text-black">
                <X size={18} />
              </button>
            </div>

            {/* Form Add Category Node */}
            <form onSubmit={handleAddBlogCategory} className="bg-[#FDFBF7] border border-neutral-200 p-4 rounded-2xs space-y-3 text-xs">
              <span className="font-extrabold text-maple-black uppercase text-[11px] block">
                + {adminUiLang === 'vi' ? 'Thêm Chuyên Mục Mới' : 'Add New Category'}
              </span>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="🇻🇳 Tên Việt (VD: Sự Kiện)..."
                  value={newCatVi}
                  onChange={(e) => setNewCatVi(e.target.value)}
                  className="p-2 bg-white border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />

                <input
                  type="text"
                  placeholder="🇬🇧 UK English (VD: Events)..."
                  value={newCatEn}
                  onChange={(e) => setNewCatEn(e.target.value)}
                  className="p-2 bg-white border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red rounded-2xs"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Thuộc Chuyên Mục Cha:' : 'Parent Category:'}
                </label>
                <select
                  value={newCatParentId || ''}
                  onChange={(e) => setNewCatParentId(e.target.value ? e.target.value : null)}
                  className="w-full p-2 bg-white border border-neutral-300 text-xs font-bold text-maple-black focus:outline-none rounded-2xs cursor-pointer"
                >
                  <option value="">📁 -- {adminUiLang === 'vi' ? 'Tạo làm Chuyên Mục Cha (Root)' : 'Create as Root Parent Category'} --</option>
                  {rootCategories.map(root => (
                    <option key={root.id} value={root.id}>
                      ↳ {adminUiLang === 'vi' ? 'Trực thuộc Cha:' : 'Under Parent:'} {getCatName(root)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#151513] hover:bg-maple-red text-white font-extrabold text-xs transition-colors rounded-2xs flex items-center gap-1 shadow-2xs"
                >
                  <Plus size={15} /> {adminUiLang === 'vi' ? 'Thêm Vào Cây Chuyên Mục' : 'Add to Category Tree'}
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
                              value={editingCatVi}
                              onChange={(e) => setEditingCatVi(e.target.value)}
                              className="p-1 text-black font-bold rounded-2xs text-xs"
                            />
                            <input
                              type="text"
                              value={editingCatEn}
                              onChange={(e) => setEditingCatEn(e.target.value)}
                              className="p-1 text-black font-bold rounded-2xs text-xs"
                            />
                            <button
                              onClick={() => handleSaveEditCat(parentRoot.id)}
                              className="px-2 py-0.5 bg-emerald-700 text-white font-bold text-[10px] rounded-2xs"
                            >
                              {adminUiLang === 'vi' ? 'Lưu' : 'Save'}
                            </button>
                          </div>
                        ) : (
                          <span className="font-extrabold tracking-wide uppercase">
                            🇻🇳 {parentRoot.name_vi} | 🇬🇧 {parentRoot.name_en}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {editingCatId !== parentRoot.id && (
                          <button
                            onClick={() => {
                              setEditingCatId(parentRoot.id)
                              setEditingCatVi(parentRoot.name_vi)
                              setEditingCatEn(parentRoot.name_en)
                            }}
                            className="p-1 text-neutral-400 hover:text-white"
                            title="Đổi tên"
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
                                    value={editingCatVi}
                                    onChange={(e) => setEditingCatVi(e.target.value)}
                                    className="p-1 border border-neutral-300 text-black font-bold rounded-2xs text-xs"
                                  />
                                  <input
                                    type="text"
                                    value={editingCatEn}
                                    onChange={(e) => setEditingCatEn(e.target.value)}
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
                                <span className="font-bold text-neutral-800">
                                  🇻🇳 {child.name_vi} <span className="text-neutral-400 font-normal">| 🇬🇧 {child.name_en}</span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1">
                              {editingCatId !== child.id && (
                                <button
                                  onClick={() => {
                                    setEditingCatId(child.id)
                                    setEditingCatVi(child.name_vi)
                                    setEditingCatEn(child.name_en)
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
                          {adminUiLang === 'vi' ? 'Chưa có chuyên mục con.' : 'No subcategories yet.'}
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
                {adminUiLang === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
