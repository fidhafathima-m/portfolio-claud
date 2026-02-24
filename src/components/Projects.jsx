import { useState, useEffect, useRef } from 'react';
import './Projects.css';

const projects = [
  {
    id: 1,
    name: 'LocalFix',
    tagline: 'Service Providing SaaS Platform',
    description: 'A multi-tenant SaaS platform helping people get home services easily. Features subscription tiers with Razorpay integration, Redis caching for OTP/session management, and centralized error handling.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Razorpay'],
    github: 'https://github.com/fidhafathima-m/LocalFix',
    live: '#',
    category: 'Featured',
    highlights: [
      'Subscription tiers with recurring payments (3 plans)',
      'Repository pattern + SOLID + Dependency Injection',
      'Redis caching — reduced auth latency by ~30%',
      'Centralized error handling (~95% coverage)',
    ],
    color: '#c9993a',
  },
  {
    id: 2,
    name: 'Art Mart',
    tagline: 'Full-Stack E-commerce Platform',
    description: 'A complete e-commerce application with modular MVC architecture, role-based authentication, admin dashboard with MongoDB Aggregation, deployed on AWS EC2 with Nginx.',
    tags: ['Node.js', 'Express', 'MongoDB', 'EJS', 'AWS EC2', 'Nginx', 'PM2'],
    github: 'https://github.com/fidhafathima-m/Art__Mart',
    live: '#',
    category: 'Featured',
    highlights: [
      '40% fewer page reloads using Fetch API',
      'Excel export for 10,000+ transactions',
      '60% faster data processing via Aggregation',
      'Cloudinary — cut load times by 30%',
    ],
    color: '#8b2635',
  },
  {
    id: 3,
    name: 'Image Hub',
    tagline: 'Image CRUD Application',
    description: 'A simple yet complete web application with user registration, login, and full CRUD operations for image management. Built with TypeScript for type safety.',
    tags: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/fidhafathima-m/image_hub',
    live: null,
    category: 'Mini Projects',
    color: '#5a7a5c',
  },
  {
    id: 4,
    name: 'Event Booking',
    tagline: 'Event Management Platform',
    description: 'An event booking platform where users can browse, register, and manage event registrations. Clean UI with a smooth booking flow.',
    tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/fidhafathima-m/event-booking',
    live: null,
    category: 'Mini Projects',
    color: '#c4612a',
  },
  {
    id: 5,
    name: 'UMS React Redux JWT',
    tagline: 'User Management System',
    description: 'A User Management System built with React, Redux for global state management, and JWT for secure authentication. Full CRUD for user operations.',
    tags: ['React', 'Redux', 'JWT', 'Node.js'],
    github: 'https://github.com/fidhafathima-m/UMS-react-redux-jwt',
    live: null,
    category: 'Mini Projects',
    color: '#3178c6',
  },
  {
    id: 6,
    name: 'Canvas & Color Academy',
    tagline: 'Art Academy Website',
    description: 'A fully responsive website for an art academy, featuring course listings, gallery, and contact sections. Showcases clean layout and CSS animation skills.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/fidhafathima-m/canvas-color-art-academy',
    live: null,
    category: 'Mini Projects',
    color: '#9b6b9b',
  },
  {
    id: 7,
    name: 'OLX Clone (React)',
    tagline: 'Marketplace UI Clone',
    description: 'A React-based clone of OLX marketplace with product listings, category filtering, and a buy/sell interface. Demonstrates component architecture and state management.',
    tags: ['React', 'JavaScript', 'Firebase'],
    github: 'https://github.com/fidhafathima-m/olx-react',
    live: null,
    category: 'Clone Projects',
    color: '#47a248',
  },
  {
    id: 8,
    name: 'Netflix Clone (React)',
    tagline: 'Streaming UI Clone',
    description: 'A Netflix-inspired UI clone built with React. Features movie carousels, genre filtering, and a dynamic homepage — powered by the TMDB API.',
    tags: ['React', 'JavaScript', 'TMDB API'],
    github: 'https://github.com/fidhafathima-m/netflix-react',
    live: null,
    category: 'Clone Projects',
    color: '#e50914',
  },
  {
    id: 9,
    name: 'To-Do App (React)',
    tagline: 'Task Management App',
    description: 'A clean, interactive To-Do application built with React. Features task creation, completion toggle, deletion, and local storage persistence.',
    tags: ['React', 'JavaScript'],
    github: 'https://github.com/fidhafathima-m/to-do-app-react',
    live: null,
    category: 'Mini Projects',
    color: '#f7df1e',
  },
  {
    id: 10,
    name: 'User Management System',
    tagline: 'Admin & User Panel',
    description: 'A full-stack User Management System with admin and user panels. Includes authentication, role-based access, and CRUD operations built with EJS templates.',
    tags: ['Node.js', 'Express', 'MongoDB', 'EJS'],
    github: 'https://github.com/fidhafathima-m/User-Management-System',
    live: null,
    category: 'Mini Projects',
    color: '#61dafb',
  },
  {
    id: 11,
    name: 'Tesla Clone',
    tagline: 'Landing Page Clone',
    description: 'A pixel-perfect clone of the Tesla website landing page, showcasing HTML/CSS layout skills, full-screen sections, and smooth scroll effects.',
    tags: ['HTML', 'CSS'],
    github: 'https://github.com/fidhafathima-m/Tesla-Clone',
    live: null,
    category: 'Clone Projects',
    color: '#cc0000',
  },
  {
    id: 12,
    name: 'Monthly Challenges (Django)',
    tagline: 'First Django Project',
    description: 'A simple Django-based website that displays monthly challenge content when a month is clicked. My first backend web project, marking the beginning of the backend journey.',
    tags: ['Python', 'Django', 'HTML'],
    github: 'https://github.com/fidhafathima-m/monthly-challenges',
    live: null,
    category: 'Mini Projects',
    color: '#092e20',
  },
];

