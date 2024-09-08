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
  const { createNewFolderModalStore } = useSpaceContext();
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
      <ListItemCombined label="Edit folder" icon="pencil" onClick={() => {}} />
      <ListItemCombined label="Copy link" icon="link" onClick={() => {}} />
      <ListItem.Dropdown.Separator />
      <ListItemCombined label="List" icon="list-plus" onClick={() => {}} />
      <ListItemCombined
        label="Document"
        icon="file-plus"
        onClick={createDocumentOnClick}
      />
      <ListItem.Dropdown.Separator />
      <ListItemCombined
        label="New Folder"
        icon="folder-plus"
        onClick={() =>
          createNewFolderModalStore.show({
            flow: "new",
            spaceId: space._id,
            parentFolderId: parentFolderId,
          })
        }
      />
      {true && (
        <>
          <ListItem.Dropdown.Separator />
          <Flex gap="gap-1">
            <Button variant="ghost" icon="copy" size="sm" onClick={() => {}} />
            <Button variant="ghost" size="sm" icon="move" onClick={() => {}} />
            <Button
              variant="destructive"
              size="sm"
              icon="trash"
              onClick={() => {}}
            />
          </Flex>
        </>
      )}
    </>
  );
};

export default FolderListDropdownItems;
