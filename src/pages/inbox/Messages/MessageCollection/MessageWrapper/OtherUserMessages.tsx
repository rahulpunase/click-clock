import MessageItem from "@/design-system/patterns/MessageItem";

import type { useGetAllMessages } from "@/common/hooks/db/messages/queries/useGetAllMessages";
import UserOnlineStatus from "@/common/hooks/onlinePresence/UserOnlineStatus";

type OtherUserMessagesType = {
  message: ReturnType<typeof useGetAllMessages>["data"][number];
};

const OtherUserMessages = ({ message }: OtherUserMessagesType) => {
  return (
    <MessageItem align="left">
      <MessageItem.UserName>{message.user?.name ?? ""}</MessageItem.UserName>
      <MessageItem.Content>{message.content}</MessageItem.Content>
      <MessageItem.Time>{message._creationTime.toString()}</MessageItem.Time>
      <MessageItem.Avatar>
        <MessageItem.Avatar.AvatarFallback>
          {message.user?.name?.[0]}
        </MessageItem.Avatar.AvatarFallback>
      </MessageItem.Avatar>
      <MessageItem.Status>
        <UserOnlineStatus userId={message.user?._id ?? ""} />
      </MessageItem.Status>
    </MessageItem>
  );
};

export default OtherUserMessages;
