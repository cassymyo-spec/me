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
          <p className="hero-bio" style={{ textAlign: 'center' }}>
            Passionate Software Engineer who loves building elegant solutions to complex problems. Specializing in Django, ERP systems, and scalable networks with deep expertise in IoT integration and regulatory compliance. Creating robust backend systems that drive business success while embracing the art of clean, maintainable code.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="mailto:cassymyo@gmail.com" className="btn-primary">Get in touch →</a>
            <a href="https://github.com/cassymyo-spec" target="_blank" rel="noopener noreferrer" className="btn-outline">GitHub ↗</a>
            <button onClick={handleDownloadCV} className="btn-outline">Download CV</button>
          </div>
        </div>
      </section>

    
    {/* PROJECTS */}
      <section id="projects">
        <div className="section-header reveal">
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card reveal">
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.name}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}
                />
              )}
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
          <h2 className="section-title">Education</h2>
        </div>

        <div className="edu-block reveal">
          <div>
            <p className="exp-date" style={{marginBottom:'0.5rem', textAlign: 'left'}}>Catholic University of Zimbabwe</p>
            <p className="exp-location" style={{textAlign: 'left'}}>Harare, Zimbabwe</p>
          </div>
          <div>
            <h3 className="exp-role" style={{textAlign: 'left'}}>Bachelor of Business Administration and Information Technology</h3>
            <p style={{fontSize:'14px', color:'var(--ink-2)', marginTop:'0.75rem', lineHeight:'1.75', fontFamily:'var(--sans)', fontWeight:'400', textAlign: 'left'}}>
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