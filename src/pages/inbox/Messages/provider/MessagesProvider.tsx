import CreateNewChannelModal from "@/pages/inbox/Messages/modals/CreateNewChannelModal";
import EditChannelDetailsModal from "@/pages/inbox/Messages/modals/EditChannelDetailsModal";
import { MessagesContext } from "@/pages/inbox/Messages/provider/MessageContext";
import { PropsWithChildren, useEffect, useMemo } from "react";
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
  const { data: channels, isLoading: loadingChannels } = useGetChannels();
  const { data: channel, isLoading: isChannelLoading } = useGetChannelById({
    channelId: params.channelId as Id<"channels">,
  });

  const generalChannel = channels.find((channel) => channel.isGeneral);

  const loading = isChannelLoading || loadingChannels;

  useEffect(() => {
    if (!params.channelId && generalChannel) {
      navigate(`/inbox/c/${generalChannel._id}`, { replace: true });
    }
  }, [generalChannel, navigate, params.channelId]);

  useEffect(() => {
    if (
      generalChannel &&
      !channel &&
      !isChannelLoading &&
      params.channelId !== generalChannel._id
    ) {
      navigate(`/inbox/c/${generalChannel._id}`, { replace: true });
    }
  }, [channel, generalChannel, isChannelLoading, navigate, params.channelId]);

  const value = useMemo(
    () => ({
      createNewChannelModalStore,
      editChannelDetailsModalStore,
      channel,
      isChannelLoading,
      channels,
      channelId: params.channelId,
      loading,
    }),
    [
      createNewChannelModalStore,
      editChannelDetailsModalStore,
      channel,
      isChannelLoading,
      channels,
      params.channelId,
      loading,
    ],
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
      <CreateNewChannelModal />
      <EditChannelDetailsModal />
    </MessagesContext.Provider>
  );
};
