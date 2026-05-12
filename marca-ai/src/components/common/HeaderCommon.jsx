import GoldenButton from "../GoldenButton";
import "../../styles/headerCommon.css";

export default function HeaderCommon( {titulo, subtitulo, textoBotao, onClickBotao, children} ) {
    
    return (
        <div className="header-common">

            <div className="header-text">
                <h1>{titulo}</h1>
                {subtitulo && <p>{subtitulo}</p>}
            </div>

            <div className="header-actions">

                {children}

                {textoBotao && (
                    <GoldenButton onClick={onClickBotao} className="btn-primary">
                        {textoBotao}
                    </GoldenButton>
                )}
            </div>

        </div>
    );
}