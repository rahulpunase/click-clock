import { Circle } from "lucide-react";
import { useEffect } from "react";

import { Tooltip } from "@/design-system/ui/Tooltip/Tooltip";

import useSetUserForPresence from "@/common/hooks/onlinePresence/useSetUserForPresence";
import { formatTo } from "@/common/utils/date-utils";

type UserOnlineStatusProps = {
  userId: string;
};

const UserOnlineStatus = ({ userId }: UserOnlineStatusProps) => {
  const { setUsers, onlineUserData } = useSetUserForPresence();
  useEffect(() => {
    setUsers(userId);
  }, [setUsers, userId]);

  if (
    !onlineUserData ||
    !onlineUserData[userId] ||
    !onlineUserData[userId][0]
  ) {
    return (
      <Tooltip content="Offline">
        <Circle className="size-3 fill-gray-400 text-gray-400" />
      </Tooltip>
    );
  }
  if (onlineUserData[userId][0].status === "online") {
    return (
      <Tooltip content="Online">
        <Circle className="size-3 fill-green-500 text-green-500" />
      </Tooltip>
    );
  }
  if (onlineUserData[userId][0].status === "offline") {
    return (
      <Tooltip
        content={`Was online at ${formatTo(onlineUserData[userId][0].lastOnline ?? 0, "hh:mm a")}`}
      >
        <Circle className="size-3 fill-gray-400 text-gray-400" />
      </Tooltip>
    );
  }
  return <Circle className="size-3 fill-gray-400 text-gray-400" />;
};

export default UserOnlineStatus;
