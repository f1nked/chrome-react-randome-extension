import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Button, RadioButton, ServiceMenu } from "components";
import { ServiceFactory, RequestStrategy } from "serviceStrategy";
import { ReactComponent as RmLogo } from "icons/randome_logo.svg";
import { ReactComponent as VkLogo } from "icons/vk_logo.svg";
import { ReactComponent as WikiLogo } from "icons/wiki_logo.svg";
import { DataType, ServiceItemsType, ServiceType, SubmenuItems, ServiceContext } from "types";

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

  const serviceItems: ServiceItemsType = [
    {
      name: "vk",
      id: 0,
      label: "vk.com",
      logo: <VkLogo />,
      submenu: {
        items: [
          { label: "User page", value: "user" },
          { label: "Group page", value: "group" },
        ],
        value: "user",
      },
      adress: "https://vk.com",
      key: process.env.REACT_APP_VK_API_KEY,
    },
    {
      name: "wiki",
      id: 1,
      label: "wikipedia.org",
      logo: <WikiLogo />,
      submenu: {
        items: [
          { label: "Russian page", value: "ru" },
          { label: "English page", value: "en" },
        ],
        value: "ru",
      },
      adress: null,
      key: null,
    },
  ];

  useEffect(() => {
    const name = localStorage.getItem("service");
    const submenuItem = localStorage.getItem("submenu_value");
    const nameExists = serviceItems.some((item: { name: string }): boolean => item.name === name);
    const itemService: ServiceType | undefined = serviceItems.find(
      (item: { name: string }): boolean => item.name === name
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
      localStorage.setItem("service", serviceItems[0].name);
      setSelectedService(serviceItems[0]);
      setRadioButtonValue(serviceItems[0].submenu.value);
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
    console.log("out");
    if (abortController) {
      console.log("Inside");
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
              data={serviceItems}
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
              <div className="logo-container">{selectedService.logo}</div>
              <div className="label-container">{selectedService.label}</div>
            </div>
            <div className="submenu-container">
              {selectedService.submenu.items.map((item: SubmenuItems[number], i: number) => (
                <RadioButton
                  key={i}
                  disabled={loading}
                  label={item.label}
                  value={item.value}
                  checked={radioButtonValue === item.value}
                  onChange={setRadioButtonValue}
                />
              ))}
            </div>
          </div>
          <div className="btn-container">
            <Button
              type="primary"
              label="RandoMe"
              onClick={handleClickRandoMe}
              disabled={loading}
            />
            <Button type="secondary" label="Cancel" onClick={abortRequest} disabled={!loading} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default App;
