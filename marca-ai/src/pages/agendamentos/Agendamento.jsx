import { useEffect, useState } from "react";
import HeaderCommon from "../../components/common/HeaderCommon";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

import {
    FaClock,
    FaCalendarAlt,
    FaEdit,
    FaTrash,
    FaUser
} from "react-icons/fa";

import CardBase from "../../components/common/CardBase";
import ModalConfirmacao from "../../components/common/ModalConfirmacao";

import {
    cancelar,
    listarPorData,
    listarTodos
} from "../../services/agendamentoService";

import { toast } from "react-toastify";

import "../../styles/agendamentoPage.css";

export default function Agendamento(){

    const navigate = useNavigate();

    // LISTA DE AGENDAMENTOS
    const [agendamentos, setAgendamentos] = useState([]);

    // FILTRO
    const [filtro, setFiltro] = useState("data");

    // DATA
    const [dataSelecionada, setDataSelecionada] = useState(
        new Date().toISOString().split("T")[0]
    );

    // MODAL
    const [modalAberto, setModalAberto] = useState(false);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);

    function formatarData(data){

        if(!data){
            return "";
        }

        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    async function carregarAgendamentos(){

        try{

            let response;

            if(filtro === "todos"){
                response = await listarTodos();
            }else{
                response = await listarPorData(
                    formatarData(dataSelecionada)
                );
            }

            setAgendamentos(response.data);

        }catch(error){

            setAgendamentos([]);

            const mensagem =
                error.response?.data?.message ||
                "Erro ao carregar agendamentos!";

            toast.error(mensagem);
        }
    }

    useEffect(() => {
        carregarAgendamentos();
    }, [filtro, dataSelecionada]);

    async function handleExcluir(){

        try{

            await cancelar(agendamentoSelecionado.id);

            toast.success("Agendamento cancelado com sucesso!");

            carregarAgendamentos();

            setModalAberto(false);

        }catch(error){

            const mensagem =
                error.response?.data?.message ||
                "Erro ao cancelar agendamento!";

            toast.error(mensagem);
        }
    }

    function abrirModalExcluir(agendamento){

        setAgendamentoSelecionado(agendamento);

        setModalAberto(true);
    }

    return(
        <Layout
            header={
                <HeaderCommon
                    titulo="Agendamentos"
                    subtitulo="Gerencie seus agendamentos."
                />
            }
        >
            <div className="agendamentos-container">

                <div className="busca busca-horario">

                    <div className="filtro">

                        <p
                            className={filtro === "data" ? "ativo" : ""}
                            onClick={() => setFiltro("data")}
                        >
                            Por data
                        </p>

                        <p
                            className={filtro === "todos" ? "ativo" : ""}
                            onClick={() => setFiltro("todos")}
                        >
                            Todos
                        </p>

                    </div>

                    {filtro === "data" && (
                        <div className="filtro-data">

                            <input
                                type="date"
                                value={dataSelecionada}
                                onChange={(e) =>
                                    setDataSelecionada(e.target.value)
                                }
                            />

                        </div>
                    )}

                </div>

                <div className="card-horarios">

                    {agendamentos.length > 0 ? (

                        agendamentos.map((agendamento) => (

                            <CardBase
                                key={agendamento.id}
                                titulo={formatarData(agendamento.data)}
                                acoes={
                                    <div className="botoes">

                                        <button
                                            className="btn-editar"
                                            onClick={() =>
                                                navigate(
                                                    `/atualizar-agendamento/${agendamento.id}`
                                                )
                                            }
                                        >
                                            <FaEdit className="icone-editar" />
                                            Editar
                                        </button>

                                        <button
                                            className="btn-excluir"
                                            onClick={() =>
                                                abrirModalExcluir(agendamento)
                                            }
                                        >
                                            <FaTrash className="icone-excluir" />
                                            Excluir
                                        </button>

                                    </div>
                                }
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
                                Não há agendamentos cadastrados nessa data.
                            </span>

                        </div>

                    )}

                </div>

                <ModalConfirmacao
                    aberto={modalAberto}
                    titulo="Excluir agendamento"
                    mensagem={`Deseja excluir o agendamento do dia ${formatarData(agendamentoSelecionado?.data)}?`}
                    onConfirm={handleExcluir}
                    onCancel={() => setModalAberto(false)}
                />

            </div>
        </Layout>
    );
}