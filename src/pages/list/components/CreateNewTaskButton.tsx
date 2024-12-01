import { Plus } from "lucide-react";

import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import CreateNewTask from "@/pages/list/components/modals/CreateNewTask";

type CreateNewTaskButtonProps = {
  isIconButton?: boolean;
};

function CreateNewTaskButton({ isIconButton }: CreateNewTaskButtonProps) {
  const createNewTaskModalStore = useDialogStore();
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
        <CreateNewTask store={createNewTaskModalStore} />
      )}
    </>
  );
}

export default CreateNewTaskButton;
