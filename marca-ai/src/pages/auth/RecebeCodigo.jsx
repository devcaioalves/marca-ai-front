import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/login.css";

export default function RecebeCodigo() {
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlToken = params.get("token");
        if (urlToken) setToken(urlToken);
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Informe o código recebido.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/recuperarsenha/validar-token",
                { token }
            );
            toast.success(response.data);
            navigate(`/alterar-senha?token=${token}`);
        } catch (error) {
            toast.error(error.response?.data || "Token inválido ou expirado.");
        }
    };

    return (
        <div className="login-container">
            <div className="overlay" />

            <div className="content fade-in">
                <h2 className="form-title">Informe o código recebido em seu E-Mail</h2>

                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Informe o código"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                required
                            />
                        </div>

                        <div className="btn-group">
                            <button className="btn-mini btn-golden" type="submit">
                                Enviar Código
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