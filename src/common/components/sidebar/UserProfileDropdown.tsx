import { useGetCurrentUser } from "@/common/hooks/useGetCurrentUser";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";
import { useAuthActions } from "@convex-dev/auth/react";

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
          <DropdownMenu.MenuGroup>
            <DropdownMenu.MenuLabel>Profile actions</DropdownMenu.MenuLabel>
            <DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem.LeftIcon icon="User" />
              <DropdownMenu.MenuItem.Label>Profile</DropdownMenu.MenuItem.Label>
            </DropdownMenu.MenuItem>
            <DropdownMenu.MenuSeparator />
            <DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem.LeftIcon icon="Bell" />
              <DropdownMenu.MenuItem.Label>
                Notification
              </DropdownMenu.MenuItem.Label>
            </DropdownMenu.MenuItem>
            <DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem.LeftIcon icon="Settings" />
              <DropdownMenu.MenuItem.Label>
                Settings
              </DropdownMenu.MenuItem.Label>
            </DropdownMenu.MenuItem>
            <DropdownMenu.MenuSeparator />
            <DropdownMenu.MenuItem onClick={signOut}>
              <DropdownMenu.MenuItem.LeftIcon icon="LogOut" />
              <DropdownMenu.MenuItem.Label>Logout</DropdownMenu.MenuItem.Label>
            </DropdownMenu.MenuItem>
          </DropdownMenu.MenuGroup>
        </DropdownMenu.Content>
      </DropdownMenu>
    </Flex>
  );
};

export default UserProfileDropdown;
