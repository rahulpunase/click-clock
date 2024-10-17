import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import AddMembersToChannel from "@/pages/inbox/Messages/modals/EditChannelDetailsModal/AddMembersToChannel";

type AddNewChannelMemberModalProps = {
  store: ReturnType<typeof useDialogStore>;
};

const AddNewChannelMemberModal = ({ store }: AddNewChannelMemberModalProps) => {
  return (
    <Dialog open onOpenChange={store.hide}>
      <Dialog.Content>
        <Dialog.Content.Header>
          <Dialog.Content.Header.Title>
            Add members to your channel
          </Dialog.Content.Header.Title>
        </Dialog.Content.Header>
        <Dialog.Content.Main>
          <AddMembersToChannel onSuccess={store.hide} />
        </Dialog.Content.Main>
      </Dialog.Content>
    </Dialog>
  );
};

export default AddNewChannelMemberModal;
