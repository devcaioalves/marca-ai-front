import { Link } from "react-router-dom";
import ItemAgendamento from "./ItemAgendamento";
import { FaArrowRight } from 'react-icons/fa';
import "../../styles/agendamento.css";

export default function ListaAgendamento({ agendamentos, dataSelecionada }) {

    function formatarData(date) {
        return date.toLocaleDateString("pt-BR");
    }

    return (
        <div className="lista-agendamentos">

            <div className="header-agendamento">
                <h3>Agendamentos do dia</h3>
            </div>

            <div className="lista-scroll">
                {agendamentos.length === 0 ? (
                    <div className="sem-agendamento">
                        <p>Não há agendamentos para o dia {formatarData(dataSelecionada)}.</p>
                    </div>
                ) : (
                    agendamentos.map((agendamento) => (
                        <ItemAgendamento key={agendamento.id} agendamento={agendamento} />
                    ))
                )}
            </div>
        </div>
    );
}