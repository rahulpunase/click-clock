import { Lock, SpaceIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { IconMapping } from "@/design-system/ui/IconSelector/IconSelector";
import { ListItem } from "@/design-system/ui/List/List.Item";

import DocumentListItem from "@/common/components/sidebar/spaces/spaceList/DocumentListItem";
import FolderListItem from "@/common/components/sidebar/spaces/spaceList/FolderListItems";
import ListListItem from "@/common/components/sidebar/spaces/spaceList/ListListItem";
import SpaceListDropDownItems from "@/common/components/sidebar/spaces/spaceList/SpaceListDropDownItems";
import { useGetDocumentsBySpaceId } from "@/common/hooks/db/documents/queries/useGetDocumentsBySpaceId";
import { useGetListBySpaceId } from "@/common/hooks/db/lists/queries/useGetListBySpaceId";
import type { Space } from "@/common/hooks/db/spaces/queries/useGetSpaces";

type SpaceListItemProps = {
  space: Space;
};

const SpaceListItem = ({ space }: SpaceListItemProps) => {
  const { data: documents } = useGetDocumentsBySpaceId({ spaceId: space._id });
  const { data: lists } = useGetListBySpaceId({ spaceId: space._id });

  const spaceDocs =
    documents?.filter(
      (doc) => !doc.parentFolderId && doc.spaceId === space._id,
    ) ?? [];

  const spaceLists =
    lists?.filter(
      (list) => !list.parentFolderId && list.spaceId === space._id,
    ) ?? [];

  const showExpandableList =
    spaceDocs.length || space.folders?.length || spaceLists.length;

  return (
    <ListItem
      variant="nav"
      className="animate-in fade-in-0"
      icon={
        space.icon
          ? IconMapping[space.icon as keyof typeof IconMapping]
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
          {space.folders.map((folder) => {
            if (folder.type === "folder") {
              return (
                <FolderListItem
                  key={folder._id}
                  folder={folder}
                  space={space}
                  docs={documents ?? []}
                  lists={lists ?? []}
                />
              );
            }
          })}

          {spaceDocs.map((doc) => (
            <DocumentListItem key={doc._id} doc={doc} />
          ))}

          {spaceLists.map((listItem) => (
            <ListListItem key={listItem._id} list={listItem} />
          ))}
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
