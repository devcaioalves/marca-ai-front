import "../../styles/header.css";

import { FiBell } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

import { Link } from "react-router-dom";

import {
    useState,
    useEffect,
    useRef
} from "react";

import {
    listarNotificacaoAgendamento
} from "../../services/notificacoesService";

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

    // NOTIFICAÇÕES
    const [notificacoes, setNotificacoes] =
        useState([]);

    const temNotificacao =
        notificacoes.length > 0;

    const [notificacaoOpen, setNotificacaoOpen] =
        useState(false);

    const notificacaoRef =
        useRef(null);

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

    // CARREGAR NOTIFICAÇÕES
    useEffect(() => {

        async function carregarNotificacoes(){

            try{

                const response =
                    await listarNotificacaoAgendamento();

                setNotificacoes(
                    response.data || []
                );

            }catch(error){

                console.error(
                    "Erro ao carregar notificações",
                    error
                );

                setNotificacoes([]);
            }
        }

        carregarNotificacoes();

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

                <div
                    className="notificacao-link"
                    onClick={() =>
                        setNotificacaoOpen(!notificacaoOpen)
                    }
                >
                    <FiBell className="icone-sino"/>

                    {temNotificacao && (
                        <span className="badge"></span>
                    )}
                </div>

                {/* DATA */}

                <div className="data-container">

                    <p>{formatar(dataAtual)}</p>

                    <span>{formatar(diaSemana)}</span>

                </div>

                {/* POPUP */}

                {notificacaoOpen && (

                    <div className="notificacao-popup">

                        {notificacoes.length > 0 ? (

                            notificacoes
                                .slice(0, 3)
                                .map((notificacao) => (

                                    <div
                                        key={notificacao.id}
                                        className="notificacao-item"
                                    >

                                        <strong>
                                            {
                                                notificacao.titulo ||
                                                "Notificação"
                                            }
                                        </strong>

                                        <span>
                                            {
                                                notificacao.mensagem
                                            }
                                        </span>

                                    </div>
                                ))

                        ) : (

                            <div className="notificacao-item">

                                <span>
                                    Nenhuma notificação encontrada.
                                </span>

                            </div>
                        )}

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