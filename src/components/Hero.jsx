import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Decorative paint splashes */}
      <div className="hero__splash hero__splash--1" />
      <div className="hero__splash hero__splash--2" />
      <div className="hero__splash hero__splash--3" />

      {/* Paint drip lines */}
      <div className="hero__drips">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`hero__drip hero__drip--${i + 1}`} />
        ))}
      </div>

      <div className="hero__inner">
        <div className="hero__text">
          <p className="section-label hero__eyebrow">Portfolio — 2024</p>

          <h1 className="hero__title">
            <span className="hero__title-line hero__title-line--1">Fidha</span>
            <span className="hero__title-line hero__title-line--2">
              <em>Fathima</em>
            </span>
          </h1>

          <div className="hero__divider">
            <span className="hero__divider-line" />
            <span className="hero__divider-ornament">✦</span>
            <span className="hero__divider-line" />
          </div>

          <p className="hero__subtitle">
            MERN Stack Developer
          </p>

          <p className="hero__bio">
            Crafting digital experiences with the precision of a master artisan —
            every line of code a deliberate brushstroke on the canvas of the web.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="hero__btn hero__btn--primary">
              View My Work
              <span className="hero__btn-arrow">→</span>
            </a>
            <a href="#contact" className="hero__btn hero__btn--secondary">
              Get In Touch
            </a>
          </div>

          <div className="hero__scroll-hint">
            <div className="hero__scroll-line" />
            <span>Scroll to explore</span>
          </div>
        </div>

        <div className="hero__portrait-wrap">
          <div className="hero__portrait-frame">
            <div className="hero__portrait-frame-inner">
              <img src="/profile.jpg" alt="Fidha Fathima M" />
            </div>

            {/* Decorative frame corners */}
            <div className="hero__corner hero__corner--tl" />
            <div className="hero__corner hero__corner--tr" />
            <div className="hero__corner hero__corner--bl" />
            <div className="hero__corner hero__corner--br" />
          </div>

          {/* Floating label */}
          <div className="hero__portrait-label">
            <span className="hero__portrait-label-text">Full Stack Developer</span>
            <span className="hero__portrait-label-sub">Kerala, India</span>
          </div>

          {/* Rotating badge */}
          <div className="hero__badge">
            <svg viewBox="0 0 120 120" className="hero__badge-ring">
              <path id="circle-text" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none"/>
              <text fontSize="11" fill="var(--pigment-gold)" fontFamily="EB Garamond, serif" letterSpacing="3.5">
                <textPath href="#circle-text">MERN STACK · REACT · NODE.JS · </textPath>
              </text>
            </svg>
            <span className="hero__badge-center">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}
