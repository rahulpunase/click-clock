import { RotateCcw, X } from "lucide-react";
import { ComponentProps } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { AllSelectorIcons } from "@/design-system/ui/IconSelector/AllIcons";
import IconSelector from "@/design-system/ui/IconSelector/IconSelector";
import { Text } from "@/design-system/ui/Text/Text";
import { cn } from "@/design-system/utils/utils";

import { LocalStatuses } from "@/common/types";

type Props = {
  status: LocalStatuses[0];
  onDelete: (statusLabel: string) => void;
  onReset: (statusLabel: string) => void;
  onIconChange: (
    params: Parameters<ComponentProps<typeof IconSelector>["onChange"]>["0"],
    label: string,
  ) => void;
};
const StatusItemToRender = ({
  status,
  onDelete,
  onReset,
  onIconChange,
}: Props) => {
  return (
    <Flex
      gap="gap-2"
      alignItems="items-center"
      className="p-2 border border-accent-border rounded-md"
      justifyContent="justify-between"
    >
      <Flex as="button" gap="gap-2" alignItems="items-center">
        <IconSelector
          color={status.color}
          iconName={status.icon as keyof typeof AllSelectorIcons}
          size="xs"
          onChange={({ type, value }) =>
            onIconChange({ type, value }, status.label)
          }
        />
        <Text variant="body-1" className={cn(status.deleted && "line-through")}>
          {status.label}
        </Text>
      </Flex>
      {status.deletable && (
        <IconButton
          size="xs"
          variant="outline"
          icon={status.deleted ? RotateCcw : X}
          onClick={() =>
            status.deleted ? onReset(status.label) : onDelete(status.label)
          }
        />
      )}
    </Flex>
  );
};

export default StatusItemToRender;
