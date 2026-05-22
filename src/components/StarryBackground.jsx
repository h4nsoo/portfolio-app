import React, { useRef, useEffect } from "react";
import "../styles/StarryBackground.css";

const STAR_COUNT = 120;
const STAR_COLORS = ["#fff", "#bcdfff", "#e0e6ff", "#ffeedd"];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const StarryBackground = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const lerpedMouse = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => {
      const radius = randomBetween(0.5, 1.8);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: 0, // for parallax
        baseY: 0,
        radius,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        speed: randomBetween(0.08, 0.18),
        twinkle: Math.random() * Math.PI * 2,
      };
    });
    starsRef.current.forEach((star) => {
      star.baseX = star.x;
      star.baseY = star.y;
    });

    // Mouse parallax
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / width;
      mouseRef.current.y = e.clientY / height;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize — debounced to avoid thrashing on every pixel
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        starsRef.current.forEach((star) => {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
          star.baseX = star.x;
          star.baseY = star.y;
        });
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Animation
    function animate() {
      // Darker, original background
      // Create gradient only if needed or use a solid color for performance if gradient is static
      // Since the gradient depends on height which changes on resize, we can recreate it here or cache it.
      // For better performance, let's cache it in a variable outside the loop if height hasn't changed,
      // but since we are inside useEffect, we can just use the current context.
      // Actually, clearing with a solid color and using CSS for the gradient background might be faster,
      // but let's just optimize the JS creation.

      // Optimization: Move gradient creation out of the loop or just use fillStyle.
      // However, since height is constant during animation frame usually, we can just set it once.
      // But let's just keep it simple and efficient.

      ctx.fillStyle = "#0a1030"; // Fallback or base
      // Re-creating gradient every frame is expensive.
      // Let's assume the background is static and draw it once?
      // No, we need to clear the canvas to animate stars.

      // Better: Use CSS for the background gradient and clearRect the canvas.
      // The canvas is transparent? No, it has a background color.
      // Let's make the canvas transparent and set the background on the container div (or body).

      ctx.clearRect(0, 0, width, height);

      // Lerp mouse for smooth parallax
      lerpedMouse.current.x +=
        (mouseRef.current.x - lerpedMouse.current.x) * 0.12;
      lerpedMouse.current.y +=
        (mouseRef.current.y - lerpedMouse.current.y) * 0.12;

      // Cache per-frame constants outside the loop
      const now = performance.now();
      const lx = lerpedMouse.current.x;
      const ly = lerpedMouse.current.y;
      ctx.globalAlpha = 0.85; // constant for all stars — set once

      for (let star of starsRef.current) {
        // Parallax offset
        const parallaxX = (lx - 0.5) * 180 * (star.radius / 2);
        const parallaxY = (ly - 0.5) * 180 * (star.radius / 2);
        // Floating movement
        star.baseX += Math.cos(now * 0.0007 + star.twinkle) * star.speed;
        star.baseY += Math.sin(now * 0.0009 + star.twinkle) * star.speed;
        // Wrap around screen
        if (star.baseX < 0) star.baseX = width;
        if (star.baseX > width) star.baseX = 0;
        if (star.baseY < 0) star.baseY = height;
        if (star.baseY > height) star.baseY = 0;
        // Draw — no save/restore needed, only fillStyle changes per star
        ctx.beginPath();
        ctx.arc(
          star.baseX + parallaxX,
          star.baseY + parallaxY,
          star.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = star.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1; // reset after batch
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="starry-bg-canvas" />;
};

export default StarryBackground;
