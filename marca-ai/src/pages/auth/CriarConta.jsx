import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/login.css";
import InputSenha from "../../components/common/InputSenha.jsx";
import LoadingScreen from "../../components/common/LoadingScreen.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function CriarConta() {
    const [nome, setNome]                 = useState("");
    const [telefone, setTelefone]         = useState("");
    const [email, setEmail]               = useState("");
    const [senha, setSenha]               = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [endereco, setEndereco]         = useState({ rua: "", numero: "", bairro: "", cep: "" });
    const [pageReady, setPageReady]       = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setPageReady(true));
        });
    }, []);

    function handleEnderecoChange(e) {
        const { name, value } = e.target;
        setEndereco((prev) => ({ ...prev, [name]: value }));
    }

    function onlyNumbers(value) {
        return value.replace(/\D/g, "");
    }

    function limit(value, max) {
        return value.slice(0, max);
    }

    function formatPhone(value) {
        value = limit(onlyNumbers(value), 11);
        if (value.length <= 10) {
            return value.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
        }
        return value.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    }

    function formatCep(value) {
        value = limit(onlyNumbers(value), 8);
        return value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !telefone || !email || !senha || !confirmarSenha) {
            toast.error("Preencha todos os campos obrigatórios.");
            return;
        }

        if (senha !== confirmarSenha) {
            toast.error("As senhas não coincidem.");
            return;
        }

        try {
            const payload = {
                nome,
                telefone: onlyNumbers(telefone),
                email,
                senha,
                confirmaSenha: confirmarSenha,
                endereco: { ...endereco, cep: onlyNumbers(endereco.cep) }
            };

            const { data } = await axios.post("http://localhost:8080/api/admin/criar-admin", payload);

            if (data.mensagemErro) {
                toast.error(data.mensagemErro);
            } else {
                toast.success("Conta criada com sucesso!");
                navigate("/");
            }
        } catch (error) {
            const data = error.response?.data;
            let mensagem = "Erro ao criar conta.";

            if (typeof data === "string") {
                mensagem = data;
            } else if (data) {
                mensagem = data.fieldErrors
                    ? Object.values(data.fieldErrors).join(" \n")
                    : data.message || data.mensagem || data.mensagemErro || mensagem;
            } else if (error.message) {
                mensagem = error.message;
            }

            toast.error(mensagem);
        }
    };

    return (
        <>
            {!pageReady && <LoadingScreen ready={true} onDone={() => setPageReady(true)} />}

            {pageReady && (
                <div className="login-container">
                    <div className="overlay" />

                    <div className="content fade-in">
                        <h2 className="form-title">Crie sua conta</h2>

                        <div className="login-card">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input placeholder="Informe seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                                </div>

                                <div className="input-group">
                                    <input placeholder="Informe seu telefone" value={telefone} onChange={(e) => setTelefone(formatPhone(e.target.value))} />
                                </div>

                                <div className="input-group">
                                    <input type="email" placeholder="Informe seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="input-group">
                                    <InputSenha value={senha} onChange={setSenha} />
                                </div>

                                <div className="input-group">
                                    <InputSenha value={confirmarSenha} onChange={setConfirmarSenha} placeholder="Confirme sua senha" />
                                </div>

                                <div className="subtitle-row">
                                    <h3 className="form-subtitle">- Endereço</h3>
                                    <div className="info-icon">
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                        <div className="tooltip">
                                            O endereço é necessário para que seus clientes possam visualizar a localização do seu estabelecimento ao realizarem um agendamento.
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <input name="rua" placeholder="Rua" value={endereco.rua} onChange={handleEnderecoChange} />
                                </div>

                                <div className="input-group">
                                    <input name="numero" placeholder="Número" value={endereco.numero}
                                        onChange={(e) => setEndereco((prev) => ({ ...prev, numero: limit(onlyNumbers(e.target.value), 5) }))} />
                                </div>

                                <div className="input-group">
                                    <input name="bairro" placeholder="Bairro" value={endereco.bairro} onChange={handleEnderecoChange} />
                                </div>

                                <div className="input-group">
                                    <input name="cep" placeholder="CEP" value={endereco.cep}
                                        onChange={(e) => setEndereco((prev) => ({ ...prev, cep: formatCep(e.target.value) }))} />
                                </div>

                                <div className="btn-group">
                                    <button className="btn-mini btn-golden" type="submit">Criar</button>
                                    <button type="button" className="btn-mini btn-golden" onClick={() => navigate("/login")}>Voltar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}