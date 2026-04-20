import logo from "../assets/logo-salão-trasparente.png";
import { Link } from "react-router-dom";

import "../styles/global.css";
import "../styles/navBarHome.css";

export default function NavBarHome() {
    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo"  className="img-logo-navbar"/>
                </div>
                
                <div className="link">
                    <Link to="/login" className="link-login">Área do administrador</Link>
                </div>
            </nav>
            <div class="gold-line"></div>
        </div>
    );
}