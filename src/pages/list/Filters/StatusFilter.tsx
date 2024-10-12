import { Flex } from "@/design-system/layout/Flex/Flex";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { Popover } from "@/design-system/ui/Popover/Popover";
import { Select } from "@/design-system/ui/Select/Select";
import { Text } from "@/design-system/ui/Text/Text";

const StatusFilter = () => {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <div>
          <Badge isSelectable variant="outline">
            Group: Status
          </Badge>
        </div>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Content.Main>
          <Flex className="gap-2">
            <Flex direction="flex-col">
              <Text variant="subtext-1">Group by</Text>
              <Flex className="pt-2">
                <Select>
                  <Select.Trigger className="min-w-[180px]">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="some item">Some item</Select.Item>
                  </Select.Content>
                </Select>
              </Flex>
            </Flex>
            <Flex direction="flex-col">
              <Text variant="subtext-1">Sort by</Text>
              <Flex className="pt-2">
                <Select>
                  <Select.Trigger className="min-w-[120px]">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="some item">Some item</Select.Item>
                  </Select.Content>
                </Select>
              </Flex>
            </Flex>
          </Flex>
        </Popover.Content.Main>
      </Popover.Content>
    </Popover>
  );
};

export default StatusFilter;
