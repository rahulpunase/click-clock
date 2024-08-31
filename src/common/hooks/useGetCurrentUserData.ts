import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const useGetCurrentUserData = () => {
  const userData = useQuery(api.userData.current);
  const isLoading = userData === undefined;
  return {
    userData,
    isLoading,
  };
};
