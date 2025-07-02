import React from "react";
import ModernHero from "../components/ModernHero";
import TestimonialCarousel from "../components/TestimonialCarousel";
import ServiceCards from "../components/ServiceCards";
import { useMediaQuery } from 'react-responsive'
import heroImg from "../imgs/abzharbour.jpg";

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <>
      <div className="image-container">
        <img className="background-image" src={heroImg} alt="offshore wind"></img>
        <h2 className="cursor typewriter-animation overlay-text">
         A cooperative for energy in transition
        </h2>
      </div>
      <ModernHero />
<ServiceCards></ServiceCards>
    </>
  );
}
