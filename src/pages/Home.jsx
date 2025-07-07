import React from "react";
import ModernHero from "../components/ModernHero";
import HoverComponent from "../components/HoverComponent";
import ServiceCards from "../components/ServiceCards";
import WindVisualizationPanel from "../components/WindVisualizationPanel";
import WindVisualizationBackground from "../components/WindVisualizationBackground";
import { useMediaQuery } from 'react-responsive'
import heroImg from "../imgs/abzharbour.jpg";

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <>
      <WindVisualizationBackground />
      <WindVisualizationPanel />
      
      <div className="image-container">
        <img className="background-image" src={heroImg} alt="offshore wind"></img>
        <h2 className="cursor typewriter-animation overlay-text">
         A cooperative for energy in transition
        </h2>
      </div>
      <ModernHero />
      <ServiceCards></ServiceCards>
      
      {/* Demo of Gorilla-style hover animations */}
      <div style={{ display: 'flex', gap: '2rem', padding: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <HoverComponent 
          icon="⚡" 
          title="Energy Processing" 
          description="Real-time data processing for energy markets with advanced analytics and forecasting capabilities."
        />
        <HoverComponent 
          icon="📊" 
          title="Market Analytics" 
          description="Comprehensive market analysis tools for energy trading and portfolio optimization."
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
