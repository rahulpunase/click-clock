import { Folder as FolderIcon, FolderOpen } from "lucide-react";

import { ListItem } from "@/design-system/ui/List/List.Item";

import FolderListDropdownItems from "@/common/components/sidebar/spaces/SpaceList/combinedListItems/folderItems/FolderListDropdownItems";
import ListListItem from "@/common/components/sidebar/spaces/SpaceList/combinedListItems/listItems/ListListItem";
import type {
  Space,
  SpaceItem,
} from "@/common/hooks/db/spaces/queries/useGetSpaces";
import { ItemWithActualItem } from "@/common/types";

import { Doc } from "@db/_generated/dataModel";

type FolderListItemProps = {
  item: SpaceItem;
  space: Space;
};

const CombinedListItem = ({ item, space }: FolderListItemProps) => {
  if (item.type === "folder") {
    const showExpandableList = item.items?.length;
    return (
      <ListItem icon={FolderIcon} expandedIcon={FolderOpen} variant="nav">
        <ListItem.Label>{item.name}</ListItem.Label>
        <ListItem.Badge variant="secondary" size="small">
          {item.items?.length}
        </ListItem.Badge>
        {showExpandableList && (
          <ListItem.ExpandableList>
            {item.items?.map((internalItem) => {
              if (item.type === "folder") {
                return (
                  <CombinedListItem
                    key={internalItem._id}
                    item={internalItem as ItemWithActualItem}
                    space={space}
                  />
                );
              }
            })}
          </ListItem.ExpandableList>
        )}

        {/* List item dropdown */}
        <ListItem.Dropdown modal>
          <ListItem.Dropdown.Portal>
            <ListItem.Dropdown.Content>
              <ListItem.Dropdown.Label>Create new</ListItem.Dropdown.Label>
              <FolderListDropdownItems folder={item} space={space} />
            </ListItem.Dropdown.Content>
          </ListItem.Dropdown.Portal>
        </ListItem.Dropdown>
      </ListItem>
    );
  }

  if (item.type === "list") {
    return <ListListItem listItem={item.actualItem as Doc<"lists">} />;
  }
};

export default CombinedListItem;
