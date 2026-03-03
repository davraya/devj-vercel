import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/journal" className="nav-link">Journal</Link>
      <Link to="/application" className="nav-link">Applications</Link>
    </nav>
    )
}

export default Navbar;