import CreateNewSpaceModal from "@/common/components/sidebar/spaces/CreateNewSpaceModal";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";
import { List } from "@/design-system/ui/List/List";
import { ListItem } from "@/design-system/ui/List/List.Item";
import { Text } from "@/design-system/ui/Text/Text";
import { useGetSpaces } from "@/common/hooks/useGetSpaces";
import { Icons } from "@/design-system/ui/types";

const SpaceContainer = () => {
  const createNewSpaceModalStore = useDialogStore();
  const { spaces } = useGetSpaces();

  return (
    <>
      <Flex className="px-2 py-4" direction="flex-col">
        <Flex
          alignItems="items-center"
          justifyContent="justify-between"
          className="mb-2"
        >
          <Text as="h4" variant="heading-1">
            Spaces
          </Text>
          <Flex gap="gap-1">
            <IconButton variant="ghost" icon="Ellipsis" size="xSmallIcon" />
            <IconButton variant="ghost" icon="Search" size="xSmallIcon" />
            <IconButton
              variant="default"
              icon="Plus"
              size="xSmallIcon"
              onClick={createNewSpaceModalStore.show}
            />
          </Flex>
        </Flex>
        <List>
          <ListItem variant="nav" icon="Globe">
            <ListItem.Label>Everything</ListItem.Label>
          </ListItem>
          {spaces?.map((space) => (
            <ListItem
              variant="nav"
              icon={(space.icon as Icons) ?? "Space"}
              iconBackgroundColor={space.color}
            >
              <ListItem.Label>{space.name}</ListItem.Label>
              <ListItem.MenuDropdown>
                <ListItem.MenuDropdown.Content>
                  <ListItem.MenuDropdown.MenuItem>
                    <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Pencil" />
                    <ListItem.MenuDropdown.MenuItem.Label>
                      Rename
                    </ListItem.MenuDropdown.MenuItem.Label>
                  </ListItem.MenuDropdown.MenuItem>
                  <ListItem.MenuDropdown.MenuItem>
                    <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Link" />
                    <ListItem.MenuDropdown.MenuItem.Label>
                      Copy link
                    </ListItem.MenuDropdown.MenuItem.Label>
                  </ListItem.MenuDropdown.MenuItem>
                  <ListItem.MenuDropdown.MenuSeparator />
                  <ListItem.MenuDropdown.MenuSub>
                    <ListItem.MenuDropdown.MenuSubTrigger>
                      <ListItem.MenuDropdown.MenuItem>
                        <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Plus" />
                        <ListItem.MenuDropdown.MenuItem.Label>
                          Create new
                        </ListItem.MenuDropdown.MenuItem.Label>
                      </ListItem.MenuDropdown.MenuItem>
                    </ListItem.MenuDropdown.MenuSubTrigger>

                    <ListItem.MenuDropdown.MenuSubContent>
                      <ListItem.MenuDropdown.MenuItem>
                        <ListItem.MenuDropdown.MenuItem.LeftIcon icon="List" />
                        <ListItem.MenuDropdown.MenuItem.Label>
                          List
                        </ListItem.MenuDropdown.MenuItem.Label>
                      </ListItem.MenuDropdown.MenuItem>
                      <ListItem.MenuDropdown.MenuSeparator />
                      <ListItem.MenuDropdown.MenuItem>
                        <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Folder" />
                        <ListItem.MenuDropdown.MenuItem.Label>
                          Folder
                        </ListItem.MenuDropdown.MenuItem.Label>
                      </ListItem.MenuDropdown.MenuItem>

                      <ListItem.MenuDropdown.MenuItem>
                        <ListItem.MenuDropdown.MenuItem.LeftIcon icon="File" />
                        <ListItem.MenuDropdown.MenuItem.Label>
                          Doc
                        </ListItem.MenuDropdown.MenuItem.Label>
                      </ListItem.MenuDropdown.MenuItem>
                    </ListItem.MenuDropdown.MenuSubContent>
                  </ListItem.MenuDropdown.MenuSub>
                  <ListItem.MenuDropdown.MenuSeparator />
                  <ListItem.MenuDropdown.MenuItem variant="destructive">
                    <ListItem.MenuDropdown.MenuItem.LeftIcon icon="Trash" />
                    <ListItem.MenuDropdown.MenuItem.Label>
                      Delete
                    </ListItem.MenuDropdown.MenuItem.Label>
                  </ListItem.MenuDropdown.MenuItem>
                </ListItem.MenuDropdown.Content>
              </ListItem.MenuDropdown>
            </ListItem>
          ))}
        </List>
      </Flex>
      {createNewSpaceModalStore.open && (
        <CreateNewSpaceModal store={createNewSpaceModalStore} />
      )}
    </>
  );
};

export default SpaceContainer;
