import { api } from "./api";

export function buscarPorId(id){
    return api.get(`/api/agendamentos/buscar-agendamento/${id}`);
}

export function listarTodos(){
    return api.get("/api/agendamentos/listar-agendamentos");
}

export function listarPorData(data){
    return api.get(`/api/agendamentos/listar-agendamento-data?data=${data}`);
}

export function realizarAgendamento(id, data){
    return api.put(`/api/agendamentos/realizar-agendamento/${id}`, data);
}

export function cancelar(id){
    return api.delete(`/api/agendamentos/cancelar-agendamento/${id}`);
}