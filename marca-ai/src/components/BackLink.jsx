import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/backLink.css";

export default function BackLink({ to, label }) {

    return(
        <Link
            className="back-link"
            to={to}>
            <FaArrowLeft /> {label}
        </Link>
    );
}