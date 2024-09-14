import MessageItem from "@/design-system/patterns/MessageItem";

import type { useGetAllMessages } from "@/common/hooks/db/messages/queries/useGetAllMessages";

type CurrentUserMessageType = {
  message: ReturnType<typeof useGetAllMessages>["data"][number];
};

const CurrentUserMessage = ({ message }: CurrentUserMessageType) => {
  return (
    <MessageItem align="right">
      <MessageItem.UserName>{message.user?.name ?? ""}</MessageItem.UserName>
      <MessageItem.Content>{message.content}</MessageItem.Content>
      <MessageItem.Avatar>
        <MessageItem.Avatar.AvatarFallback>A</MessageItem.Avatar.AvatarFallback>
      </MessageItem.Avatar>
    </MessageItem>
  );
};

export default CurrentUserMessage;
