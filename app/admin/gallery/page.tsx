'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import {
  Upload,
  Plus,
  Trash2,
  Edit2,
  Filter,
  CheckCircle2,
  Maximize2,
  Copy,
  Download,
  ExternalLink,
  X,
  Search,
  Eye,
  Check,
  ChevronLeft,
  ChevronRight,
  Folder,
  FolderTree,
  CornerDownRight,
  HardDrive,
  Database,
  PieChart,
  Layers,
  Sparkles
} from 'lucide-react'

export type MediaCategoryNode = {
  id: string
  name_vi: string
  name_en: string
  parentId: string | null // null = Root Parent Category
  slug: string
}

type GalleryItem = {
  id: string
  title: string
  categoryId: string
  categoryName: string
  src: string
  date: string
  fileSize: string
  fileSizeBytes: number // exact byte calculation
  dimensions: string
  format: 'WebP' | 'JPEG' | 'PNG'
}

const initialMediaCategories: MediaCategoryNode[] = [
  // Parent Root Categories
  { id: 'mcat-facility', name_vi: 'Cơ Sở Vật Chất & Trường Học', name_en: 'Campus & Facilities', parentId: null, slug: 'facilities' },
  { id: 'mcat-academics', name_vi: 'Hoạt Động Học Tập & Lớp Học', name_en: 'Classrooms & Academics', parentId: null, slug: 'academics' },
  { id: 'mcat-events', name_vi: 'Sự Kiện & Ngoại Khóa', name_en: 'Events & Extracurricular', parentId: null, slug: 'events' },

  // Child Subcategories
  { id: 'sub-classroom', name_vi: 'Lớp Học Quốc Tế', name_en: 'International Classrooms', parentId: 'mcat-academics', slug: 'classrooms' },
  { id: 'sub-library', name_vi: 'Thư Viện & Góc Đọc Sách', name_en: 'Library & Reading Corner', parentId: 'mcat-academics', slug: 'library' },
  { id: 'sub-sports', name_vi: 'Khu Thể Thao & Bể Bơi Bốn Mùa', name_en: 'Sports Hall & Swimming Pool', parentId: 'mcat-facility', slug: 'sports-pool' },
  { id: 'sub-playground', name_vi: 'Khu Vui Chơi Trẻ Em', name_en: 'Kids Play Zone', parentId: 'mcat-facility', slug: 'playground' },
  { id: 'sub-festivals', name_vi: 'Lễ Hội & Festival', name_en: 'School Festivals', parentId: 'mcat-events', slug: 'festivals' }
]

