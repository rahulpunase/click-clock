import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";
import { Text } from "@/design-system/ui/Text/Text";

import { useSpaceContext } from "@/common/components/sidebar/spaces/context/SpaceListContext";

const SpaceListHeader = () => {
  const { createSpaceModalStore } = useSpaceContext();
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
              icon="ellipsis"
              size="xSmallIcon"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start">
            <DropdownMenu.Group>
              <DropdownMenu.Item onClick={() => createSpaceModalStore.show()}>
                <DropdownMenu.Item.LeftIcon icon="plus" />
                <DropdownMenu.Item.Label>
                  Create new space
                </DropdownMenu.Item.Label>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu.Item.LeftIcon icon="grid-2x2" />
                <DropdownMenu.Item.Label>Manage spaces</DropdownMenu.Item.Label>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
        <IconButton
          variant="ghost"
          icon="search"
          tooltip="Search spaces"
          size="xSmallIcon"
        />
        <IconButton
          variant="default"
          icon="plus"
          size="xSmallIcon"
          tooltip="Create new space"
          onClick={() => createSpaceModalStore.show()}
        />
      </Flex>
    </Flex>
  );
};

export { SpaceListHeader };
