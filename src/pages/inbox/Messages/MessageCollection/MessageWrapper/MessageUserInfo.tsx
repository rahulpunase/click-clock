import { groupMessagesAsPerUserInOrder } from "@/pages/inbox/utils";

type MessageUserInfoProps = {
  user: ReturnType<typeof groupMessagesAsPerUserInOrder>[""]["user"];
};
const MessageUserInfo = ({ user }: MessageUserInfoProps) => {
  return <div>{user?.name}</div>;
};

export default MessageUserInfo;
