import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/login.css";
import bg from "../../assets/background.jpg";

export default function RecebeCodigo() {
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Se o token vier pela URL (ex: /redefinir?token=abc123), já preenche o campo
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlToken = params.get("token");
        if (urlToken) {
            setToken(urlToken);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Informe o código recebido.");
            return;
        }

        try {
            const payload = { token };

            const response = await axios.post(
                "http://localhost:8080/api/recuperarsenha/validar-token",
                payload
            );

            toast.success(response.data); // "Token válido."
            // Passa o token para a próxima página
            navigate(`/alterar-senha?token=${token}`);

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data || "Token inválido ou expirado.");
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
                <h2 className="form-title">Informe o código recebido em seu E-Mail</h2>

                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="input"
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