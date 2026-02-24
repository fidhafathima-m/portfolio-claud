import { useRef, useEffect, useState } from 'react';
import './Contact.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);

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

    const elements = sectionRef.current?.querySelectorAll('.contact-reveal');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('fidhumusthafa3549@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact__bg-text">CONTACT</div>

      <div className="contact__inner">
        <div className="contact__left contact-reveal">
          <p className="section-label">Commission a Work</p>
          <h2 className="contact__title">
            Let's <em>Create</em><br/>Together
          </h2>
          <p className="contact__body">
            Whether you have a product to build, a bug to squash, or just want
            to talk about clean architecture — I'd love to hear from you.
            Every great collaboration starts with a single message.
          </p>

          <div className="contact__info">
            <div className="contact__info-item" onClick={copyEmail} data-hover>
              <span className="contact__info-icon">✉</span>
              <div className="contact__info-detail">
                <span className="contact__info-label">Email</span>
                <span className="contact__info-value">fidhumusthafa3549@gmail.com</span>
              </div>
              <span className="contact__copy-hint">{copied ? '✓ Copied!' : 'Click to copy'}</span>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon">📍</span>
              <div className="contact__info-detail">
                <span className="contact__info-label">Location</span>
                <span className="contact__info-value">Kannur, Kerala, India</span>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon">📱</span>
              <div className="contact__info-detail">
                <span className="contact__info-label">Phone</span>
                <span className="contact__info-value">+91 9778728951</span>
              </div>
            </div>
          </div>

          <div className="contact__socials">
            <a href="https://github.com/fidhafathima-m" target="_blank" rel="noreferrer" className="contact__social">
              GitHub
            </a>
            <span className="contact__social-divider">·</span>
            <a href="https://linkedin.com/in/fidha-fathima-m/" target="_blank" rel="noreferrer" className="contact__social">
              LinkedIn
            </a>
            <span className="contact__social-divider">·</span>
            <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="contact__social">
              LeetCode
            </a>
          </div>
        </div>

        <div className="contact__right contact-reveal contact-reveal--delay">
          <div className="contact__form-wrap">
            <div className="contact__form-label">Send a Message</div>
            <form
              className="contact__form"
              onSubmit={e => {
                e.preventDefault();
                window.location.href = `mailto:fidhumusthafa3549@gmail.com?subject=${encodeURIComponent(e.target.subject.value)}&body=${encodeURIComponent(e.target.message.value)}`;
              }}
            >
              <div className="contact__field">
                <label className="contact__label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="contact__input"
                  placeholder="Jane Smith"
                />
              </div>
              <div className="contact__field">
                <label className="contact__label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="contact__input"
                  placeholder="Project Collaboration"
                />
              </div>
              <div className="contact__field">
                <label className="contact__label">Message</label>
                <textarea
                  name="message"
                  required
                  className="contact__input contact__textarea"
                  placeholder="Tell me about your project..."
                  rows={6}
                />
              </div>
              <button type="submit" className="contact__submit">
                Send Message
                <span className="contact__submit-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="contact__footer">
        <div className="contact__footer-inner">
          <p className="contact__footer-copy">
            © 2024 Fidha Fathima M — Crafted with precision & passion
          </p>
          <div className="contact__footer-ornament">✦</div>
          <p className="contact__footer-sub">MERN Stack Developer · Kerala, India</p>
        </div>
      </footer>
    </section>
  );
}
