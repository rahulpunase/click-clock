import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const useGetCurrentWorkspace = () => {
  const workspace = useQuery(api.workspace.current);
  const isLoading = workspace === undefined;
  return {
    workspace,
    isLoading,
  };
};
