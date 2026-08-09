'use client'

import { useState, useEffect } from 'react'
import { Calendar, Plus, Search, Edit3, Trash2, Users, CheckCircle2, Clock, MapPin, Eye, ExternalLink, X, Save, Copy, Link2, Check, Award, Image as ImageIcon, Upload, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface AgendaItem {
  time: string
  activity: string
}

interface SchoolEvent {
  id: string
  slug: string
  title: string
  category: 'Open Day' | 'Workshop' | 'Festival' | 'Webinar'
  startDate: string
  endDate: string
  location: string
  coverImage: string
  galleryImages?: string[]
  isPublic: boolean
  isRegistrationOpen: boolean
  maxAttendees: number
  registeredCount: number
  description: string
  highlights: string[]
  agenda: AgendaItem[]
}

interface MediaItem {
  id: string
  title: string
  url: string
  category: string
}

const MEDIA_LIBRARY_PRESETS: MediaItem[] = [
  { id: 'm-1', title: 'Lớp Học Mầm Non 5 Sao #1', url: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg', category: 'Phòng học' },
  { id: 'm-2', title: 'Lớp Học Song Ngữ #2', url: '/images/render/LOP_HOC_DIEN_HINH_2_.jpg', category: 'Phòng học' },
  { id: 'm-3', title: 'Lớp Học Trải Nghiệm #3', url: '/images/render/LOP_HOC_DIEN_HINH_3_.jpg', category: 'Phòng học' },
  { id: 'm-4', title: 'Góc Học Tập Nhóm #4', url: '/images/render/LOP_HOC_DIEN_HINH_4_.jpg', category: 'Phòng học' },
  { id: 'm-5', title: 'Không Gian Tự Do #5', url: '/images/render/LOP_HOC_DIEN_HINH_5_.jpg', category: 'Phòng học' },
  { id: 'm-6', title: 'Thư Viện 5.000 Đầu Sách #1', url: '/images/render/THU_VIEN_1_.jpg', category: 'Thư viện' },
  { id: 'm-7', title: 'Góc Đọc Sách Sáng Tạo #6', url: '/images/render/THU_VIEN_6_.jpg', category: 'Thư viện' },
  { id: 'm-8', title: 'Khu Vực Kể Chuyện #7', url: '/images/render/THU_VIEN_7_.jpg', category: 'Thư viện' },
  { id: 'm-9', title: 'Sân Chơi Vận Động', url: '/images/render/SAN_CHOI_1_.jpg', category: 'Sân chơi' },
  { id: 'm-10', title: 'Phòng STEAM Khoa Học', url: '/images/render/PHONG_STEAM_2_.jpg', category: 'Phòng chức năng' },
  { id: 'm-11', title: 'Phòng Năng Khiếu #1', url: '/images/render/PHONG_CHUC_NANG_1_.jpg', category: 'Phòng chức năng' },
  { id: 'm-12', title: 'Phòng Âm Nhạc & Múa #2', url: '/images/render/PHONG_CHUC_NANG_2_.jpg', category: 'Phòng chức năng' },
  { id: 'm-13', title: 'Hành Lang Thông Thấu #1', url: '/images/render/HANH_LANG_1_.jpg', category: 'Khuôn viên' },
  { id: 'm-14', title: 'Phòng Y Tế Đạt Chuẩn', url: '/images/render/PHONG_Y_TE_1_.jpg', category: 'Y tế' },
  { id: 'm-15', title: 'Văn Phòng Ban Giám Hiệu', url: '/images/render/VAN_PHONG.jpg', category: 'Hành chính' }
]

const initialEvents: SchoolEvent[] = [
  {
    id: 'evt-101',
    slug: 'open-day-2026-canada-sunshine-city',
    title: 'Open Day 2026: Hành Trình Khám Phá Mầm Non Canada 100% Tiếng Anh',
    category: 'Open Day',
    startDate: '2026-08-22 08:30',
    endDate: '2026-08-22 11:30',
    location: 'S4 Building, Sunshine City, Ciputra, Hà Nội',
    coverImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
    galleryImages: [
      '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
      '/images/render/THU_VIEN_6_.jpg',
      '/images/render/SAN_CHOI_1_.jpg'
    ],
    isPublic: true,
    isRegistrationOpen: true,
    maxAttendees: 100,
    registeredCount: 42,
    description: 'Trải nghiệm không gian học tập chuẩn mầm non Canada 5 sao tại Sunshine City, tham dự giờ học trải nghiệm song ngữ 100% Tiếng Anh, tư vấn 1-1 với Ban Giám hiệu và nhận ưu đãi học phí Founding Families lên tới 30%.',
    highlights: [
      '100% Giáo viên bản ngữ Canada có bằng cử nhân sư phạm mầm non quốc tế',
      'Tham quan phòng học chuẩn Maple Bear, phòng STEAM & thư viện 5.000 đầu sách',
      'Thưởng thức thực đơn dinh dưỡng hữu cơ 5 sao từ đầu bếp khách sạn cao cấp',
      'Miễn 100% phí ghi danh và giảm 30% học phí trọn đời cho cư dân Sunshine City'
    ],
    agenda: [
      { time: '08:30 - 09:00', activity: 'Đón tiếp Phụ huynh, check-in và thưởng thức Tiệc trà Welcome Tea' },
      { time: '09:00 - 09:45', activity: 'Tham quan hệ thống phòng học, khu vui chơi ngoài trời & phòng chức năng' },
      { time: '09:45 - 10:30', activity: 'Hội thảo Ban Giám Hiệu: Phương pháp nhúng ngôn ngữ Tiếng Anh tự nhiên' },
      { time: '10:30 - 11:15', activity: 'Lớp học thử Tiếng Anh trải nghiệm cho bé với Giáo viên Canada' },
      { time: '11:15 - 11:30', activity: 'Tư vấn lộ trình học tập 1-1 & Nhận gói quà tặng tuyển sinh' }
    ]
  },
  {
    id: 'evt-102',
    slug: 'workshop-phu-huynh-ky-luat-tich-cuc',
    title: 'Workshop Phụ Huynh: Phương Pháp Kỷ Luật Tích Cực & Nuôi Dạy Con Song Ngữ',
    category: 'Workshop',
    startDate: '2026-08-29 09:00',
    endDate: '2026-08-29 11:00',
    location: 'Hội trường Thư viện Maple Bear Sunshine City',
    coverImage: '/images/render/THU_VIEN_6_.jpg',
    galleryImages: [
      '/images/render/THU_VIEN_6_.jpg',
      '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'
    ],
    isPublic: true,
    isRegistrationOpen: true,
    maxAttendees: 50,
    registeredCount: 28,
    description: 'Chuyên gia giáo dục mầm non Canada chia sẻ bí quyết giúp trẻ phát triển ngôn ngữ tự nhiên, hình thành tư duy độc lập và giải quyết các hành vi tâm lý lứa tuổi 1-5 tuổi.',
    highlights: [
      'Gặp gỡ Chuyên gia Đào tạo Giáo dục Mầm non Canada',
      'Phương pháp Kỷ luật tích cực không đòn roi, không quát mắng',
      'Bí quyết tạo môi trường tắm ngôn ngữ Tiếng Anh tại nhà cho con',
      'Giải đáp trực tiếp thắc mắc tâm lý trẻ em từ 12 tháng đến 5 tuổi'
    ],
    agenda: [
      { time: '09:00 - 09:15', activity: 'Đón tiếp Phụ huynh & Giao lưu đầu giờ' },
      { time: '09:15 - 10:15', activity: 'Chuyên đề: Kỷ luật tích cực & Phát triển song ngữ sớm' },
      { time: '10:15 - 11:00', activity: 'Q&A Giải đáp thắc mắc 1-1 cùng Chuyên gia' }
    ]
  },
  {
    id: 'evt-103',
    slug: 'le-hoi-mua-thu-autumn-harvest-2026',
    title: 'Lễ Hội Mùa Thu Autumn Harvest Festival & Trải Nghiệm Ẩm Thực 5 Sao',
    category: 'Festival',
    startDate: '2026-09-12 15:00',
    endDate: '2026-09-12 18:00',
    location: 'Khuôn viên Sân chơi Ngoài trời Sunshine City',
    coverImage: '/images/render/SAN_CHOI_1_.jpg',
    galleryImages: [
      '/images/render/SAN_CHOI_1_.jpg',
      '/images/render/PHONG_STEAM_2_.jpg'
    ],
    isPublic: true,
    isRegistrationOpen: true,
    maxAttendees: 150,
    registeredCount: 89,
    description: 'Sự kiện trải nghiệm văn hóa mùa thu phương Tây dành cho bé và gia đình. Tham gia các hoạt động làm thủ công STEAM, vẽ tranh lá thu và thưởng thức buffet dinh dưỡng 5 sao.',
    highlights: [
      'Trải nghiệm văn hóa mùa thu Canada & Phương Tây',
      'Góc sáng tạo STEAM: Làm đèn lồng, trang trí quả bí ngô & vẽ tranh',
      'Buffet tiệc trà & bánh ngọt dinh dưỡng 5 sao chế biến tại chỗ',
      'Chụp ảnh gia đình miễn phí tại khu check-in Thu Vàng'
    ],
    agenda: [
      { time: '15:00 - 15:30', activity: 'Check-in nhận quà Lễ hội & Trang phục chụp ảnh' },
      { time: '15:30 - 16:30', activity: 'Hoạt động trải nghiệm STEAM & Trò chơi vận động ngoài trời' },
      { time: '16:30 - 17:30', activity: 'Thưởng thức Buffet tiệc trà Lễ hội Thu 5 sao' },
      { time: '17:30 - 18:00', activity: 'Bốc thăm may mắn & Trao quà kỷ niệm' }
    ]
  }
]

export default function AdminEventsPage() {
  const [events, setEvents] = useState<SchoolEvent[]>(initialEvents)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<SchoolEvent | null>(null)
  const [adminUiLang, setAdminUiLang] = useState<'vi' | 'en'>('vi')
  const [savedMessage, setSavedMessage] = useState<string | null>(null)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  // Media Library Picker Modal State
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{
    mode: 'cover' | 'gallery' | 'newCover'
    galleryIndex?: number
  } | null>(null)
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string>('')
  const [customLibrary, setCustomLibrary] = useState<MediaItem[]>(MEDIA_LIBRARY_PRESETS)
  const [activeMediaCategory, setActiveMediaCategory] = useState<string>('ALL')

  // Form State for Adding Event
  const [newTitle, setNewTitle] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [newCategory, setNewCategory] = useState<'Open Day' | 'Workshop' | 'Festival' | 'Webinar'>('Open Day')
  const [newStartDate, setNewStartDate] = useState('2026-09-01 09:00')
  const [newLocation, setNewLocation] = useState('Sunshine City Campus, Hanoi')
  const [newMaxAttendees, setNewMaxAttendees] = useState(100)
  const [newCoverImage, setNewCoverImage] = useState('/images/render/LOP_HOC_DIEN_HINH_1_.jpg')
  const [newDescription, setNewDescription] = useState('')
  const [newHighlights, setNewHighlights] = useState<string[]>([
    '100% Giáo viên bản ngữ Canada có bằng cử nhân sư phạm mầm non quốc tế',
    'Tham quan hệ thống phòng học chuẩn Maple Bear & Thư viện 5.000 đầu sách'
  ])
  const [newAgenda, setNewAgenda] = useState<AgendaItem[]>([
    { time: '08:30 - 09:00', activity: 'Đón tiếp Phụ huynh & Check-in' },
    { time: '09:00 - 10:30', activity: 'Tham quan trường & Lớp học thử cho bé' }
  ])

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

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChangeNew = (val: string) => {
    setNewTitle(val)
    setNewSlug(slugify(val))
  }

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle) return

    const created: SchoolEvent = {
      id: `evt-${Date.now()}`,
      slug: newSlug || slugify(newTitle),
      title: newTitle,
      category: newCategory,
      startDate: newStartDate,
      endDate: newStartDate,
      location: newLocation,
      coverImage: newCoverImage || '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
      galleryImages: [newCoverImage || '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'],
      isPublic: true,
      isRegistrationOpen: true,
      maxAttendees: newMaxAttendees,
      registeredCount: 0,
      description: newDescription,
      highlights: newHighlights.filter(h => h.trim().length > 0),
      agenda: newAgenda.filter(a => a.activity.trim().length > 0)
    }

    setEvents([created, ...events])
    setShowAddModal(false)
    setNewTitle('')
    setNewSlug('')
    setNewDescription('')
    setSavedMessage(adminUiLang === 'vi' ? 'Đã tạo sự kiện mới thành công!' : 'Event created successfully!')
    setTimeout(() => setSavedMessage(null), 3000)
  }

  const handleSaveEditEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEvent) return

    const updated = {
      ...editingEvent,
      slug: editingEvent.slug ? slugify(editingEvent.slug) : slugify(editingEvent.title),
      coverImage: editingEvent.coverImage || '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'
    }

    setEvents(events.map(e => e.id === updated.id ? updated : e))
    
    // Save to local storage for live frontend sync across tabs
    try {
      localStorage.setItem(`smb_event_${updated.id}`, JSON.stringify(updated))
      localStorage.setItem(`smb_event_${updated.slug}`, JSON.stringify(updated))
      window.dispatchEvent(new Event('smbEventsUpdated'))
    } catch (err) {}

    setEditingEvent(null)
    setSavedMessage(adminUiLang === 'vi' ? 'Đã cập nhật thông tin sự kiện, Ảnh đại diện, Gallery & Nội dung!' : 'Event, images & details updated successfully!')
    setTimeout(() => setSavedMessage(null), 3000)
  }

  const handleDeleteEvent = (id: string) => {
    if (confirm(adminUiLang === 'vi' ? 'Bạn có chắc chắn muốn xóa sự kiện này?' : 'Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id))
    }
  }

  const toggleRegistration = (id: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, isRegistrationOpen: !e.isRegistrationOpen } : e))
  }

  const copyEventUrl = (slugOrId: string) => {
    const fullUrl = `${window.location.origin}/events/${slugOrId}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedSlug(slugOrId)
    setTimeout(() => setCopiedSlug(null), 2500)
  }

  // Handle Local File Upload into Library
  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      if (dataUrl) {
        const newItem: MediaItem = {
          id: `upload-${Date.now()}`,
          title: `Tệp đã tải lên (${file.name})`,
          url: dataUrl,
          category: 'Đã tải lên'
        }
        setCustomLibrary([newItem, ...customLibrary])
        setSelectedMediaUrl(dataUrl)
      }
    }
    reader.readAsDataURL(file)
  }

  // Confirm Selection from Media Library
  const handleConfirmMediaSelection = () => {
    if (!selectedMediaUrl || !mediaPickerTarget) return

    if (mediaPickerTarget.mode === 'cover' && editingEvent) {
      setEditingEvent({ ...editingEvent, coverImage: selectedMediaUrl })
    } else if (mediaPickerTarget.mode === 'newCover') {
      setNewCoverImage(selectedMediaUrl)
    } else if (mediaPickerTarget.mode === 'gallery' && editingEvent) {
      if (typeof mediaPickerTarget.galleryIndex === 'number') {
        const updated = [...(editingEvent.galleryImages || [])]
        updated[mediaPickerTarget.galleryIndex] = selectedMediaUrl
        setEditingEvent({ ...editingEvent, galleryImages: updated })
      } else {
        setEditingEvent({
          ...editingEvent,
          galleryImages: [...(editingEvent.galleryImages || []), selectedMediaUrl]
        })
      }
    }

    setMediaPickerTarget(null)
  }

  // Gallery Image Editors
  const handleAddGalleryImageEdit = () => {
    if (!editingEvent) return
    setMediaPickerTarget({ mode: 'gallery' })
  }

  const handleUpdateGalleryImageEdit = (idx: number, val: string) => {
    if (!editingEvent) return
    const updated = [...(editingEvent.galleryImages || [])]
    updated[idx] = val
    setEditingEvent({ ...editingEvent, galleryImages: updated })
  }

  const handleRemoveGalleryImageEdit = (idx: number) => {
    if (!editingEvent) return
    setEditingEvent({
      ...editingEvent,
      galleryImages: (editingEvent.galleryImages || []).filter((_, i) => i !== idx)
    })
  }

  // Highlight Editors
  const handleAddHighlightEdit = () => {
    if (!editingEvent) return
    setEditingEvent({
      ...editingEvent,
      highlights: [...(editingEvent.highlights || []), '']
    })
  }

  const handleUpdateHighlightEdit = (idx: number, val: string) => {
    if (!editingEvent) return
    const updated = [...(editingEvent.highlights || [])]
    updated[idx] = val
    setEditingEvent({ ...editingEvent, highlights: updated })
  }

  const handleRemoveHighlightEdit = (idx: number) => {
    if (!editingEvent) return
    setEditingEvent({
      ...editingEvent,
      highlights: (editingEvent.highlights || []).filter((_, i) => i !== idx)
    })
  }

  // Agenda Editors
  const handleAddAgendaEdit = () => {
    if (!editingEvent) return
    setEditingEvent({
      ...editingEvent,
      agenda: [...(editingEvent.agenda || []), { time: '09:00 - 10:00', activity: '' }]
    })
  }

  const handleUpdateAgendaEdit = (idx: number, field: 'time' | 'activity', val: string) => {
    if (!editingEvent) return
    const updated = [...(editingEvent.agenda || [])]
    updated[idx] = { ...updated[idx], [field]: val }
    setEditingEvent({ ...editingEvent, agenda: updated })
  }

  const handleRemoveAgendaEdit = (idx: number) => {
    if (!editingEvent) return
    setEditingEvent({
      ...editingEvent,
      agenda: (editingEvent.agenda || []).filter((_, i) => i !== idx)
    })
  }

  const filtered = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredMedia = customLibrary.filter(m => 
    activeMediaCategory === 'ALL' || m.category === activeMediaCategory
  )

  return (
    <div className="space-y-4 text-[#1D1D1B] w-full font-body">
      
      {/* Header */}
      <div className="bg-white border border-neutral-200/80 p-4 sm:p-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 shadow-2xs rounded-2xs">
        <div>
          <span className="text-[10px] font-bold text-maple-red uppercase tracking-widest block">
            {adminUiLang === 'vi' ? 'Quản lý Truyền thông & Sự kiện' : 'Events & Media Management'}
          </span>
          <h2 className="text-xl font-display font-extrabold text-[#1D1D1B]">
            {adminUiLang === 'vi' ? 'Quản lý Sự kiện & Landing Page Đăng ký' : 'School Events & Registration Landing Pages'}
          </h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">
            {adminUiLang === 'vi'
              ? 'Tạo mới sự kiện, chọn ảnh trực quan từ Thư viện 5 sao hoặc tải ảnh từ máy tính, tùy chỉnh Slug URL.'
              : 'Create events, pick photos visually from 5-star library or upload local files, customize slug URLs.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedMessage && (
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center gap-1.5 animate-fade-in rounded-2xs">
              <CheckCircle2 size={14} className="text-emerald-600" /> {savedMessage}
            </span>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-bold transition-all border border-[#1D1D1B] flex items-center gap-1.5 rounded-2xs shadow-2xs"
          >
            <Plus size={15} />
            {adminUiLang === 'vi' ? 'Tạo Sự kiện Mới' : 'Create New Event'}
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-neutral-200/80 p-3.5 flex gap-4 shadow-2xs rounded-2xs">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder={adminUiLang === 'vi' ? 'Tìm kiếm sự kiện theo tên, chuyên mục hoặc URL Slug...' : 'Search events by title, category or slug...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs focus:outline-none focus:border-maple-red font-medium"
          />
        </div>
      </div>

      {/* Modern High-End Events Table */}
      <div className="bg-white border border-neutral-200/80 overflow-x-auto shadow-2xs rounded-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#FAF9F5] border-b border-neutral-200/80 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-3.5 whitespace-nowrap">Sự kiện & URL Slug</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Thời gian & Địa điểm</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Đã đăng ký</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Trạng thái</th>
              <th className="py-2.5 px-3.5 text-right whitespace-nowrap">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((evt) => (
              <tr key={evt.id} className="hover:bg-[#FDFBF7]/80 transition-colors group">
                
                {/* Col 1: Title, Thumbnail Image & FULL URL Slug */}
                <td className="py-2.5 px-3.5">
                  <div className="flex items-start gap-3">
                    <div className="relative w-14 h-14 rounded-2xs overflow-hidden flex-shrink-0 border border-neutral-200/80 shadow-2xs bg-neutral-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={evt.coverImage || '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'}
                        alt={evt.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/render/SAN_CHOI_1_.jpg'
                        }}
                      />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-[10px] text-maple-red bg-red-50 px-1.5 py-0.5 rounded-2xs border border-red-200/60 whitespace-nowrap">
                          {evt.id}
                        </span>
                        <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-[10px] font-bold text-neutral-700 rounded-2xs whitespace-nowrap">
                          {evt.category}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#1D1D1B] group-hover:text-maple-red transition-colors leading-snug">
                        {evt.title}
                      </h3>

                      <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                        <span className="text-[11px] font-mono text-neutral-500">
                          /events/<strong className="text-neutral-800 font-bold">{evt.slug || evt.id}</strong>
                        </span>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Link
                            href={`/events/${evt.slug || evt.id}`}
                            target="_blank"
                            className="p-1 hover:bg-neutral-100 text-neutral-500 hover:text-blue-600 rounded-2xs transition-colors"
                            title="Xem thử Landing Page"
                          >
                            <ExternalLink size={12} />
                          </Link>

                          <button
                            onClick={() => copyEventUrl(evt.slug || evt.id)}
                            className="p-1 hover:bg-neutral-100 text-neutral-500 hover:text-emerald-600 rounded-2xs transition-colors"
                            title="Sao chép URL gửi Phụ huynh"
                          >
                            {copiedSlug === (evt.slug || evt.id) ? (
                              <Check size={12} className="text-emerald-600" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Col 2: Time & Location */}
                <td className="py-2.5 px-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1D1D1B] whitespace-nowrap">
                    <Calendar size={13} className="text-maple-gold flex-shrink-0" />
                    <span>{evt.startDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                    <MapPin size={13} className="text-neutral-400 flex-shrink-0" />
                    <span className="leading-snug">{evt.location}</span>
                  </div>
                </td>

                {/* Col 3: Registered Count & Progress Bar */}
                <td className="py-2.5 px-3.5 space-y-1 whitespace-nowrap">
                  <div className="font-bold text-xs text-[#1D1D1B]">
                    {evt.registeredCount} / {evt.maxAttendees} người
                  </div>
                  <div className="w-24 bg-neutral-100 h-1.5 rounded-full overflow-hidden border border-neutral-200/60">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (evt.registeredCount / evt.maxAttendees) * 100)}%` }}
                    />
                  </div>
                </td>

                {/* Col 4: Registration Form Toggle Status */}
                <td className="py-2.5 px-3.5 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => toggleRegistration(evt.id)}
                    className={`px-3 py-1 text-[11px] font-bold rounded-2xs border transition-all inline-flex items-center gap-1.5 whitespace-nowrap ${
                      evt.isRegistrationOpen
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-neutral-100 text-neutral-500 border-neutral-300 hover:bg-neutral-200'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${evt.isRegistrationOpen ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'}`} />
                    <span className="whitespace-nowrap">{evt.isRegistrationOpen ? 'Đang mở' : 'Đã đóng'}</span>
                  </button>
                </td>

                {/* Col 5: Actions */}
                <td className="py-2.5 px-3.5 text-right space-x-1.5 whitespace-nowrap">
                  <button
                    onClick={() => setEditingEvent({ ...evt })}
                    className="px-2.5 py-1.5 bg-white border border-neutral-300 hover:border-black text-[#1D1D1B] hover:text-black font-semibold text-xs rounded-2xs shadow-2xs inline-flex items-center gap-1 transition-all"
                    title="Chỉnh sửa thông tin sự kiện & URL Slug"
                  >
                    <Edit3 size={13} /> Sửa
                  </button>

                  <Link
                    href={`/admin/forms/evt-form-${evt.id}/responses`}
                    className="px-3 py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white font-bold text-xs rounded-2xs shadow-2xs inline-flex items-center gap-1.5 transition-all"
                  >
                    <Users size={13} /> Dữ liệu Lead ({evt.registeredCount})
                  </Link>

                  <button
                    onClick={() => handleDeleteEvent(evt.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-2xs transition-colors"
                    title="Xóa sự kiện"
                  >
                    <Trash2 size={13} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT EVENT MODAL WITH VISUAL MEDIA PICKER BUTTONS */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-neutral-300 rounded-2xs max-w-3xl w-full p-6 space-y-5 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingEvent(null)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black border border-neutral-300 rounded-2xs"
            >
              <X size={16} />
            </button>

            <div className="border-b border-neutral-200 pb-3">
              <span className="text-[10px] font-mono font-bold text-maple-red uppercase">MÃ SỰ KIỆN: {editingEvent.id}</span>
              <h3 className="text-lg font-display font-bold text-[#1D1D1B]">Chỉnh Sửa Thông Tin, Ảnh Thumbnail & Gallery</h3>
            </div>

            <form onSubmit={handleSaveEditEvent} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Tên Sự kiện *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold"
                />
              </div>

              {/* COVER THUMBNAIL IMAGE WITH VISUAL MEDIA PICKER TRIGGER */}
              <div className="space-y-2 pt-1 border-t border-neutral-100">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-maple-red" />
                    Ảnh Đại Diện Sự Kiện (Cover Thumbnail) *
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMediaUrl(editingEvent.coverImage)
                      setMediaPickerTarget({ mode: 'cover' })
                    }}
                    className="px-3 py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-bold rounded-2xs shadow-2xs inline-flex items-center gap-1.5 transition-all"
                  >
                    <ImageIcon size={13} />
                    <span>Mở Thư Viện Chọn Ảnh</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-24 h-16 rounded-2xs overflow-hidden border border-neutral-300 flex-shrink-0 bg-neutral-100 shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingEvent.coverImage || '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'
                      }}
                    />
                  </div>

                  <input
                    type="text"
                    required
                    value={editingEvent.coverImage}
                    onChange={(e) => setEditingEvent({ ...editingEvent, coverImage: e.target.value })}
                    placeholder="/images/render/LOP_HOC_DIEN_HINH_1_.jpg"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs font-semibold"
                  />
                </div>
              </div>

              {/* EVENT PHOTO GALLERY WITH VISUAL MEDIA PICKER TRIGGER */}
              <div className="space-y-2 pt-3 border-t border-neutral-200">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-emerald-600" />
                    Thư Viện Ảnh Sự Kiện (Event Photo Gallery)
                  </label>

                  <button
                    type="button"
                    onClick={handleAddGalleryImageEdit}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-2xs shadow-2xs inline-flex items-center gap-1.5 transition-all"
                  >
                    <ImageIcon size={13} />
                    <span>Chọn Ảnh Từ Thư Viện</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(editingEvent.galleryImages || []).map((imgUrl, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-[#FDFBF7] border border-neutral-200/80 rounded-2xs">
                      <div className="relative w-14 h-10 rounded-2xs overflow-hidden border border-neutral-300 flex-shrink-0 bg-neutral-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imgUrl}
                          alt={`Gallery ${idx}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/render/THU_VIEN_6_.jpg'
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => handleUpdateGalleryImageEdit(idx, e.target.value)}
                        placeholder="/images/render/THU_VIEN_6_.jpg"
                        className="w-full px-2.5 py-1 bg-white border border-neutral-300 font-mono text-[11px]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedMediaUrl(imgUrl)
                          setMediaPickerTarget({ mode: 'gallery', galleryIndex: idx })
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-2xs"
                        title="Đổi ảnh này"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImageEdit(idx)}
                        className="p-1 text-neutral-400 hover:text-red-600 rounded-2xs"
                        title="Xóa ảnh"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* EDITABLE SLUG URL FIELD */}
              <div className="pt-2 border-t border-neutral-200">
                <label className="font-semibold text-[#1D1D1B] block mb-1 flex items-center justify-between">
                  <span>Đường dẫn URL Slug (Link gửi Phụ huynh) *</span>
                  <span className="text-[10px] text-neutral-400 font-mono">Tự động tối ưu SEO</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-2 bg-neutral-100 border border-neutral-300 font-mono text-[11px] text-neutral-500 rounded-2xs flex-shrink-0">
                    /events/
                  </span>
                  <input
                    type="text"
                    required
                    value={editingEvent.slug}
                    onChange={(e) => setEditingEvent({ ...editingEvent, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs font-bold text-maple-red focus:bg-white"
                    placeholder="open-day-2026-canada-sunshine-city"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Chuyên mục Sự kiện *</label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                  >
                    <option value="Open Day">Open Day (Ngày hội Trải nghiệm)</option>
                    <option value="Workshop">Workshop Phụ huynh</option>
                    <option value="Festival">Lễ hội Văn hóa</option>
                    <option value="Webinar">Webinar Trực tuyến</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Thời gian Tổ chức *</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.startDate}
                    onChange={(e) => setEditingEvent({ ...editingEvent, startDate: e.target.value })}
                    placeholder="YYYY-MM-DD HH:mm"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Địa điểm Tổ chức *</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Số lượng Giới hạn (Max Attendees) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingEvent.maxAttendees}
                    onChange={(e) => setEditingEvent({ ...editingEvent, maxAttendees: parseInt(e.target.value) || 50 })}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Nội dung Mô tả Sự kiện *</label>
                <textarea
                  rows={3}
                  required
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs leading-relaxed"
                />
              </div>

              {/* HIGHLIGHTS EDITOR */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
                    <Award size={14} className="text-maple-gold" />
                    Biên Tập Các Điểm Nổi Bật (Highlights)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddHighlightEdit}
                    className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-semibold border border-neutral-300 rounded-2xs"
                  >
                    + Thêm điểm nổi bật
                  </button>
                </div>

                <div className="space-y-2">
                  {(editingEvent.highlights || []).map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-neutral-400 font-mono text-[11px]">#{idx + 1}</span>
                      <input
                        type="text"
                        value={hl}
                        onChange={(e) => handleUpdateHighlightEdit(idx, e.target.value)}
                        placeholder="VD: 100% Giáo viên bản ngữ Canada có bằng sư phạm..."
                        className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlightEdit(idx)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded-2xs"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* AGENDA TIMELINE EDITOR */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
                    <Clock size={14} className="text-maple-red" />
                    Biên Tập Lịch Trình Chi Tiết (Agenda Timeline)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddAgendaEdit}
                    className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-semibold border border-neutral-300 rounded-2xs"
                  >
                    + Thêm mốc lịch trình
                  </button>
                </div>

                <div className="space-y-2">
                  {(editingEvent.agenda || []).map((ag, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={ag.time}
                        onChange={(e) => handleUpdateAgendaEdit(idx, 'time', e.target.value)}
                        placeholder="08:30 - 09:00"
                        className="w-32 px-2.5 py-1.5 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs font-bold text-[#1D1D1B]"
                      />
                      <input
                        type="text"
                        value={ag.activity}
                        onChange={(e) => handleUpdateAgendaEdit(idx, 'activity', e.target.value)}
                        placeholder="Nội dung hoạt động..."
                        className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAgendaEdit(idx)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded-2xs"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-2xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#1D1D1B] block">Trạng thái Nhận Đăng Ký Form</span>
                  <span className="text-[11px] text-neutral-500">Mở hoặc đóng form nhận thông tin phụ huynh</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingEvent({ ...editingEvent, isRegistrationOpen: !editingEvent.isRegistrationOpen })}
                  className={`px-3 py-1 text-xs font-bold rounded-2xs border ${
                    editingEvent.isRegistrationOpen
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                  }`}
                >
                  {editingEvent.isRegistrationOpen ? '🟢 Đang mở Form' : '🔴 Đã đóng Form'}
                </button>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-2xs border border-neutral-300"
                >
                  Hủy Bỏ
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-maple-red hover:bg-red-700 text-white font-semibold rounded-2xs shadow-2xs flex items-center gap-1.5"
                >
                  <Save size={14} /> Lưu Thay Đổi & Cập Nhật Tất Cả Trường
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL WITH MEDIA PICKER TRIGGER */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-neutral-300 rounded-2xs max-w-xl w-full p-6 space-y-4 shadow-xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black border border-neutral-300 rounded-2xs"
            >
              <X size={16} />
            </button>

            <div className="border-b border-neutral-200 pb-3">
              <span className="text-[10px] font-mono font-bold text-maple-red uppercase">TẠO SỰ KIỆN MỚI</span>
              <h3 className="text-lg font-display font-bold text-[#1D1D1B]">Khởi Tạo Landing Page Sự Kiện</h3>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Tên Sự kiện *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Open Day Mùa Thu 2026 Sunshine City..."
                  value={newTitle}
                  onChange={(e) => handleTitleChangeNew(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Đường dẫn URL Slug (Tự tạo từ Tên sự kiện) *</label>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-2 bg-neutral-100 border border-neutral-300 font-mono text-[11px] text-neutral-500 rounded-2xs flex-shrink-0">
                    /events/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="open-day-mua-thu-2026"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs font-bold text-maple-red"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold block">Ảnh Đại Diện (Cover Image URL) *</label>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMediaUrl(newCoverImage)
                      setMediaPickerTarget({ mode: 'newCover' })
                    }}
                    className="text-[10px] text-blue-600 hover:underline font-bold flex items-center gap-1"
                  >
                    <ImageIcon size={12} />
                    <span>Mở Thư Viện Chọn Ảnh</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={newCoverImage}
                  onChange={(e) => setNewCoverImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Chuyên mục Sự kiện *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                  >
                    <option value="Open Day">Open Day (Ngày hội Trải nghiệm)</option>
                    <option value="Workshop">Workshop Phụ huynh</option>
                    <option value="Festival">Lễ hội Văn hóa</option>
                    <option value="Webinar">Webinar Trực tuyến</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Thời gian Tổ chức *</label>
                  <input
                    type="text"
                    required
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Địa điểm Tổ chức *</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Số lượng Giới hạn (Max Attendees) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={newMaxAttendees}
                  onChange={(e) => setNewMaxAttendees(parseInt(e.target.value) || 50)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs font-bold"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Mô tả Sự kiện *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Mô tả các hoạt động nổi bật..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-2xs border border-neutral-300"
                >
                  Hủy Bỏ
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1D1D1B] hover:bg-maple-red text-white font-semibold rounded-2xs shadow-2xs"
                >
                  Tạo Sự Kiện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VISUAL MEDIA LIBRARY & FILE PICKER MODAL */}
      {mediaPickerTarget && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-neutral-300 rounded-2xs max-w-4xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] flex flex-col">
            
            <button
              onClick={() => setMediaPickerTarget(null)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black border border-neutral-300 rounded-2xs z-10"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="border-b border-neutral-200 pb-3 flex-shrink-0">
              <span className="text-[10px] font-bold text-maple-red uppercase tracking-widest block">
                THƯ VIỆN HÌNH ẢNH TRUYỀN THÔNG (MEDIA MANAGER)
              </span>
              <h3 className="text-xl font-display font-extrabold text-[#1D1D1B]">
                Chọn Ảnh Trực Quan Hoặc Tải Tệp Từ Máy Tính
              </h3>
              <p className="text-xs text-neutral-500 font-light mt-0.5">
                Nhấp trực tiếp vào ảnh góc nhìn 5 sao để chọn, hoặc tải lên ảnh mới từ máy tính cá nhân.
              </p>
            </div>

            {/* Category Filter & Upload Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FDFBF7] p-3 border border-neutral-200 rounded-2xs flex-shrink-0">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {['ALL', 'Phòng học', 'Thư viện', 'Sân chơi', 'Phòng chức năng', 'Y tế', 'Đã tải lên'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveMediaCategory(cat)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-2xs border transition-all whitespace-nowrap ${
                      activeMediaCategory === cat
                        ? 'bg-[#1D1D1B] text-white border-[#1D1D1B]'
                        : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-300'
                    }`}
                  >
                    {cat === 'ALL' ? 'Tất cả ảnh' : cat}
                  </button>
                ))}
              </div>

              {/* Local File Upload Button */}
              <label className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-2xs cursor-pointer inline-flex items-center gap-1.5 shadow-2xs whitespace-nowrap">
                <Upload size={14} />
                <span>+ Tải Ảnh Từ Máy Tính</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLocalFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Visual Image Grid */}
            <div className="flex-1 overflow-y-auto p-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 min-h-[300px]">
              {filteredMedia.map((item) => {
                const isSelected = selectedMediaUrl === item.url
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMediaUrl(item.url)}
                    className={`relative rounded-2xs overflow-hidden border-2 cursor-pointer transition-all group bg-neutral-100 ${
                      isSelected
                        ? 'border-maple-red shadow-md ring-2 ring-maple-red/30 scale-[1.02]'
                        : 'border-neutral-200/80 hover:border-neutral-400'
                    }`}
                  >
                    <div className="relative h-28 w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'
                        }}
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-maple-red text-white rounded-full flex items-center justify-center shadow-md animate-scale-up">
                          <CheckCircle size={14} />
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-white text-[11px]">
                      <span className="font-bold text-[#1D1D1B] block line-clamp-1">{item.title}</span>
                      <span className="text-[9px] text-neutral-400 font-mono">{item.category}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Bar: Action Confirmation */}
            <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
              <div className="text-xs font-mono text-neutral-600 line-clamp-1">
                {selectedMediaUrl ? (
                  <span>Đã chọn: <strong className="text-maple-red font-bold">{selectedMediaUrl}</strong></span>
                ) : (
                  <span className="text-neutral-400">Vui lòng nhấp chọn 1 hình ảnh từ danh sách trên...</span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMediaPickerTarget(null)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-2xs border border-neutral-300"
                >
                  Hủy Bỏ
                </button>

                <button
                  type="button"
                  disabled={!selectedMediaUrl}
                  onClick={handleConfirmMediaSelection}
                  className="px-5 py-2 bg-maple-red hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs rounded-2xs shadow-2xs inline-flex items-center gap-1.5"
                >
                  <Check size={15} />
                  <span>Xác Nhận Chọn Ảnh Này</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
