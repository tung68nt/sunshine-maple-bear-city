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
  const [submissions, setSubmissions] = useState(initialSubmissions)
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

  const handleStatusChange = (id: string, newStatus: string) => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status: newStatus } : s))
  }

  const filtered = submissions.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.phone.includes(searchTerm) ||
                          s.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
          <option value="New">Mới tiếp nhận (New)</option>
          <option value="Contacted">Đã liên hệ tư vấn</option>
          <option value="Enrolled">Đã hoàn thành nhập học</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden shadow-2xs rounded-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FDFBF7] border-b border-neutral-200 text-neutral-600 font-semibold text-[11px]">
              <th className="py-2.5 px-3.5 whitespace-nowrap">Mã HS</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Họ tên phụ huynh</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Mức Độ (Lead Score)</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Số điện thoại & Email</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Họ tên bé & Lớp</th>
              <th className="py-2.5 px-3.5">Nội dung Lời nhắn / Ghi chú</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Trạng thái</th>
              <th className="py-2.5 px-3.5 text-right whitespace-nowrap">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-medium text-xs">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-2.5 px-3.5 font-mono font-bold text-maple-red whitespace-nowrap">{s.id}</td>
                <td className="py-2.5 px-3.5 font-bold text-[#1D1D1B] whitespace-nowrap">{s.name}</td>
                <td className="py-2.5 px-3.5 whitespace-nowrap">
                  <span className="px-2 py-0.5 bg-red-50 text-maple-red border border-red-200 font-extrabold text-[10px] rounded-2xs">
                    {s.score || '🔥 HOT (92 điểm)'}
                  </span>
                  {s.ipTracking && (
                    <div className="text-[9px] font-mono text-neutral-400 mt-0.5">{s.ipTracking}</div>
                  )}
                </td>
                <td className="py-2.5 px-3.5 font-mono text-neutral-600 whitespace-nowrap">
                  <div>{s.phone}</div>
                  <div className="text-[10px] text-neutral-400 font-sans">{s.email}</div>
                </td>
                <td className="py-2.5 px-3.5 whitespace-nowrap">
                  <div className="font-bold text-[#1D1D1B]">{s.childName}</div>
                  <div className="text-[10px] text-neutral-500 font-mono">{s.program}</div>
                </td>
                <td className="py-2.5 px-3.5 max-w-xs">
                  <div className="text-[11px] text-neutral-700 line-clamp-2 italic">
                    &ldquo;{s.message}&rdquo;
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModal(s)}
                    className="text-[10px] font-bold text-maple-red hover:underline mt-0.5 inline-flex items-center gap-1"
                  >
                    <Eye size={10} /> Xem chi tiết lời nhắn
                  </button>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-2xs ${
                    s.status === 'New'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : s.status === 'Contacted'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {s.status === 'New' ? 'Mới gửi' : s.status === 'Contacted' ? 'Đã liên hệ' : 'Đã nhập học'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                  <button
                    onClick={() => setActiveModal(s)}
                    className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-2xs border border-neutral-300 inline-flex items-center gap-1"
                  >
                    <Eye size={12} /> Xem Chi tiết
                  </button>
                  {s.status === 'New' && (
                    <button
                      onClick={() => handleStatusChange(s.id, 'Contacted')}
                      className="px-2 py-1 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-semibold rounded-2xs shadow-2xs"
                    >
                      Đã liên hệ
                    </button>
                  )}
                </td>
              </tr>
            ))}
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
