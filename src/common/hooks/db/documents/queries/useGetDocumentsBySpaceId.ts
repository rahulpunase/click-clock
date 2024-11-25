import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";
import { Id } from "@db/_generated/dataModel";

export const useGetDocumentsBySpaceId = ({
  spaceId,
}: {
  spaceId: Id<"spaces">;
}) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.documents.controller.getDocumentsBySpaceId, {
      spaceId,
    }),
  );

  return { data: data, isLoading, error };
};
