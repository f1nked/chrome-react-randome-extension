import React from "react";
import { SubmenuItems } from "types";
import { RadioButton } from "components";
import "./Options_style.css";

interface IOptions {
  options: SubmenuItems;
  disabled: boolean;
  value: string;
  setValue: (value: string) => void;
}

const Options: React.FC<IOptions> = (props) => {
  const { options, disabled, value, setValue } = props;
  return (
    <div className="submenu-container">
      {options.map((item: SubmenuItems[number], i: number) => (
        <RadioButton
          key={i}
          disabled={disabled}
          label={item.label}
          value={item.value}
          checked={value === item.value}
          onChangeAction={setValue}
        />
      ))}
    </div>
  );
};

export default Options;
