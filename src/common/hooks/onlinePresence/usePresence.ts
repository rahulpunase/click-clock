import useStartListeningForPresence from "@/common/hooks/onlinePresence/useStartListeningForPresence";
import useStartUpdatingPresence from "@/common/hooks/onlinePresence/useStartUpdatingPresence";

const usePresence = () => {
  useStartUpdatingPresence();
  useStartListeningForPresence();
};

export default usePresence;
