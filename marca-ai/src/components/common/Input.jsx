import "../common/Input.jsx";

export default function Input({ name, type, placeholder, value, onChange, required, ...rest }) {
    return (
        <div className="input-group">
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                {...rest}
            />
        </div>
    )
}
    