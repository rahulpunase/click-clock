import { isEmpty } from "lodash-es";
import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";

import { useListContext } from "@/pages/list/context/ListContext";

const BulkActionBar = () => {
  const { selectedTasks, setSelectedTasks } = useListContext();
  if (isEmpty(selectedTasks)) {
    return null;
  }
  const numberOfSelectedTasks = Object.keys(selectedTasks).length;
  return (
    <Flex className="absolute bottom-8 w-[80%] bg-text rounded-md left-[50%] translate-x-[-50%] py-2 px-2 shadow-2xl animate-in slide-in-from-bottom-full">
      <Button variant="outline" size="sm" onClick={() => setSelectedTasks({})}>
        {numberOfSelectedTasks} tasks selected
      </Button>
    </Flex>
  );
};

export default BulkActionBar;
