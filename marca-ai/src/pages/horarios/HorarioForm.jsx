import { useEffect, useState } from "react";
import "../../styles/horarioForm.css";
import BackLink from "../../components/BackLink";
import Input from "../../components/common/Input";
import GoldenButton from "../../components/GoldenButton";
import { toast } from "react-toastify";
import { alterarDisponibilidade, buscarPorId, criarHorario } from "../../services/horarioService";
import { useParams } from "react-router-dom";

export default function HorarioForm(){

    const [data, setData] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFim, setHoraFim] = useState("");

    const {id} = useParams();
    const isEdit = !!id;

    async function carregarHorario() {

        if(!isEdit){
            return;
        }
        try{
            const response = await buscarPorId(id);

            setData(response.data.data);
            setHoraInicio(response.data.horaInicio);
            setHoraFim(response.data.horaFim);
        }catch (error){
            const mensagem =
                error.response?.data?.message ||
                "Erro ao carregar horário!";
            toast.error(mensagem);
        }  
    }

    useEffect(() => {
        carregarHorario();
    }, []);

    async function cadastrarHorario() {

        await criarHorario({
            data,
            horaInicio,
            horaFim
        });
        toast.success("Horário cadastrado com sucesso!");
        
    }

    async function atualizar() {

        await alterarDisponibilidade(id, {
            data,
            horaInicio,
            horaFim
        });
        toast.success("Horário atualizado com sucesso!");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if(
            data.trim() === "" ||
            horaInicio.trim() === "" ||
            horaFim === ""){
                toast.error("Todos os campos são obrigatórios!");
                return;
        }

        try{
            if(isEdit){
                await atualizar();

            }else{
                await cadastrarHorario();
                setData("");
                setHoraInicio("");
                setHoraFim("");
            }

        }catch(error){
            const mensagem = error.response?.data?.message ||
            "Erro ao salvar serviço!";
            toast.error(mensagem);
        }
    }

    return(
        <div className="form-container">
            
            <div className="form-page">

                <div className="form-card">

                    <div className="form-header">
                        
                        <div className="top-form">
                            <BackLink to="/horarios" label="Voltar"></ BackLink>
                        </div>

                        <h2 className="form-title title">
                            {isEdit ? "Editar horário" : "Criar horário"}
                        </h2>
                        <p>{isEdit ? "Atualize as informações do horário." : "Preencha os dados abaixo para cadastrar um novo horário."}</p>
                    </div>

                    <div className="form">
                        <form onSubmit={handleSubmit}>

                            <div className="input-group">
                                <label>Data:</label>
                                <Input
                                    className="input"
                                    name="data"
                                    type="date"
                                    placeholder="Informe a data"
                                    value={data}
                                    required={true}
                                    onChange={(e) => setData(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Horário inicial:</label>
                                <Input
                                    className="input"
                                    name="horaInicio"
                                    type="time"
                                    placeholder="Informe a hora de início"
                                    value={horaInicio}
                                    required={true}
                                    onChange={(e) => setHoraInicio(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Horário final:</label>
                                <Input
                                    className="input"
                                    name="horaFim"
                                    type="time"
                                    placeholder="Informe a hora de fim"
                                    value={horaFim}
                                    required={true}
                                    onChange={(e) => setHoraFim(e.target.value)}
                                />
                            </div>

                            <div>
                                <GoldenButton className="button" type="submit">
                                    {isEdit ? "Salvar alterações" : "Criar horário"}
                                </GoldenButton>
                            </div>
                            <div className="form-campo">
                                <p>* Campos obrigatórios</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}