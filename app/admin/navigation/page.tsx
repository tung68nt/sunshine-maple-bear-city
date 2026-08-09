'use client'

import { useState, useEffect } from 'react'
import {
  Menu,
  Plus,
  MoveUp,
  MoveDown,
  Trash2,
  Edit2,
  Check,
  Save,
  Globe,
  Layers,
  ArrowRight,
  Sparkles,
  Link2,
  Eye,
  CheckCircle2,
  ChevronRight,
  CornerDownRight,
  Languages
} from 'lucide-react'

type SubSubMenuItem = {
  id: string
  labelVi: string
  labelEn: string
  href: string
  label?: string
  title?: string
  path?: string
}

type SubMenuItem = {
  id: string
  labelVi: string
  labelEn: string
  href: string
  label?: string
  title?: string
  path?: string
  children?: SubSubMenuItem[]
}

type MenuItem = {
  id: string
  labelVi: string
  labelEn: string
  href: string
  label?: string
  title?: string
  path?: string
  isHeaderRoot?: boolean
  children?: SubMenuItem[]
}

const initialNavbarMenu: MenuItem[] = [
  { id: '1', labelVi: 'Trang chủ', labelEn: 'Home', href: '/', isHeaderRoot: true },
  {
    id: '2',
    labelVi: 'Về chúng tôi',
    labelEn: 'About Us',
    href: '/about/story',
    isHeaderRoot: true,
    children: [
      { id: '2-1', labelVi: 'Câu chuyện thương hiệu & Di sản Canada', labelEn: 'Our Story & Canadian Heritage', href: '/about/story' },
      { id: '2-2', labelVi: 'Tại sao chọn Sunshine Maple Bear?', labelEn: 'Why Choose Maple Bear?', href: '/about/why-maple-bear' },
      {
        id: '2-3',
        labelVi: 'Hội đồng Cố vấn & Ban Giám hiệu',
        labelEn: 'Academic Leadership & Board',
        href: '/about/leadership',
        children: [
          { id: '2-3-1', labelVi: 'Hội đồng Cố vấn Chuyên môn Canada', labelEn: 'Canadian Advisory Panel', href: '/about/leadership#panel' },
          { id: '2-3-2', labelVi: 'Ủy ban Kiểm định Chất lượng', labelEn: 'Quality Audit Committee', href: '/about/leadership#audit' }
        ]
      },
      { id: '2-4', labelVi: 'Đội ngũ Giáo viên Quốc tế', labelEn: 'International Educators', href: '/about/teachers' },
    ]
  },
  {
    id: '3',
    labelVi: 'Chương trình học',
    labelEn: 'Academics',
    href: '/academics/age-groups',
    isHeaderRoot: true,
    children: [
      {
        id: '3-1',
        labelVi: 'Chương trình Mầm non (12 tháng - 5 tuổi)',
        labelEn: 'Early Childhood Programs (12M - 5Y)',
        href: '/academics/age-groups',
        children: [
          { id: '3-1-1', labelVi: 'Lớp Mầm Toddler (12M-24M)', labelEn: 'Toddler Class (12M-24M)', href: '/academics/age-groups#toddler' },
          { id: '3-1-2', labelVi: 'Lớp Lá Senior Kindergarten (4Y-5Y)', labelEn: 'Senior Kindergarten (4Y-5Y)', href: '/academics/age-groups#sk' }
        ]
      },
      { id: '3-2', labelVi: 'Thời khóa biểu & Lịch sinh hoạt 1 ngày', labelEn: 'Daily Activity Flow & Routine', href: '/academics/daily-schedule' },
      { id: '3-3', labelVi: 'Dinh dưỡng Hữu cơ 5 sao', labelEn: 'Nutrition & Meal Program', href: '/academics/nutrition' },
      { id: '3-4', labelVi: 'Lịch học tập Năm học 2026-2027', labelEn: 'Academic Calendar 2026-2027', href: '/academics/calendar' },
    ]
  },
  {
    id: '4',
    labelVi: 'Tuyển sinh',
    labelEn: 'Admissions',
    href: '/admissions/process',
    isHeaderRoot: true,
    children: [
      { id: '4-1', labelVi: 'Quy trình Tuyển sinh & Đăng ký', labelEn: 'Admissions Process Guide', href: '/admissions/process' },
      { id: '4-2', labelVi: 'Biểu phí Học phí 2026-2027', labelEn: 'Tuition Fee Structure 2026', href: '/admissions/tuition' },
      { id: '4-3', labelVi: 'Chương trình Founding Families (Ưu đãi 30%)', labelEn: 'Founding Families Program', href: '/admissions/founding-families' },
      { id: '4-4', labelVi: 'Đăng ký Tham dự Open Day', labelEn: 'Open Day Registration', href: '/admissions/open-day' },
      { id: '4-5', labelVi: 'Đặt lịch Tham quan Trường', labelEn: 'Book a Campus Visit', href: '/tour-booking' },
    ]
  },
  {
    id: '5',
    labelVi: 'Cộng đồng',
    labelEn: 'Community',
    href: '/community/parent-portal',
    isHeaderRoot: true,
    children: [
      { id: '5-1', labelVi: 'Cổng thông tin Phụ huynh (Parent Portal)', labelEn: 'Parent Portal & App', href: '/community/parent-portal' },
      { id: '5-2', labelVi: 'Bảo vệ an toàn & Y tế học đường', labelEn: 'Health & Safeguarding', href: '/community/health' },
      { id: '5-3', labelVi: 'Chính sách An toàn Trẻ em', labelEn: 'Safeguarding Policy', href: '/community/safeguarding' },
    ]
  },
  { id: '6', labelVi: 'Tin tức & Blog', labelEn: 'News & Blog', href: '/blog', isHeaderRoot: true },
]

