import { useNavigate } from "react-router-dom";
import "../../styles/agendamento.css";

export default function ItemAgendamento({ agendamento }) {
    
    const navigate = useNavigate();

    function formatarHora(hora){
        return hora?.slice(0, 5);
    }

    function formatarStatus(status){
        switch (status) {
            case "AGENDADO":
                return "Agendado";
            case "CONFIRMADO":
                return "Confirmado";
            case "CANCELADO":
                return "Cancelado";
            case "REALIZADO":
                return "Concluído";
            case "REMARCADO":
                return "Remarcado";
            default:
                return status;
        }
    }

    function getStatus(status){
        return status ? status.toLowerCase() : "";
    }

    // LEVA PARA TELA DE DETALHES DO AGENDAMENTO 
    // RETORNA (BUSCA) AGENDAMENTO POR DATA
    // ADICIONA A API CCORRESPONDENTE
    function handleClick(){
        navigate(`/agendamento?data=${agendamento.data}&id=${agendamento.id}`);
    }

    return (
        <div className="agendamento-item" onClick={handleClick}>

            <div className="agendamento-left">
                
                <span className="hora">
                    {formatarHora(agendamento.horaInicio)}
                </span>
                
                <div className="informacoes">
                    <strong>{agendamento.clienteNome}</strong>
                    <span>{agendamento.servicoNome}</span>
                </div>

            </div>

            <div className="agendamento-right">
                <span className={`status ${getStatus(agendamento.statusAgendamento)}`}>
                    {formatarStatus(agendamento.statusAgendamento)}
                </span>
            </div>

        </div>
    );
}