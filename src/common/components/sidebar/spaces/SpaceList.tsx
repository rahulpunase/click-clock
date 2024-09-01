import { useGetCurrentUser } from "@/common/hooks/useGetCurrentUser";
import type { useGetSpaces } from "@/common/hooks/useGetSpaces";
import { List } from "@/design-system/ui/List/List";
import { ListItem } from "@/design-system/ui/List/List.Item";
import { Icons } from "@/design-system/ui/types";
import { DataModel } from "../../../../../convex/_generated/dataModel";

const SpaceList = ({
  spaces,
}: {
  spaces: ReturnType<typeof useGetSpaces>["spaces"];
}) => {
  const { currentUser } = useGetCurrentUser();

  const isOwner = (space: DataModel["spaces"]["document"]) => {
    return space.createdBy === currentUser?._id;
  };

  return (
    <List>
      <ListItem variant="nav" icon="Globe">
        <ListItem.Label>Everything</ListItem.Label>
      </ListItem>
      {spaces?.map((space) => (
        <ListItem
          variant="nav"
          icon={(space.icon as Icons) ?? "Space"}
          iconBackgroundColor={space.color}
        >
          <ListItem.Label>{space.name}</ListItem.Label>
          <ListItem.MenuDropdown>
            <ListItem.MenuDropdown.Content>
              <ListItem.MenuDropdown.MenuItem>
                <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Pencil" />
                <ListItem.MenuDropdown.MenuItem.Label>
                  Rename
                </ListItem.MenuDropdown.MenuItem.Label>
              </ListItem.MenuDropdown.MenuItem>
              <ListItem.MenuDropdown.MenuItem>
                <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Link" />
                <ListItem.MenuDropdown.MenuItem.Label>
                  Copy link
                </ListItem.MenuDropdown.MenuItem.Label>
              </ListItem.MenuDropdown.MenuItem>
              <ListItem.MenuDropdown.MenuSeparator />
              <ListItem.MenuDropdown.MenuSub>
                <ListItem.MenuDropdown.MenuSubTrigger>
                  <ListItem.MenuDropdown.MenuItem>
                    <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Plus" />
                    <ListItem.MenuDropdown.MenuItem.Label>
                      Create new
                    </ListItem.MenuDropdown.MenuItem.Label>
                  </ListItem.MenuDropdown.MenuItem>
                </ListItem.MenuDropdown.MenuSubTrigger>

                <ListItem.MenuDropdown.MenuSubContent>
                  <ListItem.MenuDropdown.MenuItem>
                    <ListItem.MenuDropdown.MenuItem.LeftIcon icon="List" />
                    <ListItem.MenuDropdown.MenuItem.Label>
                      List
                    </ListItem.MenuDropdown.MenuItem.Label>
                  </ListItem.MenuDropdown.MenuItem>
                  <ListItem.MenuDropdown.MenuSeparator />
                  <ListItem.MenuDropdown.MenuItem>
                    <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Folder" />
                    <ListItem.MenuDropdown.MenuItem.Label>
                      Folder
                    </ListItem.MenuDropdown.MenuItem.Label>
                  </ListItem.MenuDropdown.MenuItem>

                  <ListItem.MenuDropdown.MenuItem>
                    <ListItem.MenuDropdown.MenuItem.LeftIcon icon="File" />
                    <ListItem.MenuDropdown.MenuItem.Label>
                      Doc
                    </ListItem.MenuDropdown.MenuItem.Label>
                  </ListItem.MenuDropdown.MenuItem>
                </ListItem.MenuDropdown.MenuSubContent>
              </ListItem.MenuDropdown.MenuSub>
              <ListItem.MenuDropdown.MenuSeparator />
              {isOwner(space) && (
                <ListItem.MenuDropdown.MenuItem variant="destructive">
                  <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Trash" />
                  <ListItem.MenuDropdown.MenuItem.Label>
                    Delete
                  </ListItem.MenuDropdown.MenuItem.Label>
                </ListItem.MenuDropdown.MenuItem>
              )}
            </ListItem.MenuDropdown.Content>
          </ListItem.MenuDropdown>
        </ListItem>
      ))}
    </List>
  );
};

export default SpaceList;
