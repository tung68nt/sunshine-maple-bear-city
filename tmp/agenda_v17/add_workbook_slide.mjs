import fs from 'node:fs/promises';
import { FileBlob, PresentationFile } from '@oai/artifact-tool';

const input = '/Users/tungnguyen/FPT/De an Quang Tri/IOC-KHODL_F1_GRDP_BoSung_v17.pptx';
const output = '/Users/tungnguyen/FPT/De an Quang Tri/IOC-KHODL_F1_GRDP_BoSung_v20.pptx';
const deck = await PresentationFile.importPptx(await FileBlob.load(input));
const slide = deck.slides.add();
slide.background.fill = '#F8FBFF';
const img = new Uint8Array(await fs.readFile('/Users/tungnguyen/Code/smb_sunshinecity/tmp/grdp_workbook_preview.png'));
slide.images.add({ blob: img, contentType: 'image/png', alt: 'Workbook GRDP đã đánh dấu màu vàng', fit: 'contain', position: { left: 52, top: 214, width: 1336, height: 480 } });
const shape = (geometry, left, top, width, height, fill) => slide.shapes.add({ geometry, position: { left, top, width, height }, fill, line: { style: 'solid', fill, width: 0 } });
const text = (value, left, top, width, height, fontSize, color, bold = false) => { const x = shape('textbox', left, top, width, height, 'none'); x.text = value; x.text.style = { fontSize, color, bold, typeface: 'Arial', margin: 0 }; return x; };
shape('rect', 0, 0, 1440, 112, '#113A78'); shape('rect', 0, 112, 1440, 7, '#24B6D7');
text('Workbook nguồn: chỉ tiêu GRDP được đánh dấu và truy vết', 90, 48, 1250, 48, 36, '#FFFFFF', true);
text('Bản làm việc bổ sung vai trò, đầu mối cung cấp và ghi chú kiểm soát; dữ liệu gốc được giữ nguyên.', 90, 148, 1240, 32, 19, '#5B6B7E');
shape('roundRect', 76, 714, 1288, 54, '#FFF4D7');
text('Màu vàng = chỉ tiêu GRDP đang có trong workbook; cột J–N = vai trò, nguồn dự kiến, tần suất và kiểm soát.', 102, 731, 1220, 20, 16, '#8A5B00', true);
slide.speakerNotes.textFrame.setText('[Sources]\n- IOC_TaiKhoanQuocGia_GRDP_Quy_ThongKeTinh_GRDP_DaDanhDau_v2.xlsx\n- IOC-KHODL_F1.pdf\n- Nghị định 94/2022/NĐ-CP.');
const file = await PresentationFile.exportPptx(deck); await file.save(output); console.log(output);
