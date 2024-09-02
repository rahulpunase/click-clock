import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";
import { Text } from "@/design-system/ui/Text/Text";

const SpaceListHeader = ({
  onPlusIconClick,
}: {
  onPlusIconClick: () => void;
}) => {
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
            <IconButton variant="ghost" icon="Ellipsis" size="xSmallIcon" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start">
            <DropdownMenu.Group>
              <DropdownMenu.Item onClick={onPlusIconClick}>
                <DropdownMenu.Item.LeftIcon icon="Plus" />
                <DropdownMenu.Item.Label>
                  Create new space
                </DropdownMenu.Item.Label>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu.Item.LeftIcon icon="Grid2x2" />
                <DropdownMenu.Item.Label>Manage spaces</DropdownMenu.Item.Label>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
        <IconButton variant="ghost" icon="Search" size="xSmallIcon" />
        <IconButton
          variant="default"
          icon="Plus"
          size="xSmallIcon"
          onClick={onPlusIconClick}
        />
      </Flex>
    </Flex>
  );
};

export default SpaceListHeader;
