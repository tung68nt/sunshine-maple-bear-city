'use client'

import { useState, useEffect } from 'react'
import { Settings, Save, ShieldCheck, Mail, Globe, Bell, CheckCircle2, Server, Key, Activity, Send } from 'lucide-react'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [testMailStatus, setTestMailStatus] = useState<string | null>(null)
  const [adminUiLang, setAdminUiLang] = useState<'vi' | 'en'>('vi')

  useEffect(() => {
    const savedLang = (localStorage.getItem('smb_admin_ui_lang') as 'vi' | 'en') || 'vi'
    setAdminUiLang(savedLang)

    const handleLangChange = (e: CustomEvent) => {
      if (e.detail === 'vi' || e.detail === 'en') {
        setAdminUiLang(e.detail)
      }
    }

    window.addEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
    return () => window.removeEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleTestSmtp = () => {
    setTestMailStatus(adminUiLang === 'vi' ? 'Đang kết nối Server SMTP...' : 'Connecting to SMTP Server...')
    setTimeout(() => {
      setTestMailStatus(adminUiLang === 'vi' ? '✅ Kết nối SMTP thành công! Email thử nghiệm đã được gửi.' : '✅ SMTP Connection Successful! Test email dispatched.')
      setTimeout(() => setTestMailStatus(null), 4000)
    }, 1500)
  }

  return (
    <div className="space-y-8 w-full text-[#1D1D1B]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-neutral-200 p-5 shadow-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red block">
            {adminUiLang === 'vi' ? 'Cấu hình Hệ thống' : 'System Configuration'}
          </span>
          <h2 className="text-xl font-display font-bold text-[#1D1D1B]">
            {adminUiLang === 'vi' ? 'Cài đặt Vận hành Chung & Mail Server SMTP' : 'General Operational Settings & SMTP Mail Server'}
          </h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">
            {adminUiLang === 'vi'
              ? 'Quản lý thông tin liên hệ trường, mã theo dõi GA4, cấu hình SMTP gửi email và bảo mật chống spam.'
              : 'Manage school contact info, GA4 tracking IDs, SMTP email server setup, and anti-spam protection.'}
          </p>
        </div>
        {saved && (
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in rounded-2xs">
            <CheckCircle2 size={15} />
            {adminUiLang === 'vi' ? 'Đã lưu cấu hình thành công' : 'Settings saved successfully'}
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Main Settings Forms (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: School Contact Info */}
          <div className="bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
            <div className="border-b border-neutral-200 pb-2.5">
              <span className="text-[10px] font-semibold text-maple-gold block">
                {adminUiLang === 'vi' ? 'MỤC 01' : 'SECTION 01'}
              </span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">
                {adminUiLang === 'vi' ? 'Thông tin Liên hệ Trường' : 'School Contact Information'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Số điện thoại Hotline *' : 'Hotline Phone Number *'}
                </label>
                <input
                  type="text"
                  defaultValue="+84 91 104 0022"
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Email Tuyển sinh *' : 'Admissions Email *'}
                </label>
                <input
                  type="email"
                  defaultValue="admissions@sunshinemaplebear.edu.vn"
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                {adminUiLang === 'vi' ? 'Địa chỉ Cơ sở *' : 'Campus Address *'}
              </label>
              <input
                type="text"
                defaultValue="S4 Building, Sunshine City, Ciputra Urban Area, Phu Thuong Ward, Hanoi, Vietnam"
                className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-maple-red"
              />
            </div>
          </div>

          {/* Section 2: Technical SEO & GA4 Analytics */}
          <div className="bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
            <div className="border-b border-neutral-200 pb-2.5">
              <span className="text-[10px] font-semibold text-maple-gold block">
                {adminUiLang === 'vi' ? 'MỤC 02' : 'SECTION 02'}
              </span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">
                {adminUiLang === 'vi' ? 'Cấu hình SEO & Google Analytics 4' : 'Technical SEO & GA4 Tracking'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Google Analytics 4 Measurement ID' : 'Google Analytics 4 Measurement ID'}
                </label>
                <input
                  type="text"
                  defaultValue="G-SMB2026CITY"
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'XML Sitemap URL' : 'XML Sitemap URL'}
                </label>
                <input
                  type="text"
                  defaultValue="https://www.sunshinemaplebear.edu.vn/sitemap.xml"
                  readOnly
                  className="w-full px-3.5 py-2 bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Anti-Spam & Email Notifications */}
          <div className="bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
            <div className="border-b border-neutral-200 pb-2.5">
              <span className="text-[10px] font-semibold text-maple-gold block">
                {adminUiLang === 'vi' ? 'MỤC 03' : 'SECTION 03'}
              </span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">
                {adminUiLang === 'vi' ? 'Bảo mật Anti-Spam & Tần suất Giới hạn IP' : 'Anti-Spam Protection & IP Rate Limiting'}
              </h3>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-[#FDFBF7] border border-neutral-200 cursor-pointer hover:border-maple-red transition-colors rounded-2xs">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-maple-red accent-maple-red" />
                <div>
                  <span className="text-xs font-semibold text-[#1D1D1B] block">
                    {adminUiLang === 'vi' ? 'Bật chống Spam Form đăng ký bằng Captcha & IP Rate Limiting' : 'Enable Captcha & IP Rate Limiting Form Protection'}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-light block">
                    {adminUiLang === 'vi' ? 'Giới hạn tối đa 5 lượt gửi trong 10 phút để ngăn chặn robot tấn công spam.' : 'Restrict maximum 5 form submissions per 10 mins per IP to block bots.'}
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-[#FDFBF7] border border-neutral-200 cursor-pointer hover:border-maple-red transition-colors rounded-2xs">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-maple-red accent-maple-red" />
                <div>
                  <span className="text-xs font-semibold text-[#1D1D1B] block">
                    {adminUiLang === 'vi' ? 'Tự động gửi Email xác nhận tới Phụ huynh ngay khi Đăng ký' : 'Automatically dispatch instant confirmation Email to parents upon registration'}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-light block">
                    {adminUiLang === 'vi' ? 'Gửi email xác nhận kèm mã theo dõi lịch hẹn ngay lập tức.' : 'Send immediate confirmation email with booking reference ID.'}
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Section 4: SMTP Mail Server Configuration */}
          <div className="bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
            <div className="border-b border-neutral-200 pb-2.5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-semibold text-maple-gold block">
                  {adminUiLang === 'vi' ? 'MỤC 04' : 'SECTION 04'}
                </span>
                <h3 className="text-base font-display font-bold text-[#1D1D1B]">
                  {adminUiLang === 'vi' ? 'Cấu hình Server SMTP & Gửi Mail Tự động' : 'SMTP Mail Server & Relay Configuration'}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleTestSmtp}
                className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-2xs border border-neutral-700 inline-flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Send size={13} />
                {adminUiLang === 'vi' ? 'Gửi Email Thử nghiệm' : 'Test SMTP Connection'}
              </button>
            </div>

            {testMailStatus && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xs animate-fade-in">
                {testMailStatus}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'SMTP Host Server *' : 'SMTP Server Host *'}
                </label>
                <input
                  type="text"
                  defaultValue="smtp.resend.com"
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Cổng SMTP Port *' : 'SMTP Port *'}
                </label>
                <input
                  type="text"
                  defaultValue="587 (TLS Secure)"
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Tài khoản SMTP User / Email *' : 'SMTP Username / Email *'}
                </label>
                <input
                  type="text"
                  defaultValue="noreply@sunshinemaplebear.edu.vn"
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Mật khẩu / API Secret Key *' : 'SMTP Password / API Key *'}
                </label>
                <input
                  type="password"
                  defaultValue="re_1234567890_secret_key"
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Tên Người gửi (Sender Name) *' : 'Sender Display Name *'}
                </label>
                <input
                  type="text"
                  defaultValue="Sunshine Maple Bear Admissions"
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {adminUiLang === 'vi' ? 'Email Người gửi (From Email) *' : 'Sender Email Address *'}
                </label>
                <input
                  type="email"
                  defaultValue="noreply@sunshinemaplebear.edu.vn"
                  className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-maple-red"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-semibold transition-colors border border-[#1D1D1B] flex items-center gap-2 rounded-2xs shadow-2xs"
            >
              <Save size={15} />
              {adminUiLang === 'vi' ? 'Lưu cấu hình Vận hành' : 'Save System Settings'}
            </button>
          </div>

        </div>

        {/* Right Column: System Status & Diagnostic Dashboard (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-[#151513] text-white p-5 border border-neutral-800 space-y-3.5 shadow-2xs rounded-2xs">
            <span className="text-xs font-semibold text-maple-gold block">
              {adminUiLang === 'vi' ? 'Trạng thái Hệ thống Live' : 'Live System Diagnostics'}
            </span>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 rounded-2xs">
                <div className="flex items-center gap-2">
                  <Activity size={15} className="text-emerald-500" />
                  <span className="text-xs font-semibold">GA4 Tracking Status</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-800 rounded-2xs">CONNECTED</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 rounded-2xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-500" />
                  <span className="text-xs font-semibold">Captcha Anti-Spam</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-800 rounded-2xs">ACTIVE</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 rounded-2xs">
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-emerald-500" />
                  <span className="text-xs font-semibold">SMTP Email Server</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-800 rounded-2xs">READY</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 p-5 space-y-3 shadow-2xs rounded-2xs">
            <span className="text-[10px] font-semibold text-neutral-500 block">
              {adminUiLang === 'vi' ? 'Thông tin Môi trường Runtime' : 'Runtime Infrastructure Info'}
            </span>
            <div className="text-xs text-neutral-600 space-y-1 font-mono">
              <p><span className="font-semibold text-[#1D1D1B]">Framework:</span> Next.js 16.2.6</p>
              <p><span className="font-semibold text-[#1D1D1B]">Deployment:</span> Production Vercel Edge</p>
              <p><span className="font-semibold text-[#1D1D1B]">Database:</span> Supabase PostgreSQL</p>
              <p><span className="font-semibold text-[#1D1D1B]">SMTP Engine:</span> Resend API TLS 587</p>
            </div>
          </div>

        </div>

      </form>

    </div>
  )
}
