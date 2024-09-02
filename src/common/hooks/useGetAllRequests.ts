import { useQuery } from "convex/react";

import { api } from "@db/_generated/api";

export const useGetAllRequests = () => {
  const getAllRequests = useQuery(api.requests.getOrgRequests);
  if (!getAllRequests) {
    return [];
  }
  return getAllRequests;
};
