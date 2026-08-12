'use client'

import { FormEvent, useEffect, useState } from 'react'
import { CheckCircle2, Plus, RefreshCw, ShieldCheck, XCircle } from 'lucide-react'

type CmsRole = 'admin' | 'editor' | 'viewer'
type CmsUser = { id: string; email: string; displayName: string; department: string; role: CmsRole; isActive: boolean; lastSignInAt: string | null }
const ROLE_LABEL: Record<CmsRole, string> = { admin: 'Admin', editor: 'Biên tập viên', viewer: 'Chỉ xem' }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<CmsUser[]>([])
  const [showInvite, setShowInvite] = useState(false)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({ email: '', displayName: '', department: '', role: 'editor' as CmsRole })

  const loadUsers = async () => {
    setBusy(true)
    const response = await fetch('/api/admin/users', { cache: 'no-store' })
    const payload = await response.json().catch(() => ({}))
    setBusy(false)
    if (!response.ok) return setMessage(payload.error || 'Không thể tải danh sách tài khoản.')
    setUsers(payload.data || [])
    setMessage('')
  }
  useEffect(() => { void loadUsers() }, [])

  const invite = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage('')
    const response = await fetch('/api/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const payload = await response.json().catch(() => ({})); setBusy(false)
    if (!response.ok) return setMessage(payload.error || 'Không thể gửi lời mời.')
    setShowInvite(false); setForm({ email: '', displayName: '', department: '', role: 'editor' }); setMessage('Đã gửi email mời. Người dùng tự đặt mật khẩu qua liên kết Supabase Auth.'); void loadUsers()
  }

  const update = async (id: string, updateData: Partial<Pick<CmsUser, 'role' | 'isActive'>>) => {
    setBusy(true); setMessage('')
    const response = await fetch('/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...updateData }) })
    const payload = await response.json().catch(() => ({})); setBusy(false)
    if (!response.ok) return setMessage(payload.error || 'Không thể cập nhật tài khoản.')
    await loadUsers()
  }

  return <div className="space-y-6 pb-12">
    <section className="flex flex-col gap-4 rounded-2xs border border-neutral-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
      <div><p className="text-xs font-bold uppercase tracking-wider text-maple-red">Bảo mật & phân quyền</p><h1 className="mt-1 text-2xl font-extrabold text-maple-black">Tài khoản CMS</h1><p className="mt-2 text-sm text-neutral-600">Dữ liệu lấy từ Supabase Auth và hồ sơ RBAC. Không lưu hay hiển thị mật khẩu.</p></div>
      <button onClick={() => setShowInvite(true)} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-2xs bg-maple-red px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60"><Plus size={16}/> Mời người dùng</button>
    </section>
    {message && <p role="status" className="rounded-2xs border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{message}</p>}
    <section className="overflow-x-auto rounded-2xs border border-neutral-200 bg-white shadow-xs"><table className="w-full text-left text-sm"><thead className="bg-[#151513] text-xs uppercase text-white"><tr><th className="p-4">Người dùng</th><th className="p-4">Vai trò</th><th className="p-4">Trạng thái</th><th className="p-4">Đăng nhập gần nhất</th><th className="p-4">Thao tác</th></tr></thead><tbody>{users.map((user) => <tr key={user.id} className="border-t border-neutral-100"><td className="p-4"><strong className="block text-maple-black">{user.displayName || 'Chưa đặt tên'}</strong><span className="text-xs text-neutral-600">{user.email}{user.department ? ` · ${user.department}` : ''}</span></td><td className="p-4"><select aria-label={`Vai trò của ${user.email}`} value={user.role} disabled={busy} onChange={(e) => void update(user.id, { role: e.target.value as CmsRole })} className="rounded border border-neutral-300 p-2 text-xs"><option value="admin">Admin</option><option value="editor">Biên tập viên</option><option value="viewer">Chỉ xem</option></select></td><td className="p-4">{user.isActive ? <span className="inline-flex gap-1 text-emerald-700"><CheckCircle2 size={16}/>Hoạt động</span> : <span className="inline-flex gap-1 text-neutral-500"><XCircle size={16}/>Tạm khóa</span>}</td><td className="p-4 text-xs text-neutral-600">{user.lastSignInAt ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(user.lastSignInAt)) : 'Chưa từng'}</td><td className="p-4"><button onClick={() => void update(user.id, { isActive: !user.isActive })} disabled={busy} className="inline-flex items-center gap-1 rounded border border-neutral-300 px-2 py-1 text-xs font-bold disabled:opacity-60"><RefreshCw size={14}/>{user.isActive ? 'Khóa' : 'Mở khóa'}</button></td></tr>)}</tbody></table>{!busy && users.length === 0 && <p className="p-6 text-sm text-neutral-600">Chưa có tài khoản nào hoặc chưa cấu hình Supabase service role.</p>}</section>
    <section className="rounded-2xs border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950"><p className="flex items-center gap-2 font-bold"><ShieldCheck size={16}/> Mô hình RBAC đang áp dụng</p><p className="mt-1">Admin quản trị người dùng và nội dung; Biên tập viên quản lý nội dung; Chỉ xem chỉ đọc. Mỗi thay đổi được kiểm soát ở API, middleware và RLS.</p></section>
    {showInvite && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"><form onSubmit={invite} className="w-full max-w-md space-y-4 rounded-2xs bg-white p-6 shadow-2xl"><h2 className="text-lg font-extrabold">Mời tài khoản CMS</h2><label className="block text-sm font-bold">Họ tên<input required value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} className="mt-1 w-full rounded border p-2" /></label><label className="block text-sm font-bold">Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded border p-2" /></label><label className="block text-sm font-bold">Phòng ban<input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="mt-1 w-full rounded border p-2" /></label><label className="block text-sm font-bold">Vai trò<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as CmsRole })} className="mt-1 w-full rounded border p-2"><option value="admin">Admin</option><option value="editor">Biên tập viên</option><option value="viewer">Chỉ xem</option></select></label><div className="flex justify-end gap-2"><button type="button" onClick={() => setShowInvite(false)} className="rounded border px-3 py-2 text-sm">Hủy</button><button disabled={busy} className="rounded bg-maple-red px-3 py-2 text-sm font-bold text-white disabled:opacity-60">Gửi lời mời</button></div></form></div>}
  </div>
}
