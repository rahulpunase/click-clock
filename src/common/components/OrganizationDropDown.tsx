import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";
import { Text } from "@/design-system/ui/Text/Text";

const OrganizationDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          className="justify-start data-[state=open]:bg-secondary"
          icon="Building"
        >
          <Text variant="body-1">My Organizations</Text>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.MenuGroup>
          <Flex className="p-2">
            <Text variant="heading-1">Organization</Text>
          </Flex>
          <DropdownMenu.MenuItem>
            <DropdownMenu.MenuItem.LeftIcon icon="Settings" />
            <DropdownMenu.MenuItem.Label>Settings</DropdownMenu.MenuItem.Label>
          </DropdownMenu.MenuItem>
          <DropdownMenu.MenuItem>
            <DropdownMenu.MenuItem.LeftIcon icon="CircleFadingArrowUp" />
            <DropdownMenu.MenuItem.Label>Upgrade</DropdownMenu.MenuItem.Label>
          </DropdownMenu.MenuItem>
        </DropdownMenu.MenuGroup>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default OrganizationDropDown;
