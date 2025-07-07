import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  overflow: hidden;
`;

const BackgroundIframe = styled.iframe`
  width: 120%;
  height: 120%;
  border: none;
  position: absolute;
  top: -10%;
  left: -10%;
  filter: 
    opacity(0.3) 
    blur(1px) 
    brightness(0.7) 
    contrast(0.8);
  transition: all 0.3s ease;
  pointer-events: none;
`;

const OverlayGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(172, 203, 247, 0.7) 0%,
    rgba(172, 203, 247, 0.4) 30%,
    rgba(172, 203, 247, 0.2) 70%,
    rgba(172, 203, 247, 0.5) 100%
  );
  pointer-events: none;
`;

const LoadingBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    #ACCBF7 0%,
    #9BC1F5 25%,
    #8AB7F3 50%,
    #79ADF1 75%,
    #68A3EF 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Controls = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 10px;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ControlButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  color: #2a3342;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function WindVisualizationBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [intensity, setIntensity] = useState(0.3);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const adjustIntensity = () => {
    setIntensity(prev => {
      const newIntensity = prev >= 0.7 ? 0.1 : prev + 0.2;
      return newIntensity;
    });
  };

  // Dynamically update iframe filter based on intensity
  useEffect(() => {
    const iframe = document.querySelector('#wind-background-iframe');
    if (iframe) {
      iframe.style.filter = `
        opacity(${intensity}) 
        blur(${2 - intensity}px) 
        brightness(${0.5 + intensity * 0.4}) 
        contrast(${0.6 + intensity * 0.6})
      `;
    }
  }, [intensity]);

  return (
    <BackgroundContainer>
      {!isLoaded && <LoadingBackground />}
      
      {isVisible && (
        <BackgroundIframe
          id="wind-background-iframe"
          src="https://earth.nullschool.net/#current/wind/surface/level/orthographic=-5.65,55.56,1456"
          title="Wind Visualization Background"
          onLoad={handleLoad}
          loading="lazy"
        />
      )}
      
      <OverlayGradient />
      
      <Controls>
        <ControlButton 
          onClick={toggleVisibility}
          title={isVisible ? "Hide wind background" : "Show wind background"}
        >
          {isVisible ? '🌪️' : '🌫️'}
        </ControlButton>
        
        <ControlButton 
          onClick={adjustIntensity}
          title={`Adjust intensity (${Math.round(intensity * 100)}%)`}
        >
          {intensity <= 0.2 ? '🔅' : intensity <= 0.4 ? '🔆' : '☀️'}
        </ControlButton>
      </Controls>
    </BackgroundContainer>
  );
}
