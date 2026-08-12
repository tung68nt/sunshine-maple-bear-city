'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Database,
  Download,
  FileCheck2,
  Filter,
  Gauge,
  Info,
  Layers3,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const sectors = [
  { name: 'Nông, lâm nghiệp, thủy sản', short: 'Nông nghiệp', value: 5652.25, color: '#22B8A7' },
  { name: 'Công nghiệp', short: 'Công nghiệp', value: 5907.11, color: '#3276E8' },
  { name: 'Xây dựng', short: 'Xây dựng', value: 2157.82, color: '#F0B429' },
  { name: 'Dịch vụ', short: 'Dịch vụ', value: 9552.20, color: '#8B5CF6' },
]

const trend = [
  { period: 'Q1/2025', grdp: 46568.22, growth: 7.28 },
  { period: 'Q2/2025', grdp: 48231.10, growth: 7.64 },
  { period: 'Q3/2025', grdp: 50120.80, growth: 7.91 },
  { period: 'Q4/2025', grdp: 51784.60, growth: 8.12 },
]

const tableRows = [
  { code: 'GRDP.TOTAL.HH', name: 'Tổng sản phẩm trên địa bàn (GRDP)', group: 'Kết quả', value: '46.568,22', unit: 'Tỷ đồng', source: 'Cục Thống kê', status: 'Đã phê duyệt' },
  { code: 'GRDP.AGRI.HH', name: 'Nông, lâm nghiệp, thủy sản', group: 'Theo ngành', value: '5.652,25', unit: 'Tỷ đồng', source: 'Cục Thống kê + Sở chuyên ngành', status: 'Đã phê duyệt' },
  { code: 'GRDP.IND.HH', name: 'Công nghiệp', group: 'Theo ngành', value: '5.907,11', unit: 'Tỷ đồng', source: 'Cục Thống kê + Sở Công Thương', status: 'Đã phê duyệt' },
  { code: 'GRDP.TAX.NET', name: 'Thuế nhập khẩu, sản phẩm trừ trợ cấp sản phẩm', group: 'Điều chỉnh', value: '1.736,17', unit: 'Tỷ đồng', source: 'Thuế / Hải quan (dự kiến)', status: 'Cần tách riêng' },
  { code: 'GO.*', name: 'Giá trị sản xuất theo ngành (GO)', group: 'Đầu vào', value: '—', unit: 'Tỷ đồng', source: 'Cục Thống kê', status: 'Cần kết nối' },
  { code: 'IC.*', name: 'Chi phí trung gian theo ngành (IC)', group: 'Đầu vào', value: '—', unit: 'Tỷ đồng', source: 'Cục Thống kê', status: 'Cần kết nối' },
]

const fmt = (value: number) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(value)

