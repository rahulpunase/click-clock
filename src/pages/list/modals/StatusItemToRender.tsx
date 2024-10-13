import { CircleDot, RotateCcw, X } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import Icon from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";
import { cn } from "@/design-system/utils/utils";

import { StatusItem } from "@/common/types";

type Props = {
  status: StatusItem;
  deletable?: boolean;
  dbDeletable?: boolean;
  onDelete?: (statusLabel: string) => void;
  isLocallyDeleted?: boolean;
  setDbLocallyDeleted?: () => void;
};
const StatusItemToRender = ({
  status,
  deletable,
  onDelete,
  dbDeletable,
  setDbLocallyDeleted,
  isLocallyDeleted,
}: Props) => {
  return (
    <Flex
      gap="gap-2"
      alignItems="items-center"
      className="p-2 border border-accent-border rounded-md"
      justifyContent="justify-between"
    >
      <Flex as="button" gap="gap-2" alignItems="items-center">
        <Icon
          IconName={CircleDot}
          style={{
            stroke: status.color,
          }}
          className="size-4"
        />
        <Text
          variant="body-1"
          className={cn(isLocallyDeleted && "line-through")}
        >
          {status.label}
        </Text>
      </Flex>
      {deletable && (
        <Button
          className="self-end"
          variant="destructive"
          size="xsm"
          onClick={() => onDelete?.(status.label)}
        >
          Delete
        </Button>
      )}
      {dbDeletable && (
        <IconButton
          size="xSmallIcon"
          variant="outline"
          icon={isLocallyDeleted ? RotateCcw : X}
          onClick={setDbLocallyDeleted}
        />
      )}
    </Flex>
  );
};

export default StatusItemToRender;
