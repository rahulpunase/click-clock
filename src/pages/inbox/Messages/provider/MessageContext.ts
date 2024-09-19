import { createContext, useContext } from "react";

import type { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import { useGetChannelById } from "@/common/hooks/db/channels/queries/useGetChannelById";
import { useGetChannels } from "@/common/hooks/db/channels/queries/useGetChannels";

type MessagesContextType = {
  createNewChannelModalStore: ReturnType<typeof useDialogStore>;
  editChannelDetailsModalStore: ReturnType<typeof useDialogStore>;
  channel: ReturnType<typeof useGetChannelById>["data"];
  channels: ReturnType<typeof useGetChannels>["data"];
  isChannelLoading: boolean;
  channelId?: string;
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
