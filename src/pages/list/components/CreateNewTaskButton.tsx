import { Plus } from "lucide-react";

import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import CreateNewTaskModal from "@/pages/list/components/modals/CreateNewTaskModal";
import { useListContext } from "@/pages/list/context/ListContext";

import { Id } from "@db/_generated/dataModel";

type CreateNewTaskButtonProps = {
  isIconButton?: boolean;
};

function CreateNewTaskButton({ isIconButton }: CreateNewTaskButtonProps) {
  const createNewTaskModalStore = useDialogStore();
  const { contextIds } = useListContext();
  return (
    <>
      {isIconButton ? (
        <IconButton icon={Plus} tooltip="Create a new task" />
      ) : (
        <Button
          onClick={() => createNewTaskModalStore.show()}
          tooltip="Create a new task"
        >
          Create new task
        </Button>
      )}
      {createNewTaskModalStore.open && (
        <CreateNewTaskModal
          listId={contextIds.listId as Id<"lists">}
          spaceId={contextIds.spaceId as Id<"spaces">}
          store={createNewTaskModalStore}
        />
      )}
    </>
  );
}

export default CreateNewTaskButton;
