'use client'

import { useState, useEffect } from 'react'
import { UserCheck, Search, Download, Eye, CheckCircle2, PhoneCall, Archive, MessageSquare, X } from 'lucide-react'

const initialSubmissions = [
  {
    id: 'ADM-001',
    name: 'Đỗ Đức Mạnh',
    phone: '0915 223 344',
    email: 'manh.do@gmail.com',
    childName: 'Đỗ Minh Trí',
    dob: '14/05/2023',
    program: 'Kindergarten (JK)',
    date: '07/08/2026',
    status: 'New',
    score: '🔥 HOT (92 điểm)',
    ipTracking: '113.190.242.88 (Đã xem: Học phí 4m + Mầm non Canada 2m)',
    message: 'Gia đình muốn hỏi chính sách miễn 100% phí cơ sở vật chất năm đầu tiên cho cư dân Sunshine City và lịch nhận lớp tháng 9.'
  },
  {
    id: 'ADM-002',
    name: 'Vũ Thị Hồng',
    phone: '0977 889 900',
    email: 'hongvu@yahoo.com',
    childName: 'Vũ Gia Bảo',
    dob: '22/11/2024',
    program: 'Toddler Immersion',
    date: '06/08/2026',
    status: 'Contacted',
    score: '🟧 WARM (78 điểm)',
    ipTracking: '14.232.180.105 (Đã xem: Lý do chọn SMB 3m + Đặt Tour)',
    message: 'Bé có tiền sử dị ứng đậu đỗ nhẹ, mong muốn được tư vấn thực đơn hữu cơ riêng từ chuyên gia dinh dưỡng của trường.'
  },
  {
    id: 'ADM-003',
    name: 'Hoàng Nhật Minh',
    phone: '0934 556 677',
    email: 'minh.hoang@company.com',
    childName: 'Hoàng Tuệ Lâm',
    dob: '08/02/2022',
    program: 'Senior Kindergarten (SK)',
    date: '05/08/2026',
    status: 'Enrolled',
    score: '🔥 HOT (96 điểm)',
    ipTracking: '118.70.12.44 (Đã xem: Open Day 5m + Học phí 4m)',
    message: 'Muốn tìm hiểu lộ trình chuyển tiếp Tiểu học Quốc tế Maple Bear và phương pháp giảng dạy nhúng ngôn ngữ Tiếng Anh 100%.'
  },
  {
    id: 'ADM-004',
    name: 'Lê Thanh Thảo',
    phone: '0982 114 556',
    email: 'thao.le@gmail.com',
    childName: 'Lê Hoàng Nam',
    dob: '19/09/2023',
    program: 'Nursery Program',
    date: '02/08/2026',
    status: 'Contacted',
    message: 'Đăng ký nhận báo giá chi tiết và tư vấn chính sách ưu đãi học phí cho gia đình có 2 bé cùng nhập học.'
  },
]

