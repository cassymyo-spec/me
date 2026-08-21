import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/" className="nav-logo">CM</Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/#projects">Projects</Link></li>
        <li><Link to="/talks">Talks</Link></li>
        <li><Link to="/#skills">Skills</Link></li>
        <li><Link to="/#education">Education</Link></li>
      </ul>
    </nav>
  );
}
