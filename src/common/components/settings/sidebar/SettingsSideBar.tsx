import { ArrowLeft, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { List } from "@/design-system/ui/List/List";
import { ListItem } from "@/design-system/ui/List/List.Item";

const SettingsSideBar = () => {
  const navigate = useNavigate();
  return (
    <Flex className="w-full h-full px-2" direction="flex-col">
      <Flex className="w-full">
        <Button
          icon={ArrowLeft}
          variant="link"
          className="justify-start"
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </Flex>
      <Flex flex="flex-1">
        <List>
          <ListItem
            variant="nav"
            render={(props) => <Link to="/settings/members" {...props} />}
          >
            <ListItem.Label>Members</ListItem.Label>
          </ListItem>
          <ListItem
            variant="nav"
            render={(props) => <Link to="/settings/profile" {...props} />}
          >
            <ListItem.Label>Profile</ListItem.Label>
          </ListItem>
        </List>
      </Flex>
      <Flex>
        <Button icon={LogOut} variant="outline">
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default SettingsSideBar;