export default function AdminAdmissionsPage() {
  const [submissions, setSubmissions] = useState<typeof initialSubmissions>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [activeModal, setActiveModal] = useState<typeof initialSubmissions[0] | null>(null)
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

  const loadAdmissions = async () => {
    const response = await fetch('/api/admin/admissions', { cache: 'no-store' })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) return
    setSubmissions((payload.data || []).map((item: any) => ({
      id: item.id,
      name: item.parent_name || '', phone: item.parent_phone || '', email: item.parent_email || '',
      childName: item.child_name || '', dob: item.child_dob || '', program: item.grade_level || '',
      date: item.created_at || '', status: item.status || 'submitted', score: '', ipTracking: '', message: item.notes || ''
    })))
  }

  useEffect(() => { void loadAdmissions() }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    const response = await fetch('/api/admin/admissions', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: newStatus }) })
    if (response.ok) await loadAdmissions()
  }

  const filtered = submissions.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.phone.includes(searchTerm) ||
                          s.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusMeta = (status: string) => {
    const normalized = status.toLowerCase()
    if (['new', 'submitted'].includes(normalized)) return { label: adminUiLang === 'vi' ? 'Mới gửi' : 'New', tone: 'border-blue-200 bg-blue-50 text-blue-800', dot: 'bg-blue-500' }
    if (['contacted', 'reviewing'].includes(normalized)) return { label: adminUiLang === 'vi' ? 'Đã liên hệ' : 'Contacted', tone: 'border-amber-200 bg-amber-50 text-amber-800', dot: 'bg-amber-500' }
    if (normalized === 'enrolled') return { label: adminUiLang === 'vi' ? 'Đã nhập học' : 'Enrolled', tone: 'border-emerald-200 bg-emerald-50 text-emerald-800', dot: 'bg-emerald-500' }
    return { label: status, tone: 'border-slate-200 bg-slate-50 text-slate-700', dot: 'bg-slate-400' }
  }

  return (
    <div className="space-y-4 text-[#1D1D1B]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 bg-white border border-neutral-200 p-4 sm:p-4.5 shadow-2xs rounded-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red block">
            {adminUiLang === 'vi' ? 'Quản lý Tuyển sinh' : 'Enquiries Management'}
          </span>
          <h2 className="text-xl font-display font-bold text-[#1D1D1B]">
            {adminUiLang === 'vi' ? 'Danh sách Hồ sơ Đăng ký Tuyển sinh & Lời nhắn Lead' : 'Admissions Submissions & Lead Messages'}
          </h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">
            {adminUiLang === 'vi'
              ? 'Theo dõi, đọc nội dung lời nhắn tư vấn và cập nhật trạng thái hồ sơ tuyển sinh.'
              : 'Track, follow up, read lead parent messages, and update application statuses.'}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white border border-neutral-200 p-3.5 shadow-2xs">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder={adminUiLang === 'vi' ? 'Tìm kiếm theo tên phụ huynh, SĐT hoặc nội dung ghi chú...' : 'Search by parent name, phone, or message text...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold p-1.5 focus:outline-none"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="submitted">Mới tiếp nhận</option>
          <option value="contacted">Đã liên hệ tư vấn</option>
          <option value="enrolled">Đã hoàn thành nhập học</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 overflow-x-auto shadow-2xs rounded-2xs">
        <table className="w-full min-w-[980px] table-fixed text-left border-collapse">
          <colgroup>
            <col className="w-[8%]" />
            <col className="w-[12%]" />
            <col className="w-[14%]" />
            <col className="w-[13%]" />
            <col className="w-[28%]" />
            <col className="w-[10%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead>
            <tr className="bg-[#FDFBF7] border-b border-neutral-200 text-neutral-600 font-semibold text-[11px]">
              <th className="py-3 px-4 whitespace-nowrap">Mã lead</th>
              <th className="py-3 px-4 whitespace-nowrap">Phụ huynh</th>
              <th className="py-3 px-4 whitespace-nowrap">Liên hệ</th>
              <th className="py-3 px-4 whitespace-nowrap">Bé & nhu cầu</th>
              <th className="py-3 px-4">Lời nhắn</th>
              <th className="py-3 px-4 text-center whitespace-nowrap">Trạng thái</th>
              <th className="border-l border-neutral-200 py-3 px-5 text-right whitespace-nowrap">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-medium text-xs">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-4 px-4 align-top">
                  <span title={s.id} className="font-mono text-[11px] font-bold tabular-nums text-maple-red">HS-{s.id.slice(-6).toUpperCase()}</span>
                </td>
                <td className="py-4 px-4 align-top">
                  <div className="font-bold text-[#1D1D1B] break-words">{s.name}</div>
                  <div className="mt-1 text-[10px] text-neutral-400">{s.date ? new Intl.DateTimeFormat(adminUiLang === 'vi' ? 'vi-VN' : 'en-GB', { dateStyle: 'medium' }).format(new Date(s.date)) : '—'}</div>
                </td>
                <td className="py-4 px-4 align-top">
                  <a href={`tel:${s.phone}`} className="block font-mono font-semibold text-neutral-700 hover:text-maple-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maple-red">{s.phone}</a>
                  <a href={`mailto:${s.email}`} className="mt-1 block truncate text-[10px] text-neutral-500 hover:text-maple-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maple-red">{s.email}</a>
                </td>
                <td className="py-4 px-4 align-top">
                  <div className="font-bold text-[#1D1D1B] break-words">{s.childName}</div>
                  <div className="mt-1 text-[10px] leading-snug text-neutral-500 break-words">{s.program || '—'}</div>
                </td>
                <td className="py-4 px-4 align-top">
                  <p className={`${(s.message || '').length > 180 ? 'line-clamp-2' : ''} min-w-0 break-words whitespace-pre-line text-[11px] leading-relaxed text-neutral-700`}>{s.message || '—'}</p>
                </td>
                <td className="py-4 px-4 text-center align-middle">
                  {(() => {
                    const status = getStatusMeta(s.status)
                    return <span className={`inline-flex min-w-[84px] items-center justify-center gap-1.5 border px-2 py-1 text-[10px] font-bold leading-none ${status.tone}`}><span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />{status.label}</span>
                  })()}
                </td>
                <td className="border-l border-neutral-100 py-4 px-5 text-right align-middle whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setActiveModal(s)}
                    className="inline-flex items-center gap-1 border border-neutral-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-neutral-700 hover:border-neutral-400 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maple-red"
                  >
                    <Eye size={12} /> Xem
                  </button>
                  {['new', 'submitted'].includes(s.status.toLowerCase()) && (
                    <button
                      onClick={() => handleStatusChange(s.id, 'contacted')}
                      className="bg-[#1D1D1B] px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-maple-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maple-red focus-visible:ring-offset-2"
                    >
                      Đã liên hệ
                    </button>
                  )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-xs text-neutral-500">Chưa có lead phù hợp với bộ lọc.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-neutral-300 rounded-2xs max-w-lg w-full p-6 space-y-4 shadow-xl relative animate-fade-in">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-black p-1"
            >
              <X size={18} />
            </button>

            <div className="border-b border-neutral-200 pb-3">
              <span className="text-[10px] font-mono font-bold text-maple-red">{activeModal.id}</span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">Chi tiết Hồ sơ Tuyển sinh & Lời nhắn Phụ huynh</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#FDFBF7] border border-neutral-200">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Họ tên phụ huynh:</span>
                  <span className="font-bold text-[#1D1D1B]">{activeModal.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Số điện thoại:</span>
                  <span className="font-mono font-bold text-[#1D1D1B]">{activeModal.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Email liên hệ:</span>
                  <span className="font-mono text-[#1D1D1B]">{activeModal.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Họ tên bé (Ngày sinh):</span>
                  <span className="font-bold text-[#1D1D1B]">{activeModal.childName} ({activeModal.dob})</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-neutral-400 block">Chương trình học quan tâm:</span>
                  <span className="font-bold text-maple-red">{activeModal.program}</span>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-900 text-white rounded-2xs space-y-1.5">
                <span className="text-[10px] font-bold text-maple-gold flex items-center gap-1">
                  <MessageSquare size={13} /> NỘI DUNG YÊU CẦU / NỘI DUNG LỜI NHẮN LEAD PHỤ HUYNH:
                </span>
                <p className="text-xs text-neutral-200 leading-relaxed font-sans italic">
                  &ldquo;{activeModal.message}&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-neutral-200">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold rounded-2xs"
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
