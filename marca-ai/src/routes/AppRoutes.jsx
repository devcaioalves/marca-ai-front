import {
    Routes,
    Route
} from "react-router-dom";

import {
    lazy,
    Suspense
} from "react";

import PrivateRoute from "../components/common/PrivateRoute.jsx";

import LoadingScreen from "../components/common/LoadingScreen.jsx";

// LAZY LOADING
const Home =
    lazy(() => import("../pages/Home.jsx"));

const Login =
    lazy(() => import("../pages/auth/Login.jsx"));

const CriarConta =
    lazy(() => import("../pages/auth/CriarConta.jsx"));

const EsqueceuSenha =
    lazy(() => import("../pages/auth/EsqueceuSenha.jsx"));

const RecebeCodigo =
    lazy(() => import("../pages/auth/RecebeCodigo.jsx"));

const AlterarSenha =
    lazy(() => import("../pages/auth/AlterarSenha.jsx"));

const Service =
    lazy(() => import("../pages/servicos/Service.jsx"));

const ServiceForm =
    lazy(() => import("../pages/servicos/ServiceForm.jsx"));

const Horario =
    lazy(() => import("../pages/horarios/Horario.jsx"));

const HorarioForm =
    lazy(() => import("../pages/horarios/HorarioForm.jsx"));

const Dashboard =
    lazy(() => import("../pages/Dashboard.jsx"));

const Perfil =
    lazy(() => import("../pages/perfil/Perfil.jsx"));

const PerfilForm =
    lazy(() => import("../pages/perfil/PerfilForm.jsx"));

const AlterarSenhaPerfil =
    lazy(() => import("../pages/perfil/AlterarSenhaPerfil.jsx"));

const Agendamentos =
    lazy(() => import("../pages/agendamentos/Agendamento.jsx"));

const Notificacoes =
    lazy(() => import("../pages/notificacoes/Notificacoes.jsx"));

const Cliente =
    lazy(() => import("../pages/clientes/Cliente.jsx"));

export default function AppRoutes(){

    return(

        <Suspense fallback={<LoadingScreen />}>

            <Routes>

                {/* PÚBLICAS */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/criar-conta"
                    element={<CriarConta />}
                />

                <Route
                    path="/esqueceu-senha"
                    element={<EsqueceuSenha />}
                />

                <Route
                    path="/receber-codigo"
                    element={<RecebeCodigo />}
                />

                <Route
                    path="/alterar-senha"
                    element={<AlterarSenha />}
                />

                {/* PRIVADAS */}

                <Route element={<PrivateRoute />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/horarios"
                        element={<Horario />}
                    />

                    <Route
                        path="/criar-horario"
                        element={<HorarioForm />}
                    />

                    <Route
                        path="/atualizar-horario/:id"
                        element={<HorarioForm />}
                    />

                    <Route
                        path="/servicos"
                        element={<Service />}
                    />

                    <Route
                        path="/criar-servico"
                        element={<ServiceForm />}
                    />

                    <Route
                        path="/atualizar-servico/:id"
                        element={<ServiceForm />}
                    />

                    <Route
                        path="/perfil"
                        element={<Perfil />}
                    />

                    <Route
                        path="/editar-perfil"
                        element={<PerfilForm />}
                    />

                    <Route
                        path="/alterar-senha-perfil"
                        element={<AlterarSenhaPerfil />}
                    />

                    <Route
                        path="/agendamentos"
                        element={<Agendamentos />}
                    />

                    <Route
                        path="/notificacoes"
                        element={<Notificacoes />}
                    />

                    <Route
                        path="/clientes"
                        element={<Cliente />}
                    />

                </Route>

            </Routes>

        </Suspense>
    );
}