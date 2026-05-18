import { Routes, Route } from "react-router-dom";

import PrivateRoute from "../components/common/PrivateRoute.jsx";

import Home  from "../pages/Home.jsx";
import Login from "../pages/auth/Login.jsx";
import CriarConta from "../pages/auth/CriarConta.jsx";
import EsqueceuSenha from "../pages/auth/EsqueceuSenha.jsx";
import RecebeCodigo from "../pages/auth/RecebeCodigo.jsx";
import AlterarSenha from "../pages/auth/AlterarSenha.jsx";
import Service from "../pages/servicos/Service.jsx";
import ServiceForm from "../pages/servicos/ServiceForm.jsx";
import Horario from "../pages/horarios/Horario.jsx";
import HorarioForm from "../pages/horarios/HorarioForm.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Perfil from "../pages/perfil/Perfil.jsx";
import PerfilForm from "../pages/perfil/PerfilForm.jsx";
import AlterarSenhaPerfil from "../pages/perfil/AlterarSenhaPerfil.jsx";
import Agendamentos from "../pages/agendamentos/Agendamento.jsx";
import Notificacoes from "../pages/notificacoes/Notificacoes.jsx";
import Cliente from "../pages/clientes/Cliente.jsx";

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
                <Route path="/atualizar-servico/:id" element={<ServiceForm/>}/>
                <Route path="/horarios" element={<Horario />} />
                <Route path="/criar-horario" element={<HorarioForm />} />
                <Route path="/atualizar-horario/:id" element={<HorarioForm />} />
                <Route path="/servicos" element={<Service />} />

                <Route path="/horarios" element={<Horario />} />
                <Route path="/servicos" element={<ServiceForm />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/editar-perfil" element={<PerfilForm />} />
                <Route path="/alterar-senha-perfil" element={<AlterarSenhaPerfil />} />
                <Route path="/criar-servico" element={<ServiceForm />} />
                <Route path="/agendamentos" element={<Agendamentos />} />
                <Route path="/notificacoes" element={<Notificacoes />} />
                <Route path="/clientes" element={<Cliente />} />
            </Route>
        </Routes>
    );
}
