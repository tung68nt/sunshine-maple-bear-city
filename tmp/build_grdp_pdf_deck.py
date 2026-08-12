from pathlib import Path
import subprocess
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import HexColor, white

SRC = Path('/Users/tungnguyen/FPT/De an Quang Tri/IOC-KHODL_F1.pdf')
TMP = Path('/Users/tungnguyen/Code/smb_sunshinecity/tmp/pdf_structured')
OUT = Path('/Users/tungnguyen/FPT/De an Quang Tri/GRDP_IOC_Dashboard_Demo_v1/deliverables/IOC-KHODL_F1_GRDP_Dashboard_Structured_v1.pdf')
W, H = 1440, 810
navy, blue, cyan, ink, muted, pale, gold = '#113A78', '#2677E5', '#24B6D7', '#18324D', '#5B6B7E', '#F5F9FE', '#F6B21A'

def render_source():
    base = TMP / 'original' / 'page'
    if not (TMP / 'original/page-01.png').exists():
        subprocess.run(['pdftoppm', '-png', '-r', '144', str(SRC), str(base)], check=True)

def rect(c, x, y, w, h, fill, radius=12, stroke=None):
    c.setFillColor(HexColor(fill)); c.setStrokeColor(HexColor(stroke or fill)); c.roundRect(x, y, w, h, radius, fill=1, stroke=1 if stroke else 0)

def txt(c, s, x, y, size=18, color=ink, bold=False):
    c.setFillColor(HexColor(color)); c.setFont('Helvetica-Bold' if bold else 'Helvetica', size); c.drawString(x, y, s)

def slide(c, eyebrow, title, subtitle=''):
    c.setFillColor(HexColor(pale)); c.rect(0, 0, W, H, fill=1, stroke=0); c.setFillColor(HexColor(navy)); c.rect(0, H-112, W, 112, fill=1, stroke=0); c.setFillColor(HexColor(cyan)); c.rect(0, H-119, W, 7, fill=1, stroke=0)
    txt(c, eyebrow.upper(), 90, H-42, 14, '#BEE9FF', True); txt(c, title, 90, H-88, 37, white, True)
    if subtitle: txt(c, subtitle, 90, H-158, 19, muted)

def bullets(c, items, x, y, leading=29, size=17, color=ink):
    for i, item in enumerate(items):
        txt(c, '•', x, y-i*leading, size+2, blue, True); txt(c, item, x+24, y-i*leading, size, color)

