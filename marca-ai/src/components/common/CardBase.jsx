import "../../styles/cardBase.css";

export default function CardBase({ titulo, subtitulo, children, status, acoes}) {

    return (
        <div className="card-base">

            <div className="card-left">
                
                <div className="card-titulo">
                    <h3>{titulo}</h3>
                    {subtitulo && <p>{subtitulo}</p>}
                </div>

                {children && (
                    
                    <div className="card-conteudo">
                        {children}
                    </div>
                )}
            </div>

                {status && (
                    <div className="card-center">
                        {status}
                    </div>
                )}

                {acoes && (
                    <div className="card-right">
                        {acoes}
                    </div>
                )}
        </div>
    );
}