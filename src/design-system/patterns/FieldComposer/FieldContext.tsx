import { createContext, useContext } from "react";

type FieldContextValue = {
  editing: boolean;
  setEditing: (bool: boolean) => void;
};

export const FieldContext = createContext<FieldContextValue | undefined>(
  undefined,
);

export const useFieldContext = () => {
  const context = useContext(FieldContext);
  return context;
};
