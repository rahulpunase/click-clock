import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import OnBoardingForm from "@/common/components/onboarding/OnBoardingForm";

const CreateOrganizationModal = ({
  store,
}: {
  store: ReturnType<typeof useDialogStore>;
}) => {
  return (
    <Dialog open={store.open} onOpenChange={store.hide}>
      <Dialog.Content>
        <Dialog.Content.Header>
          <Dialog.Content.Header.Title>
            Create Organization
          </Dialog.Content.Header.Title>
        </Dialog.Content.Header>
        <Dialog.Content.Main>
          <OnBoardingForm onSuccess={() => store.hide()} />
        </Dialog.Content.Main>
      </Dialog.Content>
    </Dialog>
  );
};

export default CreateOrganizationModal;
