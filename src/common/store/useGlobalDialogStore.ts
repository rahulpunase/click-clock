import { create } from "zustand";

type Dialogs = "list-status";

type Store<T> = {
  dialog: Dialogs | null;
  show: (dialog: Dialogs, data?: T) => void;
  hide: () => void;
  data?: T;
};

export const useGlobalDialogStore = create<Store<object>>((set) => ({
  dialog: null,
  show: (dialog: Dialogs, data?: object) => {
    console.log("show", dialog);
    set((state) => ({
      ...state,
      dialog,
      data,
    }));
  },
  hide: () =>
    set((state) => ({
      ...state,
      dialog: null,
      data: undefined,
    })),
}));

export default useGlobalDialogStore;
