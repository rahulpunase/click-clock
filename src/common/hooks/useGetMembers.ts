import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

export const useGetMembers = () => {
  const members = useQuery(api.members.getMembers);
  const isLoading = members === undefined;
  return {
    members,
    isLoading,
  };
};