def build():
    render_source(); c = canvas.Canvas(str(OUT), pagesize=(W, H))
    for i in range(1, 18):
        c.drawImage(ImageReader(str(TMP / 'original' / f'page-{i:02d}.png')), 0, 0, W, H)
        c.showPage()

    slide(c, 'GRDP trong IOC', 'Từ màn hình IOC đến mô-đun quản trị GRDP', 'Giữ nguyên các năng lực nền tảng trong PDF IOC; bổ sung lớp GRDP có công thức, nguồn và kiểm soát.');
    rect(c, 90, 270, 390, 210, white); rect(c, 525, 270, 390, 210, white); rect(c, 960, 270, 390, 210, white)
    for x, n, h, d in [(90,'01','Kết quả','Quy mô · tăng trưởng · cơ cấu'),(525,'02','Dữ liệu tính','GO · IC · giá · thuế/trợ cấp'),(960,'03','Điều hành','Theo dõi kỳ · truy vết · cảnh báo')]: txt(c,n,x+28,435,20,blue,True); txt(c,h,x+28,385,24,navy,True); txt(c,d,x+28,345,16,muted)
    c.showPage()

    slide(c, 'Phạm vi theo dõi', 'Một màn hình, nhiều khoảng thời gian và loại giá', 'Bộ lọc là điều kiện bắt buộc để không trộn lẫn các chuỗi số liệu khác năm gốc hoặc khác phiên bản.');
    for i,(h,d) in enumerate([('Kỳ báo cáo','Quý · 6 tháng · 9 tháng · Năm'),('Loại giá','Hiện hành · So sánh'),('Năm gốc','2010 · 2020 theo phiên bản được duyệt'),('Địa giới','Tỉnh · ngành · phạm vi hiệu lực')]):
        x=90+(i%2)*670; y=400-(i//2)*145; rect(c,x,y,600,100,white); txt(c,h,x+25,y+60,21,navy,True); txt(c,d,x+25,y+28,16,muted)
    c.showPage()

    slide(c, 'Bộ chỉ tiêu GRDP', 'Phân loại để theo dõi, không đưa toàn bộ Excel lên màn hình', 'Bảng chi tiết chỉ mở khi truy vết; màn hình chính dùng bốn nhóm chỉ tiêu có ý nghĩa điều hành.');
    groups=[('Kết quả GRDP','GRDP tổng · GRDP theo ngành · tăng trưởng · cơ cấu',cyan),('Đầu vào tính toán','GO · IC · hệ số IC năm gốc · hệ thống chỉ số giá',blue),('Điều chỉnh','Thuế sản phẩm · thuế nhập khẩu · trợ cấp sản phẩm',gold),('Giải thích biến động','Sản lượng · doanh thu · đầu tư · lao động · ngân sách','#8B5CF6')]
    for i,(h,d,col) in enumerate(groups): x=90+(i%2)*670; y=440-(i//2)*150; rect(c,x,y,600,112,white); c.setFillColor(HexColor(col)); c.rect(x,y,8,112,fill=1,stroke=0); txt(c,h,x+28,y+67,21,navy,True); txt(c,d,x+28,y+32,15,muted)
    c.showPage()

    slide(c, 'Công thức chuẩn', 'GRDP theo phương pháp sản xuất', 'Nghị định 94/2022/NĐ-CP và đặc tả GRDP của cơ quan thống kê là căn cứ nghiệp vụ; ký hiệu dưới đây là biểu diễn vận hành trong IOC.');
    formula=Path('/Users/tungnguyen/Code/smb_sunshinecity/tmp/grdp_v2_20260811/grdp-formula-transparent.png')
    c.drawImage(ImageReader(str(formula)), 180, 390, 1080, 130, mask='auto', preserveAspectRatio=True)
    rect(c,90,190,600,120,white); rect(c,750,190,600,120,white); txt(c,'Giá trị tăng thêm',120,270,21,navy,True); txt(c,'VA = GO - IC',120,225,24,blue,True); txt(c,'GO: giá trị sản xuất · IC: chi phí trung gian',780,270,18,navy,True); txt(c,'TSP: thuế sản phẩm · TrCP: trợ cấp sản phẩm',780,225,16,muted)
    c.showPage()

    slide(c, 'Quy trình realtime', 'Từ dữ liệu nguồn đến con số hiển thị', 'Mỗi bước có trạng thái, nhật ký và điều kiện chặn trước khi công bố trên dashboard.');
    steps=[('01','Thu thập','API · CSDL · file kiểm soát'),('02','Chuẩn hóa','Mã ngành · kỳ · đơn vị · kiểu số'),('03','Tính toán','VA = GO - IC · tăng · cơ cấu'),('04','Đối soát','Trống · trùng · năm gốc · phiên bản'),('05','Phê duyệt','Ước tính · sơ bộ · chính thức'),('06','Dashboard','KPI · biểu đồ · truy vết')]
    for i,(n,h,d) in enumerate(steps): x=60+i*228; rect(c,x,300,195,170,white); txt(c,n,x+20,430,18,blue,True); txt(c,h,x+20,382,20,navy,True); txt(c,d,x+20,335,14,muted)
    c.showPage()

    slide(c, 'Nguồn và trách nhiệm', 'Mỗi chỉ tiêu phải có đầu mối cung cấp', 'Đầu mối dưới đây là đề xuất cho demo; tỉnh và Cục Thống kê phải xác nhận trước khi vận hành thật.');
    rows=[('GRDP · GO · IC · chỉ số giá','Cục Thống kê','Biên soạn và xác nhận phương pháp'),('Thuế sản phẩm','Cục Thuế','Dữ liệu thuế theo phạm vi thống nhất'),('Thuế nhập khẩu','Hải quan','Dữ liệu liên quan thuế nhập khẩu'),('Trợ cấp sản phẩm','Tài chính/Kho bạc','Xác nhận khoản trợ cấp sản phẩm'),('Sản lượng ngành','Sở chuyên ngành','Nông nghiệp · Công thương · Xây dựng · Dịch vụ')]
    for i,(a,b,d) in enumerate(rows): y=510-i*62; rect(c,90,y,1260,48,white); txt(c,a,115,y+17,15,navy,True); txt(c,b,620,y+17,15,blue,True); txt(c,d,870,y+17,14,muted)
    c.showPage()

    slide(c, 'Kiểm soát chất lượng', 'Không hiển thị số liệu nếu chưa đủ điều kiện', 'Lớp kiểm soát giúp phân biệt số kết quả, dữ liệu cần kết nối và cảnh báo nghiệp vụ.');
    for i,(h,d) in enumerate([('Đã có','Kết quả GRDP trong workbook'),('Cần kết nối','GO · IC · chỉ số giá · metadata'),('Cần tách riêng','Thuế sản phẩm và trợ cấp sản phẩm'),('Cần phê duyệt','Nguồn · phiên bản · địa giới · năm gốc')]): x=90+(i%2)*670; y=440-(i//2)*150; rect(c,x,y,600,112,white); txt(c,h,x+25,y+65,21,navy,True); txt(c,d,x+25,y+30,16,muted)
    c.showPage()

    slide(c, 'Màn hình dashboard GRDP', 'Theo dõi nhiều kỳ, truy vết đến dữ liệu nguồn', 'UI demo sử dụng workbook GRDP đã đánh dấu; bảng 128 bản ghi chỉ mở ở lớp chi tiết, không chiếm màn hình điều hành.');
    rect(c,90,270,1260,260,white); txt(c,'Quy mô GRDP',125,475,15,muted); txt(c,'46.568,22',125,430,34,navy,True); txt(c,'Tỷ đồng · Quý I/2025',125,400,14,muted); txt(c,'Tốc độ tăng',430,475,15,muted); txt(c,'7,28%',430,430,34,blue,True); txt(c,'Giá so sánh 2010',430,400,14,muted); txt(c,'Cơ cấu theo ngành',760,475,15,muted); txt(c,'Dịch vụ 20,5%',760,430,26,'#8B5CF6',True); txt(c,'Có thể drill-down',760,400,14,muted); txt(c,'Cảnh báo',1070,475,15,muted); txt(c,'3 điểm',1070,430,26,'#C37B1C',True); txt(c,'GO/IC · thuế · năm gốc',1070,400,14,muted); txt(c,'Bộ lọc: Quý | Giá hiện hành | Giá so sánh 2010 | Ngành',125,320,16,blue,True)
    c.showPage()
    c.save()

if __name__ == '__main__': build()
