import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import NeuralNetworkBackground from "./NeuralNetworkBackground";
import img1 from "../imgs/sea-foam.jpg";
import img2 from "../imgs/land-windmill.jpeg";
import img3 from "../imgs/surface3.jpg";

const HERO_NODES = [
  {
    img: img1,
    tagline: "Innovation through Collaboration",
    x: 0.25,
    y: 0.2,
  },
  {
    img: img2,
    tagline: "Progress through Partnership",
    x: 0.75,
    y: 0.55,
  },
  {
    img: img3,
    tagline: "Growth through Excellence",
    x: 0.25,
    y: 0.85,
  },
];

// Responsive node sizing based on screen width
const getNodeRadius = (width) => {
  if (width < 600) return 40; // Mobile
  if (width < 900) return 55; // Tablet
  return 70; // Desktop
};

const getLineWidth = (width) => {
  if (width < 600) return 2; // Mobile
  if (width < 900) return 3; // Tablet
  return 4; // Desktop
};

const LINE_PAIRS = [
  [0, 1],
  [1, 2],
  [2, 0],
];

export default function DynamicHero({ height = 900 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const scrollProgressRef = useRef(0);

  // Preload images once
  const loadedImages = useMemo(
    () =>
      HERO_NODES.map((node) => {
        const img = new window.Image();
        img.src = node.img;
        return img;
      }),
    []
  );

  // Draw nodes and lines
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerSize.width || !containerSize.height) return;
    
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, containerSize.width, containerSize.height);

    const currentNodeRadius = getNodeRadius(containerSize.width);
    const currentLineWidth = getLineWidth(containerSize.width);
    
    const nodes = HERO_NODES.map((node) => ({
      ...node,
      px: node.x * containerSize.width,
      py: node.y * containerSize.height,
    }));

    // Draw lines
    LINE_PAIRS.forEach((pair, idx) => {
      const segment = idx / LINE_PAIRS.length;
      const nextSegment = (idx + 1.1) / LINE_PAIRS.length;
      let progress = 0;

      if (idx === 0) {
        progress = Math.min(1, scrollProgressRef.current * LINE_PAIRS.length);
      } else if (
        scrollProgressRef.current > segment &&
        scrollProgressRef.current < nextSegment
      ) {
        progress = (scrollProgressRef.current - segment) * LINE_PAIRS.length;
      } else if (scrollProgressRef.current >= nextSegment) {
        progress = 1;
      }

      if (progress > 0) {
        const [startIdx, endIdx] = pair;
        const start = nodes[startIdx];
        const end = nodes[endIdx];
        const x = start.px + (end.px - start.px) * progress;
        const y = start.py + (end.py - start.py) * progress;
        ctx.save();
        ctx.strokeStyle = `rgba(255,255,255,1)`;
        ctx.lineWidth = currentLineWidth;
        ctx.beginPath();
        ctx.moveTo(start.px, start.py);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.restore();
      }
    });

    // Draw nodes (images)
    nodes.forEach((node, idx) => {
      const img = loadedImages[idx];
      if (img.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.px, node.py, currentNodeRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          img,
          node.px - currentNodeRadius,
          node.py - currentNodeRadius,
          currentNodeRadius * 2,
          currentNodeRadius * 2
        );
        ctx.restore();
      }
    });
  }, [containerSize.width, containerSize.height, loadedImages]);

  // Handle scroll and resize
  useEffect(() => {
    let scrollTimeout;
    
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        setContainerSize({ width, height });
        setIsMobile(width < 600);
        setIsTablet(width >= 600 && width < 900);
      }
    };

    const handleScroll = () => {
      if (scrollTimeout) return;
      
      scrollTimeout = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) {
          scrollTimeout = null;
          return;
        }
        
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        let progress = 0;
        if (rect.top < windowHeight && rect.bottom > 0) {
          progress = (windowHeight - rect.top) / (rect.height + windowHeight);
          progress = Math.max(0, Math.min(1, progress));
        }
        scrollProgressRef.current = progress;
        draw();
        scrollTimeout = null;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
    };
  }, [draw]);

  // Redraw when container size changes
  useEffect(() => {
    if (containerSize.width && containerSize.height) {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = containerSize.width;
        canvas.height = containerSize.height;
      }
      draw();
    }
  }, [containerSize, draw]);

  // Tagline positioning
  const taglineStyle = (idx) => {
    const { width, height } = containerSize;
    if (!width || !height) return { display: "none" };

    const currentNodeRadius = getNodeRadius(width);
    const currentIsMobile = width < 600;
    const currentIsTablet = width >= 600 && width < 900;

    const node = HERO_NODES[idx];
    const px = node.x * width;
    const py = node.y * height;

    // Responsive offsets and sizing
    let offsetX = currentNodeRadius + (currentIsMobile ? 15 : currentIsTablet ? 20 : 34);
    let offsetY = 0;
    let textAlign = "left";
    let fontSize = currentIsMobile ? "0.9rem" : currentIsTablet ? "1.2rem" : "1.5rem";
    let maxWidth = currentIsMobile ? "120px" : currentIsTablet ? "160px" : "200px";

    if (idx === 0) {
      offsetX = currentNodeRadius + (currentIsMobile ? 15 : currentIsTablet ? 20 : 34); // right
      offsetY = -currentNodeRadius * (currentIsMobile ? 0.1 : 0.2); // slightly above
      textAlign = "left";
    }
    if (idx === 1) {
      offsetX = -currentNodeRadius - (currentIsMobile ? 80 : currentIsTablet ? 120 : 160); // left
      offsetY = currentNodeRadius * (currentIsMobile ? 0.1 : 0.2); // below
      textAlign = "right";
    }
    if (idx === 2) {
      offsetX = currentNodeRadius + (currentIsMobile ? 15 : currentIsTablet ? 20 : 34); // right
      offsetY = currentNodeRadius * (currentIsMobile ? 0.15 : 0.25); // below
      textAlign = "left";
    }

    return {
      position: "absolute",
      left: `${px + offsetX}px`,
      top: `${py + offsetY}px`,
      transform: "translateY(-50%)",
      width: maxWidth,
      maxWidth: maxWidth,
      textAlign,
      color: "#fff",
      fontWeight: currentIsMobile ? 300 : 400,
      fontSize,
      lineHeight: currentIsMobile ? "1.2" : "1.3",
      userSelect: "none",
      zIndex: 3,
      pointerEvents: "none",
      borderRadius: "8px",
      padding: currentIsMobile ? "0.3em 0.1em" : "0.5em 0.2em",
      background: currentIsMobile ? "rgba(0, 0, 0, 0.2)" : "transparent",
      wordWrap: "break-word",
      overflow: "hidden",
    };
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "60vh" : isTablet ? "70vh" : "100vh",
        minHeight: isMobile ? "400px" : "500px",
        maxHeight: isMobile ? "600px" : "800px",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: isMobile ? 80 : isTablet ? 100 : 150,
          left: 0,
          zIndex: 1,
          pointerEvents: "none",
          width: "100%",
          height: "auto",
        }}
        aria-hidden="true"
      />
      {/* Taglines */}
      {containerSize.width > 0 &&
        HERO_NODES.map((node, idx) => (
          <div key={idx} style={taglineStyle(idx)}>
            {node.tagline}
          </div>
        ))}
      {/* <NeuralNetworkBackground/> */}
    </section>
  );
}