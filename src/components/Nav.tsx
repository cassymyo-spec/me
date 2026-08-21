import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <Link to="/" className="nav-logo" onClick={closeMenu}>CM</Link>

      <button
        className={`nav-toggle${menuOpen ? " open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links${menuOpen ? " open" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/#projects" onClick={closeMenu}>Projects</Link></li>
        <li><Link to="/talks" onClick={closeMenu}>Talks</Link></li>
        <li><Link to="/#skills" onClick={closeMenu}>Skills</Link></li>
        <li><Link to="/#education" onClick={closeMenu}>Education</Link></li>
      </ul>
    </nav>
  );
}
