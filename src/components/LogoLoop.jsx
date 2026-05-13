import { useRef, useEffect, useState, useCallback } from "react";
import "../styles/LogoLoop.css";

function useResizeObserver(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

function useAnimationLoop(cb, running = true) {
  const rafRef = useRef(null);
  const cbRef = useRef(cb);
  useEffect(() => { cbRef.current = cb; }, [cb]);
  useEffect(() => {
    if (!running) return;
    let lastTime = null;
    const step = (time) => {
      if (lastTime !== null) cbRef.current(Math.min(time - lastTime, 50));
      lastTime = time;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);
}

export default function LogoLoop({
  logos = [],
  speed = 50,
  direction = "left",
  logoHeight = 28,
  gap = 32,
  hoverSpeed = 20,
  scaleOnHover = false,
  fadeOut = false,
  vertical = false,
  ariaLabel,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const [hovering, setHovering] = useState(false);
  const [copies, setCopies] = useState(2);
  const containerSize = useResizeObserver(containerRef);

  const currentSpeed = hovering && hoverSpeed !== undefined ? hoverSpeed : speed;
  const reversed = direction === "right" || direction === "down";

  // Compute how many list copies are needed to fill the container without gaps
  useEffect(() => {
    const compute = () => {
      const firstList = trackRef.current?.children[0];
      if (!firstList) return;
      const listSize = vertical ? firstList.offsetHeight : firstList.offsetWidth;
      if (listSize === 0) return;
      const containerEl = containerRef.current;
      if (!containerEl) return;
      const containerDim = vertical ? containerEl.offsetHeight : containerEl.offsetWidth;
      if (containerDim === 0) return;
      const needed = Math.max(2, Math.ceil(containerDim / listSize) + 1);
      setCopies((c) => (c === needed ? c : needed));
    };
    const raf = requestAnimationFrame(compute);
    return () => cancelAnimationFrame(raf);
  }, [logos, containerSize, vertical]);

  const animate = useCallback(
    (delta) => {
      if (!trackRef.current) return;
      const list = trackRef.current.children[0];
      if (!list) return;
      const listSize = vertical ? list.offsetHeight : list.offsetWidth;
      if (listSize === 0) return;

      // For reversed direction, start from listSize so the track is pre-positioned
      // correctly (list copy 2 at screen x=0) rather than jumping on the first frame.
      if (reversed && offsetRef.current === 0) {
        offsetRef.current = listSize;
      }

      const step = (currentSpeed * delta) / 1000;

      if (reversed) {
        offsetRef.current -= step;
        if (offsetRef.current <= 0) offsetRef.current += listSize;
      } else {
        offsetRef.current += step;
        if (offsetRef.current >= listSize) offsetRef.current -= listSize;
      }

      trackRef.current.style.transform = vertical
        ? `translate3d(0, -${offsetRef.current}px, 0)`
        : `translate3d(-${offsetRef.current}px, 0, 0)`;
    },
    [currentSpeed, reversed, vertical],
  );

  useAnimationLoop(animate);

  const classes = [
    "logoloop",
    vertical && "logoloop--vertical",
    scaleOnHover && "logoloop--scale-hover",
    fadeOut && "logoloop--fade",
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logoHeight": `${logoHeight}px`,
  };

  const listItems = logos.map((logo, i) => (
    <li key={i} className="logoloop__item">
      {logo.href ? (
        <a
          href={logo.href}
          className="logoloop__link"
          target="_blank"
          rel="noopener noreferrer"
          title={logo.title}
        >
          {logo.node ? (
            <span className="logoloop__node">{logo.node}</span>
          ) : (
            <img src={logo.src} alt={logo.alt ?? logo.title ?? ""} />
          )}
        </a>
      ) : logo.node ? (
        <span className="logoloop__node">{logo.node}</span>
      ) : (
        <img src={logo.src} alt={logo.alt ?? logo.title ?? ""} />
      )}
    </li>
  ));

  return (
    <div
      ref={containerRef}
      className={classes}
      style={style}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div ref={trackRef} className="logoloop__track">
        {Array.from({ length: copies }, (_, i) => (
          <ul
            key={i}
            className="logoloop__list"
            aria-hidden={i > 0 ? "true" : undefined}
          >
            {listItems}
          </ul>
        ))}
      </div>
    </div>
  );
}
