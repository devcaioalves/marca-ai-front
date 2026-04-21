import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../../styles/login.css";
import bg from "../../assets/background.jpg";
import InputSenha from "../../components/common/InputSenha";
import logo from "../../assets/logo.png";

import { useAuth } from "../../context/AuthContext";


export default function Login() {
    const [identificador, setIdentificador] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!identificador || !senha) {
            toast.error("Preencha email/telefone e senha.");
            return;
        }

        try {
            setLoading(true);

            await login(identificador, senha);

            toast.success("Login realizado com sucesso!");
            navigate("/home");

        } catch (error) {
            const data = error.response?.data;

            const mensagem =
                data?.message || "Credenciais inválidas";

            toast.error(mensagem);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="login-container"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            {/* overlay escuro */}
            <div className="overlay"></div>

            <div className="content fade-in">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="login-logo" />
                </div>

                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                value={identificador}
                                onChange={(e) => setIdentificador(e.target.value)}
                                placeholder="Informe seu e-mail ou telefone"
                            />
                        </div>

                        <div className="input-group">
                            <InputSenha
                                value={senha}
                                onChange={setSenha}
                            />

                            <span
                                className="forgot-pass"
                                onClick={() => navigate("/esqueceu-senha")}
                            >
                                Esqueceu sua senha?
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-golden"
                            disabled={loading}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>

                        <span
                            className="create-account"
                            onClick={() => navigate("/criar-conta")}
                        >
                            Novo por aqui? Crie sua conta.
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}
