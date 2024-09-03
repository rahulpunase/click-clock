import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

type Payload = (typeof api.organizations.getById)["_args"];

export const useGetOrganizationById = (payload: Payload) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.organizations.getById, {
      ...payload,
    }),
  );

  return { data: data, isLoading, error };
};
