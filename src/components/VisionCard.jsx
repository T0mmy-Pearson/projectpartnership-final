import React, { useState, useEffect, useRef } from "react";
import windTurbineImg from "../imgs/wind-farm.jpeg";

export default function VisionCard({ interval = 6000 }) {
  const phrases = [
    "Our purpose is to play our part in delivering energy transition across multiple sectors.",
    "Our cooperative structure lets us work together on integrated energy projects, research and developments.",
    "The future needs has us working towards integrated energy solutions. We, together, can pool the innovative thinking, technologies and provide the experience required to sustain.",
    "We see and align a collaborative partnership model to bring together the necessary people and components to ensure this future."
  ];

  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const startTimeRef = useRef(Date.now());
  const containerRef = useRef(null);

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setProgress(0);
    setIsAnimating(true);
    startTimeRef.current = Date.now();

    // Reset animation after a short delay
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

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
      clearTimeout(animationTimeout);
    };
  }, [idx, interval, phrases.length]);

  return (
    <div 
      ref={containerRef}
      className="vision-image-container"
      style={{
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="titleContainer">
        <h2 
          className="headerLogo" 
          id='aboutTitle'
          style={{
            color: '#ffffff',
            fontSize: '4rem',
            fontWeight: '500',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}
        >
          Vision
        </h2>
      </div>

      {/* Enhanced image container with text overlay */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        transform: isAnimating ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.5s ease',
      }}>
        <img 
          className="visionImg" 
          src={windTurbineImg} 
          alt="Wind Turbine" 
          style={{
            transition: 'all 0.5s ease',
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.1)',
          transition: 'background 0.5s ease',
          pointerEvents: 'none',
        }} />

        {/* Text overlay directly on the image */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '600px',
          zIndex: 2,
        }}>
          {/* Phase indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem',
            gap: '0.5rem',
          }}>
            {phrases.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === idx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === idx ? '#ACCBF7' : '#ddd',
                  transition: 'all 0.3s ease',
                  opacity: i === idx ? 1 : 0.5,
                }}
              />
            ))}
          </div>

          <p 
            className="visionText" 
            style={{ 
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              color: '#ffffff',
              fontSize: '2rem',
              lineHeight: '1.6',
              textAlign: 'center',
              margin: 0,
              transform: isAnimating ? 'translateY(-5px)' : 'translateY(0)',
              opacity: isAnimating ? 0.7 : 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
              fontWeight: '500',
              background: 'rgba(0,0,0,0.2)',
              padding: '1.5rem',
              borderRadius: '12px',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {phrases[idx]}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '4px',
          width: `${progress * 100}%`,
          background: '#ACCBF7',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 10px rgba(172, 203, 247, 0.1)',
          zIndex: 3,
        }} />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 0.2;
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.5; 
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}