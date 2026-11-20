"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    // Use GSAP quickTo for silky smooth 60fps tracking without lag
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const xOutline = gsap.quickTo(outline, "x", { duration: 0.22, ease: "power3.out" });
    const yOutline = gsap.quickTo(outline, "y", { duration: 0.22, ease: "power3.out" });

    let isVisible = false;

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) {
        dot.style.opacity = "1";
        outline.style.opacity = "1";
        isVisible = true;
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xOutline(e.clientX);
      yOutline(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });

    const addHover = () => {
      outline.classList.add("cursor-hover");
      dot.classList.add("cursor-hover");
    };
    const removeHover = () => {
      outline.classList.remove("cursor-hover");
      dot.classList.remove("cursor-hover");
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button" ||
          target.closest(".hover-trigger") ||
          target.closest("a") ||
          target.closest("button"))
      ) {
        addHover();
      } else {
        removeHover();
      }
    };

    const handleMouseLeave = () => {
      dot.style.opacity = "0";
      outline.style.opacity = "0";
      isVisible = false;
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      <div
        ref={dotRef}
        id="cursor-dot"
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-200"
      />
      <div
        ref={outlineRef}
        id="cursor-outline"
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 w-10 h-10 border border-primary/50 rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform transition-[width,height,background-color,border-color,opacity] duration-200 [&.cursor-hover]:scale-150 [&.cursor-hover]:bg-primary/10 [&.cursor-hover]:border-primary"
      />
    </div>
  );
}
