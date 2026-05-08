/* eslint-disable react-hooks/immutability */
import HeaderCommon from "../../components/common/HeaderCommon";
import Layout from "../../components/layout/Layout";
import BarraPesquisa from "../../components/common/BarraPesquisa";
import "../../styles/servicos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardBase from "../../components/common/CardBase";
import { FaEdit, FaTrash, FaClock, FaMoneyBillWave } from "react-icons/fa";
import { listar, ativarDesativar, deletar } from "../../services/servicosService";
import { toast } from "react-toastify";
import ModalConfirmacao from "../../components/common/ModalConfirmacao";


export default function Service() {

    const navigate = useNavigate();

    const [servicos, setServicos] = useState([]);

    // TEXTO DIGITADO NA BARRA DE PESQUISA
    const [busca, setBusca] = useState("");

    // QUAL FILTRO ESTÁ SELECIONADO
    const [filtro, setFiltro] = useState("todos");

    // MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
    const [modalAberto, setModalAberto] = useState(false);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);

    // LISTA OS SERVIÇOS
    useEffect(() => {
        carregarServicos();
    }, []);

    async function carregarServicos() {

        try {
            const response = await listar();
            setServicos(response.data);
        } catch (error) {
            const mensagem =
                error.response?.data?.message || "Erro ao carregar serviços!";
            toast.error(mensagem);
        }
    }

    // ATIVA E DESATIVA OS SERVIÇOS
    async function handleAtivarDesativar(id) {
        try{
            await ativarDesativar(id);
            carregarServicos();
        }catch(error){
            const mensagem =
                error.response?.data?.message ||
                "Erro ao alterar status do serviço!";
            toast.error(mensagem);
        }
    }

    const servicosFiltrados = servicos.filter((servico) => {

        const matchBusca = servico.nome
            .toLowerCase()
            .includes(busca.toLowerCase());

        const matchFiltro = 
            filtro === "todos"
            ? true : servico.ativo;

        return matchBusca && matchFiltro
    });

    async function handleExcluir() {
        try{
            await deletar(servicoSelecionado.id);
            toast.success("Serviço excluído com sucesso!");
            carregarServicos();
            setModalAberto(false);
        }catch(error){
            const mensagem =
                error.response?.data?.message ||
                "Erro ao excluir serviço!";
            toast.error(mensagem);
        }
    }

    function abrirModalExcluir(servico){
        setServicoSelecionado(servico);
        setModalAberto(true);
    }

    return (
        <Layout header={
            <HeaderCommon
                titulo="Serviços"
                subtitulo="Gerencie seus serviços."
                textoBotao= " + Novo Serviço"
                onClickBotao={ () => navigate("/criar-servico")}
            />
        }>
            <div className="servicos-container">
                
                <div className="busca">
                    
                    <BarraPesquisa
                        placeholder="Pesquisar serviços..."
                        onSearch={setBusca}
                    />

                    <div className="filtro">
                        <p  
                            className={filtro === "todos" ? "ativo": ""}
                            onClick={() => setFiltro("todos")}>Todos</p>
                        <p 
                            className={filtro === "ativos" ? "ativo": ""}
                            onClick={() => setFiltro("ativos")}>Ativos</p>
                    </div>

                </div>

                <div className="card-servicos">

                {servicosFiltrados.length > 0 ? (
                    servicosFiltrados.map((servico) => (
                        
                        <CardBase
                            key={servico.id}
                            titulo={servico.nome}
                            subtitulo={servico.descricao}
                            status={
                                <div className="card-status">
                                    
                                    <span>{servico.ativo ? "Ativo" : "Inativo"}</span>

                                    <label className="switch">

                                        <input 
                                            type="checkbox" 
                                            checked={servico.ativo}
                                            onChange={() => handleAtivarDesativar(servico.id)}
                                        />
                                        
                                        <span className="slider"></span>

                                    </label>
                                </div>
                            }
                            acoes={
                                <>
                                    <div className="botoes">
                                        <button className="btn-editar"
                                        onClick={() => navigate(`/atualizar-servico/${servico.id}`)}>
                                            <FaEdit className="icone-editar"/> Editar</button>
                                        
                                        <button className="btn-excluir"
                                        onClick={() => abrirModalExcluir(servico)}>
                                            <FaTrash className="icone-excluir"/> Excluir
                                        </button>
                                    </div>
                                </>
                                }
                        >

                            <div className="card-info">

                                <span> <FaMoneyBillWave className="icone"/>$ {servico.valor},00</span>

                                <span> <FaClock className="icone"/> {servico.duracao} min</span>

                            </div>
                        </CardBase>
                    ))
                ) : (
                    <div className="sem-informacao">
                        <span>
                            {filtro === "ativos"
                                ? "Não há serviços ativos no momento." : "Nenhum serviço encontrado. Clique em  + Novo Serviço para criar um novo serviço."
                            }
                        </span>
                    </div>
                )}
                </div>

                <ModalConfirmacao
                    aberto={modalAberto}
                    titulo="Excluir serviço"
                    mensagem={`Deseja excluir o serviço ${servicoSelecionado?.nome}?`}
                    onConfirm={handleExcluir}
                    onCancel={() => setModalAberto(false)}
                />
            </div>
        </Layout>
    );
}