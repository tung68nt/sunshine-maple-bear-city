'use client'

import { Fragment, type ReactNode } from 'react'
import {
  Accordion,
  Block,
  CallToAction,
  Fact,
  Grid,
  Heading,
  ImageText,
  Kicker,
  Lead,
  PageHero,
  PostCard,
  QuoteBand,
  Rows,
  SITE,
  Stack,
  Stat,
  StickyStats,
  StickySteps,
  Text,
  TextBlock,
  pickText,
  useSiteLanguage,
  type SiteLanguage,
} from '@/components/ds'
import type { PageSectionBlock } from '@/lib/supabase'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { staticPagesRegistry } from '@/lib/static-pages-data'

/**
 * Renders a page's `sectionsStack` with design-system blocks only (Rugby-style inner page).
 * The first HERO block is the page hero: pass `<SectionHero>` to `<PageShell hero>` and the
 * same stack to `<SectionRenderer>`, which then opens with that block's `Lead`.
 */

type Tone = 'cream' | 'sand'
type Action = { label: string; href: string; variant?: 'solid' | 'soft' | 'gold' }
type Point = { title?: string; text: string }

const R = SCHOOL_IMAGES.render

/** Photographs used where a block carries no `image_url` of its own. */
const PHOTOS = {
  lead: ['/images/home/intro.jpg', '/images/home/why-circle.jpg', '/images/home/curriculum-kids.jpg', '/images/academics/overview.jpg'],
  STATISTICS: '/images/home/why-net.jpg',
  FEATURES: '/images/canadian_curriculum_kids.jpg',
  NUTRITION: '/images/organic_kids_meal.jpg',
  FOUNDING_FAMILIES: '/images/smiling_founding_child.jpg',
  TEACHERS: '/images/teacher_child_learning.jpg',
  SAFEGUARDING: '/images/home/why-teacher.jpg',
  HEALTH_SAFETY: R.phongYTe2,
  TESTIMONIALS: '/images/school_entrance_team.jpg',
  BODY: '/images/academics/learn-circle.jpg',
}

/** Splits a stack into its page hero (the first HERO block, if any) and the blocks below it. */
export function splitHeroBlock(blocks: PageSectionBlock[] = []): { hero?: PageSectionBlock; rest: PageSectionBlock[] } {
  const at = blocks.findIndex((b) => b.type === 'HERO')
  if (at < 0) return { rest: blocks }
  return { hero: blocks[at], rest: blocks.filter((_, i) => i !== at) }
}

/** The data links to the enquiry form by its old anchor; the form now lives at `SITE.visitHref`. */
const link = (href: string | undefined, fallback: string) => {
  const url = href || fallback
  return url === '/#contact-us' ? SITE.visitHref : url
}

/** "Title: sentence." → { title, text }; a point without a short title stays whole. */
function toPoint(raw: string): Point {
  const at = raw.indexOf(': ')
  if (at > 0 && at <= 70) return { title: raw.slice(0, at).trim(), text: raw.slice(at + 2).trim() }
  return { text: raw.trim() }
}

const trimStop = (s: string) => s.replace(/\.$/, '')
const pad = (i: number) => String(i + 1).padStart(2, '0')

/**
 * Page hero for a data-driven page. `title` is the short page name set over the photograph
 * (the block's own, sentence-length title opens the page in the `Lead` below).
 */
export function SectionHero({ blocks, title, image }: { blocks: PageSectionBlock[]; title?: string; image?: string }) {
  const lang = useSiteLanguage()
  const { hero } = splitHeroBlock(blocks)
  const fallback = hero ? pickText(lang, hero.title_vi || hero.title, hero.title_en || hero.title) : ''
  return <PageHero title={title || fallback} image={hero?.image_url || image || R.thuVien1} />
}

/** Heading group + content inside one block: the frame for grids, rows and accordions. */
function Titled({ tone, kicker, title, text, children }: { tone: Tone; kicker?: string; title: string; text?: string; children?: ReactNode }) {
  return (
    <Block tone={tone}>
      <Stack gap="lg">
        <Stack>
          {kicker && <Kicker tone="gold">{kicker}</Kicker>}
          <Heading tone="deep" caps={false}>
            {title}
          </Heading>
          {text && <Text>{text}</Text>}
        </Stack>
        {children}
      </Stack>
    </Block>
  )
}

