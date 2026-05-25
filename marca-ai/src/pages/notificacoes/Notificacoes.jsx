import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import HeaderCommon from "../../components/common/HeaderCommon";
import CardBase from "../../components/common/CardBase";

import {
    FaBell,
    FaCheckCircle,
    FaClock
} from "react-icons/fa";

import {
    listarNotificacaoAgendamento,
    listarNotificacaoStatus,
    marcarNotificacaoLida
} from "../../services/notificacoesService";

import { toast } from "react-toastify";

import "../../styles/notificacoes.css";

export default function Notificacoes(){

    const [filtro, setFiltro] =
        useState("agendamentos");

    const [statusSelecionado, setStatusSelecionado] =
        useState("LIDO");

    const [notificacoes, setNotificacoes] =
        useState([]);

    async function carregarNotificacoes(){

        try{

            let response;

            // AGENDAMENTOS
            if(filtro === "agendamentos"){

                response =
                    await listarNotificacaoAgendamento();

            }else{

                // STATUS
                response =
                    await listarNotificacaoStatus(
                        statusSelecionado
                    );
            }

            const dados = response.data || [];

            setNotificacoes(dados);

            // LISTA VAZIA
            if(dados.length === 0){

                toast.info(
                    "Nenhuma notificação encontrada."
                );
            }

        }catch(error){

            setNotificacoes([]);

            // NOT FOUND
            if(error.response?.status === 404){

                toast.info(
                    "Nenhuma notificação encontrada."
                );

                return;
            }

            const mensagem =
                error.response?.data?.message ||
                "Erro ao carregar notificações!";

            toast.error(mensagem);
        }
    }

    useEffect(() => {

        carregarNotificacoes();

    }, [filtro, statusSelecionado]);

    async function handleMarcarComoLida(id){

        try{

            await marcarNotificacaoLida(id);

            toast.success(
                "Notificação marcada como lida!"
            );

            carregarNotificacoes();

        }catch(error){

            const mensagem =
                error.response?.data?.message ||
                "Erro ao marcar notificação!";

            toast.error(mensagem);
        }
    }

    return(
        <Layout
            header={
                <HeaderCommon
                    titulo="Notificações"
                    subtitulo="Acompanhe suas notificações."
                />
            }
        >
            <div className="notificacoes-container">

                {/* FILTROS */}

                <div className="filtro-notificacao">

                    <p
                        className={
                            filtro === "agendamentos"
                                ? "ativo"
                                : ""
                        }
                        onClick={() =>
                            setFiltro("agendamentos")
                        }
                    >
                        Por agendamentos
                    </p>

                    <p
                        className={
                            filtro === "status"
                                ? "ativo"
                                : ""
                        }
                        onClick={() =>
                            setFiltro("status")
                        }
                    >
                        Por status
                    </p>

                </div>

                {/* FILTRO STATUS */}

                {filtro === "status" && (

                    <div className="status-opcoes">

                        <button
                            className={
                                statusSelecionado === "LIDO"
                                    ? "ativo"
                                    : ""
                            }
                            onClick={() =>
                                setStatusSelecionado("LIDO")
                            }
                        >
                            LIDO
                        </button>

                        <button
                            className={
                                statusSelecionado === "ENVIADO"
                                    ? "ativo"
                                    : ""
                            }
                            onClick={() =>
                                setStatusSelecionado("ENVIADO")
                            }
                        >
                            ENVIADO
                        </button>

                    </div>
                )}

                {/* LISTA */}

                <div className="lista-notificacoes">

                    {notificacoes.length > 0 ? (

                        notificacoes.map((notificacao) => (

                            <CardBase
                                key={notificacao.id}
                                titulo={
                                    notificacao.titulo ||
                                    "Notificação"
                                }
                                acoes={
                                    !notificacao.lida && (
                                        <button
                                            className="btn-lida"
                                            onClick={() =>
                                                handleMarcarComoLida(
                                                    notificacao.id
                                                )
                                            }
                                        >
                                            <FaCheckCircle />
                                            Marcar como lida
                                        </button>
                                    )
                                }
                            >

                                <div className="notificacao-info">

                                    <span>
                                        <FaBell className="icone" />
                                        {
                                            notificacao.mensagem
                                        }
                                    </span>

                                    <span>
                                        <FaClock className="icone" />
                                        {
                                            notificacao.dataCriacao
                                        }
                                    </span>

                                </div>

                            </CardBase>

                        ))

                    ) : (

                        <div className="sem-informacao horarios">

                            <span>
                                Nenhuma notificação encontrada.
                            </span>

                        </div>

                    )}

                </div>

            </div>
        </Layout>
    );
}