import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import HeaderCommon from "../../components/common/HeaderCommon";
import CardBase from "../../components/common/CardBase";
import Calendario from "../../components/dashboard/Calendario";

import {
    FaClock,
    FaCalendarAlt,
    FaUser
} from "react-icons/fa";

import {
    listarPorData as listarAgendamentosPorData
} from "../../services/agendamentoService";

import {
    listarPordata as listarHorariosPorData
} from "../../services/horarioService";

import { toast } from "react-toastify";

import "../../styles/calendarioPage.css";

export default function CalendarioPage(){

    // DATA
    const [dataSelecionada, setDataSelecionada] = useState(new Date());

    // FILTRO
    const [tipoLista, setTipoLista] = useState("agendamentos");

    // LISTAS
    const [agendamentos, setAgendamentos] = useState([]);
    const [horarios, setHorarios] = useState([]);

    function formatarDataApi(data){

        const ano = data.getFullYear();

        const mes = String(data.getMonth() + 1)
            .padStart(2, "0");

        const dia = String(data.getDate())
            .padStart(2, "0");

        return `${dia}/${mes}/${ano}`;
    }

    function formatarDataCard(data){

        if(!data){
            return "";
        }

        const [ano, mes, dia] = data.split("-");

        return `${dia}/${mes}/${ano}`;
    }

    async function carregarDados(){

        try{

            const dataFormatada = formatarDataApi(dataSelecionada);

            const [
                responseAgendamentos,
                responseHorarios
            ] = await Promise.all([
                listarAgendamentosPorData(dataFormatada),
                listarHorariosPorData(dataFormatada)
            ]);

            setAgendamentos(responseAgendamentos.data);
            setHorarios(responseHorarios.data);

        }catch(error){

            setAgendamentos([]);
            setHorarios([]);

            const mensagem =
                error.response?.data?.message ||
                "Erro ao carregar informações!";

            toast.error(mensagem);
        }
    }

    useEffect(() => {
        carregarDados();
    }, [dataSelecionada]);

    return(
        <Layout
            header={
                <HeaderCommon
                    titulo="Calendário"
                    subtitulo="Visualize agendamentos e horários por data."
                />
            }
        >
            <div className="calendario-page-container">

                {/* TOPO */}

                <div className="calendario-topo">

                    <div className="filtro-calendario">

                        <p
                            className={
                                tipoLista === "agendamentos"
                                    ? "ativo"
                                    : ""
                            }
                            onClick={() =>
                                setTipoLista("agendamentos")
                            }
                        >
                            Agendamentos
                        </p>

                        <p
                            className={
                                tipoLista === "horarios"
                                    ? "ativo"
                                    : ""
                            }
                            onClick={() =>
                                setTipoLista("horarios")
                            }
                        >
                            Horários
                        </p>

                    </div>

                </div>

                {/* CONTEÚDO */}

                <div className="calendario-layout">

                    {/* CALENDÁRIO */}

                    <div className="calendario-wrapper-page">

                        <Calendario
                            dataSelecionada={dataSelecionada}
                            setDataSelecionada={setDataSelecionada}
                        />

                    </div>

                    {/* LISTA */}

                    <div className="lista-wrapper">

                        {tipoLista === "agendamentos" ? (

                            agendamentos.length > 0 ? (

                                agendamentos.map((agendamento) => (

                                    <CardBase
                                        key={agendamento.id}
                                        titulo={formatarDataCard(agendamento.data)}
                                    >

                                        <div className="card-info">

                                            <span>
                                                <FaClock className="icone" />
                                                {agendamento.horaInicio}
                                            </span>

                                            <span>
                                                <FaUser className="icone" />
                                                {agendamento.clienteNome}
                                            </span>

                                            <span>
                                                <FaCalendarAlt className="icone" />
                                                {agendamento.servicoNome}
                                            </span>

                                        </div>

                                    </CardBase>

                                ))

                            ) : (

                                <div className="sem-informacao horarios">

                                    <span>
                                        Não há agendamentos nessa data.
                                    </span>

                                </div>

                            )

                        ) : (

                            horarios.length > 0 ? (

                                horarios.map((horario) => (

                                    <CardBase
                                        key={horario.id}
                                        titulo={formatarDataCard(horario.data)}
                                    >

                                        <div className="card-info">

                                            <span>
                                                <FaClock className="icone" />
                                                {horario.horaInicio} às {horario.horaFim}
                                            </span>

                                            <span>
                                                <FaCalendarAlt className="icone" />
                                                {horario.agendamentos.length} agendamento(s)
                                            </span>

                                        </div>

                                    </CardBase>

                                ))

                            ) : (

                                <div className="sem-informacao horarios">

                                    <span>
                                        Não há horários nessa data.
                                    </span>

                                </div>

                            )

                        )}

                    </div>

                </div>

            </div>
        </Layout>
    );
}