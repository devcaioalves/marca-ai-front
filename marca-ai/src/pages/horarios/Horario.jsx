import { useEffect, useState } from "react";
import BarraPesquisa from "../../components/common/BarraPesquisa";
import HeaderCommon from "../../components/common/HeaderCommon";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { FaClock, FaCalendarAlt, FaEdit,FaTrash } from "react-icons/fa";
import CardBase from "../../components/common/CardBase";
import ModalConfirmacao from "../../components/common/ModalConfirmacao";
import { deletar, listarPordata, listarTodos } from "../../services/horarioService";
import { toast } from "react-toastify";
import Calendario from "../../components/dashboard/Calendario";
import "../../styles/horarios.css";

export default function Horario(){
    
    const navigate = useNavigate();

    //LISTA DE HORÁRIOS
    const [horarios, setHorarios] = useState([]);

    //FILTRO
    const [filtro, setFiltro] = useState("data");

    const [dataSelecionada, setDataSelecionada] = useState(
    new Date().toISOString().split("T")[0]);

    //MODAL
    const [modalAberto, setModalAberto] = useState(false);
    const [horarioSelecionado, setHorarioSelecionado] = useState(null);

    function formatarData(data){
        
        if(!data){
            return "";
        }

        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }
    
    async function carregarHorarios() {
        try{
            let response;

            if(filtro === "todos"){
                response = await listarTodos();
            }else{
                response = await listarPordata(formatarData(dataSelecionada));
            }

            setHorarios(response.data);

        }catch (error){
            setHorarios([]);
            const mensagem =
                error.response?.data?.message ||
                "Erro ao carregar horários!";
            toast.error(mensagem);
        }
    }

    useEffect(() =>{
        carregarHorarios();
    }, [filtro, dataSelecionada]);


    async function handleExcluir() {
        try{
            await deletar(horarioSelecionado.id);
            toast.success("Horário excluído com sucesso!");
            carregarHorarios();
            setModalAberto(false);
        }catch (error){
            const mensagem =
                error.response?.data?.message ||
                "Erro ao excluir horário!";
            toast.error(mensagem);
        }
    }
    
    function abrirModalExcluir(horarios){
        setHorarioSelecionado(horarios);
        setModalAberto(true);
    }
    
    return (
        <Layout header={
            <HeaderCommon
                titulo="Horários"
                subtitulo="Gerencie seus horários."
                textoBotao="+ Novo Horário"
                onClickBotao={() => navigate("/criar-horario")}
            />
        }>
            <div className="horarios-container">

                <div className="busca busca-horario">

                    <div className="filtro">

                        <p
                            className={filtro === "data" ? "ativo" : ""}
                            onClick={() => setFiltro("data")}
                        > Por data </p>

                        <p
                            className={filtro === "todos" ? "ativo" : ""}
                            onClick={() => setFiltro("todos")}>Todos
                        </p>
                    </div>

                    {filtro === "data" && (
                        <div className="filtro-data">
                            <input 
                                type="date"
                                value={dataSelecionada}
                                onChange={(e) => setDataSelecionada(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div className="card-horarios">
                {horarios.length > 0 ? (
                    horarios.map((horario) => (
                        <CardBase
                        key={horario.id}
                        titulo={formatarData(horario.data)}
                        acoes={
                            <>
                                <div className="botoes">

                                    <button
                                        className="btn-editar"
                                        onClick={() => navigate(`/atualizar-horario/${horario.id}`)}>
                                            <FaEdit
                                            className="icone-editar"/> Editar
                                    </button>

                                    <button 
                                        className="btn-excluir"
                                        onClick={() => abrirModalExcluir(horario)}>
                                            <FaTrash className="icone-excluir"/> Excluir
                                    </button>
            
                                </div>
                            </>
                        }
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
                            Não há horários cadastrados nessa data. Clique no botão + Novo Horário para fazer o cadastro.
                        </span>
                    </div>
                )}
                </div>

                <ModalConfirmacao
                    aberto={modalAberto}
                    titulo="Excluir horário"
                    mensagem={`Deseja excluir o horário do dia ${formatarData(horarioSelecionado?.data)}?`}
                    onConfirm={handleExcluir}
                    onCancel={() => setModalAberto(false)}
                />
            </div>

        </Layout>
    );
}