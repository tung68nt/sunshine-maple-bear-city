import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const input = '/Users/tungnguyen/FPT/De an Quang Tri/IOC_TaiKhoanQuocGia_GRDP_Quy_ThongKeTinh.xlsx';
const output = '/Users/tungnguyen/FPT/De an Quang Tri/IOC_TaiKhoanQuocGia_GRDP_Quy_ThongKeTinh_GRDP_DaDanhDau_v2.xlsx';
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(input));
const sheet = workbook.worksheets.getItemAt(0);
const used = sheet.getUsedRange();
const vals = used.values;
const headers = ['Mức liên quan GRDP','Vai trò trong hệ thống chỉ tiêu','Nguồn cung cấp / đầu mối dự kiến','Tần suất cập nhật','Ghi chú kiểm soát'];
sheet.getRange('J1:N1').values = [headers];
sheet.getRange('J1:N1').format = { fill: '#113A78', font: { bold: true, color: '#FFFFFF', name: 'Arial' }, wrapText: true, horizontalAlignment: 'center', verticalAlignment: 'center' };
for (let i = 1; i < vals.length; i++) {
  const name = String(vals[i][1] ?? '').trim();
  let role = 'Kết quả GRDP';
  let source = 'Cục Thống kê';
  let note = 'Đối chiếu với phiên bản số liệu và trạng thái phê duyệt.';
  if (name.includes('Thuế')) { role = 'Thành phần điều chỉnh GRDP'; source = 'Cục Thuế / Hải quan / Cơ quan tài chính (xác nhận đầu mối)'; note = 'File đang thể hiện khoản ròng; cần tách thuế sản phẩm và trợ cấp sản phẩm để kiểm chứng.'; }
  if (name.includes('Công nghiệp') || name.includes('Xây dựng') || name.includes('Dịch vụ') || name.includes('Nông')) { role = 'Kết quả GRDP theo ngành'; source = 'Cục Thống kê và sở chuyên ngành'; }
  if (name.includes('Tổng sản phẩm')) { role = 'Kết quả GRDP tổng hợp'; }
  sheet.getRange(`J${i+1}:N${i+1}`).values = [['Trực tiếp', role, source, 'Quý', note]];
  sheet.getRange(`B${i+1}:I${i+1}`).format.fill = '#FFF2CC';
  sheet.getRange(`J${i+1}:N${i+1}`).format.fill = '#FFF9E6';
}
sheet.getRange('A1:N129').format.font = { name: 'Arial', size: 10 };
sheet.getRange('A1:N129').format.borders = { preset: 'all', style: 'thin', color: '#D9E2F3' };
sheet.getRange('A1:N129').format.wrapText = true;
sheet.getRange('A1:N129').format.verticalAlignment = 'center';
sheet.getRange('A1:N1').format.rowHeight = 34;
sheet.getRange('A1:N129').format.autofitRows();
sheet.getRange('A:A').format.columnWidth = 8;
sheet.getRange('B:B').format.columnWidth = 34;
sheet.getRange('C:E').format.columnWidth = 18;
sheet.getRange('F:I').format.columnWidth = 22;
sheet.getRange('J:J').format.columnWidth = 18;
sheet.getRange('K:K').format.columnWidth = 28;
sheet.getRange('L:L').format.columnWidth = 38;
sheet.getRange('M:M').format.columnWidth = 16;
sheet.getRange('N:N').format.columnWidth = 44;
sheet.freezePanes.freezeRows(1);
const guide = workbook.worksheets.add('Huong_dan_va_nguon');
guide.getRange('A1:D1').values = [['Nội dung','Kết luận rà soát','Nguồn / đầu mối xác nhận','Trạng thái']];
guide.getRange('A1:D1').format = { fill: '#113A78', font: { bold: true, color: '#FFFFFF', name: 'Arial' }, wrapText: true };
guide.getRange('A2:D8').values = [
  ['Chỉ tiêu hiện có','8 nhóm chỉ tiêu kết quả GRDP trong sheet chính','Workbook do đội dự án cung cấp','Đã đánh dấu vàng'],
  ['Dữ liệu đầu vào sản xuất','GO, IC, hệ số IC năm gốc chưa có trong workbook','Cục Thống kê xác nhận biểu và nguồn','Cần bổ sung'],
  ['Hệ thống chỉ số giá','Chưa có chuỗi chỉ số giá theo ngành','Cục Thống kê','Cần bổ sung'],
  ['Thuế và trợ cấp','Đang có khoản ròng, chưa tách thành phần','Thuế / Hải quan / Tài chính xác nhận','Cần làm rõ'],
  ['Metadata','Thiếu mã VSIC, địa giới, phiên bản, ngày chốt, phê duyệt','Chủ quản dữ liệu IOC + Cục Thống kê','Cần bổ sung'],
  ['Chỉ tiêu kinh tế - xã hội liên quan','Chưa nằm trong workbook này; không được suy diễn là thành phần công thức GRDP','Các sở, ngành theo danh mục được phê duyệt','Bổ sung ở danh mục IOC'],
  ['Căn cứ phương pháp','Phương pháp sản xuất; giá hiện hành và giá so sánh','Nghị định 94/2022/NĐ-CP; GSO','Phải xác nhận trước công bố'],
];
guide.getRange('A1:D8').format = { font: { name: 'Arial', size: 10 }, wrapText: true, verticalAlignment: 'center', borders: { preset: 'all', style: 'thin', color: '#D9E2F3' } };
guide.getRange('A1:D1').format = { fill: '#113A78', font: { bold: true, color: '#FFFFFF', name: 'Arial', size: 10 }, wrapText: true };
guide.getRange('A:A').format.columnWidth = 28; guide.getRange('B:B').format.columnWidth = 52; guide.getRange('C:C').format.columnWidth = 46; guide.getRange('D:D').format.columnWidth = 20;
guide.getRange('A1:D8').format.autofitRows(); guide.freezePanes.freezeRows(1);
const preview = await workbook.render({ sheetName: sheet.name, range: 'A1:N12', scale: 1.2, format: 'png' });
await fs.writeFile('/Users/tungnguyen/Code/smb_sunshinecity/tmp/grdp_workbook_preview.png', new Uint8Array(await preview.arrayBuffer()));
const xlsx = await SpreadsheetFile.exportXlsx(workbook); await xlsx.save(output);
console.log(output);
