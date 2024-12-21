import { Ellipsis, Grid2X2, Plus, Search } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";
import { Text } from "@/design-system/ui/Text/Text";

import { useGlobalModalContext } from "@/common/hooks/useGlobalModalContext";

const SpaceListHeader = () => {
  const { createNewSpaceModalStore } = useGlobalModalContext();
  return (
    <Flex
      alignItems="items-center"
      justifyContent="justify-between"
      className="mb-2"
    >
      <Text as="h4" variant="heading-1">
        Spaces
      </Text>
      <Flex gap="gap-1">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <IconButton
              variant="ghost"
              tooltip="More options"
              icon={Ellipsis}
              size="xs"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start">
            <DropdownMenu.Group>
              <DropdownMenu.Item
                onClick={() => createNewSpaceModalStore.show()}
              >
                <DropdownMenu.Item.LeftIcon icon={Plus} />
                <DropdownMenu.Item.Label>
                  Create new space
                </DropdownMenu.Item.Label>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu.Item.LeftIcon icon={Grid2X2} />
                <DropdownMenu.Item.Label>Manage spaces</DropdownMenu.Item.Label>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
        <IconButton
          variant="ghost"
          icon={Search}
          tooltip="Search spaces"
          size="xs"
        />
        <IconButton
          variant="default"
          icon={Plus}
          size="xs"
          tooltip="Create new space"
          onClick={() => createNewSpaceModalStore.show()}
        />
      </Flex>
    </Flex>
  );
};

export { SpaceListHeader };
