import { List } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { ListItem } from "@/design-system/ui/List/List.Item";

import ListListDropdownItems from "@/common/components/sidebar/spaces/SpaceList/listItems/ListListDropdownItems";

import { DataModel } from "@db/_generated/dataModel";

const ListListItem = ({ list }: { list: DataModel["lists"]["document"] }) => {
  const location = useLocation();
  const listUrl = `/s/${list.spaceId}/l/d/${list._id}`;
  return (
    <ListItem
      icon={List}
      variant="nav"
      href={listUrl}
      isSelected={location.pathname === listUrl}
    >
      <ListItem.Label>{list.name === "" ? "List" : list.name}</ListItem.Label>
      <ListItem.Dropdown>
        <ListItem.Dropdown.Content>
          <ListListDropdownItems list={list} />
        </ListItem.Dropdown.Content>
      </ListItem.Dropdown>
    </ListItem>
  );
};

export default ListListItem;
