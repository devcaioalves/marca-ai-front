import { api } from "./api";

export function criarHorario(data){
    return api.post("/api/horarios/criar-horario", data);
}