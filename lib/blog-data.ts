import { SCHOOL_IMAGES } from './constants';

export const MOCK_BLOG_POSTS = [
  {
    id: '1',
    title: 'Why Safety is the Foundation of Early Childhood Education at Sunshine City',
    excerpt: 'Discover how Maple Bear International Kindergarten ensures physical, emotional, and procedural safety to create a nurturing environment for your child.',
    content: `
      <p>When modern parents choose a prestigious kindergarten like Sunshine Maple Bear at Sunshine City, they are looking for much more than just a place to keep their children during the day. They are looking for absolute safety—a place where they can completely trust the school.</p>
      
      <h3>1. Physical Safety at the Highest Standards</h3>
      <p>For parents, physical safety is much more than locked gates. At Sunshine Maple Bear, our newly renovated modern campus is designed with safety at its core. From child-safe furniture and rounded edges to shock-absorbing surfaces in playgrounds, every detail is considered. We maintain strict controlled entrances, visitor sign-ins, and CCTV monitoring in public areas to ensure a secure perimeter at all times.</p>
      
      <h3>2. Emotional & Psychological Safety</h3>
      <p>True safety means a child feels emotionally secure enough to try new things and make mistakes. Our child-centered, respectful approach emphasizes positive discipline instead of punishment. Our teachers use supportive language, avoiding threats or labels. With small class-group structures, children feel known, noticed, and respected.</p>
      
      <h3>3. Procedural Safety & Consistency</h3>
      <p>Parents feel safer when they see clear policies and routines. We have strict protocols for incident reporting, allergy management, and supervision ratios. Every classroom follows global Maple Bear safety standards, ensuring that decision-making is systematic, not random.</p>
      
      <p><strong>Conclusion:</strong> Safety at Maple Bear International Kindergarten – Sunshine City is visible, systematic, and integrated. It forms the foundation of trust that allows children to learn and thrive.</p>
    `,
    category: 'Education',
    created_at: new Date('2026-05-10').toISOString(),
    featured_image: SCHOOL_IMAGES.render.hanhLang1,
    slug: 'safety-foundation',
  },
  {
    id: '2',
    title: 'Building Lifelong Healthy Habits: Our Nutrition and Hygiene Regime',
    excerpt: 'Learn how our scientific nutrition plans and daily health education help children build strong bodies and lifelong healthy habits.',
    content: `
      <p>A high-quality educational environment not only helps children learn but also supports long-term physical well-being. At Sunshine Maple Bear, health and nutrition are not just catering services—they are an integral part of our curriculum.</p>
      
      <h3>Scientific Nutrition Plans</h3>
      <p>We provide balanced meals designed specifically for young children, focusing on less sugar, less oil, and more fresh vegetables and fruits. Our menus are transparently shared with parents ahead of time, and our staff is fully trained to monitor allergies and special dietary needs.</p>
      
      <h3>Clean Environments & Hygiene Routines</h3>
      <p>Hygiene is built into our daily schedule. Children learn the importance of handwashing before meals and after outdoor play. Our cleaning protocols are strictly monitored by leadership to ensure classrooms and bathrooms remain spotless.</p>
      
      <h3>Health Education Through Experience</h3>
      <p>Instead of lectures, we integrate health education into fun, thematic units like "My Body" and "Healthy Food." Through stories and activities, children learn to take care of their bodies, stay active, and make healthy choices.</p>
    `,
    category: 'Nutrition',
    created_at: new Date('2026-05-08').toISOString(),
    featured_image: SCHOOL_IMAGES.render.phongYTe1,
    slug: 'health-and-nutrition',
  },
  {
    id: '3',
    title: 'Character Education: Raising Polite, Confident, and Empathetic Children',
    excerpt: 'How our Social-Emotional Learning (SEL) framework helps children develop respect, independence, and positive attitudes toward school.',
    content: `
      <p>Parents want their children to be academically successful, but they also want them to be kind, respectful, and well-adjusted. At Sunshine Maple Bear, shaping polite, emotionally secure children is a core part of our mission.</p>
      
      <h3>Positive Discipline Framework</h3>
      <p>We use clear expectations and logical consequences instead of punishment. Our teachers focus on guidance ("Let's try again") rather than blame, helping children understand the impact of their actions.</p>
      
      <h3>Social-Emotional Learning (SEL)</h3>
      <p>Through daily circle time, role-play, and engaging stories, children practice sharing, apologizing, and asking for help. They learn to express their feelings with words, build friendships, and develop empathy for others.</p>
      
      <h3>Fostering a Love for Learning</h3>
      <p>We want children to be excited to come to school. By encouraging curiosity and allowing children to explore without fear of making mistakes, we build a positive attitude toward learning that will last a lifetime.</p>
    `,
    category: 'Parenting Tips',
    created_at: new Date('2026-05-05').toISOString(),
    featured_image: SCHOOL_IMAGES.render.lopHoc2,
    slug: 'character-education',
  },
  {
    id: '4',
    title: 'The Canadian Immersion Methodology: 100% English Environment',
    excerpt: 'Why memorizing vocabulary isn\'t enough, and how our true immersion approach develops native-like fluency in young learners.',
    content: `
      <p>High-end parents expect serious English outcomes. At Maple Bear International Kindergarten – Sunshine City, we deliver a 100% English environment using the proven Canadian Immersion methodology.</p>
      
      <h3>Real Immersion, Not Just "English Class"</h3>
      <p>English is the language of our daily activities. Children acquire English naturally through conversations, stories, songs, and play. Instead of treating English as a separate subject, it becomes the medium for exploring science, math, and art.</p>
      
      <h3>Clear Progression and Outcomes</h3>
      <p>Our program offers a structured roadmap. Younger classes focus on listening comprehension and simple instructions. Middle classes build vocabulary and use English in play. Older classes engage in early reading, phonics, and retelling stories in full sentences.</p>
      
      <h3>Visible Progress</h3>
      <p>We believe in evidence-based learning. Parents can see their child's progress through daily reading activities, personalized portfolios, and clear reporting on English learning milestones.</p>
    `,
    category: 'Curriculum',
    created_at: new Date('2026-05-02').toISOString(),
    featured_image: SCHOOL_IMAGES.render.thuVien3,
    slug: 'english-immersion',
  },
  {
    id: '5',
    title: 'Building Trust Through Professional Parent Communication',
    excerpt: 'Communication is the bridge between school and home. Learn how we maintain transparent, respectful partnerships with our families.',
    content: `
      <p>A premium school is judged not only by its classrooms but by the professionalism and transparency of its communication. At Sunshine Maple Bear, parent partnership is one of our defining pillars.</p>
      
      <h3>Transparent & Frequent Updates</h3>
      <p>We provide weekly newsletters, monthly curriculum overviews, and transparent reporting on both academic progress and behavioral development. Parents are never left guessing about what their child is learning.</p>
      
      <h3>Professional Standards</h3>
      <p>Our teachers are trained in active listening, empathy, and non-reactive communication. Whether sharing a success or discussing a concern, our communication is always solutions-focused and respectful.</p>
      
      <h3>Active Parent Involvement</h3>
      <p>We invite parents to be part of the learning journey through workshops, guest reader days, and parent-teacher conferences. We believe that a child thrives best when the school and family share a common goal and trust each other deeply.</p>
    `,
    category: 'Education',
    created_at: new Date('2026-04-28').toISOString(),
    featured_image: SCHOOL_IMAGES.render.vanPhong,
    slug: 'parent-partnership',
  }
];