export default function AdminNavigationPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialNavbarMenu)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [adminUiLang, setAdminUiLang] = useState<'vi' | 'en'>('vi')

  useEffect(() => {
    async function loadNavbar() {
      try {
        const res = await fetch('/api/admin/navigation')
        const json = await res.json()
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const normalized: MenuItem[] = json.data.map((item: any) => ({
            id: item.id || Date.now().toString(),
            labelVi: item.labelVi || item.label_vi || item.label || item.title || '',
            labelEn: item.labelEn || item.label_en || item.label || item.title || '',
            href: item.href || item.path || '',
            isHeaderRoot: item.isHeaderRoot !== undefined ? item.isHeaderRoot : true,
            children: item.children ? item.children.map((c: any) => ({
              id: c.id || Date.now().toString(),
              labelVi: c.labelVi || c.label_vi || c.label || c.title || '',
              labelEn: c.labelEn || c.label_en || c.label || c.title || '',
              href: c.href || c.path || '',
              children: c.children ? c.children.map((sub: any) => ({
                id: sub.id || Date.now().toString(),
                labelVi: sub.labelVi || sub.label_vi || sub.label || sub.title || '',
                labelEn: sub.labelEn || sub.label_en || sub.label || sub.title || '',
                href: sub.href || sub.path || ''
              })) : []
            })) : []
          }))
          setMenuItems(normalized)
        }
      } catch (err) {
        console.error('Error loading navbar:', err)
      }
    }
    loadNavbar()
  }, [])

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

  // Add Item State
  const [newLabelVi, setNewLabelVi] = useState('')
  const [newLabelEn, setNewLabelEn] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [targetParentLocation, setTargetParentLocation] = useState<string>('ROOT')

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLabelVi.trim() || !newUrl.trim()) return

    const newItemId = Date.now().toString()
    const labelEn = newLabelEn.trim() || newLabelVi.trim()

    if (targetParentLocation === 'ROOT') {
      const newItem: MenuItem = {
        id: newItemId,
        labelVi: newLabelVi,
        labelEn: labelEn,
        href: newUrl,
        isHeaderRoot: true,
        children: []
      }
      setMenuItems([...menuItems, newItem])
    } else if (targetParentLocation.startsWith('L1:')) {
      const parentId = targetParentLocation.replace('L1:', '')
      setMenuItems(menuItems.map(p => {
        if (p.id === parentId) {
          const children = p.children || []
          return {
            ...p,
            children: [...children, { id: newItemId, labelVi: newLabelVi, labelEn: labelEn, href: newUrl, children: [] }]
          }
        }
        return p
      }))
    } else if (targetParentLocation.startsWith('L2:')) {
      const parts = targetParentLocation.replace('L2:', '').split(':')
      const pId = parts[0]
      const cId = parts[1]

      setMenuItems(menuItems.map(p => {
        if (p.id === pId && p.children) {
          const updatedChildren = p.children.map(c => {
            if (c.id === cId) {
              const subChildren = c.children || []
              return {
                ...c,
                children: [...subChildren, { id: newItemId, labelVi: newLabelVi, labelEn: labelEn, href: newUrl }]
              }
            }
            return c
          })
          return { ...p, children: updatedChildren }
        }
        return p
      }))
    }

    setNewLabelVi('')
    setNewLabelEn('')
    setNewUrl('')
  }

  const handleUpdateItemLabels = (level1Id: string, level2Id?: string, level3Id?: string, field?: 'labelVi' | 'labelEn' | 'href', val?: string) => {
    if (!field || val === undefined) return

    setMenuItems(menuItems.map(p => {
      if (p.id === level1Id) {
        if (!level2Id) {
          return { ...p, [field]: val }
        }
        if (p.children) {
          const updatedL2 = p.children.map(c => {
            if (c.id === level2Id) {
              if (!level3Id) {
                return { ...c, [field]: val }
              }
              if (c.children) {
                const updatedL3 = c.children.map(sub => {
                  if (sub.id === level3Id) {
                    return { ...sub, [field]: val }
                  }
                  return sub
                })
                return { ...c, children: updatedL3 }
              }
            }
            return c
          })
          return { ...p, children: updatedL2 }
        }
      }
      return p
    }))
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const updated = [...menuItems]
    const temp = updated[index]
    updated[index] = updated[index - 1]
    updated[index - 1] = temp
    setMenuItems(updated)
  }

  const handleMoveDown = (index: number) => {
    if (index === menuItems.length - 1) return
    const updated = [...menuItems]
    const temp = updated[index]
    updated[index] = updated[index + 1]
    updated[index + 1] = temp
    setMenuItems(updated)
  }

  const handleDeleteItem = (level1Id: string, level2Id?: string, level3Id?: string) => {
    if (!level2Id) {
      setMenuItems(menuItems.filter(m => m.id !== level1Id))
    } else if (!level3Id) {
      setMenuItems(menuItems.map(p => {
        if (p.id === level1Id && p.children) {
          return {
            ...p,
            children: p.children.filter(c => c.id !== level2Id)
          }
        }
        return p
      }))
    } else {
      setMenuItems(menuItems.map(p => {
        if (p.id === level1Id && p.children) {
          const updatedChildren = p.children.map(c => {
            if (c.id === level2Id && c.children) {
              return {
                ...c,
                children: c.children.filter(sub => sub.id !== level3Id)
              }
            }
            return c
          })
          return { ...p, children: updatedChildren }
        }
        return p
      }))
    }
  }

  const handleSaveMenu = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/admin/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: menuItems })
      })
      const json = await res.json()
      if (json.success) {
        setSavedSuccess(true)
        setTimeout(() => setSavedSuccess(false), 3000)
      }
    } catch (err) {
      console.error('Error saving navbar to Supabase:', err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8 w-full text-[#1D1D1B]">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-neutral-200 p-5 shadow-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red block uppercase tracking-wider">Cấu hình Biên tập Song ngữ VI / EN Menu 3 Cấp</span>
          <h2 className="text-xl font-display font-bold text-[#1D1D1B]">Quản lý Navbar Header Song Ngữ CMS</h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">Biên tập tiêu đề Tiếng Việt & Tiếng Anh trực tiếp cho tất cả các danh mục menu chính, menu con và menu thả phụ.</p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center gap-1.5 animate-fade-in rounded-2xs">
              <CheckCircle2 size={14} /> Đã lưu cấu hình Navbar Song ngữ!
            </span>
          )}

          <button
            onClick={handleSaveMenu}
            disabled={isSaving}
            className="px-3.5 py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-semibold transition-colors border border-[#1D1D1B] flex items-center gap-1.5 shadow-2xs rounded-2xs disabled:opacity-50"
          >
            <Save size={15} />
            {isSaving ? 'Đang lưu...' : 'Lưu cấu hình Menu Song ngữ'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive 3-Level Menu Hierarchy Tree (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 p-5 space-y-5 shadow-2xs">
          <div className="border-b border-neutral-200 pb-3 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-semibold text-maple-gold block">Cây Menu Header trực quan (Song Ngữ)</span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">Danh mục liên kết Điều hướng</h3>
            </div>
            <span className="text-xs font-mono font-semibold text-neutral-500">{menuItems.length} Danh mục gốc</span>
          </div>

          {/* Root Menu Tree List */}
          <div className="space-y-4">
            {menuItems.map((item, idx) => (
              <div key={item.id || idx} className="border border-neutral-300 bg-[#FDFBF7] p-4 space-y-3 shadow-2xs rounded-2xs">
                
                {/* LEVEL 1: Parent Row - PERFECT UNIFIED ALIGNED GRID */}
                <div className="bg-white p-3.5 border border-neutral-200 rounded-2xs shadow-2xs">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    
                    {/* Index Badge */}
                    <div className="md:col-span-1 flex items-center gap-2 pb-1">
                      <span className="w-7 h-7 rounded-full bg-[#1D1D1B] text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Tiếng Việt input */}
                    <div className="md:col-span-4 space-y-1">
                      <label className="text-[10px] font-bold text-maple-red flex items-center gap-1 uppercase tracking-wider">
                        <span>🇻🇳</span> Tiếng Việt (Cấp 1)
                      </label>
                      <input
                        type="text"
                        value={item.labelVi}
                        onChange={(e) => handleUpdateItemLabels(item.id, undefined, undefined, 'labelVi', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-bold text-[#1D1D1B] focus:bg-white focus:border-maple-red transition-all"
                      />
                    </div>

                    {/* English input */}
                    <div className="md:col-span-4 space-y-1">
                      <label className="text-[10px] font-bold text-blue-600 flex items-center gap-1 uppercase tracking-wider">
                        <span>🇬🇧</span> English (Level 1)
                      </label>
                      <input
                        type="text"
                        value={item.labelEn}
                        onChange={(e) => handleUpdateItemLabels(item.id, undefined, undefined, 'labelEn', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-bold text-[#1D1D1B] focus:bg-white focus:border-blue-600 transition-all"
                      />
                    </div>

                    {/* Route URL + Action buttons */}
                    <div className="md:col-span-3 space-y-1">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                        Đường dẫn Route URL
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={item.href}
                          onChange={(e) => handleUpdateItemLabels(item.id, undefined, undefined, 'href', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-neutral-100 border border-neutral-300 rounded-2xs font-mono text-xs text-neutral-700 focus:bg-white transition-all"
                          placeholder="/route"
                        />

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleMoveUp(idx)}
                            disabled={idx === 0}
                            className="p-1.5 bg-white border border-neutral-300 hover:border-black text-neutral-600 hover:text-black disabled:opacity-30 rounded-2xs transition-colors"
                            title="Di chuyển lên"
                          >
                            <MoveUp size={14} />
                          </button>
                          <button
                            onClick={() => handleMoveDown(idx)}
                            disabled={idx === menuItems.length - 1}
                            className="p-1.5 bg-white border border-neutral-300 hover:border-black text-neutral-600 hover:text-black disabled:opacity-30 rounded-2xs transition-colors"
                            title="Di chuyển xuống"
                          >
                            <MoveDown size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1.5 bg-white border border-neutral-300 hover:border-red-600 text-neutral-400 hover:text-red-600 rounded-2xs transition-colors"
                            title="Xóa mục Cấp 1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* LEVEL 2: Sub-menu Items (Children) */}
                {item.children && item.children.length > 0 && (
                  <div className="pl-4 sm:pl-6 pt-2 space-y-3 border-l-2 border-maple-red">
                    <span className="text-[10px] font-semibold text-neutral-500 block mb-1">
                      CẤP 2 MENU CON ({item.children.length}):
                    </span>
                    {item.children.map((child) => (
                      <div key={child.id} className="p-3.5 bg-white border border-neutral-200 rounded-2xs shadow-2xs space-y-2.5">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                          
                          <div className="md:col-span-5 space-y-1">
                            <label className="text-[9px] font-bold text-neutral-600 uppercase tracking-wider block">
                              🇻🇳 Tiếng Việt (Cấp 2 Dropdown)
                            </label>
                            <input
                              type="text"
                              value={child.labelVi}
                              onChange={(e) => handleUpdateItemLabels(item.id, child.id, undefined, 'labelVi', e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold text-[#1D1D1B]"
                            />
                          </div>

                          <div className="md:col-span-4 space-y-1">
                            <label className="text-[9px] font-bold text-blue-600 uppercase tracking-wider block">
                              🇬🇧 English (Level 2)
                            </label>
                            <input
                              type="text"
                              value={child.labelEn}
                              onChange={(e) => handleUpdateItemLabels(item.id, child.id, undefined, 'labelEn', e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold text-[#1D1D1B]"
                            />
                          </div>

                          <div className="md:col-span-3 space-y-1">
                            <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">
                              Route URL
                            </label>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={child.href}
                                onChange={(e) => handleUpdateItemLabels(item.id, child.id, undefined, 'href', e.target.value)}
                                className="w-full px-2 py-1.5 bg-neutral-100 border border-neutral-300 rounded-2xs font-mono text-[11px]"
                              />
                              <button
                                onClick={() => handleDeleteItem(item.id, child.id)}
                                className="p-1.5 bg-white border border-neutral-300 hover:border-red-600 text-neutral-400 hover:text-red-600 rounded-2xs transition-colors flex-shrink-0"
                                title="Xóa mục Cấp 2"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                        </div>

                        {/* LEVEL 3: Sub-submenu Items (Grandchildren) */}
                        {child.children && child.children.length > 0 && (
                          <div className="pl-4 pt-1 space-y-2 border-l-2 border-maple-gold">
                            <span className="text-[9px] font-semibold text-amber-700 block mb-0.5">
                              CẤP 3 MENU THẢ PHỤ ({child.children.length}):
                            </span>
                            {child.children.map((subChild) => (
                              <div key={subChild.id} className="p-2.5 bg-amber-50/60 border border-amber-200 rounded-2xs">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                                  
                                  <div className="md:col-span-5 space-y-0.5">
                                    <label className="text-[8px] font-bold text-amber-800 uppercase block">
                                      🇻🇳 Tiếng Việt (Cấp 3 Sub-menu)
                                    </label>
                                    <div className="flex items-center gap-1.5">
                                      <CornerDownRight size={12} className="text-amber-700 flex-shrink-0" />
                                      <input
                                        type="text"
                                        value={subChild.labelVi}
                                        onChange={(e) => handleUpdateItemLabels(item.id, child.id, subChild.id, 'labelVi', e.target.value)}
                                        className="w-full px-2 py-1 bg-white border border-amber-300 rounded-2xs text-xs font-semibold text-amber-950"
                                      />
                                    </div>
                                  </div>

                                  <div className="md:col-span-4 space-y-0.5">
                                    <label className="text-[8px] font-bold text-blue-700 uppercase block">
                                      🇬🇧 English (Level 3)
                                    </label>
                                    <input
                                      type="text"
                                      value={subChild.labelEn}
                                      onChange={(e) => handleUpdateItemLabels(item.id, child.id, subChild.id, 'labelEn', e.target.value)}
                                      className="w-full px-2 py-1 bg-white border border-amber-300 rounded-2xs text-xs font-semibold text-blue-900"
                                    />
                                  </div>

                                  <div className="md:col-span-3 space-y-0.5">
                                    <label className="text-[8px] font-bold text-amber-800 uppercase block">
                                      Route URL
                                    </label>
                                    <div className="flex items-center gap-1.5">
                                      <input
                                        type="text"
                                        value={subChild.href}
                                        onChange={(e) => handleUpdateItemLabels(item.id, child.id, subChild.id, 'href', e.target.value)}
                                        className="w-full px-2 py-1 bg-white border border-amber-300 rounded-2xs font-mono text-[10px]"
                                      />
                                      <button
                                        onClick={() => handleDeleteItem(item.id, child.id, subChild.id)}
                                        className="p-1 bg-white border border-amber-300 hover:border-red-600 text-amber-700 hover:text-red-600 rounded-2xs transition-colors flex-shrink-0"
                                        title="Xóa mục Cấp 3"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Add New 3-Level Navbar Link Form (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 p-5 space-y-5 shadow-2xs rounded-2xs">
          <div className="border-b border-neutral-200 pb-2.5">
            <span className="text-[10px] font-semibold text-maple-red block uppercase tracking-wider">Form khởi tạo Menu Song ngữ</span>
            <h3 className="text-base font-display font-bold text-[#1D1D1B]">Thêm Mục Menu Mới</h3>
          </div>

          <form onSubmit={handleAddItem} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">🇻🇳 Tên hiển thị Tiếng Việt *</label>
              <input
                type="text"
                required
                placeholder="e.g. Hội đồng Cố vấn Giáo dục"
                value={newLabelVi}
                onChange={(e) => setNewLabelVi(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold rounded-2xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">🇬🇧 Tên hiển thị Tiếng Anh (English)</label>
              <input
                type="text"
                placeholder="e.g. Academic Advisory Board"
                value={newLabelEn}
                onChange={(e) => setNewLabelEn(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold rounded-2xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Đường dẫn Route URL *</label>
              <input
                type="text"
                required
                placeholder="e.g. /about/leadership#panel"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono rounded-2xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Vị trí Cấp Menu *</label>
              <select
                value={targetParentLocation}
                onChange={(e) => setTargetParentLocation(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold rounded-2xs"
              >
                <option value="ROOT">📌 Menu chính Cấp 1 (Main Root)</option>

                {menuItems.map(p => (
                  <optgroup key={p.id} label={`Cấp 1: ${p.labelVi || p.labelEn}`}>
                    <option value={`L1:${p.id}`}>
                      ├─ Thêm Menu con Cấp 2 vào dưới: {p.labelVi || p.labelEn}
                    </option>
                    {p.children && p.children.map(c => (
                      <option key={c.id} value={`L2:${p.id}:${c.id}`}>
                        │  └── Thêm Menu thả phụ Cấp 3 vào dưới: {p.labelVi} &gt; {c.labelVi}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-semibold transition-colors border border-[#1D1D1B] rounded-2xs shadow-2xs"
            >
              + Thêm mục Menu Song ngữ 3 cấp
            </button>
          </form>
        </div>

      </div>

    </div>
  )
}
