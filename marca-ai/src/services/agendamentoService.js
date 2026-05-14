import { api } from "./api";

export function criarAgendamento(data){
    return api.post("/api/agendamentos/criar-agendamento", data);
}

export function buscarPorId(id){
    return api.get(`/api/agendamentos/buscar-agendamento/${id}`);
}

export function listarTodos(){
    return api.get("/api/agendamentos/listar-agendamentos");
}

export function listarPorData(data){
    return api.get(`/api/agendamentos/listar-agendamento-data?data=${data}`);
}

export function atualizarAgendamento(id, data){
    return api.put(`/api/agendamentos/atualizar-agendamento/${id}`, data);
}

export function alterarStatus(id, status){
    return api.patch(
        `/api/agendamentos/alterar-status/${id}`,
        status
    );
}

export function deletar(id){
    return api.delete(`/api/agendamentos/deletar-agendamento/${id}`);
}