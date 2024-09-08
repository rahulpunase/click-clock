import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";
import { Id } from "@db/_generated/dataModel";

export const useGetDocument = ({
  documentId,
}: {
  documentId: Id<"documents">;
}) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.documents.getDocument, {
      documentId,
    }),
  );

  return { data: data, isLoading, error };
};
