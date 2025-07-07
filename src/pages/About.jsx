import React from 'react'
import WindVisualizationBackground from '../components/WindVisualizationBackground'
import VisionCard from '../components/VisionCard'
import AboutAccordion from '../components/AboutAccordion'
import ServiceCards from '../components/ServiceCards'
import { useMediaQuery } from 'react-responsive'


export default function about() {
   const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <>
    <WindVisualizationBackground />
    <div className="pageContainer">
    <section className="aboutContainer">
    <VisionCard />
    </section>
     {/* <div style={{ position: 'relative', zIndex: -1 }} className="containerMain">
    <NeuralNetworkBackground />
    </div>  */}
    <section className="accordionContainer">
      {isTabletOrMobile ? <ServiceCards />: <AboutAccordion />}
    </section>
    </div>
    </>
  )
}
