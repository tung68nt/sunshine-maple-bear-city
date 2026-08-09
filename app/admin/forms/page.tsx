'use client'

import { useState, useEffect } from 'react'
import { Plus, Copy, Check, ExternalLink, Trash2, Eye, FileText, Settings, ShieldCheck, HelpCircle, Users, Edit3, X, Save, Link2, AlertCircle, ArrowRight, Layers, CheckSquare, Square, Info } from 'lucide-react'
import Link from 'next/link'

export interface FormQuestionField {
  id: string
  label: string
  type: 'text' | 'textarea' | 'email' | 'phone' | 'select' | 'radio' | 'checkbox' | 'date' | 'rating' | 'file'
  required: boolean
  options?: string[]
  placeholder?: string
  helpText?: string
}

export interface FormLocationBinding {
  pagePath: string
  pageTitle: string
  sectionId?: string
  sectionType?: 'STATIC_PAGE' | 'EVENT_LANDING' | 'SECTION_BUILDER_BLOCK' | 'EMBED_URL'
  assignedAt?: string
}

export interface CustomFormTemplate {
  id: string
  title: string
  description: string
  category: 'Event Registration' | 'Parent Survey' | 'Contact Enquiry' | 'Student Feedback'
  isActive: boolean
  responseCount: number
  createdAt: string
  assignedPages?: string[]
  assignedLocations?: FormLocationBinding[]
  fields: FormQuestionField[]
}

const PAGE_ASSIGNMENT_CATALOG: FormLocationBinding[] = [
  { pagePath: '/events/open-day-2026-canada-sunshine-city', pageTitle: 'Sự kiện: Open Day 2026 Canada', sectionId: 'sec-event-hero-form', sectionType: 'EVENT_LANDING' },
  { pagePath: '/events/workshop-phu-huynh-ky-luat-tich-cuc', pageTitle: 'Sự kiện: Workshop Phụ huynh Kỷ luật Tích cực', sectionId: 'sec-workshop-form', sectionType: 'EVENT_LANDING' },
  { pagePath: '/events/le-hoi-mua-thu-autumn-harvest-2026', pageTitle: 'Sự kiện: Lễ hội Mùa Thu Autumn Harvest', sectionId: 'sec-festival-form', sectionType: 'EVENT_LANDING' },
  { pagePath: '/admissions/open-day', pageTitle: 'Trang Tuyển Sinh: Đăng Ký Tham Quan 5 Sao', sectionId: 'sec-admissions-countdown-form', sectionType: 'SECTION_BUILDER_BLOCK' },
  { pagePath: '/contact', pageTitle: 'Trang Liên Hệ & Nhận Báo Phí Học Phí 2026', sectionId: 'sec-contact-main-form', sectionType: 'STATIC_PAGE' },
  { pagePath: '/community/parent-portal', pageTitle: 'Cổng Phụ Huynh: Khảo Sát Hài Lòng Học Kỳ 1', sectionId: 'sec-survey-portal', sectionType: 'STATIC_PAGE' },
  { pagePath: '/admissions/founding-families', pageTitle: 'Trang Học Bổng Founding Families Ưu Đãi 30%', sectionId: 'sec-scholarship-form', sectionType: 'SECTION_BUILDER_BLOCK' }
]

