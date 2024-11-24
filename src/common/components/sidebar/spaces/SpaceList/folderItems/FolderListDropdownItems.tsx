import { FilePlus, FolderPlus, Link, ListPlus, Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ListItem } from "@/design-system/ui/List/List.Item";

import { ItemWrapper } from "@/common/components/sidebar/spaces/SpaceList/ItemWrapper";
import { useCreateDocument } from "@/common/hooks/db/documents/mutations/useCreateDocument";
import type { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";
import { useGlobalModalContext } from "@/common/hooks/useGlobalModalContext";

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
    useGlobalModalContext();
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
      <ItemWrapper label="Edit folder" icon={Pen} onClick={() => {}} />
      <ItemWrapper label="Copy link" icon={Link} onClick={() => {}} />
      <ListItem.Dropdown.Separator />
      <ItemWrapper
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
      <ItemWrapper
        label="Document"
        icon={FilePlus}
        onClick={createDocumentOnClick}
      />
      <ListItem.Dropdown.Separator />
      <ItemWrapper
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
      {/* {true && (
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
      )} */}
    </>
  );
};

export default FolderListDropdownItems;
