import { createContext, useContext } from "react";

type DataListContextValue = {
  editing: boolean;
  setEditing: (bool: boolean) => void;
};

export const DataListContext = createContext<DataListContextValue | undefined>(
  undefined,
);

export const useDataListContext = () => {
  const context = useContext(DataListContext);
  return context;
};
