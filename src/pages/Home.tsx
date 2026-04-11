import { useEffect, useState } from "react";
import projects from "../data/projects";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 70);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href) {
          const scrollTarget = document.querySelector<Element>(href);
          if (scrollTarget) {
            scrollTarget.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  const handleDownloadCV = async () => {
    setShowModal(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const link = document.createElement('a');
      link.href = '/casper_moyo_cv.pdf';
      link.download = 'casper_moyo_cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setShowModal(false);
      
    } catch (error) {
      console.error('Download failed:', error);
      setShowModal(false);
    }
  };

  return (
    <>
      {/* NAVIGATION */}
      <nav>
        <a href="#home" className="nav-logo">CM</a>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#education">Education</a></li>
        </ul>
      </nav>

      <div className="main-container">
        {/* HERO */}
        <section className="hero" id="home">
        <div className="hero-left">
          <p className="hero-tag"></p>
          <h1 className="hero-name">Casper<br/><em>Moyo</em></h1>
          <p className="hero-title">Software Engineer</p>
          <p className="hero-bio" style={{ textAlign: 'left' }}>
            Passionate Software Engineer who loves building elegant solutions to complex problems. Specializing in Django, ERP systems, and scalable networks with deep expertise in IoT integration and regulatory compliance. Creating robust backend systems that drive business success while embracing the art of clean, maintainable code.
          </p>
          <div className="hero-actions">
            <a href="mailto:cassymyo@gmail.com" className="btn-primary">Get in touch →</a>
            <a href="https://github.com/cassymyo-spec" target="_blank" rel="noopener noreferrer" className="btn-outline">GitHub ↗</a>
            <button onClick={handleDownloadCV} className="btn-outline">Download CV</button>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-stats">
            <div className="stat-box">
              <div className="stat-num">3+</div>
              <div className="stat-label">Years building</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">2</div>
              <div className="stat-label">Open source libs</div>
            </div>
          </div>

          <div className="hero-contact">
            <div className="contact-item">
              <div className="contact-dot"></div>
              <span>Harare, Zimbabwe</span>
            </div>
            <div className="contact-item">
              <div className="contact-dot"></div>
              <a href="tel:+263778587612">+263 778 587 612</a>
            </div>
            <div className="contact-item">
              <div className="contact-dot"></div>
              <a href="mailto:cassymyo@gmail.com">cassymyo@gmail.com</a>
            </div>
            <div className="contact-item">
              <div className="contact-dot"></div>
              <a href="https://linkedin.com/in/casper-moyo-017020284" target="_blank" rel="noopener noreferrer">linkedin.com/in/casper-moyo</a>
            </div>
          </div>
        </div>
      </section>

    {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-header reveal">
          <span className="section-num">01</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div className="exp-grid">

          <div className="exp-item reveal">
            <div className="exp-meta">
              <p className="exp-date">09/2025 — Present</p>
              <p className="exp-company">Sigma366 App</p>
              <p className="exp-location">Remote</p>
            </div>
            <div className="exp-content">
              <h3 className="exp-role">Frontend Developer (Freelance)</h3>
              <ul className="exp-points">
                <li>Developing responsive, modular web interfaces for a school management platform.</li>
                <li>Implemented role-based dashboards for students, teachers, and administrators.</li>
                <li>Integrated frontend with backend APIs for authentication and data management.</li>
                <li>Focused on maintainable architecture, performance optimisation, and consistent UX.</li>
              </ul>
              <div className="exp-stack">
                <span className="tag">Angular</span>
                <span className="tag">TypeScript</span>
                <span className="tag">HTML/CSS</span>
                <span className="tag">RESTful APIs</span>
              </div>
            </div>
          </div>

          <div className="exp-item reveal">
            <div className="exp-meta">
              <p className="exp-date">01/2026 — 03/2026</p>
              <p className="exp-company">Montclair Resort & Conference</p>
              <p className="exp-location">Harare, Zimbabwe</p>
            </div>
            <div className="exp-content">
              <h3 className="exp-role">Software Engineer</h3>
              <ul className="exp-points">
                <li>Developed remote IoT control system for turning borehole pump on/off from 2km distance, eliminating manual travel time.</li>
                <li>Integrated temperature sensors to monitor pump operational status and prevent overheating damage.</li>
                <li>Built secure web interface for real-time pump activation, scheduling, and temperature monitoring dashboard.</li>
                <li>Implemented automated temperature alerts and shutdown protocols to protect pump from damage during operation.</li>
                <li>Deployed reliable cellular communication ensuring instant pump control access from any location with internet connectivity.</li>
              </ul>
              <div className="exp-stack">
                <span className="tag">IoT</span>
                <span className="tag">Embedded Systems</span>
              </div>
            </div>
          </div>

          <div className="exp-item reveal">
            <div className="exp-meta">
              <p className="exp-date">01/2023 — 10/2025</p>
              <p className="exp-company">Parsales Investments</p>
              <p className="exp-location">Harare, Zimbabwe</p>
            </div>
            <div className="exp-content">
              <h3 className="exp-role">Software Engineer</h3>
              <ul className="exp-points">
                <li>Designed and led development of Inhouse ERP — a full Inventory, Finance, POS & User Management platform.</li>
                <li>Implemented ZIMRA fiscalisation integration, including fiscal device communication, receipt signing and validation.</li>
                <li>Built secure, scalable RESTful APIs for mobile apps and third-party integrations.</li>
                <li>Deployed systems across three operational branches ensuring high availability and data consistency.</li>
                <li>Developed and rolled out a Restaurant Management System across multiple production environments.</li>
                <li>Optimised background processing with Redis and Celery, significantly improving system responsiveness.</li>
                <li>Managed Docker-based deployments, version control workflows, and mentored junior developers.</li>
              </ul>
              <div className="exp-stack">
                <span className="tag">Django</span>
                <span className="tag">DRF</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">Redis</span>
                <span className="tag">Celery</span>
                <span className="tag">Docker</span>
                <span className="tag">HTMX</span>
              </div>
            </div>
          </div>

          <div className="exp-item reveal">
            <div className="exp-meta">
              <p className="exp-date">12/2023 — 05/2024</p>
              <p className="exp-company">Heartview Care</p>
              <p className="exp-location">Remote (UK)</p>
            </div>
            <div className="exp-content">
              <h3 className="exp-role">Virtual Administrator</h3>
              <ul className="exp-points">
                <li>Automated staff shift and operational data processing, reducing report generation time by 75%.</li>
                <li>Built internal automation tools using Django and Pandas for CSV data cleaning and report generation.</li>
                <li>Improved reporting accuracy while eliminating repetitive manual tasks.</li>
              </ul>
              <div className="exp-stack">
                <span className="tag">Django</span>
                <span className="tag">DRF</span>
                <span className="tag">React</span>
                <span className="tag">Pandas</span>
                <span className="tag">CSV Automation</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    {/* PROJECTS */}
      <section id="projects">
        <div className="section-header reveal">
          <span className="section-num">02</span>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card reveal">
              <p className="project-num">{project.num}</p>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-sub">{project.subtitle}</p>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    {/* SKILLS */}
      <section id="skills">
        <div className="section-header reveal">
          <span className="section-num">03</span>
          <h2 className="section-title">Technical Skills</h2>
        </div>

        <div className="skills-grid">
          <div className="skill-cat reveal">
            <p className="skill-cat-name">Backend Development</p>
            <ul className="skill-list">
              <li>Python</li>
              <li>Django & DRF</li>
              <li>Flask / FastAPI</li>
              <li>Celery & Redis</li>
              <li>PostgreSQL</li>
              <li>MySQL</li>
              <li>RESTful APIs</li>
            </ul>
          </div>
          <div className="skill-cat reveal">
            <p className="skill-cat-name">Frontend Development</p>
            <ul className="skill-list">
              <li>JavaScript / TypeScript</li>
              <li>React</li>
              <li>React Native</li>
              <li>Angular</li>
              <li>HTML5 & CSS3</li>
              <li>HTMX</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div className="skill-cat reveal">
            <p className="skill-cat-name">DevOps & Infrastructure</p>
            <ul className="skill-list">
              <li>Docker & Containerization</li>
              <li>Git & Version Control</li>
              <li>Linux Administration</li>
              <li>Nginx & Web Servers</li>
              <li>CI/CD Pipelines</li>
              <li>Cloud Services</li>
              <li>System Monitoring</li>
            </ul>
          </div>
          <div className="skill-cat reveal">
            <p className="skill-cat-name">Data & Analytics</p>
            <ul className="skill-list">
              <li>Pandas & NumPy</li>
              <li>Data Processing</li>
              <li>CSV Automation</li>
              <li>Report Generation</li>
            </ul>
          </div>
          <div className="skill-cat reveal">
            <p className="skill-cat-name">Integrations & APIs</p>
            <ul className="skill-list">
              <li>Third-party API Integration</li>
              <li>LLM Integration</li>
              <li>Twilio & WhatsApp API</li>
              <li>Payment Gateways</li>
              <li>OAuth & Authentication</li>
            </ul>
          </div>
          <div className="skill-cat reveal">
            <p className="skill-cat-name">Domain Expertise</p>
            <ul className="skill-list">
              <li>Systems Engineering</li>
              <li>ERP Systems</li>
              <li>POS Systems</li>
              <li>ZIMRA Fiscal Integration</li>
              <li>IoT & Embedded Systems</li>
              <li>SaaS Architecture</li>
              <li>Regulatory Compliance</li>
              <li>Business Process Automation</li>
            </ul>
          </div>
        </div>
      </section>

    {/* EDUCATION */}
      <section id="education">
        <div className="section-header reveal">
          <span className="section-num">04</span>
          <h2 className="section-title">Education</h2>
        </div>

        <div className="edu-block reveal">
          <div>
            <p className="exp-date" style={{marginBottom:'0.5rem'}}>Catholic University of Zimbabwe</p>
            <p className="exp-location">Harare, Zimbabwe</p>
          </div>
          <div>
            <h3 className="exp-role">Bachelor of Business Administration and Information Technology</h3>
            <p style={{fontSize:'14px', color:'var(--ink-2)', marginTop:'0.75rem', lineHeight:'1.75', fontFamily:'var(--sans)', fontWeight:'400'}}>
              Combined programme covering core business disciplines alongside information systems, software development, and technology management. Provides the dual perspective that informs a practical approach to building software that solves real business problems.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p className="footer-text">© 2026 Casper Moyo — Harare, Zimbabwe</p>
        <div className="footer-links">
          <a href="mailto:cassymyo@gmail.com">Email</a>
          <a href="https://linkedin.com/in/casper-moyo-017020284" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/cassymyo-spec" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>

      {/* Download Modal */}
      {showModal && (
        <div className="download-modal active" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <div className="spinner"></div>
            </div>
            <h3>Downloading CV...</h3>
            <p>Please wait while we prepare your download.</p>
          </div>
        </div>
      )}
      </div>
    </>
  );
}