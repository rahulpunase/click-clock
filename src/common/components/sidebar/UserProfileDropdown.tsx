import { useAuthActions } from "@convex-dev/auth/react";
import { Bell, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";

import UserOnlineStatus from "@/common/components/presence/UserOnlineStatus";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";
import useTheme from "@/common/hooks/theme/useTheme";

const UserProfileDropdown = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { setTheme } = useTheme();

  const { signOut } = useAuthActions();
  const navigate = useNavigate();
  return (
    <Flex className="w-full px-2 ">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" className="w-full bg-background shadow-sm">
            {currentUser?.name}

            <UserOnlineStatus userId={currentUser?._id ?? ""} />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Group>
            <DropdownMenu.Label>Profile actions</DropdownMenu.Label>
            <DropdownMenu.Item>
              <DropdownMenu.Item.LeftIcon icon={User} />
              <DropdownMenu.Item.Label>Profile</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                <DropdownMenu.Item>
                  <DropdownMenu.Item.Label>Themes</DropdownMenu.Item.Label>
                </DropdownMenu.Item>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item onClick={() => setTheme("light")}>
                  <DropdownMenu.Item.LeftIcon icon={Sun} />
                  <DropdownMenu.Item.Label>Light</DropdownMenu.Item.Label>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => setTheme("dark")}>
                  <DropdownMenu.Item.LeftIcon icon={Moon} />
                  <DropdownMenu.Item.Label>Dark</DropdownMenu.Item.Label>
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <DropdownMenu.Item.LeftIcon icon={Bell} />
              <DropdownMenu.Item.Label>Notification</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <DropdownMenu.Item.LeftIcon icon={Settings} />
              <DropdownMenu.Item.Label>Settings</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onClick={() => {
                signOut().then((_) => navigate("/auth/sign-in"));
              }}
            >
              <DropdownMenu.Item.LeftIcon icon={LogOut} />
              <DropdownMenu.Item.Label>Logout</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    </Flex>
  );
};

export { UserProfileDropdown };
