import Layout from "../components/layout/Layout";
import CardResumo from "../components/dashboard/CardResumo";
import ListaAgendamento from "../components/dashboard/ListaAgendamento";
import { FaRegCalendarAlt , FaRegUser, FaRegClock, FaRegMoneyBillAlt  } from "react-icons/fa";
import "../styles/cardResumo.css";
import { useState } from "react";
import Calendario from "../components/dashboard/Calendario";


export default function Dashboard(){

    // SIMULAÇÃO DE DADOS
    const dados = {
        agendamentosHoje: 8,
        proximoHorario: {
            hora: "13:00",
            tempoRestante: "Em 1h e 30min"
        },
        clientesHoje: 6,
        faturamentoHoje: 1200.00
    };

    // DATA SELECIONADA DO CALENDÁRIO
    const [dataSelecionada, setDataSelecionada] = useState(new Date());

    // SIMULAÇÃO DE AGENDAMENTOS PARA A DATA SELECIONADA
    const agendamentos =[
        {
            id: 1,
            statusAgendamento: "CONFIRMADO",
            data: "2026-05-05",
            horaInicio: "09:00:00",
            clienteNome: "Maria Silva",
            servicoNome: "Design de sobrancelha"
        },

        {
            id: 2,
            statusAgendamento: "CONFIRMADO",
            data: "2026-05-05",
            horaInicio: "10:30:00",
            clienteNome: "Ana Souza",
            servicoNome: "Henna"
        },

        {
            id: 3,
            statusAgendamento: "REALIZADO",
            data: "2026-05-05",
            horaInicio: "10:30:00",
            clienteNome: "Ana Souza",
            servicoNome: "Henna"
        },

        {
            id: 4,
            statusAgendamento: "CANCELADO",
            data: "2026-05-05",
            horaInicio: "10:30:00",
            clienteNome: "Ana Souza",
            servicoNome: "Henna"
        },

        {
            id: 5,
            statusAgendamento: "REMARCADO",
            data: "2026-05-05",
            horaInicio: "10:30:00",
            clienteNome: "Ana Souza",
            servicoNome: "Henna"
        },

        {
            id: 6,
            statusAgendamento: "REMARCADO",
            data: "2026-05-05",
            horaInicio: "10:30:00",
            clienteNome: "Ana Souza",
            servicoNome: "Henna"
        }
    ];

    function formatarData(date) {
        return date.toISOString().split('T')[0];
    }

    const agendamentosFiltrados = agendamentos.filter(agendamento => agendamento.data === formatarData(dataSelecionada));

    return(
        <Layout>
            <div className="dashboard-container">
                <div className="cards-resumo">
                
                    <div className="card-main">
                        <CardResumo
                            icone={<FaRegCalendarAlt  />}
                            titulo="Agendamentos do dia"
                            valor={dados?.agendamentosHoje || "--"}
                            linkTexto="Ver agenda"
                            linkTo="/agendamentos"
                        />
                    </div>
                    <div className="card-main">
                        <CardResumo
                            icone={<FaRegClock />}
                            titulo="Próximo Horário"
                            valor={dados?.proximoHorario?.hora || "--"}
                            texto={dados?.proximoHorario?.tempoRestante}
                        />
                    </div>
                    <div className="card-main">
                        <CardResumo
                            icone={<FaRegUser />}
                            titulo="Clientes do dia"
                            valor={dados?.clientesHoje || "--"}
                            linkTexto="Ver clientes"
                            linkTo="/clientes"
                        />
                    </div>
                    <div className="card-main">
                        <CardResumo
                            icone={<FaRegMoneyBillAlt  />}
                            titulo="Faturamento do dia"
                            valor={dados?.faturamentoHoje ? `R$ ${dados.faturamentoHoje.toFixed(2)}` : "--"}
                        />
                    </div>
                </div>
                <div className="dashboard">
                        <ListaAgendamento
                            agendamentos={agendamentosFiltrados}
                            dataSelecionada={dataSelecionada}
                        />

                        <Calendario
                            dataSelecionada={dataSelecionada}
                            setDataSelecionada={setDataSelecionada}
                        />
                </div>
            </div>
        </Layout>
    )
};