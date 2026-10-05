import { Accordion, Block, Heading, Lead, PageHero, PageShell, Stack } from '@/components/ds'
import { SCHOOL_IMAGES } from '@/lib/constants'

const faqs = [
  {
    category: 'Chương Trình Học Canada',
    items: [
      {
        question: 'Chương trình học tại Sunshine Maple Bear có điểm gì khác biệt?',
        answer:
          'Sunshine Maple Bear áp dụng phương pháp thẩm thấu ngôn ngữ tiếng Anh 100% bản quyền từ Maple Bear Global Schools (Canada). Trẻ không học ngữ pháp lý thuyết mà học thông qua trải nghiệm góc sensory, nghệ thuật Atelier, vận động và tư duy phản biện.',
      },
      {
        question: 'Thời lượng sử dụng tiếng Anh tại trường như thế nào?',
        answer:
          'Học sinh chương trình Quốc tế được giao tiếp và thụ hưởng môi trường tiếng Anh 100% cả ngày cùng Giáo viên bản ngữ Canada có bằng cấp cử nhân sư phạm mầm non.',
      },
    ],
  },
  {
    category: 'Tuyển Sinh & Học Phí',
    items: [
      {
        question: 'Trẻ mấy tháng tuổi có thể đăng ký nhập học?',
        answer: 'Trường nhận học sinh từ 12 tháng tuổi (Lớp Mầm) cho đến 5 tuổi (Lớp Dự bị Tiểu học).',
      },
      {
        question: 'Học phí tại Sunshine Maple Bear đã bao gồm tiền ăn và dắt dâu chưa?',
        answer:
          'Học phí được niêm yết theo năm học. Phí tiền ăn, phí xe bus đưa đón và phí hoạt động ngoại khóa sẽ có biểu phí chi tiết kèm theo. Cư dân Sunshine City được hưởng ưu đãi đặc quyền.',
      },
    ],
  },
  {
    category: 'Dinh Dưỡng & An Toàn Học Đường',
    items: [
      {
        question: 'Thực đơn của trẻ được chuẩn bị như thế nào?',
        answer:
          'Nhà trường tự hào áp dụng tiêu chuẩn dinh dưỡng hữu cơ 5 sao khép kín. Thực đơn được tính toán calo chi tiết bởi chuyên gia dinh dưỡng, đảm bảo thực phẩm tươi sạch hàng ngày.',
      },
      {
        question: 'Nhà trường có dịch vụ xe bus đưa đón tại nhà không?',
        answer:
          'Có. Hệ thống xe bus học đường cao cấp được trang bị ghế an toàn, có sự giám sát 1:1 của cô quản xe và hệ thống định vị GPS theo dõi hành trình.',
      },
    ],
  },
]

/** FAQ: content only — every element comes from the design system. */
export default function FAQPage() {
  return (
    <PageShell
      hero={<PageHero title="Câu Hỏi Thường Gặp" image={SCHOOL_IMAGES.render.thuVien1} crumbs={[{ label: 'Trang chủ', href: '/' }]} />}
    >
      <Lead
        kicker="Danh Mục Trợ Giúp"
        title="Giải đáp thắc mắc phụ huynh"
        actions={faqs.map((cat, i) => ({ label: cat.category, href: `#cat-${i}`, variant: 'soft' as const }))}
      >
        Tổng hợp đầy đủ thông tin về chương trình học Canada, quy trình tuyển sinh và chế độ chăm sóc cho bé.
      </Lead>

      {faqs.map((cat, i) => (
        <Block key={cat.category} id={`cat-${i}`} tone={i % 2 === 0 ? 'sand' : 'cream'}>
          <Stack gap="lg">
            <Heading size="lg" tone="deep" caps={false}>
              {cat.category}
            </Heading>
            <Accordion items={cat.items} defaultOpen={i === 0 ? 0 : null} />
          </Stack>
        </Block>
      ))}
    </PageShell>
  )
}
