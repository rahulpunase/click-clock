import CurrentUserMessage from "@/pages/inbox/Messages/MessageCollection/MessageWrapper/CurrentUserMessage";
import OtherUserMessages from "@/pages/inbox/Messages/MessageCollection/MessageWrapper/OtherUserMessages";

import { useGetAllMessages } from "@/common/hooks/db/messages/queries/useGetAllMessages";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";

type MessageWrapperType = {
  message: ReturnType<typeof useGetAllMessages>["data"][number];
};

const MessageWrapper = ({ message }: MessageWrapperType) => {
  const { data: user } = useGetCurrentUser();
  return (
    <div
      aria-labelledby={`message by ${message.user?.name}`}
      aria-label="message"
      className="animate-in fade-in-0"
    >
      {user?._id === message.createdByUserId && (
        <CurrentUserMessage message={message} />
      )}
      {user?._id !== message.createdByUserId && (
        <OtherUserMessages message={message} />
      )}
    </div>
  );
};

export default MessageWrapper;
