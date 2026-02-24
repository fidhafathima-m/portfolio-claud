import { useEffect, useRef } from 'react';
import './Skills.css';

const skillGroups = [
  {
    category: 'Languages & Databases',
    icon: '◈',
    skills: [
      { name: 'JavaScript', level: 92 },
      { name: 'TypeScript', level: 85 },
      { name: 'MongoDB', level: 88 },
      { name: 'MySQL', level: 75 },
      { name: 'HTML & CSS', level: 95 },
      { name: 'C', level: 70 },
    ]
  },
  {
    category: 'Frontend & UI',
    icon: '◉',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Redux', level: 82 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'EJS / Handlebars', level: 80 },
    ]
  },
  {
    category: 'Backend & Architecture',
    icon: '◎',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 90 },
      { name: 'RESTful APIs', level: 92 },
      { name: 'SOLID Principles', level: 82 },
      { name: 'Repository Pattern', level: 80 },
      { name: 'Mongoose / Inversify', level: 78 },
    ]
  },
  {
    category: 'DevOps & Tools',
    icon: '◆',
    skills: [
      { name: 'Git & GitHub Actions', level: 85 },
      { name: 'AWS (EC2 & S3)', level: 78 },
      { name: 'Nginx & PM2', level: 75 },
      { name: 'Postman', level: 88 },
      { name: 'Redis', level: 72 },
    ]
  },
];

export default function Skills() {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.skills-reveal');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="skills__inner">
        <div className="skills__header skills-reveal">
          <p className="section-label">Craft & Technique</p>
          <h2 className="skills__title">My <em>Toolkit</em></h2>
          <p className="skills__subtitle">
            Every artist has their instruments — these are mine.
          </p>
        </div>

        <div className="skills__grid">
          {skillGroups.map((group, gi) => (
            <div
              className="skills-reveal skills__card"
              key={group.category}
              style={{ transitionDelay: `${gi * 0.12}s` }}
            >
              <div className="skills__card-header">
                <span className="skills__card-icon">{group.icon}</span>
                <h3 className="skills__card-title">{group.category}</h3>
              </div>

              <div className="skills__bars">
                {group.skills.map((skill) => (
                  <div className="skills__bar-wrap" key={skill.name}>
                    <div className="skills__bar-meta">
                      <span className="skills__bar-name">{skill.name}</span>
                      <span className="skills__bar-pct">{skill.level}%</span>
                    </div>
                    <div className="skills__bar-track">
                      <div
                        className="skills__bar-fill"
                        style={{ '--target-width': `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
