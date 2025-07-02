import React, { useRef, useState, useEffect } from "react";

const HERO_NODES = [
  {
    tagline: "Energy Sector Consultancy",
    body: "With decades of experience with numerous industry leaders, we can bring knowledge, experience and success to a project.",
    icon: "🔋",
    color: "#FF6B6B"
  },
  {
    tagline: "People, Support & Skills",
    body: "Through our structure, we bring the best people, support and project management across projects and portfolios.",
    icon: "👥",
    color: "#4ECDC4"
  },
  {
    tagline: "Field Analysis",
    body: "We assist in analysis of existing oil and gas discoveries.",
    icon: "📊",
    color: "#45B7D1"
  },
  {
    tagline: "Screening & Simplifying",
    body: "We screen and simplify Integrated Energy development options.",
    icon: "🔍",
    color: "#96CEB4"
  },
  {
    tagline: "Decommissioning",
    body: "We can plan, consult and deliver the decommissioning of all offshore assets.",
    icon: "🏗️",
    color: "#FECA57"
  },
  {
    tagline: "Project Delivery",
    body: "We can successfully deliver the Project or Portfolio to our clients satisfaction.",
    icon: "🚀",
    color: "#FF9FF3"
  },
];

const NODE_RADIUS = 80;
const CONTAINER_SIZE = 700;
const CENTER = CONTAINER_SIZE / 2;
const CIRCLE_RADIUS = 280;

function getNodePositions() {

  return HERO_NODES.map((node, i) => {
    const angle = (2 * Math.PI * i) / HERO_NODES.length - Math.PI / 2;
    return {
      ...node,
      x: CENTER + CIRCLE_RADIUS * Math.cos(angle),
      y: CENTER + CIRCLE_RADIUS * Math.sin(angle),
    };
  });
}

export default function DynamicHeroStatic() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const nodes = getNodePositions();

  // Auto-cycle 
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % HERO_NODES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Pulse animation 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const animateRipple = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create ripple effect 
      const time = Date.now() * 0.002;
      for (let i = 0; i < 3; i++) {
        const radius = (Math.sin(time + i) * 50) + 100;
        ctx.beginPath();
        ctx.arc(CENTER, CENTER, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - i * 0.03})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      requestAnimationFrame(animateRipple);
    };
    animateRipple();
  }, []);

  const handleNodeClick = (idx) => {
    setSelectedIdx(selectedIdx === idx ? null : idx);
    setHoveredIdx(null);
  };

  return (
    <section
      ref={containerRef}
      style={{
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
        margin: "40px auto",
        position: "relative",
        background: "linear-gradient(135deg, #ACCBF7 0%, #86b5f6 50%, #6fa8f5 100%)",
        borderRadius: "50%",
        overflow: "visible",
        boxShadow: "0 20px 60px rgba(172, 203, 247, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
        transition: "all 0.3s ease",
      }}
    >
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
      
      {/* Central hub */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120px",
          height: "120px",
          background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#ACCBF7",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          zIndex: 5,
          animation: `${animationPhase % 2 === 0 ? 'pulse' : 'none'} 2s infinite`,
        }}
      >
        ⚡
      </div>

      {/* Modal for selected node */}
      {selectedIdx !== null && (
        <div
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
          onClick={() => setSelectedIdx(null)}
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
              onClick={() => setSelectedIdx(null)}
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
              {HERO_NODES[selectedIdx].icon}
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

      {/* Hover tooltip */}
      {hoveredIdx !== null && selectedIdx === null && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
            color: "#333",
            fontWeight: "400",
            fontSize: "16px",
            borderRadius: "15px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            padding: "1.5rem 2rem",
            zIndex: 10,
            minWidth: "280px",
            maxWidth: "350px",
            textAlign: "center",
            animation: "fadeIn 0.2s ease",
            border: `3px solid ${HERO_NODES[hoveredIdx].color}`,
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            {HERO_NODES[hoveredIdx].icon}
          </div>
          <div style={{ 
            fontWeight: "600", 
            marginBottom: "0.5rem",
            color: HERO_NODES[hoveredIdx].color 
          }}>
            {HERO_NODES[hoveredIdx].tagline}
          </div>
          <div style={{ fontSize: "14px", color: "#666" }}>
            Click to learn more
          </div>
        </div>
      )}
      {/*  Enhanced connecting lines */}
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
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
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
                  strokeWidth={hoveredIdx === i || hoveredIdx === j ? "3" : "1.5"}
                  opacity={hoveredIdx === i || hoveredIdx === j ? 0.8 : 0.3}
                  style={{
                    transition: "all 0.3s ease",
                  }}
                />
              )
          )
        )}
        
        {/* Central connecting lines */}
        {nodes.map((node, i) => (
          <line
            key={`center-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={node.x}
            y2={node.y}
            stroke={hoveredIdx === i ? HERO_NODES[i].color : "rgba(255,255,255,0.2)"}
            strokeWidth={hoveredIdx === i ? "3" : "1"}
            opacity={hoveredIdx === i ? 0.8 : 0.3}
            style={{
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </svg>
      
      {/* Enhanced Nodes */}
      {nodes.map((node, idx) => (
        <div
          key={idx}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          onClick={() => handleNodeClick(idx)}
          style={{
            position: "absolute",
            left: node.x - NODE_RADIUS,
            top: node.y - NODE_RADIUS,
            width: NODE_RADIUS * 2,
            height: NODE_RADIUS * 2,
            background: hoveredIdx === idx 
              ? `linear-gradient(135deg, ${node.color} 0%, #fff 100%)`
              : "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            boxShadow: hoveredIdx === idx 
              ? `0 15px 40px ${node.color}40, 0 5px 15px rgba(0,0,0,0.1)`
              : "0 8px 25px rgba(0,0,0,0.1)",
            zIndex: hoveredIdx === idx ? 3 : 2,
            padding: "8px",
            cursor: "pointer",
            transform: hoveredIdx === idx 
              ? "scale(1.1) translateY(-5px)" 
              : animationPhase === idx 
                ? "scale(1.05)" 
                : "scale(1)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            border: hoveredIdx === idx ? `3px solid ${node.color}` : "3px solid transparent",
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: hoveredIdx === idx ? "2rem" : "1.5rem",
              marginBottom: "4px",
              transition: "all 0.3s ease",
            }}
          >
            {node.icon}
          </div>
          
          {/* Tagline */}
          <div
            style={{
              fontWeight: 600,
              fontSize: hoveredIdx === idx ? "14px" : "12px",
              color: hoveredIdx === idx ? "#fff" : node.color,
              textAlign: "center",
              lineHeight: "1.2",
              transition: "all 0.3s ease",
            }}
          >
            {node.tagline}
          </div>
        </div>
      ))}
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
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