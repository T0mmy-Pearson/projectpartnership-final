import React, { useState } from "react";

export default function WindVisualizationMini({ 
  width = '300px',
  height = '200px',
  borderRadius = '1rem'
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleClick = () => {
    setIsExpanded(true);
  };

  const handleCloseModal = () => {
    setIsExpanded(false);
  };

  const handleModalClick = (e) => {
    // Close modal if clicking on backdrop
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Mini Wind Visualization Window */}
      <div 
        onClick={handleClick}
        style={{
          width,
          height,
          borderRadius,
          overflow: 'hidden',
          position: 'relative',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }}
      >
        <iframe
          src="https://earth.nullschool.net/#current/wind/surface/level/orthographic=-5.65,55.56,687"
          title="Live Wind Visualization"
          onLoad={handleIframeLoad}
          loading="lazy"
          style={{
            width: '150%',
            height: '150%',
            border: 'none',
            position: 'absolute',
            top: '-25%',
            left: '-25%',
            filter: 'brightness(0.9) contrast(1.1)',
            transition: 'filter 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />
        
        {/* Loading Overlay */}
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '12px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            borderRadius,
          }}>
            Loading wind data...
          </div>
        )}
        
        {/* Live Indicator */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(34, 197, 94, 0.9)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          zIndex: 3,
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            background: 'white',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
          }} />
          LIVE
        </div>

        {/* Click to expand hint */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          opacity: 0.8,
        }}>
          🔍 Click to expand
        </div>
      </div>

      {/* Expanded Modal - Same as original WindVisualizationCard */}
      {isExpanded && (
        <div 
          onClick={handleModalClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'fadeIn 0.4s ease-out',
          }}
        >
          {/* Modal Content */}
          <div style={{
            width: '90vw',
            height: '90vh',
            maxWidth: '1200px',
            maxHeight: '800px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            animation: 'zoomIn 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          }}>
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: 10001,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>

            {/* Modal Header */}
            <div style={{
              padding: '30px 30px 20px 30px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <h2 style={{
                margin: 0,
                color: '#fff',
                fontSize: '1.8rem',
                fontWeight: '600',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}>
                Live Wind Visualization
              </h2>
              <p style={{
                margin: '10px 0 0 0',
                color: '#fff',
                opacity: 0.9,
                fontSize: '1rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}>
                Real-time wind patterns and atmospheric conditions across the UK and surrounding waters.
              </p>
            </div>

            {/* Expanded Iframe */}
            <div style={{
              width: '100%',
              height: 'calc(100% - 120px)',
              position: 'relative',
            }}>
              <iframe
                src="https://earth.nullschool.net/#current/wind/surface/level/orthographic=-5.65,55.56,687"
                title="Live Wind Visualization - Expanded"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '0 0 2rem 2rem',
                }}
              />
              
              {/* Expanded Live Indicator */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(34, 197, 94, 0.9)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 10001,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                }} />
                LIVE WIND DATA
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
