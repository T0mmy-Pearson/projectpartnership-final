import React from 'react'
import NeuralNetworkBackground from '../components/NeuralNetworkBackground'
import VisionCard from '../components/VisionCard'
import AboutAccordion from '../components/AboutAccordion'
import MobileAboutAccordion from '../components/MobileAboutAccordion'
import ServiceCards from '../components/ServiceCards'
import { useMediaQuery } from 'react-responsive'


export default function about() {
   const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <>
    <div className="pageContainer">
    <section className="aboutContainer">
    <VisionCard />
    </section>
     {/* <div style={{ position: 'relative', zIndex: -1 }} className="containerMain">
    <NeuralNetworkBackground />
    </div>  */}
    <section className="accordionContainer">
      {isTabletOrMobile ? <MobileAboutAccordion/> : <AboutAccordion />}
    </section>
    <ServiceCards />
    </div>
    </>
  )
}
