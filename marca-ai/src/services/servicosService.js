import { api } from "./api";

export function criar(data){
    return api.post("/api/servicos/criar-servico", data);
}

export function buscarPorId(id){
    return api.get(`/api/servicos/buscar-servico/${id}`);
}
export function listar(){
    return api.get("/api/servicos/listar-servicos");
}

export function listarAtivos(){
    return api.get("/api/servicos/listar-servicos/ativos");
}

export function atualizar(id, data){
    return api.put(`/api/servicos/atualizar-servico/${id}`, data);
}

export function ativarDesativar(id){
    return api.patch(`/api/servicos/ativar-desativar-servico/${id}`);
}

export function deletar(id){
    return api.delete(`/api/servicos/deletar-servico/${id}`);
}
