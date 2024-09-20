import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";

import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";
import UserOnlineStatus from "@/common/hooks/onlinePresence/UserOnlineStatus";

const UserProfileDropdown = () => {
  const { data: currentUser } = useGetCurrentUser();

  const { signOut } = useAuthActions();
  const navigate = useNavigate();
  return (
    <Flex className="w-full px-2 ">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">
            {currentUser?.name}

            <UserOnlineStatus userId={currentUser?._id ?? ""} />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>Profile actions</DropdownMenu.Label>
            <DropdownMenu.Item>
              <DropdownMenu.Item.LeftIcon icon="user" />
              <DropdownMenu.Item.Label>Profile</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <DropdownMenu.Item.LeftIcon icon="bell" />
              <DropdownMenu.Item.Label>Notification</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <DropdownMenu.Item.LeftIcon icon="settings" />
              <DropdownMenu.Item.Label>Settings</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onClick={() => {
                signOut().then((_) => navigate("/auth/sign-in"));
              }}
            >
              <DropdownMenu.Item.LeftIcon icon="log-out" />
              <DropdownMenu.Item.Label>Logout</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    </Flex>
  );
};

export { UserProfileDropdown };
