import AppRoutes from "../src/routes/AppRoutes.jsx";
import { ToastContainer } from "react-toastify";
import "../src/styles/global.css";

export default function App() {
    return (
        <>
            <AppRoutes />

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="dark"
            />
        </>
    );
}
