import "../../styles/header.css";

import { FiBell } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

import { Link } from "react-router-dom";

import {
    useState,
    useEffect,
    useRef
} from "react";

export default function Header(){

    const data = new Date();

    const formatar = (texto) => {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    const dataAtual = data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const diaSemana = data.toLocaleDateString("pt-BR", {
        weekday: "long"
    });

    // DEPOIS TROCAR PELA API
    const temNotificacao = true;

    const [notificacaoOpen, setNotificacaoOpen] =
        useState(false);

    const notificacaoRef = useRef(null);

    // FECHAR AO CLICAR FORA
    useEffect(() => {

        function handleClickOutside(event){

            if(
                notificacaoRef.current &&
                !notificacaoRef.current.contains(event.target)
            ){
                setNotificacaoOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return(
        <>
            <div className="header-left">

                <h1>
                    Olá, Designer!
                    <BsStars className="icone-brilho"/>
                </h1>

                <p>
                    Bem vinda ao seu painel de controle.
                </p>

                <span className="mobile-date">
                    {formatar(dataAtual)} • {formatar(diaSemana)}
                </span>

            </div>

            <div
                className="header-right"
                ref={notificacaoRef}
            >

                {/* BOTÃO NOTIFICAÇÃO */}

                <Link
                    className="notificacao-link"
                    onClick={() =>
                        setNotificacaoOpen(!notificacaoOpen)
                    }
                >
                    <FiBell className="icone-sino"/>

                    {temNotificacao && (
                        <span className="badge"></span>
                    )}
                </Link>

                {/* DATA */}

                <div className="data-container">

                    <p>{formatar(dataAtual)}</p>

                    <span>{formatar(diaSemana)}</span>

                </div>

                {/* POPUP */}

                {notificacaoOpen && (

                    <div className="notificacao-popup">

                        <div className="notificacao-item">

                            <strong>
                                Novo agendamento
                            </strong>

                            <span>
                                Maria Silva agendou às 14:00
                            </span>

                        </div>

                        <div className="notificacao-item">

                            <strong>
                                Horário remarcado
                            </strong>

                            <span>
                                Ana Souza alterou o horário
                            </span>

                        </div>

                        <div className="notificacao-item">

                            <strong>
                                Pagamento confirmado
                            </strong>

                            <span>
                                Pagamento recebido hoje
                            </span>

                        </div>

                        <Link
                            to="/notificacoes"
                            className="ver-todas"
                            onClick={() =>
                                setNotificacaoOpen(false)
                            }
                        >
                            Ver todas
                        </Link>

                    </div>
                )}

            </div>
        </>
    );
}