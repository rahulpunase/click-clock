import { Circle } from "lucide-react";
import { useEffect } from "react";

import { Tooltip } from "@/design-system/ui/Tooltip/Tooltip";

import useSetUserForPresence from "@/common/store/useSetUserForPresence";
import { formatTo } from "@/common/utils/date-utils";

type UserOnlineStatusProps = {
  userId: string;
};

const UserOnlineStatus = ({ userId }: UserOnlineStatusProps) => {
  const subscribeUserForPresence = useSetUserForPresence(
    (state) => state.subscribeUserForPresence,
  );
  const unSubscribeUserForPresence = useSetUserForPresence(
    (state) => state.unSubscribeUserForPresence,
  );
  const onlineUserData = useSetUserForPresence(
    (state) => state.onlineUserData?.[userId],
  );

  useEffect(() => {
    if (userId) {
      subscribeUserForPresence(userId);
      return () => {
        unSubscribeUserForPresence(userId);
      };
    }
  }, [subscribeUserForPresence, userId, unSubscribeUserForPresence]);

  if (!onlineUserData || !onlineUserData?.[0]) {
    return (
      <Tooltip content="Offline">
        <Circle className="size-3 fill-gray-400 text-gray-400" />
      </Tooltip>
    );
  }
  if (onlineUserData[0].status === "online") {
    return (
      <Tooltip content="Online">
        <Circle className="size-3 fill-green-500 text-green-500" />
      </Tooltip>
    );
  }
  if (onlineUserData[0].status === "offline") {
    return (
      <Tooltip
        content={`Was online at ${formatTo(onlineUserData[0].lastOnline ?? 0, "hh:mm a")}`}
      >
        <Circle className="size-3 fill-gray-400 text-gray-400" />
      </Tooltip>
    );
  }
  return <Circle className="size-3 fill-gray-400 text-gray-400" />;
};

export default UserOnlineStatus;
