import React from "react";
import "./Button_style.css";
import { ReactComponent as CloseIcon } from "icons/close_icon.svg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "list" | "close";
  label: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { variant, label, disabled, ...restProps } = props;
  return (
    <button {...restProps} className={`super-button ${variant}`} disabled={disabled}>
      {variant === "close" ? <CloseIcon /> : <>{label}</>}
    </button>
  );
};

export default Button;
