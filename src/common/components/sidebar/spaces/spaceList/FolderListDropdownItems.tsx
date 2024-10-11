import {
  Copy,
  FilePlus,
  FolderPlus,
  Link,
  ListPlus,
  Move,
  Pen,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { ListItem } from "@/design-system/ui/List/List.Item";

import { useSpaceContext } from "@/common/components/sidebar/spaces/context/SpaceListContext";
import { ListItemCombined } from "@/common/components/sidebar/spaces/spaceList/ListItemCombined";
import { useCreateDocument } from "@/common/hooks/db/documents/mutations/useCreateDocument";
import type { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";

import { Id } from "@db/_generated/dataModel";

type FolderListDropdownItemsProps = {
  parentFolderId?: Id<"folders">;
  space: ReturnType<typeof useGetSpaces>["data"][number];
};

const FolderListDropdownItems = ({
  parentFolderId,
  space,
}: FolderListDropdownItemsProps) => {
  const { createNewFolderModalStore, createNewListModalStore } =
    useSpaceContext();
  const navigate = useNavigate();

  const { mutate: createDocument } = useCreateDocument({
    onSuccess: (data) => {
      navigate(`/doc/${data}`);
    },
  });

  const createDocumentOnClick = () => {
    createDocument({
      spaceId: space._id,
      parentFolderId: parentFolderId,
    });
  };

  return (
    <>
      <ListItemCombined label="Edit folder" icon={Pen} onClick={() => {}} />
      <ListItemCombined label="Copy link" icon={Link} onClick={() => {}} />
      <ListItem.Dropdown.Separator />
      <ListItemCombined
        label="List"
        icon={ListPlus}
        onClick={() =>
          createNewListModalStore.show({
            flow: "new",
            spaceId: space._id,
            parentFolderId: parentFolderId,
          })
        }
      />
      <ListItemCombined
        label="Document"
        icon={FilePlus}
        onClick={createDocumentOnClick}
      />
      <ListItem.Dropdown.Separator />
      <ListItemCombined
        label="New Folder"
        icon={FolderPlus}
        onClick={() =>
          createNewFolderModalStore.show({
            flow: "new",
            spaceId: space._id,
            parentFolderId: parentFolderId,
          })
        }
      />
      {/* // TODO: add permissions to render this */}
      {true && (
        <>
          <ListItem.Dropdown.Separator />
          <Flex gap="gap-1">
            <Button variant="ghost" icon={Copy} size="sm" onClick={() => {}} />
            <Button variant="ghost" size="sm" icon={Move} onClick={() => {}} />
            <Button
              variant="destructive"
              size="sm"
              icon={Trash}
              onClick={() => {}}
            />
          </Flex>
        </>
      )}
    </>
  );
};

export default FolderListDropdownItems;
