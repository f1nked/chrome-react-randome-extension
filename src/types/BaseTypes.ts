import { ServiceNames } from "services/ServiceData";

export type DataType = {
  [key: string]: ServiceListType;
};
export type SubmenuItems = {
  label: string;
  value: string;
}[];

export type ServiceName = {
  name: ServiceNames;
};

export type ServiceType = {
  id: number;
  label: string;
  submenu: {
    items: SubmenuItems;
    value: string;
  };
  adress: string | null;
  key: string | undefined | null;
} & ServiceName;

export type ServiceListType = ServiceType[];

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

export type ServiceStrategy = {
  run(context: ServiceContext): void;
};
export type OptionMap = {
  [key: string]: (context: ServiceContext) => void;
};
