import React from 'react';

const ServiceCards = ({ 
  title = "Our Services",
  services = [
    {
      title: "Energy Sector Consultancy",
      subtitle: "Expert Industry Knowledge",
      description: "With decades of experience with numerous industry leaders, we can bring knowledge, experience and success to a project.",
      link: "/services/consultancy"
    },
    {
      title: "People, Support & Skills", 
      subtitle: "Team Building & Project Management",
      description: "Through our structure, we bring the best people, support and project management across projects and portfolios.",
      link: "/services/people-support"
    },
    {
      title: "Field Analysis",
      subtitle: "Oil & Gas Assessment",
      description: "We assist in analysis of existing oil and gas discoveries.",
      link: "/services/field-analysis"
    },
    {
      title: "Screening and Simplifying",
      subtitle: "Integrated Energy Development",
      description: "We screen and simplify Integrated Energy development options.",
      link: "/services/screening"
    },
    {
      title: "Decommissioning",
      subtitle: "Complete Asset Lifecycle",
      description: "We can plan, consult and deliver the decommissioning of all offshore assets.",
      link: "/services/decommissioning"
    },
    {
      title: "Delivery",
      subtitle: "Project & Portfolio Success",
      description: "We can successfully deliver the Project or Portfolio to our clients satisfaction.",
      link: "/services/delivery"
    }
  ]
}) => {
  return (
    <section className="service-cards-section">
      <div className="service-cards-container">
        <h2 className="service-cards-title">{title}</h2>
        
        <div className="service-cards-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-card-content">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-subtitle">{service.subtitle}</p>
                <p className="service-card-description">{service.description}</p>
                
                <a href={service.link} className="service-card-link">
                  Find out more
                  <span className="service-card-arrow">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
