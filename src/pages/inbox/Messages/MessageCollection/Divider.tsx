import { PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "@/design-system/ui/Text/Text";

const WithDivider = ({
  label,
  children,
}: { label: string } & PropsWithChildren) => {
  return (
    <Flex direction="flex-col" gap="gap-2">
      <Flex className="w-full" gap="gap-2" alignItems="items-center">
        <Flex flex="flex-1" className="h-[1px] bg-accent-border2" />
        <button className="p-1 px-2 rounded-full border border-accent-border2">
          <Text variant="subtext">{label}</Text>
        </button>
        <Flex flex="flex-1" className="h-[1px] bg-accent-border2" />
      </Flex>
      {children}
    </Flex>
  );
};

export default WithDivider;
