import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";
import { Tooltip } from "@/design-system/ui/Tooltip/Tooltip";

const FieldTrigger = ({
  value,
  icon,
  tooltip,
}: {
  value?: string;
  icon?: IconName;
  tooltip?: string;
}) => {
  return (
    <Tooltip content={tooltip} side="left" renderChildren={true}>
      <Flex className="w-full p-1" alignItems="items-center" gap="gap-2">
        <Icon IconName={icon} className="size-4 shrink-0" />
        <Text wrap variant="body-1">
          {value ?? "N.A."}
        </Text>
      </Flex>
    </Tooltip>
  );
};

export default FieldTrigger;
