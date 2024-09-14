import MessageWrapper from "@/pages/inbox/Messages/MessageCollection/MessageWrapper";
import { useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";

import { useGetAllMessages } from "@/common/hooks/db/messages/queries/useGetAllMessages";

import { Id } from "@db/_generated/dataModel";

const MessageCollection = () => {
  const params = useParams();
  const { data: allMessages } = useGetAllMessages({
    channelId: params.channelId as Id<"channels">,
  });

  return (
    <Flex
      className="bg-zinc-100 px-3 pb-4 overflow-y-auto min-h-0"
      flex="flex-1"
      grow="grow"
      direction="flex-col-reverse"
      alignItems="items-end"
      gap="gap-1"
      data-component="MessageCollection"
    >
      {allMessages.map((message) => (
        <MessageWrapper key={message._id} message={message} />
      ))}
    </Flex>
  );
};

export default MessageCollection;
