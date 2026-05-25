import Layout from "../components/layout/Layout";
import CardResumo from "../components/dashboard/CardResumo";
import ListaAgendamento from "../components/dashboard/ListaAgendamento";
import Calendario from "../components/dashboard/Calendario";
import Header from "../components/layout/Header";
import LoadingScreen from "../components/common/LoadingScreen";

import {
    FaRegCalendarAlt,
    FaRegUser,
    FaRegClock,
    FaRegMoneyBillAlt
} from "react-icons/fa";

import "../styles/cardResumo.css";

import { useEffect, useState } from "react";

import { listarPorData } from "../services/agendamentoService";
import { listarClientes } from "../services/clienteService";
import { listarTodos as listarHorarios } from "../services/horarioService";
import { listar } from "../services/servicosService";

import { toast } from "react-toastify";

export default function Dashboard() {

    const [dataSelecionada, setDataSelecionada] = useState(new Date());

    const [dados, setDados] = useState({
        agendamentosHoje: 0,
        proximoHorario: { hora: "--", tempoRestante: "--" },
        clientesHoje: 0,
        faturamentoHoje: 0
    });

    const [agendamentos, setAgendamentos] = useState([]);

    const [dataReady, setDataReady]   = useState(false);
    const [pageReady, setPageReady]   = useState(false);

    function formatarData(date) {
        return date.toISOString().split("T")[0];
    }

    function calcularTempoRestante(data, hora) {
        if (!data || !hora) return "--";

        const agora       = new Date();
        const dataHorario = new Date(`${data}T${hora}`);
        const diferenca   = dataHorario.getTime() - agora.getTime();

        if (diferenca <= 0) return "Em andamento";

        const horas   = Math.floor(diferenca / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

        return `Em ${horas}h e ${minutos}min`;
    }

    async function carregarDashboard() {
        try {
            const [
                responseAgendamentos,
                responseClientes,
                responseHorarios,
                responseServicos
            ] = await Promise.allSettled([
                listarPorData(formatarData(dataSelecionada)),
                listarClientes(),
                listarHorarios(),
                listar()
            ]);

            const agendamentosHoje =
                responseAgendamentos.status === "fulfilled"
                    ? responseAgendamentos.value.data || []
                    : [];

            const clientes =
                responseClientes.status === "fulfilled"
                    ? responseClientes.value.data || []
                    : [];

            [
                responseAgendamentos,
                responseClientes,
                responseHorarios,
                responseServicos
            ].forEach((response) => {
                if (
                    response.status === "rejected" &&
                    response.reason?.response?.status !== 404
                ) {
                    toast.error("Erro ao carregar informações do dashboard.");
                }
            });

            setAgendamentos(agendamentosHoje);

        } catch (error) {
            console.error(error);
            toast.error("Erro inesperado ao carregar dashboard.");
        } finally {
            setDataReady(true);
        }
    }

    useEffect(() => {
        carregarDashboard();
    }, [dataSelecionada]);

    function handleLoadingDone() {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setPageReady(true));
        });
    }

    return (
        <>
            {!pageReady && (
                <LoadingScreen
                    ready={dataReady}
                    onDone={handleLoadingDone}
                />
            )}

            {pageReady && (
                <Layout header={<Header />}>
                    <div className="dashboard-container">

                        <div className="cards-resumo">
                            <div className="card-main">
                                <CardResumo
                                    icone={<FaRegCalendarAlt />}
                                    titulo="Agendamentos do dia"
                                    valor={dados.agendamentosHoje}
                                    linkTexto="Ver agenda"
                                    linkTo="/agendamentos"
                                />
                            </div>

                            <div className="card-main">
                                <CardResumo
                                    icone={<FaRegClock />}
                                    titulo="Próximo Horário"
                                    valor={dados.proximoHorario.hora}
                                    texto={dados.proximoHorario.tempoRestante}
                                />
                            </div>

                            <div className="card-main">
                                <CardResumo
                                    icone={<FaRegUser />}
                                    titulo="Clientes cadastrados"
                                    valor={dados.clientesHoje}
                                    linkTexto="Ver clientes"
                                    linkTo="/clientes"
                                />
                            </div>

                            <div className="card-main">
                                <CardResumo
                                    icone={<FaRegMoneyBillAlt />}
                                    titulo="Faturamento do dia"
                                    valor={`R$ ${(dados.faturamentoHoje || 0).toFixed(2)}`}
                                />
                            </div>
                        </div>

                        <div className="dashboard">
                            <ListaAgendamento
                                agendamentos={agendamentos}
                                dataSelecionada={dataSelecionada}
                            />

                            <div className="calendar-wrapper">
                                <Calendario
                                    dataSelecionada={dataSelecionada}
                                    setDataSelecionada={setDataSelecionada}
                                />
                            </div>
                        </div>

                    </div>
                </Layout>
            )}
        </>
    );
}