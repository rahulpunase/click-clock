import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import AllStepRenderer from "@/common/components/organization/AllStepRenderer";
import { OnBoardingStoreProvider } from "@/common/components/organization/context/OnBoardingContext";

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
          <OnBoardingStoreProvider>
            <AllStepRenderer />
          </OnBoardingStoreProvider>
        </Dialog.Content.Main>
      </Dialog.Content>
    </Dialog>
  );
};

export default CreateOrganizationModal;
