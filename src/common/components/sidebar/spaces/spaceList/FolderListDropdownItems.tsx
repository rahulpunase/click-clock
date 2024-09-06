import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { ListItem } from "@/design-system/ui/List/List.Item";

import { useSpaceContext } from "@/common/components/sidebar/spaces/context/SpaceListContext";
import { ListItemCombined } from "@/common/components/sidebar/spaces/spaceList/ListItemCombined";
import type { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";

type FolderListDropdownItemsProps = {
  folder: ReturnType<typeof useGetSpaces>["data"][number]["folders"][number];
  space: ReturnType<typeof useGetSpaces>["data"][number];
};

const FolderListDropdownItems = ({
  folder: parentFolder,
  space,
}: FolderListDropdownItemsProps) => {
  const { createNewFolderModalStore } = useSpaceContext();

  return (
    <>
      <ListItemCombined label="Edit folder" icon="pencil" onClick={() => {}} />
      <ListItemCombined label="Copy link" icon="link" onClick={() => {}} />
      <ListItem.Dropdown.Separator />
      <ListItemCombined label="List" icon="list-plus" onClick={() => {}} />
      <ListItemCombined label="Document" icon="file-plus" onClick={() => {}} />
      <ListItem.Dropdown.Separator />
      <ListItemCombined
        label="New Folder"
        icon="folder-plus"
        onClick={() =>
          createNewFolderModalStore.show({
            flow: "new",
            spaceId: space._id,
            parentFolderId: parentFolder._id,
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
