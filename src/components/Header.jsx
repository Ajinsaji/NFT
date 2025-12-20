import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Verify", path: "/verify" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-badge">NFT</div>
          <div className="logo-text">
            <div className="logo-title">NFT-Creds</div>
            <div className="logo-subtitle">Secure Academic Credentials</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Profile */}
          <Link to="/login" className="profile-icon">
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
