import ChannelCreationItem from "@/pages/inbox/Messages/MessageCollection/ChannelCreationItem";
import MessageWrapper from "@/pages/inbox/Messages/MessageCollection/MessageWrapper";
import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";

import { Flex } from "@/design-system/layout/Flex/Flex";

import { useGetAllMessages } from "@/common/hooks/db/messages/queries/useGetAllMessages";

const MessageCollection = () => {
  const { channelId, channel } = useMessageContext();
  const { data: allMessages } = useGetAllMessages({
    channelId: channelId,
  });

  if (!channel) {
    return null;
  }

  return (
    <Flex
      className="bg-zinc-100 px-3 pb-4 overflow-y-auto"
      flex="flex-1"
      grow="grow"
      direction="flex-col-reverse"
      gap="gap-1"
      data-component="MessageCollection"
    >
      {allMessages.map((message) => (
        <MessageWrapper key={message._id} message={message} />
      ))}
      <ChannelCreationItem
        channelName={channel?.name ?? "Unknown"}
        channelDate={channel._creationTime ?? 0}
      />
    </Flex>
  );
};

export default MessageCollection;
