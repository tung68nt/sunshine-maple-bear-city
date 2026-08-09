'use client'

import { useState, useEffect } from 'react'
import { ShieldCheck, Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, Key, UserCheck, Lock, ShieldAlert, Check, RefreshCw } from 'lucide-react'

export type AdminRole = 'admin' | 'principal' | 'admissions' | 'marketing' | 'teacher'

interface CmsUser {
  id: string
  name: string
  email: string
  role: AdminRole
  department: string
  status: 'active' | 'inactive'
  lastLogin: string
}

const INITIAL_USERS: CmsUser[] = [
  {
    id: 'u-1',
    name: 'Chủ Đầu Tư / Admin Master',
    email: 'admin@sunshinemaplebear.edu.vn',
    role: 'admin',
    department: 'Ban Điều Hành Master',
    status: 'active',
    lastLogin: 'Vừa xong'
  },
  {
    id: 'u-2',
    name: 'Ban Giám Hiệu Mầm Non',
    email: 'principal@sunshinemaplebear.edu.vn',
    role: 'principal',
    department: 'Ban Giám Hiệu Academic',
    status: 'active',
    lastLogin: '2 giờ trước'
  },
  {
    id: 'u-3',
    name: 'Trưởng Phòng Tuyển Sinh',
    email: 'admissions@sunshinemaplebear.edu.vn',
    role: 'admissions',
    department: 'Phòng Tuyển Sinh & Tư Vấn',
    status: 'active',
    lastLogin: 'Hôm qua'
  },
  {
    id: 'u-4',
    name: 'Chuyên Viên MarCom',
    email: 'marketing@sunshinemaplebear.edu.vn',
    role: 'marketing',
    department: 'Phòng Marketing & Truyền Thông',
    status: 'active',
    lastLogin: '3 ngày trước'
  },
  {
    id: 'u-5',
    name: 'Tổ Trưởng Chuyên Môn Canada',
    email: 'teacher@sunshinemaplebear.edu.vn',
    role: 'teacher',
    department: 'Tổ Giáo Viên Bản Ngữ & VN',
    status: 'active',
    lastLogin: '5 ngày trước'
  }
]

const ROLE_INFO: Record<AdminRole, { title: string; color: string; desc: string }> = {
  admin: {
    title: 'Super Admin (Chủ Đầu Tư)',
    color: 'bg-maple-red text-white',
    desc: 'Quyền quản trị cao nhất toàn bộ hệ thống CMS, tài khoản, cấu hình và SQL.'
  },
  principal: {
    title: 'Ban Giám Hiệu (BGH)',
    color: 'bg-amber-600 text-white',
    desc: 'Quản lý đào tạo, đội ngũ giáo viên, sự kiện, tuyển sinh và báo cáo tổng quan.'
  },
  admissions: {
    title: 'Phòng Tuyển Sinh (Admissions)',
    color: 'bg-blue-600 text-white',
    desc: 'Quản lý hồ sơ tư vấn nhập học, lịch hẹn tham quan campus và form thông tin.'
  },
  marketing: {
    title: 'Phòng Marketing (MarCom)',
    color: 'bg-purple-600 text-white',
    desc: 'Biên tập bài viết, thư viện ảnh, chiến dịch UTM, landing page và thông báo.'
  },
  teacher: {
    title: 'Tổ Giáo Viên (Educators)',
    color: 'bg-emerald-600 text-white',
    desc: 'Xem lịch sự kiện, đăng tải hoạt động lớp học và hình ảnh học sinh.'
  }
}

