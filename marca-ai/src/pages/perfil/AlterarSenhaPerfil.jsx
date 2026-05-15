import { useState } from "react";
import InputSenha from "../../components/common/InputSenha";
import { toast } from "react-toastify";
import { alterarSenhaAdmin } from "../../services/perfilAdminService";
import GoldenButton from "../../components/GoldenButton";
import BackLink from "../../components/BackLink";

export default function AlterarSenhaPerfil(){
    
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

    async function atualizarSenha() {

        const adminId = localStorage.getItem("adminId");

        await alterarSenhaAdmin(adminId, {
            senhaAtual,
            novaSenha,
            confirmarNovaSenha
        });
        toast.success("Senha alterada com sucesso!"); 
    } 

    async function handleSubmit(event) {
        event.preventDefault();

        if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
            toast.error("Preencha os dois campos de senha.");
            return;
        }

        if (novaSenha !== confirmarNovaSenha) {
            toast.error("As senhas não coincidem.");
            return;
        }

        try {
            
            await atualizarSenha();

        } catch (error) {
            const mensagem =
                error.response?.data?.message ||
                "Erro ao atualizar senha!";
            toast.error(mensagem);
        }
    }
    
    return(
        <div className="form-container">
                    
            <div className="form-page">

                <div className="form-card">

                    <div className="form-header">
                        
                        <div className="top-form">
                            <BackLink to="/perfil" label="Voltar"></ BackLink>
                        </div>

                        <h2 className="form-title title">
                            Alterar Senha
                        </h2>
                        <p>Altere sua senha.</p>
                    </div>

                    <div className="form">
                        <form onSubmit={handleSubmit}>

                            <div className="input-group">
                                <InputSenha value={senhaAtual} onChange={setSenhaAtual} placeholder="Informe sua senha atual" />
                            </div>

                            <div className="input-group">
                                <InputSenha value={novaSenha} onChange={setNovaSenha} placeholder="Informe sua nova senha" />
                            </div>

                            <div className="input-group">
                                <InputSenha value={confirmarNovaSenha} onChange={setConfirmarNovaSenha} placeholder="Confirme sua nova senha" />
                            </div>
                            
                            <div>
                                <GoldenButton className="button" type="submit">
                                    Salvar alterações
                                </GoldenButton>
                            </div>
                            <div className="form-campo">
                                <p>* Campos obrigatórios</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}