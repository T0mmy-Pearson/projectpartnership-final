import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Simple hamburger icon SVG
function MenuIcon({ open }) {
  return (
   <svg id='menu-icon' xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waves-icon lucide-waves"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

    // Handle close with animation (for both button and link)
  const handleClose = () => {
    setActiveLink('all'); 
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setActiveLink(null);
    }, 150); 
  };

  // Handle link click with fade effect
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setTimeout(() => {
      handleClose();
    }, 250); // fade out before closing menu
  };


  return (
    <div style={{ position: 'fixed',
     top: 0,
        right: 75,
        zIndex: 100,
        padding: '0.5rem 1rem',
        zIndex: 100,
        paddingTop: '3%',
        paddingBottom: '3%',
      }}>
     {!open && ( <button
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => {
          if (open) {
            handleClose();
          } else {
            setOpen(true);
          }
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          margin: 8,
        }}
      >
        <MenuIcon open={open ? "#000" : "#fff"} />
      </button>
     )}
      {(open || closing) && (
        <div
        className={`nav-links${open && !closing ? ' open' : ''}${closing ? ' closing' : ''}`}
          style={{
        /*     position: 'absolute',
            top: 30,            right: 80,
            borderRadius: 12,
            padding: '1.5rem 2.5rem',
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem',
            minWidth: 160, */
            transform: open && !closing
              ? 'translateX(0)'
              : closing
                ? 'translateY(-40px)'
                : 'translateX(120%)',
            opacity: open && !closing ? 1 : 0,
            pointerEvents: open && !closing ? 'auto' : 'none',
          }}
        >
          <Link
            to="/about"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 300,
              fontSize: '2.1rem',
            }}
            id='navLink'
            className='menu-link'
            onClick={() => {
                handleLinkClick(link.to);
                setOpen(false);
            }}
          >
            About
          </Link>
          <Link
            to="/Partners"
            id='navLink'
            className='menu-link'
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 300,
              fontSize: '2.1rem',
            }}
            onClick={() => {
                handleLinkClick(link.to);
                setOpen(false);
            }}
          >
            Partners
          </Link>
          <Link
            to="/resources"
            id='navLink'
            className='menu-link'
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 300,
              fontSize: '2.1rem',
            }}
            onClick={() => {
                handleLinkClick(link.to);
                setOpen(false);
            }}
          >
            Resources
          </Link>
          <Link
            to="/contact"
            id='navLink'
            className='menu-link'
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 300,
              fontSize: '2.1rem',
            }}
            onClick={() => {
                handleLinkClick(link.to);
                setOpen(false);
            }}
          >
            Contact
          </Link>
          {/* Exit cross in top right of overlay */}
          <button
            aria-label="Close menu"
            onClick={handleClose}
            className='close-button'
          >
            <svg width="32" height="32" viewBox="0 0 32 32">
              <line x1="8" y1="8" x2="24" y2="24" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              <line x1="24" y1="8" x2="8" y2="24" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}