import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../styles/layout.css";

export default function Layout({ children }) {
    return (
        <div className="layout">

            <div className="sidebar-area">
                <Sidebar />
            </div>

            <div className="header-area">
                <Header />
            </div>

            <div className="main-area">
                {children}
            </div>
        </div>
    );
}