import React from 'react';

const ModernHero = ({ 
  title = "SCALING ENERGY TEAMS SINCE 2010",
  subtitle = "An Energy Partnership For The Future",
  description = "We are a leading energy transition consultancy. With decades of experience in our markets, our team possesses an unparalleled depth of knowledge to understand your specific needs.",
  primaryCta = "Scale Your Team",
  secondaryCta = "Explore Services",
  onPrimaryClick,
  onSecondaryClick
}) => {
  return (
    <section className="modern-hero">
      <div className="modern-hero-container">
        <div className="modern-hero-content">
          <h1 className="modern-hero-title">{title}</h1>
          <h2 className="modern-hero-subtitle">{subtitle}</h2>
          <p className="modern-hero-description">{description}</p>
          
          <div className="modern-hero-cta">
            <button 
              className="modern-hero-btn primary"
              onClick={onPrimaryClick}
            >
              {primaryCta}
            </button>
            <button 
              className="modern-hero-btn secondary"
              onClick={onSecondaryClick}
            >
              {secondaryCta}
            </button>
          </div>
        </div>
        
        <div className="modern-hero-brands">
          <p className="brands-label">Supporting the growth of energy leaders</p>
          <div className="brands-grid">
            <div className="brand-logo">BP</div>
            <div className="brand-logo">Shell</div>
            <div className="brand-logo">Equinor</div>
            <div className="brand-logo">Ørsted</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
