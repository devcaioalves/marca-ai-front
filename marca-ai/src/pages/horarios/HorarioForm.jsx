import { useState } from "react";
import "../../styles/horarioForm.css";
import bg from "../../assets/background.jpg";
import BackLink from "../../components/BackLink";
import Input from "../../components/common/Input";
import GoldenButton from "../../components/GoldenButton";
import { toast } from "react-toastify";
import { criarHorario } from "../../services/horarioService";

export default function HorarioForm(){

    const [data, setData] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFim, setHoraFim] = useState("");

    const cadastrarHorario = async(event) => {
        event.preventDefault();

        if(data.trim() === "" || horaInicio.trim() === "" ||
            horaFim.trim() === ""){
                toast.error("Todos os campos são obrigatórios!");
                return;
        }

        try{
            await criarHorario({data, horaInicio, horaFim});
            toast.success("Horário cadastrado com sucesso!");

            setData("");
            setHoraInicio("");
            setHoraFim("");
        } catch(error){
            const mensagem =
                error.response?.data?.message || "Erro ao cadastrar horário!";
            toast.error(mensagem);
        }
    }

    return(
        <div className="horario-container" style={{ backgroundImage: `url(${bg})`}}>
 
            <BackLink to="/horarios" label="Voltar" />
            
            <div className="horario-page">

                <div>
                    <h2 className="form-title tittle-horario">
                        Crie o horário
                    </h2>
                </div>

                <div className="login-card horario-form">
                    <form onSubmit={cadastrarHorario}>

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
                                Criar Horário
                            </GoldenButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}