const initialForms: CustomFormTemplate[] = [
  {
    id: 'evt-form-evt-101',
    title: 'Form Đăng Ký Open Day 2026: Hành Trình Khám Phá Mầm Non Canada',
    description: 'Form thu thập thông tin phụ huynh đăng ký tham dự Open Day 22/08/2026 tại Sunshine City.',
    category: 'Event Registration',
    isActive: true,
    responseCount: 42,
    createdAt: '2026-08-01',
    assignedPages: [
      '/events/open-day-2026-canada-sunshine-city',
      '/admissions/open-day',
      '/contact'
    ],
    assignedLocations: [
      { pagePath: '/events/open-day-2026-canada-sunshine-city', pageTitle: 'Sự kiện: Open Day 2026 Canada', sectionId: 'sec-event-hero-form', sectionType: 'EVENT_LANDING' },
      { pagePath: '/admissions/open-day', pageTitle: 'Trang Tuyển Sinh: Đăng Ký Tham Quan 5 Sao', sectionId: 'sec-admissions-countdown-form', sectionType: 'SECTION_BUILDER_BLOCK' },
      { pagePath: '/contact', pageTitle: 'Trang Liên Hệ & Nhận Báo Phí Học Phí 2026', sectionId: 'sec-contact-main-form', sectionType: 'STATIC_PAGE' }
    ],
    fields: [
      { id: 'f-1', label: 'Họ và tên Phụ huynh', type: 'text', required: true, placeholder: 'VD: Nguyễn Văn A' },
      { id: 'f-2', label: 'Số điện thoại Zalo liên hệ', type: 'phone', required: true, placeholder: '0912 xxx xxx' },
      { id: 'f-3', label: 'Địa chỉ Email', type: 'email', required: true, placeholder: 'email@example.com' },
      { id: 'f-4', label: 'Khung giờ tham quan mong muốn', type: 'select', required: true, options: ['09:00 AM - 10:30 AM', '10:30 AM - 12:00 PM', '02:00 PM - 03:30 PM'] },
      { id: 'f-5', label: 'Ghi chú & Câu hỏi tư vấn', type: 'textarea', required: false, placeholder: 'Nhập thắc mắc dành cho Ban Giám hiệu...' }
    ]
  },
  {
    id: 'evt-form-evt-102',
    title: 'Form Đăng Ký Workshop Phụ Huynh: Phương Pháp Kỷ Luật Tích Cực',
    description: 'Form nhận đăng ký giữ chỗ tham dự Workshop tư vấn nuôi dạy con song ngữ 29/08/2026.',
    category: 'Event Registration',
    isActive: true,
    responseCount: 28,
    createdAt: '2026-08-03',
    assignedPages: ['/events/workshop-phu-huynh-ky-luat-tich-cuc'],
    assignedLocations: [
      { pagePath: '/events/workshop-phu-huynh-ky-luat-tich-cuc', pageTitle: 'Sự kiện: Workshop Phụ huynh Kỷ luật Tích cực', sectionId: 'sec-workshop-form', sectionType: 'EVENT_LANDING' }
    ],
    fields: [
      { id: 'w-1', label: 'Họ và tên Phụ huynh', type: 'text', required: true },
      { id: 'w-2', label: 'Số điện thoại Zalo', type: 'phone', required: true },
      { id: 'w-3', label: 'Địa chỉ Email', type: 'email', required: true },
      { id: 'w-4', label: 'Độ tuổi của bé hiện tại', type: 'select', required: true, options: ['12 - 24 tháng', '24 - 36 tháng', '3 - 5 tuổi'] }
    ]
  },
  {
    id: 'evt-form-evt-103',
    title: 'Form Đăng Ký Lễ Hội Mùa Thu Autumn Harvest Festival 5 Sao',
    description: 'Form đăng ký vé mời tham gia trải nghiệm văn hóa mùa thu phương Tây 12/09/2026.',
    category: 'Event Registration',
    isActive: true,
    responseCount: 89,
    createdAt: '2026-08-05',
    assignedPages: ['/events/le-hoi-mua-thu-autumn-harvest-2026'],
    assignedLocations: [
      { pagePath: '/events/le-hoi-mua-thu-autumn-harvest-2026', pageTitle: 'Sự kiện: Lễ hội Mùa Thu Autumn Harvest', sectionId: 'sec-festival-form', sectionType: 'EVENT_LANDING' }
    ],
    fields: [
      { id: 'h-1', label: 'Họ và tên Phụ huynh', type: 'text', required: true },
      { id: 'h-2', label: 'Số điện thoại Zalo', type: 'phone', required: true },
      { id: 'h-3', label: 'Số trẻ em cùng tham dự', type: 'select', required: true, options: ['1 bé', '2 bé', 'Từ 3 bé trở lên'] }
    ]
  },
  {
    id: 'form-open-day-2026',
    title: 'Form Đăng Ký Tham Dự Open Day Mùa Thu 2026 (Chung)',
    description: 'Đăng ký tham quan trực tiếp trường mầm non Sunshine Maple Bear và tư vấn học phí.',
    category: 'Event Registration',
    isActive: true,
    responseCount: 15,
    createdAt: '2026-08-01',
    assignedPages: ['/admissions/open-day'],
    assignedLocations: [
      { pagePath: '/admissions/open-day', pageTitle: 'Trang Tuyển Sinh: Đăng Ký Tham Quan 5 Sao', sectionId: 'sec-admissions-countdown-form', sectionType: 'SECTION_BUILDER_BLOCK' }
    ],
    fields: [
      { id: 'f-1', label: 'Họ và tên Phụ huynh', type: 'text', required: true, placeholder: 'VD: Nguyễn Văn A' },
      { id: 'f-2', label: 'Số điện thoại Zalo liên hệ', type: 'phone', required: true, placeholder: '0912 xxx xxx' },
      { id: 'f-3', label: 'Địa chỉ Email', type: 'email', required: true, placeholder: 'email@example.com' },
      { id: 'f-4', label: 'Họ tên và Ngày sinh bé', type: 'text', required: true, placeholder: 'VD: Nguyễn Minh Trí (12/04/2023)' },
      { id: 'f-5', label: 'Khung giờ tham quan mong muốn', type: 'select', required: true, options: ['09:00 AM - 10:30 AM', '10:30 AM - 12:00 PM', '02:00 PM - 03:30 PM'] },
      { id: 'f-6', label: 'Ghi chú & Câu hỏi tư vấn', type: 'textarea', required: false, placeholder: 'Nhập câu hỏi dành cho Ban giám hiệu...' }
    ]
  },
  {
    id: 'form-parent-survey-2026',
    title: 'Khảo Sát Mức Độ Hài Lòng Của Phụ Huynh Học Kỳ 1',
    description: 'Thu thập ý kiến đóng góp về chất lượng giảng dạy song ngữ và dinh dưỡng 5 sao.',
    category: 'Parent Survey',
    isActive: true,
    responseCount: 5,
    createdAt: '2026-08-05',
    assignedPages: ['/community/parent-portal'],
    assignedLocations: [
      { pagePath: '/community/parent-portal', pageTitle: 'Cổng Phụ Huynh: Khảo Sát Hài Lòng Học Kỳ 1', sectionId: 'sec-survey-portal', sectionType: 'STATIC_PAGE' }
    ],
    fields: [
      { id: 'q-1', label: 'Họ tên Phụ huynh (Hoặc Ẩn danh)', type: 'text', required: false },
      { id: 'q-2', label: 'Đánh giá chất lượng giảng dạy giáo viên Canada', type: 'rating', required: true, helpText: 'Đánh giá từ 1 sao đến 5 sao' },
      { id: 'q-3', label: 'Đánh giá chất lượng bữa ăn & thực đơn hữu cơ', type: 'rating', required: true },
      { id: 'q-4', label: 'Ý kiến đóng góp cải thiện dịch vụ xe bus & chăm sóc', type: 'textarea', required: false }
    ]
  },
  {
    id: 'form-contact-enquiry-2026',
    title: 'Form Đăng Ký Tư Vấn & Nhận Thông Tin Học Phí 2026',
    description: 'Thu thập nhu cầu tìm hiểu chương trình học mầm non Canada và ưu đãi cư dân Sunshine City.',
    category: 'Contact Enquiry',
    isActive: true,
    responseCount: 12,
    createdAt: '2026-08-07',
    assignedPages: ['/contact'],
    assignedLocations: [
      { pagePath: '/contact', pageTitle: 'Trang Liên Hệ & Nhận Báo Phí Học Phí 2026', sectionId: 'sec-contact-main-form', sectionType: 'STATIC_PAGE' }
    ],
    fields: [
      { id: 'c-1', label: 'Họ và tên Phụ huynh', type: 'text', required: true, placeholder: 'VD: Vũ Minh Hoàng' },
      { id: 'c-2', label: 'Số điện thoại liên hệ', type: 'phone', required: true, placeholder: '0988 xxx xxx' },
      { id: 'c-3', label: 'Email', type: 'email', required: true, placeholder: 'email@example.com' },
      { id: 'c-4', label: 'Độ tuổi của bé', type: 'select', required: true, options: ['Lớp Mầm (12 - 24 tháng)', 'Lớp Chồi (24 - 36 tháng)', 'Lớp Lá (4 - 5 tuổi)'] },
      { id: 'c-5', label: 'Nội dung cần tư vấn', type: 'textarea', required: false, placeholder: 'Ghi rõ các thắc mắc về học phí, xe bus...' }
    ]
  }
]

