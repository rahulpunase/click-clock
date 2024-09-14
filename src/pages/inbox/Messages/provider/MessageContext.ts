import { createContext, useContext } from "react";

import type { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import { Doc } from "@db/_generated/dataModel";

type MessagesContextType = {
  createNewChannelModalStore: ReturnType<typeof useDialogStore>;
  channel: Doc<"channels"> | undefined | null;
  isChannelLoading: boolean;
};

export const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
);

export const useMessageContext = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error("Message context should be used in messages provider");
  }
  return context;
};
