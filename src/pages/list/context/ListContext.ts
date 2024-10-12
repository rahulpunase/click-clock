import { createContext, useContext } from "react";

export type ListContextType = {
  isAddingTask: {
    groupId: string;
  };
  setIsAddingTask: React.Dispatch<
    React.SetStateAction<{
      groupId: string;
    }>
  >;
  contextIds: {
    viewType?: string;
    listId?: string;
    spaceId?: string;
  };
};

export const ListContext = createContext<ListContextType | undefined>(
  undefined,
);

export const useListContext = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error("useListContext must be used with in ListContextProvider");
  }
  return context;
};
