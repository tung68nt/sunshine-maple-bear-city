'use client'

import { useState, useEffect } from 'react'
import { Link2, Copy, Check, QrCode, ExternalLink, Users, Share2, Plus, Trash2, Eye, FileSpreadsheet, Search, Download } from 'lucide-react'
import Link from 'next/link'

export interface SavedUtmLink {
  id: string
  name: string
  fullUrl: string
  baseUrl: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm?: string
  utmContent?: string
  leadCount: number
  createdAt: string
}

const initialSavedLinks: SavedUtmLink[] = [
  {
    id: 'utm-001',
    name: 'Facebook Ads - Campaign Open Day Mùa Thu 2026',
    fullUrl: 'https://www.sunshinemaplebear.edu.vn/events/evt-101?utm_source=facebook_ads&utm_medium=cpc&utm_campaign=open_day_aug2026&utm_term=mam_non_quoc_te&utm_content=banner_video_v1',
    baseUrl: 'https://www.sunshinemaplebear.edu.vn/events/evt-101',
    utmSource: 'facebook_ads',
    utmMedium: 'cpc',
    utmCampaign: 'open_day_aug2026',
    utmTerm: 'mam_non_quoc_te',
    utmContent: 'banner_video_v1',
    leadCount: 42,
    createdAt: '2026-08-01'
  },
  {
    id: 'utm-002',
    name: 'Google Search Ads - Từ khóa Trường mầm non Ciputra',
    fullUrl: 'https://www.sunshinemaplebear.edu.vn/forms/form-open-day-2026?utm_source=google_search&utm_medium=cpc&utm_campaign=brand_sunshine_maple_bear&utm_term=truong_mam_non_ciputra',
    baseUrl: 'https://www.sunshinemaplebear.edu.vn/forms/form-open-day-2026',
    utmSource: 'google_search',
    utmMedium: 'cpc',
    utmCampaign: 'brand_sunshine_maple_bear',
    utmTerm: 'truong_mam_non_ciputra',
    leadCount: 28,
    createdAt: '2026-08-03'
  },
  {
    id: 'utm-003',
    name: 'Zalo OA Broadcast - Bản tin Tuyển sinh Tháng 8',
    fullUrl: 'https://www.sunshinemaplebear.edu.vn/tour-booking?utm_source=zalo_oa&utm_medium=organic&utm_campaign=newsletter_august',
    baseUrl: 'https://www.sunshinemaplebear.edu.vn/tour-booking',
    utmSource: 'zalo_oa',
    utmMedium: 'organic',
    utmCampaign: 'newsletter_august',
    leadCount: 15,
    createdAt: '2026-08-05'
  }
]

