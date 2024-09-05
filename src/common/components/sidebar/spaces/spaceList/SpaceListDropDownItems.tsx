import { ComponentProps } from "react";

import { Button } from "@/design-system/ui/Button/Button";
import { IconName } from "@/design-system/ui/Icon/Icon";
import { ListItem } from "@/design-system/ui/List/List.Item";

import { useSpaceContext } from "@/common/components/sidebar/spaces/context/SpaceListContext";
import { useSoftDeleteSpace } from "@/common/hooks/db/spaces/mutations/useSoftDeleteSpace";
import { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";
import { useIsAdmin } from "@/common/hooks/permissions/useIsAdmin";
import { useAppAlertDialog } from "@/common/providers/AppAlertProvider/AppAlertContext";

const ListItemCombined = ({
  label,
  icon,
  onClick,
  variant = "default",
  subText,
}: {
  label: string;
  icon: IconName;
  onClick: () => void;
  variant?: ComponentProps<typeof ListItem.Dropdown.Item>["variant"];
  subText?: string;
}) => (
  <ListItem.Dropdown.Item onClick={onClick} variant={variant}>
    <ListItem.Dropdown.Item.LeftIcon icon={icon} />
    <ListItem.Dropdown.Item.Label>{label}</ListItem.Dropdown.Item.Label>
    {subText && (
      <ListItem.Dropdown.Item.SubText>{subText}</ListItem.Dropdown.Item.SubText>
    )}
  </ListItem.Dropdown.Item>
);

type SpaceListDropDownItems = {
  space: ReturnType<typeof useGetSpaces>["data"][number];
};

const SpaceListDropDownItems = ({ space }: SpaceListDropDownItems) => {
  const { data: currentUser } = useGetCurrentUser();

  const { createNewFolderModalStore, createSpaceModalStore } =
    useSpaceContext();

  const isSpaceCreatedByUser = currentUser?._id === space.createdBy;

  const isAdmin = useIsAdmin();

  const { mutate: softDeleteSpace } = useSoftDeleteSpace();

  const { show } = useAppAlertDialog();

  const showDeleteAlert = () => {
    show({
      actionFn() {
        softDeleteSpace(
          {
            spaceId: space._id,
          },
          {
            onError: () => {
              console.log("Error");
            },
          },
        );
      },
      title: "Delete space?",
      description:
        "This space will be moved to the trash. You can restore from there.",
    });
  };

  return (
    <>
      <ListItemCombined
        label="Edit"
        icon="pencil"
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
      <ListItemCombined label="Copy link" icon="link" onClick={() => {}} />
      <ListItem.Dropdown.Separator />
      <ListItem.Dropdown.Sub>
        <ListItem.Dropdown.SubTrigger>
          <ListItemCombined label="Create new" icon="plus" onClick={() => {}} />
        </ListItem.Dropdown.SubTrigger>
        <ListItem.Dropdown.SubContent>
          <ListItemCombined label="List" icon="list" onClick={() => {}} />
          <ListItem.Dropdown.Separator />
          <ListItemCombined
            label="Folder"
            icon="folder-plus"
            onClick={() =>
              createNewFolderModalStore.show({
                spaceId: space._id,
                flow: "new",
              })
            }
          />
          <ListItemCombined label="Doc" icon="file-plus" onClick={() => {}} />
        </ListItem.Dropdown.SubContent>
      </ListItem.Dropdown.Sub>
      <ListItemCombined
        label="Space settings"
        icon="settings"
        onClick={() => {}}
      />
      <ListItem.Dropdown.Separator />
      <ListItemCombined
        label="Add to favorites"
        icon="star"
        onClick={() => {}}
      />
      <ListItem.Dropdown.Separator />
      <ListItemCombined label="Duplicate" icon="copy" onClick={() => {}} />
      <ListItemCombined
        label="Archive"
        icon="file-archive"
        onClick={() => {}}
      />
      {true && (
        <>
          <ListItem.Dropdown.Separator />
          <Button variant="destructive" size="sm" onClick={showDeleteAlert}>
            Delete
          </Button>
        </>
      )}
    </>
  );
};

export default SpaceListDropDownItems;
