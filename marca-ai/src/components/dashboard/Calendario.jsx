import Calendar from "react-calendar";


export default function Calendario({ dataSelecionada, setDataSelecionada }) {

    function handleChange(data){
        setDataSelecionada(data);
    }

    return (
        <div className="calendario">
            <Calendar
                onChange={handleChange}
                value={dataSelecionada}
            />
        </div>
    );
}


