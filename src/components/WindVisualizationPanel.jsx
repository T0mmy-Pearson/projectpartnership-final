import React, { useState } from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  width: ${props => props.isExpanded ? '400px' : '80px'};
  height: ${props => props.isExpanded ? '300px' : '80px'};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1000;
  overflow: hidden;
  cursor: ${props => props.isExpanded ? 'default' : 'pointer'};

  &:hover {
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  border: none;
  background: linear-gradient(135deg, #5e9cff 0%, #76e2c6 100%);
  border-radius: 50%;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(94, 156, 255, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const IframeContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  opacity: ${props => props.isExpanded ? 1 : 0};
  transition: opacity 0.3s ease 0.1s;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 5px;
`;

const CompactIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  opacity: ${props => props.isExpanded ? 0 : 1};
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const Title = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 14px;
  font-weight: 600;
  color: #2a3342;
  opacity: ${props => props.isExpanded ? 1 : 0};
  transition: opacity 0.3s ease 0.1s;
  pointer-events: none;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5e9cff;
  font-size: 14px;
  opacity: ${props => props.isLoading ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 15px;
`;

export default function WindVisualizationPanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const togglePanel = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setIsLoading(true);
    } else {
      setIsExpanded(false);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <PanelContainer 
      isExpanded={isExpanded}
      onClick={!isExpanded ? togglePanel : undefined}
    >
      <Title isExpanded={isExpanded}>Live Wind Data</Title>
      
      <ToggleButton onClick={togglePanel}>
        {isExpanded ? '×' : 'Wind'}
      </ToggleButton>

      <CompactIcon isExpanded={isExpanded}>
        🌍
      </CompactIcon>

      {isExpanded && (
        <IframeContainer isExpanded={isExpanded}>
          <StyledIframe
            src="https://earth.nullschool.net/#current/wind/surface/level/orthographic=-5.65,55.56,1456"
            title="Earth Wind Visualization"
            onLoad={handleIframeLoad}
            loading="lazy"
          />
          <LoadingOverlay isLoading={isLoading}>
            Loading wind data...
          </LoadingOverlay>
        </IframeContainer>
      )}
    </PanelContainer>
  );
}
