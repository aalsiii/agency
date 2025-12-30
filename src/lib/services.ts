import { Box, Code, Layout, LineChart, Megaphone, Palette, PenTool, RefreshCw } from "lucide-react";

export interface Service {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    features: string[];
    icon: any;
}

export const services: Service[] = [
    {
        id: "01",
        title: "Web Design",
        description: "Immersive digital experiences that captivate and convert.",
        longDescription: "We don't just design websites; we craft digital journeys. Our design process matches aesthetics with usability, ensuring that every pixel serves a purpose. From initial wireframes to high-fidelity prototypes, we focus on creating intuitive, accessible, and inclusive interfaces that leave a lasting impression.",
        features: [
            "User Interface (UI) Design",
            "User Experience (UX) Research",
            "Wireframing & Prototyping",
            "Mobile-First Responsive Design",
            "Design Systems & Style Guides",
            "Interactive Mockups"
        ],
        icon: Layout
    },
    {
        id: "02",
        title: "Website Redesign",
        description: "Transforming legacy sites into high-performance digital powerhouses.",
        longDescription: "No matter if your current website is custom-coded, WordPress, or Shopify, we specialize in complete redesigns that prioritize performance, user experience, and modern aesthetics. We breathe new life into existing digital presences, ensuring they meet current web standards and exceed user expectations.",
        features: [
            "Platform-Agnostic Redesigns (WordPress, Shopify, etc.)",
            "Performance & Speed Optimization",
            "UX/UI Modernization",
            "Conversion-Focused Architecture",
            "Legacy Data Migration",
            "Responsive Overhauls"
        ],
        icon: RefreshCw
    },
    {
        id: "03",
        title: "Development",
        description: "Robust, scalable, and high-performance code.",
        longDescription: "Our engineering team builds the backbone of your digital presence. Utilizing cutting-edge technologies like React, Next.js, and Node.js, we develop lightning-fast, secure, and SEO-optimized applications. We prioritize clean architecture and maintainable code to ensure your platform grows with your business.",
        features: [
            "Full-Stack Web Development",
            "Custom CMS Implementation",
            "E-commerce Solutions",
            "API Integration & Development",
            "Performance Optimization",
            "Technical SEO Implementation"
        ],
        icon: Code
    },
    {
        id: "04",
        title: "Marketing",
        description: "Data-driven strategies to expand your global reach.",
        longDescription: "Visibility is key in the digital age. Our marketing experts employ data-driven strategies to put your brand in front of the right audience. We analyze market trends and user behavior to craft campaigns that not only drive traffic but foster genuine community engagement and brand loyalty.",
        features: [
            "Search Engine Optimization (SEO)",
            "Social Media Strategy",
            "Content Marketing",
            "Email Marketing Campaigns",
            "Market Research & Analysis",
            "Conversion Rate Optimization"
        ],
        icon: LineChart
    },
    {
        id: "05",
        title: "Branding",
        description: "Creating an identity that resonates and endures.",
        longDescription: "Your brand is more than just a logo; it's the soul of your business. We help you uncover your unique voice and visual identity. Through deep discovery sessions, we build comprehensive brand narratives that communicate your values and distinguish you from the competition.",
        features: [
            "Logo Design & Visual Identity",
            "Brand Strategy & Positioning",
            "Voice & Tone Development",
            "Brand Guidelines",
            "Rebranding Services",
            "Naming & Taglines"
        ],
        icon: PenTool
    },
    {
        id: "06",
        title: "Graphic Design",
        description: "Visuals that speak volumes and inspire action.",
        longDescription: "Great design communicates without words. Our graphic design services cover everything from print collateral to digital assets. We ensure your brand looks professional and consistent across every touchpoint, creating visuals that trigger emotion and drive brand recognition.",
        features: [
            "Marketing Materials (Brochures, Flyers)",
            "Social Media Graphics",
            "Infographics & Data Visualization",
            "Packaging Design",
            "Presentation Deck Design",
            "Illustration"
        ],
        icon: Palette
    },
    {
        id: "07",
        title: "Ad Campaigning",
        description: "Strategic campaigns that deliver measurable ROI.",
        longDescription: "Stop guessing and start converting. We manage targeted advertising campaigns across multiple platforms including Google, Facebook, Instagram, and LinkedIn. We constantly monitor and optimize performance to ensure every dollar of your ad spend yields the maximum possible return.",
        features: [
            "Pay-Per-Click (PPC) Management",
            "Social Media Advertising",
            "Retargeting Campaigns",
            "A/B Testing",
            "Ad Creative Production",
            "Analytics & Reporting"
        ],
        icon: Megaphone
    },
    {
        id: "08",
        title: "2D & 3D Modelling",
        description: "Precision visualization and immersive conceptual design.",
        longDescription: "We bring your abstract concepts into reality through meticulous 2D drafting and immersive 3D modelling. Whether it's product visualization, architectural walkthroughs, or creative conceptual art, our modelling services provide the clarity and depth needed for production-ready designs and stunning visual presentations.",
        features: [
            "3D Product Rendering",
            "Architectural Visualization",
            "2D Technical Drafting",
            "Concept Art Modelling",
            "Texture & Lighting Design",
            "Production-Ready 3D Assets"
        ],
        icon: Box
    }
];
