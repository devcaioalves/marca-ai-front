import Input from "../../components/common/Input.jsx";
import Textarea from "../../components/common/Textarea.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/input.css";
import "../../styles/serviceForm.css";
import NavBarHome from "../../components/NavBarHome.jsx";
import GoldenButton from "../../components/GoldenButton.jsx";
import BackLink from "../../components/BackLink.jsx";
import { toast } from "react-toastify";
import { criar, atualizar, buscarPorId } from "../../services/servicosService.js"

export default function ServiceForm() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [duracao, setDuracao] = useState("");

    // PEGA O ID DA URL
    const { id } = useParams();
    const isEdit = !!id;

    useEffect(() => {
      carregarServico();
    }, []);

    async function carregarServico(){
      if(!isEdit){
        return;
      }

      try{
        const response = await buscarPorId(id);

        setNome(response.data.nome);
        setDescricao(response.data.descricao);
        setValor(String(response.data.valor));
        setDuracao(String(response.data.duracao));
      }catch(error){
        const mensagem = error.response?.data?.message ||
          "Erro ao carregar serviço!";
        toast.error(mensagem);
      }
    }

    async function cadastrarServico(){

      await criar({
        nome,
        descricao,
        valor: parseFloat(valor.replace(",", ".")),
        duracao: parseInt(duracao)
      });

      toast.success("Serviço cadastrado com sucesso!");
    }

    async function atualizarServico() {
      
      await atualizar(id, {
        nome,
        descricao,
        valor: parseFloat(valor.replace(",", ".")),
        duracao: parseInt(duracao)
      });
      toast.success("Serviço atualizado com sucesso!");
    }

    async function handleSubmit(event) {
      event.preventDefault();

      if(
        nome.trim() === "" ||
        descricao.trim() === "" ||
        valor === "" ||
        duracao === ""
      ){
        toast.error("Todos os campos são obrigatórios!");
        return;
      }

      try{

        if(isEdit){
          await atualizarServico();

        }else{
          await cadastrarServico();
          setNome("");
          setDescricao("");
          setValor("");
          setDuracao("");
        }
      }catch(error){
        const mensagem = error.response?.data?.message ||
        "Erro ao salvar serviço!";
        toast.error(mensagem);
      }
    }

    return(
      <div className="form-container">
         
         <div className="form-page">
            
            <div className="form-card">

              <div className="form-header">
              
                <div className="top-form">
                  <BackLink to="/servicos" label="Voltar"></ BackLink>
                </div>

                <h2 className="form-title title">
                  {isEdit ? "Editar serviço" : "Criar serviço"}
                </h2>
                <p>{isEdit ? "Atualize as informações do serviço." : "Preencha os dados abaixo para cadastrar um novo serviço."}</p>
              </div>
                         
              <div className="form">
               <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <Input
                      className="input"
                      name="nome"
                      type="text"
                      placeholder="Informe o nome do serviço"
                      value={nome}
                      required={true}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <Textarea
                    name="descricao"
                    placeholder="Informe a descrição do serviço"
                    value={descricao}
                    required={true}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                  <div className="input-group">
                    <Input
                      className="input"
                      name="valor"
                      type="number"
                      placeholder="Informe o valor do serviço"
                      value={valor}
                      required={true}
                      onChange={(e) => setValor(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <Input
                      className="input"
                      name="duracao"
                      type="number"
                      placeholder="Informe a duração do serviço em minutos"
                      min="1"
                      value={duracao}
                      required={true}
                      onChange={(e) => setDuracao(e.target.value)}
                    />
                  </div>
                  <div>
                    <GoldenButton className="button" type="submit">
                      {isEdit ? "Salvar alterações" : "Criar Serviço"}
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