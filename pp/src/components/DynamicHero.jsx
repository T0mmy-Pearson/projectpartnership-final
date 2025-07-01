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

const NODE_RADIUS = 150;
const LINE_WIDTH = 4;
const LINE_PAIRS = [
  [0, 1],
  [1, 2],
  [2, 0],
];

export default function DynamicHero({ height = 900 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
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

  // Get node positions in px
  const getNodePositions = useCallback(
    () =>
      HERO_NODES.map((node) => ({
        ...node,
        px: node.x * containerSize.width,
        py: node.y * containerSize.height,
      })),
    [containerSize]
  );

  // Draw nodes and lines
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, containerSize.width, containerSize.height);

    const nodes = getNodePositions();

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
        ctx.lineWidth = LINE_WIDTH;
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
        ctx.arc(node.px, node.py, NODE_RADIUS, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          img,
          node.px - NODE_RADIUS,
          node.py - NODE_RADIUS,
          NODE_RADIUS * 2,
          NODE_RADIUS * 2
        );
        ctx.restore();
      }
    });
  }, [containerSize, getNodePositions, loadedImages]);

  // Handle scroll and resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = 0;
      if (rect.top < windowHeight && rect.bottom > 0) {
        progress = (windowHeight - rect.top) / (rect.height + windowHeight);
        progress = Math.max(0, Math.min(1, progress));
      }
      scrollProgressRef.current = progress;
      draw();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
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

    const node = HERO_NODES[idx];
    const px = node.x * width;
    const py = node.y * height;

    // Custom offsets for each tagline
    let offsetX = NODE_RADIUS + 34;
    let offsetY = 0;
    let textAlign = "left";

    if (idx === 0) {
      offsetX = NODE_RADIUS + 34; 
      offsetY = -NODE_RADIUS * 0.2; 
      textAlign = "left";
    }
    if (idx === 1) {
      offsetX = -NODE_RADIUS - 300; // left

      textAlign = "right";
    }
    if (idx === 2) {
      offsetX = NODE_RADIUS + 34; // right
      offsetY = NODE_RADIUS * 0.25; // below
      textAlign = "left";
    }

    return {
      position: "absolute",
      left: `${px + offsetX}px`,
      top: `${py + offsetY}px`,
      transform: "translateY(-50%)",
      width: `${NODE_RADIUS * 2}px`,
      textAlign,
      color: "#fff",
      fontWeight: 400,
      fontSize: "clamp(1rem, 6vw, 2.2rem)",
      userSelect: "none",
      zIndex: 3,
      pointerEvents: "none",
      borderRadius: "12px",
      padding: "0.5em 0.2em",

    };
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "none",
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