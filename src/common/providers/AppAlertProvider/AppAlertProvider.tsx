import { PropsWithChildren, useRef, useState } from "react";

import {
  AppAlertContext,
  ShowParams,
} from "@/common/providers/AppAlertProvider/AppAlertContext";
import AppAlertDialog from "@/common/providers/AppAlertProvider/AppAlertDialog";

const AppAlertProvider = ({ children }: PropsWithChildren) => {
  const [state, setOpen] = useState<
    | {
        title: string;
        description?: string;
        open: boolean;
      }
    | undefined
  >(undefined);
  const actionFnRef = useRef<(() => void) | null>();
  const cancelFnRef = useRef<(() => void) | null>();

  const show = ({ actionFn, cancelFn, title, description }: ShowParams) => {
    setOpen({
      open: true,
      title,
      description,
    });
    actionFnRef.current = actionFn;
    cancelFnRef.current = cancelFn;
  };

  const hide = () => {
    if (typeof cancelFnRef.current === "function") {
      cancelFnRef.current();
    }
    actionFnRef.current = null;
    cancelFnRef.current = null;
    setOpen(undefined);
  };

  return (
    <AppAlertContext.Provider
      value={{
        show,
        hide,
        actionFnRef,
        cancelFnRef,
      }}
    >
      {children}
      {state?.open && (
        <AppAlertDialog
          open={state?.open}
          title={state.title}
          description={state.description}
        />
      )}
    </AppAlertContext.Provider>
  );
};

export default AppAlertProvider;