const initialGallery: GalleryItem[] = [
  { id: '1', title: 'Modern Library Center & Reading Corner', categoryId: 'sub-library', categoryName: 'Thư Viện & Góc Đọc Sách', src: SCHOOL_IMAGES.render.thuVien1, date: '02/08/2026', fileSize: '2.4 MB', fileSizeBytes: 2516582, dimensions: '1920 x 1080 px', format: 'WebP' },
  { id: '2', title: 'Interactive Learning Classroom Zone 1', categoryId: 'sub-classroom', categoryName: 'Lớp Học Quốc Tế', src: SCHOOL_IMAGES.render.lopHoc1, date: '01/08/2026', fileSize: '1.8 MB', fileSizeBytes: 1887436, dimensions: '1920 x 1080 px', format: 'WebP' },
  { id: '3', title: 'Multi-Purpose Indoor Sports Hall', categoryId: 'sub-sports', categoryName: 'Khu Thể Thao & Bể Bơi', src: SCHOOL_IMAGES.render.phongChucNang1, date: '28/07/2026', fileSize: '3.1 MB', fileSizeBytes: 3250585, dimensions: '1920 x 1080 px', format: 'JPEG' },
  { id: '4', title: 'Bright Campus Main Hallway', categoryId: 'mcat-facility', categoryName: 'Cơ Sở Vật Chất', src: SCHOOL_IMAGES.render.hanhLang1, date: '25/07/2026', fileSize: '2.1 MB', fileSizeBytes: 2202009, dimensions: '1920 x 1080 px', format: 'WebP' },
  { id: '5', title: 'Early Discovery & Sensory Room', categoryId: 'sub-classroom', categoryName: 'Lớp Học Quốc Tế', src: SCHOOL_IMAGES.render.lopHoc2, date: '20/07/2026', fileSize: '2.0 MB', fileSizeBytes: 2097152, dimensions: '1920 x 1080 px', format: 'WebP' },
  { id: '6', title: 'Storytelling & Phonics Reading Zone', categoryId: 'sub-library', categoryName: 'Thư Viện & Góc Đọc Sách', src: SCHOOL_IMAGES.render.thuVien2, date: '18/07/2026', fileSize: '1.9 MB', fileSizeBytes: 1992294, dimensions: '1920 x 1080 px', format: 'WebP' },
  { id: '7', title: 'Creative Arts & Crafts Studio', categoryId: 'sub-sports', categoryName: 'Khu Thể Thao', src: SCHOOL_IMAGES.render.phongChucNang2, date: '15/07/2026', fileSize: '2.8 MB', fileSizeBytes: 2936012, dimensions: '1920 x 1080 px', format: 'JPEG' },
  { id: '8', title: 'Child-Centered Play & Activity Zone', categoryId: 'sub-playground', categoryName: 'Khu Vui Chơi Trẻ Em', src: SCHOOL_IMAGES.render.lopHoc3, date: '10/07/2026', fileSize: '2.2 MB', fileSizeBytes: 2306867, dimensions: '1920 x 1080 px', format: 'WebP' },
]

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery)
  const [categories, setCategories] = useState<MediaCategoryNode[]>(initialMediaCategories)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCatModal, setShowCatModal] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Add Upload State
  const [newTitle, setNewTitle] = useState('')
  const [newCatId, setNewCatId] = useState<string>('sub-classroom')
  const [isCompressedUpload, setIsCompressedUpload] = useState(true)

  // Add Category State
  const [newCatVi, setNewCatVi] = useState('')
  const [newCatEn, setNewCatEn] = useState('')
  const [newCatParentId, setNewCatParentId] = useState<string | null>(null)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [editingCatVi, setEditingCatVi] = useState('')
  const [editingCatEn, setEditingCatEn] = useState('')

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
  const getCatName = (cat: MediaCategoryNode) => {
    return adminUiLang === 'en' ? cat.name_en : cat.name_vi
  }

  // Calculate Supabase Storage Statistics
  const SUPABASE_STORAGE_LIMIT_BYTES = 1073741824 // 1.0 GB Free Tier
  const totalUsedBytes = gallery.reduce((sum, item) => sum + item.fileSizeBytes, 0)
  const totalUsedMB = (totalUsedBytes / (1024 * 1024)).toFixed(1)
  const totalLimitMB = (SUPABASE_STORAGE_LIMIT_BYTES / (1024 * 1024)).toFixed(0)
  const remainingBytes = SUPABASE_STORAGE_LIMIT_BYTES - totalUsedBytes
  const remainingMB = (remainingBytes / (1024 * 1024)).toFixed(1)
  const usagePercentage = ((totalUsedBytes / SUPABASE_STORAGE_LIMIT_BYTES) * 100).toFixed(1)

  // Filter gallery items
  const filtered = gallery.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase())
    if (selectedCategory === 'ALL') return matchesSearch
    
    // Check if matching exact category or child category
    const catNode = categories.find(c => c.id === selectedCategory)
    if (!catNode) return matchesSearch && g.categoryId === selectedCategory

    if (catNode.parentId === null) {
      // Parent category selected: match parent or any child
      const childIds = categories.filter(c => c.parentId === catNode.id).map(c => c.id)
      return matchesSearch && (g.categoryId === catNode.id || childIds.includes(g.categoryId))
    }
    return matchesSearch && g.categoryId === selectedCategory
  })

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : 0))
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : 0))
      } else if (e.key === 'Escape') {
        setLightboxIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, filtered.length])

  // Category Tree Handlers
  const handleAddMediaCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatVi) return
    const newCatNode: MediaCategoryNode = {
      id: `mcat-${Date.now()}`,
      name_vi: newCatVi.trim(),
      name_en: newCatEn.trim() || newCatVi.trim(),
      parentId: newCatParentId,
      slug: (newCatEn || newCatVi).toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }
    setCategories([...categories, newCatNode])
    setNewCatVi('')
    setNewCatEn('')
    setNewCatParentId(null)
  }

  const handleSaveEditCat = (catId: string) => {
    if (!editingCatVi) return
    setCategories(categories.map(c => c.id === catId ? {
      ...c,
      name_vi: editingCatVi.trim(),
      name_en: editingCatEn.trim() || editingCatVi.trim()
    } : c))
    setEditingCatId(null)
  }

  const handleDeleteMediaCat = (catId: string) => {
    const targetCat = categories.find(c => c.id === catId)
    if (!targetCat) return

    const hasChildren = categories.some(c => c.parentId === catId)
    if (hasChildren) {
      alert(`Không thể xóa Chuyên mục Media cha [${targetCat.name_vi}] vì còn các Chuyên mục con đang trực thuộc!`)
      return
    }

    if (confirm(`Bạn có chắc muốn xóa chuyên mục Media [${targetCat.name_vi}]?`)) {
      setCategories(categories.filter(c => c.id !== catId))
    }
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const selectedCatNode = categories.find(c => c.id === newCatId)
    const catName = selectedCatNode ? getCatName(selectedCatNode) : 'Lớp Học'

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: newTitle,
      categoryId: newCatId,
      categoryName: catName,
      src: SCHOOL_IMAGES.render.lopHoc3,
      date: new Date().toLocaleDateString('en-GB'),
      fileSize: '340 KB',
      fileSizeBytes: 348160,
      dimensions: '1920 x 1080 px',
      format: 'WebP'
    }

    setGallery([newItem, ...gallery])
    setNewTitle('')
    setShowUploadModal(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa hình ảnh này khỏi Thư Viện Media?')) {
      setGallery(gallery.filter(g => g.id !== id))
      if (lightboxIndex !== null && filtered[lightboxIndex]?.id === id) {
        setLightboxIndex(null)
      }
    }
  }

  const handleCopyLink = (item: GalleryItem) => {
    navigator.clipboard.writeText(window.location.origin + item.src)
    setCopiedId(item.id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    setGallery(gallery.map(g => g.id === editingItem.id ? editingItem : g))
    setEditingItem(null)
  }

  const currentLightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null
  const rootCategories = categories.filter(c => c.parentId === null)

  return (
    <div className="space-y-6 w-full text-[#1D1D1B] animate-fade-in pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-neutral-200 p-6 shadow-2xs rounded-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
            <span className="text-xs font-bold text-maple-red uppercase tracking-wider">
              {adminUiLang === 'vi' ? 'HỆ THỐNG QUẢN LÝ MEDIA & SUPABASE STORAGE' : 'MEDIA LIBRARY & SUPABASE STORAGE ENGINE'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#1D1D1B]">
            {adminUiLang === 'vi' ? 'Thư Viện Truyền Thông & Dung Lượng Lưu Trữ' : 'Media Assets & Storage Manager'}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCatModal(true)}
            className="px-3.5 py-2.5 bg-white text-neutral-800 border border-neutral-300 hover:bg-[#FDFBF7] text-xs font-extrabold transition-all flex items-center gap-1.5 rounded-2xs shadow-2xs"
          >
            <FolderTree size={16} className="text-maple-red" />
            {adminUiLang === 'vi' ? `Quản Lý Cây Chuyên Mục (${categories.length})` : `Category Tree (${categories.length})`}
          </button>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 bg-[#151513] text-white text-xs font-extrabold hover:bg-maple-red transition-all flex items-center gap-1.5 rounded-2xs shadow-2xs uppercase tracking-wider"
          >
            <Upload size={16} />
            {adminUiLang === 'vi' ? 'Tải Ảnh Mới' : 'Upload Asset'}
          </button>
        </div>
      </div>

      {/* SUPABASE STORAGE CAPACITY AUDIT MONITOR */}
      <div className="bg-[#151513] text-white p-5 border border-neutral-800 shadow-md rounded-2xs space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-neutral-800 border border-neutral-700 text-maple-gold rounded-2xs">
              <Database size={22} />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block">
                SUPABASE BUCKET: <span className="text-emerald-400 font-bold">sunshine-media-production</span>
              </span>
              <h3 className="text-base font-display font-extrabold text-white">
                Dung Lượng Lưu Trữ Kho Ảnh (Supabase Cloud Storage)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-neutral-400 text-[10px] block">Đã sử dụng:</span>
              <span className="font-extrabold text-maple-gold text-sm">{totalUsedMB} MB</span>
            </div>
            <div className="text-right">
              <span className="text-neutral-400 text-[10px] block">Khả dụng còn lại:</span>
              <span className="font-extrabold text-emerald-400 text-sm">{remainingMB} MB</span>
            </div>
            <div className="text-right border-l border-neutral-700 pl-4">
              <span className="text-neutral-400 text-[10px] block">Hạn mức Free Tier:</span>
              <span className="font-extrabold text-white text-sm">{totalLimitMB} MB (1.0 GB)</span>
            </div>
          </div>
        </div>

        {/* Visual Storage Progress Bar */}
        <div className="space-y-1 pt-1">
          <div className="h-2.5 w-full bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-maple-gold to-maple-red transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(2, parseFloat(usagePercentage))}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono">
            <span>Đã tải lên {gallery.length} hình ảnh truyền thông</span>
            <span>Tỷ lệ sử dụng: <strong className="text-emerald-400">{usagePercentage}%</strong></span>
          </div>
        </div>
      </div>

      {/* FILTER BAR WITH SEGMENTED CATEGORIES & SEARCH */}
      <div className="bg-white border border-neutral-200 p-4 rounded-2xs shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Tìm kiếm hình ảnh theo tên, kích thước, định dạng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold focus:outline-none focus:border-maple-red rounded-2xs"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
            <Filter size={14} />
            <span>{filtered.length} hình ảnh hiển thị</span>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold border-t border-neutral-100">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-1.5 rounded-2xs transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-[#151513] text-white shadow-xs'
                : 'bg-[#FDFBF7] border border-neutral-200 text-neutral-600 hover:text-maple-black hover:border-neutral-300'
            }`}
          >
            Tất cả ({gallery.length})
          </button>

          {rootCategories.map(root => {
            const children = categories.filter(c => c.parentId === root.id)
            return (
              <div key={root.id} className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedCategory(root.id)}
                  className={`px-3.5 py-1.5 rounded-2xs transition-all flex items-center gap-1.5 ${
                    selectedCategory === root.id
                      ? 'bg-[#151513] text-white shadow-xs'
                      : 'bg-[#FDFBF7] border border-neutral-200 text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  <Folder size={13} className="text-maple-gold" />
                  {getCatName(root)}
                </button>

                {children.map(child => (
                  <button
                    key={child.id}
                    onClick={() => setSelectedCategory(child.id)}
                    className={`px-3 py-1.5 rounded-2xs transition-all text-[11px] font-semibold ${
                      selectedCategory === child.id
                        ? 'bg-maple-red text-white shadow-xs'
                        : 'bg-neutral-100 border border-neutral-200 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    ↳ {getCatName(child)}
                  </button>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* MEDIA ASSETS GRID WITH PROMINENT FILE SIZE BADGES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((item, idx) => (
          <div key={item.id} className="bg-white border border-neutral-200 p-3 space-y-3 shadow-2xs group hover:border-neutral-400 transition-colors flex flex-col justify-between rounded-2xs">
            <div className="space-y-3">
              
              {/* Photo Frame */}
              <div
                onClick={() => setLightboxIndex(idx)}
                className="relative h-44 w-full bg-neutral-900 overflow-hidden cursor-pointer group/img rounded-2xs"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                
                {/* Category Badge Top Left */}
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold border border-white/20 rounded-2xs">
                  {item.categoryName}
                </span>

                {/* File Size Badge Top Right */}
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-950/90 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40 rounded-2xs shadow-xs">
                  💾 {item.fileSize}
                </span>

                {/* View Lightbox Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="px-3 py-1.5 bg-white text-[#1D1D1B] font-extrabold text-xs flex items-center gap-1.5 rounded-2xs shadow-md">
                    <Maximize2 size={13} /> Xem Chi Tiết & Zoom
                  </span>
                </div>
              </div>

              {/* Title & Detailed Metadata */}
              <div>
                <h3 className="text-xs font-bold text-[#1D1D1B] leading-tight line-clamp-1" title={item.title}>
                  {item.title}
                </h3>
                
                <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono mt-1 pt-1 border-t border-neutral-100">
                  <span className="font-bold text-emerald-700">💾 {item.fileSize} ({item.format})</span>
                  <span>{item.dimensions}</span>
                </div>
              </div>

            </div>

            {/* Quick Action Toolbar */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1">
              <button
                onClick={() => handleCopyLink(item)}
                className={`flex-1 py-1.5 px-2 text-xs font-bold flex items-center justify-center gap-1 border transition-colors rounded-2xs ${
                  copiedId === item.id
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-[#FDFBF7] text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                }`}
                title="Copy Image URL to Clipboard"
              >
                {copiedId === item.id ? <Check size={13} /> : <Copy size={13} />}
                {copiedId === item.id ? 'Đã chép link' : 'Sao chép link'}
              </button>

              <button
                onClick={() => setEditingItem(item)}
                className="p-1.5 text-neutral-500 hover:text-maple-red border border-neutral-200 hover:border-neutral-400 transition-colors rounded-2xs"
                title="Edit Title / Category"
              >
                <Edit2 size={14} />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-neutral-500 hover:text-red-600 border border-neutral-200 hover:border-red-300 transition-colors rounded-2xs"
                title="Delete Photo Asset"
              >
                <Trash2 size={14} />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: HIGH-RES LIGHTBOX PREVIEW WITH METADATA & CAPACITY */}
      {/* ------------------------------------------------------------- */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 animate-fade-in text-[#1D1D1B]">
          
          <div className="bg-[#151513] text-white border border-neutral-800 max-w-6xl w-full p-6 space-y-6 shadow-2xl relative flex flex-col max-h-[92vh] rounded-2xs">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-maple-gold block">Chuyên mục Media: {currentLightboxItem.categoryName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-2xs">
                    Photo 0{lightboxIndex + 1} / 0{filtered.length}
                  </span>
                </div>
                <h3 className="text-xl font-display font-extrabold text-white mt-0.5">{currentLightboxItem.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border border-neutral-700 bg-neutral-900 mr-2 rounded-2xs overflow-hidden">
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)}
                    className="p-2 hover:bg-maple-red text-white transition-colors border-r border-neutral-700"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % filtered.length)}
                    className="p-2 hover:bg-maple-red text-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 border border-neutral-700 bg-neutral-800 hover:bg-maple-red text-white transition-colors rounded-2xs"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Photo View Box */}
            <div className="relative flex-1 min-h-[380px] max-h-[580px] bg-neutral-950 flex items-center justify-center overflow-hidden border border-neutral-800 rounded-2xs">
              <Image
                src={currentLightboxItem.src}
                alt={currentLightboxItem.title}
                width={1200}
                height={900}
                unoptimized
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Footer Metadata */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900 p-4 border border-neutral-800 rounded-2xs text-xs font-mono">
              <div className="flex flex-wrap gap-4 text-neutral-300">
                <div>Dung lượng: <strong className="text-emerald-400 font-bold">{currentLightboxItem.fileSize}</strong></div>
                <div>Định dạng: <strong className="text-maple-gold">{currentLightboxItem.format}</strong></div>
                <div>Độ phân giải: <strong>{currentLightboxItem.dimensions}</strong></div>
                <div>Ngày tải lên: <strong>{currentLightboxItem.date}</strong></div>
              </div>

              <button
                onClick={() => handleCopyLink(currentLightboxItem)}
                className="px-4 py-2 bg-maple-red hover:bg-red-700 text-white font-extrabold text-xs transition-colors flex items-center gap-1.5 rounded-2xs"
              >
                <Copy size={15} /> Sao chép URL Hình Ảnh
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: UPLOAD MEDIA WITH WEBP COMPRESSION */}
      {/* ------------------------------------------------------------- */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-neutral-200 max-w-lg w-full p-6 space-y-4 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Upload size={18} className="text-maple-red" />
                <h3 className="text-base font-display font-extrabold text-[#1D1D1B] uppercase">Tải Ảnh Mới Lên Supabase Storage</h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-neutral-400 hover:text-black">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div className="border-2 border-dashed border-neutral-300 p-6 text-center bg-[#FDFBF7] rounded-2xs space-y-2">
                <Upload size={32} className="mx-auto text-neutral-400" />
                <span className="font-bold text-neutral-700 block">Kéo thả hình ảnh hoặc chọn tệp từ máy tính</span>
                <input type="file" accept="image/*" className="text-xs text-neutral-500 cursor-pointer" />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold rounded-2xs flex items-center justify-between">
                <span>⚡ Tự động tối ưu nén ảnh WebP tiêu chuẩn (Giảm 70% dung lượng)</span>
                <span className="text-[9px] bg-emerald-700 text-white px-2 py-0.5 rounded-2xs">WEBP ACTIVE</span>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Tiêu đề hình ảnh *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Khuôn viên bể bơi bốn mùa mầm non..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 font-bold rounded-2xs"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Chọn Chuyên Mục Media *</label>
                <select
                  value={newCatId}
                  onChange={(e) => setNewCatId(e.target.value)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 font-bold rounded-2xs cursor-pointer"
                >
                  {rootCategories.map(parent => {
                    const children = categories.filter(c => c.parentId === parent.id)
                    return (
                      <optgroup key={parent.id} label={`📁 ${getCatName(parent)}`}>
                        <option value={parent.id}>📁 Tất cả {getCatName(parent)}</option>
                        {children.map(child => (
                          <option key={child.id} value={child.id}>
                            └─ 📄 {getCatName(child)}
                          </option>
                        ))}
                      </optgroup>
                    )
                  })}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-neutral-100 text-black font-bold border border-neutral-300 rounded-2xs"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#151513] hover:bg-maple-red text-white font-extrabold rounded-2xs shadow-2xs"
                >
                  Tải Lên Khám Phá
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: MEDIA CATEGORY TREE MANAGER */}
      {/* ------------------------------------------------------------- */}
      {showCatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-neutral-200 max-w-xl w-full p-6 space-y-5 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FolderTree size={20} className="text-maple-red" />
                <div>
                  <span className="text-[10px] font-bold text-maple-gold uppercase tracking-wider block">MEDIA CATEGORIES</span>
                  <h3 className="text-base font-display font-extrabold text-[#1D1D1B]">
                    Quản Lý Cây Chuyên Mục Media Cha - Con
                  </h3>
                </div>
              </div>
              <button onClick={() => setShowCatModal(false)} className="text-neutral-400 hover:text-black">
                <X size={18} />
              </button>
            </div>

            {/* Form Add Category */}
            <form onSubmit={handleAddMediaCategory} className="bg-[#FDFBF7] border border-neutral-200 p-4 rounded-2xs space-y-3 text-xs">
              <span className="font-extrabold text-maple-black uppercase text-[11px] block">+ Thêm Chuyên Mục Media Mới</span>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="🇻🇳 Tên Việt (VD: Cơ sở vật chất)..."
                  value={newCatVi}
                  onChange={(e) => setNewCatVi(e.target.value)}
                  className="p-2 bg-white border border-neutral-300 text-xs font-bold rounded-2xs"
                />
                <input
                  type="text"
                  placeholder="🇬🇧 UK English (VD: Facilities)..."
                  value={newCatEn}
                  onChange={(e) => setNewCatEn(e.target.value)}
                  className="p-2 bg-white border border-neutral-300 text-xs font-bold rounded-2xs"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Thuộc Chuyên Mục Cha:</label>
                <select
                  value={newCatParentId || ''}
                  onChange={(e) => setNewCatParentId(e.target.value ? e.target.value : null)}
                  className="w-full p-2 bg-white border border-neutral-300 text-xs font-bold rounded-2xs cursor-pointer"
                >
                  <option value="">📁 -- Tạo làm Chuyên Mục Cha (Root Category) --</option>
                  {rootCategories.map(root => (
                    <option key={root.id} value={root.id}>
                      ↳ Trực thuộc Cha: {getCatName(root)}
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

            {/* Tree View */}
            <div className="space-y-3 max-h-80 overflow-y-auto border border-neutral-200 p-3 rounded-2xs">
              {rootCategories.map((parentRoot) => {
                const childNodes = categories.filter(c => c.parentId === parentRoot.id)
                return (
                  <div key={parentRoot.id} className="bg-white border border-neutral-200 rounded-2xs overflow-hidden shadow-2xs">
                    <div className="bg-[#151513] text-white p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Folder size={16} className="text-maple-gold" />
                        <span className="font-extrabold tracking-wide uppercase">
                          🇻🇳 {parentRoot.name_vi} | 🇬🇧 {parentRoot.name_en}
                        </span>
                      </div>
                      <button onClick={() => handleDeleteMediaCat(parentRoot.id)} className="p-1 text-neutral-500 hover:text-red-400">
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="p-3 bg-[#FDFBF7] space-y-2">
                      {childNodes.length > 0 ? (
                        childNodes.map((child) => (
                          <div key={child.id} className="flex items-center justify-between text-xs pl-4 border-l-2 border-maple-red/30 py-1">
                            <div className="flex items-center gap-2">
                              <CornerDownRight size={14} className="text-maple-red" />
                              <span className="font-bold text-neutral-800">
                                🇻🇳 {child.name_vi} <span className="text-neutral-400 font-normal">| 🇬🇧 {child.name_en}</span>
                              </span>
                            </div>
                            <button onClick={() => handleDeleteMediaCat(child.id)} className="p-1 text-neutral-400 hover:text-red-600">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-[11px] text-neutral-400 italic pl-4">Chưa có chuyên mục con.</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setShowCatModal(false)}
                className="px-4 py-2 bg-neutral-100 text-black font-bold text-xs border border-neutral-300 rounded-2xs"
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
