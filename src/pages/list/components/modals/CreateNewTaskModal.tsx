import React from "react";

import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import CreateNewTaskForm from "@/common/components/tasks/CreateNewTaskForm";

import { Id } from "@db/_generated/dataModel";

type CreateNewTaskProps = {
  store: ReturnType<typeof useDialogStore>;
  listId: Id<"lists">;
  spaceId: Id<"spaces">;
};
function CreateNewTaskModal({ store, listId, spaceId }: CreateNewTaskProps) {
  return (
    <Dialog open={store.open} onOpenChange={() => store.hide()}>
      <Dialog.Content>
        <Dialog.Content.Header>
          <Dialog.Content.Header.Title>
            Create new task
          </Dialog.Content.Header.Title>
        </Dialog.Content.Header>
        <Dialog.Content.Main>
          <CreateNewTaskForm listId={listId} spaceId={spaceId} />
        </Dialog.Content.Main>
      </Dialog.Content>
    </Dialog>
  );
}

export default CreateNewTaskModal;
