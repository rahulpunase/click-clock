import { useAuthActions } from "@convex-dev/auth/react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";

import { useGetCurrentUser } from "@/common/hooks/useGetCurrentUser";

const UserProfileDropdown = () => {
  const { currentUser } = useGetCurrentUser();
  const { signOut } = useAuthActions();
  return (
    <Flex className="w-full px-2 ">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">{currentUser?.name}</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>Profile actions</DropdownMenu.Label>
            <DropdownMenu.Item>
              <DropdownMenu.Item.LeftIcon icon="User" />
              <DropdownMenu.Item.Label>Profile</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <DropdownMenu.Item.LeftIcon icon="Bell" />
              <DropdownMenu.Item.Label>Notification</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <DropdownMenu.Item.LeftIcon icon="Settings" />
              <DropdownMenu.Item.Label>Settings</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onClick={signOut}>
              <DropdownMenu.Item.LeftIcon icon="LogOut" />
              <DropdownMenu.Item.Label>Logout</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    </Flex>
  );
};

export { UserProfileDropdown };
