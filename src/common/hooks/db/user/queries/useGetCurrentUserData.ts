import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetCurrentUserData = () => {
  console.log("Even after that");
  const { data, isLoading, error } = useQuery(
    convexQuery(api.userData.current, {}),
  );
  return { data, isLoading, error };
};
