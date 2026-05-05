import "../../styles/sidebar.css";
import logo from "../../assets/logo-salão-trasparente.png"
import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUser, FaBell } from "react-icons/fa";
import { MdDesignServices, MdAccessTime } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export default function Sidebar(){
    return(
        <section className="sidebar-container">
            
            <div className="logo-img">
                <img src={logo} alt="Logo" className="logo-sidebar" />
            </div>

            <div className="menu-sidebar">

                <nav className="menu">
                    
                    <Link to="/dashboard">
                        <FaHome className="icon-sidebar" /> Dashboard
                    </Link>

                    <Link to="/agendamentos">
                        <BsClipboardCheck className="icon-sidebar" /> Agendamentos
                    </Link>

                    <Link to="/calendario">
                        <FaCalendarAlt className="icon-sidebar" /> Calendário
                    </Link>

                    <Link to="/servicos">
                        <MdDesignServices className="icon-sidebar" /> Serviços
                    </Link>

                    <Link to="/horarios">
                        <MdAccessTime className="icon-sidebar" /> Horários
                    </Link>

                    <Link to="/clientes">
                        <FaUser className="icon-sidebar" /> Clientes
                    </Link>

                    <Link to="/notificacoes">
                        <FaBell className="icon-sidebar" /> Notificações
                    </Link>
                </nav>
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
};