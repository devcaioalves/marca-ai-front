import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/login.css";
import InputPassword from "../../components/common/InputPassword";
import logo from "../../assets/logo.svg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    //const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !senha) {
            // toast.error("Preencha email e senha.");
            return;
        }

        try {
            setLoading(true);

            // // 🔐 CHAMA O BACKEND
            // const { data } = await api.post(
            //     "/br/com/ifmarket/usermanagent/v1/login",
            //     { identificador: email, senha }
            // );

            // ✅ SALVA USUÁRIO REAL (SEM SENHA)
            //login(data);

            // toast.success("Login realizado com sucesso!");
            navigate("/home");

        } catch (err) {
            console.error(err);
            // toast.error("Credenciais inválidas");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">

            <div className="logo-container">

                <img src={logo} alt="Logo Letreiro" className="login-logo" />

            </div>

            <div className="login-card">

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>E-mail ou Telefone</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Informe seu e-mail ou telefone"
                        />
                    </div>

                    <div className="input-group">
                        <label>Senha</label>

                        <InputPassword
                            value={senha}
                            onChange={setSenha}
                        />

                        <a
                            type="button"
                            className="forgot-pass"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Esqueceu sua senha?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-gray"
                        disabled={loading}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                    <a
                        type="button"
                        className="create-account"
                        onClick={() => navigate("/criar-conta")}
                    >
                        Novo por aqui? Crie sua conta em poucos passos.
                    </a>

                </form>
            </div>
        </div>
    );
}