import { api } from "./api";

export function criarHorario(data){
    return api.post("/api/horarios/criar-horario", data);
}

export function buscarPorId(id){
    return api.get(`/api/horarios/buscar-horario/${id}`);
}

export function listarTodos(){
    return api.get("/api/horarios/listar-horarios");
}

export function listarPordata(data){
    return api.get(`/api/horarios/listar-horario-data?data=${data}`)
}

export function listarDisponiveisPorData(data){
    return api.get(`/api/horarios/listar-horario-data/disponiveis`, { 
        params: { data }
    });
}

export function alterarDisponibilidade(id, data){
    return api.patch(`/api/horarios/alterar-horario-disponibilidade/${id}`, data);
}

export function deletar(id){
    return api.delete(`/api/horarios/deletar-horario/${id}`);
}