import { useState } from "react";

import { AlertDialog } from "@/design-system/ui/AlertDialog/AlertDialog";

type UseAppAlertModalProps = {
  options: {
    title?: string;
    description?: string;
    hideCancel?: boolean;
    actionButtonText?: string;
  };
  onClose?: () => void;
  onAction?: () => void;
};
const useAppAlertDialog = ({
  onAction,
  onClose,
  options,
}: UseAppAlertModalProps) => {
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  const Alert = (
    <AlertDialog
      open={open}
      onOpenChange={() => {
        hide();
        onClose?.();
      }}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>{options.title ?? "Alert"}</AlertDialog.Header>
        {options.description && (
          <AlertDialog.Description>
            {options.description}
          </AlertDialog.Description>
        )}
        <AlertDialog.Footer>
          {!options.hideCancel && (
            <AlertDialog.Cancel variant="secondary" onClick={hide}>
              Cancel
            </AlertDialog.Cancel>
          )}
          <AlertDialog.Action
            onClick={() => {
              onAction?.();
            }}
          >
            {options.actionButtonText ?? "Confirm"}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );

  return [Alert, show, hide] as const;
};

export default useAppAlertDialog;
