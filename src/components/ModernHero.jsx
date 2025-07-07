import React from 'react';
import { useNavigate } from 'react-router';
import seaFoam from "../imgs/surface3.jpg";
import WindVisualizationCard from './WindVisualisationCard';
import WindVisualizationMini from './WindVisualizationMini';

const ModernHero = ({ 
  title = "ENERGY TRANSITION EXPERTS",
  subtitle = "Building Tomorrow's Energy Solutions Today",
  description = "Project Partnership is an employee-owned cooperative specializing in offshore renewables, oil & gas developments, decommissioning, and integrated energy projects. Our collaborative approach brings together the right expertise to deliver successful energy transition initiatives.",
  primaryCta = "Partner With Us",
  secondaryCta = "Our Expertise",
  onPrimaryClick,
  onSecondaryClick
}) => {
  const navigate = useNavigate();

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      // Navigate to About page and scroll to AboutAccordion
      navigate('/about');
    }
  };
  return (
    <section className="modern-hero" style={{
      position: 'relative',
      backgroundImage: `url(${seaFoam})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '80vh',
    }}>
      {/* Dark overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(172, 203, 247, 0.85) 0%, rgba(134, 181, 246, 0.75) 50%, rgba(0, 0, 0, 0.4) 100%)',
        zIndex: 1,
      }} />
      
      <div className="modern-hero-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="modern-hero-content">
          <h1 className="modern-hero-title" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            color: '#fff',
          }}>{title}</h1>
          <h2 className="modern-hero-subtitle" style={{
            textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
            color: '#fff',
          }}>{subtitle}</h2>
          <p className="modern-hero-description" style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            color: '#fff',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
          }}>{description}</p>
          
          <div className="modern-hero-cta">
            <button 
              className="modern-hero-btn primary"
              onClick={onPrimaryClick}
              style={{
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
            >
              {primaryCta}
            </button>
            <button 
              className="modern-hero-btn secondary"
              onClick={handleSecondaryClick}
              style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {secondaryCta}
            </button>
          </div>
        </div>

        <div className="modern-hero-brands">
          <p className="brands-label" style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            color: '#fff',
          }}>Trusted by industry leaders</p>
          <div className="brands-grid">
            <div className="brand-logo" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              color: '#fff',
            }}>Offshore Wind</div>
            <div className="brand-logo" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              color: '#fff',
            }}>Oil & Gas</div>
            <div className="brand-logo" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              color: '#fff',
            }}>Decommissioning</div>
            <div className="brand-logo" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              color: '#fff',
            }}>Marine Renewables</div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ModernHero;
