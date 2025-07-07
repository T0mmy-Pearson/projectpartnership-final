import React from "react";
import ModernHero from "../components/ModernHero";
import HoverComponent from "../components/HoverComponent";
import WindVisualizationCard from "../components/WindVisualisationCard";
import ServiceCards from "../components/ServiceCards";
import WindVisualizationBackground from "../components/WindVisualisationBackground";
import { useMediaQuery } from 'react-responsive'
import WindVisualizationMini from "../components/WindVisualizationMini";
import heroImg from "../imgs/abzharbour.jpg";

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <>
      <WindVisualizationBackground />
      <div className="image-container">
        <img className="background-image" src={heroImg} alt="offshore wind"></img>
        <h2 className="cursor typewriter-animation overlay-text">
         A cooperative for energy in transition
        </h2>
      </div>
      {/* Mini Wind Visualization - just the clickable window */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                margin: '2rem 0' 
              }}>
                <WindVisualizationMini 
                  width="320px" 
                  height="180px" 
                  borderRadius="1rem" 
                />
              </div>
      <ModernHero />
      
      {/* Demo of Gorilla-style hover animations */}
      <div style={{ display: 'flex', gap: '2rem', padding: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <HoverComponent 
          icon="⚡" 
          title="Energy Processing" 
          description="Real-time data processing for energy markets with advanced analytics and forecasting capabilities."
        />
        <WindVisualizationCard 
          icon="🌪️" 
          title="Live Wind Data" 
          description="Real-time wind patterns and atmospheric conditions across the UK and surrounding waters."
        />
        <HoverComponent 
          icon="🔋" 
          title="Smart Grid Solutions" 
          description="Intelligent grid management systems for renewable energy integration and distribution."
        />
      </div>

    </>
  );
}
