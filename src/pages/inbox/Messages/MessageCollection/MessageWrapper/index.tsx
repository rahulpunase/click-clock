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
    <>
      {user?._id === message.createdByUserId && (
        <CurrentUserMessage message={message} />
      )}
      {user?._id !== message.createdByUserId && (
        <OtherUserMessages message={message} />
      )}
    </>
  );
};

export default MessageWrapper;
