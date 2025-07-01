import React, { useRef, useEffect, useState } from "react";


export default function ThreePanels() {
  const panels = [
    { text: "Simplify." },
    { text: "Unify." },
    { text: "Deliver." }
  ];
  const containerRef = useRef(null);
  const [underlineVisible, setUnderlineVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const trigger = window.innerHeight * 0.8;
      if (rect.top < trigger && rect.bottom > 0) {
        setUnderlineVisible(true);
      } else {
        setUnderlineVisible(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="three-panels-container" ref={containerRef}>
        {panels.map((panel, idx) => (
          <div className="panel" key={idx}>
            <span className="panel-text">{panel.text}</span>
          </div>
        ))}
      </div>
      <div className={`three-panels-underline${underlineVisible ? " visible" : ""}`} />
    </>
  );
}