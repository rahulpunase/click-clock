import { PropsWithChildren, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { ListContext } from "@/pages/list/context/ListContext";

import { useGetListById } from "@/common/hooks/db/lists/queries/useGetListById";
import { useGetListUserData } from "@/common/hooks/db/lists/queries/useGetListUserData";

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

  const { data: list } = useGetListById({
    listId: contextIds.listId,
  });

  const { data: listUserData } = useGetListUserData({
    listId: contextIds.listId,
  });

  const value = useMemo(
    () => ({
      list,
      contextIds,
      isAddingTask,
      listUserData,
      setIsAddingTask,
    }),
    [isAddingTask, contextIds, list, listUserData, setIsAddingTask],
  );
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListContextProvider;
