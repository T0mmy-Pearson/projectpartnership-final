import React, { useState } from 'react';

const ServiceCards = ({ 
  title = "Our Expertise",
  services = [
    {
      title: "Energy Sector Consultancy",
      subtitle: "Expert Industry Knowledge",
      description: "With decades of experience with numerous industry leaders, we can bring knowledge, experience and success to a project.",
      link: "/services/consultancy",
      details: "Our energy sector consultancy services leverage decades of combined experience working with industry leaders across offshore renewables, oil & gas, and marine energy sectors. We provide strategic guidance on project development, regulatory compliance, risk assessment, and market analysis. Our team has successfully advised on projects ranging from early-stage feasibility studies to multi-billion dollar developments. We understand the unique challenges of energy transition and can help navigate complex technical, commercial, and regulatory landscapes."
    },
    {
      title: "People, Support & Skills", 
      subtitle: "Team Building & Project Management",
      description: "Through our structure, we bring the best people, support and project management across projects and portfolios.",
      link: "/services/people-support",
      details: "As an employee-owned cooperative, we excel at assembling high-performance teams tailored to specific project needs. Our collaborative approach ensures the right expertise is matched to each challenge, whether you need temporary specialist support or long-term team augmentation. We provide project management services, skills development programs, and organizational support that drives project success. Our network includes experts in engineering, commercial analysis, regulatory affairs, and project delivery across the energy sector."
    },
    {
      title: "Field Analysis",
      subtitle: "Oil & Gas Assessment",
      description: "We assist in analysis of existing oil and gas discoveries.",
      link: "/services/field-analysis",
      details: "Our field analysis services provide comprehensive technical and commercial evaluation of oil and gas assets. We conduct reservoir studies, production forecasting, economic modeling, and development option assessments. Our team has experience with marginal field developments, mature asset optimization, and integrated energy solutions that combine traditional hydrocarbon assets with renewable energy systems. We help operators maximize value from existing discoveries through innovative development concepts and strategic planning."
    },
    {
      title: "Screening and Simplifying",
      subtitle: "Integrated Energy Development",
      description: "We screen and simplify Integrated Energy development options.",
      link: "/services/screening",
      details: "We specialize in evaluating and streamlining complex integrated energy development opportunities that combine multiple energy sources and technologies. Our screening process identifies the most viable development concepts while simplifying complex technical and commercial arrangements. We assess offshore wind, oil & gas, hydrogen production, and energy storage combinations to optimize project economics and reduce development risks. Our approach helps clients navigate the complexity of multi-energy developments and focus on the most promising opportunities."
    },
    {
      title: "Decommissioning",
      subtitle: "Complete Asset Lifecycle",
      description: "We can plan, consult and deliver the decommissioning of all offshore assets.",
      link: "/services/decommissioning",
      details: "Our decommissioning expertise covers the complete lifecycle from initial planning through final execution. We provide regulatory strategy, cost estimation, technical planning, and project management for offshore asset decommissioning. Our team understands the latest regulations, innovative decommissioning technologies, and cost-effective approaches to asset removal and site restoration. We work with operators to develop decommissioning strategies that minimize environmental impact while optimizing costs and schedules."
    },
    {
      title: "Delivery",
      subtitle: "Project & Portfolio Success",
      description: "We can successfully deliver the Project or Portfolio to our clients satisfaction.",
      link: "/services/delivery",
      details: "Our delivery services ensure projects and portfolios achieve their objectives on time and within budget. We provide end-to-end project management, from concept development through operational handover. Our collaborative approach brings together the right expertise at each project phase, ensuring seamless execution and knowledge transfer. We have a proven track record of delivering complex energy projects across offshore renewables, oil & gas developments, and integrated energy systems. Our focus is on sustainable delivery that creates long-term value for all stakeholders."
    }
  ]
}) => {
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };
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
                
                <button 
                  onClick={() => openModal(service)}
                  className="service-card-link"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  Find out more
                  <span className="service-card-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed service information */}
      {selectedService && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              borderRadius: '20px',
              padding: '3rem',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              position: 'relative',
              animation: 'slideUp 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                color: '#666',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f0f0f0';
                e.target.style.color = '#333';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none';
                e.target.style.color = '#666';
              }}
            >
              ×
            </button>

            {/* Modal content */}
            <div style={{ paddingRight: '2rem' }}>
              <div style={{
                color: '#ACCBF7',
                fontSize: '0.9rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '0.5rem',
              }}>
                {selectedService.subtitle}
              </div>
              
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '1.5rem',
                lineHeight: '1.2',
              }}>
                {selectedService.title}
              </h2>

              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#555',
                marginBottom: '2rem',
                textAlign: 'justify',
              }}>
                {selectedService.details}
              </p>

              {/* Action buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '2rem',
              }}>
                <button
                  onClick={closeModal}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: '2px solid #ACCBF7',
                    background: 'none',
                    color: '#ACCBF7',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#ACCBF7';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.color = '#ACCBF7';
                  }}
                >
                  Close
                </button>
                
                <button
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    background: '#ACCBF7',
                    color: '#fff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#86b5f6';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#ACCBF7';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
      `}</style>
    </section>
  );
};

export default ServiceCards;
