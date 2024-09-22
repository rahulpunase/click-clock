import { useQuery } from "convex/react";
import { memo, useEffect } from "react";

import useSetUserForPresence from "@/common/hooks/onlinePresence/useSetUserForPresence";

import { api } from "@db/_generated/api";

const PresenceListener = () => {
  const setOnlineUserData = useSetUserForPresence(
    (state) => state.setOnlineUserData,
  );
  const users = useSetUserForPresence((state) => state.users);

  const data = useQuery(api.presence.getOnlineUsers, {
    userIds: Object.keys(users),
  });

  useEffect(() => {
    setOnlineUserData(data);
  }, [data, setOnlineUserData]);
  return null;
};

export const PresenceListenerMemo = memo(PresenceListener, () => true);

export default PresenceListenerMemo;
