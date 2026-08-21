import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Nav from "../components/Nav";
import talks from "../data/talks";

export default function TalkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const talk = talks.find((t) => t.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!talk) {
    return <Navigate to="/talks" replace />;
  }

  return (
    <>
      <Nav />

      <div className="main-container">
        <section id="talk-detail">
          <Link to="/talks" className="talk-back">← All Teddy Talks</Link>

          <div className="talk-detail-header">
            <h1 className="talk-detail-title">{talk.title}</h1>
            <p className="talk-sub">{talk.subtitle}</p>
            <p className="talk-desc">{talk.description}</p>
            <div className="talk-tags">
              {talk.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="talk-detail-body">
            {talk.sections.map((section, i) => (
              <div key={i} className="talk-section reveal">
                <h2 className="talk-section-title">{section.heading}</h2>
                {section.body && <p className="talk-section-body">{section.body}</p>}
                {section.points && (
                  <ul className="talk-section-points">
                    {section.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                )}
                {section.code && (
                  <pre className="talk-code"><code>{section.code}</code></pre>
                )}
              </div>
            ))}

            <div className="talk-section talk-takeaways">
              <h2 className="talk-section-title">Key Takeaways</h2>
              <ul className="talk-section-points">
                {talk.takeaways.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
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
      </div>
    </>
  );
}
