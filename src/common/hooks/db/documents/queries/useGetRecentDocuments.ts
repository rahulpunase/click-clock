import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useRecentDocuments = () => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.documents.getRecentDocuments, {}),
  );

  return { data: data, isLoading, error };
};
