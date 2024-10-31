import { capitalize } from "lodash-es";

import { type groupByValues } from "@/pages/list/components/Filters/StatusFilter";
import { useListContext } from "@/pages/list/context/ListContext";

import { useGetMembers } from "@/common/hooks/db/organizations/queries/useGetMembers";

const useGroupKeySpecific = (groupedKey?: string) => {
  const { data: orgMembers } = useGetMembers();
  const { listUserData } = useListContext();
  const groupBy = listUserData?.groupBy as (typeof groupByValues)[number];

  switch (groupBy) {
    case "assignee": {
      return {
        label:
          orgMembers.find((item) => item.user?._id === groupedKey)?.user
            ?.name ?? "N.A.",
      };
    }
    case "priority": {
      return {
        label:
          groupedKey === "undefined" ? "No priority" : capitalize(groupedKey),
      };
    }

    case "status": {
      return {
        label:
          groupedKey === "undefined" ? "No status" : capitalize(groupedKey),
      };
    }
    default: {
      return {
        label: "",
      };
    }
  }
};

export default useGroupKeySpecific;
