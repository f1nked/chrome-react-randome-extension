import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Button, ServiceMenu, ServiceLogo, Options } from "components";
import { ServiceFactory, RequestStrategy } from "services/ServiceStrategy";
import { ReactComponent as RmLogo } from "icons/randome_logo.svg";
import { ServiceType, SubmenuItems, ServiceContext } from "types";
import { ServiceNames, ServiceList } from "services/ServiceData";

/// <reference types="chrome" />

declare const chrome: any;

function App() {
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedService, setSelectedService] = useState<ServiceType | Record<string, never>>({});
  const [radioButtonValue, setRadioButtonValue] = useState<string>("");
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);

  const isLoopingRef: React.MutableRefObject<boolean> = useRef(false);
  const intervalRef: React.MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  useEffect(() => {
    const name = localStorage.getItem("service");
    const submenuItem = localStorage.getItem("submenu_value");
    const nameExists = ServiceList.some(
      (item: { name: ServiceNames | null }): boolean => item.name === name
    );
    const itemService = ServiceList.find(
      (item: { name: ServiceNames | null }): boolean => item.name === name
    );
    if (name && nameExists && itemService) {
      setSelectedService(itemService);
      const submenuItemExists = itemService.submenu.items.some(
        (item: { value: string | null }) => item.value === submenuItem
      );
      if (submenuItem && submenuItemExists) {
        setRadioButtonValue(submenuItem);
      } else {
        localStorage.setItem("submenu_value", itemService.submenu.value);
        setRadioButtonValue(itemService.submenu.value);
      }
    } else {
      localStorage.setItem("service", ServiceList[0].name);
      setSelectedService(ServiceList[0]);
      setRadioButtonValue(ServiceList[0].submenu.value);
    }
  }, []);

  function handleOpenServiceMenuButton() {
    setServiceMenuOpen(!serviceMenuOpen);
  }
  function handleCloseServiceMenuButton() {
    setServiceMenuOpen(false);
  }

  async function redirectToService(newUrl: string) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: Record<string, any>) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.update(activeTab.id, { url: `${newUrl}` });
        setLoading(false);
      }
    });
  }

  const abortRequest = () => {
    if (abortController) {
      abortController.abort();
      isLoopingRef.current = false;
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      setLoading(false);
    }
  };

  const handleClickRandoMe = () => {
    const controller = new AbortController();
    setAbortController(controller);
    setLoading(true);
    const context: ServiceContext = {
      controller,
      optionValue: radioButtonValue,
      redirect: redirectToService,
      updateLoading: setLoading,
      key: selectedService.key,
      isLoopingRef: isLoopingRef,
      intervalRef: intervalRef,
      adress: selectedService.adress,
      name: selectedService.name,
    };
    const factory = new ServiceFactory();
    const service = factory.create(context.name);
    const requestStrategy = new RequestStrategy(service);
    requestStrategy.run(context);
  };

  return (
    <div className="App">
      {Object.keys(selectedService).length > 0 ? (
        <div className="extension-content">
          <div className="Header">
            <RmLogo />
            <ServiceMenu
              data={ServiceList}
              show={serviceMenuOpen}
              open={handleOpenServiceMenuButton}
              updateSelectedService={setSelectedService}
              close={handleCloseServiceMenuButton}
              radioUpdate={setRadioButtonValue}
              disabledButton={loading}
            />
          </div>
          <div className="service-container">
            <div className="main-container">
              <div className="logo-container">
                <ServiceLogo name={selectedService.name} />
              </div>
              <div className="label-container">{selectedService.label}</div>
            </div>
            <Options
              options={selectedService.submenu.items}
              disabled={loading}
              value={radioButtonValue}
              setValue={setRadioButtonValue}
            />
          </div>
          <div className="btn-container">
            <Button
              variant="primary"
              label="RandoMe"
              onClick={handleClickRandoMe}
              disabled={loading}
            />
            <Button variant="secondary" label="Cancel" onClick={abortRequest} disabled={!loading} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default App;
