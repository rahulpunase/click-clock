import { createContext, useContext } from "react";

type CardContext =
  | {
      isExpanded: boolean;
      isSelected: boolean;
      setSelected: (isSelected: boolean) => void;
      setIsExpanded: (isExpanded: boolean) => void;
    }
  | undefined;

const CardContext = createContext<CardContext>(undefined);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw Error("Use useCardContext inside CardProvider");
  }
  return context;
};

export { useCardContext, CardContext };
