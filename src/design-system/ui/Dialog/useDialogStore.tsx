import { useState } from "react";

export const useDialogStore = () => {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  return {
    open,
    show,
    hide,
  };
};