export default function AdminFormsPage() {
  const [forms, setForms] = useState<CustomFormTemplate[]>(initialForms)
  const [showBuilderModal, setShowBuilderModal] = useState(false)
  const [editingForm, setEditingForm] = useState<CustomFormTemplate | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [adminUiLang, setAdminUiLang] = useState<'vi' | 'en'>('vi')
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Form Builder / Editor State
  const [formTitle, setFormTitle] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formCat, setFormCat] = useState<CustomFormTemplate['category']>('Event Registration')
  const [selectedLocations, setSelectedLocations] = useState<FormLocationBinding[]>([PAGE_ASSIGNMENT_CATALOG[0]])
  const [fields, setFields] = useState<FormQuestionField[]>([
    { id: 'q-new-1', label: 'Họ và tên Phụ huynh', type: 'text', required: true },
    { id: 'q-new-2', label: 'Số điện thoại Zalo', type: 'phone', required: true },
    { id: 'q-new-3', label: 'Địa chỉ Email', type: 'email', required: true }
  ])

  useEffect(() => {
    const saved = (localStorage.getItem('smb_admin_ui_lang') as 'vi' | 'en') || 'vi'
    setAdminUiLang(saved)

    // Load dynamic forms from localStorage if available
    try {
      const stored = localStorage.getItem('smb_custom_forms')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) setForms(parsed)
      }
    } catch (e) {}

    const handleLangChange = (e: CustomEvent) => {
      if (e.detail === 'vi' || e.detail === 'en') {
        setAdminUiLang(e.detail)
      }
    }

    window.addEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
    return () => window.removeEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
  }, [])

  const handleAddField = (type: FormQuestionField['type']) => {
    const newField: FormQuestionField = {
      id: `q-${Date.now()}`,
      label: `Câu hỏi mới (${type.toUpperCase()})`,
      type: type,
      required: true,
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Tùy chọn 1', 'Tùy chọn 2', 'Tùy chọn 3'] : undefined
    }
    if (editingForm) {
      setEditingForm({ ...editingForm, fields: [...editingForm.fields, newField] })
    } else {
      setFields([...fields, newField])
    }
  }

  const handleUpdateField = (id: string, key: keyof FormQuestionField, val: any) => {
    if (editingForm) {
      setEditingForm({
        ...editingForm,
        fields: editingForm.fields.map(f => f.id === id ? { ...f, [key]: val } : f)
      })
    } else {
      setFields(fields.map(f => f.id === id ? { ...f, [key]: val } : f))
    }
  }

  const handleRemoveField = (id: string) => {
    if (editingForm) {
      setEditingForm({
        ...editingForm,
        fields: editingForm.fields.filter(f => f.id !== id)
      })
    } else {
      setFields(fields.filter(f => f.id !== id))
    }
  }

  const handleToggleLocationBinding = (loc: FormLocationBinding) => {
    if (editingForm) {
      const current = editingForm.assignedLocations || []
      const exists = current.some(l => l.pagePath === loc.pagePath && l.sectionId === loc.sectionId)
      const updatedLocs = exists
        ? current.filter(l => !(l.pagePath === loc.pagePath && l.sectionId === loc.sectionId))
        : [...current, loc]
      
      const updatedPages = Array.from(new Set(updatedLocs.map(l => l.pagePath)))
      setEditingForm({
        ...editingForm,
        assignedLocations: updatedLocs,
        assignedPages: updatedPages
      })
    } else {
      const exists = selectedLocations.some(l => l.pagePath === loc.pagePath && l.sectionId === loc.sectionId)
      const updatedLocs = exists
        ? selectedLocations.filter(l => !(l.pagePath === loc.pagePath && l.sectionId === loc.sectionId))
        : [...selectedLocations, loc]
      setSelectedLocations(updatedLocs)
    }
  }

  const handleCreateNewForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle) return

    const assignedPages = Array.from(new Set(selectedLocations.map(l => l.pagePath)))

    const newForm: CustomFormTemplate = {
      id: `form-${Date.now()}`,
      title: formTitle,
      description: formDesc,
      category: formCat,
      isActive: true,
      responseCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      assignedPages: assignedPages,
      assignedLocations: selectedLocations,
      fields: fields
    }

    const updated = [newForm, ...forms]
    setForms(updated)
    try {
      localStorage.setItem('smb_custom_forms', JSON.stringify(updated))
    } catch (e) {}

    setShowBuilderModal(false)
    setFormTitle('')
    setFormDesc('')
    setSuccessMsg(adminUiLang === 'vi' ? 'Đã khởi tạo Form mới & gán 2 chiều đa trang thành công!' : 'Form created & multi-assigned!')
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  const handleSaveEditForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingForm) return

    const updatedForms = forms.map(f => f.id === editingForm.id ? editingForm : f)
    setForms(updatedForms)

    try {
      localStorage.setItem('smb_custom_forms', JSON.stringify(updatedForms))
      localStorage.setItem(`smb_form_${editingForm.id}`, JSON.stringify(editingForm))
      window.dispatchEvent(new Event('smbFormsUpdated'))
    } catch (e) {}

    setEditingForm(null)
    setSuccessMsg(adminUiLang === 'vi' ? 'Đã cập nhật cấu trúc Form & liên kết 2 chiều đa vị trí!' : 'Form structure & multi-location binding saved!')
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  const handleToggleActive = (id: string) => {
    const updated = forms.map(f => f.id === id ? { ...f, isActive: !f.isActive } : f)
    setForms(updated)
    try {
      localStorage.setItem('smb_custom_forms', JSON.stringify(updated))
    } catch (e) {}
  }

  const handleDeleteForm = (id: string) => {
    if (confirm(adminUiLang === 'vi' ? 'Bạn có chắc chắn muốn xóa mẫu form này?' : 'Are you sure you want to delete this form template?')) {
      const updated = forms.filter(f => f.id !== id)
      setForms(updated)
      try {
        localStorage.setItem('smb_custom_forms', JSON.stringify(updated))
      } catch (e) {}
    }
  }

  const copyEmbedLink = (formId: string) => {
    const embedUrl = `${window.location.origin}/forms/${formId}`
    navigator.clipboard.writeText(embedUrl)
    setCopiedId(formId)
    setTimeout(() => setCopiedId(null), 2500)
  }

  return (
    <div className="space-y-4 text-[#1D1D1B] w-full font-body">
      
      {/* Header Bar */}
      <div className="bg-white border border-neutral-200 p-4 sm:p-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 shadow-2xs rounded-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red uppercase tracking-wider block">
            {adminUiLang === 'vi' ? 'Hệ thống Khảo sát & Lead Intake Engine (Multi-Page 2-Way Binding)' : 'Lead Intake & Multi-Page Form Engine'}
          </span>
          <h2 className="text-xl font-display font-extrabold text-[#1D1D1B]">
            {adminUiLang === 'vi' ? 'Quản lý Form Đăng Ký & Liên Kết Đa Trang (2-Way Form Routing)' : 'Form Builder & Multi-Page Assignment Engine'}
          </h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">
            1 Form gán cho nhiều trang/Section đồng thời. Tự động đồng bộ 2 chiều, ghi nhận chính xác nguồn Lead & bảo toàn 100% dữ liệu lịch sử.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {successMsg && (
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center gap-1.5 animate-fade-in rounded-2xs">
              <ShieldCheck size={14} className="text-emerald-600" /> {successMsg}
            </span>
          )}

          <button
            onClick={() => setShowBuilderModal(true)}
            className="px-3.5 py-2 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-bold transition-all border border-[#1D1D1B] flex items-center gap-1.5 rounded-2xs shadow-2xs"
          >
            <Plus size={15} />
            {adminUiLang === 'vi' ? 'Tạo Form Mới' : 'Build Custom Form'}
          </button>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forms.map((form) => {
          const locations = form.assignedLocations || []

          return (
            <div
              key={form.id}
              className="bg-white border border-neutral-200/80 rounded-2xs shadow-2xs hover:shadow-md transition-all p-4 flex flex-col justify-between space-y-3 relative group"
            >
              <div className="space-y-2.5">
                <div className="flex justify-between items-start gap-2">
                  <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-[10px] font-semibold text-neutral-600 rounded-2xs">
                    {form.category}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleActive(form.id)}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-2xs border transition-all ${
                      form.isActive
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-neutral-100 text-neutral-500 border-neutral-300'
                    }`}
                  >
                    {form.isActive ? 'Đang hoạt động' : 'Tạm dừng'}
                  </button>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-[#1D1D1B] group-hover:text-maple-red transition-colors line-clamp-2">
                    {form.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light mt-1 line-clamp-2">
                    {form.description}
                  </p>
                </div>

                {/* 2-Way Multi-Location Assignment Display */}
                <div className="p-2.5 bg-[#FDFBF7] border border-neutral-200/90 rounded-2xs space-y-1">
                  <div className="text-[10px] font-bold text-maple-red uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Link2 size={11} /> GÁN 2 CHIỀU ĐA VỊ TRÍ ({locations.length})
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">Section ID Precision</span>
                  </div>

                  {locations.length > 0 ? (
                    <div className="space-y-1 pt-1">
                      {locations.map((loc, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px] text-neutral-700 bg-white p-1.5 border border-neutral-200/60 rounded-2xs">
                          <span className="font-semibold truncate max-w-[190px]" title={loc.pageTitle}>
                            • {loc.pageTitle.split(' (')[0]}
                          </span>
                          <span className="font-mono text-[9px] text-neutral-500 bg-neutral-100 px-1 py-0.5 rounded-2xs whitespace-nowrap">
                            {loc.sectionId || 'main'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-neutral-400 italic block">Form chưa gán cho trang cụ thể (Sử dụng qua URL nhúng)</span>
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-600">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <Users size={14} /> {form.responseCount} Lead / Câu trả lời
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">{form.fields.length} Trường dữ liệu</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-1.5">
                <Link
                  href={`/admin/forms/${form.id}/responses`}
                  className="flex-1 py-1.5 px-2.5 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-bold rounded-2xs shadow-2xs transition-all flex items-center justify-center gap-1"
                >
                  <Eye size={13} /> Xem Lead ({form.responseCount})
                </Link>

                <button
                  onClick={() => setEditingForm({ ...form })}
                  className="p-1.5 bg-white hover:bg-neutral-100 text-[#1D1D1B] border border-neutral-300 rounded-2xs transition-colors"
                  title="Chỉnh sửa cấu trúc Form & Gán trang 2 chiều"
                >
                  <Edit3 size={14} />
                </button>

                <button
                  onClick={() => copyEmbedLink(form.id)}
                  className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-300 rounded-2xs transition-colors"
                  title="Sao chép đường dẫn trực tiếp Form"
                >
                  {copiedId === form.id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>

                <button
                  onClick={() => handleDeleteForm(form.id)}
                  className="p-1.5 bg-neutral-100 hover:bg-red-100 text-neutral-500 hover:text-red-700 border border-neutral-300 rounded-2xs transition-colors"
                  title="Xóa mẫu form"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* EDIT FORM MODAL WITH 2-WAY MULTI-LOCATION MATRIX & SCHEMA PROTECTION */}
      {editingForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-neutral-300 rounded-2xs max-w-3xl w-full p-6 space-y-4 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingForm(null)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black border border-neutral-300 rounded-2xs"
            >
              <X size={16} />
            </button>

            <div className="border-b border-neutral-200 pb-3">
              <span className="text-[10px] font-mono font-bold text-maple-red uppercase">MÃ FORM: {editingForm.id}</span>
              <h3 className="text-lg font-display font-bold text-[#1D1D1B]">Chỉnh Sửa Cấu Trúc Form & Gán 2 Chiều Đa Trang</h3>
            </div>

            {/* Schema Protection Guarantee */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xs text-xs text-emerald-900 flex items-start gap-2">
              <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Cam kết Bảo toàn 100% Dữ liệu Lead (Zero Lead Loss Guarantee):</strong>
                <span>Khi thay đổi trường dữ liệu hoặc thay đổi gán trang, toàn bộ lịch sử Lead cũ cùng UTM Source và đường dẫn trang gốc đều được bảo lưu nguyên vẹn 100% không lo thất thoát chi phí Ads.</span>
              </div>
            </div>

            <form onSubmit={handleSaveEditForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Tiêu đề Form *</label>
                  <input
                    type="text"
                    required
                    value={editingForm.title}
                    onChange={(e) => setEditingForm({ ...editingForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Phân loại Chuyên mục *</label>
                  <select
                    value={editingForm.category}
                    onChange={(e) => setEditingForm({ ...editingForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                  >
                    <option value="Event Registration">Event Registration (Đăng ký Sự kiện)</option>
                    <option value="Parent Survey">Parent Survey (Khảo sát Phụ huynh)</option>
                    <option value="Contact Enquiry">Contact Enquiry (Liên hệ & Học phí)</option>
                    <option value="Student Feedback">Student Feedback (Ý kiến Đóng góp)</option>
                  </select>
                </div>
              </div>

              {/* 2-WAY MULTI-LOCATION MATRIX */}
              <div className="p-3.5 bg-[#FDFBF7] border border-neutral-200/90 rounded-2xs space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
                    <Link2 size={14} className="text-maple-red" />
                    Gán Form Cho Các Trang & Section Builder (Cơ chế 2 chiều Đa vị trí):
                  </label>
                  <span className="text-[10px] font-mono text-neutral-500">Đã chọn: {(editingForm.assignedLocations || []).length} vị trí</span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {PAGE_ASSIGNMENT_CATALOG.map((catLoc) => {
                    const isChecked = (editingForm.assignedLocations || []).some(
                      l => l.pagePath === catLoc.pagePath && l.sectionId === catLoc.sectionId
                    )

                    return (
                      <div
                        key={`${catLoc.pagePath}-${catLoc.sectionId}`}
                        onClick={() => handleToggleLocationBinding(catLoc)}
                        className={`p-2.5 border rounded-2xs cursor-pointer flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-red-50/50 border-maple-red text-maple-red font-semibold'
                            : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isChecked ? <CheckSquare size={14} className="text-maple-red" /> : <Square size={14} className="text-neutral-400" />}
                          <span className="text-xs">{catLoc.pageTitle}</span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-2xs">
                          {catLoc.sectionId} ({catLoc.sectionType})
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Mô tả Form *</label>
                <textarea
                  rows={2}
                  required
                  value={editingForm.description}
                  onChange={(e) => setEditingForm({ ...editingForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs"
                />
              </div>

              {/* QUESTION FIELDS EDITOR */}
              <div className="space-y-3 pt-2 border-t border-neutral-200">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#1D1D1B] text-xs">
                    Danh Sách Các Trường Câu Hỏi trong Form ({editingForm.fields.length})
                  </label>

                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleAddField('text')}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-semibold border border-neutral-300 rounded-2xs"
                    >
                      + Text Short
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddField('phone')}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-semibold border border-neutral-300 rounded-2xs"
                    >
                      + SĐT Zalo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddField('select')}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-semibold border border-neutral-300 rounded-2xs"
                    >
                      + Dropdown Select
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddField('textarea')}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-semibold border border-neutral-300 rounded-2xs"
                    >
                      + Textarea
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {editingForm.fields.map((field, idx) => (
                    <div key={field.id} className="p-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs space-y-2 relative">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] text-neutral-400 font-bold">#{idx + 1} (Loại: {field.type.toUpperCase()})</span>
                        
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => handleUpdateField(field.id, 'required', e.target.checked)}
                              className="accent-maple-red"
                            />
                            Bắt buộc điền
                          </label>
                          
                          <button
                            type="button"
                            onClick={() => handleRemoveField(field.id)}
                            className="p-1 text-neutral-400 hover:text-red-600 rounded-2xs"
                            title="Xóa trường này"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">Tên câu hỏi (Label)</label>
                          <input
                            type="text"
                            required
                            value={field.label}
                            onChange={(e) => handleUpdateField(field.id, 'label', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">Loại trường dữ liệu</label>
                          <select
                            value={field.type}
                            onChange={(e) => handleUpdateField(field.id, 'type', e.target.value as any)}
                            className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 text-xs font-semibold"
                          >
                            <option value="text">Văn bản ngắn (Text)</option>
                            <option value="phone">Số điện thoại Zalo (Phone)</option>
                            <option value="email">Địa chỉ Email</option>
                            <option value="select">Danh sách chọn (Dropdown Select)</option>
                            <option value="textarea">Văn bản dài (Textarea)</option>
                            <option value="rating">Đánh giá Sao (Rating)</option>
                          </select>
                        </div>
                      </div>

                      {field.type === 'select' && (
                        <div>
                          <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">Các tùy chọn (Phân cách bằng dấu phẩy)</label>
                          <input
                            type="text"
                            value={(field.options || []).join(', ')}
                            onChange={(e) => handleUpdateField(field.id, 'options', e.target.value.split(',').map(s => s.trim()))}
                            className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 text-xs font-mono"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingForm(null)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-2xs border border-neutral-300"
                >
                  Hủy Bỏ
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-maple-red hover:bg-red-700 text-white font-bold rounded-2xs shadow-2xs flex items-center gap-1.5"
                >
                  <Save size={14} /> Lưu Thay Đổi Cấu Trúc & Liên Kết Trang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE FORM BUILDER MODAL */}
      {showBuilderModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-neutral-300 rounded-2xs max-w-3xl w-full p-6 space-y-4 shadow-xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="border-b border-neutral-200 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-maple-red uppercase">FORM BUILDER ENGINE</span>
                <h3 className="text-lg font-display font-bold text-[#1D1D1B]">Khởi Tạo Form Đăng Ký Mới</h3>
              </div>
              <button
                onClick={() => setShowBuilderModal(false)}
                className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-2xs border border-neutral-300"
              >
                Đóng
              </button>
            </div>

            <form onSubmit={handleCreateNewForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Tiêu đề Form *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Form Đăng Ký Học Bổng Mầm Non Canada 2026..."
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Phân loại Chuyên mục *</label>
                  <select
                    value={formCat}
                    onChange={(e) => setFormCat(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold"
                  >
                    <option value="Event Registration">Event Registration (Đăng ký Sự kiện)</option>
                    <option value="Parent Survey">Parent Survey (Khảo sát Phụ huynh)</option>
                    <option value="Contact Enquiry">Contact Enquiry (Liên hệ & Học phí)</option>
                    <option value="Student Feedback">Student Feedback (Ý kiến Đóng góp)</option>
                  </select>
                </div>
              </div>

              {/* Multi-Location Checkboxes */}
              <div className="p-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs space-y-1.5">
                <label className="font-bold text-[#1D1D1B] block">Gán Form Cho Các Trang Landing Page / Section Builder:</label>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {PAGE_ASSIGNMENT_CATALOG.map((catLoc) => {
                    const isChecked = selectedLocations.some(l => l.pagePath === catLoc.pagePath && l.sectionId === catLoc.sectionId)
                    return (
                      <div
                        key={catLoc.pagePath}
                        onClick={() => handleToggleLocationBinding(catLoc)}
                        className={`p-2 border rounded-2xs cursor-pointer flex items-center justify-between text-xs ${
                          isChecked ? 'bg-red-50 border-maple-red text-maple-red font-bold' : 'bg-white border-neutral-200'
                        }`}
                      >
                        <span>{catLoc.pageTitle}</span>
                        <span className="font-mono text-[9px] text-neutral-400">{catLoc.sectionId}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Mô tả Form *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Mô tả mục đích sử dụng form..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs"
                />
              </div>

              {/* Dynamic Field Builder */}
              <div className="space-y-3 pt-2 border-t border-neutral-200">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#1D1D1B] text-xs">Các Trường Câu Hỏi ({fields.length})</label>

                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleAddField('text')}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-semibold border border-neutral-300 rounded-2xs"
                    >
                      + Text Short
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddField('phone')}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-semibold border border-neutral-300 rounded-2xs"
                    >
                      + SĐT Zalo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddField('select')}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-semibold border border-neutral-300 rounded-2xs"
                    >
                      + Dropdown Select
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddField('textarea')}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-semibold border border-neutral-300 rounded-2xs"
                    >
                      + Textarea
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {fields.map((field, idx) => (
                    <div key={field.id} className="p-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-neutral-400 font-bold">#{idx + 1} ({field.type.toUpperCase()})</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveField(field.id)}
                          className="p-1 text-neutral-400 hover:text-red-600 rounded-2xs"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={field.label}
                          onChange={(e) => handleUpdateField(field.id, 'label', e.target.value)}
                          placeholder="Tên câu hỏi..."
                          className="px-2.5 py-1.5 bg-white border border-neutral-300 text-xs font-bold"
                        />
                        <select
                          value={field.type}
                          onChange={(e) => handleUpdateField(field.id, 'type', e.target.value as any)}
                          className="px-2.5 py-1.5 bg-white border border-neutral-300 text-xs font-semibold"
                        >
                          <option value="text">Văn bản ngắn (Text)</option>
                          <option value="phone">Số điện thoại Zalo</option>
                          <option value="email">Địa chỉ Email</option>
                          <option value="select">Dropdown Select</option>
                          <option value="textarea">Textarea</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBuilderModal(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-2xs border border-neutral-300"
                >
                  Hủy Bỏ
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1D1D1B] hover:bg-maple-red text-white font-bold rounded-2xs shadow-2xs"
                >
                  Tạo Form
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
