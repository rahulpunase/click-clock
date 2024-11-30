import { Lock, SpaceIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { AllSelectorIcons } from "@/design-system/ui/IconSelector/AllIcons";
import { ListItem } from "@/design-system/ui/List/List.Item";

import CombinedListItem from "@/common/components/sidebar/spaces/SpaceList/combinedListItems/CombinedListItem";
import ListListItem from "@/common/components/sidebar/spaces/SpaceList/combinedListItems/listItems/ListListItem";
import SpaceListDropDownItems from "@/common/components/sidebar/spaces/SpaceList/spaceListItems/SpaceListDropDownItems";
import type { Space } from "@/common/hooks/db/spaces/queries/useGetSpaces";

import { Doc } from "@db/_generated/dataModel";

type SpaceListItemProps = {
  space: Space;
};

const SpaceListItem = ({ space }: SpaceListItemProps) => {
  const showExpandableList = space.items?.length;

  return (
    <ListItem
      variant="nav"
      className="animate-in fade-in-0"
      icon={
        space.icon
          ? (AllSelectorIcons[space.icon as keyof typeof AllSelectorIcons]
              ?.icon ?? SpaceIcon)
          : SpaceIcon
      }
      iconBackgroundColor={space.color}
      render={(props) => <Link to={`/s/${space._id}`} {...props} />}
    >
      <ListItem.Label>{space.name}</ListItem.Label>
      {space.isPrivate && <ListItem.SmallIcon icon={Lock} />}

      {/* FOLDER LIST ITEM */}
      {showExpandableList ? (
        <ListItem.ExpandableList>
          {space.items.map((item) => {
            if (item.type === "folder") {
              return (
                <CombinedListItem key={item._id} item={item} space={space} />
              );
            }
            if (item.type === "list") {
              return (
                <ListListItem listItem={item.actualItem as Doc<"lists">} />
              );
            }
          })}
        </ListItem.ExpandableList>
      ) : null}
      {/* FOLDER LIST ITEM */}

      <ListItem.Dropdown modal>
        <ListItem.Dropdown.Portal>
          <ListItem.Dropdown.Content>
            <SpaceListDropDownItems space={space} />
          </ListItem.Dropdown.Content>
        </ListItem.Dropdown.Portal>
      </ListItem.Dropdown>
    </ListItem>
  );
};

export default SpaceListItem;
