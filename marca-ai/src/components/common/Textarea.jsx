import "../../styles/input.css";

export default function TextArea({ name, placeholder, value, onChange, ...rest }) {
    return (
        <div className="input-group">
            <textarea
                className="input"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...rest}
            />
        </div>
    );
}