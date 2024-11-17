import { ComponentProps } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";
import { Tooltip } from "@/design-system/ui/Tooltip/Tooltip";
import { cn } from "@/design-system/utils/utils";

const FieldTrigger = ({
  value,
  icon,
  tooltip,
  placeholder,
  size = "default",
}: {
  value?: string;
  icon?: IconName;
  tooltip?: string;
  placeholder?: string;
  size?: "default" | "lg";
}) => {
  const iconClass = size === "default" ? "size-3" : "size-4";
  const bodyVariant: ComponentProps<typeof Text>["variant"] =
    size === "default" ? "body-sm" : "body-1";
  return (
    <Tooltip content={tooltip} side="left" renderChildren={true}>
      <Flex className="w-full p-1" alignItems="items-center" gap="gap-2">
        <Icon IconName={icon} className={cn("shrink-0", iconClass)} />
        <Text wrap variant={value ? bodyVariant : "subtext"}>
          {value || placeholder || "N.A."}
        </Text>
      </Flex>
    </Tooltip>
  );
};

export default FieldTrigger;
