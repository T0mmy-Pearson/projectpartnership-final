import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        color: '#fff',
        textAlign: 'center',
        padding: '1.5rem 0',
        position: 'sticky',
        fontSize: '1rem',
        letterSpacing: '0.05em',
        backdropFilter: 'blur(2px)',
      }}
    >
      &copy; {new Date().getFullYear()} Project Partnership. All rights reserved.
    </footer>
  );
}