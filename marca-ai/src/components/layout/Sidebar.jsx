import "../../styles/sidebar.css";
import logo from "../../assets/logo-salão-trasparente.png";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import {
    FaHome,
    FaCalendarAlt,
    FaUser,
    FaBell,
    FaEllipsisH,
    FaSignOutAlt,
    FaCog
} from "react-icons/fa";

import {
    MdDesignServices,
    MdAccessTime
} from "react-icons/md";

import { BsClipboardCheck } from "react-icons/bs";

export default function Sidebar(){

    const [menuOpen, setMenuOpen] = useState(false);
    const [perfilOpen, setPerfilOpen] = useState(false);

    const sidebarPopupRef = useRef(null);

    useEffect(() => {

    function handleClickOutside(event){

        if(
            sidebarPopupRef.current &&
            !sidebarPopupRef.current.contains(event.target)
        ){
            setMenuOpen(false);
            setPerfilOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };

}, []);

    return(
        <section className="sidebar-container">

            <div className="logo-img">
                <img src={logo} alt="Logo" className="logo-sidebar" />
            </div>

            <div className="menu-sidebar" ref={sidebarPopupRef}>

                <nav className="menu">

                    <Link to="/dashboard" onClick={() => {setMenuOpen(false); setPerfilOpen(false);}}>
                        <FaHome className="icon-sidebar" />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/agendamentos" onClick={() => {setMenuOpen(false); setPerfilOpen(false);}}>
                        <BsClipboardCheck className="icon-sidebar" />
                        <span>Agendamentos</span>
                    </Link>

                    <Link to="/calendario" onClick={() => {setMenuOpen(false); setPerfilOpen(false);}}>
                        <FaCalendarAlt className="icon-sidebar" />
                        <span>Calendário</span>
                    </Link>

                    {/* SOMENTE DESKTOP */}

                    <Link to="/servicos" className="desktop-item" onClick={() => {setMenuOpen(false); setPerfilOpen(false);}}>
                        <MdDesignServices className="icon-sidebar" />
                        <span>Serviços</span>
                    </Link>

                    <Link to="/horarios" className="desktop-item" onClick={() => {setMenuOpen(false); setPerfilOpen(false);}}>
                        <MdAccessTime className="icon-sidebar" />
                        <span>Horários</span>
                    </Link>

                    <Link to="/clientes" className="desktop-item" onClick={() => {setMenuOpen(false); setPerfilOpen(false);}}>
                        <FaUser className="icon-sidebar" />
                        <span>Clientes</span>
                    </Link>

                    <Link to="/notificacoes" className="desktop-item" onClick={() => {setMenuOpen(false); setPerfilOpen(false);}}>
                        <FaBell className="icon-sidebar" />
                        <span>Notificações</span>
                    </Link>

                    {/* SOMENTE MOBILE */}

                    <Link
                        className="mobile-item"
                        onClick={() => {
                            setPerfilOpen(false);
                            setMenuOpen(!menuOpen);
                        }}
                    >
                        <FaEllipsisH className="icon-sidebar" />
                        <span>Mais</span>
                    </Link>

                    <Link
                        className="mobile-item"
                        onClick={() => {
                            setMenuOpen(false);
                            setPerfilOpen(!perfilOpen);
                        }}
                    >
                        <FaUser className="icon-sidebar" />
                        <span>Perfil</span>
                    </Link>

                </nav>

                {menuOpen && (
                    <div className="mobile-popup">

                        <Link 
                            className="mobile-item"
                            to="/servicos"
                            onClick={() => {
                                setMenuOpen(false);
                                setPerfilOpen(!perfilOpen);
                            }}
                        >
                            <MdDesignServices className="icon-sidebar" />
                            <span>Serviços</span>
                        </Link>

                        <Link 
                            className="mobile-item"
                            to="/horarios"
                            onClick={() => {
                                setMenuOpen(false);
                                setPerfilOpen(!perfilOpen);
                            }}
                        >
                            <MdAccessTime className="icon-sidebar" />
                            <span>Horários</span>
                        </Link>

                        <Link 
                            className="mobile-item"
                            to="/clientes"
                            onClick={() => {
                                setMenuOpen(false);
                                setPerfilOpen(!perfilOpen);
                            }}
                        >
                            <FaUser className="icon-sidebar" />
                            <span>Clientes</span>
                        </Link>

                        <Link 
                            className="mobile-item"
                            to="/notificacoes"
                            onClick={() => {
                                setMenuOpen(false);
                                setPerfilOpen(!perfilOpen);
                            }}
                        >
                            <FaBell className="icon-sidebar" />
                            <span>Notificações</span>
                        </Link>

                    </div>
                )}

                {perfilOpen && (
                    <div className="perfil-popup">

                        <Link
                            to="/perfil"
                            onClick={() => {
                                setMenuOpen(false);
                                setPerfilOpen(!perfilOpen);
                            }}
                        >
                            <FaUser className="icon-sidebar" />
                            <span>Perfil</span>
                        </Link>

                        <Link
                            to="/configuracoes"
                            onClick={() => {
                                setMenuOpen(false);
                                setPerfilOpen(!perfilOpen);
                            }}
                        >
                            <FaCog className="icon-sidebar" />
                            <span>Configurações</span>
                        </Link>

                        <Link
                            to="/logout"
                            onClick={() => {
                                setMenuOpen(false);
                                setPerfilOpen(!perfilOpen);
                            }}
                        >
                            <FaSignOutAlt className="icon-sidebar" />
                            <span>Sair</span>
                        </Link>

                    </div>
                )}
            </div>

            <footer>
                <NavLink
                    className="perfil"
                    onClick={() => {
                        setMenuOpen(false);
                        setPerfilOpen(!perfilOpen);
                    }}
                >
                    <FaUser className="icone-perfil"/>

                    <div className="perfil-texto">
                        <p>Meu perfil</p>
                    </div>
                </NavLink>
            </footer>

        </section>
    )
}