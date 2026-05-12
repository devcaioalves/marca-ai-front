import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/barraPesquisa.css";

export default function BarraPesquisa({ onSearch, placeholder }) {
    const [valorPesquisa, setValorPesquisa] = useState("");

    function handleChange(event) {
        const texto = event.target.value;
        setValorPesquisa(texto);

        // ENVIA PARA O COMPONENTE PAI
        if(onSearch) {
            onSearch(texto);
        }
    }

    return (
        <div className="barra-pesquisa">
            <FaSearch className="barra-pesquisa-icone" />
            <input 
                type="text" 
                placeholder={placeholder}
                value={valorPesquisa}
                onChange={handleChange} 
                className="barra-pesquisa-input"/>
        </div>
    );
}