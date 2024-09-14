import MessageItem from "@/design-system/patterns/MessageItem";

import type { useGetAllMessages } from "@/common/hooks/db/messages/queries/useGetAllMessages";

type OtherUserMessagesType = {
  message: ReturnType<typeof useGetAllMessages>["data"][number];
};

const OtherUserMessages = ({ message }: OtherUserMessagesType) => {
  return (
    <MessageItem align="left">
      <MessageItem.UserName>{message.user?.name ?? ""}</MessageItem.UserName>
      <MessageItem.Content>{message.content}</MessageItem.Content>
      <MessageItem.Avatar>
        <MessageItem.Avatar.AvatarFallback>
          {message.user?.name?.[0]}
        </MessageItem.Avatar.AvatarFallback>
      </MessageItem.Avatar>
    </MessageItem>
  );
};

export default OtherUserMessages;
