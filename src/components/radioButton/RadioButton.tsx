import "./RadioButton_style.css";

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  onChangeAction: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  const { label, value, onChangeAction, checked, disabled } = props;
  const handleChange = () => {
    localStorage.setItem("submenu_value", value);
    onChangeAction(value);
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
