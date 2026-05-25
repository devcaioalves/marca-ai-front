import { api } from "./api";

// LISTAR TODAS NOTIFICAÇÕES DE AGENDAMENTOS
export function listarNotificacaoAgendamento(){
    return api.get(
        "/api/notificacoes/listar-notificacoes-agendamentos"
    );
}

// LISTAR NOTIFICAÇÕES DE STATUS
export function listarNotificacaoStatus(status){
    return api.get(
         `/api/notificacoes/listar-notificacao-status/${status}`
    );
}

// MARCAR COMO LIDA
export function marcarNotificacaoLida(id){
    return api.patch(
        `/api/notificacoes/marcar-notificacao-lida/${id}`
    );
}