export default function GRDPDemoPage() {
  const [period, setPeriod] = useState('Quý I/2025')
  const [price, setPrice] = useState('Giá hiện hành')
  const [sector, setSector] = useState('Tất cả ngành')
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'overview' | 'lineage' | 'catalog'>('overview')

  const filteredRows = useMemo(() => tableRows.filter((row) => `${row.code} ${row.name} ${row.group}`.toLowerCase().includes(query.toLowerCase())), [query])
  const total = sectors.reduce((sum, item) => sum + item.value, 0)
  const selectedSector = sector === 'Tất cả ngành' ? null : sectors.find((item) => item.short === sector)

  return (
    <main className="min-h-screen bg-[#F4F7FB] text-[#172B4D]">
      <header className="sticky top-0 z-30 border-b border-[#DCE4F0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123B76] text-white shadow-sm"><Gauge size={22} /></div>
            <div><div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2B7EEA]">IOC QUẢNG TRỊ · DEMO</div><h1 className="text-xl font-bold text-[#123B76]">Quản trị GRDP cấp tỉnh</h1></div>
          </div>
          <div className="hidden items-center gap-3 md:flex"><span className="rounded-full border border-[#F4C95D] bg-[#FFF7DF] px-3 py-1.5 text-xs font-semibold text-[#946200]">Dữ liệu minh họa · Chưa phải số liệu công bố</span><button className="flex items-center gap-2 rounded-lg border border-[#DCE4F0] bg-white px-3 py-2 text-sm font-semibold text-[#34506F]"><Download size={16} /> Xuất báo cáo</button></div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] gap-6 px-6 py-6">
        <aside className="hidden w-56 shrink-0 rounded-2xl border border-[#DCE4F0] bg-white p-3 lg:block">
          <div className="mb-4 px-3 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8292A9]">Mô-đun điều hành</div>
          {([
            ['Tổng quan GRDP', BarChart3, 'overview'], ['Truy vết dữ liệu', Database, 'lineage'], ['Danh mục chỉ tiêu', Layers3, 'catalog'],
          ] as const).map(([label, Icon, id]) => <button key={id} onClick={() => setActiveTab(id as typeof activeTab)} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeTab === id ? 'bg-[#EAF2FF] text-[#1D70D6]' : 'text-[#5C6F88] hover:bg-[#F5F8FC]'}`}><Icon size={17} />{label}</button>)}
          <div className="mt-8 rounded-xl bg-[#F7FAFD] p-3 text-xs leading-5 text-[#6B7C93]"><ShieldCheck size={17} className="mb-2 text-[#22A690]" /><strong className="block text-[#284665]">Nguyên tắc dữ liệu</strong>IOC hiển thị và truy vết số liệu đã được cơ quan chuyên môn phê duyệt.</div>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><div className="mb-1 text-sm font-semibold text-[#64809F]">Bảng điều hành · {period}</div><h2 className="text-3xl font-bold tracking-tight text-[#123B76]">Bức tranh GRDP Quảng Trị</h2><p className="mt-1 text-sm text-[#71829A]">Từ kết quả công bố đến dữ liệu đầu vào có thể kiểm chứng.</p></div><div className="flex items-center gap-2 rounded-lg border border-[#DCE4F0] bg-white px-3 py-2 text-xs text-[#60738C]"><CheckCircle2 size={15} className="text-[#17A787]" /> Cập nhật mô phỏng: 31/12/2025</div></div>

          <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ['Quy mô GRDP', '46.568,22', 'Tỷ đồng', '+7,28%', 'Tăng trưởng thực'], ['Tốc độ tăng', '7,28%', 'So với cùng kỳ', '+0,64 điểm', 'So với quý trước'], ['Ngành đóng góp lớn nhất', selectedSector?.short ?? 'Dịch vụ', 'VA giá hiện hành', '20,5%', 'Tỷ trọng mô phỏng'], ['Cảnh báo dữ liệu', '3', 'Điểm cần xử lý', '1 nghiêm trọng', 'Tách thuế/trợ cấp'],
            ].map(([label, value, unit, delta, foot], i) => <div key={label} className="rounded-2xl border border-[#DCE4F0] bg-white p-5 shadow-[0_5px_16px_rgba(33,68,112,0.04)]"><div className="mb-3 flex items-center justify-between text-xs font-semibold text-[#71829A]"><span>{label}</span><span className={`rounded-full px-2 py-1 ${i === 3 ? 'bg-[#FFF0E9] text-[#C45C2A]' : 'bg-[#EAF8F4] text-[#128D75]'}`}>{delta}</span></div><div className="text-2xl font-bold text-[#123B76]">{value}</div><div className="mt-1 text-xs text-[#8292A9]">{unit} · {foot}</div></div>)}
          </div>

          <div className="mb-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
            <div className="rounded-2xl border border-[#DCE4F0] bg-white p-5"><div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold text-[#213F67]">Xu hướng GRDP theo kỳ</h3><p className="text-xs text-[#8393A8]">Giá hiện hành · Tỷ đồng</p></div><button className="flex items-center gap-1 text-xs font-semibold text-[#4E6B8D]">2025 <ChevronDown size={14} /></button></div><div className="h-[250px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend} margin={{ left: 4, right: 10, top: 10, bottom: 0 }}><CartesianGrid stroke="#EDF1F6" vertical={false} /><XAxis dataKey="period" tick={{ fontSize: 11, fill: '#8292A9' }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: '#8292A9' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} /><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DCE4F0', boxShadow: '0 8px 20px rgba(24,50,77,.08)' }} formatter={(v: number) => [`${fmt(v)} tỷ đồng`, 'GRDP']} /><Line type="monotone" dataKey="grdp" stroke="#2677E5" strokeWidth={3} dot={{ r: 4, fill: '#2677E5', strokeWidth: 3, stroke: '#fff' }} /></LineChart></ResponsiveContainer></div></div>
            <div className="rounded-2xl border border-[#DCE4F0] bg-white p-5"><div className="mb-2"><h3 className="font-bold text-[#213F67]">Cơ cấu VA theo ngành</h3><p className="text-xs text-[#8393A8]">Giá hiện hành · Quý I/2025</p></div><div className="h-[195px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={sectors} dataKey="value" nameKey="short" cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3}>{sectors.map((entry) => <Cell key={entry.short} fill={entry.color} />)}</Pie><Tooltip formatter={(v: number) => [`${fmt(v)} tỷ đồng`, 'VA']} /></PieChart></ResponsiveContainer></div><div className="grid grid-cols-2 gap-2 text-xs">{sectors.map((item) => <div key={item.short} className="flex items-center gap-2 text-[#60738C]"><span className="h-2 w-2 rounded-full" style={{ background: item.color }} />{item.short}<strong className="ml-auto text-[#2C4C70]">{Math.round(item.value / total * 100)}%</strong></div>)}</div></div>
          </div>

          <div className="mb-5 rounded-2xl border border-[#DCE4F0] bg-white p-5"><div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h3 className="font-bold text-[#213F67]">Bộ lọc và danh mục chỉ tiêu</h3><p className="text-xs text-[#8393A8]">Mỗi giá trị đi kèm loại giá, kỳ, nguồn và trạng thái.</p></div><div className="flex flex-wrap gap-2"><label className="relative"><SlidersHorizontal size={14} className="absolute left-3 top-2.5 text-[#8292A9]" /><select value={period} onChange={(e) => setPeriod(e.target.value)} className="appearance-none rounded-lg border border-[#DCE4F0] bg-[#FBFCFE] py-2 pl-9 pr-8 text-xs font-semibold text-[#4A6380]"><option>Quý I/2025</option><option>Quý II/2025</option><option>Quý III/2025</option><option>Quý IV/2025</option></select></label><select value={price} onChange={(e) => setPrice(e.target.value)} className="rounded-lg border border-[#DCE4F0] bg-[#FBFCFE] px-3 py-2 text-xs font-semibold text-[#4A6380]"><option>Giá hiện hành</option><option>Giá so sánh 2010</option></select><select value={sector} onChange={(e) => setSector(e.target.value)} className="rounded-lg border border-[#DCE4F0] bg-[#FBFCFE] px-3 py-2 text-xs font-semibold text-[#4A6380]"><option>Tất cả ngành</option>{sectors.map((item) => <option key={item.short}>{item.short}</option>)}</select></div></div><div className="mb-4 flex items-center gap-3"><div className="relative flex-1"><Search size={16} className="absolute left-3 top-2.5 text-[#91A0B3]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm theo mã hoặc tên chỉ tiêu..." className="w-full rounded-lg border border-[#DCE4F0] bg-[#FBFCFE] py-2 pl-9 pr-3 text-sm outline-none ring-[#2677E5] focus:ring-2" /></div><button onClick={() => { setQuery(''); setPeriod('Quý I/2025'); setPrice('Giá hiện hành'); setSector('Tất cả ngành') }} className="flex items-center gap-2 rounded-lg border border-[#DCE4F0] px-3 py-2 text-xs font-semibold text-[#5C6F88]"><RefreshCw size={14} /> Đặt lại</button></div><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-xs"><thead><tr className="border-b border-[#E6ECF3] text-[11px] uppercase tracking-wide text-[#8A9AAF]"><th className="pb-3 font-semibold">Mã chỉ tiêu</th><th className="pb-3 font-semibold">Tên chỉ tiêu</th><th className="pb-3 font-semibold">Nhóm</th><th className="pb-3 text-right font-semibold">Giá trị</th><th className="pb-3 font-semibold">Nguồn dự kiến</th><th className="pb-3 font-semibold">Trạng thái</th></tr></thead><tbody>{filteredRows.map((row) => <tr key={row.code} className="border-b border-[#F0F3F7] last:border-0"><td className="py-3 font-mono text-[11px] text-[#6D819A]">{row.code}</td><td className="py-3 font-semibold text-[#2B4B70]">{row.name}<div className="mt-0.5 text-[10px] font-normal text-[#9AA8B7]">{row.unit} · {price}</div></td><td className="py-3"><span className={`rounded-full px-2 py-1 ${row.group === 'Đầu vào' ? 'bg-[#FFF4DB] text-[#9A6800]' : 'bg-[#EEF4FF] text-[#3A6EBC]'}`}>{row.group}</span></td><td className="py-3 text-right font-bold text-[#2B4B70]">{row.value}</td><td className="py-3 text-[#647991]">{row.source}</td><td className="py-3"><span className={`inline-flex items-center gap-1 font-semibold ${row.status === 'Đã phê duyệt' ? 'text-[#139477]' : 'text-[#C37B1C]'}`}>{row.status === 'Đã phê duyệt' ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}{row.status}</span></td></tr>)}</tbody></table></div></div>

          <div className="grid gap-5 xl:grid-cols-[1.25fr_1fr]">
            <div className="rounded-2xl border border-[#DCE4F0] bg-white p-5"><div className="mb-4 flex items-start justify-between"><div><h3 className="font-bold text-[#213F67]">Đóng góp tăng trưởng theo ngành</h3><p className="text-xs text-[#8393A8]">Mô phỏng để minh họa UI · không phải số liệu công bố</p></div><TrendingUp size={20} className="text-[#2677E5]" /></div><div className="h-[220px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={sectors.map((item, index) => ({ ...item, contribution: [1.3, 2.2, 0.7, 2.1][index] }))} margin={{ left: 0, right: 10, top: 12, bottom: 0 }}><CartesianGrid stroke="#EDF1F6" vertical={false} /><XAxis dataKey="short" tick={{ fontSize: 10, fill: '#8292A9' }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 10, fill: '#8292A9' }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: '#F5F8FC' }} /><Bar dataKey="contribution" name="Điểm đóng góp" fill="#3276E8" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
            <div className="rounded-2xl border border-[#F3D8A0] bg-[#FFF9EA] p-5"><div className="mb-3 flex items-center gap-2 text-[#9A6800]"><AlertTriangle size={18} /><h3 className="font-bold">Cảnh báo truy vết</h3></div><div className="space-y-3 text-sm text-[#765B2D]"><div className="flex gap-3 rounded-xl bg-white/70 p-3"><Info size={16} className="mt-0.5 shrink-0 text-[#D3941B]" /><span><strong>GO và IC</strong> chưa có trong workbook; cần kết nối trước khi tái lập VA.</span></div><div className="flex gap-3 rounded-xl bg-white/70 p-3"><FileCheck2 size={16} className="mt-0.5 shrink-0 text-[#D3941B]" /><span><strong>Thuế/trợ cấp</strong> đang thể hiện dạng ròng; cần tách riêng để kiểm chứng.</span></div><div className="flex gap-3 rounded-xl bg-white/70 p-3"><Filter size={16} className="mt-0.5 shrink-0 text-[#D3941B]" /><span><strong>Năm gốc</strong> phải thống nhất trước khi so sánh chuỗi 2010/2020.</span></div></div></div>
          </div>
        </section>
      </div>
    </main>
  )
}
