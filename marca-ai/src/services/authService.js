import { api } from "./api";

export async function loginRequest(credentials) {
    const { data } = await api.post("/api/admin/login", credentials);

    localStorage.setItem("token", data.token);

    localStorage.setItem(
        "adminId",
        data.response.id
    );

    return {
        token: data.token,
        usuario: data.response
    };
}
