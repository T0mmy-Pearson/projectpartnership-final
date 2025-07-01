import React, { useRef, useState, useEffect } from "react";

const HERO_NODES = [
  {
    tagline: "Energy Sector Consultancy",
    body: "With decades of experience with numerous industry leaders, we can bring knowledge, experience and success to a project.",
  },
  {
    tagline: "People, Support & Skills",
    body: "Through our structure, we bring the best people, support and project management across projects and portfolios.",
  },
  {
    tagline: "Field Analysis",
    body: "We assist in analysis of existing oil and gas discoveries.",
  },
  {
    tagline: "Screening and Simplifying",
    body: "We screen and simplify Integrated Energy development options.",
  },
  {
    tagline: "Decommissioning",
    body: "We can plan, consult and deliver the decommissioning of all offshore assets.",
  },
  {
    tagline: "Delivery",
    body: "We can successfully deliver the Project or Portfolio to our clients satisfaction.",
  },
];

const NODE_RADIUS = 100;
const CONTAINER_SIZE = 700;
const CENTER = CONTAINER_SIZE / 2;
const CIRCLE_RADIUS = 300;

function getNodePositions() {
  // Arrange nodes evenly in a circle
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
  const nodes = getNodePositions();

   const taglineStyle = (idx) => ({
    position: "absolute",
    left: `calc(${HERO_NODES[idx].x * 100}% )`,
    top: `calc(${HERO_NODES[idx].y * 100}% )`,
    transform: "translate(-50%, -50%)",
    width: "max-content",
    textAlign: "center",
    color: "#fff",
    fontWeight: 600,
    fontSize: "2vw",
    userSelect: "none",
    zIndex: 3,
    pointerEvents: "auto",
    textShadow: "0 2px 8px #0a192f, 0 0 12px #0008",
    background: "rgba(10,25,47,0.45)",
    borderRadius: "12px",
    padding: "0.5em 0.2em",
    cursor: "pointer",
  });

  return (
    <section
    ref={containerRef}
      style={{
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
        margin: "40px auto",
        position: "relative",
        background: "#ACCBF7",
        borderRadius: "50%",
        overflow: "visible",
      }}
    >
        <canvas
        ref={canvasRef}
        width={150}
        height={300}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      {/* node.body pop-up */}
      {hoveredIdx !== null && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            color: "#9ac5fd",
            fontWeight: 300,
            fontSize: 18,
            borderRadius: '10%',
            boxShadow: "0 4px 32px #0a192f33",
            padding: "2rem 2.5rem",
            zIndex: 10,
            minWidth: 260,
            maxWidth: 400,
            textAlign: "center",
            transition: "opacity 10s",
            opacity: 1,
            pointerEvents: "auto",
          }}
        >
          {HERO_NODES[hoveredIdx].body}
        </div>
      )}
      {/*  lines connecting every pair of nodes */}
      <svg
        width={CONTAINER_SIZE}
        height={CONTAINER_SIZE}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
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
                  stroke="#fff"
                  strokeWidth={4}
                  opacity={0.7}
                />
              )
          )
        )}
      </svg>
      {/* Nodes */}
      {nodes.map((node, idx) => (
        <div
          key={idx}
          onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
          style={{
            position: "absolute",
            left: node.x - NODE_RADIUS,
            top: node.y - NODE_RADIUS,
            width: NODE_RADIUS * 2,
            height: NODE_RADIUS * 2,
            background: "#ffffff",
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(255, 255, 255, 0)",
            zIndex: 1,
            padding: 12,
          }}
        >
          {/* Taglines */}
          <div
            style={{
              fontWeight: 400,
              fontSize: 20,
              marginBottom: 8,
              color: "#ACCBF7",
            }}
          >
            {node.tagline}
          </div>
        </div>
      ))}
    </section>
  );
}