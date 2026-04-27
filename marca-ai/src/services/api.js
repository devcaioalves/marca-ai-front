import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080", // ajuste se sua API rodar em outra porta
    headers: {
        "Content-Type": "application/json",
    },
});

// Intercepta requisições e adiciona o token
api.interceptors.request.use(config => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
        const { token } = JSON.parse(usuarioSalvo);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});
