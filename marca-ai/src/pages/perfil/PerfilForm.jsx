import BackLink from "../../components/BackLink";
import Input from "../../components/common/Input";
import GoldenButton from "../../components/GoldenButton";
import InputSenha from "../../components/common/InputSenha";
import "../../styles/perfilForm.css";
import { useEffect, useState } from "react";
import { atualizarAdmin, buscarAdmin } from "../../services/perfilAdminService";
import { toast } from "react-toastify";

export default function PerfilForm(){

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [endereco, setEndereco] = useState({
        rua: "",
        numero: "",
        bairro: "",
        cep: ""
    });

    function handleEnderecoChange(e) {
        const { name, value } = e.target;

        setEndereco((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // remove tudo que não for número
    function onlyNumbers(value) {
        return value.replace(/\D/g, "");
    }

    // limita quantidade de digítos
    function limit(value, max) {
        return value.slice(0, max);
    }

    // máscara telefone (BR)
    function formatPhone(value) {
        value = limit(onlyNumbers(value), 11);

        if (value.length <= 10) {
            return value
                .replace(/^(\d{2})(\d)/g, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2");
        }

        return value
            .replace(/^(\d{2})(\d)/g, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    }

    // máscara CEP
    function formatCep(value) {
        value = limit(onlyNumbers(value), 8);

        return value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    async function carregarAdmin(){
        try{
            const response = await buscarAdmin();
            setNome(response.data.nome);
            setTelefone(response.data.telefone);
            setEmail(response.data.email);
            setSenha(response.data.senha);
            setConfirmarSenha(response.data.confirmarSenha);
            setEndereco(response.data.endereco);
        }catch(error){
            const mensagem =
                error.response?.data?.message ||
                "Erro ao carregar Usuário!";
            toast.error(mensagem);
        }
    }

    useEffect(() =>{
        carregarAdmin();
    }, []);

    async function atualizar() {

        await atualizarAdmin({
            nome,
            telefone,
            email,
            senha,
            confirmarSenha,
            endereco
        });

        toast.success("Dados atualizados com sucesso!");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try{
            await atualizar();
        }catch(error){
            const mensagem =
                error.response?.data?.message ||
                "Erro ao atualizar dados!";
            toast.error(mensagem);
        }
    }

    return(
    <div className="form-container">

        <div className="form-page perfil-form-page">

            <div className="form-card perfil-form-card">

                <div className="form-header">

                    <div className="top-form">
                        <BackLink 
                            to="/perfil" 
                            label="Voltar" 
                        />
                    </div>

                    <h2 className="form-title title">
                        Editar Perfil
                    </h2>

                </div>

                <div className="form">

                    <form 
                        onSubmit={handleSubmit}
                        className="perfil-form"
                    >

                        <div className="perfil-grid">

                            <div className="perfil-coluna">

                                <p className="paragrafo-endereco">
                                    Atualize suas informações pessoais
                                </p>

                                <Input
                                    className="input"
                                    name="nome"
                                    type="text"
                                    placeholder="Informe seu nome"
                                    value={nome}
                                    required={true}
                                    onChange={(e) => setNome(e.target.value)}
                                />

                                <Input
                                    className="input"
                                    name="telefone"
                                    type="text"
                                    placeholder="Informe seu telefone"
                                    value={telefone}
                                    required={true}
                                    onChange={(e) =>
                                        setTelefone(
                                            formatPhone(e.target.value)
                                        )
                                    }
                                />

                                <Input
                                    className="input"
                                    name="email"
                                    type="text"
                                    placeholder="Informe seu e-mail"
                                    value={email}
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>

                            <div className="perfil-coluna">

                                <p className="paragrafo-endereco">
                                    Atualize suas informações de endereço
                                </p>

                                <div className="input-group">
                                    <input
                                        className="input"
                                        name="rua"
                                        placeholder="Rua"
                                        value={endereco.rua}
                                        onChange={handleEnderecoChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        className="input"
                                        name="numero"
                                        placeholder="Número"
                                        value={endereco.numero}
                                        onChange={(e) =>
                                            setEndereco((prev) => ({
                                                ...prev,
                                                numero: limit(
                                                    onlyNumbers(e.target.value),
                                                    5
                                                )
                                            }))
                                        }
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        className="input"
                                        name="bairro"
                                        placeholder="Bairro"
                                        value={endereco.bairro}
                                        onChange={handleEnderecoChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        className="input"
                                        name="cep"
                                        placeholder="CEP"
                                        value={endereco.cep}
                                        onChange={(e) =>
                                            setEndereco((prev) => ({
                                                ...prev,
                                                cep: formatCep(
                                                    e.target.value
                                                )
                                            }))
                                        }
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="perfil-button">

                            <GoldenButton
                                className="button"
                                type="submit"
                            >
                                Salvar alterações
                            </GoldenButton>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
);
}