'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Image as ImageIcon,
  Table as TableIcon,
  Code,
  Eye,
  Edit3,
  Undo,
  Redo,
  Sparkles,
  Palette,
  Highlighter,
  Minus,
  RemoveFormatting,
  Type
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [mode, setMode] = useState<'VISUAL' | 'PREVIEW' | 'HTML'>('VISUAL')
  const editorRef = useRef<HTMLDivElement>(null)
  const [textColor, setTextColor] = useState('#1D1D1B')
  const [bgColor, setBgColor] = useState('#FEF08A')
  const [isColorOpen, setIsColorOpen] = useState(false)
  const [isBgOpen, setIsBgOpen] = useState(false)

  // Keep editor content in sync when switching modes or initial load
  useEffect(() => {
    if (editorRef.current && mode === 'VISUAL') {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '<p>Nhập nội dung bài viết tại đây...</p>'
      }
    }
  }, [mode])

  // Execute browser formatting commands on active contentEditable selection
  const execCommand = (command: string, valueArg: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
    document.execCommand(command, false, valueArg)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  // Handle Text Color change
  const handleApplyTextColor = (color: string) => {
    setTextColor(color)
    execCommand('foreColor', color)
    setIsColorOpen(false)
  }

  // Handle Background Highlight change
  const handleApplyBgColor = (color: string) => {
    setBgColor(color)
    execCommand('backColor', color)
    setIsBgOpen(false)
  }

  // Insert Table (WordPress style 3x3)
  const handleInsertTable = () => {
    const tableHTML = `
      <table class="w-full border-collapse border border-neutral-300 my-4 text-xs">
        <thead>
          <tr class="bg-[#FDFBF7] border-b border-neutral-300 text-neutral-800 font-bold">
            <th class="border border-neutral-300 p-2.5">Tiêu đề cột 1</th>
            <th class="border border-neutral-300 p-2.5">Tiêu đề cột 2</th>
            <th class="border border-neutral-300 p-2.5">Tiêu đề cột 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-neutral-300 p-2.5">Dữ liệu hàng 1</td>
            <td class="border border-neutral-300 p-2.5">Nội dung 1</td>
            <td class="border border-neutral-300 p-2.5">Chi tiết 1</td>
          </tr>
          <tr class="bg-neutral-50/50">
            <td class="border border-neutral-300 p-2.5">Dữ liệu hàng 2</td>
            <td class="border border-neutral-300 p-2.5">Nội dung 2</td>
            <td class="border border-neutral-300 p-2.5">Chi tiết 2</td>
          </tr>
        </tbody>
      </table>
      <p></p>
    `
    execCommand('insertHTML', tableHTML)
  }

  // Insert Callout Highlight Box
  const handleInsertCallout = () => {
    const calloutHTML = `
      <blockquote class="p-4 bg-[#FDFBF7] border-l-4 border-maple-red my-4 text-xs italic text-neutral-800 shadow-2xs">
        <strong>Ghi chú quan trọng:</strong> Nhập thông tin điểm nhấn hoặc nội dung cần chú ý tại đây...
      </blockquote>
      <p></p>
    `
    execCommand('insertHTML', calloutHTML)
  }

  // Insert Image with Caption
  const handleInsertImage = () => {
    const url = prompt('Nhập đường dẫn URL của hình ảnh (Image URL):', '/images/render/LOP_HOC_DIEN_HINH_1_.jpg')
    if (url) {
      const imgHTML = `
        <figure class="my-5">
          <img src="${url}" alt="Article Image" class="w-full border border-neutral-300 shadow-sm" />
          <figcaption class="text-xs text-neutral-500 text-center mt-2 italic">Chú thích cho hình ảnh bài viết</figcaption>
        </figure>
        <p></p>
      `
      execCommand('insertHTML', imgHTML)
    }
  }

  // Insert Hyperlink
  const handleInsertLink = () => {
    const url = prompt('Nhập đường dẫn liên kết (Target URL):', 'https://sunshinemaplebear.edu.vn')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const [customHexInput, setCustomHexInput] = useState('#C41E3A')
  const [customBgHexInput, setCustomBgHexInput] = useState('#FEF08A')
  const [savedCustomColors, setSavedCustomColors] = useState<string[]>([])
  const colorPopRef = useRef<HTMLDivElement>(null)
  const bgPopRef = useRef<HTMLDivElement>(null)

  // Load saved custom color swatches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('smb_admin_saved_colors')
      if (stored) {
        setSavedCustomColors(JSON.parse(stored))
      } else {
        setSavedCustomColors(['#C41E3A', '#D4AF37', '#0F2C59', '#059669', '#EA580C'])
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  // Handle click outside to close popovers
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (colorPopRef.current && !colorPopRef.current.contains(e.target as Node)) {
        setIsColorOpen(false)
      }
      if (bgPopRef.current && !bgPopRef.current.contains(e.target as Node)) {
        setIsBgOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleSaveCustomColor = (colorToSave: string) => {
    let cleanHex = colorToSave.trim()
    if (!cleanHex.startsWith('#')) cleanHex = '#' + cleanHex
    if (!/^#[0-9A-Fa-f]{6}$/.test(cleanHex)) return

    if (!savedCustomColors.includes(cleanHex)) {
      const updated = [cleanHex, ...savedCustomColors].slice(0, 12)
      setSavedCustomColors(updated)
      localStorage.setItem('smb_admin_saved_colors', JSON.stringify(updated))
    }
  }

  const handleRemoveSavedColor = (colorToRemove: string) => {
    const updated = savedCustomColors.filter(c => c !== colorToRemove)
    setSavedCustomColors(updated)
    localStorage.setItem('smb_admin_saved_colors', JSON.stringify(updated))
  }

  const presetColors = [
    { label: 'Đỏ Maple Red (#C41E3A)', value: '#C41E3A' },
    { label: 'Vàng Gold (#D4AF37)', value: '#D4AF37' },
    { label: 'Đen Chần (#1D1D1B)', value: '#1D1D1B' },
    { label: 'Xanh Hải quân (#0F2C59)', value: '#0F2C59' },
    { label: 'Xanh Sinh thái (#059669)', value: '#059669' },
    { label: 'Cam Ấm (#EA580C)', value: '#EA580C' },
    { label: 'Tím Hoàng Gia (#7C3AED)', value: '#7C3AED' },
    { label: 'Xanh Ngọc (#0D9488)', value: '#0D9488' },
    { label: 'Hồng Đào (#E11D48)', value: '#E11D48' },
    { label: 'Xám Trung tính (#6B7280)', value: '#6B7280' },
  ]

  const presetHighlights = [
    { label: 'Vàng nhạt (#FEF08A)', value: '#FEF08A' },
    { label: 'Đỏ nhạt (#FECACA)', value: '#FECACA' },
    { label: 'Xanh lá nhạt (#BBF7D0)', value: '#BBF7D0' },
    { label: 'Xanh dương nhạt (#BFDBFE)', value: '#BFDBFE' },
    { label: 'Tím nhạt (#E9D5FF)', value: '#E9D5FF' },
  ]

  const handleApplyCustomHex = () => {
    let cleanHex = customHexInput.trim()
    if (!cleanHex.startsWith('#')) {
      cleanHex = '#' + cleanHex
    }
    handleApplyTextColor(cleanHex)
  }

  const handleApplyCustomBgHex = () => {
    let cleanHex = customBgHexInput.trim()
    if (!cleanHex.startsWith('#')) {
      cleanHex = '#' + cleanHex
    }
    handleApplyBgColor(cleanHex)
  }

  return (
    <div className="border border-neutral-300 bg-white shadow-2xs overflow-hidden text-[#1D1D1B]">
      
      {/* Editor Mode Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#151513] text-white border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-maple-gold" />
          <span className="text-xs font-semibold text-white">
            Bộ soạn thảo bài viết Sunshine CMS
          </span>
        </div>

        <div className="flex items-center bg-neutral-800 p-0.5 border border-neutral-700 rounded text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode('VISUAL')}
            className={`px-3 py-1 flex items-center gap-1.5 transition-colors ${
              mode === 'VISUAL' ? 'bg-maple-red text-white font-semibold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Edit3 size={13} /> Visual Editor
          </button>
          <button
            type="button"
            onClick={() => setMode('PREVIEW')}
            className={`px-3 py-1 flex items-center gap-1.5 transition-colors ${
              mode === 'PREVIEW' ? 'bg-maple-red text-white font-semibold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Eye size={13} /> Live Article Preview
          </button>
          <button
            type="button"
            onClick={() => setMode('HTML')}
            className={`px-3 py-1 flex items-center gap-1.5 transition-colors ${
              mode === 'HTML' ? 'bg-maple-red text-white font-semibold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Code size={13} /> HTML Source
          </button>
        </div>
      </div>

      {/* WORDPRESS FULL FEATURE TOOLBAR */}
      {mode === 'VISUAL' && (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-[#FDFBF7] border-b border-neutral-300 text-xs">
          
          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5 border-r border-neutral-300 pr-1.5">
            <button
              type="button"
              onClick={() => execCommand('undo')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
              title="Undo (Ctrl+Z)"
            >
              <Undo size={14} />
            </button>
            <button
              type="button"
              onClick={() => execCommand('redo')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
              title="Redo (Ctrl+Y)"
            >
              <Redo size={14} />
            </button>
          </div>

          {/* Block Format Select (Paragraph, H2, H3, Blockquote) */}
          <div className="flex items-center gap-1 border-r border-neutral-300 pr-1.5">
            <select
              onChange={(e) => {
                const val = e.target.value
                if (val === 'p') execCommand('formatBlock', '<p>')
                if (val === 'h2') execCommand('formatBlock', '<h2>')
                if (val === 'h3') execCommand('formatBlock', '<h3>')
                if (val === 'h4') execCommand('formatBlock', '<h4>')
                if (val === 'blockquote') handleInsertCallout()
              }}
              className="bg-white border border-neutral-300 text-xs font-semibold px-2 py-1 focus:outline-none"
            >
              <option value="p">Đoạn văn (Paragraph)</option>
              <option value="h2">Heading 2 (Thẻ tiêu đề lớn)</option>
              <option value="h3">Heading 3 (Thẻ tiêu đề phụ)</option>
              <option value="h4">Heading 4 (Tiêu đề nhỏ)</option>
              <option value="blockquote">Khung trích dẫn (Callout)</option>
            </select>
          </div>

          {/* Formatting: Bold, Italic, Underline, Strikethrough */}
          <div className="flex items-center gap-0.5 border-r border-neutral-300 pr-1.5">
            <button
              type="button"
              onClick={() => execCommand('bold')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300 font-bold"
              title="In đậm (Bold)"
            >
              <Bold size={14} />
            </button>
            <button
              type="button"
              onClick={() => execCommand('italic')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300 italic"
              title="In nghiêng (Italic)"
            >
              <Italic size={14} />
            </button>
            <button
              type="button"
              onClick={() => execCommand('underline')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300 underline"
              title="Gạch chân (Underline)"
            >
              <Underline size={14} />
            </button>
            <button
              type="button"
              onClick={() => execCommand('strikeThrough')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300 line-through"
              title="Gạch ngang chữ (Strikethrough)"
            >
              <Strikethrough size={14} />
            </button>
          </div>

          {/* Text Color Picker & Highlight Dropdown */}
          <div className="flex items-center gap-1 border-r border-neutral-300 pr-1.5 relative">
            
            {/* Color Palette Popover */}
            <div className="relative" ref={colorPopRef}>
              <button
                type="button"
                onClick={() => setIsColorOpen(!isColorOpen)}
                className="flex items-center gap-1 p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
                title="Màu chữ (Text Color)"
              >
                <Palette size={14} style={{ color: textColor }} />
                <span className="w-3 h-3 border border-neutral-400 inline-block rounded-xs shadow-2xs" style={{ backgroundColor: textColor }} />
              </button>

              {isColorOpen && (
                <div className="absolute left-0 top-full mt-1 p-3 bg-white border border-neutral-300 shadow-2xl z-50 w-72 space-y-3 rounded-2xs text-xs">
                  
                  {/* Section 1: Official Brand Palette */}
                  <div>
                    <span className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Bảng màu thương hiệu Sunshine Maple Bear:
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {presetColors.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => {
                            setCustomHexInput(c.value)
                            handleApplyTextColor(c.value)
                          }}
                          className="w-8 h-8 border border-neutral-400 hover:scale-110 transition-all rounded-2xs shadow-2xs relative group"
                          style={{ backgroundColor: c.value }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Section 2: User Saved Custom Colors Swatches */}
                  {savedCustomColors.length > 0 && (
                    <div className="pt-2 border-t border-neutral-200">
                      <span className="text-xs font-semibold text-maple-red block mb-1.5 flex items-center justify-between">
                        <span>Màu tùy chỉnh đã lưu ({savedCustomColors.length}):</span>
                        <span className="text-[11px] text-neutral-400 font-normal">Chạm để chọn</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {savedCustomColors.map((hex, i) => (
                          <div key={i} className="relative group">
                            <button
                              type="button"
                              onClick={() => {
                                setCustomHexInput(hex)
                                handleApplyTextColor(hex)
                              }}
                              className="w-8 h-8 border-2 border-neutral-400 hover:border-maple-red hover:scale-110 transition-all rounded-2xs shadow-2xs"
                              style={{ backgroundColor: hex }}
                              title={`Sử dụng màu đã lưu: ${hex}`}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemoveSavedColor(hex)
                              }}
                              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-neutral-900 text-white text-[9px] rounded-full hidden group-hover:flex items-center justify-center hover:bg-maple-red"
                              title="Xóa màu này khỏi danh sách đã lưu"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section 3: Custom HEX Input & Save Action */}
                  <div className="pt-2 border-t border-neutral-200 space-y-2">
                    <span className="text-xs font-semibold text-neutral-700 block">
                      Nhập mã màu HEX tùy chỉnh (Custom HEX Code):
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1 flex items-center">
                        <span className="w-5 h-5 rounded-xs border border-neutral-400 mr-2 flex-shrink-0" style={{ backgroundColor: customHexInput }} />
                        <input
                          type="text"
                          value={customHexInput}
                          onChange={(e) => setCustomHexInput(e.target.value)}
                          placeholder="#C41E3A"
                          className="w-full px-2 py-1 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-semibold text-neutral-800 focus:outline-none focus:border-maple-red"
                        />
                      </div>
                      <input
                        type="color"
                        value={customHexInput.startsWith('#') && customHexInput.length === 7 ? customHexInput : '#C41E3A'}
                        onChange={(e) => setCustomHexInput(e.target.value)}
                        className="w-7 h-7 p-0 border border-neutral-300 rounded cursor-pointer flex-shrink-0"
                        title="Mở trình chọn màu tự do"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={handleApplyCustomHex}
                        className="py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-medium transition-colors rounded-2xs"
                      >
                        Áp dụng màu
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveCustomColor(customHexInput)}
                        className="py-1.5 bg-neutral-100 hover:bg-neutral-800 hover:text-white text-[#1D1D1B] text-xs font-medium transition-colors border border-neutral-300 rounded-2xs"
                        title="Lưu mã màu này vào danh sách dùng lại sau"
                      >
                        + Lưu màu này
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Background Highlight Popover */}
            <div className="relative" ref={bgPopRef}>
              <button
                type="button"
                onClick={() => setIsBgOpen(!isBgOpen)}
                className="flex items-center gap-1 p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
                title="Tô nền chữ (Highlight Color)"
              >
                <Highlighter size={14} className="text-amber-600" />
                <span className="w-3 h-3 border border-neutral-400 inline-block rounded-xs shadow-2xs" style={{ backgroundColor: bgColor }} />
              </button>

              {isBgOpen && (
                <div className="absolute left-0 top-full mt-1 p-3 bg-white border border-neutral-300 shadow-2xl z-50 w-64 space-y-3 rounded-2xs text-xs">
                  <div>
                    <span className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Màu nền highlight có sẵn:
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {presetHighlights.map((h) => (
                        <button
                          key={h.value}
                          type="button"
                          onClick={() => {
                            setCustomBgHexInput(h.value)
                            handleApplyBgColor(h.value)
                          }}
                          className="w-8 h-8 border border-neutral-400 hover:scale-110 transition-all rounded-2xs shadow-2xs"
                          style={{ backgroundColor: h.value }}
                          title={h.label}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-200 space-y-2">
                    <span className="text-xs font-semibold text-neutral-700 block">
                      Mã màu nền HEX tùy chỉnh:
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1 flex items-center">
                        <span className="w-5 h-5 rounded-xs border border-neutral-400 mr-2 flex-shrink-0" style={{ backgroundColor: customBgHexInput }} />
                        <input
                          type="text"
                          value={customBgHexInput}
                          onChange={(e) => setCustomBgHexInput(e.target.value)}
                          placeholder="#FEF08A"
                          className="w-full px-2 py-1 bg-[#FDFBF7] border border-neutral-300 text-xs font-mono font-semibold text-neutral-800 focus:outline-none focus:border-maple-red"
                        />
                      </div>
                      <input
                        type="color"
                        value={customBgHexInput.startsWith('#') && customBgHexInput.length === 7 ? customBgHexInput : '#FEF08A'}
                        onChange={(e) => setCustomBgHexInput(e.target.value)}
                        className="w-7 h-7 p-0 border border-neutral-300 rounded cursor-pointer flex-shrink-0"
                        title="Mở trình chọn màu tự do"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCustomBgHex}
                      className="w-full py-1.5 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-medium transition-colors rounded-2xs"
                    >
                      Áp dụng màu nền
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Alignments */}
          <div className="flex items-center gap-0.5 border-r border-neutral-300 pr-1.5">
            <button
              type="button"
              onClick={() => execCommand('justifyLeft')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
              title="Căn trái"
            >
              <AlignLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => execCommand('justifyCenter')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
              title="Căn giữa"
            >
              <AlignCenter size={14} />
            </button>
            <button
              type="button"
              onClick={() => execCommand('justifyRight')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
              title="Căn phải"
            >
              <AlignRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => execCommand('justifyFull')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
              title="Căn đều 2 bên"
            >
              <AlignJustify size={14} />
            </button>
          </div>

          {/* Lists & Quote */}
          <div className="flex items-center gap-0.5 border-r border-neutral-300 pr-1.5">
            <button
              type="button"
              onClick={() => execCommand('insertUnorderedList')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
              title="Danh sách dấu chấm (Bullet List)"
            >
              <List size={14} />
            </button>
            <button
              type="button"
              onClick={() => execCommand('insertOrderedList')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
              title="Danh sách số (Numbered List)"
            >
              <ListOrdered size={14} />
            </button>
            <button
              type="button"
              onClick={handleInsertCallout}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
              title="Khung trích dẫn Callout"
            >
              <Quote size={14} />
            </button>
          </div>

          {/* Table, Image, Link, HR & Clear Format */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleInsertTable}
              className="px-2 py-1 bg-white hover:bg-neutral-100 border border-neutral-300 font-semibold flex items-center gap-1"
              title="Chèn bảng dữ liệu 3x3 (HTML Table)"
            >
              <TableIcon size={14} className="text-blue-600" /> Bảng
            </button>

            <button
              type="button"
              onClick={handleInsertImage}
              className="px-2 py-1 bg-white hover:bg-neutral-100 border border-neutral-300 font-semibold flex items-center gap-1"
              title="Chèn hình ảnh (Insert Image)"
            >
              <ImageIcon size={14} className="text-maple-red" /> Chèn ảnh
            </button>

            <button
              type="button"
              onClick={handleInsertLink}
              className="px-2 py-1 bg-white hover:bg-neutral-100 border border-neutral-300 font-semibold flex items-center gap-1"
              title="Chèn đường dẫn (Hyperlink)"
            >
              <Link2 size={14} className="text-amber-600" /> Chèn Link
            </button>

            <button
              type="button"
              onClick={() => execCommand('insertHorizontalRule')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300"
              title="Đường phân cách ngang (Divider Line)"
            >
              <Minus size={14} />
            </button>

            <button
              type="button"
              onClick={() => execCommand('removeFormat')}
              className="p-1.5 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-600"
              title="Xóa định dạng (Clear Formatting)"
            >
              <RemoveFormatting size={14} />
            </button>
          </div>

        </div>
      )}

      {/* MODE 1: VISUAL FORMATTED WYSIWYG EDITOR */}
      {mode === 'VISUAL' && (
        <div className="p-4 bg-white min-h-[360px] max-h-[550px] overflow-y-auto space-y-2">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => {
              if (editorRef.current) onChange(editorRef.current.innerHTML)
            }}
            onBlur={() => {
              if (editorRef.current) onChange(editorRef.current.innerHTML)
            }}
            className="prose prose-sm max-w-none focus:outline-none font-sans text-neutral-800 leading-relaxed min-h-[320px] p-4 bg-[#FDFBF7] border border-neutral-200 rounded-2xs"
          />
        </div>
      )}

      {/* MODE 2: LIVE ARTICLE PREVIEW */}
      {mode === 'PREVIEW' && (
        <div className="p-6 bg-[#FDFBF7] min-h-[360px] max-h-[550px] overflow-y-auto space-y-6">
          <div className="max-w-2xl mx-auto bg-white p-6 border border-neutral-300 shadow-md space-y-4">
            <span className="text-xs font-semibold text-maple-red block border-b border-neutral-200 pb-2">
              Xem trước bài viết thực tế (Live Article Preview)
            </span>
            <div
              dangerouslySetInnerHTML={{ __html: value }}
              className="prose prose-neutral max-w-none text-sm leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* MODE 3: HTML CODE SOURCE */}
      {mode === 'HTML' && (
        <div className="p-3 bg-[#151513] min-h-[360px]">
          <textarea
            rows={14}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[#151513] text-emerald-400 font-mono text-xs p-3 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      )}

    </div>
  )
}
