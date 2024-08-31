import CreateOrganizationModal from "@/common/components/organization/CreateOrganizationModal";
import { useGetCurrentOrganizations } from "@/common/hooks/useGetCurrentOrganizations";
import { useGetSelectedOrganization } from "@/common/hooks/useGetSelectedOrganization";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";
import { Text } from "@/design-system/ui/Text/Text";
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ChevronDown } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";

const OrganizationDropDown = () => {
  const selectedOrganization = useGetSelectedOrganization();

  const { organizations } = useGetCurrentOrganizations();

  const store = useDialogStore();

  const selectOrganization = useAction(api.userData.selectOrganization);

  const renderOrganizationToSelect =
    organizations?.filter((org) => org._id !== selectedOrganization?._id) ?? [];

  const selectedOrganizationHandler = async (id: Id<"organizations">) => {
    const something = await selectOrganization({
      orgId: id,
    });

    console.log(something);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button
            variant="ghost"
            className="justify-start data-[state=open]:bg-secondary"
            icon="Building"
            size="sm"
          >
            <Text variant="body-1">
              {selectedOrganization
                ? selectedOrganization.name
                : "Select organization first"}
            </Text>
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {selectedOrganization && (
            <DropdownMenu.MenuGroup>
              <Flex className="p-2">
                <Text variant="heading-1">Organization</Text>
              </Flex>
              <DropdownMenu.MenuItem>
                <DropdownMenu.MenuItem.LeftIcon icon="Settings" />
                <DropdownMenu.MenuItem.Label>
                  Settings
                </DropdownMenu.MenuItem.Label>
              </DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem>
                <DropdownMenu.MenuItem.LeftIcon icon="CircleFadingArrowUp" />
                <DropdownMenu.MenuItem.Label>
                  Upgrade
                </DropdownMenu.MenuItem.Label>
              </DropdownMenu.MenuItem>
            </DropdownMenu.MenuGroup>
          )}
          {renderOrganizationToSelect?.length ? (
            <>
              <DropdownMenu.MenuSeparator />
              <DropdownMenu.MenuGroup>
                <DropdownMenu.MenuLabel>Switch userData</DropdownMenu.MenuLabel>
                {renderOrganizationToSelect.map((org) => (
                  <DropdownMenu.MenuItem
                    onClick={() => selectedOrganizationHandler(org._id)}
                    key={org._id}
                  >
                    <DropdownMenu.MenuItem.LeftIcon icon="Compass" />
                    <DropdownMenu.MenuItem.Label>
                      {org.name}
                    </DropdownMenu.MenuItem.Label>
                  </DropdownMenu.MenuItem>
                ))}
              </DropdownMenu.MenuGroup>
            </>
          ) : null}
          <DropdownMenu.MenuSeparator />
          <DropdownMenu.MenuItem onClick={() => store.show()}>
            <DropdownMenu.MenuItem.LeftIcon icon="Plus" />
            <DropdownMenu.MenuItem.Label>
              New organization
            </DropdownMenu.MenuItem.Label>
          </DropdownMenu.MenuItem>
        </DropdownMenu.Content>
      </DropdownMenu>
      <CreateOrganizationModal store={store} />
    </>
  );
};

export default OrganizationDropDown;
