import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { Popover } from "@/design-system/ui/Popover/Popover";
import { Separator } from "@/design-system/ui/Separator/Separator";

const DefaultListIdPage = () => {
  return (
    <Flex direction="flex-col">
      <Flex gap="gap-2" className="pt-2 px-2">
        <Popover>
          <Popover.Trigger asChild>
            <Badge isSelectable variant="outline">
              Group: Status
            </Badge>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Content.Header>
              <Popover.Content.Header.Title>
                Header
              </Popover.Content.Header.Title>
            </Popover.Content.Header>
          </Popover.Content>
        </Popover>

        <Badge isSelectable variant="outline">
          Subtasks: Collapse all
        </Badge>
        <Separator orientation="vertical" />
        <Badge isSelectable variant="outline">
          Filters: Collapse all
        </Badge>
        <Separator orientation="vertical" />
        <Badge isSelectable variant="secondary">
          Hide
        </Badge>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default DefaultListIdPage;