export default function AdminUtmBuilderPage() {
  const [baseUrl, setBaseUrl] = useState('https://www.sunshinemaplebear.edu.vn/events/evt-101')
  const [linkName, setLinkName] = useState('')
  const [utmSource, setUtmSource] = useState('facebook_ads')
  const [utmMedium, setUtmMedium] = useState('cpc')
  const [utmCampaign, setUtmCampaign] = useState('open_day_aug2026')
  const [utmTerm, setUtmTerm] = useState('mam_non_quoc_te')
  const [utmContent, setUtmContent] = useState('banner_ad_v1')
  
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [savedLinks, setSavedLinks] = useState<SavedUtmLink[]>(initialSavedLinks)
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeQrLink, setActiveQrLink] = useState<SavedUtmLink | null>(null)
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

  useEffect(() => {
    let url = baseUrl.trim()
    if (!url) return

    const params = new URLSearchParams()
    if (utmSource) params.set('utm_source', utmSource.trim())
    if (utmMedium) params.set('utm_medium', utmMedium.trim())
    if (utmCampaign) params.set('utm_campaign', utmCampaign.trim())
    if (utmTerm) params.set('utm_term', utmTerm.trim())
    if (utmContent) params.set('utm_content', utmContent.trim())

    const query = params.toString()
    setGeneratedUrl(query ? `${url}?${query}` : url)
  }, [baseUrl, utmSource, utmMedium, utmCampaign, utmTerm, utmContent])

  const handleSaveUtmLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (!generatedUrl) return

    const newLink: SavedUtmLink = {
      id: `utm-${Date.now()}`,
      name: linkName || `Chiến dịch ${utmCampaign} (${utmSource})`,
      fullUrl: generatedUrl,
      baseUrl: baseUrl,
      utmSource: utmSource,
      utmMedium: utmMedium,
      utmCampaign: utmCampaign,
      utmTerm: utmTerm,
      utmContent: utmContent,
      leadCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setSavedLinks([newLink, ...savedLinks])
    setLinkName('')
  }

  const handleDeleteLink = (id: string) => {
    if (confirm(adminUiLang === 'vi' ? 'Bạn có chắc chắn muốn xóa Link UTM này?' : 'Delete this UTM tracking link?')) {
      setSavedLinks(savedLinks.filter(l => l.id !== id))
    }
  }

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const filteredLinks = savedLinks.filter(l =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.utmSource.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.utmCampaign.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 text-[#1D1D1B] w-full">
      
      {/* Header */}
      <div className="bg-white border border-neutral-200 p-5 shadow-2xs">
        <span className="text-[10px] font-semibold text-maple-red block">
          {adminUiLang === 'vi' ? 'Công cụ Marketing Intelligence' : 'Marketing Intelligence Tools'}
        </span>
        <h2 className="text-xl font-display font-bold text-[#1D1D1B]">
          {adminUiLang === 'vi' ? 'Quản lý & Dựng Link UTM Tracking Chiến dịch Quảng cáo' : 'UTM Link Management & Campaign Builder'}
        </h2>
        <p className="text-xs text-neutral-500 font-light mt-0.5">
          {adminUiLang === 'vi'
            ? 'Tạo mới, lưu trữ, quản lý các link UTM theo từng kênh tiếp thị và theo dõi trực tiếp số lượng Lead thu thập từ từng link.'
            : 'Generate, store, manage campaign tracking links, and measure leads generated per campaign link.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
          
          <div className="border-b border-neutral-200 pb-2.5">
            <span className="text-[10px] font-bold text-maple-gold block">1. TẠO & CẤU HÌNH LINK UTM MỚI</span>
            <h3 className="text-base font-display font-bold text-[#1D1D1B]">Điền thông tin đường dẫn & chiến dịch</h3>
          </div>

          <form onSubmit={handleSaveUtmLink} className="space-y-3.5 text-xs">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Tên gợi nhớ Chiến dịch (Ví dụ: FB Ads - Open Day 2026) *
              </label>
              <input
                type="text"
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
                placeholder="VD: FB Ads - Video Quảng cáo Open Day Mùa Thu..."
                className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Website URL Gốc (Trang Sự kiện hoặc Form) *
              </label>
              <input
                type="url"
                required
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://www.sunshinemaplebear.edu.vn/events/evt-101"
                className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  UTM Source (Nguồn quảng cáo) *
                </label>
                <input
                  type="text"
                  required
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  placeholder="facebook_ads, google_search, zalo_oa..."
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  UTM Medium (Kênh tiếp thị) *
                </label>
                <input
                  type="text"
                  required
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  placeholder="cpc, organic, qr_code, email..."
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                UTM Campaign (Tên chiến dịch) *
              </label>
              <input
                type="text"
                required
                value={utmCampaign}
                onChange={(e) => setUtmCampaign(e.target.value)}
                placeholder="open_day_aug2026, tuition_discount..."
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  UTM Term (Từ khóa đối tượng)
                </label>
                <input
                  type="text"
                  value={utmTerm}
                  onChange={(e) => setUtmTerm(e.target.value)}
                  placeholder="mam_non_quoc_te..."
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  UTM Content (Mẫu quảng cáo)
                </label>
                <input
                  type="text"
                  value={utmContent}
                  onChange={(e) => setUtmContent(e.target.value)}
                  placeholder="banner_video_v1..."
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-neutral-300 font-mono text-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-semibold transition-colors border border-[#1D1D1B] flex items-center justify-center gap-2 rounded-2xs shadow-2xs"
              >
                <Plus size={15} />
                Lưu Link UTM này vào Danh sách Quản lý
              </button>
            </div>
          </form>

        </div>

        {/* Right Column: Output & QR Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#151513] text-white p-5 border border-neutral-800 space-y-4 shadow-2xs rounded-2xs">
            <span className="text-xs font-semibold text-maple-gold flex items-center gap-1.5">
              <Users size={15} className="text-maple-gold" /> KẾT QUẢ URL TRACKING HIỆN TẠI:
            </span>

            <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-2xs font-mono text-xs break-all text-emerald-400">
              {generatedUrl}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleCopyLink(generatedUrl, 'current')}
                className="flex-1 py-2.5 bg-maple-red hover:bg-red-700 text-white font-bold text-xs rounded-2xs shadow-2xs flex items-center justify-center gap-2 transition-all"
              >
                {copiedId === 'current' ? <Check size={16} /> : <Copy size={16} />}
                {copiedId === 'current' ? 'Đã sao chép Link!' : 'Sao chép URL Tracking'}
              </button>

              <a
                href={generatedUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-2xs flex items-center justify-center"
                title="Mở đường dẫn thử nghiệm"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* QR Code Preview */}
          <div className="bg-white border border-neutral-200 p-5 space-y-3 shadow-2xs rounded-2xs text-center">
            <span className="text-xs font-bold text-[#1D1D1B] block">Mã QR Code Tự Động Cho Ấn Phẩm Quảng Cáo</span>
            <p className="text-[11px] text-neutral-500 font-light">Quét mã QR bằng camera điện thoại để mở trực tiếp URL chiến dịch đính kèm UTM Parameters.</p>

            <div className="p-3 bg-white border border-neutral-300 rounded-2xs inline-block mx-auto shadow-2xs">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(generatedUrl || 'https://www.sunshinemaplebear.edu.vn')}`}
                alt="Scannable UTM QR Code"
                className="w-48 h-48 mx-auto object-contain"
              />
            </div>

            <div className="pt-1 space-y-2">
              <a
                href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(generatedUrl || 'https://www.sunshinemaplebear.edu.vn')}`}
                target="_blank"
                rel="noreferrer"
                download={`QR_Campaign_${utmCampaign || 'maplebear'}.png`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-semibold rounded-2xs shadow-2xs transition-all"
              >
                <Download size={14} />
                Tải Mã QR Chất Lượng Cao (600x600 PNG)
              </a>

              <span className="text-[10px] font-mono text-neutral-400 block">Nguồn UTM Source: {utmSource} ({utmCampaign})</span>
            </div>
          </div>

        </div>

      </div>

      {/* TABLE: SAVED UTM LINKS & LEAD RESULTS */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4 shadow-2xs rounded-2xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-3">
          <div>
            <span className="text-[10px] font-bold text-maple-gold block">2. DANH SÁCH & KẾT QUẢ CÁC LINK UTMS ĐÃ TẠO</span>
            <h3 className="text-base font-display font-bold text-[#1D1D1B]">Quản lý danh sách Link UTM & Xem số lượng Lead thu thập</h3>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Tìm kiếm link theo tên chiến dịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FDFBF7] border-b border-neutral-200 text-neutral-600 font-semibold text-xs">
                <th className="py-3 px-4 whitespace-nowrap">Tên Chiến dịch</th>
                <th className="py-3 px-4 whitespace-nowrap">UTM Source / Campaign</th>
                <th className="py-3 px-4">URL Tracking Đầy Đủ</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">Số Lead Thu Được</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Xem Kết Quả & Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredLinks.map((link) => (
                <tr key={link.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#1D1D1B] max-w-xs">
                    <div>{link.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono font-normal">Ngày tạo: {link.createdAt}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-300 text-[10px] font-bold rounded-2xs inline-block mb-1">
                      {link.utmSource}
                    </span>
                    <div className="text-[10px] text-neutral-600 font-mono">{link.utmCampaign}</div>
                  </td>
                  <td className="py-3 px-4 max-w-md">
                    <div className="font-mono text-[10px] text-[#1D1D1B] break-all bg-[#FDFBF7] p-2 border border-neutral-300 rounded-2xs leading-relaxed select-all">
                      {link.fullUrl}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono font-bold text-xs rounded-2xs inline-flex items-center gap-1.5 whitespace-nowrap shadow-2xs">
                      <Users size={12} className="text-emerald-700 flex-shrink-0" />
                      <span>{link.leadCount} Lead</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <Link
                      href={`/admin/forms/form-open-day-2026/responses?utm_source=${link.utmSource}`}
                      className="px-2.5 py-1 bg-maple-red hover:bg-red-700 text-white font-semibold text-xs rounded-2xs inline-flex items-center gap-1 shadow-2xs"
                    >
                      <Eye size={12} /> Xem Lead ({link.leadCount})
                    </Link>

                    <button
                      onClick={() => handleCopyLink(link.fullUrl, link.id)}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-2xs border border-neutral-300 inline-flex items-center gap-1"
                      title="Copy URL"
                    >
                      <Copy size={12} /> {copiedId === link.id ? 'Đã copy!' : 'Copy'}
                    </button>

                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-1.5 bg-neutral-100 hover:bg-red-100 text-neutral-600 hover:text-red-700 border border-neutral-300 rounded-2xs"
                      title="Xóa Link"
                    >
                      <Trash2 size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
