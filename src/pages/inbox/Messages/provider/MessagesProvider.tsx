import CreateNewChannelModal from "@/pages/inbox/Messages/modals/CreateNewChannelModal";
import { MessagesContext } from "@/pages/inbox/Messages/provider/MessageContext";
import { PropsWithChildren, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import { useGetChannelById } from "@/common/hooks/db/channels/queries/useGetChannelById";

import { Id } from "@db/_generated/dataModel";

export const MessagesProvider = ({ children }: PropsWithChildren) => {
  const createNewChannelModalStore = useDialogStore();
  const param = useParams();
  const { data: channel, isLoading: isChannelLoading } = useGetChannelById({
    channelId: param.channelId as Id<"channels">,
  });

  const value = useMemo(
    () => ({ createNewChannelModalStore, channel, isChannelLoading }),
    [createNewChannelModalStore, channel, isChannelLoading],
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
      {createNewChannelModalStore.open && (
        <CreateNewChannelModal store={createNewChannelModalStore} />
      )}
    </MessagesContext.Provider>
  );
};
