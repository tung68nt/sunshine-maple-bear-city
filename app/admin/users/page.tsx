'use client'

import { useState, useEffect } from 'react'
import { ShieldCheck, Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, Key, UserCheck, Lock, ShieldAlert, Check, RefreshCw, Eye, EyeOff, Sparkles, X } from 'lucide-react'

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
  { key: '/admin/utm-builder', name: 'Tạo Link UTM Campaign' },
  { key: '/admin/admissions', name: 'Hồ sơ Tuyển sinh' },
  { key: '/admin/tour-bookings', name: 'Đặt lịch Tham quan' },
  { key: '/admin/analytics', name: 'Báo cáo & Phân tích' },
  { key: '/admin/users', name: 'Phân quyền & User CMS' },
  { key: '/admin/settings', name: 'Cấu hình Hệ thống' }
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<CmsUser[]>([])
  const [activeTab, setActiveTab] = useState<'users' | 'matrix'>('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')

  // Add User Modal State
  const [showAddModal, setShowAddModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState<AdminRole>('admissions')
  const [newDepartment, setNewDepartment] = useState('Phòng Tuyển Sinh & Tư Vấn')
  const [newPassword, setNewPassword] = useState('')

  // Reset Password Modal State
  const [resetUser, setResetUser] = useState<CmsUser | null>(null)
  const [resetPasswordInput, setResetPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [resetSuccessMessage, setResetSuccessMessage] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('smb_admin_users')
    if (saved) {
      try {
        setUsers(JSON.parse(saved))
      } catch (e) {
        setUsers(INITIAL_USERS)
      }
    } else {
      setUsers(INITIAL_USERS)
    }
  }, [])

  const saveUsers = (newUsers: CmsUser[]) => {
    setUsers(newUsers)
    localStorage.setItem('smb_admin_users', JSON.stringify(newUsers))
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) return

    const newUser: CmsUser = {
      id: `u-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      department: newDepartment.trim() || 'Cơ quan Trường',
      status: 'active',
      lastLogin: 'Chưa từng'
    }

    const updated = [newUser, ...users]
    saveUsers(updated)

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

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$'
    let pass = ''
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setResetPasswordInput(pass)
  }

  const handleConfirmResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetUser || !resetPasswordInput.trim()) return

    setResetSuccessMessage(`✓ Đã đổi mật khẩu thành công cho ${resetUser.name} (${resetUser.email}). Mật khẩu mới: ${resetPasswordInput}`)
    
    setTimeout(() => {
      setResetUser(null)
      setResetPasswordInput('')
      setResetSuccessMessage('')
    }, 2500)
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
            Quản Lý Tài Khoản User & Reset Mật Khẩu CMS
          </h2>
          <p className="text-xs text-neutral-500 font-normal mt-1">
            Quản lý danh sách tài khoản, đặt lại mật khẩu và kiểm tra ma trận phân quyền 5 vai trò trường mầm non Sunshine Maple Bear.
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
                    <th className="p-4 text-center">Thao Tác Quản Trị</th>
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
                            {/* RESET PASSWORD BUTTON */}
                            <button
                              onClick={() => {
                                setResetUser(u)
                                setResetPasswordInput('')
                                setResetSuccessMessage('')
                              }}
                              title="Đặt lại mật khẩu cho User này"
                              className="px-2 py-1.5 rounded-2xs border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors flex items-center gap-1 font-bold text-[10px]"
                            >
                              <Key size={13} className="text-amber-700" />
                              <span>Reset MK</span>
                            </button>

                            {/* TOGGLE STATUS BUTTON */}
                            <button
                              onClick={() => toggleUserStatus(u.id)}
                              title={u.status === 'active' ? 'Tạm khóa tài khoản' : 'Kích hoạt tài khoản'}
                              className="p-1.5 rounded-2xs border border-neutral-200 text-neutral-600 hover:text-maple-red hover:bg-neutral-100 transition-colors"
                            >
                              <RefreshCw size={14} />
                            </button>

                            {/* DELETE BUTTON */}
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
                <tbody className="divide-y divide-neutral-100 text-xs font-semibold text-neutral-700">
                  {MATRIX_MODULES.map((mod) => (
                    <tr key={mod.key} className="hover:bg-[#FDFBF7] transition-colors">
                      <td className="p-4 border-r border-neutral-200 font-bold text-maple-black">
                        <div>{mod.name}</div>
                        <div className="text-[10px] font-mono text-neutral-400 font-normal">{mod.key}</div>
                      </td>
                      <td className="p-4 text-center border-r border-neutral-200 bg-red-50/30">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold"><Check size={16} /> Toàn quyền</span>
                      </td>
                      <td className="p-4 text-center border-r border-neutral-200">
                        {['/admin', '/admin/blog', '/admin/gallery', '/admin/staff', '/admin/events', '/admin/admissions', '/admin/tour-bookings', '/admin/analytics', '/admin/users'].includes(mod.key) ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold"><Check size={16} /> Có</span>
                        ) : (
                          <span className="text-neutral-300 font-normal">—</span>
                        )}
                      </td>
                      <td className="p-4 text-center border-r border-neutral-200">
                        {['/admin', '/admin/admissions', '/admin/tour-bookings', '/admin/forms'].includes(mod.key) ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold"><Check size={16} /> Có</span>
                        ) : (
                          <span className="text-neutral-300 font-normal">—</span>
                        )}
                      </td>
                      <td className="p-4 text-center border-r border-neutral-200">
                        {['/admin', '/admin/blog', '/admin/gallery', '/admin/events', '/admin/pages', '/admin/forms', '/admin/utm-builder', '/admin/analytics'].includes(mod.key) ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold"><Check size={16} /> Có</span>
                        ) : (
                          <span className="text-neutral-300 font-normal">—</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {['/admin', '/admin/events', '/admin/gallery'].includes(mod.key) ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold"><Check size={16} /> Xem</span>
                        ) : (
                          <span className="text-neutral-300 font-normal">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {resetUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xs max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-5">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-maple-red rounded-full inline-block" />
                <h3 className="text-base font-display font-extrabold text-maple-black uppercase tracking-wide flex items-center gap-2">
                  <Key size={18} className="text-amber-600" />
                  Đặt Lại Mật Khẩu Cho User
                </h3>
              </div>
              <button onClick={() => setResetUser(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>

            {/* Target User Info Summary */}
            <div className="p-3.5 bg-[#FDFBF7] border border-neutral-200 rounded-2xs text-xs space-y-1">
              <div className="font-bold text-maple-black">{resetUser.name}</div>
              <div className="font-mono text-neutral-600">{resetUser.email}</div>
              <div className="text-[10px] text-neutral-500 uppercase font-bold">
                Vai trò: <span className="text-maple-red">{ROLE_INFO[resetUser.role].title}</span>
              </div>
            </div>

            {resetSuccessMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xs text-xs text-emerald-900 font-semibold space-y-1">
                <div>{resetSuccessMessage}</div>
                <div className="text-[10px] text-emerald-700">Đang đóng cửa sổ tự động...</div>
              </div>
            ) : (
              <form onSubmit={handleConfirmResetPassword} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-maple-black block">Mật khẩu mới (New Password):</label>
                    <button
                      type="button"
                      onClick={generateRandomPassword}
                      className="text-[10px] font-bold text-blue-700 hover:underline flex items-center gap-1"
                    >
                      <Sparkles size={12} /> Tạo Mật Khẩu Ngẫu Nhiên
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={resetPasswordInput}
                      onChange={(e) => setResetPasswordInput(e.target.value)}
                      placeholder="Nhập mật khẩu mới..."
                      className="w-full p-2.5 pr-10 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-mono font-bold text-maple-black focus:outline-none focus:border-maple-red"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xs text-[11px] text-amber-800 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <ShieldAlert size={14} /> Ghi chú an toàn:
                  </div>
                  <p className="m-0 leading-relaxed">
                    Sau khi đặt lại mật khẩu, user có thể đăng nhập bằng mật khẩu mới ngay lập tức. Hãy cung cấp mật khẩu mới này cho cán bộ được cấp quyền.
                  </p>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setResetUser(null)}
                    className="px-4 py-2 border border-neutral-300 rounded-2xs text-xs font-bold text-neutral-600 hover:bg-neutral-100"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-maple-red hover:bg-red-700 text-white rounded-2xs text-xs font-bold shadow-xs flex items-center gap-1.5"
                  >
                    <Check size={15} /> Xác Nhận Đổi Mật Khẩu
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CREATE NEW USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xs max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-5">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-maple-red rounded-full inline-block" />
                <h3 className="text-base font-display font-extrabold text-maple-black uppercase tracking-wide">
                  Tạo Tài Khoản CMS Mới
                </h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-maple-black">Họ và tên cán bộ:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-medium text-maple-black focus:outline-none focus:border-maple-red"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-maple-black">Email đăng nhập (Username):</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@sunshinemaplebear.edu.vn"
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-mono font-medium text-maple-black focus:outline-none focus:border-maple-red"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-maple-black">Vai trò RBAC (Permission Role):</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as AdminRole)}
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-bold text-maple-black focus:outline-none"
                >
                  <option value="admin">Super Admin (Chủ Đầu Tư / Quyền Cao Nhất)</option>
                  <option value="principal">Ban Giám Hiệu (BGH Academic)</option>
                  <option value="admissions">Phòng Tuyển Sinh & Tư Vấn</option>
                  <option value="marketing">Phòng Marketing & Truyền Thông</option>
                  <option value="teacher">Tổ Giáo Viên Bản Ngữ & VN</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-maple-black">Phòng ban / Bộ phận:</label>
                <input
                  type="text"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  placeholder="Ví dụ: Phòng Tuyển Sinh & Tư Vấn"
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-medium text-maple-black focus:outline-none focus:border-maple-red"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-maple-black">Mật khẩu ban đầu (Password):</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full p-2.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-mono font-medium text-maple-black focus:outline-none focus:border-maple-red"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-2xs text-xs font-bold text-neutral-600 hover:bg-neutral-100"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#151513] hover:bg-maple-red text-white rounded-2xs text-xs font-extrabold shadow-xs flex items-center gap-1.5"
                >
                  <Check size={15} /> Tạo Tài Khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
