import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [hideLogo, setHideLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideLogo(window.scrollY > 20); // Hide after 40px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="headerLogo">
        <Link to="/" style={{ textDecoration: "none" }} className={hideLogo ? 'logo-hidden' : ''}>
          <h1
            id="logo"
            className="animate__animated animate__slideInLeft animate__duration-2s"
            style={{ transition: 'opacity 0.5s, transform 15s', color: "#fff", cursor: "pointer", whiteSpace: "nowrap", backdropFilter: "blur(3px)" }}
          >
            project partnership
          </h1>
        </Link>
      </div>
      <div className="navIcon">
       <Navbar style={{ position: 'fixed', opacity: hideLogo ? 0 : 1, transform: hideLogo ? 'translateY(-40px) scale(0.95)' : 'translateY(0) scale(1)', transition: 'opacity 0.5s, transform 0.5s' }} />
    </div>
    </>
  );
}
