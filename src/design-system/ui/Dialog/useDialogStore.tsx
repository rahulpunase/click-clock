import { useState } from "react";

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
