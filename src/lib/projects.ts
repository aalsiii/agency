export interface Project {
    id: number;
    slug: string;
    title: string;
    category: string;
    role: string;
    src: string;
    desc: string;
    client: string;
    timeline: string;
    challenge: string;
    solution: string;
    results: string;
    liveUrl?: string;
    galleryImages: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        slug: "nada-yoga-school",
        title: "Nada Yoga School",
        category: "Full-Funnel Marketing & Web",
        role: "Full-Funnel Management & Redesign",
        src: "/images/portfolio/nada-yoga-school.png",
        desc: "Complete digital growth overhaul from website maintenance and full WordPress redesign to SEO, social media management, and Meta ad funnels—resulting in courses booked almost full through next year.",
        client: "Nada Yoga School",
        timeline: "Ongoing Retainer",
        challenge: "Nada Yoga School was lacking in brand presence, suffered from an outdated, slow WordPress website, had inconsistent social media output, and struggled with paid ad performance that failed to yield consistent student enrollments.",
        solution: "We completely redesigned their WordPress website for speed and conversion flow, engineered targeted technical and on-page SEO, took over daily social media management, and structured high-converting Meta ad campaigns.",
        results: "Transformed student intake into a predictable global pipeline. Courses and teacher training cohorts are now booked almost completely full through next year.",
        liveUrl: "https://www.nadyoga.org/",
        galleryImages: [
            "/images/portfolio/nada-gallery-1.png",
            "/images/portfolio/nada-gallery-2.png",
            "/images/portfolio/nada-gallery-3.png"
        ]
    },
    {
        id: 2,
        slug: "val-alino-coach",
        title: "Val Alino Coach",
        category: "Executive Branding & Social",
        role: "Social Media & Brand Strategy",
        src: "/images/portfolio/valalino-real.png",
        desc: "Personal brand elevation, strategic social media management, and website optimization tailored for an elite executive and transformational life coach.",
        client: "Val Alino Coaching",
        timeline: "Active Partnership",
        challenge: "Val needed a cohesive executive digital posture across social media and her website to attract corporate leadership clients and build high-authority brand equity.",
        solution: "We manage Val's social media content engine, refine her personal brand identity, and optimize her website user journey to drive discovery consultations with senior corporate leaders.",
        results: "Established a cohesive aesthetic and unified executive brand voice across social channels and web touchpoints, driving consistent inbound inquiries from senior leaders.",
        liveUrl: "https://www.valalino.com/",
        galleryImages: [
            "/images/portfolio/valalino-real.png",
        ]
    },
    {
        id: 3,
        slug: "eazy-pregnancy",
        title: "Eazy Pregnancy",
        category: "Content Strategy & SEO",
        role: "Copywriting & SEO Content Architecture",
        src: "/images/portfolio/eazypregnancy-real.png",
        desc: "Empathetic, medically accurate website copywriting and search-rich editorial content engineering to establish top Google rankings in the maternal wellness space.",
        client: "Eazy Pregnancy",
        timeline: "Sprint & Optimization",
        challenge: "Eazy Pregnancy needed to build trust with expecting parents while competing against massive health portals for high-intent maternal queries on Google.",
        solution: "Wrote high-converting website copy across core landing pages and delivered an ongoing series of comprehensive, medically vetted SEO articles structured for Google search intent.",
        results: "Established organic Google search footprint across key long-tail maternal queries and structured trusted copy across primary landing pages.",
        liveUrl: "https://www.eazypregnancy.com/",
        galleryImages: [
            "/images/portfolio/eazypregnancy-real.png",
        ]
    },
    {
        id: 4,
        slug: "luisa-photography",
        title: "Luisa Photography",
        category: "Portfolio & Editorial Design",
        role: "Bespoke Web Development",
        src: "/images/portfolio/luisa-fotografia.png",
        desc: "An editorial-grade fine art photography portfolio engineered with sub-second image loading, minimalist framing, and an effortless client commission inquiry interface.",
        client: "Luisa Photography",
        timeline: "4 Weeks",
        challenge: "Standard photography portfolio templates were slow, compressed high-resolution images poorly, and failed to reflect the refined, editorial aesthetic of Luisa's photographic work.",
        solution: "Engineered a custom, minimalist portfolio website featuring adaptive image rendering, fluid transitions, and a streamlined private booking inquiry flow.",
        results: "Achieved sub-second image load times, elegant fullscreen gallery navigation, and a frictionless inquiry interface for prospective editorial and commercial clients.",
        liveUrl: "https://www.luisaphotography.com/",
        galleryImages: [
            "/images/portfolio/luisa-gallery-1.png",
            "/images/portfolio/luisa-gallery-2.png",
            "/images/portfolio/luisa-gallery-3.png"
        ]
    },
    {
        id: 5,
        slug: "rudraksha-antiquei",
        title: "Rudraksha Antiquei",
        category: "Next.js E-Commerce & Brand",
        role: "Next.js Architecture & Brand Identity",
        src: "/images/portfolio/rudraksha-real.png",
        desc: "Ground-up luxury brand creation and custom Next.js e-commerce engineering for authentic sacred spiritual artifacts and temple antiquities.",
        client: "Rudraksha Antiquei",
        timeline: "Active Build & Launch",
        challenge: "Launching in a spiritual artifacts market with counterfeits required building unquestioned authenticity, luxury visual authority, and a modern, secure e-commerce engine from scratch.",
        solution: "Crafted complete brand identity from zero (typography, certificate seals, brand tokens) and engineered a high-velocity Next.js e-commerce storefront with custom product catalog flow.",
        results: "Engineered and launched custom Next.js e-commerce architecture from scratch and actively building the complete visual brand identity.",
        liveUrl: "https://www.rudrakshaantiquei.com/",
        galleryImages: [
            "/images/portfolio/rudraksha-real.png",
        ]
    },
];
