import { useState } from "react";

/**
 * Custom hook for managing dialog state.
 * @template T - The type of data to be stored in the dialog state.
 * @returns An object containing functions to show, hide the dialog and the current data in the dialog.
 */
export const useDialogStore = <T,>() => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const show = (data?: T) => {
    if (data) {
      setData(data);
    }
    setOpen(true);
  };
  const hide = () => {
    setData(null);
    setOpen(false);
  };

  return {
    open,
    show,
    hide,
    data,
  };
};
