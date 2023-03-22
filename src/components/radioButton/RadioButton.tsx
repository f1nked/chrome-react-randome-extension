import "./RadioButton_style.css";

type RadioButtonProps = {
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  onChange: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, checked, onChange, disabled }) => {
  const handleChange = () => {
    localStorage.setItem("submenu_value", value);
    onChange(value);
  };

  return (
    <label className={`radio-body ${disabled}`} htmlFor={value}>
      <div>{label}</div>
      <input
        type="radio"
        id={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
    </label>
  );
};

export default RadioButton;
