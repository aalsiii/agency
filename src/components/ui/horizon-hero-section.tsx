"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// @ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// @ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Menu } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const HorizonHeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const scrollProgressRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const totalSections = 3;

    const threeRefs = useRef<{
        scene: THREE.Scene | null;
        camera: THREE.PerspectiveCamera | null;
        renderer: THREE.WebGLRenderer | null;
        composer: EffectComposer | null;
        stars: THREE.Points[];
        nebula: THREE.Mesh | null;
        mountains: THREE.Mesh[];
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
        if (!canvasRef.current) return;

        const initThree = () => {
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
                canvas: canvasRef.current!,
                antialias: true,
                alpha: true
            });
            refs.renderer.setSize(window.innerWidth, window.innerHeight);
            refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            refs.renderer.toneMappingExposure = 0.5;

            refs.composer = new EffectComposer(refs.renderer);
            const renderPass = new RenderPass(refs.scene, refs.camera);
            refs.composer.addPass(renderPass);

            const bloomPass = new UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                0.8,
                0.4,
                0.85
            );
            refs.composer.addPass(bloomPass);

            createStarField();
            createNebula();
            createMountains();
            createAtmosphere();
            getLocation();

            animate();
            setIsReady(true);
        };

        const createStarField = () => {
            const { current: refs } = threeRefs;
            if (!refs.scene) return;
            const starCount = 5000;

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

                    // Color variation
                    const color = new THREE.Color();
                    const colorChoice = Math.random();
                    if (colorChoice < 0.7) {
                        color.setHex(0xFFFFFF); // White
                    } else if (colorChoice < 0.9) {
                        color.setHex(0xC5A059); // Gold
                    } else {
                        color.setHex(0xA0A0A0); // Grey
                    }

                    colors[j * 3] = color.r;
                    colors[j * 3 + 1] = color.g;
                    colors[j * 3 + 2] = color.b;

                    sizes[j] = Math.random() * 2 + 0.5;
                }

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
                geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        time: { value: 0 },
                        depth: { value: i }
                    },
                    vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
                    fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                });

                const stars = new THREE.Points(geometry, material);
                if (refs.scene) refs.scene.add(stars);
                refs.stars.push(stars);
            }
        };

        const createNebula = () => {
            const { current: refs } = threeRefs;
            if (!refs.scene) return;

            const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    color1: { value: new THREE.Color(0xC5A059) }, // Gold
                    color2: { value: new THREE.Color(0xFFE5B4) }, // Warm White
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

            const nebula = new THREE.Mesh(geometry, material);
            nebula.position.z = -1050;
            nebula.rotation.x = 0;
            if (refs.scene) refs.scene.add(nebula);
            refs.nebula = nebula;
        };

        const createMountains = () => {
            const { current: refs } = threeRefs;
            if (!refs.scene) return;

            const layers = [
                { distance: -50, height: 60, color: 0x050505, opacity: 1 },
                { distance: -100, height: 80, color: 0x0a0a0a, opacity: 0.8 },
                { distance: -150, height: 100, color: 0x141414, opacity: 0.6 },
                { distance: -200, height: 120, color: 0x1f1f1f, opacity: 0.4 }
            ];

            layers.forEach((layer, index) => {
                const points = [];
                const segments = 50;

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
                    side: THREE.DoubleSide
                });

                const mountain = new THREE.Mesh(geometry, material);
                mountain.position.z = layer.distance;
                mountain.position.y = layer.distance;
                mountain.userData = { baseZ: layer.distance, index };
                if (refs.scene) refs.scene.add(mountain);
                refs.mountains.push(mountain);
            });
        };

        const createAtmosphere = () => {
            const { current: refs } = threeRefs;
            if (!refs.scene) return;

            const geometry = new THREE.SphereGeometry(600, 32, 32);
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 }
                },
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
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
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

            const atmosphere = new THREE.Mesh(geometry, material);
            if (refs.scene) refs.scene.add(atmosphere);
        };

        const getLocation = () => {
            const { current: refs } = threeRefs;
            const locations: number[] = [];
            refs.mountains.forEach((mountain, i) => {
                locations[i] = mountain.position.z
            })
            refs.locations = locations
        }

        const animate = () => {
            const { current: refs } = threeRefs;
            refs.animationId = requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            refs.stars.forEach((starField, i) => {
                // @ts-ignore - material is shader material
                if (starField.material.uniforms) {
                    // @ts-ignore - material is shader material
                    starField.material.uniforms.time.value = time;
                }
            });

            // @ts-ignore - material is shader material
            if (refs.nebula && refs.nebula.material.uniforms) {
                // @ts-ignore - material is shader material
                refs.nebula.material.uniforms.time.value = time * 0.5;
            }

            if (refs.camera && refs.targetCameraX !== undefined) {
                const smoothingFactor = 0.05;

                smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
                // @ts-ignore - targetCameraY is defined
                smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
                // @ts-ignore - targetCameraZ is defined
                smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;

                const floatX = Math.sin(time * 0.1) * 2;
                const floatY = Math.cos(time * 0.15) * 1;

                refs.camera.position.x = smoothCameraPos.current.x + floatX;
                refs.camera.position.y = smoothCameraPos.current.y + floatY;
                refs.camera.position.z = smoothCameraPos.current.z;
                refs.camera.lookAt(0, 10, -600);
            }

            if (refs.mountains) {
                const nebula = refs.nebula;
                if (nebula && refs.targetCameraZ) {
                    nebula.position.z = refs.targetCameraZ - 500;
                }

                refs.mountains.forEach((mountain, i) => {
                    const parallaxFactor = 1 + i * 0.5;
                    mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
                    mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
                });
            }

            if (refs.composer) {
                refs.composer.render();
            }
        };

        initThree();

        const handleResize = () => {
            const { current: refs } = threeRefs;
            if (refs.camera && refs.renderer && refs.composer) {
                refs.camera.aspect = window.innerWidth / window.innerHeight;
                refs.camera.updateProjectionMatrix();
                refs.renderer.setSize(window.innerWidth, window.innerHeight);
                refs.composer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            const { current: refs } = threeRefs;

            if (refs.animationId) {
                cancelAnimationFrame(refs.animationId);
            }

            window.removeEventListener('resize', handleResize);

            refs.stars.forEach(starField => {
                starField.geometry.dispose();
                if (Array.isArray(starField.material)) {
                    starField.material.forEach((m: any) => m.dispose());
                } else {
                    (starField.material as any).dispose();
                }
            });
            refs.stars = [];

            refs.mountains.forEach(mountain => {
                mountain.geometry.dispose();
                if (Array.isArray(mountain.material)) {
                    mountain.material.forEach((m: any) => m.dispose());
                } else {
                    (mountain.material as any).dispose();
                }
            });
            refs.mountains = [];

            if (refs.nebula) {
                refs.nebula.geometry.dispose();
                if (Array.isArray(refs.nebula.material)) {
                    refs.nebula.material.forEach((m: any) => m.dispose());
                } else {
                    (refs.nebula.material as any).dispose();
                }
            }

            if (refs.renderer) {
                refs.renderer.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (!isReady) return;

        gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current], {
            visibility: 'visible'
        });

        const tl = gsap.timeline();

        if (menuRef.current) {
            tl.from(menuRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }

        if (titleRef.current) {
            const titleChars = titleRef.current.querySelectorAll('.title-char');
            tl.from(titleChars, {
                y: 200,
                opacity: 0,
                duration: 1.5,
                stagger: 0.05,
                ease: "power4.out"
            }, "-=0.5");
        }

        if (subtitleRef.current) {
            const subtitleLines = subtitleRef.current.querySelectorAll('.subtitle-line');
            tl.from(subtitleLines, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.8");
        }

        if (scrollProgressRef.current) {
            tl.from(scrollProgressRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out"
            }, "-=0.5");
        }

        return () => {
            tl.kill();
        };
    }, [isReady]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;
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

            refs.mountains.forEach((mountain, i) => {
                if (progress > 0.7) {
                    mountain.visible = false;
                } else {
                    mountain.visible = true;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [totalSections]);


    const splitTitle = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="title-char inline-block">
                {char}
            </span>
        ));
    };

    return (
        <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />

            <div ref={menuRef} className="fixed left-8 top-1/2 -translate-y-1/2 z-50 text-white/50 hidden md:block opacity-0 invisible" >
                <div className="flex flex-col gap-2 mb-8 items-center">
                    <Menu className="w-6 h-6" />
                </div>
                <div className="writing-vertical-rl text-xs tracking-[0.3em] font-light">SPACE</div>
            </div>

            <section className="absolute top-0 left-0 w-full h-screen z-10 flex flex-col items-center justify-center pointer-events-none text-white overflow-hidden">
                <h1 ref={titleRef} className="text-6xl md:text-9xl font-bold tracking-[0.2em] mb-4 mix-blend-overlay opacity-0 invisible font-serif">
                    {splitTitle("VISION")}
                </h1>

                <div ref={subtitleRef} className="text-center font-light tracking-widest text-sm md:text-base text-primary/80 uppercase opacity-0 invisible font-sans">
                    <p className="subtitle-line block mb-2">
                        Redefining Digital Landscapes,
                    </p>
                    <p className="subtitle-line block">
                        Crafting the future of your brand
                    </p>
                </div>
            </section>

            <section className="absolute top-[100vh] left-0 w-full h-screen z-10 flex flex-col items-center justify-center pointer-events-none text-white">
                <h1 className="text-6xl md:text-9xl font-bold tracking-[0.2em] mb-4 mix-blend-overlay text-primary/60 font-serif">
                    CRAFT
                </h1>
                <div className="text-center font-light tracking-widest text-sm md:text-base text-white/80 uppercase font-sans">
                    <p>Design operations & Digital Excellence,</p>
                    <p>Forged with precision</p>
                </div>
            </section>

            <section className="absolute top-[200vh] left-0 w-full h-screen z-10 flex flex-col items-center justify-center pointer-events-none text-white">
                <h1 className="text-6xl md:text-9xl font-bold tracking-[0.2em] mb-4 mix-blend-overlay text-primary/60 font-serif">
                    IMPACT
                </h1>
                <div className="text-center font-light tracking-widest text-sm md:text-base text-white/80 uppercase font-sans">
                    <p>Helping Businesses Go Global,</p>
                    <p>One pixel at a time</p>
                </div>
            </section>


            <div ref={scrollProgressRef} className="fixed bottom-12 right-12 z-50 flex items-center gap-4 text-white text-xs tracking-widest opacity-0 invisible">
                <div className="writing-vertical-rl transform rotate-180">SCROLL</div>
                <div className="h-24 w-[1px] bg-white/20 relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 w-full bg-white transition-all duration-100 ease-out"
                        style={{ height: `${scrollProgress * 100}%` }}
                    />
                </div>
                <div className="font-mono">
                    {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
                </div>
            </div>
        </div>
    );
};
