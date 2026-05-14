import { api } from "./api";

// LISTAR NOTIFICAÇÕES DE AGENDAMENTOS
export function listarNotificacaoAgendamento(){
    return api.get(
        "/api/notificacoes/listar-notificacao-agendamento/"
    );
}

// LISTAR NOTIFICAÇÕES DE STATUS
export function listarNotificacaoStatus(){
    return api.get(
        "/api/notificacoes/listar-notificacao-status/"
    );
}

// MARCAR COMO LIDA
export function marcarNotificacaoLida(id){
    return api.patch(
        `/api/notificacoes/marcar-notificacao-lida/${id}`
    );
}