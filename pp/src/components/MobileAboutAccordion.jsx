import React, { useState } from "react";

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

export default function MobileAboutAccordion() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="mobile-accordion-container">
      {HERO_NODES.map((node, idx) => (
        <div key={idx} className="accordion-node">
          <button
            className="node-btn"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            aria-expanded={openIdx === idx}
          >
            <div className="node-circle">
              <span style={{ flex: 1 }}>{node.tagline}</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '1rem' }}>
                {openIdx === idx ? '−' : '+'}
              </span>
            </div>
          </button>
          {openIdx === idx && (
            <div className="node-body">{node.body}</div>
          )}

          {idx < HERO_NODES.length - 1 && <div className="node-line" />}
        </div>
      ))}
    </div>
  );
}