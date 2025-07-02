import React, { useRef, useState, useEffect, useMemo } from "react";
import { 
  FiZap, 
  FiUsers, 
  FiTrendingUp, 
  FiFilter, 
  FiTool, 
  FiTarget 
} from 'react-icons/fi';

const HERO_NODES = [
  {
    tagline: "Energy Sector Consultancy",
    body: "With decades of experience with numerous industry leaders, we can bring knowledge, experience and success to a project.",
    icon: FiZap,
    color: "#86b5f6"
  },
  {
    tagline: "People, Support & Skills",
    body: "Through our structure, we bring the best people, support and project management across projects and portfolios.",
    icon: FiUsers,
    color: "#86b5f6"
  },
  {
    tagline: "Field Analysis",
    body: "We assist in analysis of existing oil and gas discoveries.",
    icon: FiTrendingUp,
    color: "#86b5f6"
  },
  {
    tagline: "Screening & Simplifying",
    body: "We screen and simplify Integrated Energy development options.",
    icon: FiFilter,
    color: "#86b5f6"
  },
  {
    tagline: "Decommissioning",
    body: "We can plan, consult and deliver the decommissioning of all offshore assets.",
    icon: FiTool,
    color: "#86b5f6"
  },
  {
    tagline: "Project Delivery",
    body: "We can successfully deliver the Project or Portfolio to our clients satisfaction.",
    icon: FiTarget,
    color: "#86b5f6"
  },
];

const NODE_RADIUS = 80;
const CONTAINER_SIZE = 700;
const CENTER = CONTAINER_SIZE / 2;
const CIRCLE_RADIUS = 280;

/**
 * Returns the positions for nodes arranged in a circle, with optional rotation and radius pulsing.
 */
function getNodePositions(rotationAngle = 0, pulsePhase = 0) {
  // Create a gentler pulsing radius effect - oscillates between 0.9 and 1.1 of the base radius
  const radiusMultiplier = 1 + 0.1 * Math.sin(pulsePhase);
  const currentRadius = CIRCLE_RADIUS * radiusMultiplier;
  
  return HERO_NODES.map((node, i) => {
    const angle = (2 * Math.PI * i) / HERO_NODES.length - Math.PI / 2 + rotationAngle;
    return {
      ...node,
      x: CENTER + currentRadius * Math.cos(angle),
      y: CENTER + currentRadius * Math.sin(angle),
    };
  });
}

