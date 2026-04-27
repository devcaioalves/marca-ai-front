import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Carrega usuário ao iniciar
    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (usuarioSalvo) {
            const parsed = JSON.parse(usuarioSalvo);
            // user recebe apenas os dados do usuário (não o token)
            setUser(parsed.usuario);
        }

        setLoading(false);
    }, []);

    // Login centralizado
    async function login(identificador, senha) {
        const data = await loginRequest({
        login: identificador, 
        senha: senha,
    });

        setUser(data.usuario);

        // localStorage salva token + usuario para o interceptor do axios conseguir ler o token
        localStorage.setItem("usuario", JSON.stringify(data));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("usuario");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
