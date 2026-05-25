import "../../styles/sidebar.css";
import logo from "../../assets/logo-salao-trasparente.png";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
    FaHome,
    FaCalendarAlt,
    FaUser,
    FaUsers,
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
    const { logout } = useAuth();

    const sidebarPopupRef = useRef(null);

    useEffect(() => {

    function handleClickOutside(event){

        if(
            sidebarPopupRef.current &&
            !sidebarPopupRef.current.contains(event.target)
        ){
            setMenuOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };

}, []);

    function handleLogout(){
        logout();
        setMenuOpen(false);
    }

    return(
        <section className="sidebar-container">

            <div className="logo-img">
                <img src={logo} alt="Logo" className="logo-sidebar" />
            </div>

            <div className="menu-sidebar" ref={sidebarPopupRef}>

                <nav className="menu">

                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                        <FaHome className="icon-sidebar" />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/agendamentos" onClick={() => setMenuOpen(false)}>
                        <BsClipboardCheck className="icon-sidebar" />
                        <span>Agendamentos</span>
                    </Link>

                    <Link to="/servicos" onClick={() => setMenuOpen(false)}>
                        <MdDesignServices className="icon-sidebar" />
                        <span>Serviços</span>
                    </Link>

                    {/* SOMENTE DESKTOP */}

                    <Link to="/horarios" className="desktop-item" onClick={() => setMenuOpen(false)}>
                        <MdAccessTime className="icon-sidebar" />
                        <span>Horários</span>
                    </Link>

                    <Link to="/clientes" className="desktop-item" onClick={() => setMenuOpen(false)}>
                        <FaUsers className="icon-sidebar" />
                        <span>Clientes</span>
                    </Link>

                    <Link to="/notificacoes" className="desktop-item" onClick={() => setMenuOpen(false)}>
                        <FaBell className="icon-sidebar" />
                        <span>Notificações</span>
                    </Link>

                    <Link to="/perfil" className="desktop-item" onClick={() => setMenuOpen(false)}>
                        <FaUser className="icon-sidebar" />
                        <span>Meu perfil</span>
                    </Link>

                    {/* SOMENTE MOBILE */}

                    <Link
                        className="mobile-item"
                        onClick={() => 
                            setMenuOpen(!menuOpen)
                            }
                    >
                        <FaEllipsisH className="icon-sidebar" />
                        <span>Mais</span>
                    </Link>

                    <Link
                        className="mobile-item"
                        to="/"
                        onClick={() => {handleLogout();
                        }}
                    >
                        <FaSignOutAlt className="icon-sidebar" />
                        <span>Sair</span>
                    </Link>

                </nav>

                {menuOpen && (
                    <div className="mobile-popup">

                        <Link 
                            className="mobile-item"
                            to="/servicos"
                            onClick={() => 
                                setMenuOpen(false)
                            }
                        >
                            <MdDesignServices className="icon-sidebar" />
                            <span>Serviços</span>
                        </Link>

                        <Link 
                            className="mobile-item"
                            to="/horarios"
                            onClick={() => 
                                setMenuOpen(false) 
                            }
                        >
                            <MdAccessTime className="icon-sidebar" />
                            <span>Horários</span>
                        </Link>

                        <Link 
                            className="mobile-item"
                            to="/clientes"
                            onClick={() => 
                                setMenuOpen(false)
                            }
                        >
                            <FaUsers className="icon-sidebar" />
                            <span>Clientes</span>
                        </Link>

                        <Link 
                            className="mobile-item"
                            to="/notificacoes"
                            onClick={() => 
                                setMenuOpen(false)
                            }
                        >
                            <FaBell className="icon-sidebar" />
                            <span>Notificações</span>
                        </Link>

                        <Link 
                            className="mobile-item"
                            to="/perfil"
                            onClick={() => 
                                setMenuOpen(false)
                            }
                        >
                            <FaUser className="icon-sidebar" />
                            <span>Meu perfil</span>
                        </Link>

                    </div>
                )}

            </div>

            <footer>
                <NavLink
                    className="perfil"
                    to="/"
                    onClick={() => {handleLogout();
                    }}
                >
                    <FaSignOutAlt className="icone-perfil"/>

                    <div className="perfil-texto">
                        <p>Sair</p>
                    </div>
                </NavLink>
            </footer>

        </section>
    )
}