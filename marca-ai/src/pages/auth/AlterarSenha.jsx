import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InputSenha from "../../components/common/InputSenha.jsx";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/login.css";
import bg from "../../assets/background.jpg";

export default function AlterarSenha() {
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Captura o token da URL
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!senha || !confirmarSenha) {
            toast.error("Preencha os dois campos de senha.");
            return;
        }

        if (senha !== confirmarSenha) {
            toast.error("As senhas não coincidem.");
            return;
        }

        try {
            const payload = { token, novaSenha: senha };

            const response = await axios.post(
                "http://localhost:8080/api/recuperarsenha/redefinir-senha",
                payload
            );

            toast.success(response.data); // "Senha redefinida com sucesso!"
            navigate("/"); // volta para login

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data || "Erro ao redefinir senha.");
            } else {
                toast.error("Erro de conexão com o servidor.");
            }
        }
    };

    return (
        <div
            className="login-container"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            <div className="overlay"></div>

            <div className="content fade-in">
                <h2 className="form-title">Redefinir Senha</h2>

                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <InputSenha value={senha} onChange={setSenha} placeholder="Informe sua nova senha" />
                        </div>
                        
                        <div className="input-group">
                            <InputSenha value={confirmarSenha} onChange={setConfirmarSenha} placeholder="Confirme sua nova senha" />
                        </div>

                        <div className="btn-group">
                            <button className="btn-mini btn-golden" type="submit">
                                Alterar Senha
                            </button>

                            <button
                                type="button"
                                className="btn-mini btn-golden"
                                onClick={() => navigate("/")}
                            >
                                Voltar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}