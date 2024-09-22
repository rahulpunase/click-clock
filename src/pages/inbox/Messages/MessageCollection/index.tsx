import MessageWrapper from "@/pages/inbox/Messages/MessageCollection/MessageWrapper";
import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import { groupMessagesAsPerUserInOrder } from "@/pages/inbox/utils";
import { useEffect, useRef } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";

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

  const messagesToRender = groupMessagesAsPerUserInOrder(allMessages);

  return (
    <Flex
      className="bg-zinc-100 px-3 pb-4 overflow-y-auto"
      flex="flex-1"
      grow="grow"
      direction="flex-col"
      gap="gap-1"
      data-component="MessageCollection"
      ref={messageCollection}
      role="presentation"
    >
      {/* {Object.keys(messagesToRender).map((itemKey) => {
        const messagesIn = messagesToRender[itemKey];
        return messagesIn.map((item) => {
          if (item.itemType === "message") {
            return (
              <div
                key={item.item._creationTime}
                id={String(item.item._creationTime)}
              >
                <MessageWrapper key={item.item._id} message={item.item} />
              </div>
            );
          }
          if (item.itemType === "divider") {
            return <Divider key={item.itemType} label={item.item.label} />;
          }
        });
      })} */}
      {Object.keys(messagesToRender).map((itemKey) => {
        const userKeyItem = messagesToRender[itemKey];

        return (
          <>
            <MessageWrapper
              user={userKeyItem.user}
              messageItems={userKeyItem.items}
            />
          </>
        );
      })}
    </Flex>
  );
};

export default MessageCollection;
