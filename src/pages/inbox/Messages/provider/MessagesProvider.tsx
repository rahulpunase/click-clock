import CreateNewChannelModal from "@/pages/inbox/Messages/modals/CreateNewChannelModal";
import EditChannelDetailsModal from "@/pages/inbox/Messages/modals/EditChannelDetailsModal";
import { MessagesContext } from "@/pages/inbox/Messages/provider/MessageContext";
import { PropsWithChildren, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import { useGetChannelById } from "@/common/hooks/db/channels/queries/useGetChannelById";
import { useGetChannels } from "@/common/hooks/db/channels/queries/useGetChannels";

import { Id } from "@db/_generated/dataModel";

export const MessagesProvider = ({ children }: PropsWithChildren) => {
  const createNewChannelModalStore = useDialogStore();
  const editChannelDetailsModalStore = useDialogStore();
  const navigate = useNavigate();
  const params = useParams();
  const { data: channels } = useGetChannels();
  const { data: channel, isLoading: isChannelLoading } = useGetChannelById({
    channelId: params.channelId as Id<"channels">,
  });

  if (!params.channelId && channels.length) {
    navigate(`/inbox/c/${channels[0]._id}`, { replace: true });
  }

  const value = useMemo(
    () => ({
      createNewChannelModalStore,
      editChannelDetailsModalStore,
      channel,
      isChannelLoading,
      channels,
      channelId: params.channelId,
    }),
    [
      createNewChannelModalStore,
      editChannelDetailsModalStore,
      channel,
      isChannelLoading,
      channels,
      params.channelId,
    ],
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
      {createNewChannelModalStore.open && <CreateNewChannelModal />}
      {editChannelDetailsModalStore.open && <EditChannelDetailsModal />}
    </MessagesContext.Provider>
  );
};
