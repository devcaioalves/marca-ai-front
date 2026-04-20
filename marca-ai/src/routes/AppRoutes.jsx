import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Login />} />
            {/*<Route path="/criar-conta" element={<CreateAccount />} />*/}
            {/*<Route path="/forgot-password" element={<ForgotPassword />} />*/}
            {/*<Route path="/receive-code" element={<ReceiveCode />} />*/}
            {/*<Route path="/alter-password" element={<AlterPassword />} />*/}

            {/* Rotas privadas */}
            {/*<Route element={<PrivateRoute />}>*/}
            {/*    <Route path="/home" element={<Home />} />*/}
            {/*    <Route path="/create-announce" element={<CreateAnnounce />} />*/}
            {/*    <Route path="/user-settings" element={<UserSettings />} />*/}
            {/*    <Route path="/proposals" element={<ProposalsPage />} />*/}
            {/*    <Route path="/search" element={<SearchResults />} />*/}
            {/*</Route>*/}
        </Routes>
    );
}