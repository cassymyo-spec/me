import { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import talks from "../data/talks";

export default function Talks() {
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

  return (
    <>
      <Nav />

      <div className="main-container">
        <section id="talks-page">
          <div className="section-header reveal">
            <h2 className="section-title">Teddy Talks</h2>
          </div>

          <div className="talks-list">
            {talks.map((talk) => (
              <Link key={talk.slug} to={`/talks/${talk.slug}`} className="talk-card reveal">
                <div className="talk-body">
                  <h3 className="talk-title">{talk.title}</h3>
                  <p className="talk-sub">{talk.subtitle}</p>
                  <p className="talk-desc">{talk.description}</p>
                  <ul className="talk-topics">
                    {talk.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                  <div className="talk-footer">
                    <div className="talk-tags">
                      {talk.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">{tag}</span>
                      ))}
                    </div>
                    <span className="talk-link">Read talk →</span>
                  </div>
                </div>
              </Link>
            ))}
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
      </div>
    </>
  );
}
