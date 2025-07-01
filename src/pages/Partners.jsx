import React from "react";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
import PartnerCard from "../components/PartnerCard";
import ChrisImg from "../imgs/Chris.png";
import GrahamImg from "../imgs/Graham.jpg";

export default function Partners() {
  return (
    <>
      <div className="pageContainer">
        <h2 className="partners-title">Our Partners</h2>
        <div className="desktopPartnersContainer">
          <PartnerCard
            linkedin={"https://www.linkedin.com/in/christopher-pearson-69b26010/"}
            name="Chris Pearson"
            role="Principle Partner"
            image={ChrisImg}
            email="chris@projectpartnership.co.uk"
            bio="Christopher has developed, built and led international teams of people to successfully deliver portfolios of projects and achieve improved financial performance across the globe. He has managed large Projects and  Portfolios. He has also held various senior management positions at national and Corporate level. Christopher also sat on the Scottish Offshore Wind Energy Council's Innovation group. 
Christopher has a successful track record of building high performance teams across industry and public sector organisations.
A leading expert in Energy Integration in the context of Offshore renewable energy. Recently Director of the start up National Subsea Centre and prior to that, built and led a team at  Net Zero Technology Centre working on Marginal Field developments and Energy Integration. Chris previously held various senior roles with both global and regional business delivery responsibilities with a Tier one Offshore construction business and Oil and Gas operating companies. He is currently consulting on Hydrogen, Floating offshore wind developments and collaboration projects."
          />
          <PartnerCard
          linkedin={"https://www.linkedin.com/in/graham-whitehead-40116124/"}
            name="Graham Whitehead"
            role="Principle Partner"
            image={GrahamImg}
            email="graham@projectpartnership.co.uk"
            bio="Graham has almost 30 years experience across Oil and gas developments  as  operator and contractor. He has held senior roles managing  large scale developments both technically and commercially for independent operators working in the UK and internationally. More recently he has been involved in energy integration  project development and assessment."
          />
          {/* <NeuralNetworkBackground /> */}
        </div>
      </div>
    </>
  );
}
