import CardBase from "../../components/common/CardBase";
import HeaderCommon from "../../components/common/HeaderCommon";
import Layout from "../../components/layout/Layout";
import { FaEdit, FaTrash, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHashtag, FaCity, FaMailBulk } from "react-icons/fa";
import "../../styles/perfil.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { buscarAdmin } from "../../services/perfilAdminService";


export default function Perfil(){

    const [admin, setAdmin] = useState({
        nome: "",
        telefone: "",
        email: "",
        endereco: {
            rua: "",
            numero: "",
            bairro: "",
            cep: ""
        }
    });
    
    const navigate = useNavigate();

    async function carregarAdmin() {

        try{
            const response = await buscarAdmin();
            setAdmin(response.data);
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

    return(
        <Layout header={
            <HeaderCommon
                titulo="Meu Perfil"
                subtitulo="Gerencie suas informações pessoais."
            />
        }>
            <div className="perfil-container">

                <CardBase
                    className="card-perfil"
                    titulo="Dados pessoais"
                    acoes={
                        <>
                            <div className="botoes">
                                <button
                                    className="btn-editar"
                                    onClick={() => navigate("/editar-perfil")}>
                                        <FaEdit className=
                                            "icone-editar"/>
                                            Editar
                                </button>
                                <div className="alterar-senha">
                                    <span>Deseja alterar sua senha? 
                                        <Link to="/alterar-senha-perfil"> Clique aqui</Link></span>
                                </div>
                            </div>
                        </>
                    }
                >
                    <div className="card-info card-info-perfil">

                        <div className="info-pessoais">
                            <span>
                                <div className="icone-tela-perfil">
                                    <FaUser className="icone"/>
                                </div>
                                {admin.nome}
                            </span>
                            <span>
                                <div className="icone-tela-perfil">
                                    <FaPhone className="icone"/>
                                </div>
                                {admin.telefone}
                            </span>
                            <span>
                                <div className="icone-tela-perfil">
                                    <FaEnvelope className="icone"/>
                                </div>
                                {admin.email}
                            </span>
                        </div>

                        <div className="info-endereco">

                            <div className="card-titulo titulo-endereco">
                                <h3>Endereço</h3>
                            </div>

                            <span>
                                <div className="icone-tela-perfil">
                                    <FaMapMarkerAlt className="icone" />
                                </div>
                                <strong>Rua:</strong> {admin.endereco.rua}
                            </span>
                            <span>
                                <div className="icone-tela-perfil">
                                    <FaHashtag className="icone" />
                                </div>
                                <strong>Nº:</strong> {admin.endereco.numero}
                            </span>
                            <span>
                                <div className="icone-tela-perfil">
                                    <FaCity className="icone" />
                                </div>
                                <strong>Bairro:</strong> {admin.endereco.bairro}
                            </span>
                            <span>
                                <div className="icone-tela-perfil">
                                    <FaMailBulk className="icone" />
                                </div>
                                <strong>CEP:</strong> {admin.endereco.cep}
                            </span>
                        </div>
                    </div>
                    
                </CardBase>
            </div>
        </Layout>
    );
}