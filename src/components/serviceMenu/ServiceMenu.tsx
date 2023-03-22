import React from "react";
import "./ServiceMenu.css";
import { Button } from "../index";
import { ServiceMenuProps, ServiceType } from "types";

const ServiceMenu: React.FC<ServiceMenuProps> = ({
  show,
  open,
  data,
  updateSelectedService,
  close,
  radioUpdate,
  disabledButton,
}) => {
  let drawerClasses = show ? "service-menu open" : "service-menu";

  function handleS(item: ServiceType, key: string) {
    localStorage.setItem("service", key);
    updateSelectedService(item);
    radioUpdate(item.submenu.value);
    close();
  }

  return (
    <div>
      <Button type="secondary" label="Choose a service" onClick={open} disabled={disabledButton} />
      <div className={drawerClasses}>
        <div className="service-menu-body">
          <div className="Header">
            <Button type="close" label="Close" onClick={close} />
          </div>
          <div className="service-menu-list">
            {data.map((item: any) => (
              <Button
                key={item.id}
                type="list"
                label={item.label}
                onClick={() => handleS(item, item.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceMenu;
