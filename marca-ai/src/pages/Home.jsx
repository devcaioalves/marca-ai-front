import NavBarHome from "../components/NavBarHome";
import GoldenButton from "../components/GoldenButton";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

import foto from "../assets/foto-principal.png";
import design from "../assets/design.jpeg";
import henna from "../assets/henna.jpeg";
import micro from "../assets/micro.jpeg";
import browlamination from "../assets/brow-lamination.jpeg";

import "../styles/home.css";

export default function Home() {
    return (
        <section>
            <NavBarHome />
            <div className="hero">

                <div className="container">

                    <div className="left">
                        <img src={foto} alt="Foto Principal" />
                    </div>

                    <div className="right">
                        <h1>O OLHAR <strong>PERFEITO</strong> PARA VOCÊ</h1>
                        <h3>Realce sua beleza com sobrancelhas impecáveis</h3>

                        <GoldenButton  className="btn-agendar">Agendar Agora
                        </GoldenButton>
                    </div>
                </div>

                <div className="about-studio">
                    <h2>SOBRE O ESTÚDIO</h2>
                    <p>Sou especialista em sobrancelhas, dedicada a valorizar a beleza natural de cada cliente.</p>
                </div>

                <div className="line"></div>

                <div className="services">
                    <h2>SERVIÇOS</h2>
                    
                    <div className="imagens">

                        <div className="card-img">
                            <img src={design} alt="Design de Sobrancelhas" className="design"/>
                            <p>Design simples</p>
                        </div>

                        <div className="card-img">
                            <img src={henna} alt="Henna para Sobrancelhas" className="henna"/>
                            <p>Design com henna</p>
                        </div>

                        <div className="card-img">
                            <img src={micro} alt="Micropigmentação de Sobrancelhas" className="micro"/>
                            <p>Micropigmentação</p>
                        </div>

                        <div className="card-img">
                            <img src={browlamination} alt="Brow Lamination" className="brow"/>
                            <p>Brow Lamination</p>
                        </div>
                    </div>
                </div>

                <div className="info">
                    <p>Para conhecer mais dos meus serviços, siga-me nas redes sociais e entre em contato comigo diretamente pelo WhatsApp e agende seu horário.</p>
                </div>

                <div className="redes-sociais">
                    <FaWhatsapp className="icon whatsapp" />

                    <a 
                        href="https://www.instagram.com/nadjaamorim.pmu?igsh=MXd2c3p5NDlzaHllcQ==" target="_blank" rel="noopener noreferrer" className="insta-link">
                            <span>@nadjaamorim.pmu</span>
                            <FaInstagram className="icon instagram" />
                    </a>
                </div>
            </div>
        </section>  
    );
}