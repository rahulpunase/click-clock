import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

type Payload = (typeof api.requests.alreadySentRequest)["_args"];

export const useGetAlreadySentRequests = (payload: Payload) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.requests.alreadySentRequest, {
      ...payload,
    }),
  );

  return { data: data ?? [], isLoading, error };
};
