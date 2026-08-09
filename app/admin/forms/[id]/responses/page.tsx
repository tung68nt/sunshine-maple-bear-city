'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Search, Download, Filter, ArrowLeft, Calendar, MapPin, Globe, Shield, User, FileSpreadsheet, Eye, X, Zap } from 'lucide-react'
import Link from 'next/link'

interface FormResponseLead {
  id: string
  submittedAt: string
  isPartial?: boolean
  answers: Record<string, string>
  utm: {
    utm_source: string
    utm_medium: string
    utm_campaign: string
    utm_term?: string
    utm_content?: string
  }
  metadata: {
    ip: string
    userAgent: string
    referrer: string
    city: string
    country: string
  }
}

function generateMockLeads(count: number, prefix: string, eventTitle: string): FormResponseLead[] {
  const sources = ['facebook_ads', 'google_search', 'zalo_oa', 'direct', 'referral']
  const names = [
    'Nguyễn Hoàng Long', 'Trần Phương Thảo', 'Phạm Quốc Cường', 'Lê Minh Tuấn', 'Vũ Thị Thanh',
    'Hoàng Bảo Ngọc', 'Đỗ Quang Anh', 'Bùi Khánh Linh', 'Đặng Nhật Minh', 'Phùng Thu Hà',
    'Nguyễn Bảo Nam', 'Trịnh Thị Tuệ Lâm', 'Hoàng Nam Khánh', 'Vũ Minh Hoàng', 'Đỗ Thị Hồng',
    'Phạm Đức Anh', 'Nguyễn Bích Phương', 'Trần Quốc Bảo', 'Lê Hoàng Anh', 'Đặng Gia Huy'
  ]
  const times = ['08:30 AM - 10:00 AM', '10:00 AM - 11:30 AM', '02:00 PM - 03:30 PM', '03:30 PM - 05:00 PM']

  return Array.from({ length: count }, (_, i) => {
    const num = i + 1
    const baseName = names[i % names.length]
    const name = i >= names.length ? `${baseName} (${Math.floor(i / names.length) + 1})` : baseName
    const source = sources[i % sources.length]
    
    return {
      id: `${prefix}-${100 + num}`,
      submittedAt: `2026-08-${String(Math.max(1, 8 - Math.floor(i / 10))).padStart(2, '0')} ${String(8 + (i % 10)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:${String((i * 13) % 60).padStart(2, '0')}`,
      isPartial: i % 12 === 0,
      answers: {
        'Họ và tên Phụ huynh': name,
        'Số điện thoại Zalo liên hệ': `09${Math.floor(10000000 + (i * 1234567) % 89999999)}`,
        'Địa chỉ Email': `lead.${prefix}.${num}@gmail.com`,
        'Họ tên và Ngày sinh bé': `Bé Nguyễn Bảo An (${2022 + (i % 3)}/0${(i % 8) + 1}/15)`,
        'Khung giờ tham quan mong muốn': times[i % times.length],
        'Ghi chú & Câu hỏi tư vấn': `Tư vấn thông tin tuyển sinh sự kiện ${eventTitle} và ưu đãi học phí.`
      },
      utm: {
        utm_source: source,
        utm_medium: source === 'facebook_ads' || source === 'google_search' ? 'cpc' : 'organic',
        utm_campaign: `campaign_${prefix}_2026`,
        utm_term: 'mam_non_canada'
      },
      metadata: {
        ip: `113.190.${(i * 17) % 255}.${(i * 23) % 255}`,
        userAgent: i % 2 === 0 ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5) Mobile/15E148' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/127.0.0.0',
        referrer: source === 'facebook_ads' ? 'https://m.facebook.com/' : source === 'google_search' ? 'https://www.google.com/' : 'Direct',
        city: 'Hanoi',
        country: 'Vietnam'
      }
    }
  })
}

