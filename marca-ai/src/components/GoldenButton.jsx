import "../styles/goldenButton.css";

export default function GoldenButton({ children, className = "", ...props }) {
    return (
        <button 
            className={`btn-golden-base ${className}`} {...props}>
            {children}
        </button>
    );
}