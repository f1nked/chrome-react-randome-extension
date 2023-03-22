export type DataType = {
  [key: string]: ServiceItemsType;
};
export type SubmenuItems = {
  label: string;
  value: string;
}[];

export type ServiceType = {
  name: string;
  id: number;
  label: string;
  logo: JSX.Element;
  submenu: {
    items: SubmenuItems;
    value: string;
  };
  adress: string | null;
  key: string | undefined | null;
};

export type ServiceItemsType = ServiceType[];

export type ServiceMenuProps = {
  show: boolean;
  open: () => void;
  close: () => void;
  data: Record<string, any>;
  updateSelectedService: (item: ServiceType | Record<string, never>) => void;
  radioUpdate: (value: string) => void;
  disabledButton: boolean;
};

export type ServiceContext = {
  controller: AbortController;
  optionValue: string;
  redirect: (newUrl: string) => Promise<void>;
  updateLoading: (value: boolean) => void;
  key: string | null | undefined;
  isLoopingRef: React.MutableRefObject<boolean>;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  adress: string | null;
  name: string;
};
