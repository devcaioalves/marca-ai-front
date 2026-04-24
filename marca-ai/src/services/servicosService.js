import { api } from "./api";

export function criar(data){
    return api.post("/api/servicos/criar-servico", data);
}
