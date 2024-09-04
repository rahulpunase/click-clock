import { AlertDialog } from "@/design-system/ui/AlertDialog/AlertDialog";

import { useAppAlertDialog } from "@/common/providers/AppAlertProvider/AppAlertContext";

type AppAlertDialog = {};

const AppAlertDialog = ({
  open,
  title,
  description,
}: {
  open: boolean;
  title?: string;
  description?: string;
}) => {
  const { actionFnRef, hide } = useAppAlertDialog();
  return (
    <AlertDialog onOpenChange={hide} open={open}>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{title ?? ""}</AlertDialog.Title>
          {description && (
            <AlertDialog.Description>{description}</AlertDialog.Description>
          )}
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel variant="secondary" onClick={hide}>
            Cancel
          </AlertDialog.Cancel>
          <AlertDialog.Action
            onClick={() => {
              actionFnRef.current?.();
              hide();
            }}
          >
            Confirm
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default AppAlertDialog;
