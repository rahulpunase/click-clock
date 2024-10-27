import { capitalize } from "lodash-es";
import { Loader } from "lucide-react";
import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { Popover } from "@/design-system/ui/Popover/Popover";
import { Select } from "@/design-system/ui/Select/Select";
import { Text } from "@/design-system/ui/Text/Text";

import { useListContext } from "@/pages/list/context/ListContext";

import { useUpdateListUserData } from "@/common/hooks/db/lists/mutations/useUpdateListUserData";

const groupByValues = ["status", "priority"];

const StatusFilter = () => {
  const { list, listUserData } = useListContext();

  const { mutate: updateListUserData } = useUpdateListUserData();

  const [isGroupByUpdating, setIsGroupByUpdating] = useState(false);
  const [isSortByUpdating, setSortByUpdating] = useState(false);

  const updateStatus = (value: string) => {
    if (!list) {
      return;
    }
    setIsGroupByUpdating(true);
    updateListUserData(
      {
        listId: list?._id,
        groupBy: value,
      },
      {
        onSettled: () => setIsGroupByUpdating(false),
      },
    );
  };

  const updateSorting = (value: string) => {
    if (!list) {
      return;
    }
    setSortByUpdating(true);
    updateListUserData(
      {
        listId: list?._id,
        sortBy: value,
      },
      {
        onSettled: () => setSortByUpdating(false),
      },
    );
  };

  const defaultGroupBy = listUserData?.groupBy ?? "status";
  const defaultSortBy = listUserData?.sortBy ?? "asc";

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Flex>
          <Badge isSelectable variant="outline">
            Group: {capitalize(defaultGroupBy)}
          </Badge>
        </Flex>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Content.Main>
          <Flex className="gap-2">
            <Flex direction="flex-col">
              <Flex className="gap-2" alignItems="items-center">
                <Text variant="subtext-1">Group by</Text>
                {isGroupByUpdating && (
                  <Loader className="size-4 animate-spin" />
                )}
              </Flex>
              <Flex className="pt-2">
                <Select
                  value={defaultGroupBy}
                  onValueChange={(val) => updateStatus(val)}
                >
                  <Select.Trigger className="min-w-[180px] p-1 h-6">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content>
                    {groupByValues.map((statusItem) => (
                      <Select.Item value={statusItem} key={statusItem}>
                        {capitalize(statusItem)}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </Flex>
            </Flex>
            <Flex direction="flex-col">
              <Flex className="gap-2" alignItems="items-center">
                <Text variant="subtext-1">Sort by</Text>
                {isSortByUpdating && <Loader className="size-4 animate-spin" />}
              </Flex>
              <Flex className="pt-2">
                <Select
                  value={defaultSortBy}
                  onValueChange={(val) => updateSorting(val)}
                >
                  <Select.Trigger className="min-w-[120px] p-1 h-6">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="asc">Ascending</Select.Item>
                    <Select.Item value="desc">Descending</Select.Item>
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
