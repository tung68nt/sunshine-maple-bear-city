'use client'

import { useState, useEffect } from 'react'
import { CalendarCheck, Search, Filter, CheckCircle2, Clock, XCircle, MessageSquare, Eye, X } from 'lucide-react'

const initialTours = [
  {
    id: 'TB-01',
    parent: 'Nguyễn Văn Nam',
    email: 'nam.nguyen@gmail.com',
    phone: '0912 345 678',
    childDob: '12/04/2023',
    tourDate: '12/08/2026',
    timeSlot: '09:30 AM',
    status: 'Confirmed',
    message: 'Gia đình muốn tìm hiểu kỹ chương trình tiếng Anh 100% bản ngữ Canada cho bé 3 tuổi và xe bus đưa đón khu đô thị Sunshine City.'
  },
  {
    id: 'TB-02',
    parent: 'Trần Thị Mai',
    email: 'mai.tran@yahoo.com',
    phone: '0988 765 432',
    childDob: '05/10/2024',
    tourDate: '14/08/2026',
    timeSlot: '02:00 PM',
    status: 'Pending',
    message: 'Cần tư vấn thực đơn dinh dưỡng 5 sao hữu cơ và chế độ chăm sóc cho bé nhóm lớp Toddler 18-24 tháng.'
  },
  {
    id: 'TB-03',
    parent: 'Lê Hoàng Anh',
    email: 'hoanganh.le@company.vn',
    phone: '0903 112 233',
    childDob: '18/02/2022',
    tourDate: '15/08/2026',
    timeSlot: '10:00 AM',
    status: 'Confirmed',
    message: 'Mong muốn tham quan cơ sở vật chất khu liên hợp thể thao mầm non và phòng học Montessori hiện đại.'
  },
  {
    id: 'TB-04',
    parent: 'Phạm Thu Trang',
    email: 'trang.pham@gmail.com',
    phone: '0945 667 889',
    childDob: '30/08/2023',
    tourDate: '18/08/2026',
    timeSlot: '03:30 PM',
    status: 'Completed',
    message: 'Đăng ký tư vấn chính sách ưu đãi học phí cho cư dân Sunshine City sinh năm 2023.'
  },
]

