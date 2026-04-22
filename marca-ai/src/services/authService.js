import { api } from "./api";

export async function loginRequest(credentials) {
    const { data } = await api.post("/api/admin/login", credentials);

    return {
        token: data.token,
        usuario: data.response
    };
}
