import "../../styles/modalConfirmacao.css";

export default function ModalConfirmacao({ aberto, titulo, mensagem, onConfirm, onCancel}){

    if(!aberto){
        return null;
    }

    return(
        <div className="modal-overlay">

            <div className="modal-confirmacao">
                <h2>{titulo}</h2>
                <p>{mensagem}</p>

                <div className="modal-botoes">
                    <button
                        className="btn-cancelar"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-confirmar"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </button>
                </div>

            </div>
        </div>
    );
}