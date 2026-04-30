import Input from "../../components/common/Input.jsx";
import Textarea from "../../components/common/Textarea.jsx";
import { useState } from "react";
import "../../styles/input.css";
import "../../styles/serviceForm.css";
import bg from "../../assets/background.jpg";
import NavBarHome from "../../components/NavBarHome.jsx";
import GoldenButton from "../../components/GoldenButton.jsx";
import BackLink from "../../components/BackLink.jsx";
import { toast } from "react-toastify";
import {criar} from "../../services/servicosService.js"

export default function ServiceForm() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [duracao, setDuracao] = useState("");

    const cadastrarServiço = async(event) => {
      event.preventDefault();

      if(nome.trim() === "" || descricao.trim() === "" ||
         valor.trim() === "" || duracao.trim() === ""){
          toast.error("Todos os campos são obrigatórios!");
          return;
      }

      try {
        await criar({nome, descricao, valor: parseFloat(valor.replace(",", ".")), duracao: parseInt(duracao)});
        toast.success("Serviço cadastrado com sucesso!");

        setNome("");
        setDescricao("");
        setValor("");
        setDuracao("");
      } catch(error){
        const mensagem =
                error.response?.data?.message || "Erro ao cadastrar serviço!";
        toast.error(mensagem);
      }
    }

    return(
      <div className="service-container" style={{ backgroundImage: `url(${bg})`}}>
         
        <BackLink to="/servicos" label="Voltar"/>
         <div className="service-page">
            
            <div>
              <h2 className="form-title tittle-service">
                Crie seu serviço
              </h2>
            </div>
           
           <div className="login-card service-form">
             <form onSubmit={cadastrarServiço}>
           
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
                    Criar Serviço
                  </GoldenButton>
                </div>
             </form>
           </div>
         </div>
      </div>
    );
}