export default function AdminTourBookingsPage() {
  const [tours, setTours] = useState<typeof initialTours>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [adminUiLang, setAdminUiLang] = useState<'vi' | 'en'>('vi')
  const [selectedTour, setSelectedTour] = useState<typeof initialTours[0] | null>(null)

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

  const loadTours = async () => {
    const response = await fetch('/api/admin/tour-bookings', { cache: 'no-store' })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) return
    setTours((payload.data || []).map((item: any) => ({
      id: item.id, parent: item.visitor_name || '', email: item.visitor_email || '', phone: item.visitor_phone || '',
      childDob: item.child_age || '', tourDate: item.preferred_date || '', timeSlot: item.preferred_time || '',
      status: item.status || 'pending', message: item.notes || ''
    })))
  }

  useEffect(() => { void loadTours() }, [])

  const handleStatus = async (id: string, status: string) => {
    const response = await fetch('/api/admin/tour-bookings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: status.toLowerCase() }) })
    if (response.ok) await loadTours()
  }

  const filteredTours = tours.filter(t => 
    t.parent.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.phone.includes(searchTerm) ||
    t.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 text-[#1D1D1B]">
      
      {/* Header */}
      <div className="bg-white border border-neutral-200 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red block">
            {adminUiLang === 'vi' ? 'Hoạt động Vận hành' : 'Operations'}
          </span>
          <h2 className="text-xl font-display font-bold text-[#1D1D1B]">
            {adminUiLang === 'vi' ? 'Quản lý Lịch Đặt Tham quan & Nội dung Lead' : 'Campus Tour Bookings & Lead Enquiries'}
          </h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">
            {adminUiLang === 'vi'
              ? 'Quản lý chi tiết danh sách phụ huynh đăng ký tham quan và đọc nội dung lời nhắn yêu cầu.'
              : 'Manage scheduled campus visits, parent messages, and guide appointments.'}
          </p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white border border-neutral-200 p-3.5 flex gap-4 shadow-2xs">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder={adminUiLang === 'vi' ? 'Tìm kiếm theo tên phụ huynh, số điện thoại hoặc nội dung lời nhắn...' : 'Search by parent name, phone, or message text...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden shadow-2xs rounded-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#FDFBF7] border-b border-neutral-200 text-neutral-600 font-semibold">
              <th className="py-2.5 px-4">{adminUiLang === 'vi' ? 'Mã hẹn' : 'Booking ID'}</th>
              <th className="py-2.5 px-4">{adminUiLang === 'vi' ? 'Họ tên phụ huynh' : 'Parent Name'}</th>
              <th className="py-2.5 px-4">{adminUiLang === 'vi' ? 'Số điện thoại & Email' : 'Phone & Email'}</th>
              <th className="py-2.5 px-4">{adminUiLang === 'vi' ? 'Ngày & Giờ tham quan' : 'Tour Date & Time'}</th>
              <th className="py-2.5 px-4">{adminUiLang === 'vi' ? 'Nội dung Lời nhắn Lead' : 'Lead Parent Message'}</th>
              <th className="py-2.5 px-4">{adminUiLang === 'vi' ? 'Trạng thái' : 'Status'}</th>
              <th className="py-2.5 px-4 text-right">{adminUiLang === 'vi' ? 'Thao tác' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredTours.map((t) => (
              <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-[#1D1D1B]">{t.id}</td>
                <td className="py-3 px-4 font-semibold text-[#1D1D1B]">{t.parent}</td>
                <td className="py-3 px-4 font-mono text-neutral-600">
                  <div>{t.phone}</div>
                  <div className="text-[10px] text-neutral-400 font-sans">{t.email}</div>
                </td>
                <td className="py-3 px-4 font-mono font-semibold text-[#1D1D1B]">
                  {t.tourDate} <span className="text-neutral-400">({t.timeSlot})</span>
                </td>
                <td className="py-3 px-4 max-w-xs">
                  <div className="text-xs text-neutral-700 line-clamp-2 italic">
                    &ldquo;{t.message}&rdquo;
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTour(t)}
                    className="text-[10px] font-bold text-maple-red hover:underline mt-0.5 inline-flex items-center gap-1"
                  >
                    <Eye size={10} /> Xem đầy đủ lời nhắn
                  </button>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-2xs ${
                    t.status.toLowerCase() === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : t.status.toLowerCase() === 'pending'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-neutral-100 text-neutral-800 border border-neutral-300'
                  }`}>
                    {adminUiLang === 'vi'
                      ? (t.status.toLowerCase() === 'confirmed' ? 'Đã xác nhận' : t.status.toLowerCase() === 'pending' ? 'Đang chờ' : 'Đã hoàn thành')
                      : t.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                  <button
                    onClick={() => setSelectedTour(t)}
                    className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-2xs border border-neutral-300 inline-flex items-center gap-1"
                  >
                    <Eye size={12} /> {adminUiLang === 'vi' ? 'Xem Detail' : 'View Detail'}
                  </button>

                  {t.status.toLowerCase() === 'pending' && (
                    <button
                      onClick={() => handleStatus(t.id, 'Confirmed')}
                      className="px-2.5 py-1 bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 rounded-2xs shadow-2xs"
                    >
                      {adminUiLang === 'vi' ? 'Xác nhận' : 'Confirm'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-neutral-300 rounded-2xs max-w-lg w-full p-6 space-y-4 shadow-xl relative animate-fade-in">
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-black p-1"
            >
              <X size={18} />
            </button>

            <div className="border-b border-neutral-200 pb-3">
              <span className="text-[10px] font-mono font-bold text-maple-red">{selectedTour.id}</span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">Chi tiết Yêu cầu Lead & Lời nhắn Phụ huynh</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#FDFBF7] border border-neutral-200">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Họ tên phụ huynh:</span>
                  <span className="font-bold text-[#1D1D1B]">{selectedTour.parent}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Số điện thoại:</span>
                  <span className="font-mono font-bold text-[#1D1D1B]">{selectedTour.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Email liên hệ:</span>
                  <span className="font-mono text-[#1D1D1B]">{selectedTour.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Lịch hẹn tham quan:</span>
                  <span className="font-mono font-bold text-maple-red">{selectedTour.tourDate} ({selectedTour.timeSlot})</span>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-900 text-white rounded-2xs space-y-1.5">
                <span className="text-[10px] font-bold text-maple-gold flex items-center gap-1">
                  <MessageSquare size={13} /> NỘI DUNG LỜI NHẮN / GHI CHÚ CỦA PHỤ HUYNH:
                </span>
                <p className="text-xs text-neutral-200 leading-relaxed font-sans italic">
                  &ldquo;{selectedTour.message}&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-neutral-200">
              <button
                onClick={() => setSelectedTour(null)}
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
