import {
  Copy,
  FileArchive,
  FilePlus,
  FolderPlus,
  Link,
  List,
  Pencil,
  Plus,
  Settings,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/design-system/ui/Button/Button";
import { ListItem } from "@/design-system/ui/List/List.Item";
import { useToast } from "@/design-system/ui/Toast/useToast";

import { useSpaceContext } from "@/common/components/sidebar/spaces/context/SpaceListContext";
import { ListItemCombined } from "@/common/components/sidebar/spaces/spaceList/ListItemCombined";
import useAppAlertDialog from "@/common/hooks/alert/useAppAlertModal";
import { useCreateDocument } from "@/common/hooks/db/documents/mutations/useCreateDocument";
import { useSoftDeleteSpace } from "@/common/hooks/db/spaces/mutations/useSoftDeleteSpace";
import { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";
import { useIsAdmin } from "@/common/hooks/permissions/useIsAdmin";
import { getUrlPrefix } from "@/common/utils/misc-utils";

type SpaceListDropDownItemsProps = {
  space: ReturnType<typeof useGetSpaces>["data"][number];
};

const SpaceListDropDownItems = ({ space }: SpaceListDropDownItemsProps) => {
  const { data: currentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  const {
    createNewFolderModalStore,
    createSpaceModalStore,
    createNewListModalStore,
  } = useSpaceContext();

  const isSpaceCreatedByUser = currentUser?._id === space.createdByUserId;

  const isAdmin = useIsAdmin();

  const { mutate: softDeleteSpace } = useSoftDeleteSpace();
  const { mutate: createDocument } = useCreateDocument({
    onSuccess: (data) => {
      navigate(`/doc/${data}`);
    },
  });

  const [Alert, show] = useAppAlertDialog({
    options: {
      title: "Delete space?",
      description:
        "This space will be moved to the trash. You can restore from there.",
    },

    onAction: () =>
      softDeleteSpace(
        {
          spaceId: space._id,
        },
        {
          onSuccess: () => {
            showToast.toast({
              title: "Space moved to trash.",
            });
          },
          onError: () => {
            console.log("Error");
          },
        },
      ),
  });

  const showToast = useToast();

  const showDeleteAlert = () => {
    show();
  };

  const copyLink = () => {
    const url = getUrlPrefix(`/spaces/${space._id}`);
    window.navigator.clipboard.writeText(url);
    showToast.toast({
      title: "Link copied",
    });
  };

  const createDocumentOnClick = () => {
    createDocument({
      spaceId: space._id,
    });
  };

  return (
    <>
      <ListItemCombined
        label="Edit"
        icon={Pencil}
        onClick={() => {
          createSpaceModalStore.show({
            flow: "edit",
            spaceId: space._id,
          });
        }}
        subText={
          isAdmin && !isSpaceCreatedByUser
            ? "You can edit this space even though it wasn't created by you since you are an admin"
            : ""
        }
      />
      <ListItemCombined label="Copy link" icon={Link} onClick={copyLink} />
      <ListItem.Dropdown.Separator />
      <ListItem.Dropdown.Sub>
        <ListItem.Dropdown.SubTrigger>
          <ListItemCombined label="Create new" icon={Plus} onClick={() => {}} />
        </ListItem.Dropdown.SubTrigger>
        <ListItem.Dropdown.SubContent>
          <ListItemCombined
            label="List"
            icon={List}
            onClick={() =>
              createNewListModalStore.show({
                flow: "new",
                spaceId: space._id,
                parentFolderId: undefined,
              })
            }
          />
          <ListItem.Dropdown.Separator />
          <ListItemCombined
            label="Folder"
            icon={FolderPlus}
            onClick={() =>
              createNewFolderModalStore.show({
                spaceId: space._id,
                flow: "new",
              })
            }
          />
          <ListItemCombined
            label="Document"
            icon={FilePlus}
            onClick={createDocumentOnClick}
          />
        </ListItem.Dropdown.SubContent>
      </ListItem.Dropdown.Sub>
      <ListItemCombined
        label="Space settings"
        icon={Settings}
        onClick={() => {}}
      />
      <ListItem.Dropdown.Separator />
      <ListItemCombined
        label="Add to favorites"
        icon={Star}
        onClick={() => {}}
      />
      <ListItem.Dropdown.Separator />
      <ListItemCombined label="Duplicate" icon={Copy} onClick={() => {}} />
      <ListItemCombined label="Archive" icon={FileArchive} onClick={() => {}} />
      {
        <>
          <ListItem.Dropdown.Separator />
          <Button variant="destructive" size="sm" onClick={showDeleteAlert}>
            Delete
          </Button>
        </>
      }
      {Alert}
    </>
  );
};

export default SpaceListDropDownItems;
