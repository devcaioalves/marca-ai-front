import "../../styles/sidebar.css";
import logo from "../../assets/logo-salão-trasparente.png";
import { useState } from "react";

import { Link, NavLink } from "react-router-dom";

import {
    FaHome,
    FaCalendarAlt,
    FaUser,
    FaBell,
    FaEllipsisH
} from "react-icons/fa";

import {
    MdDesignServices,
    MdAccessTime
} from "react-icons/md";

import { BsClipboardCheck } from "react-icons/bs";

export default function Sidebar(){

    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <section className="sidebar-container">

            <div className="logo-img">
                <img src={logo} alt="Logo" className="logo-sidebar" />
            </div>

            <div className="menu-sidebar">

                <nav className="menu">

                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                        <FaHome className="icon-sidebar" />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/agendamentos" onClick={() => setMenuOpen(false)}>
                        <BsClipboardCheck className="icon-sidebar" />
                        <span>Agendamentos</span>
                    </Link>

                    <Link to="/calendario" onClick={() => setMenuOpen(false)}>
                        <FaCalendarAlt className="icon-sidebar" />
                        <span>Calendário</span>
                    </Link>

                    {/* SOMENTE DESKTOP */}

                    <Link to="/servicos" className="desktop-item" onClick={() => setMenuOpen(false)}>
                        <MdDesignServices className="icon-sidebar" />
                        <span>Serviços</span>
                    </Link>

                    <Link to="/horarios" className="desktop-item" onClick={() => setMenuOpen(false)}>
                        <MdAccessTime className="icon-sidebar" />
                        <span>Horários</span>
                    </Link>

                    <Link to="/clientes" className="desktop-item" onClick={() => setMenuOpen(false)}>
                        <FaUser className="icon-sidebar" />
                        <span>Clientes</span>
                    </Link>

                    <Link to="/notificacoes" className="desktop-item" onClick={() => setMenuOpen(false)}>
                        <FaBell className="icon-sidebar" />
                        <span>Notificações</span>
                    </Link>

                    {/* SOMENTE MOBILE */}

                    <Link
                        className="mobile-item"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <FaEllipsisH className="icon-sidebar" />
                        <span>Mais</span>
                    </Link>

                    <Link to="/perfil" className="mobile-item" onClick={() => setMenuOpen(false)}>
                        <FaUser className="icon-sidebar" />
                        <span>Perfil</span>
                    </Link>

                </nav>

                {menuOpen && (
                    <div className="mobile-popup">

                        <Link 
                            className="mobile-item"
                            to="/servicos"
                            onClick={() => setMenuOpen(false)}
                        >
                            <MdDesignServices className="icon-sidebar" />
                            <span>Serviços</span>
                        </Link>

                        <Link 
                            className="mobile-item"
                            to="/horarios"
                            onClick={() => setMenuOpen(false)}
                        >
                            <MdAccessTime className="icon-sidebar" />
                            <span>Horários</span>
                        </Link>

                        <Link 
                            className="mobile-item"
                            to="/clientes"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FaUser className="icon-sidebar" />
                            <span>Clientes</span>
                        </Link>

                        <Link 
                            className="mobile-item"
                            to="/notificacoes"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FaBell className="icon-sidebar" />
                            <span>Notificações</span>
                        </Link>

                    </div>
                )}
            </div>

            <footer>
                <NavLink to="/perfil" className="perfil">
                    <FaUser className="icone-perfil"/>

                    <div className="perfil-texto">
                        <p>Meu perfil</p>
                    </div>
                </NavLink>
            </footer>

        </section>
    )
}