export default function FormResponsesPage() {
  const params = useParams()
  const rawFormId = (params?.id as string) || 'evt-form-evt-101'
  const [responses, setResponses] = useState<FormResponseLead[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [utmSourceFilter, setUtmSourceFilter] = useState('ALL')
  const [activeLead, setActiveLead] = useState<FormResponseLead | null>(null)
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

  // Dynamic synchronized data mapping matching event counts
  useEffect(() => {
    let dataset: FormResponseLead[] = []

    if (rawFormId.includes('102')) {
      dataset = generateMockLeads(28, 'resp-102', 'Workshop Phụ Huynh Kỷ Luật Tích Cực')
    } else if (rawFormId.includes('103')) {
      dataset = generateMockLeads(89, 'resp-103', 'Lễ Hội Mùa Thu Autumn Harvest Festival')
    } else if (rawFormId.includes('survey')) {
      dataset = generateMockLeads(5, 'survey', 'Khảo Sát Phụ Huynh Học Kỳ 1')
    } else if (rawFormId.includes('contact') || rawFormId.includes('admissions')) {
      dataset = generateMockLeads(15, 'contact', 'Tư Vấn Tuyển Sinh Sunshine Maple Bear')
    } else {
      // Default to evt-101 (Open Day 2026) -> 42 Leads synced 100%
      dataset = generateMockLeads(42, 'resp-101', 'Open Day 2026 Canada')
    }

    // Append any extra live user submissions from localStorage
    try {
      const storedSubmissions = localStorage.getItem('smb_form_responses')
      if (storedSubmissions) {
        const parsed: FormResponseLead[] = JSON.parse(storedSubmissions)
        const relevant = parsed.filter(p => p.id.includes(rawFormId) || rawFormId.includes('101'))
        dataset = [...relevant, ...dataset]
      }
    } catch (e) {}

    setResponses(dataset)
  }, [rawFormId])

  const filtered = responses.filter((r) => {
    const jsonStr = JSON.stringify(r).toLowerCase()
    const matchesSearch = jsonStr.includes(searchTerm.toLowerCase())
    const matchesUtm = utmSourceFilter === 'ALL' || r.utm.utm_source === utmSourceFilter
    return matchesSearch && matchesUtm
  })

  const exportToCsv = () => {
    if (responses.length === 0) return

    const headers = [
      'Response ID',
      'Submitted At',
      'Is Partial Draft Lead',
      'Parent Name / Phone / Answers',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Term',
      'Client IP',
      'City/Country',
      'User Agent',
      'Referrer'
    ]

    const rows = filtered.map((r) => [
      r.id,
      r.submittedAt,
      r.isPartial ? 'YES (Partial Lead)' : 'NO (Full Submit)',
      `"${JSON.stringify(r.answers).replace(/"/g, '""')}"`,
      r.utm.utm_source,
      r.utm.utm_medium,
      r.utm.utm_campaign,
      r.utm.utm_term || '',
      r.metadata.ip,
      `"${r.metadata.city}, ${r.metadata.country}"`,
      `"${r.metadata.userAgent.replace(/"/g, '""')}"`,
      `"${r.metadata.referrer}"`
    ])

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `lead_responses_${rawFormId}_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4 text-[#1D1D1B] w-full font-body">
      
      {/* Header Bar */}
      <div className="bg-white border border-neutral-200/80 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xs rounded-2xs">
        <div className="space-y-1">
          <Link
            href="/admin/forms"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-2xs border border-neutral-300 transition-colors mb-1"
          >
            <ArrowLeft size={13} />
            <span>Quay lại Danh sách Form</span>
          </Link>
          <div className="text-[10px] font-mono font-bold text-maple-red uppercase tracking-wider">
            MÃ FORM: {rawFormId.toUpperCase()}
          </div>
          <h2 className="text-xl font-display font-extrabold text-[#1D1D1B]">
            Dữ Liệu Lead & Phản Hồi Form (Form Responses)
          </h2>
          <p className="text-xs text-neutral-500 font-light">
            Theo dõi chi tiết danh sách Lead đăng ký, thông số UTM Marketing, IP truy cập và lead lưu tạm thời gian thực.
          </p>
        </div>

        <button
          onClick={exportToCsv}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all border border-emerald-800 flex items-center gap-1.5 rounded-2xs shadow-2xs whitespace-nowrap"
        >
          <FileSpreadsheet size={15} />
          <span>Xuất Báo Cáo Excel / CSV</span>
        </button>
      </div>

      {/* Synchronized Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-neutral-200/80 p-4 rounded-2xs shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
            TỔNG SỐ LƯỢT PHẢN HỒI
          </span>
          <div className="text-2xl font-display font-black text-[#1D1D1B]">
            {responses.length} Lead
          </div>
        </div>

        <div className="bg-white border border-neutral-200/80 p-4 rounded-2xs shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
            NGUỒN TOP UTM SOURCE
          </span>
          <div className="text-2xl font-display font-black text-blue-600">
            FACEBOOK_ADS
          </div>
        </div>

        <div className="bg-white border border-neutral-200/80 p-4 rounded-2xs shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
            THIẾT BỊ TRUY CẬP
          </span>
          <div className="text-2xl font-display font-black text-emerald-700">
            68% Mobile
          </div>
        </div>

        <div className="bg-white border border-neutral-200/80 p-4 rounded-2xs shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
            TỶ LỆ XÁC THỰC SĐТ
          </span>
          <div className="text-2xl font-display font-black text-maple-red">
            100% Verified
          </div>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-neutral-200/80 p-3.5 flex flex-col sm:flex-row gap-3 shadow-2xs rounded-2xs">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên phụ huynh, SĐT, UTM campaign hoặc IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs focus:outline-none focus:border-maple-red font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={15} className="text-neutral-400" />
          <select
            value={utmSourceFilter}
            onChange={(e) => setUtmSourceFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold text-[#1D1D1B]"
          >
            <option value="ALL">Tất cả Nguồn UTM (All Sources)</option>
            <option value="facebook_ads">facebook_ads (Facebook Campaign)</option>
            <option value="google_search">google_search (Google Ads)</option>
            <option value="zalo_oa">zalo_oa (Zalo Official Account)</option>
            <option value="direct">direct (Truy cập Trực tiếp)</option>
          </select>
        </div>
      </div>

      {/* Lead Responses Table */}
      <div className="bg-white border border-neutral-200/80 overflow-x-auto shadow-2xs rounded-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#FAF9F5] border-b border-neutral-200/80 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-3.5 whitespace-nowrap">Mã Response / Ngày giờ</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Thông tin Phụ huynh / SĐT</th>
              <th className="py-2.5 px-3.5">Dữ liệu Form trả lời</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Nguồn UTM Marketing</th>
              <th className="py-2.5 px-3.5 whitespace-nowrap">Địa chỉ IP & Vị trí</th>
              <th className="py-2.5 px-3.5 text-right whitespace-nowrap">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((resp) => {
              const name = resp.answers['Họ và tên Phụ huynh'] || resp.answers['Họ tên Phụ huynh'] || 'Phụ huynh'
              const phone = resp.answers['Số điện thoại Zalo liên hệ'] || resp.answers['Số điện thoại Zalo'] || resp.answers['Số điện thoại liên hệ'] || '---'
              const email = resp.answers['Địa chỉ Email'] || resp.answers['Email'] || '---'
              const childInfo = resp.answers['Họ tên và Ngày sinh bé'] || resp.answers['Độ tuổi của bé'] || ''

              return (
                <tr key={resp.id} className="hover:bg-[#FDFBF7]/80 transition-colors">
                  
                  {/* Col 1: ID & Date */}
                  <td className="py-2.5 px-3.5 font-mono whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-maple-red">{resp.id}</span>
                      {resp.isPartial && (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-bold rounded-2xs">
                          Lưu tạm
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{resp.submittedAt}</div>
                  </td>

                  {/* Col 2: Parent Name & Phone */}
                  <td className="py-2.5 px-3.5 whitespace-nowrap">
                    <div className="font-bold text-[#1D1D1B] text-xs">{name}</div>
                    <div className="font-mono text-xs font-semibold text-neutral-600 mt-0.5">{phone}</div>
                  </td>

                  {/* Col 3: Form Answers */}
                  <td className="py-2.5 px-3.5 space-y-0.5">
                    <div className="text-[11px] text-neutral-600">
                      <strong className="text-neutral-800">Địa chỉ Email:</strong> {email}
                    </div>
                    {childInfo && (
                      <div className="text-[11px] text-neutral-600">
                        <strong className="text-neutral-800">Thông tin bé:</strong> {childInfo}
                      </div>
                    )}
                    {resp.answers['Khung giờ tham quan mong muốn'] && (
                      <div className="text-[11px] text-neutral-600">
                        <strong className="text-neutral-800">Khung giờ:</strong> {resp.answers['Khung giờ tham quan mong muốn']}
                      </div>
                    )}
                  </td>

                  {/* Col 4: UTM Source */}
                  <td className="py-2.5 px-3.5 font-mono whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold rounded-2xs inline-block">
                      {resp.utm.utm_source}
                    </span>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{resp.utm.utm_campaign}</div>
                  </td>

                  {/* Col 5: IP Metadata */}
                  <td className="py-2.5 px-3.5 font-mono text-[11px] whitespace-nowrap">
                    <div className="font-semibold text-neutral-800">{resp.metadata.ip}</div>
                    <div className="text-[10px] text-neutral-400">{resp.metadata.city}, {resp.metadata.country}</div>
                  </td>

                  {/* Col 6: Actions */}
                  <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => setActiveLead(resp)}
                      className="px-2.5 py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-bold rounded-2xs shadow-2xs inline-flex items-center gap-1 transition-all"
                    >
                      <Eye size={12} /> Xem Đầy Đủ
                    </button>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* LEAD DETAIL MODAL */}
      {activeLead && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-neutral-300 rounded-2xs max-w-xl w-full p-6 space-y-4 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveLead(null)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black border border-neutral-300 rounded-2xs"
            >
              <X size={16} />
            </button>

            <div className="border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-maple-red uppercase">MÃ RECORD: {activeLead.id}</span>
                {activeLead.isPartial && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold rounded-2xs">
                    Partial Lead (Auto-Saved Draft)
                  </span>
                )}
              </div>
              <h3 className="text-lg font-display font-bold text-[#1D1D1B]">Chi Tiết Thông Tin Phụ Huynh</h3>
              <p className="text-xs text-neutral-500">Thời gian gửi: {activeLead.submittedAt}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#FDFBF7] p-4 border border-neutral-200 rounded-2xs space-y-2">
                <h4 className="font-bold text-[#1D1D1B] border-b border-neutral-200 pb-1 uppercase tracking-wider text-[10px] text-neutral-500">
                  Câu Trả Lời Trong Form
                </h4>
                {Object.entries(activeLead.answers).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-neutral-100 last:border-0">
                    <span className="font-semibold text-neutral-600">{key}:</span>
                    <span className="font-bold text-[#1D1D1B] text-right">{val}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50/60 p-4 border border-blue-200 rounded-2xs space-y-2">
                <h4 className="font-bold text-blue-900 border-b border-blue-200 pb-1 uppercase tracking-wider text-[10px]">
                  Thông Số Marketing (UTM Tracking)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>Source: <strong className="text-blue-800">{activeLead.utm.utm_source}</strong></div>
                  <div>Medium: <strong>{activeLead.utm.utm_medium}</strong></div>
                  <div>Campaign: <strong>{activeLead.utm.utm_campaign}</strong></div>
                  <div>Term: <strong>{activeLead.utm.utm_term || 'none'}</strong></div>
                </div>
              </div>

              <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-2xs space-y-1 text-[11px] font-mono">
                <h4 className="font-bold text-neutral-700 border-b border-neutral-200 pb-1 uppercase tracking-wider text-[10px]">
                  Metadata Thiết Bị Truy Cập
                </h4>
                <p>Client IP: <strong>{activeLead.metadata.ip}</strong> ({activeLead.metadata.city}, {activeLead.metadata.country})</p>
                <p>User Agent: <span className="text-neutral-500">{activeLead.metadata.userAgent}</span></p>
                <p>Referrer: <span className="text-neutral-500">{activeLead.metadata.referrer}</span></p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveLead(null)}
                className="px-4 py-2 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-bold rounded-2xs"
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
