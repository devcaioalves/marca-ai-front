import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/login.css";

export default function EsqueceuSenha() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Informe seu e-mail.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/recuperarsenha/esqueci-senha",
                { email }
            );

            if (response.data.includes("Usuário não encontrado")) {
                toast.error("Admin não encontrado.");
                return;
            }

            toast.success(response.data);
            navigate("/receber-codigo");
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("Admin não encontrado.");
            } else {
                toast.error("Erro ao solicitar redefinição.");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="overlay" />

            <div className="content fade-in">
                <h2 className="form-title">Recuperar Senha</h2>

                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Informe seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="btn-group">
                            <button className="btn-mini btn-golden" type="submit">
                                Solicitar código
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