import fs from 'node:fs/promises';
import { FileBlob, PresentationFile } from '@oai/artifact-tool';

const root = '/Users/tungnguyen/Code/smb_sunshinecity/tmp/grdp_v2_20260811';
const source = `${root}/template-starter.pptx`;
const output = '/Users/tungnguyen/FPT/De an Quang Tri/GRDP_DuLieuDauVao_IOC_QuangTri_v2.pptx';

async function imageBytes(path) {
  const b = await fs.readFile(path);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}

const sources = `[Sources]\n- Nghị định 94/2022/NĐ-CP, Chính phủ, 07/11/2022: https://vanban.chinhphu.vn/?classid=1&docid=206817&pageid=27160\n- Nghị định 13/2026/NĐ-CP, Chính phủ, hiệu lực 10/04/2026: https://vanban.chinhphu.vn/?classid=1&docid=216632&orggroupid=2&pageid=27160\n- GSO, HTCTTK tỉnh - Tổng sản phẩm trên địa bàn (GRDP): https://www.gso.gov.vn/du-lieu-dac-ta/2019/12/htcttk-cap-tinh-tong-san-pham-tren-dia-ban-grdp/\n- File tham chiếu: IOC_TaiKhoanQuocGia_GRDP_Quy_ThongKeTinh.xlsx\n- Phụ lục nền tảng: IOC-KHODL_F1.pdf`;

const deck = await PresentationFile.importPptx(await FileBlob.load(source));

async function replaceText(oldText, newText) {
  const hit = await deck.inspect({ kind: 'textbox', search: oldText, maxChars: 4000 });
  const rec = hit.ndjson.split('\n').map((line) => { try { return JSON.parse(line); } catch { return null; } })
    .find((item) => item?.text === oldText || item?.textPreview === oldText);
  if (!rec) throw new Error(`Text not found: ${oldText}`);
  deck.resolve(rec.id).text = newText;
}
async function replaceContaining(needle, newText) {
  const hit = await deck.inspect({ kind: 'textbox', search: needle, maxChars: 6000 });
  const rec = hit.ndjson.split('\n').map((line) => { try { return JSON.parse(line); } catch { return null; } })
    .find((item) => item?.text?.includes?.(needle));
  if (!rec) throw new Error(`Text not found: ${needle}`);
  deck.resolve(rec.id).text = newText;
}

// Formula images: professionally typeset LaTeX equations, preserving original slots.
const formula = deck.slides.getItem(2).images.items[0];
const oldFrame = formula.frame;
const oldCrop = formula.crop;
await formula.replace({
  blob: await imageBytes(`${root}/grdp-formula.png`),
  contentType: 'image/png',
  alt: 'Công thức GRDP theo giá hiện hành và giá so sánh',
  fit: 'contain',
});
formula.frame = oldFrame;
formula.crop = oldCrop;

for (let i = 0; i < deck.slides.items.length; i += 1) {
  const slide = deck.slides.getItem(i);
  slide.speakerNotes.textFrame.setText([
    'Bản V2 - rà soát phương pháp và dữ liệu đầu vào GRDP.',
    sources,
  ].join('\n\n'));
  slide.speakerNotes.setVisible(true);
}

// Legal update: the current dissemination schedule is amended by Decree 13/2026.
await replaceText('Nghị định 62/2024/NĐ-CP', 'Nghị định 13/2026/NĐ-CP');
await replaceText('Sửa đổi, bổ sung quy định liên quan đến lịch công bố số liệu GDP, GRDP.', 'Sửa đổi lịch phổ biến một số thông tin thống kê, trong đó có GDP và GRDP.');
await replaceText('Nghị quyết 60-NQ/TW & sắp xếp ĐVHC', 'Nghị quyết 202/2025/QH15 & sắp xếp ĐVHC');
await replaceText('Giảm phát về giá so sánh', 'Biên soạn giá so sánh');
await replaceContaining('Phải có chỉ số giá tương ứng từng ngành để giảm phát', 'Dùng để tính TỐC ĐỘ TĂNG TRƯỞNG thực\nBiên soạn gián tiếp theo từng ngành; không giảm phát trực tiếp GRDP/VA tổng');

const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(output);
console.log(output);
