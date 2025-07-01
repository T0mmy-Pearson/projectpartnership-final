import React, { useState, useEffect, useRef } from "react";
import windTurbineImg from "../imgs/AdobeStock_480882949.jpeg";

export default function VisionCard({ interval = 8000 }) {
  const phrases = [
    "Our purpose is to play our part in delivering the energy transition across multiple sectors.",
    "Employee-owned and unique to the energy industry, our structure lets us work together on integrated energy projects, marine renewables, oil and gas developments, brownfield mods, subsea systems, decommissioning and research.",
    "The future needs all of us working towards integrated energy solutions. We, together, can assist in growing the innovative thinking, technologies and providing the experience required for the future; we see and align a collaborative partnership model to bring together the necessary people and components to ensure this future."
  ];

  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    setProgress(0);
    startTimeRef.current = Date.now();

    const step = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const percent = Math.min(1, elapsed / interval);
      setProgress(percent);
      if (percent < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);

    const timer = setInterval(() => {
      setIdx(i => (i + 1) % phrases.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [idx, interval, phrases.length]);

  return (
    <div className="vision-image-container">
      <div className="titleContainer">
        <h2 className="headerLogo" id='aboutTitle'>Our Vision</h2>
      </div>
      <img className="visionImg" src={windTurbineImg} alt="Wind Turbine" />
      <p className="visionText" style={{ minHeight: 40, transition: "opacity 0.5s" }}>
        {phrases[idx]}
      </p>
    </div>
  );
}