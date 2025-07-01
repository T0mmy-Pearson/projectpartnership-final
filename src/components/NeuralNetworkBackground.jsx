import React, { useRef, useEffect } from 'react';

const NODE_COUNT = 60;
const NODE_RADIUS = 10;
const LINE_DISTANCE = 120;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createNodes(width, height) {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: randomBetween(1, width),
    y: randomBetween(0, height),
    vx: randomBetween(-0.2, 0.2),
    vy: randomBetween(-0.2, 0.2),
  }));
}

export default function NeuralNetworkBackground() {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const animationRef = useRef();
  const scrollYRef = useRef(window.scrollY);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    nodesRef.current = createNodes(width, height);

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const a = nodesRef.current[i];
          const b = nodesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DISTANCE) {
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / LINE_DISTANCE})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let node of nodesRef.current) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    }

    function animate() {

      for (let node of nodesRef.current) {
        node.x += node.vx + (scrollYRef.current * 0.0005); 
        node.y += node.vy + (scrollYRef.current * 0.0003);

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
      draw();
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      nodesRef.current = createNodes(width, height);
    }

    function handleScroll() {
      scrollYRef.current = window.scrollY;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 100,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#ACCBF7',
      }}
      aria-hidden="true"
    />
  );
}