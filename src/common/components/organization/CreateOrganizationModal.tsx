import OnBoardingForm from "@/common/components/onboarding/OnBoardingForm";
import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

const CreateOrganizationModal = ({
  store,
}: {
  store: ReturnType<typeof useDialogStore>;
}) => {
  return (
    <Dialog open={store.open} onOpenChange={store.hide}>
      <Dialog.DialogContent>
        <Dialog.DialogTitle>Create Organization</Dialog.DialogTitle>
        <OnBoardingForm onSuccess={() => store.hide()} />
      </Dialog.DialogContent>
    </Dialog>
  );
};

export default CreateOrganizationModal;
