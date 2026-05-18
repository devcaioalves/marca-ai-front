import { api } from "./api";

export function criarCliente(data){
    return api.post(`/api/clientes/criar-cliente`, data);
}

export function buscarCliente(id){
    return api.get(`/api/clientes/buscar-cliente/${id}`);
}

export function buscarPorNomeOuTelefone(data){
    return api.get(`/api/clientes/buscar-por-nome-ou-telefone/${data}`);
}

export function buscarPorTelefone(data){
    return api.get(`/api/clientes/buscar-pelo-telefone/${data}`);
}

export function listarClientes(){
    return api.get(`/api/clientes/listar-clientes`);
}

export function atualizar(id, data){
    return api.put(`/api/clientes/atualizar-cliente/${id}`, data);
}

export function deletar(id){
    return api.delete(`/api/clientes/deletar-cliente/${id}`);
}