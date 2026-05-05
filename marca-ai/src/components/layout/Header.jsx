import "../../styles/header.css";
import { FiBell } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header(){

    const data = new Date();

    const formatar = (texto) => {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    const dataAtual =  data.toLocaleDateString("pt-BR", {
        day: "2-digit", 
        month: "long", 
        year: "numeric"
    });

    const diaSemana = data.toLocaleDateString("pt-BR", {
        weekday: "long"
    });


    // DEPOIS TROCAR PELA API DE NOTIFICAÇÕES
    const temNotificação = true;

    return(
        <>
            <div className="header-left">
                <h1>Olá, Designer! <BsStars className="icone-brilho"/></h1>
                <p>Bem vinda ao seu painel de controle.</p>
            </div>

            <div className="header-right">
                <Link to="/notificacacoes" className="notificacao-link">
                    <FiBell className="icone-sino"/>
                    {temNotificação && <span className="badge"></span>}
                </Link>
                
                <div className="data-container">
                    <p>{formatar(dataAtual)}</p>
                    <span>{formatar(diaSemana)}</span>
                </div>
            </div>
        </>
    )
};