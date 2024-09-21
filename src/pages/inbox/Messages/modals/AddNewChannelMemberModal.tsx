import AddMembersToChannel from "@/pages/inbox/Messages/modals/EditChannelDetailsModal/AddMembersToChannel";

import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

type AddNewChannelMemberModalProps = {
  store: ReturnType<typeof useDialogStore>;
};

const AddNewChannelMemberModal = ({ store }: AddNewChannelMemberModalProps) => {
  return (
    <Dialog open onOpenChange={store.hide}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.DialogTitle>Add members to your channel</Dialog.DialogTitle>
        </Dialog.Header>
        <AddMembersToChannel onSuccess={store.hide} />
      </Dialog.Content>
    </Dialog>
  );
};

export default AddNewChannelMemberModal;
