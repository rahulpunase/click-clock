import CurrentUserMessage from "@/pages/inbox/Messages/MessageCollection/MessageWrapper/CurrentUserMessage";
import OtherUserMessages from "@/pages/inbox/Messages/MessageCollection/MessageWrapper/OtherUserMessages";
import { groupMessagesAsPerUserInOrder } from "@/pages/inbox/utils";

import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";

type MessageWrapperType = {
  messageItems: ReturnType<typeof groupMessagesAsPerUserInOrder>[""]["items"];
  user: ReturnType<typeof groupMessagesAsPerUserInOrder>[""]["user"];
};

const MessageWrapper = ({ user, messageItems }: MessageWrapperType) => {
  const { data: currentUser } = useGetCurrentUser();
  return (
    <div
      aria-labelledby={`message by ${user?.name}`}
      aria-label="message"
      className="animate-in fade-in-0"
      tabIndex={0}
    >
      {user?._id === currentUser?._id && (
        <CurrentUserMessage user={user} messageItems={messageItems} />
      )}
      {user?._id !== currentUser?._id && (
        <OtherUserMessages user={user} messageItems={messageItems} />
      )}
    </div>
  );
};

export default MessageWrapper;
