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
  ChevronRight
} from 'lucide-react'

type GalleryItem = {
  id: string
  title: string
  category: 'CLASSROOM' | 'LIBRARY' | 'ACTIVITIES' | 'CAMPUS' | 'FACILITY'
  src: string
  date: string
  fileSize: string
  dimensions: string
}

const initialGallery: GalleryItem[] = [
  { id: '1', title: 'Modern Library Center & Reading Corner', category: 'LIBRARY', src: SCHOOL_IMAGES.render.thuVien1, date: '02/08/2026', fileSize: '2.4 MB', dimensions: '1920 x 1080 px' },
  { id: '2', title: 'Interactive Learning Classroom Zone 1', category: 'CLASSROOM', src: SCHOOL_IMAGES.render.lopHoc1, date: '01/08/2026', fileSize: '1.8 MB', dimensions: '1920 x 1080 px' },
  { id: '3', title: 'Multi-Purpose Indoor Sports Hall', category: 'ACTIVITIES', src: SCHOOL_IMAGES.render.phongChucNang1, date: '28/07/2026', fileSize: '3.1 MB', dimensions: '1920 x 1080 px' },
  { id: '4', title: 'Bright Campus Main Hallway', category: 'CAMPUS', src: SCHOOL_IMAGES.render.hanhLang1, date: '25/07/2026', fileSize: '2.1 MB', dimensions: '1920 x 1080 px' },
  { id: '5', title: 'Early Discovery & Sensory Room', category: 'CLASSROOM', src: SCHOOL_IMAGES.render.lopHoc2, date: '20/07/2026', fileSize: '2.0 MB', dimensions: '1920 x 1080 px' },
  { id: '6', title: 'Storytelling & Phonics Reading Zone', category: 'LIBRARY', src: SCHOOL_IMAGES.render.thuVien2, date: '18/07/2026', fileSize: '1.9 MB', dimensions: '1920 x 1080 px' },
  { id: '7', title: 'Creative Arts & Crafts Studio', category: 'ACTIVITIES', src: SCHOOL_IMAGES.render.phongChucNang2, date: '15/07/2026', fileSize: '2.8 MB', dimensions: '1920 x 1080 px' },
  { id: '8', title: 'Child-Centered Play & Activity Zone', category: 'CLASSROOM', src: SCHOOL_IMAGES.render.lopHoc3, date: '10/07/2026', fileSize: '2.2 MB', dimensions: '1920 x 1080 px' },
]

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const [newTitle, setNewTitle] = useState('')
  const [newCat, setNewCat] = useState<'CLASSROOM' | 'LIBRARY' | 'ACTIVITIES' | 'CAMPUS'>('CLASSROOM')

  const filtered = gallery.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'ALL' || g.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Keyboard navigation for Lightbox (Arrow Left / Arrow Right / Escape)
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

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCat,
      src: SCHOOL_IMAGES.render.lopHoc3,
      date: new Date().toLocaleDateString('en-GB'),
      fileSize: '2.0 MB',
      dimensions: '1920 x 1080 px'
    }

    setGallery([newItem, ...gallery])
    setNewTitle('')
    setShowUploadModal(false)
  }

  const handleDelete = (id: string) => {
    setGallery(gallery.filter(g => g.id !== id))
    if (lightboxIndex !== null && filtered[lightboxIndex]?.id === id) {
      setLightboxIndex(null)
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

  return (
    <div className="space-y-8 w-full">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-neutral-200 p-5 shadow-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red block">Thư viện Truyền thông & Hình ảnh</span>
          <h2 className="text-xl font-display font-bold text-[#1D1D1B]">Hình ảnh Trường & Cơ sở vật chất</h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">Tải lên ảnh mới, xem trực quan và sao chép đường dẫn hình ảnh cho bài viết.</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-3.5 py-1.5 bg-[#1D1D1B] text-white text-xs font-semibold hover:bg-maple-red transition-colors border border-[#1D1D1B] flex items-center gap-1.5 rounded-2xs shadow-2xs"
        >
          <Upload size={15} />
          Tải ảnh mới
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white border border-neutral-200 p-3.5 shadow-2xs">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm kiếm hình ảnh theo tiêu đề hoặc từ khóa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'ALL', label: 'Tất cả' },
            { id: 'CLASSROOM', label: 'Lớp học' },
            { id: 'LIBRARY', label: 'Thư viện' },
            { id: 'ACTIVITIES', label: 'Hoạt động' },
            { id: 'CAMPUS', label: 'Khuôn viên' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setLightboxIndex(null); }}
              className={`px-3 py-1.5 text-xs font-semibold transition-all border rounded-2xs ${
                selectedCategory === cat.id
                  ? 'bg-[#1D1D1B] text-white border-[#1D1D1B]'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
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
                
                {/* Overlay Badge */}
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-semibold border border-white/20 rounded-2xs">
                  {item.category}
                </span>

                {/* View Lightbox Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="px-3 py-1.5 bg-white text-[#1D1D1B] font-semibold text-xs flex items-center gap-1.5 rounded-2xs">
                    <Maximize2 size={13} /> Xem ảnh lớn
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div>
                <h3 className="text-xs font-semibold text-[#1D1D1B] leading-tight line-clamp-1" title={item.title}>
                  {item.title}
                </h3>
                <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono mt-1">
                  <span>{item.dimensions}</span>
                  <span>{item.date}</span>
                </div>
              </div>

            </div>

            {/* Quick Action Toolbar */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1">
              <button
                onClick={() => handleCopyLink(item)}
                className={`flex-1 py-1.5 px-2 text-xs font-semibold flex items-center justify-center gap-1 border transition-colors rounded-2xs ${
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
                className="p-1.5 text-neutral-500 hover:text-maple-red border border-neutral-200 hover:border-neutral-400 transition-colors"
                title="Edit Caption / Category"
              >
                <Edit2 size={14} />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-neutral-500 hover:text-red-600 border border-neutral-200 hover:border-red-300 transition-colors"
                title="Delete Photo Asset"
              >
                <Trash2 size={14} />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: FULL HIGH-RESOLUTION LIGHTBOX PREVIEW WITH NEXT / PREV */}
      {/* ------------------------------------------------------------- */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 animate-fade-in">
          
          {/* Lightbox Container */}
          <div className="bg-[#151513] text-white border border-neutral-800 max-w-6xl w-full p-6 space-y-6 shadow-2xl relative flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-maple-gold block">Tư liệu truyền thông: {currentLightboxItem.category}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-800 text-neutral-300 border border-neutral-700">
                    Photo 0{lightboxIndex + 1} / 0{filtered.length}
                  </span>
                </div>
                <h3 className="text-xl font-display font-extrabold text-white mt-0.5">{currentLightboxItem.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Next / Prev Buttons Header Controls */}
                <div className="flex items-center border border-neutral-700 bg-neutral-900 mr-2">
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)}
                    className="p-2 hover:bg-maple-red text-white transition-colors border-r border-neutral-700"
                    title="Previous Photo (Left Arrow Key)"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % filtered.length)}
                    className="p-2 hover:bg-maple-red text-white transition-colors"
                    title="Next Photo (Right Arrow Key)"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 border border-neutral-700 bg-neutral-800 hover:bg-maple-red text-white transition-colors"
                  title="Close Lightbox (Esc Key)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Stage with Side Arrows */}
            <div className="relative flex-1 min-h-[380px] md:min-h-[480px] bg-neutral-950 overflow-hidden border border-neutral-800 flex items-center justify-center group/stage">
              
              {/* Left Arrow Button Overlay */}
              <button
                onClick={() => setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-maple-red text-white border border-white/20 flex items-center justify-center z-20 transition-all opacity-80 group-hover/stage:opacity-100 shadow-xl"
                title="Previous Photo"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Main Photo */}
              <Image
                src={currentLightboxItem.src}
                alt={currentLightboxItem.title}
                fill
                className="object-contain transition-all duration-300"
                priority
              />

              {/* Right Arrow Button Overlay */}
              <button
                onClick={() => setLightboxIndex((lightboxIndex + 1) % filtered.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-maple-red text-white border border-white/20 flex items-center justify-center z-20 transition-all opacity-80 group-hover/stage:opacity-100 shadow-xl"
                title="Next Photo"
              >
                <ChevronRight size={24} />
              </button>

            </div>

            {/* Footer Specs & Quick Copy Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-neutral-800 pt-4 text-xs">
              <div className="flex gap-4 text-neutral-400 font-mono text-[11px]">
                <span>Resolution: <strong className="text-white">{currentLightboxItem.dimensions}</strong></span>
                <span>File Size: <strong className="text-white">{currentLightboxItem.fileSize}</strong></span>
                <span>Uploaded: <strong className="text-white">{currentLightboxItem.date}</strong></span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleCopyLink(currentLightboxItem)}
                  className={`px-3 py-1.5 text-xs font-semibold border flex items-center gap-1.5 transition-colors rounded-2xs ${
                    copiedId === currentLightboxItem.id
                      ? 'bg-emerald-700 text-white border-emerald-600'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700'
                  }`}
                >
                  {copiedId === currentLightboxItem.id ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === currentLightboxItem.id ? 'Đã chép URL' : 'Sao chép đường dẫn'}
                </button>
                <a
                  href={currentLightboxItem.src}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-maple-red hover:bg-red-700 text-white font-semibold text-xs border border-maple-red flex items-center gap-1.5 rounded-2xs"
                >
                  <ExternalLink size={14} />
                  Mở ảnh gốc chất lượng cao
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: EDIT METADATA & CAPTION */}
      {/* ------------------------------------------------------------- */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white text-[#1D1D1B] border border-neutral-300 max-w-md w-full p-5 space-y-4 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-200 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-semibold text-maple-red block">Chỉnh sửa thông tin hình ảnh</span>
                <h3 className="text-base font-display font-bold text-[#1D1D1B]">Cập nhật tiêu đề & Danh mục</h3>
              </div>
              <button onClick={() => setEditingItem(null)} className="text-neutral-400 hover:text-black">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold block mb-1">Tiêu đề / Chú thích ảnh *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Danh mục album *</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                >
                  <option value="CLASSROOM">Lớp học (Classroom)</option>
                  <option value="LIBRARY">Thư viện (Library)</option>
                  <option value="ACTIVITIES">Hoạt động (Activities)</option>
                  <option value="CAMPUS">Khuôn viên (Campus)</option>
                  <option value="FACILITY">Cơ sở vật chất (Facility)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3.5 py-1.5 bg-neutral-100 text-[#1D1D1B] font-semibold text-xs border border-neutral-300 rounded-2xs"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white font-semibold text-xs border border-[#1D1D1B] transition-colors rounded-2xs shadow-2xs"
                >
                  Lưu thông tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: UPLOAD NEW PHOTO ASSET */}
      {/* ------------------------------------------------------------- */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 max-w-md w-full p-5 space-y-4 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-200 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-semibold text-maple-red block">Tải lên hình ảnh mới</span>
                <h3 className="text-base font-display font-bold text-[#1D1D1B]">Thêm tệp ảnh vào Thư viện</h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-neutral-400 hover:text-black">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-3">
              <div>
                <label className="text-xs font-semibold block mb-1">Tiêu đề / Chú thích ảnh *</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập chú thích ảnh..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Danh mục album *</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                >
                  <option value="CLASSROOM">Lớp học (Classroom)</option>
                  <option value="LIBRARY">Thư viện (Library)</option>
                  <option value="ACTIVITIES">Hoạt động (Activities)</option>
                  <option value="CAMPUS">Khuôn viên (Campus)</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-neutral-300 p-6 text-center bg-[#FDFBF7] rounded-2xs">
                <Upload size={20} className="mx-auto text-neutral-400 mb-1" />
                <span className="text-xs font-semibold text-neutral-600 block">Kéo & thả tệp hình ảnh vào đây</span>
                <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">Hỗ trợ JPG, PNG, WEBP (Tối đa 10MB)</span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3.5 py-1.5 bg-neutral-100 text-[#1D1D1B] font-semibold text-xs border border-neutral-300 rounded-2xs"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white font-semibold text-xs border border-[#1D1D1B] transition-colors rounded-2xs shadow-2xs"
                >
                  Tải ảnh lên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
