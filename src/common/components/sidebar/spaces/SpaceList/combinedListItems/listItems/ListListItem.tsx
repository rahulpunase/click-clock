import { List } from "lucide-react";
import { useLocation } from "react-router-dom";

import { ListItem } from "@/design-system/ui/List/List.Item";

import ListListDropdownItems from "@/common/components/sidebar/spaces/SpaceList/combinedListItems/listItems/ListListDropdownItems";

import { Doc } from "@db/_generated/dataModel";

type ListListItemProps = {
  listItem: Doc<"lists">;
};

const ListListItem = ({ listItem }: ListListItemProps) => {
  const location = useLocation();

  if (listItem.type !== "list" || !listItem) {
    return null;
  }

  const listUrl = `/s/${listItem.spaceId}/l/d/${listItem._id}`;
  return (
    <ListItem
      icon={List}
      variant="nav"
      href={listUrl}
      isSelected={location.pathname === listUrl}
    >
      <ListItem.Label>
        {listItem.name === "" ? "List" : listItem.name}
      </ListItem.Label>
      <ListItem.Dropdown>
        <ListItem.Dropdown.Content>
          <ListListDropdownItems listItem={listItem} />
        </ListItem.Dropdown.Content>
      </ListItem.Dropdown>
    </ListItem>
  );
};

export default ListListItem;
