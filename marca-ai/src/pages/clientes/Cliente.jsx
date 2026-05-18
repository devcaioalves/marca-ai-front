import { useEffect, useState } from "react";
import BarraPesquisa from "../../components/common/BarraPesquisa";
import HeaderCommon from "../../components/common/HeaderCommon";
import Layout from "../../components/layout/Layout";
import CardBase from "../../components/common/CardBase";
import ModalConfirmacao from "../../components/common/ModalConfirmacao";
import { FaEdit, FaTrash, FaPhoneAlt, FaCalendarAlt  } from "react-icons/fa";
import "../../styles/clientes.css";
import { listarClientes, deletar } from "../../services/clienteService";
import { toast } from "react-toastify";

export default function Cliente(){

    const [clientes, setClientes] = useState([]);

    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("Agendados");

    const [modalAberto, setModalAberto] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState("");

    const clientesMock = [
        {
            id: 1,
            nome: "Maria Elisa de Fátima Ranikelly Sousa Araújo",
            telefone: "83999999999",
            agendamentos: [
                {
                    id: 1,
                    data: "2026-05-20",
                    horaInicio: "14:00:00"
                }
            ]
        },

        {
            id: 2,
            nome: "João",
            telefone: "83888888888",
            agendamentos: []
        },

        {
            id: 3,
            nome: "Ana",
            telefone: "83777777777",
            agendamentos: [
                {
                    id: 2,
                    data: "2026-05-18",
                    horaInicio: "09:30:00"
                },

                {
                    id: 3,
                    data: "2026-05-25",
                    horaInicio: "16:00:00"
                }
            ]
        }
    ];

    async function carregarClientes() {

        try{
            const response = await listarClientes();
            setClientes(response.data);
        }catch(error){
            const mensagem =
                error.response?.data?.message ||
                "Erro ao carregar clientes!";
            toast.error(mensagem);
        }
    }

    useEffect(() => {
        setClientes(clientesMock);
        /*carregarClientes();*/
    }, []);

    const clientesFiltrados = clientes.filter((cliente) => {
        const matchBusca = cliente.nome.
            toLowerCase()
            .includes(busca.toLowerCase()) || cliente.telefone.includes(busca);

        const matchFiltro = 
            filtro === "Todos" ? true : cliente.agendamentos.length > 0;

        return matchBusca && matchFiltro;

    });

    function obterProximoAgendamento(agendamentos){
        return agendamentos
            ?.filter((agendamento) => {
                const dataHora = new Date(
                    `${agendamento.data}T${agendamento.horaInicio}`
                );

                return dataHora >= new Date();
            })

            .sort((a, b) => {
                const dataA = new Date(
                    `${a.data}T${a.horaInicio}`);

                const dataB = new Date(
                    `${b.data}T${b.horaInicio}`);

                return dataA - dataB;
            })[0];
    }

    function formatarDataHora(data, hora){
        const dataHora = new Date(`${data}T${hora}`);

        const dataFormatada = dataHora.toLocaleDateString("pt-BR");

        const horaFormatada = dataHora.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });

        return `${dataFormatada} às ${horaFormatada}`;
    }

    async function handleExcluir() {
            try{
                await deletar(clienteSelecionado.id);
                toast.success("Cliente excluído com sucesso!");
                carregarClientes();
                setModalAberto(false);
            }catch(error){
                const mensagem =
                    error.response?.data?.message ||
                    "Erro ao excluir cliente!";
                toast.error(mensagem);
            }
        }

    function abrirModalExcluir(cliente){
        setClienteSelecionado(cliente);
        setModalAberto(true);
    }

    return (
        <Layout header={
            <HeaderCommon
                titulo="Clientes"
                subtitulo="Visualize os clientes cadastrados automaticamente pelo sistema."
            />
        }>
            <div className="cliente-container">

                <div className="busca">

                    <BarraPesquisa
                        placeholder="Pesquisar por nome ou telefone..."
                        onSearch={setBusca}
                    />

                    <div className="filtro">
                        <p
                            className={`filtro-clientes ${filtro === "Agendados" ? "ativo" : ""} `}
                            onClick={() => setFiltro("Agendados")}> Agendados
                        </p>

                        <p 
                            className={filtro === "Todos" ? "ativo": ""}
                            onClick={() => setFiltro("Todos")}>Todos
                        </p>
                    </div>
                </div>

                <div className="card-clientes">

                    {clientesFiltrados.length > 0 ? (
                        clientesFiltrados.map((cliente) => (
                            
                            <CardBase
                                key={cliente.id}
                                titulo={cliente.nome}
                                acoes={
                            <>
                                <div className="botoes">
                                    <button
                                        className="btn-excluir"
                                        onClick={() => abrirModalExcluir(cliente)}>
                                            <FaTrash className="icone-excluir"/> Excluir
                                    </button>
                                </div>
                            </>
                                }
                            >
                            <div className="card-info info-clientes">
                                <span className="info-clientes-telefone"><strong> <FaPhoneAlt className="icone-clientes"/>
                                Telefone:</strong> {cliente.telefone}</span>

                                <span>
                                    <strong> <FaCalendarAlt className="icone-clientes"/> Próximo agendamento:</strong> 
                                
                                    {obterProximoAgendamento(cliente.agendamentos)
                                    ? formatarDataHora(obterProximoAgendamento(cliente.agendamentos).data, obterProximoAgendamento(cliente.agendamentos).horaInicio) : " Sem agendamento."}
                                </span>
                            </div>
                    </CardBase>
                        ))
                    ) : (
                        <div className="sem-informacao">
                        <span>
                            {filtro === "Agendados"
                                ? "Não há clientes com agendamentos no momento." : "Nenhum cliente encontrado."
                            }
                        </span>
                    </div>
                )}
                </div>
                <ModalConfirmacao
                    aberto={modalAberto}
                    titulo="Excluir cliente"
                    mensagem={`Deseja excluir esse cliente ${clienteSelecionado?.nome}`}
                    onConfirm={handleExcluir}
                    onCancel={() => setModalAberto(false)}
                />
            </div>
        </Layout>
    );
}