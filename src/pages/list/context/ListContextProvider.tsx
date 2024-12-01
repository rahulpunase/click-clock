import { RowSelectionState } from "@tanstack/react-table";
import { PropsWithChildren, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import BulkActionBar from "@/pages/list/components/BulkActionsBar";
import { ListContext } from "@/pages/list/context/ListContext";

import { useGetListById } from "@/common/hooks/db/lists/queries/useGetListById";
import { useGetListUserData } from "@/common/hooks/db/lists/queries/useGetListUserData";
import { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";
import { useGetTasks } from "@/common/hooks/db/tasks/queries/useGetTasks";

const ListContextProvider = ({ children }: PropsWithChildren) => {
  const [isAddingTask, setIsAddingTask] = useState({
    groupId: "",
  });
  const params = useParams();
  const [selectedTasks, setSelectedTasks] = useState<RowSelectionState>({});

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

  const { data: spaceData } = useGetSpaces();

  const { data: tasks, isLoading: tasksLoading } = useGetTasks({
    listId: contextIds.listId,
    spaceId: contextIds.spaceId,
  });

  const value = useMemo(
    () => ({
      list,
      contextIds,
      isAddingTask,
      listUserData,
      setIsAddingTask,
      selectedTasks,
      setSelectedTasks,
      spaces: spaceData,
      tasks,
      tasksLoading,
    }),
    [
      isAddingTask,
      contextIds,
      list,
      listUserData,
      setIsAddingTask,
      selectedTasks,
      setSelectedTasks,
      spaceData,
      tasks,
      tasksLoading,
    ],
  );
  return (
    <ListContext.Provider value={value}>
      {children}
      <BulkActionBar />
    </ListContext.Provider>
  );
};

export default ListContextProvider;
