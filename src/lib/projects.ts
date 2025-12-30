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
        slug: "echoes-of-silence",
        title: "Echoes of Silence",
        category: "E-Commerce",
        role: "Strategic Design",
        src: "/images/portfolio/echoes-of-silence.png",
        desc: "A sanctuary for natural sound healing instruments. We crafted an immersive digital experience that mirrors the serenity of their physical products, resulting in a 40% increase in engagement.",
        client: "Echoes of Silence",
        timeline: "8 Weeks",
        challenge: "The client needed a digital presence that could convey the physical sensation of sound healing through a screen. The challenge was to balance e-commerce functionality with an atmospheric, almost spiritual user experience.",
        solution: "We designed a minimalist interface heavily relying on negative space and fluid animations. High-quality audio samples were integrated directly into the product discovery loop, allowing users to 'feel' the products before buying.",
        results: "40% increase in user engagement time and a 25% boost in conversion rates within the first month of launch.",
        liveUrl: "https://store.nadyoga.org/?woo-share=no5rgzhpawysC7Xx6HYGcP9qy6JRj339",
        galleryImages: [
            "/images/portfolio/echoes-gallery-1.png",
            "/images/portfolio/echoes-gallery-2.png",
            "/images/portfolio/echoes-gallery-3.png"
        ]
    },
    {
        id: 2,
        slug: "nada-yoga-school",
        title: "Nada Yoga School",
        category: "Web Platform",
        role: "Full Stack Development",
        src: "/images/portfolio/nada-yoga-school.png",
        desc: "We redesigned their entire platform and now manage their holistic digital presence, positioning them as one of the strongest yoga schools in Rishikesh.",
        client: "Nada Yoga School",
        timeline: "Ongoing",
        challenge: "Nada Yoga School needed more than just a website; they required a dominant online presence in the competitive Rishikesh market. Their previous site didn't reflect their status, and they lacked a cohesive marketing strategy.",
        solution: "We completely redesigned their WordPress website for performance and aesthetics. Beyond development, we handle their entire marketing funnel—from SEO optimization to managing social media campaigns—building a robust online ecosystem.",
        results: "Established Nada Yoga School as a leading authority in Rishikesh with significantly increased student enrollments and a vibrant online community.",
        liveUrl: "https://nadyoga.org",
        galleryImages: [
            "/images/portfolio/nada-gallery-1.png",
            "/images/portfolio/nada-gallery-2.png",
            "/images/portfolio/nada-gallery-3.png"
        ]
    },
    {
        id: 3,
        slug: "luisa-fotografia",
        title: "Luisa Fotografia",
        category: "Portfolio",
        role: "Visual Identity",
        src: "/images/portfolio/luisa-fotografia.png",
        desc: "A stunning modern portraiture portfolio designed to capture the essence of every moment. Minimalist aesthetics meet high-performance image optimization.",
        client: "Luisa Fotografia",
        timeline: "4 Weeks",
        challenge: "The photographer wanted a portfolio that didn't look like a generic template. Speed was crucial, as high-res images were slowing down her previous site.",
        solution: "We utilized Next.js image optimization and a custom masonry layout. Crucially, we built a custom Admin Panel that allows her to easily upload and manage her portfolio without touching a line of code.",
        results: "Page load speeds improved by 300%. The new admin workflow saved her hours of manual work per week, allowing her to keep her portfolio consistently fresh.",
        liveUrl: "https://luisa-rho.vercel.app/",
        galleryImages: [
            "/images/portfolio/luisa-gallery-1.png",
            "/images/portfolio/luisa-gallery-2.png",
            "/images/portfolio/luisa-gallery-3.png"
        ]
    },
    {
        id: 4,
        slug: "dr-nitasha-buldeo",
        title: "Dr. Nitasha Buldeo",
        category: "Integrative Medicine",
        role: "Web Consultancy",
        src: "/images/portfolio/nitasha-buldeo.png",
        desc: "Harmonize Body, Mind & Spirit. Bridging the gap between ancient wisdom and modern biomechanics to activate your body's natural healing intelligence.",
        client: "Dr. Nitasha Buldeo",
        timeline: "6 Weeks",
        challenge: "Dr. Buldeo needed to merge her medical background with holistic practices in a way that felt credible yet approachable.",
        solution: "We created a refined, trustworthy brand identity using a deep charcoal and gold palette. To streamline her practice, we built a custom Admin Panel for her to publish research blogs and a robust booking system that automatically handles scheduling conflicts.",
        results: "Established a strong digital authority. The automated booking system reduced administrative time by 70%, while the blog has become a central resource for integrative medicine education.",
        liveUrl: "https://drnitashabuldeo.com", // Placeholder
        galleryImages: [
            "/images/portfolio/nitasha-gallery-1.png",
            "/images/portfolio/nitasha-gallery-2.png",
            "/images/portfolio/nitasha-gallery-3.png"
        ]
    },
    {
        id: 5,
        slug: "eazypregnancy",
        title: "eazyPregnancy",
        category: "Women Wellness",
        role: "Content Strategy & Web Platform",
        src: "/images/portfolio/eazypregnancy.png",
        desc: "Empowering mothers through every stage of pregnancy. We built a comprehensive platform that combines expert medical guidance with a supportive community for an ‘eazy’ journey.",
        client: "eazyPregnancy",
        timeline: "12 Weeks",
        challenge: "eazyPregnancy needed a platform that could provide reliable medical information while maintaining a warm, supportive tone. They also required an SEO strategy to rank in the competitive women's wellness space.",
        solution: "We developed a SEO-optimized web platform with a focus on high-intent keywords like 'Garbh Sanskar' and 'Indian pregnancy diet'. We also integrated a blog system backed by experts like Dr. Priya Shikha Modi.",
        results: "Successfully launched the platform with a 50% increase in organic reach within the first two months. The content strategy established them as a key player in the Indian pregnancy wellness market.",
        liveUrl: "https://eazypregnancy.com",
        galleryImages: [
            "/images/portfolio/eazypregnancy.png",
            "/images/portfolio/eazypregnancy.png",
            "/images/portfolio/eazypregnancy.png"
        ]
    },
];
