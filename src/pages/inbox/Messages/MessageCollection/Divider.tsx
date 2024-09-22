import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "@/design-system/ui/Text/Text";

const Divider = ({ label }: { label: string }) => {
  return (
    <Flex className="w-full" gap="gap-2" alignItems="items-center">
      <Flex flex="flex-1" className="h-[1px] bg-accent-border2" />
      <button className="p-1 px-2 rounded-full border border-accent-border2">
        <Text variant="subtext">{label}</Text>
      </button>
      <Flex flex="flex-1" className="h-[1px] bg-accent-border2" />
    </Flex>
  );
};

export default Divider;
