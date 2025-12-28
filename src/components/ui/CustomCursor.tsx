"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
    useEffect(() => {
        const dot = document.getElementById('cursor-dot');
        const outline = document.getElementById('cursor-outline');

        if (!dot || !outline) return;

        // Use quickTo for better performance
        const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
        const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

        const xOutline = gsap.quickTo(outline, "x", { duration: 0.25, ease: "power3.out" });
        const yOutline = gsap.quickTo(outline, "y", { duration: 0.25, ease: "power3.out" });

        const moveCursor = (e: MouseEvent) => {
            xDot(e.clientX);
            yDot(e.clientY);
            xOutline(e.clientX);
            yOutline(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        // Optimize: Target cursor elements directly instead of body to avoid global style recalc
        const addHover = () => {
            outline.classList.add('cursor-hover');
            dot.classList.add('cursor-hover');
        };
        const removeHover = () => {
            outline.classList.remove('cursor-hover');
            dot.classList.remove('cursor-hover');
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Use lighter check
            if (target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('.hover-trigger') ||
                target.closest('a') ||
                target.closest('button')) {
                addHover();
            } else {
                removeHover();
            }
        };

        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        }
    }, []);

    return (
        <>
            <div
                id="cursor-dot"
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
            ></div>
            <div
                id="cursor-outline"
                className="fixed top-0 left-0 w-10 h-10 border border-primary/40 rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-200 will-change-transform [&.cursor-hover]:scale-150 [&.cursor-hover]:bg-primary/10 [&.cursor-hover]:border-primary"
            ></div>
        </>
    );
}
