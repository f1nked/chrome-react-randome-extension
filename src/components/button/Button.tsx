import React, { ReactNode } from "react";
import "./Button_style.css";
import { ReactComponent as CloseIcon } from "icons/close_icon.svg";

type ButtonProps = {
  type: "primary" | "secondary" | "list" | "close";
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, type }) => {
  return (
    <button onClick={onClick} className={`super-button ${type}`} disabled={disabled}>
      {type === "close" ? <CloseIcon /> : <>{label}</>}
    </button>
  );
};

export default Button;