/** Grid of points: titled ones keep their title, the others are numbered. */
function Points({ points, cols }: { points: Point[]; cols?: 2 | 3 | 4 }) {
  if (!points.length) return null
  return (
    <Grid cols={cols ?? (points.length === 4 ? 4 : points.length === 2 ? 2 : 3)}>
      {points.map((p, i) => (
        <Fact key={i} delay={Math.min(i, 5) * 0.1} kicker={p.title ? pad(i) : undefined} title={p.title ?? pad(i)} text={p.text} />
      ))}
    </Grid>
  )
}

function renderBlock(block: PageSectionBlock, lang: SiteLanguage, tone: Tone, flip: boolean, stack: PageSectionBlock[], isPageHero: boolean): ReactNode {
  const t = (vi?: string | null, en?: string | null) => pickText(lang, vi, en)
  const title = (viFallback: string, enFallback: string) => t(block.title_vi || block.title || viFallback, block.title_en || block.title || enFallback)
  const body = (viFallback?: string, enFallback?: string) =>
    t(block.body_paragraph_vi || block.body_paragraph || viFallback, block.body_paragraph_en || block.body_paragraph || enFallback)
  const points = (fallback: string[] = []): Point[] => {
    const vi = block.feature_points_vi?.length ? block.feature_points_vi : block.feature_points
    const en = block.feature_points_en?.length ? block.feature_points_en : block.feature_points
    const chosen = lang === 'vi' ? vi || en : en || vi
    return (chosen?.length ? chosen : fallback).map(toPoint)
  }
  const photo = (fallback: string, alt: string) => ({ src: block.image_url || fallback, alt })
  // copy the registry already holds for the topic, used by blocks that only carry a title
  const topic = (path: string) => staticPagesRegistry[path]
  const tour: Action = { label: t('Đăng ký Tham quan Trường', 'Book a School Tour'), href: SITE.visitHref }

  switch (block.type) {
    case 'HERO': {
      const heading = title('', '')
      const sub = t(block.subheading_vi || block.subheading, block.subheading_en || block.subheading)
      const intro = t(block.intro_vi || block.intro, block.intro_en || block.intro)
      const actions: Action[] = [
        {
          label: t(block.cta_primary_text_vi || block.cta_primary_text || 'Đăng ký Tham quan Trường', block.cta_primary_text_en || block.cta_primary_text || 'Book a School Tour'),
          href: link(block.cta_primary_url, '/#contact-us'),
        },
        {
          label: t(
            block.cta_secondary_text_vi || block.cta_secondary_text || 'Khám phá Chương trình Học',
            block.cta_secondary_text_en || block.cta_secondary_text || 'Explore Academics'
          ),
          href: link(block.cta_secondary_url, '/academics/age-groups'),
          variant: 'soft',
        },
      ]
      const leadPhoto = PHOTOS.lead[stack.length % PHOTOS.lead.length]
      const hasStats = stack.some((b) => b.type === 'STATISTICS')
      return (
        <>
          <Lead
            kicker={t(block.tagline_vi || block.tagline || 'TRƯỜNG MẦM NON CHUẨN CANADA', block.tagline_en || block.tagline || 'CANADIAN INTERNATIONAL KINDERGARTEN')}
            title={heading}
            actions={actions}
            image={{ src: isPageHero ? leadPhoto : block.image_url || leadPhoto, alt: heading }}
          >
            {sub && (
              <p>
                <strong>{sub}</strong>
              </p>
            )}
            {intro && <p>{intro}</p>}
          </Lead>
          {!hasStats && (
            <Block tone="sand">
              <Grid cols={4}>
                <Stat tone="deep" value="500+" label={t('Trường Toàn cầu', 'Global Schools')} />
                <Stat tone="deep" value="37" label={t('Quốc gia Vận hành', 'Countries Worldwide')} />
                <Stat tone="deep" value="100%" label={t('Tiếng Anh Thẩm thấu', 'English Immersion')} />
                <Stat tone="deep" value="1:5" label={t('Tỷ lệ GV/Học sinh', 'Teacher-Student Ratio')} />
              </Grid>
            </Block>
          )}
        </>
      )
    }

    case 'STATISTICS': {
      const stats = block.stats_list || [
        { value: '500+', label_vi: 'Cơ sở Toàn cầu', label_en: 'Global Campuses', sub_vi: 'Tại 37 quốc gia phát triển', sub_en: 'Operating in 37 countries' },
        { value: '100%', label_vi: 'Giáo viên Bản ngữ OCT', label_en: 'Native OCT Educators', sub_vi: 'Cử nhân Sư phạm Canada', sub_en: 'Certified Canadian Bachelors' },
        { value: '1:5', label_vi: 'Tỷ lệ Chăm sóc Trẻ', label_en: 'Child Care Ratio', sub_vi: 'Đảm bảo an toàn tuyệt đối', sub_en: 'Ensuring total child focus' },
        { value: '100%', label_vi: 'Thực phẩm Organic 5 Sao', label_en: 'Organic 5-Star Meals', sub_vi: 'Bếp ăn 1 chiều kiểm định 24h', sub_en: '24h sample verified kitchen' },
      ]
      const heading = title('Con số Ấn tượng Về Sunshine Maple Bear', 'Sunshine Maple Bear Excellence by the Numbers')
      return (
        <StickyStats
          kicker={t('CHỨNG NHẬN & THÀNH TỰU ĐẲNG CẤP QUỐC TẾ', 'GLOBAL ACCREDITATION METRICS')}
          title={heading}
          image={photo(PHOTOS.STATISTICS, heading)}
          stats={stats.map((s) => ({ value: s.value, label: t(s.label_vi, s.label_en), text: t(s.sub_vi, s.sub_en) || undefined }))}
        />
      )
    }

    case 'FEATURES': {
      const list = points(
        lang === 'vi'
          ? [
              'Môi trường 100% Tiếng Anh thẩm thấu do giáo viên Canada đứng lớp.',
              'Cơ sở vật chất mầm non 5 sao hiện đại trong khu đô thị Sunshine City.',
              'Chế độ dinh dưỡng hữu cơ 5 sao thiết kế bởi bác sĩ nhi khoa.',
            ]
          : [
              '100% English Immersion environment led by Canadian certified educators.',
              'Modern 5-star facilities inside Sunshine City urban complex.',
              'Organic 5-star meal program designed by pediatric nutritionists.',
            ]
      )
      return (
        <Titled tone={tone} kicker={t('ĐẶC ĐIỂM NỔI BẬT', 'PEDAGOGICAL PILLARS')} title={title('Điểm Nổi bật Chương trình', 'Điểm Nổi bật Chương trình')} text={body() || undefined}>
          <Points points={list} />
        </Titled>
      )
    }

    case 'AGE_GROUPS': {
      const groups = [
        { stage: t('Lớp Nhà Trẻ (Toddler)', 'Toddler Class'), age: '12M – 24M', desc: t('Phát triển giác quan, vận động thô & gắn kết cảm xúc an toàn.', 'Sensory discovery, gross motor & emotional bonding.'), ratio: '1:4' },
        { stage: t('Lớp Mầm (Nursery)', 'Nursery Class'), age: '2Y – 3Y', desc: t('Đắm mình Tiếng Anh tự nhiên, phát triển vốn từ & giao tiếp phản xạ.', 'Natural English immersion, vocabulary & peer dialogue.'), ratio: '1:5' },
        { stage: t('Lớp Chồi (Junior K)', 'Junior Kindergarten'), age: '3Y – 4Y', desc: t('Ngữ âm Jolly Phonics, tư duy toán học logic & khám phá khoa học.', 'Jolly Phonics, mathematical logic & science discovery.'), ratio: '1:8' },
        { stage: t('Lớp Lá (Senior K)', 'Senior Kindergarten'), age: '4Y – 5Y', desc: t('Dự án STEAM nâng cao & chuẩn bị tâm thế vững vàng vào Lớp 1.', 'Advanced STEAM projects & Primary School readiness.'), ratio: '1:10' },
      ]
      return (
        <Titled
          tone={tone}
          kicker={t('LỘ TRÌNH PHÁT TRIỂN THEO ĐỘ TUỔI', 'AGE-APPROPRIATE LEARNING PROGRESSION')}
          title={title('Chương trình Mầm non Canada (12M – 5Y)', 'Chương trình Mầm non Canada (12M – 5Y)')}
          text={body('Lộ trình phát triển được thiết kế tỉ mỉ theo 4 giai đoạn chuẩn Canada.', 'Lộ trình phát triển được thiết kế tỉ mỉ theo 4 giai đoạn chuẩn Canada.')}
        >
          <Grid cols={4}>
            {groups.map((g, i) => (
              <Fact
                key={g.age}
                delay={i * 0.1}
                kicker={g.age}
                title={g.stage}
                text={
                  <>
                    <p>{g.desc}</p>
                    <p>
                      {t('Tỷ lệ GV/HS:', 'Staff Ratio:')} <strong>{g.ratio}</strong>
                    </p>
                  </>
                }
              />
            ))}
          </Grid>
        </Titled>
      )
    }

    case 'DAILY_SCHEDULE':
      return (
        <Titled
          tone={tone}
          kicker={t('THỜI KHÓA BIỂU & NHỊP SỐNG HÀNG NGÀY', 'DAILY RHYTHM & ROUTINE')}
          title={title('Thời khóa biểu Sinh hoạt & Học tập Hàng ngày', 'Thời khóa biểu Sinh hoạt & Học tập Hàng ngày')}
          text={body() || undefined}
        >
          <Rows
            rows={[
              { label: '07:30 - 08:30', value: t('Đón trẻ & Kiểm tra Sức khỏe Đầu giờ', 'Morning Health Check & Welcome Circle') },
              { label: '08:30 - 11:00', value: t('Jolly Phonics & Đắm mình Tiếng Anh', 'Jolly Phonics & English Immersion Discovery') },
              { label: '11:30 - 14:00', value: t('Ăn trưa Hữu cơ 5 Sao & Vệ sinh, Ngủ trưa', '5-Star Organic Lunch & Rest Time') },
              { label: '14:30 - 16:30', value: t('Khám phá STEAM & Thể thao ngoài trời', 'STEAM Activity & Outdoor Sports') },
              { label: '16:30 - 17:30', value: t('Trả trẻ & Báo cáo Nhật ký Ngày', 'Farewell Circle & Parent Handover') },
            ]}
          />
        </Titled>
      )

    case 'NUTRITION': {
      const heading = title('Chương trình Dinh dưỡng & Bữa ăn Organic 5 Sao', 'Chương trình Dinh dưỡng & Bữa ăn Organic 5 Sao')
      return (
        <>
          <ImageText tone={tone} reverse={flip} kicker={t('DINH DƯỠNG HỮU CƠ 5 SAO', '5-STAR ORGANIC NUTRITION')} title={heading} image={photo(PHOTOS.NUTRITION, heading)}>
            {body('Chế độ ăn đầy đủ dinh dưỡng hữu cơ được bác sĩ nhi khoa tư vấn.', 'Chế độ ăn đầy đủ dinh dưỡng hữu cơ được bác sĩ nhi khoa tư vấn.')}
          </ImageText>
          <Block tone={tone}>
            <Grid cols={3}>
              <Fact
                kicker={t('100% HỮU CƠ', '100% ORGANIC')}
                title={t('Nguồn Thực phẩm Hữu cơ', 'Certified Organic Farm')}
                text={t('Cung cấp từ nông trại hữu cơ kiểm định, tươi sống mỗi ngày.', 'Daily fresh delivery from accredited organic farms.')}
              />
              <Fact
                delay={0.1}
                kicker={t('CÂN BẰNG CALO', 'CALORIE BALANCED')}
                title={t('Thực đơn Bác sĩ Nhi khoa', 'Pediatric Dietitian Menu')}
                text={t('Tính toán lượng calo phù hợp từng độ tuổi phát triển.', 'Calorie-balanced meals designed for child growth.')}
              />
              <Fact
                delay={0.2}
                kicker={t('AN TOÀN TUYỆT ĐỐI', 'HYGIENE GUARANTEE')}
                title={t('Bếp ăn 1 Chiều 5 Sao', '5-Star Hygiene Standards')}
                text={t('Lưu mẫu thức ăn 24h và kiểm định vi sinh định kỳ.', '24-hour food sampling & microbiology audits.')}
              />
            </Grid>
          </Block>
        </>
      )
    }

    case 'FACILITIES': {
      const rooms = block.items_grid?.length
        ? block.items_grid.map((it) => ({ name: t(it.title_vi, it.title_en), desc: t(it.desc_vi, it.desc_en), img: it.image || R.thuVien1 }))
        : [
            { name: t('Thư viện Tiêu chuẩn Canada', 'Canadian Standard Library'), img: R.thuVien1, desc: t('Hơn 2,000 đầu sách ngoại văn chuẩn Maple Bear Canada.', 'Over 2,000 English children titles.') },
            { name: t('Phòng Học Hiện đại 5 Sao', 'Modern 5-Star Classrooms'), img: R.lopHoc1, desc: t('Ánh sáng tự nhiên, góc học tập STEAM & góc đắm mình Tiếng Anh.', 'Natural light, STEAM corners & English centers.') },
            { name: t('Phòng Y tế & Chăm sóc 5 Sao', '5-Star Medical Clinic'), img: R.phongYTe1, desc: t('Y sĩ thường trực, thiết bị sơ cứu & máy lọc không khí HEPA.', 'Registered nurses & HEPA air purification.') },
            { name: t('Khu Vui chơi Thể thao Ngoài trời', 'Outdoor Adventure Playground'), img: R.hanhLang1, desc: t('Sân cỏ nhân tạo an toàn & thiết bị phát triển thể chất.', 'Safe turf playground & physical play frames.') },
            { name: t('Bếp ăn 1 Chiều 5 Sao', '5-Star On-site Kitchen'), img: R.phongChucNang1, desc: t('Trang thiết bị inox 304 tiêu chuẩn khách sạn 5 sao.', 'Grade-304 stainless steel culinary gear.') },
            { name: t('Phòng Chức năng & Âm nhạc', 'STEAM & Performing Arts Studio'), img: R.thuVien3, desc: t('Đàn Piano, dụng cụ âm nhạc & góc thí nghiệm khoa học.', 'Pianos, instruments & science lab kits.') },
          ]
      const campus = t('Khu đô thị Sunshine City Hanoi', 'Sunshine City Campus')
      return (
        <Titled tone={tone} kicker={t('CƠ SỞ VẬT CHẤT 5 SAO', '5-STAR CAMPUS FACILITIES')} title={title('Không gian Học tập 5 Sao Sunshine City', 'Không gian Học tập 5 Sao Sunshine City')}>
          <Grid cols={3}>
            {rooms.map((room, i) => (
              <PostCard key={room.name} delay={(i % 3) * 0.1} href="/gallery" image={{ src: room.img, alt: room.name }} meta={campus} title={room.name} text={room.desc} />
            ))}
          </Grid>
        </Titled>
      )
    }

    case 'FOUNDING_FAMILIES': {
      const heading = title('Chương trình Phụ huynh Sáng lập 2026', 'Chương trình Phụ huynh Sáng lập 2026')
      return (
        <>
          <ImageText
            tone={tone}
            reverse={flip}
            kicker={t('ĐẶC QUYỀN PHỤ HUYNH SÁNG LẬP 2026', 'FOUNDING FAMILIES PRIVILEGE 2026')}
            title={heading}
            image={photo(PHOTOS.FOUNDING_FAMILIES, heading)}
            actions={[{ label: t('Chương trình Phụ huynh Sáng lập', 'Founding Families Program'), href: '/admissions/founding-families' }]}
          >
            {body('Gói ưu đãi đặc quyền dành cho 50 gia đình đăng ký đầu tiên.', 'Gói ưu đãi đặc quyền dành cho 50 gia đình đăng ký đầu tiên.')}
          </ImageText>
          <Block tone={tone}>
            <Grid cols={3}>
              <Fact title={t('GIẢM 20% HỌC PHÍ', '20% TUITION DISCOUNT')} text={t('Áp dụng trọn đời suốt quá trình bé theo học tại trường.', 'Lifetime discount for entire enrollment duration.')} />
              <Fact
                delay={0.1}
                title={t('MIỄN 100% PHÍ ĐẦU VÀO', '100% WAIVED ENTRANCE FEES')}
                text={t('Miễn phí CSVC & Phí xét tuyển (Trị giá 15.000.000 VNĐ).', 'Waived facility & assessment fee (15M VND value).')}
              />
              <Fact delay={0.2} title={t('BỘ ĐỒNG PHỤC CANADA', 'CANADIAN UNIFORM KIT')} text={t('Tặng bộ đồng phục & balo đón trẻ cao cấp.', 'Free Canadian uniform & backpack kit.')} />
            </Grid>
          </Block>
        </>
      )
    }

    case 'TUITION_TABLE': {
      const page = topic('/admissions/tuition')
      const rows = points(page?.featurePoints).map((p, i) => ({ label: p.title ?? pad(i), value: trimStop(p.text) }))
      return (
        <Titled
          tone={tone}
          kicker={t('BIỂU PHÍ HỌC PHÍ NĂM HỌC 2026 - 2027', page?.bannerTag)}
          title={title(page?.bodyTitle ?? '', page?.bodyTitle ?? '')}
          text={body(page?.bodyParagraph, page?.bodyParagraph) || undefined}
        >
          <Rows rows={rows} />
        </Titled>
      )
    }

    case 'CALENDAR': {
      const page = topic('/academics/calendar')
      const rows = points(page?.featurePoints).map((p, i) => {
        const text = trimStop(p.text)
        const note = text.match(/^(.*)\s\(([^)]+)\)$/)
        return { label: p.title ?? pad(i), value: note ? note[1] : text, note: note ? note[2] : undefined }
      })
      return (
        <Titled
          tone={tone}
          kicker={t('LỊCH HỌC TẬP NĂM HỌC 2026 - 2027', page?.bannerTag)}
          title={title(page?.bodyTitle ?? '', page?.bodyTitle ?? '')}
          text={body(page?.bodyParagraph, page?.bodyParagraph) || undefined}
        >
          <Rows rows={rows} />
        </Titled>
      )
    }

    case 'ADMISSIONS_PROCESS': {
      const page = topic('/admissions/process')
      const steps = points(page?.featurePoints).map((p, i) => ({
        title: trimStop(p.text),
        text: null,
        action: i === 0 ? { ...tour, variant: 'soft' as const } : undefined,
      }))
      return <StickySteps title={title(page?.bodyTitle ?? '', page?.bodyTitle ?? '')} intro={body(page?.bodyParagraph, page?.bodyParagraph) || undefined} steps={steps} />
    }

    case 'TEACHERS':
    case 'SAFEGUARDING':
    case 'HEALTH_SAFETY': {
      const page = topic(block.type === 'TEACHERS' ? '/about/teachers' : block.type === 'SAFEGUARDING' ? '/community/safeguarding' : '/community/health')
      const heading = title(page?.bodyTitle ?? '', page?.bodyTitle ?? '')
      const list = points(page?.featurePoints)
      return (
        <>
          <ImageText
            tone={tone}
            reverse={flip}
            kicker={t(undefined, page?.bannerTag)}
            title={heading}
            image={photo(PHOTOS[block.type], heading)}
            actions={block.type === 'TEACHERS' ? undefined : [tour]}
          >
            {body(page?.bodyParagraph, page?.bodyParagraph)}
          </ImageText>
          {list.length > 0 && (
            <Block tone={tone}>
              <Points points={list} />
            </Block>
          )}
        </>
      )
    }

    case 'TESTIMONIALS': {
      const heading = title('', '')
      return <QuoteBand image={photo(PHOTOS.TESTIMONIALS, heading)} quote={heading} attribution={t('Phụ huynh Sunshine Maple Bear', 'Sunshine Maple Bear parents')} />
    }

    case 'FAQ': {
      const heading = title('Câu hỏi Thường gặp', 'Frequently Asked Questions')
      const items = points().map((p) => {
        const raw = p.title ? `${p.title}: ${p.text}` : p.text
        const qa = raw.match(/^(.*?\?)\s*\((.*)\)\s*$/)
        return qa ? { question: qa[1], answer: <p>{qa[2]}</p> } : { question: raw, answer: null }
      })
      if (!items.length) {
        return (
          <TextBlock tone={tone} title={heading} actions={[{ label: t('Xem Câu hỏi Thường gặp', 'Read the FAQ'), href: '/faq' }, { ...tour, variant: 'soft' }]}>
            {`${t('Hotline Tuyển sinh', 'Admissions Hotline')}: ${SITE.phone}`}
          </TextBlock>
        )
      }
      return (
        <Titled tone={tone} title={heading} text={body() || undefined}>
          <Accordion items={items} />
        </Titled>
      )
    }

    case 'CTA':
      return (
        <CallToAction
          title={title('Sẵn sàng Đồng hành cùng Sunshine Maple Bear?', 'Sẵn sàng Đồng hành cùng Sunshine Maple Bear?')}
          text={t(
            block.intro_vi || block.intro || 'Trải nghiệm không gian học tập 5 sao chuẩn Canada cùng Giám đốc Tuyển sinh.',
            block.intro_en || block.intro || 'Trải nghiệm không gian học tập 5 sao chuẩn Canada cùng Giám đốc Tuyển sinh.'
          )}
          actions={[
            {
              label: t(block.cta_primary_text_vi || block.cta_primary_text || 'Đăng ký Tham quan Trường', block.cta_primary_text_en || block.cta_primary_text || 'Book a Campus Tour'),
              href: link(block.cta_primary_url, '/#contact-us'),
            },
            { label: `${t('Hotline Tuyển sinh', 'Admissions Hotline')}: ${SITE.phone}`, href: SITE.phoneHref },
          ]}
        />
      )

    case 'BODY': {
      const heading = title('', '')
      const list = points()
      if (!heading) return null
      return (
        <>
          <ImageText tone={tone} reverse={flip} title={heading} image={photo(PHOTOS.BODY, heading)}>
            {body()}
          </ImageText>
          {list.length > 0 && (
            <Block tone={tone}>
              <Points points={list} />
            </Block>
          )}
        </>
      )
    }

    default:
      return null
  }
}

/** Renders every block of a `sectionsStack` below the page hero. */
export function SectionRenderer({ blocks }: { blocks: PageSectionBlock[] }) {
  const lang = useSiteLanguage()
  if (!blocks?.length) return null
  const { hero } = splitHeroBlock(blocks)
  // the hero's Lead always opens the page; the other blocks keep their order and alternate tone / side
  const ordered = hero ? [hero, ...blocks.filter((b) => b !== hero)] : blocks
  let band = 0
  let side = 0
  const sided = new Set(['NUTRITION', 'FOUNDING_FAMILIES', 'TEACHERS', 'SAFEGUARDING', 'HEALTH_SAFETY', 'BODY'])
  const untoned = new Set(['HERO', 'STATISTICS', 'ADMISSIONS_PROCESS', 'TESTIMONIALS', 'CTA'])
  return (
    <>
      {ordered.map((block, i) => {
        const tone: Tone = untoned.has(block.type) ? 'cream' : band++ % 2 === 0 ? 'cream' : 'sand'
        const flip = sided.has(block.type) ? side++ % 2 === 1 : false
        return <Fragment key={block.id || i}>{renderBlock(block, lang, tone, flip, blocks, block === hero)}</Fragment>
      })}
    </>
  )
}
