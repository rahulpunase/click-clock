import { Link, useLocation } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconName } from "@/design-system/ui/Icon/Icon";
import { List } from "@/design-system/ui/List/List";
import { ListItem } from "@/design-system/ui/List/List.Item";
import { Separator } from "@/design-system/ui/Separator/Separator";

import { OrganizationDropDown } from "@/common/components/organization/OrganizationDropDown";
import { SpaceContainer } from "@/common/components/sidebar/spaces/SpaceContainer";
import { UserProfileDropdown } from "@/common/components/sidebar/UserProfileDropdown";

const SideNavItems: {
  link: string;
  label: string;
  icon: IconName;
  actions?: JSX.Element;
}[] = [
  {
    link: "/home",
    label: "Home",
    icon: "house",
  },
  {
    link: "/inbox",
    label: "Inbox",
    icon: "message-circle",
    actions: (
      <ListItem.Dropdown>
        <ListItem.Dropdown.Content align="start">
          <ListItem.Dropdown.Item>
            <ListItem.Dropdown.Item.LeftIcon icon="plus" />
            <ListItem.Dropdown.Item.Label>
              Create new message
            </ListItem.Dropdown.Item.Label>
          </ListItem.Dropdown.Item>
          <ListItem.Dropdown.Separator />
          <ListItem.Dropdown.Label>Settings</ListItem.Dropdown.Label>
          <ListItem.Dropdown.Item>
            <ListItem.Dropdown.Item.Label>Unpin</ListItem.Dropdown.Item.Label>
          </ListItem.Dropdown.Item>
        </ListItem.Dropdown.Content>
      </ListItem.Dropdown>
    ),
  },
  {
    link: "/docs",
    label: "Documents",
    icon: "book-open-text",
  },
  {
    link: "/dashboard",
    label: "Dashboard",
    icon: "gauge",
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

export { SideBar };
