import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import '../styles/navbar.css'

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/Services" },
    { label: "About Us", path: "/About Us" },
    { label: "Contact", path: "/Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        MochaPay
      </Link>

      <ul className="nav-items">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${isActive(item.path) ? "active" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button onClick={() => setIsOpen(!isOpen)} className="menu-toggle">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li key={item.path} className="mobile-item">
            <Link
              to={item.path}
              className={`mobile-link ${isActive(item.path) ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
