import { useEffect } from "react";

import { useGetOnlineUsers } from "@/common/hooks/db/presence/queries/useGetOnlineUsers";
import useSetUserForPresence from "@/common/hooks/onlinePresence/useSetUserForPresence";

const useStartListeningForPresence = () => {
  const { users, setOnlineUserData } = useSetUserForPresence();
  const { data } = useGetOnlineUsers({
    userIds: Object.keys(users),
  });

  useEffect(() => {
    setOnlineUserData(data);
  }, [data, setOnlineUserData]);
};

export default useStartListeningForPresence;