const categories = ['All', 'Featured', 'Mini Projects', 'Clone Projects'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08 }
    );

    const elements = sectionRef.current?.querySelectorAll('.proj-reveal');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects__inner">
        <div className="projects__header proj-reveal">
          <p className="section-label">The Gallery</p>
          <h2 className="projects__title">My <em>Works</em></h2>
          <p className="projects__subtitle">
            A collection of applications — each one a study in craft and problem-solving.
          </p>
        </div>

        <div className="projects__filter proj-reveal">
          {categories.map(cat => (
            <button
              key={cat}
              className={`projects__filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filtered.map((project, i) => (
            <article
              key={project.id}
              className={`proj-reveal project-card ${project.category === 'Featured' ? 'project-card--featured' : ''}`}
              style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
            >
              {/* Top colored stripe */}
              <div
                className="project-card__stripe"
                style={{ background: project.color }}
              />

              <div className="project-card__body">
                <div className="project-card__top">
                  <div>
                    <span className="project-card__category">{project.category}</span>
                    <h3 className="project-card__name">{project.name}</h3>
                    <p className="project-card__tagline">{project.tagline}</p>
                  </div>
                  <div
                    className="project-card__orb"
                    style={{ background: project.color + '22', borderColor: project.color + '44' }}
                  >
                    <span style={{ color: project.color }}>◆</span>
                  </div>
                </div>

                <p className="project-card__desc">{project.description}</p>

                {project.highlights && (
                  <ul className="project-card__highlights">
                    {project.highlights.map(h => (
                      <li key={h}>
                        <span className="project-card__bullet" style={{ color: project.color }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="project-card__tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </div>

                <div className="project-card__links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="project-card__link project-card__link--live"
                      style={{ borderColor: project.color, color: project.color }}
                    >
                      ↗ Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
