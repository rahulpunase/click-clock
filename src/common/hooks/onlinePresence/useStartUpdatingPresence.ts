import { useEffect } from "react";

import { useUpdateOnline } from "@/common/hooks/db/presence/mutation/useUpdateOnline";

/**
 * Custom hook that starts updating the user's online presence at regular intervals.
 * It utilizes the useUpdateOnline hook to perform the update operation.
 */
const useStartUpdatingPresence = () => {
  const { mutate: updateOnline } = useUpdateOnline();
  useEffect(() => {
    const interval = window.setInterval(() => updateOnline({}), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [updateOnline]);
};

export default useStartUpdatingPresence;
