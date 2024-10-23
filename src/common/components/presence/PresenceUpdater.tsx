import { memo, useEffect } from "react";

import { useUpdateOnline } from "@/common/hooks/db/presence/mutation/useUpdateOnline";

const PresenceUpdater = () => {
  const { mutate: updateOnline } = useUpdateOnline();
  useEffect(() => {
    const interval = window.setInterval(() => updateOnline({}), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [updateOnline]);

  return null;
};

const PresenceUpdaterMemo = memo(PresenceUpdater);

export default PresenceUpdaterMemo;
