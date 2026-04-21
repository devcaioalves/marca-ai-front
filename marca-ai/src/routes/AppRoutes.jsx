import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login.jsx";
import CriarConta from "../pages/auth/CriarConta.jsx";
import PrivateRoute from "../components/common/PrivateRoute.jsx";
import EsqueceuSenha from "../pages/auth/EsqueceuSenha.jsx";
import RecebeCodigo from "../pages/auth/RecebeCodigo.jsx";
import AlterarSenha from "../pages/auth/AlterarSenha.jsx";

// Descomente as páginas conforme for criando:
// import Home from "../pages/Home.jsx";
// import CreateAnnounce from "../pages/CreateAnnounce.jsx";
// import UserSettings from "../pages/UserSettings.jsx";
// import ProposalsPage from "../pages/ProposalsPage.jsx";
// import SearchResults from "../pages/SearchResults.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/criar-conta" element={<CriarConta />} />
            <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
            <Route path="/receber-codigo" element={<RecebeCodigo />} />
            <Route path="/alterar-senha" element={<AlterarSenha />} />

            {/* Rotas privadas */}
            <Route element={<PrivateRoute />}>
                {/*<Route path="/home" element={<Home />} />*/}
                {/*<Route path="/create-announce" element={<CreateAnnounce />} />*/}
                {/*<Route path="/user-settings" element={<UserSettings />} />*/}
                {/*<Route path="/proposals" element={<ProposalsPage />} />*/}
                {/*<Route path="/search" element={<SearchResults />} />*/}
            </Route>
        </Routes>
    );
}
