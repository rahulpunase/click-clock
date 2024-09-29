import { useEffect, useRef } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";

import WithDivider from "@/pages/inbox/Messages/MessageCollection/Divider";
import MessageWrapper from "@/pages/inbox/Messages/MessageCollection/MessageWrapper";
import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import { prepareMessageToRender } from "@/pages/inbox/utils";

import { useGetAllMessages } from "@/common/hooks/db/messages/queries/useGetAllMessages";

const MessageCollection = () => {
  const { channelId, channel } = useMessageContext();
  const { data: allMessages } = useGetAllMessages({
    channelId: channelId,
  });
  const messageCollection = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (allMessages.length) {
      messageCollection.current?.scrollTo({
        top: messageCollection.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [messageCollection, allMessages]);

  if (!channel) {
    return null;
  }

  const messagesToRender = prepareMessageToRender(allMessages);

  console.log({ messagesToRender });

  return (
    <Flex
      className="bg-background-body px-3 pb-4 overflow-y-auto h-full"
      direction="flex-col"
      gap="gap-1"
      data-component="MessageCollection"
      ref={messageCollection}
      role="presentation"
    >
      <Flex flex="flex-1" direction="flex-col" justifyContent="justify-end">
        {Object.keys(messagesToRender).map((itemKey) => {
          const timeGrouped = messagesToRender[itemKey];
          return (
            <WithDivider label={itemKey}>
              {timeGrouped.map((messageItem) => (
                <MessageWrapper
                  key={messageItem.key}
                  user={messageItem.user}
                  messageItems={messageItem.items}
                />
              ))}
            </WithDivider>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default MessageCollection;
