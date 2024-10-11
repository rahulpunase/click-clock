import { Folder as FolderIcon, FolderOpen } from "lucide-react";

import { ListItem } from "@/design-system/ui/List/List.Item";

import DocumentListItem from "@/common/components/sidebar/spaces/spaceList/DocumentListItem";
import FolderListDropdownItems from "@/common/components/sidebar/spaces/spaceList/FolderListDropdownItems";
import ListListItem from "@/common/components/sidebar/spaces/spaceList/ListListItem";
import type {
  Folder,
  Space,
} from "@/common/hooks/db/spaces/queries/useGetSpaces";

import { DataModel } from "@db/_generated/dataModel";

type FolderListItemProps = {
  folder: Folder;
  space: Space;
  docs: DataModel["documents"]["document"][];
  lists: DataModel["lists"]["document"][];
};

const FolderListItem = ({
  folder,
  space,
  docs,
  lists,
}: FolderListItemProps) => {
  const documents = docs.filter((doc) => doc.parentFolderId === folder._id);
  const folderLists = lists.filter(
    (list) => list.parentFolderId === folder._id,
  );

  const showExpandableList = documents.length || folder.childFolders?.length;

  return (
    <ListItem icon={FolderIcon} expandedIcon={FolderOpen} variant="nav">
      <ListItem.Label>{folder.name}</ListItem.Label>

      {showExpandableList && (
        <ListItem.ExpandableList>
          {folder?.childFolders?.map((_folder) => (
            <FolderListItem
              key={_folder._id}
              folder={_folder}
              space={space}
              docs={docs}
              lists={folderLists}
            />
          ))}

          {documents.map((doc) => (
            <DocumentListItem key={doc._id} doc={doc} />
          ))}

          {folderLists.map((listItem) => (
            <ListListItem key={listItem._id} list={listItem} />
          ))}
        </ListItem.ExpandableList>
      )}

      <ListItem.Dropdown modal>
        <ListItem.Dropdown.Portal>
          <ListItem.Dropdown.Content>
            <ListItem.Dropdown.Label>Create new</ListItem.Dropdown.Label>

            {folder.type && (
              <FolderListDropdownItems
                parentFolderId={folder._id}
                space={space}
              />
            )}
          </ListItem.Dropdown.Content>
        </ListItem.Dropdown.Portal>
      </ListItem.Dropdown>
    </ListItem>
  );
};

export default FolderListItem;
