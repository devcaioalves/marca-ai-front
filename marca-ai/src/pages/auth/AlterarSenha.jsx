import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InputSenha from "../../components/common/InputSenha.jsx";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/login.css";

export default function AlterarSenha() {
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

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
            const response = await axios.post(
                "http://localhost:8080/api/recuperarsenha/redefinir-senha",
                { token, novaSenha: senha }
            );
            toast.success(response.data);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data || "Erro ao redefinir senha.");
        }
    };

    return (
        <div className="login-container">
            <div className="overlay" />

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

                            <button type="button" className="btn-mini btn-golden" onClick={() => navigate("/login")}>
                                Voltar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}