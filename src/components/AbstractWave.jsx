import React, { useRef, useEffect } from 'react';

// Color scheme: deep blue, cyan, light blue, white
const COLORS = [
  '#0a192f', // deep blue
  '#4fc3f7', // cyan
  '#81d4fa', // light blue
  '#ffffff', // white
];

export default function AbstractWave({ width = 800, height = 300 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = COLORS[0];
    ctx.fillRect(0, 0, width, height);

    // Draw layered abstract waves
    const waveConfigs = [
      { amplitude: 40, frequency: 1.5, offset: 0, color: COLORS[1], alpha: 0.5 },
      { amplitude: 25, frequency: 2.2, offset: 40, color: COLORS[2], alpha: 0.6 },
      { amplitude: 15, frequency: 3.1, offset: 80, color: COLORS[3], alpha: 0.3 },
    ];

    waveConfigs.forEach(cfg => {
      ctx.save();
      ctx.globalAlpha = cfg.alpha;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 2) {
        const y =
          height -
          (height / 3) +
          Math.sin((x / width) * Math.PI * cfg.frequency + cfg.offset) * cfg.amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = cfg.color;
      ctx.shadowColor = cfg.color;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();
    });
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        display: 'block',
        width: '100%',
        maxWidth: width,
        height: 'auto',
        borderRadius: '24px',
        boxShadow: '0 4px 32px #0a192f44',
        background: COLORS[0],
      }}
      aria-hidden="true"
    />
  );
}