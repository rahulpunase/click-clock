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

import { ItemWrapper } from "@/common/components/sidebar/spaces/SpaceList/ItemWrapper";
import { useCreateDocument } from "@/common/hooks/db/documents/mutations/useCreateDocument";
import type { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";
import { useGlobalModalContext } from "@/common/hooks/useGlobalModalContext";
import { FolderMapObject } from "@/common/types";

type FolderListDropdownItemsProps = {
  folder: FolderMapObject;
  space: ReturnType<typeof useGetSpaces>["data"][number];
};

const FolderListDropdownItems = ({
  folder,
  space,
}: FolderListDropdownItemsProps) => {
  const { createNewFolderModalStore, createNewListModalStore } =
    useGlobalModalContext();
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUser();
  const isCreatedByUser = user?._id === folder.createdByUserId;

  const { mutate: createDocument } = useCreateDocument({
    onSuccess: (data) => {
      navigate(`/doc/${data}`);
    },
  });

  const createDocumentOnClick = () => {
    createDocument({
      spaceId: space._id,
      parentFolderId: folder._id,
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
            parentFolderId: folder._id,
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
            parentFolderId: folder._id,
          })
        }
      />
      <>
        <ListItem.Dropdown.Separator />
        <Flex gap="gap-1" className="w-full" justifyContent="justify-between">
          <Button
            variant="secondary"
            icon={Copy}
            size="sm"
            onClick={() => {}}
            className="flex-1"
          >
            Copy
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Move}
            onClick={() => {}}
            className="flex-1"
          >
            Move
          </Button>
          {isCreatedByUser && (
            <Button
              variant="destructive"
              size="sm"
              icon={Trash}
              onClick={() => {}}
              className="flex-1"
            >
              Delete
            </Button>
          )}
        </Flex>
      </>
    </>
  );
};

export default FolderListDropdownItems;
