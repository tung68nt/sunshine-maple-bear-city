'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Users, Plus, Trash2, Edit2, Globe2, Award } from 'lucide-react'

const initialStaff = [
  { id: '1', name: 'Sarah Johnson', role: 'Lead English Teacher', country: 'Canada', years: 8, image: '/teacher_sarah_1778697942314.png' },
  { id: '2', name: 'Nguyễn Thanh Hà', role: 'Homeroom Teacher', country: 'Vietnam', years: 10, image: '/teacher_ha_1778697972076.png' },
  { id: '3', name: 'Michael Chen', role: 'STEAM Coordinator', country: 'United Kingdom', years: 6, image: '/teacher_michael_1778698188655.png' },
]

export default function AdminStaffPage() {
  const [staff, setStaff] = useState(initialStaff)
  const [showModal, setShowModal] = useState(false)

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [country, setCountry] = useState('Canada')
  const [years, setYears] = useState('5')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const newTeacher = {
      id: Date.now().toString(),
      name,
      role,
      country,
      years: parseInt(years) || 5,
      image: '/teacher_sarah_1778697942314.png'
    }

    setStaff([...staff, newTeacher])
    setName('')
    setRole('')
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setStaff(staff.filter(s => s.id !== id))
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-neutral-200 p-5 shadow-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red block">Quản lý Đội ngũ & Nhân sự</span>
          <h2 className="text-xl font-display font-bold text-[#1D1D1B]">Hồ sơ Giáo viên & Chuyên gia</h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">Quản lý hồ sơ giáo viên, vai trò, kinh nghiệm và chứng chỉ giảng dạy.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-1.5 bg-[#1D1D1B] text-white text-xs font-semibold hover:bg-maple-red transition-colors border border-[#1D1D1B] flex items-center gap-1.5 rounded-2xs shadow-2xs"
        >
          <Plus size={15} />
          Thêm Giáo viên / Nhân sự
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {staff.map((s) => (
          <div key={s.id} className="bg-white border border-neutral-200 p-5 space-y-3.5 shadow-2xs text-center relative group rounded-2xs">
            <div className="relative w-24 h-24 mx-auto border border-neutral-200 bg-neutral-100 rounded-full overflow-hidden">
              <Image
                src={s.image}
                alt={s.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FDFBF7] border border-neutral-200 text-[10px] font-semibold text-neutral-600 mb-1.5 rounded-2xs">
                <Globe2 size={12} className="text-maple-red" />
                {s.country}
              </span>
              <h3 className="font-display font-bold text-base text-[#1D1D1B]">{s.name}</h3>
              <p className="text-xs text-maple-red font-semibold mt-0.5">{s.role}</p>
              <p className="text-xs text-neutral-500 font-light mt-0.5">{s.years} năm kinh nghiệm</p>
            </div>
            <div className="pt-2.5 border-t border-neutral-100 flex justify-center gap-3">
              <button className="text-xs font-semibold text-neutral-500 hover:text-maple-red flex items-center gap-1">
                <Edit2 size={13} /> Sửa
              </button>
              <button onClick={() => handleDelete(s.id)} className="text-xs font-semibold text-neutral-500 hover:text-red-600 flex items-center gap-1">
                <Trash2 size={13} /> Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 max-w-md w-full p-5 space-y-4 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-200 pb-3">
              <span className="text-[10px] font-semibold text-maple-red block">Tạo hồ sơ nhân sự mới</span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">Thêm thông tin Giáo viên</h3>
            </div>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="text-xs font-semibold block mb-1">Họ tên giáo viên *</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập họ và tên..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Chức danh / Chuyên môn *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Giáo viên Tiếng Anh Chủ nhiệm"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Quốc tịch *</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Số năm kinh nghiệm *</label>
                  <input
                    type="number"
                    required
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs focus:outline-none focus:border-maple-red"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-1.5 bg-neutral-100 text-[#1D1D1B] font-semibold text-xs border border-neutral-300 rounded-2xs"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white font-semibold text-xs border border-[#1D1D1B] transition-colors rounded-2xs shadow-2xs"
                >
                  Lưu giáo viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
