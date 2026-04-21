import "../../styles/login.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function InputSenha({
    value,
    onChange,
    placeholder = "Informe sua senha" // valor padrão
}) {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <div className="input-group">
            <input
                type={mostrarSenha ? "text" : "password"}
                className="input"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            <span
                className="eye"
                onClick={() => setMostrarSenha(!mostrarSenha)}
            >
                <FontAwesomeIcon icon={mostrarSenha ? faEye : faEyeSlash} />
            </span>
        </div>
    );
}