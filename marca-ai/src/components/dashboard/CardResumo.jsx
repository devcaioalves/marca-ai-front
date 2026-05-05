import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../../styles/cardResumo.css";

export default function CardResumo({ icone, titulo, valor, linkTexto, linkTo, texto }) {

    return(
        <div className="card">

            <div className="card-header">
                <span>{icone}</span>
                <h3>{titulo}</h3>
            </div>

            <div className="card-value">
                <h2>{valor ?? "--"}</h2>
            </div>

            {texto && (
                <div className="card-footer">
                    <span>{texto}</span>
                </div>
            )}

            {linkTexto && linkTo && (
                <div className="card-footer">
                    <Link to={linkTo}>
                      {linkTexto} <FaArrowRight className="icone-seta"/>
                    </Link>                
                </div>
            )}

        </div>
    );
}