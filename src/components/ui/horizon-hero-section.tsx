"use client";

import React, { useEffect, useRef, useState } from "react";

export const HorizonHeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const scrollProgressRef = useRef<HTMLDivElement>(null);

    const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
    const isVisibleRef = useRef(true);

    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    const totalSections = 3;

    const threeRefs = useRef<{
        scene: any;
        camera: any;
        renderer: any;
        composer: any;
        stars: any[];
        nebula: any;
        mountains: any[];
        animationId: number | null;
        targetCameraX?: number;
        targetCameraY?: number;
        targetCameraZ?: number;
        locations: number[];
    }>({
        scene: null,
        camera: null,
        renderer: null,
        composer: null,
        stars: [],
        nebula: null,
        mountains: [],
        animationId: null,
        locations: []
    });

    useEffect(() => {
        const checkIsMobile = () => {
            const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
            const isSmall = window.innerWidth < 768;
            return isSmall || (isTouch && window.innerWidth < 1024);
        };

        const mobile = checkIsMobile();
        setIsMobileDevice(mobile);

        if (mobile) return;

        let isCancelled = false;

        const startDesktopThree = async () => {
            if (!canvasRef.current || isCancelled) return;

            try {
                const [
                    THREE,
                    { gsap },
                    { ScrollTrigger },
                    { EffectComposer },
                    { RenderPass },
                    { UnrealBloomPass }
                ] = await Promise.all([
                    import("three"),
                    import("gsap"),
                    import("gsap/ScrollTrigger"),
                    import("three/examples/jsm/postprocessing/EffectComposer.js"),
                    import("three/examples/jsm/postprocessing/RenderPass.js"),
                    import("three/examples/jsm/postprocessing/UnrealBloomPass.js"),
                ]);

                if (isCancelled || !canvasRef.current) return;

                gsap.registerPlugin(ScrollTrigger);

                const { current: refs } = threeRefs;

                refs.scene = new THREE.Scene();
                refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

                refs.camera = new THREE.PerspectiveCamera(
                    75,
                    window.innerWidth / window.innerHeight,
                    0.1,
                    20000
                );
                refs.camera.position.z = 100;
                refs.camera.position.y = 20;

                refs.renderer = new THREE.WebGLRenderer({
                    canvas: canvasRef.current,
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                });
                refs.renderer.setSize(window.innerWidth, window.innerHeight);
                refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
                refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
                refs.renderer.toneMappingExposure = 0.5;

                refs.composer = new EffectComposer(refs.renderer);
                const renderPass = new RenderPass(refs.scene, refs.camera);
                refs.composer.addPass(renderPass);

                const bloomPass = new UnrealBloomPass(
                    new THREE.Vector2(window.innerWidth, window.innerHeight),
                    0.75,
                    0.4,
                    0.85
                );
                refs.composer.addPass(bloomPass);

                // 1. Star field
                const starCount = 1500;
                for (let i = 0; i < 3; i++) {
                    const geometry = new THREE.BufferGeometry();
                    const positions = new Float32Array(starCount * 3);
                    const colors = new Float32Array(starCount * 3);
                    const sizes = new Float32Array(starCount);

                    for (let j = 0; j < starCount; j++) {
                        const radius = 200 + Math.random() * 800;
                        const theta = Math.random() * Math.PI * 2;
                        const phi = Math.acos(Math.random() * 2 - 1);

                        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
                        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                        positions[j * 3 + 2] = radius * Math.cos(phi);

                        const color = new THREE.Color();
                        const colorChoice = Math.random();
                        if (colorChoice < 0.7) {
                            color.setHex(0xffffff);
                        } else if (colorChoice < 0.9) {
                            color.setHex(0xc5a059);
                        } else {
                            color.setHex(0xa0a0a0);
                        }

                        colors[j * 3] = color.r;
                        colors[j * 3 + 1] = color.g;
                        colors[j * 3 + 2] = color.b;

                        sizes[j] = Math.random() * 2 + 0.5;
                    }

                    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
                    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
                    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

                    const material = new THREE.ShaderMaterial({
                        uniforms: { time: { value: 0 } },
                        vertexShader: `
                            attribute float size;
                            attribute vec3 color;
                            varying vec3 vColor;
                            void main() {
                                vColor = color;
                                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                                if (mvPosition.z >= -10.0) {
                                    gl_Position = vec4(999.0, 999.0, 999.0, 1.0);
                                    gl_PointSize = 0.0;
                                } else {
                                    gl_PointSize = clamp(size * (150.0 / -mvPosition.z), 1.0, 6.0);
                                    gl_Position = projectionMatrix * mvPosition;
                                }
                            }
                        `,
                        fragmentShader: `
                            varying vec3 vColor;
                            void main() {
                                float dist = length(gl_PointCoord - vec2(0.5));
                                if (dist > 0.5) discard;
                                float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
                                gl_FragColor = vec4(vColor, opacity * 0.85);
                            }
                        `,
                        transparent: true,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false
                    });

                    const stars = new THREE.Points(geometry, material);
                    refs.scene.add(stars);
                    refs.stars.push(stars);
                }

                // 2. Nebula
                const nebulaGeometry = new THREE.PlaneGeometry(8000, 4000, 25, 25);
                const nebulaMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        time: { value: 0 },
                        color1: { value: new THREE.Color(0xc5a059) },
                        color2: { value: new THREE.Color(0xffe5b4) },
                        opacity: { value: 0.3 }
                    },
                    vertexShader: `
                        varying vec2 vUv;
                        varying float vElevation;
                        uniform float time;
                        void main() {
                            vUv = uv;
                            vec3 pos = position;
                            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
                            pos.z += elevation;
                            vElevation = elevation;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                        }
                    `,
                    fragmentShader: `
                        uniform vec3 color1;
                        uniform vec3 color2;
                        uniform float opacity;
                        uniform float time;
                        varying vec2 vUv;
                        varying float vElevation;
                        void main() {
                            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
                            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
                            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
                            alpha *= 1.0 + vElevation * 0.01;
                            gl_FragColor = vec4(color, alpha);
                        }
                    `,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide,
                    depthWrite: false
                });

                const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
                nebula.position.z = -1050;
                refs.scene.add(nebula);
                refs.nebula = nebula;

                // 3. Mountains
                const layers = [
                    { distance: -50, height: 60, color: 0x050505, opacity: 1 },
                    { distance: -100, height: 80, color: 0x0a0a0a, opacity: 0.8 },
                    { distance: -150, height: 100, color: 0x141414, opacity: 0.6 },
                    { distance: -200, height: 120, color: 0x1f1f1f, opacity: 0.4 }
                ];

                layers.forEach((layer, index) => {
                    const points = [];
                    const segments = 40;
                    for (let i = 0; i <= segments; i++) {
                        const x = (i / segments - 0.5) * 1000;
                        const y = Math.sin(i * 0.1) * layer.height +
                            Math.sin(i * 0.05) * layer.height * 0.5 +
                            Math.random() * layer.height * 0.2 - 100;
                        points.push(new THREE.Vector2(x, y));
                    }
                    points.push(new THREE.Vector2(5000, -300));
                    points.push(new THREE.Vector2(-5000, -300));

                    const shape = new THREE.Shape(points);
                    const geometry = new THREE.ShapeGeometry(shape);
                    const material = new THREE.MeshBasicMaterial({
                        color: layer.color,
                        transparent: true,
                        opacity: layer.opacity,
                        depthWrite: true,
                        side: THREE.DoubleSide
                    });

                    const mountain = new THREE.Mesh(geometry, material);
                    mountain.position.z = layer.distance;
                    mountain.position.y = layer.distance;
                    mountain.userData = { baseZ: layer.distance, index };
                    refs.scene.add(mountain);
                    refs.mountains.push(mountain);
                });

                // 4. Atmosphere
                const atmoGeometry = new THREE.SphereGeometry(600, 24, 24);
                const atmoMaterial = new THREE.ShaderMaterial({
                    uniforms: { time: { value: 0 } },
                    vertexShader: `
                        varying vec3 vNormal;
                        varying vec3 vPosition;
                        void main() {
                            vNormal = normalize(normalMatrix * normal);
                            vPosition = position;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        varying vec3 vNormal;
                        varying vec3 vPosition;
                        uniform float time;
                        void main() {
                            if (vPosition.y < 0.0) discard;
                            float horizonFade = smoothstep(0.0, 100.0, vPosition.y);
                            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0) * horizonFade;
                            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
                            float pulse = sin(time * 2.0) * 0.1 + 0.9;
                            atmosphere *= pulse;
                            gl_FragColor = vec4(atmosphere, intensity * 0.25);
                        }
                    `,
                    side: THREE.BackSide,
                    blending: THREE.AdditiveBlending,
                    transparent: true
                });

                const atmosphere = new THREE.Mesh(atmoGeometry, atmoMaterial);
                refs.scene.add(atmosphere);

                const animate = () => {
                    if (!isVisibleRef.current) {
                        refs.animationId = null;
                        return;
                    }

                    refs.animationId = requestAnimationFrame(animate);

                    const time = Date.now() * 0.001;

                    refs.stars.forEach((starField: any, i: number) => {
                        starField.rotation.z = time * 0.015 * (1.0 - i * 0.25);
                    });

                    if (refs.nebula?.material?.uniforms) {
                        refs.nebula.material.uniforms.time.value = time * 0.5;
                    }

                    if (refs.camera && refs.targetCameraX !== undefined) {
                        const smoothingFactor = 0.05;
                        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
                        smoothCameraPos.current.y += (refs.targetCameraY! - smoothCameraPos.current.y) * smoothingFactor;
                        smoothCameraPos.current.z += (refs.targetCameraZ! - smoothCameraPos.current.z) * smoothingFactor;

                        const floatX = Math.sin(time * 0.1) * 2;
                        const floatY = Math.cos(time * 0.15) * 1;

                        refs.camera.position.x = smoothCameraPos.current.x + floatX;
                        refs.camera.position.y = smoothCameraPos.current.y + floatY;
                        refs.camera.position.z = smoothCameraPos.current.z;
                        refs.camera.lookAt(0, 10, -600);
                    }

                    if (refs.mountains.length > 0) {
                        if (refs.nebula && refs.targetCameraZ) {
                            refs.nebula.position.z = refs.targetCameraZ - 500;
                        }

                        refs.mountains.forEach((mountain: any, i: number) => {
                            const parallaxFactor = 1 + i * 0.5;
                            mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
                            mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
                        });
                    }

                    if (refs.composer) {
                        refs.composer.render();
                    }
                };

                const observer = new IntersectionObserver(([entry]) => {
                    isVisibleRef.current = entry.isIntersecting;
                    if (entry.isIntersecting && !refs.animationId) {
                        animate();
                    }
                }, { threshold: 0.01 });

                if (containerRef.current) {
                    observer.observe(containerRef.current);
                }

                animate();

                // GSAP text animations
                if (titleRef.current) {
                    const titleChars = titleRef.current.querySelectorAll(".title-char");
                    gsap.from(titleChars, {
                        y: 200,
                        opacity: 0,
                        duration: 1.5,
                        stagger: 0.05,
                        ease: "power4.out"
                    });
                }

                if (subtitleRef.current) {
                    const subtitleLines = subtitleRef.current.querySelectorAll(".subtitle-line");
                    gsap.from(subtitleLines, {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out"
                    });
                }

                const handleResize = () => {
                    if (refs.camera && refs.renderer && refs.composer) {
                        refs.camera.aspect = window.innerWidth / window.innerHeight;
                        refs.camera.updateProjectionMatrix();
                        refs.renderer.setSize(window.innerWidth, window.innerHeight);
                        refs.composer.setSize(window.innerWidth, window.innerHeight);
                    }
                };

                window.addEventListener("resize", handleResize);

                return () => {
                    observer.disconnect();
                    window.removeEventListener("resize", handleResize);
                    if (refs.animationId) cancelAnimationFrame(refs.animationId);
                };
            } catch (err) {
                console.warn("Desktop 3D initialization bypassed:", err);
            }
        };

        const timer = (window.requestIdleCallback as any)
            ? (window.requestIdleCallback as any)(startDesktopThree)
            : setTimeout(startDesktopThree, 60);

        return () => {
            isCancelled = true;
            if (typeof timer === "number") clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (isMobileDevice) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = Math.max(documentHeight - windowHeight, 1);
            const progress = Math.min(scrollY / maxScroll, 1);

            setScrollProgress(progress);
            const newSection = Math.floor(progress * totalSections);
            setCurrentSection(newSection);

            const { current: refs } = threeRefs;
            const totalProgress = progress * totalSections;
            const sectionProgress = totalProgress % 1;

            const cameraPositions = [
                { x: 0, y: 30, z: 300 },
                { x: 0, y: 40, z: -50 },
                { x: 0, y: 50, z: -700 }
            ];

            const currentPos = cameraPositions[newSection] || cameraPositions[0];
            const nextPos = cameraPositions[newSection + 1] || currentPos;

            refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
            refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
            refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

            refs.mountains.forEach((mountain: any) => {
                mountain.visible = progress <= 0.7;
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobileDevice, totalSections]);

    const splitTitle = (text: string) => {
        return text.split("").map((char, i) => (
            <span key={i} className="title-char inline-block">
                {char}
            </span>
        ));
    };

    const sectionTitles = ["VISION", "CRAFT", "IMPACT"];
    const isHeroActive = scrollProgress < 0.99;

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[100svh] md:h-[300vh] bg-black"
        >
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full z-0"
            />

            {/* SECTION 1: VISION */}
            <section className="absolute top-0 left-0 w-full h-screen z-10 flex flex-col items-center justify-center pointer-events-none text-white overflow-hidden">
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-9xl font-normal tracking-[0.2em] mb-4 mix-blend-overlay text-primary/60 font-sans"
                >
                    {splitTitle("VISION")}
                </h1>

                <div
                    ref={subtitleRef}
                    className="text-center font-light tracking-widest text-sm md:text-base text-white/50 uppercase font-sans"
                >
                    <p className="subtitle-line block mb-2">
                        Redefining Digital Landscapes,
                    </p>
                    <p className="subtitle-line block">
                        Crafting the future of your brand
                    </p>
                </div>
            </section>

            {/* SECTION 2: CRAFT */}
            <section className="hidden md:flex absolute top-[100vh] left-0 w-full h-screen z-10 flex-col items-center justify-center pointer-events-none text-white">
                <h2 className="text-6xl md:text-9xl font-normal tracking-[0.2em] mb-4 mix-blend-overlay text-primary/60 font-sans">
                    CRAFT
                </h2>
                <div className="text-center font-light tracking-widest text-sm md:text-base text-white/80 uppercase font-sans">
                    <p>Design operations & Digital Excellence,</p>
                    <p>Forged with precision</p>
                </div>
            </section>

            {/* SECTION 3: IMPACT */}
            <section className="hidden md:flex absolute top-[200vh] left-0 w-full h-screen z-10 flex-col items-center justify-center pointer-events-none text-white">
                <h2 className="text-6xl md:text-9xl font-normal tracking-[0.2em] mb-4 mix-blend-overlay text-primary/60 font-sans">
                    IMPACT
                </h2>
                <div className="text-center font-light tracking-widest text-sm md:text-base text-white/80 uppercase font-sans">
                    <p>Helping Businesses Go Global,</p>
                    <p>One pixel at a time</p>
                </div>
            </section>

            {/* Scroll progress meter */}
            <div
                ref={scrollProgressRef}
                className="hidden md:flex fixed bottom-12 right-12 z-50 items-center gap-4 text-white text-[10px] tracking-widest transition-all duration-700 pointer-events-none"
                style={{
                    opacity: isHeroActive ? 1 : 0,
                    transform: isHeroActive ? "translateY(0)" : "translateY(20px)",
                    visibility: isHeroActive ? "visible" : "hidden"
                }}
            >
                <div className="writing-vertical-rl transform rotate-180 opacity-40 font-bold tracking-[0.4em]">SCROLL</div>
                <div className="h-24 w-[1px] bg-white/10 relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 w-full bg-primary transition-all duration-100 ease-out"
                        style={{ height: `${scrollProgress * 100}%` }}
                    />
                </div>
                <div className="font-mono font-medium text-primary min-w-[80px] text-right tracking-[0.2em]">
                    {sectionTitles[currentSection] || sectionTitles[0]}
                </div>
            </div>
        </div>
    );
};
