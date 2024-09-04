import { createContext, useContext } from "react";

export type ShowParams = {
  title: string;
  actionFn: () => void;
  description?: string;
  cancelFn?: () => void;
};
export type Show = (params: ShowParams) => void;

type AppAlertContext = {
  show: Show;
  hide: () => void;
  actionFnRef: React.MutableRefObject<(() => void) | null | undefined>;
  cancelFnRef: React.MutableRefObject<(() => void) | null | undefined>;
};

export const AppAlertContext = createContext<AppAlertContext | undefined>(
  undefined,
);

export const useAppAlertDialog = () => {
  const context = useContext(AppAlertContext);

  if (context === undefined) {
    throw new Error("Use");
  }
  return context;
};