const MATRIX_MODULES = [
  { key: '/admin', name: 'Tổng quan Dashboard' },
  { key: '/admin/blog', name: 'Bài viết & Tin tức CMS' },
  { key: '/admin/gallery', name: 'Thư viện Hình ảnh 5 Sao' },
  { key: '/admin/staff', name: 'Đội ngũ Giáo viên' },
  { key: '/admin/pages', name: 'Quản lý Trang tĩnh' },
  { key: '/admin/events', name: 'Sự kiện & Lễ hội' },
  { key: '/admin/forms', name: 'Dựng Form Động' },
  { key: '/admin/utm-builder', name: 'Chiến dịch UTM Links' },
  { key: '/admin/admissions', name: 'Hồ sơ Tuyển sinh' },
  { key: '/admin/tour-bookings', name: 'Đặt lịch Tham quan' },
  { key: '/admin/analytics', name: 'Báo cáo GA4 & Phân tích' },
  { key: '/admin/users', name: 'Phân quyền & User CMS' },
  { key: '/admin/settings', name: 'Cấu hình Hệ thống Master' },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<CmsUser[]>(INITIAL_USERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'users' | 'matrix'>('users')

  // Form State
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRole, setNewRole] = useState<AdminRole>('admissions')
  const [newDepartment, setNewDepartment] = useState('Phòng Tuyển Sinh')

  useEffect(() => {
    const savedUsers = localStorage.getItem('smb_cms_users_list')
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const saveUsers = (updated: CmsUser[]) => {
    setUsers(updated)
    localStorage.setItem('smb_cms_users_list', JSON.stringify(updated))
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newEmail.trim()) return

    const newUser: CmsUser = {
      id: `u-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      department: newDepartment,
      status: 'active',
      lastLogin: 'Chưa từng'
    }

    const updated = [newUser, ...users]
    saveUsers(updated)

    // Reset Form
    setNewName('')
    setNewEmail('')
    setNewPassword('')
    setShowAddModal(false)
  }

  const toggleUserStatus = (id: string) => {
    const updated = users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' as const } : u)
    saveUsers(updated)
  }

  const handleDeleteUser = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản CMS này?')) {
      const updated = users.filter(u => u.id !== id)
      saveUsers(updated)
    }
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || u.role === filterRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-neutral-200 p-6 rounded-2xs shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
            <span className="text-xs font-bold text-maple-red uppercase tracking-wider">BẢO MẬT & PHÂN QUYỀN HỆ THỐNG</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#1D1D1B]">
            Quản Lý Tài Khoản User & Ma Trận Phân Quyền CMS
          </h2>
          <p className="text-xs text-neutral-500 font-normal mt-1">
            Thiết lập vai trò (5 Roles), phân quyền truy cập các module quản trị cho cán bộ trường mầm non Sunshine Maple Bear.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#151513] text-white text-xs font-extrabold rounded-2xs hover:bg-maple-red transition-all flex items-center gap-2 shadow-xs uppercase tracking-wider"
          >
            <Plus size={16} />
            Tạo User Mới
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-neutral-200 bg-white px-4 rounded-2xs shadow-xs">
        <button
          onClick={() => setActiveTab('users')}
          className={`py-3.5 px-5 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'users' ? 'border-maple-red text-maple-red' : 'border-transparent text-neutral-500 hover:text-maple-black'
          }`}
        >
          <UserCheck size={16} />
          Danh Sách Tài Khoản CMS ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`py-3.5 px-5 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'matrix' ? 'border-maple-red text-maple-red' : 'border-transparent text-neutral-500 hover:text-maple-black'
          }`}
        >
          <ShieldCheck size={16} />
          Ma Trận Phân Quyền RBAC (5 Roles)
        </button>
      </div>

      {activeTab === 'users' ? (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xs border border-neutral-200 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên hoặc email user..."
                className="w-full pl-10 pr-4 py-2 bg-[#FDFBF7] border border-neutral-200 rounded-2xs text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-bold text-neutral-500 whitespace-nowrap">Lọc Vai Trò:</span>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="py-2 px-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs text-xs font-bold text-maple-black focus:outline-none"
              >
                <option value="all">Tất cả Vai trò (5 Roles)</option>
                <option value="admin">Super Admin (Chủ Đầu Tư)</option>
                <option value="principal">Ban Giám Hiệu (BGH)</option>
                <option value="admissions">Phòng Tuyển Sinh</option>
                <option value="marketing">Phòng Marketing</option>
                <option value="teacher">Tổ Giáo Viên</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-2xs border border-neutral-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#151513] text-white text-[11px] font-extrabold uppercase tracking-wider border-b border-neutral-800">
                    <th className="p-4">Họ & Tên User</th>
                    <th className="p-4">Email Đăng Nhập</th>
                    <th className="p-4">Vai Trò RBAC</th>
                    <th className="p-4">Phòng Ban / Bộ Phận</th>
                    <th className="p-4">Trạng Thái</th>
                    <th className="p-4 text-center">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs font-medium text-neutral-700">
                  {filteredUsers.map((u) => {
                    const roleMeta = ROLE_INFO[u.role]
                    return (
                      <tr key={u.id} className="hover:bg-[#FDFBF7] transition-colors">
                        <td className="p-4 font-bold text-maple-black">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-2xs bg-[#151513] text-maple-gold flex items-center justify-center font-extrabold text-xs">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <span>{u.name}</span>
                              <span className="text-[10px] text-neutral-400 font-normal block">Đăng nhập: {u.lastLogin}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono font-bold text-neutral-600">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-2xs text-[10px] font-extrabold uppercase tracking-wider inline-block ${roleMeta?.color || 'bg-neutral-200'}`}>
                            {roleMeta?.title.split(' (')[0]}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-neutral-600">{u.department}</td>
                        <td className="p-4">
                          {u.status === 'active' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xs text-[10px] font-extrabold">
                              <CheckCircle2 size={12} /> Hoạt Động
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-100 text-neutral-500 border border-neutral-200 rounded-2xs text-[10px] font-extrabold">
                              <XCircle size={12} /> Tạm Khóa
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => toggleUserStatus(u.id)}
                              title={u.status === 'active' ? 'Tạm khóa tài khoản' : 'Kích hoạt tài khoản'}
                              className="p-1.5 rounded-2xs border border-neutral-200 text-neutral-600 hover:text-maple-red hover:bg-neutral-100 transition-colors"
                            >
                              <RefreshCw size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              title="Xóa tài khoản"
                              className="p-1.5 rounded-2xs border border-neutral-200 text-neutral-600 hover:text-red-600 hover:bg-neutral-100 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Role Matrix Inspector */
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xs border border-neutral-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-display font-extrabold text-maple-black uppercase tracking-wide">
                Bảng Ma Trận Phân Quyền Mô-đun Hệ Thống (RBAC Matrix)
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Chi tiết quyền hạn truy cập URL và module quản trị dành cho 5 vai trò người dùng trong trường mầm non Sunshine Maple Bear.
              </p>
            </div>

            <div className="overflow-x-auto border border-neutral-200 rounded-2xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#151513] text-white text-[11px] font-extrabold uppercase tracking-wider border-b border-neutral-800">
                    <th className="p-4 border-r border-neutral-800">Mô-đun CMS</th>
                    <th className="p-4 text-center border-r border-neutral-800 text-maple-gold">Super Admin</th>
                    <th className="p-4 text-center border-r border-neutral-800 text-amber-400">Ban Giám Hiệu</th>
                    <th className="p-4 text-center border-r border-neutral-800 text-blue-400">Tuyển Sinh</th>
                    <th className="p-4 text-center border-r border-neutral-800 text-purple-400">Marketing</th>
                    <th className="p-4 text-center text-emerald-400">Tổ Giáo Viên</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs font-bold text-neutral-700">
                  {MATRIX_MODULES.map((mod, idx) => {
                    const canAdmin = true
                    const canPrincipal = ['/admin', '/admin/blog', '/admin/staff', '/admin/events', '/admin/admissions', '/admin/tour-bookings', '/admin/analytics', '/admin/users'].includes(mod.key)
                    const canAdmissions = ['/admin', '/admin/admissions', '/admin/tour-bookings', '/admin/events', '/admin/forms', '/admin/utm-builder', '/admin/analytics'].includes(mod.key)
                    const canMarketing = ['/admin', '/admin/blog', '/admin/gallery', '/admin/staff', '/admin/pages', '/admin/navigation', '/admin/events', '/admin/forms', '/admin/utm-builder', '/admin/analytics'].includes(mod.key)
                    const canTeacher = ['/admin', '/admin/blog', '/admin/gallery', '/admin/events'].includes(mod.key)

                    return (
                      <tr key={idx} className="hover:bg-[#FDFBF7] transition-colors">
                        <td className="p-3.5 border-r border-neutral-200 font-bold text-maple-black">
                          {mod.name} <span className="text-[10px] text-neutral-400 font-mono block">{mod.key}</span>
                        </td>
                        <td className="p-3.5 text-center border-r border-neutral-100">
                          <Check size={18} className="text-emerald-600 mx-auto font-black" />
                        </td>
                        <td className="p-3.5 text-center border-r border-neutral-100">
                          {canPrincipal ? <Check size={18} className="text-emerald-600 mx-auto" /> : <span className="text-neutral-300">-</span>}
                        </td>
                        <td className="p-3.5 text-center border-r border-neutral-100">
                          {canAdmissions ? <Check size={18} className="text-emerald-600 mx-auto" /> : <span className="text-neutral-300">-</span>}
                        </td>
                        <td className="p-3.5 text-center border-r border-neutral-100">
                          {canMarketing ? <Check size={18} className="text-emerald-600 mx-auto" /> : <span className="text-neutral-300">-</span>}
                        </td>
                        <td className="p-3.5 text-center">
                          {canTeacher ? <Check size={18} className="text-emerald-600 mx-auto" /> : <span className="text-neutral-300">-</span>}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 max-w-md w-full p-6 space-y-5 shadow-2xl rounded-2xs">
            <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
              <h3 className="text-base font-display font-extrabold text-[#1D1D1B] uppercase tracking-wide">
                Tạo Tài Khoản User CMS Mới
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-neutral-700 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4 text-xs font-bold text-neutral-700">
              <div>
                <label className="block mb-1 uppercase tracking-wider">Họ & Tên Cán Bộ *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Thu Hà"
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-200 rounded-2xs text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="block mb-1 uppercase tracking-wider">Email Quản Trị *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="ha.nguyen@sunshinemaplebear.edu.vn"
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-200 rounded-2xs text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="block mb-1 uppercase tracking-wider">Phòng Ban / Bộ Phận</label>
                <input
                  type="text"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  placeholder="Phòng Tuyển Sinh"
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-200 rounded-2xs text-xs font-bold text-maple-black focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="block mb-1 uppercase tracking-wider">Phân Quyền Vai Trò (Role) *</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as AdminRole)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-200 rounded-2xs text-xs font-bold text-maple-black focus:outline-none"
                >
                  <option value="admin">Super Admin (Chủ Đầu Tư / Full Access)</option>
                  <option value="principal">Ban Giám Hiệu (BGH / Academic Principal)</option>
                  <option value="admissions">Phòng Tuyển Sinh (Admissions & Enquiries)</option>
                  <option value="marketing">Phòng Marketing (MarCom & Media)</option>
                  <option value="teacher">Tổ Giáo Viên (Educators & Class News)</option>
                </select>
                <p className="text-[10px] text-neutral-400 font-normal mt-1 leading-relaxed">
                  {ROLE_INFO[newRole]?.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-neutral-200 text-neutral-600 font-extrabold rounded-2xs hover:bg-neutral-100 uppercase tracking-wider"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-maple-red text-white font-extrabold rounded-2xs hover:bg-red-700 uppercase tracking-wider"
                >
                  Tạo User Mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
