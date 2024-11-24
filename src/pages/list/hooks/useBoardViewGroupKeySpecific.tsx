import capitalize from "lodash-es/capitalize";
import { Circle } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon from "@/design-system/ui/Icon/Icon";
import { AllSelectorIcons } from "@/design-system/ui/IconSelector/AllIcons";
import IconSelector from "@/design-system/ui/IconSelector/IconSelector";

import StatusDropDown from "@/pages/list/components/dropdownMenus/StatusDropDown";
import { groupByValues } from "@/pages/list/components/Filters/StatusFilter";
import { useListContext } from "@/pages/list/context/ListContext";

import StatusIconUpdater from "@/common/components/tasks/StatusIconUpdater";
import { useGetMembers } from "@/common/hooks/db/organizations/queries/useGetMembers";
import { colorIsDarkSimple } from "@/common/utils/misc-utils";

type BoardViewGroupKeySpecific = {
  groupKey?: string;
  expanded: boolean;
  setExpanded: (b?: boolean) => void;
  selectAll: () => void;
};
const useBoardViewGroupKeySpecific = ({
  groupKey,
  selectAll,
  setExpanded,
  expanded,
}: BoardViewGroupKeySpecific): {
  colors?: {
    background: string;
    borderColor: string;
    tagBackground: string;
    textColor: string;
  };
  dropDown?: JSX.Element;
  label: string;
  icon?: JSX.Element;
} => {
  const { list, listUserData } = useListContext();
  const { data: members } = useGetMembers();

  const groupBy = listUserData?.groupBy as (typeof groupByValues)[number];
  const label = groupKey === "undefined" ? "N.A." : capitalize(groupKey);

  switch (groupBy) {
    case "status": {
      const statusFromKey = list?.statuses?.find(
        (item) => item.label === groupKey,
      );
      const background = `${statusFromKey?.color}20`;
      const borderColor = `${statusFromKey?.color}25`;
      const tagBackground = `${statusFromKey?.color}`;

      const textColor = colorIsDarkSimple(statusFromKey?.color ?? "")
        ? "#ffffff"
        : "#000000";

      return {
        colors: { background, borderColor, tagBackground, textColor },
        label,
        dropDown: (
          <StatusDropDown
            actions={{ selectAll, setExpanded }}
            expanded={expanded}
          />
        ),
        icon: (
          <StatusIconUpdater
            defaultStatus={statusFromKey}
            labelKey={groupKey}
            list={list!}
          />
        ),
      };
    }
    case "priority": {
      const priorityKey = list?.priorities?.find(
        (item) => item.label === groupKey,
      );
      const background = `${priorityKey?.color}20`;
      const borderColor = `${priorityKey?.color}25`;
      const tagBackground = `${priorityKey?.color}`;
      const textColor = colorIsDarkSimple(priorityKey?.color ?? "")
        ? "#ffffff"
        : "#000000";
      return {
        colors: { background, borderColor, tagBackground, textColor },
        label,
      };
    }
    case "assignee": {
      const member = members.find(({ user }) => user?._id === groupKey);
      return {
        label: member?.user?.name ?? "N.A.",
      };
    }
    default: {
      return {
        label: "N.A.",
      };
    }
  }
};

export default useBoardViewGroupKeySpecific;
