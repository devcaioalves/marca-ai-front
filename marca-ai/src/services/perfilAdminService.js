import { api } from "./api";

export function buscarAdmin(){
    return api.get("/api/admin/buscar-admin");
}

export function atualizarAdmin(data){
    return api.put(`/api/admin/atualizar-admin`, data);
}

export function alterarSenhaAdmin(id, data){
    return api.patch(`/api/admin/alterar-senha-admin/${id}`, data);
}