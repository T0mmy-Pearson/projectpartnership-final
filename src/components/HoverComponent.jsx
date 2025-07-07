import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  perspective: 1000px;
  margin: 1rem;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #fafbff 100%);
  border-radius: 1.5rem;
  box-shadow: 
    0 4px 20px 0 rgba(60, 72, 88, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.8);
  padding: 2.5rem;
  max-width: 340px;
  min-height: 240px;
  transition: 
    transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1),
    background 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(94, 156, 255, 0.03) 0%, rgba(118, 226, 198, 0.03) 100%);
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &:hover {
    transform: translateY(-15px) rotateX(5deg) rotateY(5deg) scale(1.02);
    box-shadow: 
      0 25px 70px 0 rgba(94, 156, 255, 0.12),
      0 10px 40px 0 rgba(60, 72, 88, 0.08),
      0 0 0 1px rgba(94, 156, 255, 0.08);
    background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    left: 100%;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const IconBg = styled.div`
  background: linear-gradient(135deg, #5e9cff 0%, #76e2c6 100%);
  border-radius: 1rem;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 
    all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #76e2c6 0%, #5e9cff 100%);
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  ${Card}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 10px 30px 0 rgba(94, 156, 255, 0.3);
  }

  ${Card}:hover &::before {
    opacity: 1;
  }

  ${Card}:hover &::after {
    width: 100%;
    height: 100%;
  }
`;

const IconContent = styled.div`
  position: relative;
  z-index: 3;
  color: white;
  font-size: 1.5rem;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #2a3342;
  transition: 
    all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #5e9cff 0%, #76e2c6 100%);
    transition: width 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  ${Card}:hover & {
    color: #1a2332;
    transform: translateX(5px);
  }

  ${Card}:hover &::after {
    width: 30px;
  }
`;

const Description = styled.p`
  margin: 0;
  color: #4e5d6c;
  font-size: 1rem;
  line-height: 1.7;
  transition: 
    all 0.6s cubic-bezier(0.23, 1, 0.32, 1);

  ${Card}:hover & {
    color: #3e4d5c;
    transform: translateX(5px);
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #5e9cff 0%, #76e2c6 100%);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0) rotate(180deg);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);

  ${Card}:hover & {
    opacity: 0.7;
    transform: scale(1) rotate(0deg);
  }

  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    width: 4px;
    height: 4px;
    background: rgba(94, 156, 255, 0.5);
    border-radius: 50%;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.1s;
    transform: scale(0);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 6px;
    height: 6px;
    background: rgba(118, 226, 198, 0.5);
    border-radius: 50%;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
    transform: scale(0);
  }

  ${Card}:hover &::before,
  ${Card}:hover &::after {
    transform: scale(1);
  }
`;

export default function HoverComponent({ 
  icon = "⚡", 
  title = "Energy Solutions", 
  description = "Advanced data processing and analytics for modern energy challenges with real-time insights." 
}) {
  return (
    <CardContainer>
      <Card>
        <FloatingElement />
        <IconWrapper>
          <IconBg>
            <IconContent>{icon}</IconContent>
          </IconBg>
        </IconWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Card>
    </CardContainer>
  );
}
