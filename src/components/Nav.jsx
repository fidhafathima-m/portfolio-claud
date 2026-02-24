import { useState, useEffect } from 'react';
import './Nav.css';

const navLinks = ['About', 'Skills', 'Projects', 'Studio', 'Contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__logo">
        <span className="nav__logo-f">F</span>
        <span className="nav__logo-text">idha</span>
      </div>

      <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
        {navLinks.map(link => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          </li>
        ))}
        <li>
          <a
            href="mailto:fidhumusthafa3549@gmail.com"
            className="nav__cta"
            onClick={() => setMenuOpen(false)}
          >
            Hire Me
          </a>
        </li>
      </ul>

      <button
        className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}
