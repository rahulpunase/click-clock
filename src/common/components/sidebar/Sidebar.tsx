import OrganizationDropDown from "@/common/components/organization/OrganizationDropDown";
import SpaceContainer from "@/common/components/sidebar/spaces/SpaceContainer";
import UserProfileDropdown from "@/common/components/sidebar/UserProfileDropdown";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { List } from "@/design-system/ui/List/List";
import { ListItem } from "@/design-system/ui/List/List.Item";
import { Separator } from "@/design-system/ui/Separator/Separator";
import { icons } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SideNavItems: {
  link: string;
  label: string;
  icon: keyof typeof icons;
  actions?: JSX.Element;
}[] = [
  {
    link: "/home",
    label: "Home",
    icon: "House",
  },
  {
    link: "/inbox",
    label: "Inbox",
    icon: "MessageCircle",
    actions: (
      <ListItem.MenuDropdown>
        <ListItem.MenuDropdown.Content align="start">
          <ListItem.MenuDropdown.MenuItem>
            <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Plus" />
            <ListItem.MenuDropdown.MenuItem.Label>
              Create new message
            </ListItem.MenuDropdown.MenuItem.Label>
          </ListItem.MenuDropdown.MenuItem>
          <ListItem.MenuDropdown.MenuSeparator />
          <ListItem.MenuDropdown.MenuLabel>
            Settings
          </ListItem.MenuDropdown.MenuLabel>
          <ListItem.MenuDropdown.MenuItem>
            <ListItem.MenuDropdown.MenuItem.Label>
              Unpin
            </ListItem.MenuDropdown.MenuItem.Label>
          </ListItem.MenuDropdown.MenuItem>
        </ListItem.MenuDropdown.Content>
      </ListItem.MenuDropdown>
    ),
  },
  {
    link: "/docs",
    label: "Documents",
    icon: "BookOpenText",
  },
  {
    link: "/dashboard",
    label: "Dashboard",
    icon: "Gauge",
  },
];

const SideBar = () => {
  const location = useLocation();
  return (
    <Flex flex="flex-1" className="w-full relative h-full" direction="flex-col">
      <Flex direction="flex-col" flex="flex-1" className="overflow-auto">
        <Flex className="px-2 pb-4">
          <OrganizationDropDown />
        </Flex>
        <Flex className="px-2 pb-4">
          <List>
            {SideNavItems.map(({ icon, label, link, actions }) => (
              <ListItem
                key={link}
                render={(props) => <Link to={link} {...props} />}
                icon={icon}
                variant="nav"
                isSelected={location.pathname === link}
              >
                <ListItem.Label>{label}</ListItem.Label>
                {actions && actions}
              </ListItem>
            ))}
          </List>
        </Flex>
        <Separator orientation="horizontal" />
        <SpaceContainer />
      </Flex>
      <Flex>
        <UserProfileDropdown />
      </Flex>
    </Flex>
  );
};

export default SideBar;
