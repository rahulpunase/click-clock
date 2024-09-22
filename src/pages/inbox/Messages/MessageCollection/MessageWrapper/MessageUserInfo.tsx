import { groupMessagesAsPerUserInOrder } from "@/pages/inbox/utils";
import React from "react";

type MessageUserInfoProps = {
  user: ReturnType<typeof groupMessagesAsPerUserInOrder>[""]["user"];
};
const MessageUserInfo = ({ user }: MessageUserInfoProps) => {
  return <div>{user?.name}</div>;
};

export default MessageUserInfo;
