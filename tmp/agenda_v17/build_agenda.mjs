import { Presentation, PresentationFile } from '@oai/artifact-tool';

const deck = Presentation.create({ slideSize: { width: 1440, height: 810 } });
const slide = deck.slides.add();
const navy = '#113A78', cyan = '#24B6D7', blue = '#1E73D8', white = '#FFFFFF', ink = '#18324D', muted = '#5B6B7E', bg = '#F8FBFF';
const shape = (geometry, left, top, width, height, fill, radius = false) => slide.shapes.add({ geometry, position: { left, top, width, height }, fill, line: { style: 'solid', fill, width: 0 }, ...(radius ? { borderRadius: 'rounded-2xl' } : {}) });
const text = (value, left, top, width, height, fontSize, color, bold = false, align = 'left') => { const x = shape('textbox', left, top, width, height, 'none'); x.text = value; x.text.style = { fontSize, color, bold, typeface: 'Arial', alignment: align, margin: 0 }; return x; };
slide.background.fill = bg;
shape('rect', 0, 0, 1440, 112, navy);
shape('rect', 0, 112, 1440, 7, cyan);
text('Mạch nội dung: từ nền tảng IOC đến chỉ tiêu điều hành', 90, 55, 1230, 46, 38, white, true);
text('Ba phần tạo thành một chuỗi giá trị: nền tảng dữ liệu → GRDP có thể kiểm chứng → dashboard hỗ trợ điều hành.', 90, 148, 1220, 36, 21, muted);
const items = [
  ['1', 'Nền tảng IOC', 'Kết nối, khai phá, lưu trữ, chia sẻ và quản trị dữ liệu.'],
  ['2', 'Use case GRDP', 'Dữ liệu đầu vào, công thức, nguồn cấp và quy tắc kiểm chứng.'],
  ['3', 'Dashboard và điều hành', 'Theo dõi biến động, cảnh báo dữ liệu và hỗ trợ chỉ đạo.'],
];
items.forEach((item, i) => { const y = 225 + i * 155; shape('roundRect', 84, y, 1272, 126, white, true); shape('rect', 84, y, 8, 126, cyan); shape('roundRect', 112, y + 30, 52, 52, blue, true); text(item[0], 112, y + 42, 52, 20, 18, white, true, 'center'); text(item[1], 194, y + 25, 1050, 30, 23, navy, true); text(item[2], 194, y + 70, 1050, 25, 17, muted); });
const out = '/Users/tungnguyen/Code/smb_sunshinecity/tmp/agenda_v17/agenda.pptx';
const file = await PresentationFile.exportPptx(deck); await file.save(out);
