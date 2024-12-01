import React from "react";

import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

type CreateNewTaskProps = {
  store: ReturnType<typeof useDialogStore>;
};
function CreateNewTask({ store }: CreateNewTaskProps) {
  return (
    <Dialog open={store.open} onOpenChange={() => store.hide()}>
      <Dialog.Content>
        <Dialog.Content.Header>Create new task</Dialog.Content.Header>
      </Dialog.Content>
    </Dialog>
  );
}

export default CreateNewTask;
