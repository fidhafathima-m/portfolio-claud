import { useEffect, useRef } from 'react';
import './About.css';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__inner">
        <div className="about__left reveal">
          <p className="section-label">About the Artist</p>
          <h2 className="about__title">
            Code as <em>Canvas</em>
          </h2>
          <div className="about__ornament">
            <span>— </span>
            <svg width="60" height="2" viewBox="0 0 60 2">
              <line x1="0" y1="1" x2="60" y2="1" stroke="var(--pigment-gold)" strokeWidth="1" strokeDasharray="4 2"/>
            </svg>
          </div>
          <p className="about__text">
            I'm Fidha Fathima M, a Full-Stack Developer from Kannur, Kerala — where
            the monsoons meet the mountains. I graduated with a Bachelor of Computer
            Application from Kannur University in 2024 and have since been deeply immersed
            in the MERN ecosystem.
          </p>
          <p className="about__text">
            Like a painter who carefully selects each pigment, I approach every project
            with deliberate precision — architecting clean, scalable systems with the same
            care a craftsperson gives to their most treasured work. I believe great software
            is invisible in its complexity, visible only in its elegance.
          </p>
          <p className="about__text">
            I'm passionate about writing maintainable code, building thoughtful user experiences,
            and solving real-world problems through technology.
          </p>

          <div className="about__facts">
            <div className="about__fact">
              <span className="about__fact-num">2+</span>
              <span className="about__fact-label">Years Experience</span>
            </div>
            <div className="about__fact">
              <span className="about__fact-num">10+</span>
              <span className="about__fact-label">Projects Built</span>
            </div>
            <div className="about__fact">
              <span className="about__fact-num">1</span>
              <span className="about__fact-label">BCA Degree</span>
            </div>
          </div>
        </div>

        <div className="about__right reveal reveal--delay">
          <div className="about__palette">
            <p className="about__palette-title">My Palette</p>
            <div className="about__palette-grid">
              {[
                { color: '#61DAFB', label: 'React' },
                { color: '#3178C6', label: 'TypeScript' },
                { color: '#339933', label: 'Node.js' },
                { color: '#47A248', label: 'MongoDB' },
                { color: '#F7DF1E', label: 'JavaScript' },
                { color: '#F05032', label: 'Git' },
                { color: '#FF9900', label: 'AWS' },
                { color: '#06B6D4', label: 'Tailwind' },
              ].map(item => (
                <div className="about__paint-blob" key={item.label} title={item.label}>
                  <div
                    className="about__blob-inner"
                    style={{ background: item.color }}
                  />
                  <span className="about__blob-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about__links">
            <a href="https://github.com/fidhafathima-m" target="_blank" rel="noreferrer" className="about__link">
              <span className="about__link-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </span>
              GitHub
            </a>
            <a href="https://linkedin.com/in/fidha-fathima-m/" target="_blank" rel="noreferrer" className="about__link">
              <span className="about__link-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </span>
              LinkedIn
            </a>
            <a href="mailto:fidhumusthafa3549@gmail.com" className="about__link">
              <span className="about__link-icon">✉</span>
              Email Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
