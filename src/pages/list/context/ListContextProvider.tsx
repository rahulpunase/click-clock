import { PropsWithChildren, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { ListContext } from "@/pages/list/context/ListContext";
import NewStatusEditModal from "@/pages/list/modals/NewStatusEditModal";

const ListContextProvider = ({ children }: PropsWithChildren) => {
  const [isAddingTask, setIsAddingTask] = useState({
    groupId: "",
  });
  const params = useParams();

  const contextIds = useMemo(
    () => ({
      ...params,
    }),
    [params],
  );

  const value = useMemo(
    () => ({
      isAddingTask,
      setIsAddingTask,
      contextIds,
    }),
    [isAddingTask, contextIds],
  );
  return (
    <ListContext.Provider value={value}>
      {children}
      <NewStatusEditModal />
    </ListContext.Provider>
  );
};

export default ListContextProvider;
