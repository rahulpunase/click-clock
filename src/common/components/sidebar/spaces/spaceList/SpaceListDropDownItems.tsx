import { ComponentProps } from "react";

import { Button } from "@/design-system/ui/Button/Button";
import { ListItem } from "@/design-system/ui/List/List.Item";
import { Icons } from "@/design-system/ui/types";

import { useSpaceContext } from "@/common/components/sidebar/spaces/context/SpaceListContext";
import { useIsAdmin } from "@/common/hooks/permissions/useIsAdmin";
import { useGetCurrentUser } from "@/common/hooks/useGetCurrentUser";
import { useGetCurrentUserData } from "@/common/hooks/useGetCurrentUserData";
import { useGetSpaces } from "@/common/hooks/useGetSpaces";

const ListItemCombined = ({
  label,
  icon,
  onClick,
  variant = "default",
  subText,
}: {
  label: string;
  icon: Icons;
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
  space: ReturnType<typeof useGetSpaces>["spaces"][number];
};

const SpaceListDropDownItems = ({ space }: SpaceListDropDownItems) => {
  const { currentUser } = useGetCurrentUser();

  const { createNewFolderModalStore, createSpaceModalStore } =
    useSpaceContext();

  const isSpaceCreatedByUser = currentUser?._id === space.createdBy;

  const isAdmin = useIsAdmin();

  return (
    <>
      <ListItemCombined
        label="Edit"
        icon="Pencil"
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
      <ListItemCombined label="Copy link" icon="Link" onClick={() => {}} />
      <ListItem.Dropdown.Separator />
      <ListItem.Dropdown.Sub>
        <ListItem.Dropdown.SubTrigger>
          <ListItemCombined label="Create new" icon="Plus" onClick={() => {}} />
        </ListItem.Dropdown.SubTrigger>
        <ListItem.Dropdown.SubContent>
          <ListItemCombined label="List" icon="List" onClick={() => {}} />
          <ListItem.Dropdown.Separator />
          <ListItemCombined
            label="Folder"
            icon="FolderPlus"
            onClick={() =>
              createNewFolderModalStore.show({
                spaceId: space._id,
                flow: "new",
              })
            }
          />
          <ListItemCombined label="Doc" icon="FilePlus" onClick={() => {}} />
        </ListItem.Dropdown.SubContent>
      </ListItem.Dropdown.Sub>
      <ListItemCombined
        label="Space settings"
        icon="Settings"
        onClick={() => {}}
      />
      <ListItem.Dropdown.Separator />
      <ListItemCombined
        label="Add to favorites"
        icon="Star"
        onClick={() => {}}
      />
      <ListItem.Dropdown.Separator />
      <ListItemCombined label="Duplicate" icon="Copy" onClick={() => {}} />
      <ListItemCombined label="Archive" icon="FileArchive" onClick={() => {}} />
      {isSpaceCreatedByUser && (
        <>
          <ListItem.Dropdown.Separator />
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </>
      )}
    </>
  );
};

export default SpaceListDropDownItems;
