import { createContext, useContext } from "react";

type CardContextProps =
  | {
      isExpanded: boolean;
      isSelected: boolean;
      setSelected: (isSelected: boolean) => void;
      setIsExpanded: (isExpanded: boolean) => void;
    }
  | undefined;

const CardContext = createContext<CardContextProps>(undefined);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw Error("Use useCardContext inside CardProvider");
  }
  return context;
};

export { useCardContext, CardContext };