export default function DynamicHeroStatic() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [nodeHovered, setNodeHovered] = useState(null);
  
  // Memoize node positions to ensure consistency between lines and nodes
  const nodes = useMemo(() => {
    const positions = getNodePositions(rotationAngle, pulsePhase);
    // Round to prevent floating point precision issues
    return positions.map(node => ({
      ...node,
      x: Math.round(node.x * 100) / 100,
      y: Math.round(node.y * 100) / 100,
    }));
  }, [rotationAngle, pulsePhase]);

  // Cycles the animation phase for subtle node scaling and central pulse (not the main rotation)
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % HERO_NODES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Smoothly rotates the whole circle and pulses the radius continuously
  useEffect(() => {
    let animationId;
    const animate = () => {
      // Stop animation when a node is hovered
      if (nodeHovered === null) {
        setRotationAngle(prev => {
          const increment = (2 * Math.PI) / (120 * 60); // 120 seconds (2 minutes) for full rotation
          return prev + increment;
        });
        setPulsePhase(prev => {
          const increment = (2 * Math.PI) / (20 * 60); // 20 seconds for full pulse cycle
          return prev + increment;
        });
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [nodeHovered]);

  // Animated ripple effect for the background canvas (with cleanup)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const animateRipple = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.002;
      for (let i = 0; i < 3; i++) {
        const radius = (Math.sin(time + i) * 50) + 100;
        ctx.beginPath();
        ctx.arc(CENTER, CENTER, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - i * 0.03})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      animationFrameId = requestAnimationFrame(animateRipple);
    };
    animateRipple();
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Modal ESC support
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIdx(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx]);

  // Node interaction handlers
  const handleNodeClick = (idx) => {
    setSelectedIdx(selectedIdx === idx ? null : idx);
  };
  const handleModalClose = () => setSelectedIdx(null);

  // Hover hook handlers
  const handleNodeMouseEnter = (idx) => {
    setNodeHovered(idx);
  };

  const handleNodeMouseLeave = () => {
    setNodeHovered(null);
  };

  const handleContainerMouseLeave = () => {
    setNodeHovered(null);
  };



  return (
    <section
      ref={containerRef}
      onMouseLeave={handleContainerMouseLeave}
      style={{
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
        margin: "40px auto",
        position: "relative",
        borderRadius: "50%",
        overflow: "visible",
        boxShadow: "0 20px 60px rgba(172, 203, 247, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Ripple Canvas */}
      <canvas
        ref={canvasRef}
        width={CONTAINER_SIZE}
        height={CONTAINER_SIZE}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "none",
          borderRadius: "50%",
        }}
        aria-hidden="true"
      />
      
      {/* Central hub with always-on pulse animation */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "180px",
          height: "180px",
          background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          fontWeight: "300",
          color: "#ACCBF7",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
          zIndex: 5,
          animation: `pulse 2s infinite`,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          lineHeight: "1.3",
          padding: "20px",
        }}
      >
        <span style={{
          maxWidth: "100%",
          wordWrap: "break-word",
          hyphens: "auto",
        }}>project partnership</span>
      </div>

      {/* Modal for selected node */}
      {selectedIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease",
          }}
          onClick={handleModalClose}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
              borderRadius: "20px",
              padding: "3rem",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              position: "relative",
              animation: "slideUp 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleModalClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "2rem",
                color: "#666",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              {React.createElement(HERO_NODES[selectedIdx].icon, { 
                size: 48, 
                color: HERO_NODES[selectedIdx].color 
              })}
            </div>
            <h3 style={{ 
              color: HERO_NODES[selectedIdx].color, 
              marginBottom: "1rem",
              fontSize: "1.5rem",
              fontWeight: "600"
            }}>
              {HERO_NODES[selectedIdx].tagline}
            </h3>
            <p style={{ 
              color: "#666", 
              lineHeight: "1.6",
              fontSize: "1.1rem"
            }}>
              {HERO_NODES[selectedIdx].body}
            </p>
          </div>
        </div>
      )}

      {/* Connecting lines */}
      <svg
        width={CONTAINER_SIZE}
        height={CONTAINER_SIZE}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
          </linearGradient>
          <linearGradient id="centerLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
          </linearGradient>
        </defs>
        {nodes.map((start, i) =>
          nodes.map(
            (end, j) =>
              j > i && (
                <line
                  key={`${i}-${j}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  opacity="0.5"
                />
              )
          )
        )}
        {nodes.map((node, i) => (
          <line
            key={`center-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={node.x}
            y2={node.y}
            stroke={nodeHovered === i ? "rgba(255,255,255,1)" : "url(#centerLineGradient)"}
            strokeWidth={nodeHovered === i ? "4" : "2"}
            opacity={nodeHovered === i ? "1" : "0.5"}
            style={{
              transition: "stroke 0.3s ease, strokeWidth 0.3s ease, opacity 0.3s ease",
            }}
          />
        ))}
      </svg>
      
      {/* Node buttons */}
      {nodes.map((node, idx) => {
        const isAnimated = animationPhase === idx;
        const isHovered = nodeHovered === idx;
        return (
          <div
            key={idx}
            onClick={() => handleNodeClick(idx)}
            onMouseEnter={() => handleNodeMouseEnter(idx)}
            onMouseLeave={handleNodeMouseLeave}
            style={{
              position: "absolute",
              left: `${node.x}px`,
              top: `${node.y}px`,
              width: NODE_RADIUS * 2,
              height: NODE_RADIUS * 2,
              transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.1)' : isAnimated ? 'scale(1.05)' : 'scale(1)'}`,
              background: isHovered 
                ? `linear-gradient(135deg, ${node.color} 0%, #fff 100%)`
                : "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: isHovered
                ? `0 15px 40px ${node.color}40, 0 5px 15px rgba(0,0,0,0.1)`
                : "0 8px 25px rgba(0,0,0,0.1)",
              zIndex: isHovered ? 3 : 2,
              padding: "8px",
              cursor: "pointer",
              transformOrigin: "center center",
              transition: "background 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: isHovered ? `3px solid ${node.color}` : "3px solid transparent",
            }}
            aria-label={node.tagline}
          >
            <div
              style={{
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
            >
              {React.createElement(node.icon, { 
                size: isHovered ? 32 : 24,
                color: isHovered ? "#fff" : node.color
              })}
            </div>
            <div
              style={{
                fontWeight: 500,
                fontSize: isHovered ? "14px" : "12px",
                color: isHovered ? "#fff" : node.color,
                textAlign: "center",
                lineHeight: "1.2",
                transition: "all 0.3s ease",
              }}
            >
              {node.tagline}
            </div>
          </div>
        );
      })}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1); 
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.05); 
          }
        }
      `}</style>
    </section>
  );
}