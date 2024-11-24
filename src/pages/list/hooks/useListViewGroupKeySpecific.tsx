import { capitalize } from "lodash-es";

import StatusDropDown from "@/pages/list/components/dropdownMenus/StatusDropDown";
import { type groupByValues } from "@/pages/list/components/Filters/StatusFilter";
import { useListContext } from "@/pages/list/context/ListContext";

import StatusIconUpdater from "@/common/components/tasks/StatusIconUpdater";
import { useGetMembers } from "@/common/hooks/db/organizations/queries/useGetMembers";

type GroupKeySpecificProps = {
  groupedKey?: string;
  expanded: boolean;
  setExpanded: (b?: boolean) => void;
  selectAll?: () => void;
};

const useListViewGroupKeySpecific = ({
  groupedKey,
  expanded,
  setExpanded,
  selectAll,
}: GroupKeySpecificProps) => {
  const { data: orgMembers } = useGetMembers();
  const { listUserData, list } = useListContext();
  const groupBy = listUserData?.groupBy as (typeof groupByValues)[number];

  switch (groupBy) {
    case "assignee": {
      return {
        label:
          orgMembers.find((item) => item.user?._id === groupedKey)?.user
            ?.name ?? "N.A.",
        iconUpdater: null,
        dropDownMenu: null,
      };
    }
    case "priority": {
      return {
        label:
          groupedKey === "undefined" ? "No priority" : capitalize(groupedKey),
        iconUpdater: null,
        dropDownMenu: null,
      };
    }

    case "status": {
      const statusFromKey = list?.statuses?.find(
        (item) => item.label === groupedKey,
      );
      return {
        label:
          groupedKey === "undefined" ? "No status" : capitalize(groupedKey),
        iconUpdater: (
          <StatusIconUpdater
            defaultStatus={statusFromKey}
            labelKey={groupedKey}
            list={list!}
          />
        ),
        dropDownMenu: (
          <StatusDropDown
            actions={{ setExpanded, selectAll }}
            expanded={expanded}
          />
        ),
      };
    }
    default: {
      console.log("this");
      return {
        label: "No status",
        iconUpdater: null,
        dropDownMenu: null,
      };
    }
  }
};

export default useListViewGroupKeySpecific;
