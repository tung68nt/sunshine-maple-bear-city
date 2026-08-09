import { SCHOOL_IMAGES } from './constants'
import { PageSectionBlock } from './supabase'

export type StaticPageContent = {
  id: string
  path: string
  title: string
  category: 'ABOUT US' | 'ACADEMICS' | 'ADMISSIONS' | 'COMMUNITY'
  status: 'Published' | 'Draft'
  pageType?: 'SECTION_BUILDER' | 'BLOG_CONVERTED'
  convertedFromArticleId?: string
  convertedArticleAuthor?: string
  convertedArticleHtmlContent?: string
  lastUpdated: string
  bannerTag: string
  bannerTitle: string
  bannerSubheading: string
  bannerIntro: string
  bannerImage: string
  bodyTitle: string
  bodyParagraph: string
  featurePoints: string[]
  ctaPrimaryText: string
  ctaPrimaryUrl: string
  ctaSecondaryText: string
  ctaSecondaryUrl: string
  seoTitle: string
  seoDescription: string
  ogImage: string
  sectionsStack: PageSectionBlock[]
}

export const staticPagesRegistry: Record<string, StaticPageContent> = {
  '/about/story': {
    id: '1',
    path: '/about/story',
    title: 'Our Story & Canadian Heritage',
    category: 'ABOUT US',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '06/08/2026',
    bannerTag: 'ABOUT SUNSHINE MAPLE BEAR',
    bannerTitle: 'Our Story & Canadian Heritage',
    bannerSubheading: 'A Canadian Education for Life-Long Success',
    bannerIntro: 'Building a world-class early childhood education institution at Sunshine City, Hanoi.',
    bannerImage: SCHOOL_IMAGES.render.thuVien1,
    bodyTitle: 'Bringing World-Leading Canadian Preschool Education to Vietnam',
    bodyParagraph: 'Founded on the belief that every child deserves a strong educational foundation built on curiosity, respect, and joy, Sunshine Maple Bear International Kindergarten is an official member of the global Maple Bear Canada network. Located inside the modern Sunshine City urban complex, our campus offers a 5-star learning environment.',
    featurePoints: [
      'Official Canadian Curriculum designed by top early childhood education experts.',
      'Part of over 500 Maple Bear schools operating across 37 countries worldwide.',
      'Located within modern 5-star campus facilities in Sunshine City urban area.'
    ],
    ctaPrimaryText: 'Book a School Tour',
    ctaPrimaryUrl: '/#contact-us',
    ctaSecondaryText: 'Explore Academics',
    ctaSecondaryUrl: '/academics/age-groups',
    seoTitle: 'Our Story & Canadian Heritage | Sunshine Maple Bear Hanoi',
    seoDescription: 'Discover the history, vision, and Canadian early childhood education heritage of Sunshine Maple Bear Kindergarten in Hanoi.',
    ogImage: SCHOOL_IMAGES.render.thuVien1,
    sectionsStack: [
      {
        id: 'story-hero',
        type: 'HERO',
        tagline_vi: 'CÂU CHUYỆN & DI SẢN GIÁO DỤC CANADA',
        tagline_en: 'OUR STORY & CANADIAN HERITAGE',
        title_vi: 'Tầm nhìn & Di sản Giáo dục Canada Đẳng cấp Quốc tế',
        title_en: 'Canadian Educational Vision & Global Heritage',
        subheading_vi: 'Tại Sunshine City, Hà Nội',
        subheading_en: 'At Sunshine City, Hanoi',
        intro_vi: 'Sunshine Maple Bear tự hào là thành viên chính thức thuộc hệ thống giáo dục Maple Bear Toàn cầu (Canada). Với hơn 500 trường mầm non tại 37 quốc gia, chúng tôi mang tới không gian đắm mình Tiếng Anh 100% chuẩn Canada.',
        intro_en: 'Sunshine Maple Bear is an official member of Maple Bear Global Schools (Canada), operating 500+ campuses across 37 countries to deliver a 100% Canadian English immersion environment.'
      },
      {
        id: 'story-stats',
        type: 'STATISTICS',
        title_vi: 'Những Con số Ấn tượng Khẳng định Đẳng cấp',
        title_en: 'Global Excellence by the Numbers'
      },
      {
        id: 'story-features',
        type: 'FEATURES',
        title_vi: '3 Trụ cột Tạo nên Sự Khác biệt Triết lý Canada',
        title_en: 'The 3 Pillars of Maple Bear Excellence',
        feature_points_vi: [
          'Chương trình Giáo dục Mầm non Canada Bản quyền: Thiết kế bởi các chuyên gia hàng đầu từ Canada, cập nhật liên tục theo chuẩn quốc tế.',
          'Môi trường Đắm mình Tiếng Anh 100%: Trẻ thẩm thấu và phản xạ Tiếng Anh tự nhiên như ngôn ngữ mẹ đẻ cùng giáo viên bản ngữ.',
          'Cơ sở Vật chất 5 Sao Sunshine City: Hệ thống phòng học, thư viện, bếp ăn 1 chiều và sân chơi hiện đại bậc nhất.'
        ],
        feature_points_en: [
          'Authentic Canadian Early Childhood Curriculum designed by leading global educational experts.',
          '100% English Immersion environment developing natural bilingual fluency without translation pressure.',
          '5-Star Modern Campus Facilities located inside Sunshine City urban complex.'
        ]
      },
      {
        id: 'story-facilities',
        type: 'FACILITIES',
        title_vi: 'Không gian Học tập 5 Sao Chuẩn Quốc tế',
        title_en: '5-Star International Campus Facilities'
      },
      {
        id: 'story-teachers',
        type: 'TEACHERS',
        title_vi: 'Đội ngũ Giáo viên Quốc tế Được Kiểm định Bởi Canada',
        title_en: 'International Certified Canadian Faculty',
        body_paragraph_vi: '100% giáo viên bản ngữ sở hữu bằng cử nhân sư phạm và chứng chỉ dạy mầm non quốc tế. Đội ngũ liên tục tham gia các khóa đào tạo định kỳ trực tiếp từ Chuyên gia Kiểm định Chất lượng Maple Bear Canada.',
        body_paragraph_en: '100% of native English teachers hold university degrees in Early Childhood Education and undergo annual pedagogy audits by Maple Bear Canada QA Officers.'
      },
      {
        id: 'story-testimonials',
        type: 'TESTIMONIALS',
        title_vi: 'Cảm nhận Từ Phụ huynh Sunshine Maple Bear',
        title_en: 'Parent Experience & Testimonials'
      },
      {
        id: 'story-cta',
        type: 'CTA',
        title_vi: 'Trải nghiệm Thực tế Môi trường Mầm non 5 Sao',
        title_en: 'Experience Sunshine Maple Bear Firsthand',
        cta_primary_text_vi: 'Đăng ký Tham quan Trường',
        cta_primary_text_en: 'Book Campus Tour',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/about/why-maple-bear': {
    id: '2',
    path: '/about/why-maple-bear',
    title: 'Why Choose Maple Bear Canada',
    category: 'ABOUT US',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '05/08/2026',
    bannerTag: 'WHY MAPLE BEAR',
    bannerTitle: 'Why Choose Maple Bear Canada',
    bannerSubheading: 'World-Leading Early Childhood System',
    bannerIntro: 'Consistently ranked among the top early childhood education frameworks globally.',
    bannerImage: SCHOOL_IMAGES.render.lopHoc4,
    bodyTitle: 'The Canadian Educational Advantage',
    bodyParagraph: 'Canadian education is internationally renowned for its emphasis on student-centered learning, critical thinking, and holistic development. Maple Bear brings this world-leading methodology directly to Hanoi.',
    featurePoints: [
      '100% English Immersion environment developing natural bilingualism.',
      'Play-based and inquiry-based learning methodologies.',
      'Annual quality audits performed directly by Canadian Faculty QA experts.'
    ],
    ctaPrimaryText: 'Apply Now',
    ctaPrimaryUrl: '/#contact-us',
    ctaSecondaryText: 'View Tuition Fees',
    ctaSecondaryUrl: '/admissions/tuition',
    seoTitle: 'Why Choose Maple Bear | 100% English Canadian Kindergarten',
    seoDescription: 'Learn why Canadian early childhood education offers the best foundation for your child at Sunshine Maple Bear.',
    ogImage: SCHOOL_IMAGES.render.lopHoc4,
    sectionsStack: [
      {
        id: 'why-hero',
        type: 'HERO',
        tagline_vi: 'TẠI SAO CHỌN MAPLE BEAR CANADA',
        tagline_en: 'WHY CHOOSE MAPLE BEAR CANADA',
        title_vi: 'Ưu thế Vượt trội của Nền Giáo dục Mầm non Canada',
        title_en: 'The Canadian Advantage in Early Education',
        subheading_vi: 'Nuôi dưỡng Tư duy Phản biện & Lòng hiếu học Trọn đời',
        subheading_en: 'Nurturing Curiosity & Critical Thinking for Life',
        intro_vi: 'Nền giáo dục Canada luôn đứng top đầu thế giới theo bảng xếp hạng PISA toàn cầu. Maple Bear ứng dụng các phương pháp học tập qua trải nghiệm (Inquiry-based learning) và đắm mình Tiếng Anh giúp trẻ phát triển toàn diện.',
        intro_en: 'Canadian education consistently ranks at the top of PISA international benchmarks. Maple Bear implements play and inquiry-based learning to foster confident bilingual thinkers.'
      },
      {
        id: 'why-stats',
        type: 'STATISTICS',
        title_vi: 'Những Tiêu chuẩn Vàng tại Sunshine Maple Bear',
        title_en: 'Gold Standards of Sunshine Maple Bear'
      },
      {
        id: 'why-features',
        type: 'FEATURES',
        title_vi: 'Các Đặc quyền Phương pháp Giáo dục Canada',
        title_en: 'Canadian Pedagogical Advantages',
        feature_points_vi: [
          'Đắm mình Ngôn ngữ Tự nhiên: Trẻ tiếp thu Tiếng Anh không qua dịch thuật, phản xạ giao tiếp tự nhiên và linh hoạt.',
          'Học tập Qua Khám phá (Inquiry-based Learning): Đặt câu hỏi, làm thí nghiệm khoa học và tự giải quyết vấn đề dưới sự gợi mở của giáo viên.',
          'Kiểm định Chất lượng Định kỳ từ Canada: Chuyên gia từ Hội đồng Giáo dục Maple Bear trực tiếp dự giờ và kiểm định 24/7.'
        ],
        feature_points_en: [
          'Natural Language Immersion: Children absorb English naturally without translation pressure.',
          'Inquiry-Based Learning: Encouraging active questioning, experimentation, and problem solving.',
          'Canadian Global Faculty Audits: Regular unannounced quality checks from Canadian educators.'
        ]
      },
      {
        id: 'why-age-groups',
        type: 'AGE_GROUPS',
        title_vi: 'Khung Lộ trình Phát triển 4 Độ tuổi (12 Tháng - 5 Tuổi)',
        title_en: 'Tailored Developmental Pathways (12M - 5Y)',
        body_paragraph_vi: 'Chương trình được phân chia khoa học thành 4 độ tuổi tương ứng với từng giai đoạn phát triển tâm vận động và trí tuệ của trẻ.',
        body_paragraph_en: 'Our curriculum is structured into progressive age brackets matching child brain development stages.'
      },
      {
        id: 'why-faq',
        type: 'FAQ',
        title_vi: 'Giải đáp Thắc mắc về Phương pháp Đắm mình Tiếng Anh',
        title_en: 'Frequently Asked Questions about Canadian Immersion',
        feature_points_vi: [
          'Con chưa từng học Tiếng Anh thì có bắt kịp các bạn không? (Có! Phương pháp đắm mình giúp trẻ hòa nhập và thẩm thấu Tiếng Anh tự nhiên chỉ sau 2-4 tuần.)',
          'Tỷ lệ giáo viên trong một lớp mầm non là bao nhiêu? (Tỷ lệ 1:4 với lớp Nhà trẻ và 1:5 đến 1:10 với lớp Mẫu giáo.)',
          'Trường xử lý dị ứng ăn uống của trẻ như thế nào? (Bác sĩ dinh dưỡng thiết kế riêng thực đơn thay thế cho trẻ dị ứng thực phẩm.)'
        ],
        feature_points_en: [
          'Will my child understand English if we only speak Vietnamese at home? (Yes! Our 100% immersion methodology naturally develops bilingual comprehension in weeks.)',
          'What is the teacher-to-student ratio? (1:5 for Toddlers up to 1:8 for Kindergarten classes.)',
          'How do you handle dietary allergies? (Our 5-star nutritionist crafts customized meal options for all children with allergies.)'
        ]
      },
      {
        id: 'why-cta',
        type: 'CTA',
        title_vi: 'Đăng ký Tham quan & Tư vấn Trực tiếp cùng Ban Giám hiệu',
        title_en: 'Ready to Experience Maple Bear Difference?',
        cta_primary_text_vi: 'Đặt Lịch Tham quan',
        cta_primary_text_en: 'Schedule Tour',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/about/leadership': {
    id: '3',
    path: '/about/leadership',
    title: 'Academic Leadership & Board',
    category: 'ABOUT US',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '04/08/2026',
    bannerTag: 'ACADEMIC GOVERNANCE',
    bannerTitle: 'Academic Leadership & Board',
    bannerSubheading: 'Expert Canadian & Vietnamese Guidance',
    bannerIntro: 'Guided by experienced Canadian and Vietnamese education experts.',
    bannerImage: SCHOOL_IMAGES.render.vanPhong,
    bodyTitle: 'World-Class Educational Governance',
    bodyParagraph: 'Our leadership team brings together decades of international school principalship and early childhood education excellence.',
    featurePoints: [
      'Led by former Canadian school board principals & QA auditors.',
      'Comprehensive teacher training & continuous professional development.',
      'Direct governance oversight from Maple Bear Global Faculty.'
    ],
    ctaPrimaryText: 'Meet Our Teachers',
    ctaPrimaryUrl: '/about/teachers',
    ctaSecondaryText: 'View School Story',
    ctaSecondaryUrl: '/about/story',
    seoTitle: 'Academic Leadership & Board | Sunshine Maple Bear',
    seoDescription: 'Meet the Academic Director and School Leadership Board of Sunshine Maple Bear International Kindergarten.',
    ogImage: SCHOOL_IMAGES.render.vanPhong,
    sectionsStack: [
      {
        id: 'lead-hero',
        type: 'HERO',
        tagline_vi: 'BAN GIÁM HIỆU & HỘI ĐỒNG CỐ VẤN CANADA',
        tagline_en: 'ACADEMIC LEADERSHIP & ADVISORY BOARD',
        title_vi: 'Đội ngũ Lãnh đạo Giáo dục Chuyên nghiệp & Tâm huyết',
        title_en: 'World-Class Educational Leadership & Governance',
        subheading_vi: 'Kinh nghiệm Quản trị Trường Quốc tế Đa Quốc gia',
        subheading_en: 'Decades of International Educational Leadership',
        intro_vi: 'Ban Giám hiệu Sunshine Maple Bear quy tụ các cựu Hiệu trưởng trường mầm non Canada và các chuyên gia giáo dục hàng đầu Việt Nam, cam kết chất lượng đào tạo cao nhất.',
        intro_en: 'Our leadership team brings together former Canadian school board principals and Vietnamese early childhood leaders committed to international standards.'
      },
      {
        id: 'lead-teachers',
        type: 'TEACHERS',
        title_vi: 'Hội đồng Cố vấn Chuyên môn Maple Bear Canada',
        title_en: 'Canadian Academic Advisory Committee',
        body_paragraph_vi: 'Hội đồng chuyên môn Canada chịu trách nhiệm trực tiếp trong việc thẩm định giáo trình, giám sát chất lượng giảng dạy và cấp chứng chỉ đào tạo định kỳ cho toàn bộ đội ngũ giáo viên.',
        body_paragraph_en: 'The Canadian Advisory Panel directly oversees curriculum auditing, pedagogical alignment, and ongoing certification for all classroom teachers.'
      },
      {
        id: 'lead-safeguarding',
        type: 'SAFEGUARDING',
        title_vi: 'Cam kết Quản trị An toàn & Bảo vệ Trẻ em Canada',
        title_en: 'Canadian Child Safeguarding & Safety Governance',
        body_paragraph_vi: 'Mọi nhân sự trong trường đều phải trải qua quy trình kiểm tra lý lịch tư pháp nghiêm ngặt và tập huấn an toàn định kỳ hằng năm.',
        body_paragraph_en: 'Every staff member undergoes mandatory background checks and annual Canadian safeguarding certification.'
      },
      {
        id: 'lead-cta',
        type: 'CTA',
        title_vi: 'Gặp gỡ Ban Giám hiệu trong Ngày hội Tham quan Trường',
        title_en: 'Meet School Leadership at Open Day',
        cta_primary_text_vi: 'Hẹn Lịch Gặp Ban Giám Hiệu',
        cta_primary_text_en: 'Book Principal Meeting',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/about/teachers': {
    id: '4',
    path: '/about/teachers',
    title: 'International Educators & Team',
    category: 'ABOUT US',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '03/08/2026',
    bannerTag: 'OUR EDUCATORS',
    bannerTitle: 'International Educators & Team',
    bannerSubheading: 'Certified Early Childhood Specialists',
    bannerIntro: '100% of our teachers are Maple Bear Canada–certified early childhood specialists.',
    bannerImage: SCHOOL_IMAGES.render.lopHoc2,
    bodyTitle: 'Nurturing Educators & Specialists',
    bodyParagraph: 'Every classroom is led by native English educators paired with experienced bilingual co-teachers to ensure full safety and immersion.',
    featurePoints: [
      'Native English teachers certified in Early Childhood Education (ECE).',
      'Mandatory annual Maple Bear Canada pedagogy training.',
      'First-aid and pediatric CPR certified classroom staff.'
    ],
    ctaPrimaryText: 'Book a Tour',
    ctaPrimaryUrl: '/#contact-us',
    ctaSecondaryText: 'Our Curriculum',
    ctaSecondaryUrl: '/academics/age-groups',
    seoTitle: 'International Educators & Qualifications | Sunshine Maple Bear',
    seoDescription: 'Learn about our team of Canadian-certified native English educators and bilingual co-teachers.',
    ogImage: SCHOOL_IMAGES.render.lopHoc2,
    sectionsStack: [
      {
        id: 'teachers-hero',
        type: 'HERO',
        tagline_vi: 'ĐỘI NGŨ GIÁO VIÊN NĂNG ĐỘNG & NHIỆT HUYẾT',
        tagline_en: 'INTERNATIONAL EDUCATORS & FACULTY',
        title_vi: '100% Giáo viên Bản ngữ Đạt Chứng chỉ Sư phạm Quốc tế',
        title_en: '100% Certified Native English Educators',
        subheading_vi: 'Tình yêu Thương Trẻ & Trách nhiệm Hàng đầu',
        subheading_en: 'Nurturing Care & Uncompromising Responsibility',
        intro_vi: 'Mỗi lớp học tại Sunshine Maple Bear đều được dẫn dắt bởi Giáo viên Bản ngữ nói Tiếng Anh chuẩn (Anh, Mỹ, Canada, Úc) kết hợp cùng Trợ giảng Việt Nam giàu kinh nghiệm.',
        intro_en: 'Every classroom is co-led by a native English lead educator and a qualified bilingual co-teacher to ensure seamless care and immersion.'
      },
      {
        id: 'teachers-stats',
        type: 'STATISTICS',
        title_vi: 'Tiêu chuẩn Đào tạo Đội ngũ Sư phạm',
        title_en: 'Faculty Credentials & Standards'
      },
      {
        id: 'teachers-showcase',
        type: 'TEACHERS',
        title_vi: 'Bằng cấp & Chứng chỉ Chuyên môn Quốc tế',
        title_en: 'International Pedagogical Accreditations'
      },
      {
        id: 'teachers-testimonials',
        type: 'TESTIMONIALS',
        title_vi: 'Phụ huynh Nói gì Về Đội ngũ Giáo viên Sunshine Maple Bear',
        title_en: 'Parent Feedback on Our Teachers'
      },
      {
        id: 'teachers-cta',
        type: 'CTA',
        title_vi: 'Tham quan Lớp học & Trải nghiệm Giờ học Tiếng Anh Cùng Bé',
        title_en: 'Experience an English Class with Our Teachers',
        cta_primary_text_vi: 'Đăng ký Giờ học Mẫu',
        cta_primary_text_en: 'Book Trial Class',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/academics/age-groups': {
    id: '5',
    path: '/academics/age-groups',
    title: 'Early Childhood Programs (12M - 5Y)',
    category: 'ACADEMICS',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '02/08/2026',
    bannerTag: 'CURRICULUM STAGES',
    bannerTitle: 'Early Childhood Programs (12M – 5 Years)',
    bannerSubheading: 'Tailored Developmental Pathways',
    bannerIntro: 'Designed to nurture each developmental milestone from Toddler to Senior Kindergarten.',
    bannerImage: SCHOOL_IMAGES.render.lopHoc1,
    bodyTitle: 'Age-Appropriate Canadian Learning Stages',
    bodyParagraph: 'Our programs are carefully structured into four age groups: Toddler (12-24M), Nursery (2-3Y), Junior Kindergarten (3-4Y), and Senior Kindergarten (4-5Y).',
    featurePoints: [
      'Jolly Phonics stage foundation for natural reading & writing.',
      'STEAM Science discovery and mathematical logic development.',
      'Seamless transition into international primary schools.'
    ],
    ctaPrimaryText: 'Book a Tour',
    ctaPrimaryUrl: '/#contact-us',
    ctaSecondaryText: 'Daily Schedule',
    ctaSecondaryUrl: '/academics/daily-schedule',
    seoTitle: 'Early Childhood Programs (12M - 5Y) | Sunshine Maple Bear',
    seoDescription: 'Explore Canadian kindergarten age-appropriate programs for Toddler, Nursery, JK, and SK at Sunshine Maple Bear.',
    ogImage: SCHOOL_IMAGES.render.lopHoc1,
    sectionsStack: [
      {
        id: 'age-hero',
        type: 'HERO',
        tagline_vi: 'CHƯƠNG TRÌNH HỌC THEO ĐỘ TUỔI (12 THÁNG - 5 TUỔI)',
        tagline_en: 'EARLY CHILDHOOD PROGRAMS (12M - 5Y)',
        title_vi: 'Lộ trình Giáo dục Mầm non Canada Phù hợp Từng Giai đoạn',
        title_en: 'Tailored Canadian Early Childhood Pathways',
        subheading_vi: 'Từ Nhà Trẻ Đến Lớp Lá Chuẩn bị Hành trang Lớp 1',
        subheading_en: 'From Toddler to Primary School Readiness',
        intro_vi: 'Chương trình được thiết kế chuẩn khoa học theo 4 khối độ tuổi: Nhà Trẻ Toddler (12-24M), Mầm Nursery (2-3Y), Chồi Junior K (3-4Y) và Lá Senior K (4-5Y).',
        intro_en: 'Four progressive age pathways covering Toddler (12-24M), Nursery (2-3Y), Junior Kindergarten (3-4Y), and Senior Kindergarten (4-5Y).'
      },
      {
        id: 'age-groups-showcase',
        type: 'AGE_GROUPS',
        title_vi: 'Chi tiết Chương trình & Tỷ lệ Chăm sóc Theo Khối Lớp',
        title_en: 'Detailed Curriculum Focus & Teacher Ratios'
      },
      {
        id: 'age-daily',
        type: 'DAILY_SCHEDULE',
        title_vi: 'Nhịp Sinh hoạt Hàng ngày 07:30 AM – 05:30 PM',
        title_en: 'Daily Activity Flow & Rhythm'
      },
      {
        id: 'age-tuition',
        type: 'TUITION_TABLE',
        title_vi: 'Biểu phí Học phí Niêm yết Theo Độ tuổi Năm học 2026',
        title_en: 'Transparent Fee Structure by Age Group'
      },
      {
        id: 'age-cta',
        type: 'CTA',
        title_vi: 'Đăng ký Tư vấn Lớp học Phù hợp Cho Con Bạn',
        title_en: 'Book a Class Tour for Your Child',
        cta_primary_text_vi: 'Đăng ký Tham quan Lớp học',
        cta_primary_text_en: 'Book Class Visit',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/academics/daily-schedule': {
    id: '6',
    path: '/academics/daily-schedule',
    title: 'Daily Activity Flow & Routine',
    category: 'ACADEMICS',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '01/08/2026',
    bannerTag: 'DAILY FLOW',
    bannerTitle: 'Daily Activity Flow & Routine',
    bannerSubheading: 'Balanced Rhythm of Learning & Rest',
    bannerIntro: 'A balanced daily rhythm designed for active engagement, rest, and joyful learning.',
    bannerImage: SCHOOL_IMAGES.render.hanhLang1,
    bodyTitle: 'Structured Daily Experience',
    bodyParagraph: 'From morning health check and Jolly Phonics circle time to organic lunch, outdoor sports, and story reflection.',
    featurePoints: [
      'Circle time & Jolly Phonics interactive stories.',
      'Outdoor physical play at 5-star campus playground.',
      'Quiet nap time with classical background music.'
    ],
    ctaPrimaryText: 'View Nutrition Plan',
    ctaPrimaryUrl: '/academics/nutrition',
    ctaSecondaryText: 'Book a Tour',
    ctaSecondaryUrl: '/#contact-us',
    seoTitle: 'Daily Activity Flow & Routine | Sunshine Maple Bear',
    seoDescription: 'See a full daily schedule of activities, meals, learning centers, and rest time at Sunshine Maple Bear.',
    ogImage: SCHOOL_IMAGES.render.hanhLang1,
    sectionsStack: [
      {
        id: 'daily-hero',
        type: 'HERO',
        tagline_vi: 'THỜI KHÓA BIỂU & NHỊP SỐNG HÀNG NGÀY',
        tagline_en: 'DAILY RHYTHM & ROUTINE',
        title_vi: 'Nhịp Sinh hoạt Hàng ngày Cân bằng & Trập trùng Niềm vui',
        title_en: 'A Joyful Rhythm of Active Learning & Rest',
        subheading_vi: 'Từ 07:30 Sáng Đến 05:30 Chiều',
        subheading_en: 'From 07:30 AM to 05:30 PM',
        intro_vi: 'Trẻ phát triển tốt nhất trong một môi trường có nhịp điệu sinh hoạt ổn định, kết hợp hài hòa giữa khám phá trí tuệ, vận động thể chất và nghỉ ngơi dinh dưỡng 5 sao.',
        intro_en: 'Children thrive in a structured daily rhythm combining intellectual discovery, outdoor sports, organic nutrition, and peaceful rest.'
      },
      {
        id: 'daily-schedule-showcase',
        type: 'DAILY_SCHEDULE',
        title_vi: 'Lịch trình Sinh hoạt Chi tiết Trong Ngày',
        title_en: 'Hourly Activity Breakdown'
      },
      {
        id: 'daily-nutrition',
        type: 'NUTRITION',
        title_vi: 'Chế độ Dinh dưỡng Hữu cơ 5 Sao Bổ sung Năng lượng',
        title_en: '5-Star Organic Meals Fueling Growing Bodies'
      },
      {
        id: 'daily-faq',
        type: 'FAQ',
        title_vi: 'Nội quy Đón Trả Trẻ & Quy định Y tế Tại Trường',
        title_en: 'Drop-off & Pick-up Guidelines'
      },
      {
        id: 'daily-cta',
        type: 'CTA',
        title_vi: 'Trải nghiệm Một Buổi Sáng Học tập Cùng Học sinh Sunshine Maple Bear',
        title_en: 'Experience a Morning at Sunshine Maple Bear',
        cta_primary_text_vi: 'Hẹn Lịch Dự Giờ Học',
        cta_primary_text_en: 'Book Morning Observation',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/academics/nutrition': {
    id: '7',
    path: '/academics/nutrition',
    title: 'Nutrition & Meal Program',
    category: 'ACADEMICS',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '30/07/2026',
    bannerTag: 'HEALTH & WELL-BEING',
    bannerTitle: 'Nutrition & Meal Program',
    bannerSubheading: '5-Star Organic Culinary Standards',
    bannerIntro: 'Organic, balanced meals designed by pediatric nutritionists for healthy growing bodies.',
    bannerImage: SCHOOL_IMAGES.render.phongChucNang1,
    bodyTitle: 'Organic Nutrition & Food Safety',
    bodyParagraph: 'Our full-day meal service includes Morning Snack, Balanced Lunch, Afternoon Refreshment, and Milk Time.',
    featurePoints: [
      '100% certified organic ingredients from accredited farms.',
      'Calorie-balanced menus tailored by pediatric nutritionists.',
      'Strict 5-star kitchen hygiene and food safety standards.'
    ],
    ctaPrimaryText: 'Explore Campus Health',
    ctaPrimaryUrl: '/community/health',
    ctaSecondaryText: 'Book a Visit',
    ctaSecondaryUrl: '/#contact-us',
    seoTitle: 'Nutrition & Meal Program | Sunshine Maple Bear Kindergarten',
    seoDescription: 'Learn about our 5-star organic nutrition program and daily meal schedule for children.',
    ogImage: SCHOOL_IMAGES.render.phongChucNang1,
    sectionsStack: [
      {
        id: 'nut-hero',
        type: 'HERO',
        tagline_vi: 'CHẾ ĐỘ DINH DƯỠNG HỮU CƠ 5 SAO',
        tagline_en: '5-STAR ORGANIC NUTRITION PROGRAM',
        title_vi: '100% Thực phẩm Hữu cơ Organic Kiểm định Tươi Sống Mỗi Ngày',
        title_en: '100% Certified Organic Ingredients & Meals',
        subheading_vi: 'Thực đơn Tính toán Calo Bởi Bác sĩ Dinh dưỡng Nhi khoa',
        subheading_en: 'Pediatric Dietitian Curated Calorie Menus',
        intro_vi: 'Tại Sunshine Maple Bear, bữa ăn của trẻ là một phần quan trọng trong lộ trình phát triển thể chất. Chúng tôi cam kết sử dụng 100% thực phẩm organic từ nông trại kiểm định.',
        intro_en: 'Nutrition is a core pillar of child development. We use 100% certified organic ingredients prepared in our 5-star kitchen.'
      },
      {
        id: 'nut-showcase',
        type: 'NUTRITION',
        title_vi: 'Tiêu chuẩn Bếp ăn 1 Chiều 5 Sao & Thực đơn Mẫu',
        title_en: '5-Star Kitchen Hygiene & Daily Sample Menu'
      },
      {
        id: 'nut-facilities',
        type: 'FACILITIES',
        title_vi: 'Hạ tầng Bếp ăn & Không gian Ăn uống 5 Sao',
        title_en: '5-Star On-site Kitchen Facilities'
      },
      {
        id: 'nut-cta',
        type: 'CTA',
        title_vi: 'Đăng ký Nếm thử Thực đơn Dinh dưỡng Hữu cơ Cho Bé',
        title_en: 'Schedule a Meal Tasting Visit',
        cta_primary_text_vi: 'Đăng ký Tham quan & Nếm thử',
        cta_primary_text_en: 'Book Tasting Visit',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/academics/calendar': {
    id: '8',
    path: '/academics/calendar',
    title: '2026-2027 Academic Year Calendar',
    category: 'ACADEMICS',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '28/07/2026',
    bannerTag: 'ACADEMIC SCHEDULE',
    bannerTitle: 'Academic Year Calendar 2026–2027',
    bannerSubheading: 'Important School Terms & Events',
    bannerIntro: 'Important term dates, holidays, cultural events, and graduation ceremonies.',
    bannerImage: SCHOOL_IMAGES.render.thuVien2,
    bodyTitle: '4 Academic School Terms',
    bodyParagraph: 'Our school year runs from August through July, divided into four terms featuring STEAM fairs, concert performances, and cultural celebrations.',
    featurePoints: [
      'Term 1: August 18, 2026 – October 30, 2026 (Fall Semester).',
      'Term 2: November 02, 2026 – January 22, 2027 (Winter Semester).',
      'Term 3 & 4: Spring STEAM Discovery & Summer Immersion.'
    ],
    ctaPrimaryText: 'Download PDF Calendar',
    ctaPrimaryUrl: '#',
    ctaSecondaryText: 'Apply Now',
    ctaSecondaryUrl: '/#contact-us',
    seoTitle: '2026-2027 Academic Year Calendar | Sunshine Maple Bear',
    seoDescription: 'Download the official 2026-2027 academic year calendar with term dates, holidays, and events.',
    ogImage: SCHOOL_IMAGES.render.thuVien2,
    sectionsStack: [
      {
        id: 'cal-hero',
        type: 'HERO',
        tagline_vi: 'LỊCH HỌC TẬP NĂM HỌC 2026 - 2027',
        tagline_en: 'ACADEMIC YEAR CALENDAR 2026-2027',
        title_vi: '4 Học kỳ Rực rỡ Sự kiện Khám phá & Lễ hội Văn hóa',
        title_en: '4 Academic Terms Rich in Discovery & Festivals',
        subheading_vi: 'Từ Tháng 8/2026 Đến Tháng 7/2027',
        subheading_en: 'From August 2026 to July 2027',
        intro_vi: 'Năm học tại Sunshine Maple Bear được thiết kế trọn vẹn với các sự kiện trải nghiệm STEAM, đại hội thể thao, ngày hội dã ngoại và Lễ tốt nghiệp trang trọng.',
        intro_en: 'Our academic calendar spans four dynamic terms packed with STEAM discovery fairs, sports events, and graduation concerts.'
      },
      {
        id: 'cal-showcase',
        type: 'CALENDAR',
        title_vi: 'Chi tiết Thời gian 4 Học kỳ & Sự kiện Trọng tâm',
        title_en: '4 Terms Breakdown & Milestone Dates'
      },
      {
        id: 'cal-process',
        type: 'ADMISSIONS_PROCESS',
        title_vi: 'Quy trình Đăng ký Nhập học Chuẩn bị Cho Học kỳ Mới',
        title_en: '4-Step Admissions Application Journey'
      },
      {
        id: 'cal-cta',
        type: 'CTA',
        title_vi: 'Nộp Hồ sơ Ngay Hôm nay Để Giữ Chỗ Cho Năm Học 2026-2027',
        title_en: 'Apply Now for Academic Year 2026-2027',
        cta_primary_text_vi: 'Đăng ký Tuyển sinh Ngay',
        cta_primary_text_en: 'Apply Online',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/admissions/process': {
    id: '9',
    path: '/admissions/process',
    title: 'Admissions Process & Guidelines',
    category: 'ADMISSIONS',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '25/07/2026',
    bannerTag: 'ADMISSIONS GUIDE',
    bannerTitle: 'Admissions Process & Guidelines',
    bannerSubheading: 'Step-by-Step Enrollment Journey',
    bannerIntro: 'Step-by-step guidance to welcome your child into Sunshine Maple Bear.',
    bannerImage: SCHOOL_IMAGES.render.lopHoc3,
    bodyTitle: 'Simple 4-Step Application Flow',
    bodyParagraph: 'We welcome children from 12 months to 5 years old. Our admissions process is designed to be supportive, clear, and convenient.',
    featurePoints: [
      'Step 1: Submit online enquiry / Book a campus tour.',
      'Step 2: Campus visit & Academic consultation.',
      'Step 3: Gentle child play observation.',
      'Step 4: Formal enrollment & welcome kit.'
    ],
    ctaPrimaryText: 'Start Application',
    ctaPrimaryUrl: '/#contact-us',
    ctaSecondaryText: 'View Tuition Fees',
    ctaSecondaryUrl: '/admissions/tuition',
    seoTitle: 'Admissions Process & Enrollment Guide | Sunshine Maple Bear',
    seoDescription: 'Read our 4-step admissions guide for enrolling your child at Sunshine Maple Bear Kindergarten.',
    ogImage: SCHOOL_IMAGES.render.lopHoc3,
    sectionsStack: [
      {
        id: 'adm-hero',
        type: 'HERO',
        tagline_vi: 'HƯỚNG DẪN QUY TRÌNH TUYỂN SINH MẦM NON',
        tagline_en: 'ADMISSIONS & ENROLLMENT GUIDELINES',
        title_vi: '4 Bước Nhập học Đơn giản & Ấm áp Cho Gia đình Bạn',
        title_en: 'Simple 4-Step Enrollment Journey',
        subheading_vi: 'Chào đón Trẻ từ 12 Tháng Đến 5 Tuổi',
        subheading_en: 'Welcoming Children 12 Months to 5 Years',
        intro_vi: 'Quy trình tuyển sinh tại Sunshine Maple Bear được thiết kế chu đáo, tận tình nhằm giúp cha mẹ hiểu rõ môi trường học tập và giúp bé hòa nhập tự nhiên nhất.',
        intro_en: 'Our admissions process is supportive, clear, and designed to guide families seamlessly into our school community.'
      },
      {
        id: 'adm-process-showcase',
        type: 'ADMISSIONS_PROCESS',
        title_vi: 'Quy trình Tuyển sinh 4 Bước Chi tiết',
        title_en: '4-Step Application Roadmap'
      },
      {
        id: 'adm-tuition',
        type: 'TUITION_TABLE',
        title_vi: 'Biểu phí Học phí & Dịch vụ Năm học 2026 - 2027',
        title_en: 'Tuition Fee Structure 2026-2027'
      },
      {
        id: 'adm-founding',
        type: 'FOUNDING_FAMILIES',
        title_vi: 'Chương trình Ưu đãi Phụ huynh Sáng lập (Giảm 20% Trọn đời)',
        title_en: 'Founding Families Special Incentive (20% Lifetime Discount)'
      },
      {
        id: 'adm-cta',
        type: 'CTA',
        title_vi: 'Bắt đầu Hành trình Học tập Tuyệt vời Cho Bé ngay Hôm nay',
        title_en: 'Start Your Child’s Educational Journey Today',
        cta_primary_text_vi: 'Gửi Đăng ký Tham quan',
        cta_primary_text_en: 'Book School Tour',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/admissions/tuition': {
    id: '10',
    path: '/admissions/tuition',
    title: 'Tuition Fee Structure 2026',
    category: 'ADMISSIONS',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '20/07/2026',
    bannerTag: 'TUITION & FEES 2026-2027',
    bannerTitle: 'Tuition Fee Structure',
    bannerSubheading: 'Transparent All-Inclusive Fees',
    bannerIntro: 'Transparent international standard fee schedule with all-inclusive inclusions.',
    bannerImage: SCHOOL_IMAGES.render.phongChucNang1,
    bodyTitle: 'All-Inclusive Canadian Kindergarten Fee Schedule',
    bodyParagraph: 'Tuition fees cover full-day English immersion, organic meal service, learning kits, and facility access.',
    featurePoints: [
      'Toddler Program (12M-24M): 14,500,000 VND / Month.',
      'Nursery Program (2Y-3Y): 15,800,000 VND / Month.',
      'Kindergarten Program (3Y-5Y): 17,200,000 VND / Month.'
    ],
    ctaPrimaryText: 'Register Founding Family',
    ctaPrimaryUrl: '/admissions/founding-families',
    ctaSecondaryText: 'Contact Admissions',
    ctaSecondaryUrl: '/#contact-us',
    seoTitle: 'Tuition Fees 2026-2027 | Sunshine Maple Bear Kindergarten',
    seoDescription: 'View the official tuition fee structure and Founding Family incentives for Sunshine Maple Bear Kindergarten Hanoi.',
    ogImage: SCHOOL_IMAGES.render.phongChucNang1,
    sectionsStack: [
      {
        id: 'tui-hero',
        type: 'HERO',
        tagline_vi: 'BIỂU PHÍ HỌC PHÍ NĂM HỌC 2026 - 2027',
        tagline_en: 'TUITION & FEES STRUCTURE 2026-2027',
        title_vi: 'Biểu phí Minh bạch Chuẩn Quốc tế Trọn gói Dịch vụ 5 Sao',
        title_en: 'Transparent International Standard Fee Schedule',
        subheading_vi: 'Đã Bao gồm Ăn uống Hữu cơ & Giáo trình Canada',
        subheading_en: 'Includes Organic Meals & Canadian Learning Kits',
        intro_vi: 'Học phí tại Sunshine Maple Bear đã bao gồm toàn bộ chương trình đắm mình Tiếng Anh, bữa ăn hữu cơ, giáo trình học tập, dã ngoại và hoạt động sự kiện.',
        intro_en: 'Tuition fees cover full-day English immersion, organic meal service, learning kits, field trips, and campus access.'
      },
      {
        id: 'tui-table-showcase',
        type: 'TUITION_TABLE',
        title_vi: 'Chi tiết Bảng Học phí Mầm non Theo Khối Lớp',
        title_en: 'Detailed Tuition Breakdown by Age Group'
      },
      {
        id: 'tui-founding',
        type: 'FOUNDING_FAMILIES',
        title_vi: 'Đặc quyền Phụ huynh Sáng lập (Ưu đãi 20% Học phí Trọn đời)',
        title_en: 'Founding Families Special Incentive (20% Lifetime Discount)'
      },
      {
        id: 'tui-nutrition',
        type: 'NUTRITION',
        title_vi: 'Dịch vụ Dinh dưỡng Hữu cơ 5 Sao Đi kèm Trong Học phí',
        title_en: '5-Star Organic Meals Included in Tuition'
      },
      {
        id: 'tui-cta',
        type: 'CTA',
        title_vi: 'Nhận Báo giá Chi tiết & Đăng ký Suất Ưu đãi Sáng lập',
        title_en: 'Get Detailed Tuition Consultation & Founding Privileges',
        cta_primary_text_vi: 'Đăng ký Nhận Ưu đãi 20%',
        cta_primary_text_en: 'Claim 20% Discount',
        cta_primary_url: '/admissions/founding-families'
      }
    ]
  },

  '/admissions/founding-families': {
    id: '11',
    path: '/admissions/founding-families',
    title: 'Founding Families Special Incentive',
    category: 'ADMISSIONS',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '18/07/2026',
    bannerTag: 'EXCLUSIVE FOUNDING INCENTIVE',
    bannerTitle: 'Founding Families Program 2026',
    bannerSubheading: 'Lifetime Privileges for First 50 Families',
    bannerIntro: 'Special privilege package reserved for the first 50 registered families at Sunshine City Campus.',
    bannerImage: SCHOOL_IMAGES.render.thuVien3,
    bodyTitle: 'Exclusive Lifetime Benefits',
    bodyParagraph: 'As a Founding Family, you enjoy lifetime tuition discounts and waived application fees throughout your child’s enrollment.',
    featurePoints: [
      '20% Lifetime Tuition Discount for entire enrolment duration.',
      '100% Exemption of Facilities & Application Assessment Fee (15,000,000 VND value).',
      'Complimentary Canadian Uniform & Welcome Backpack Kit.'
    ],
    ctaPrimaryText: 'Claim Founding Family Spot',
    ctaPrimaryUrl: '/#contact-us',
    ctaSecondaryText: 'Admissions Guide',
    ctaSecondaryUrl: '/admissions/process',
    seoTitle: 'Founding Families Program 2026 | Sunshine Maple Bear',
    seoDescription: 'Discover exclusive 20% lifetime tuition discount and free facility fee for the first 50 Founding Families.',
    ogImage: SCHOOL_IMAGES.render.thuVien3,
    sectionsStack: [
      {
        id: 'ff-hero',
        type: 'HERO',
        tagline_vi: 'ĐẶC QUYỀN PHỤ HUYNH SÁNG LẬP SUNSHINE CITY CAMPUS',
        tagline_en: 'EXCLUSIVE FOUNDING FAMILIES PROGRAM 2026',
        title_vi: 'Ưu đãi Giảm 20% Học phí Trọn đời Dành Cho 50 Gia đình Tiên phong',
        title_en: 'Lifetime 20% Tuition Discount for First 50 Families',
        subheading_vi: 'Miễn 100% Phí Cơ sở Vật chất & Phí Xét tuyển (Trị giá 15 Triệu)',
        subheading_en: '100% Free Application & Facility Fees (15M VND Value)',
        intro_vi: 'Chương trình Phụ huynh Sáng lập là gói tri ân đặc biệt duy nhất dành cho 50 học sinh đầu tiên đăng ký nhập học tại Cơ sở Sunshine City.',
        intro_en: 'Exclusive founding privilege package reserved for the first 50 registered families joining our Sunshine City campus.'
      },
      {
        id: 'ff-showcase',
        type: 'FOUNDING_FAMILIES',
        title_vi: 'Chi tiết Các Đặc quyền Của Phụ huynh Sáng lập',
        title_en: 'Founding Families Special Incentive Package'
      },
      {
        id: 'ff-tuition',
        type: 'TUITION_TABLE',
        title_vi: 'So sánh Học phí Thường & Học phí Phụ huynh Sáng lập',
        title_en: 'Standard Tuition vs Founding Family Privilege Rates'
      },
      {
        id: 'ff-testimonials',
        type: 'TESTIMONIALS',
        title_vi: 'Cảm nhận Từ Các Phụ huynh Đã Đăng ký Nhập học Sớm',
        title_en: 'Reviews from Early Registered Founding Families'
      },
      {
        id: 'ff-cta',
        type: 'CTA',
        title_vi: 'Đăng ký Ngay Để Giữ 1 Trong 50 Suất Phụ huynh Sáng lập Mầm non 5 Sao',
        title_en: 'Claim 1 of 50 Founding Family Spots Today',
        cta_primary_text_vi: 'Giữ Suất Sáng lập 20%',
        cta_primary_text_en: 'Reserve Founding Spot',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/community/health': {
    id: '12',
    path: '/community/health',
    title: 'Health, Safety & Medical Policy',
    category: 'COMMUNITY',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '15/07/2026',
    bannerTag: 'HEALTH & SAFETY',
    bannerTitle: 'Health, Safety & Medical Protocol',
    bannerSubheading: 'Comprehensive Child Care Standards',
    bannerIntro: 'Comprehensive health monitoring, sanitization standards, and full-time medical care.',
    bannerImage: SCHOOL_IMAGES.render.phongYTe1,
    bodyTitle: '5-Star Medical Clinic & Care',
    bodyParagraph: 'Our full-time registered nurses conduct daily morning health checks and oversee strict campus sanitization.',
    featurePoints: [
      'Daily morning temperature and physical health checks upon arrival.',
      'Twice daily sanitization of all classrooms and toys.',
      'HEPA air purification and non-toxic organic cleaning.'
    ],
    ctaPrimaryText: 'Safeguarding Policy',
    ctaPrimaryUrl: '/community/safeguarding',
    ctaSecondaryText: 'Book a Tour',
    ctaSecondaryUrl: '/#contact-us',
    seoTitle: 'Health, Safety & Medical Policy | Sunshine Maple Bear',
    seoDescription: 'Read about our full-time medical clinic, daily health checks, and campus sanitization standards.',
    ogImage: SCHOOL_IMAGES.render.phongYTe1,
    sectionsStack: [
      {
        id: 'health-hero',
        type: 'HERO',
        tagline_vi: 'QUY TRÌNH Y TẾ & BẢO VỆ SỨC KHỎE 5 SAO',
        tagline_en: 'HEALTH, SAFETY & MEDICAL CARE PROTOCOL',
        title_vi: 'Phòng Y tế 5 Sao & Kiểm tra Sức khỏe Hàng ngày Cho Trẻ',
        title_en: '5-Star Medical Clinic & Daily Health Screening',
        subheading_vi: 'Y sĩ Thường trực & Máy Lọc Không khí HEPA Tại Tất cả Lớp Học',
        subheading_en: 'On-site Nurses & HEPA Purification in Every Class',
        intro_vi: 'Sức khỏe và sự an toàn của trẻ là ưu tiên hàng đầu tại Sunshine Maple Bear. Y sĩ chuyên khoa thường trực 24/7 kiểm tra sức khỏe đầu giờ và quản lý y tế nghiêm ngặt.',
        intro_en: 'Child safety and health is our paramount priority. Full-time registered nurses conduct daily morning checks and enforce hygiene protocols.'
      },
      {
        id: 'health-showcase',
        type: 'HEALTH_SAFETY',
        title_vi: 'Các Tiêu chuẩn Y tế & Khử khuẩn Không gian 5 Sao',
        title_en: '5-Star Campus Medical & Hygiene Standards'
      },
      {
        id: 'health-nutrition',
        type: 'NUTRITION',
        title_vi: 'Đảm bảo An toàn Thực phẩm & Kiểm định Mẫu Ăn 24h',
        title_en: 'Organic Food Safety & 24h Sample Verification'
      },
      {
        id: 'health-cta',
        type: 'CTA',
        title_vi: 'Tham quan Phòng Y tế 5 Sao & Trao đổi Cùng Y sĩ Trường',
        title_en: 'Tour Our Medical Clinic & Meet Campus Nurses',
        cta_primary_text_vi: 'Hẹn Lịch Tham quan Y tế',
        cta_primary_text_en: 'Book Health Tour',
        cta_primary_url: '/#contact-us'
      }
    ]
  },

  '/community/safeguarding': {
    id: '13',
    path: '/community/safeguarding',
    title: 'Child Safeguarding Standards',
    category: 'COMMUNITY',
    status: 'Published',
    pageType: 'SECTION_BUILDER',
    lastUpdated: '10/07/2026',
    bannerTag: 'CHILD PROTECTION',
    bannerTitle: 'Child Safeguarding Policy',
    bannerSubheading: 'Zero-Tolerance Child Protection',
    bannerIntro: 'Adhering strictly to Canadian International Child Safeguarding & Safety Standards.',
    bannerImage: SCHOOL_IMAGES.render.lopHoc4,
    bodyTitle: 'Canadian Child Safeguarding Commitment',
    bodyParagraph: 'All staff undergo background checks, credential verification, and mandatory annual safeguarding training.',
    featurePoints: [
      'Rigorous background checks & credential verification for all staff.',
      'Mandatory annual safeguarding & child protection training.',
      'Unannounced safety audits by Maple Bear Global Quality Faculty.'
    ],
    ctaPrimaryText: 'Contact School Leadership',
    ctaPrimaryUrl: '/about/leadership',
    ctaSecondaryText: 'Book a Tour',
    ctaSecondaryUrl: '/#contact-us',
    seoTitle: 'Child Safeguarding & Protection Policy | Sunshine Maple Bear',
    seoDescription: 'Learn about our zero-tolerance child safeguarding policy and Canadian safety audit standards.',
    ogImage: SCHOOL_IMAGES.render.lopHoc4,
    sectionsStack: [
      {
        id: 'sg-hero',
        type: 'HERO',
        tagline_vi: 'TIÊU CHUẨN AN TOÀN & BẢO VỆ TRẺ EM CANADA',
        tagline_en: 'CANADIAN CHILD SAFEGUARDING STANDARDS',
        title_vi: 'Chính sách Bảo vệ Trẻ em Zero-Tolerance Tuyệt đối',
        title_en: 'Zero-Tolerance Child Safeguarding Commitment',
        subheading_vi: 'An tâm Tuyệt đối Cho Cha Mẹ Mỗi Ngày',
        subheading_en: 'Complete Peace of Mind for Parents Every Day',
        intro_vi: 'Sunshine Maple Bear tuân thủ nghiêm ngặt Chính sách Bảo vệ Trẻ em Canada. 100% nhân sự trường đều trải qua thẩm định lý lịch tư pháp và huấn luyện an toàn chuyên sâu.',
        intro_en: 'Sunshine Maple Bear strictly enforces Canadian Child Protection Policies. All staff undergo background verifications and annual safeguarding training.'
      },
      {
        id: 'sg-showcase',
        type: 'SAFEGUARDING',
        title_vi: 'Các Quy tắc Bảo vệ Trẻ em & Thẩm định Nhân sự',
        title_en: 'Child Protection Protocols & Staff Vetting'
      },
      {
        id: 'sg-teachers',
        type: 'TEACHERS',
        title_vi: 'Đội ngũ Giáo viên Được Kiểm định An toàn Sư phạm',
        title_en: 'Vetted & First-Aid Certified International Faculty'
      },
      {
        id: 'sg-cta',
        type: 'CTA',
        title_vi: 'Tìm hiểu Thêm về Chính sách An toàn của Sunshine Maple Bear',
        title_en: 'Learn More About Our Safeguarding Commitment',
        cta_primary_text_vi: 'Liên hệ Ban Giám hiệu',
        cta_primary_text_en: 'Contact Leadership',
        cta_primary_url: '/about/leadership'
      }
    ]
  },

  '/test-page': {
    id: '14',
    path: '/test-page',
    title: 'Test Page - Converted Demo Page',
    category: 'ACADEMICS',
    status: 'Published',
    pageType: 'BLOG_CONVERTED',
    convertedFromArticleId: 'blog-1',
    convertedArticleAuthor: 'Maple Bear Academic Board',
    convertedArticleHtmlContent: '<p>Đây là nội dung gốc của bài viết tin tức được chuyển đổi thành Trang Tĩnh thông tin chính thức.</p>',
    lastUpdated: '08/08/2026',
    bannerTag: 'CONVERTED TEST PAGE DEMO',
    bannerTitle: 'English Immersion Excellence Page',
    bannerSubheading: 'Converted from Blog Article Demonstration',
    bannerIntro: 'This page was converted from a blog article to showcase live CMS page synchronization.',
    bannerImage: SCHOOL_IMAGES.render.lopHoc1,
    bodyTitle: 'Live CMS Synchronization Demonstration',
    bodyParagraph: 'Any edits saved in the CMS Admin for this Test Page will immediately reflect here live without rebuilding.',
    featurePoints: [
      'Fully editable from CMS Static Pages Editor (/admin/pages).',
      'Supports custom Hero Banners, Section Body, and Feature Highlights.',
      'Includes Technical SEO preview & Google Search snippet simulation.'
    ],
    ctaPrimaryText: 'Book a School Tour',
    ctaPrimaryUrl: '/#contact-us',
    ctaSecondaryText: 'Back to CMS Admin',
    ctaSecondaryUrl: '/admin/pages',
    seoTitle: 'Test Page - English Immersion | Sunshine Maple Bear',
    seoDescription: 'Live test page for verifying static page CMS editing and post-to-page conversion features.',
    ogImage: SCHOOL_IMAGES.render.lopHoc1,
    sectionsStack: [
      {
        id: 'test-hero',
        type: 'HERO',
        tagline_vi: 'DEMO TRANG CHUYỂN ĐỔI TỪ BÀI VIẾT',
        tagline_en: 'CONVERTED DEMO PAGE FROM BLOG ARTICLE',
        title_vi: 'Trang Mẫu Đồng bộ Trực tiếp CMS',
        title_en: 'Live CMS Synchronization Demo Page',
        subheading_vi: 'Hỗ trợ Cả Rich Text HTML & Cấu trúc Khối Section',
        subheading_en: 'Supports both Rich Text HTML & Section Block Stacks',
        intro_vi: 'Trang này được khởi tạo từ việc chuyển đổi một bài viết blog tin tức sang dạng trang tĩnh chính thức.',
        intro_en: 'This page demonstrates converting a blog post into a permanent static page with full CMS editing.'
      },
      {
        id: 'test-stats',
        type: 'STATISTICS',
        title_vi: 'Hiệu suất Đồng bộ Trực tiếp Dữ liệu CMS',
        title_en: 'Live Data Synchronization Metrics'
      },
      {
        id: 'test-features',
        type: 'FEATURES',
        title_vi: 'Các Tính năng Tùy chỉnh Linh hoạt Trong CMS',
        title_en: 'Flexible CMS Customization Features'
      },
      {
        id: 'test-cta',
        type: 'CTA',
        title_vi: 'Quay lại Bảng điều khiển Quản lý Trang Tĩnh CMS',
        title_en: 'Return to CMS Static Pages Manager',
        cta_primary_text_vi: 'Về Trang Admin CMS',
        cta_primary_text_en: 'Back to CMS Admin',
        cta_primary_url: '/admin/pages'
      }
    ]
  }
}

export function getStaticPageData(path: string): StaticPageContent {
  return staticPagesRegistry[path] || staticPagesRegistry['/about/story']
}
