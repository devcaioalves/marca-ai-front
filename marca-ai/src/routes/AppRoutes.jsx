import { Routes, Route } from "react-router-dom";

import PrivateRoute from "../components/common/PrivateRoute.jsx";

import Home  from "../pages/Home.jsx";
import Login from "../pages/auth/Login.jsx";
import CriarConta from "../pages/auth/CriarConta.jsx";
import EsqueceuSenha from "../pages/auth/EsqueceuSenha.jsx";
import RecebeCodigo from "../pages/auth/RecebeCodigo.jsx";
import AlterarSenha from "../pages/auth/AlterarSenha.jsx";
import ServiceForm from "../pages/servicos/ServiceForm.jsx";
import HorarioForm from "../pages/horarios/HorarioForm.jsx";
import Dashboard from "../pages/Dashboard.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/criar-conta" element={<CriarConta />} />
            <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
            <Route path="/receber-codigo" element={<RecebeCodigo />} />
            <Route path="/alterar-senha" element={<AlterarSenha />} />

            {/* Rotas privadas */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/criar-servico" element={<ServiceForm />} />
                <Route path="/atualizar-servico/:id" element={<ServiceForm/>}/>
                <Route path="/criar-horario" element={<HorarioForm />} />
                <Route path="/servicos" element={<ServiceForm />} />
            </Route>
        </Routes>
    );
}
