import { AllSelectorIcons } from "@/design-system/ui/IconSelector/AllIcons";
import IconSelector from "@/design-system/ui/IconSelector/IconSelector";

import { useUpdateStatuses } from "@/common/hooks/db/lists/mutations/useUpdateStatuses";
import { StatusItem } from "@/common/types";

import { Doc } from "@db/_generated/dataModel";

type StatusIconUpdaterProps = {
  list?: Doc<"lists">;
  labelKey?: string;
  defaultStatus?: StatusItem;
};
const StatusIconUpdater = ({
  list,
  labelKey,
  defaultStatus,
}: StatusIconUpdaterProps) => {
  const { mutate: updateStatus } = useUpdateStatuses();
  const onIconChange = (type: "icon" | "color", value: string) => {
    if (!list?._id) {
      return;
    }
    const statuses = [...(list.statuses ?? [])];

    if (labelKey !== "undefined") {
      const statusToUpdate = statuses.find((item) => item.label === labelKey);
      if (statusToUpdate) {
        if (type === "color") {
          statusToUpdate.color = value;
        }
        if (type === "icon") {
          statusToUpdate.icon = value;
        }
      }
    }

    updateStatus({
      listId: list?._id,
      statuses,
    });
  };

  return (
    <IconSelector
      color={defaultStatus?.color}
      onChange={({ type, value }) => onIconChange(type, value)}
      iconName={defaultStatus?.icon as keyof typeof AllSelectorIcons}
      size="xSmallIcon"
    />
  );
};

export default StatusIconUpdater;
