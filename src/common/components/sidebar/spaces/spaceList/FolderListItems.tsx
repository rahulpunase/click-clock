import { ListItem } from "@/design-system/ui/List/List.Item";

import FolderListDropdownItems from "@/common/components/sidebar/spaces/spaceList/FolderListDropdownItems";
import type {
  Folder,
  Space,
} from "@/common/hooks/db/spaces/queries/useGetSpaces";

type FolderListItemProps = {
  folder: Folder;
  space: Space;
};

const FolderListItem = ({ folder, space }: FolderListItemProps) => {
  return (
    <ListItem icon="folder" expandedIcon="folder-open" variant="nav">
      <ListItem.Label>{folder.name}</ListItem.Label>

      {folder?.childFolders?.length && (
        <ListItem.ExpandableList>
          {folder?.childFolders?.map((_folder) => (
            <FolderListItem key={_folder._id} folder={_folder} space={space} />
          ))}
        </ListItem.ExpandableList>
      )}

      <ListItem.Dropdown modal>
        <ListItem.Dropdown.Portal>
          <ListItem.Dropdown.Content>
            <ListItem.Dropdown.Label>Create new</ListItem.Dropdown.Label>
            <FolderListDropdownItems folder={folder} space={space} />
          </ListItem.Dropdown.Content>
        </ListItem.Dropdown.Portal>
      </ListItem.Dropdown>
    </ListItem>
  );
};

export default FolderListItem;
