import CreateOrganizationModal from "@/common/components/organization/CreateOrganizationModal";
import { useGetCurrentOrganizations } from "@/common/hooks/useGetCurrentOrganizations";
import { useGetSelectedOrganization } from "@/common/hooks/useGetSelectedOrganization";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";
import { Text } from "@/design-system/ui/Text/Text";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ChevronDown } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useNavigate } from "react-router-dom";

const OrganizationDropDown = () => {
  const navigate = useNavigate();

  const selectedOrganization = useGetSelectedOrganization();

  const { organizations } = useGetCurrentOrganizations();

  const store = useDialogStore();

  const selectOrganization = useMutation(api.userData.selectOrganization);

  const renderOrganizationToSelect =
    organizations?.filter((org) => org?._id !== selectedOrganization?._id) ??
    [];

  const selectedOrganizationHandler = async (id: Id<"organizations">) => {
    await selectOrganization({
      orgId: id,
    });
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
            <DropdownMenu.Group>
              <Flex className="p-2">
                <Text variant="heading-1">Organization</Text>
              </Flex>
              <DropdownMenu.Item>
                <DropdownMenu.Item.LeftIcon icon="Settings" />
                <DropdownMenu.Item.Label>Settings</DropdownMenu.Item.Label>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu.Item.LeftIcon icon="CircleFadingArrowUp" />
                <DropdownMenu.Item.Label>Upgrade</DropdownMenu.Item.Label>
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => navigate("/settings/members")}>
                <DropdownMenu.Item.LeftIcon icon="Users" />
                <DropdownMenu.Item.Label>
                  Manage members
                </DropdownMenu.Item.Label>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          )}
          {renderOrganizationToSelect?.length ? (
            <>
              <DropdownMenu.Separator />
              <DropdownMenu.Group>
                <DropdownMenu.Label>Switch userData</DropdownMenu.Label>
                {renderOrganizationToSelect.map((org) => {
                  if (!org) return null;
                  return (
                    <DropdownMenu.Item
                      onClick={() => selectedOrganizationHandler(org._id)}
                      key={org._id}
                    >
                      <DropdownMenu.Item.LeftIcon icon="Compass" />
                      <DropdownMenu.Item.Label>
                        {org.name ?? ""}
                      </DropdownMenu.Item.Label>
                    </DropdownMenu.Item>
                  );
                })}
              </DropdownMenu.Group>
            </>
          ) : null}
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={() => store.show()}>
            <DropdownMenu.Item.LeftIcon icon="Plus" />
            <DropdownMenu.Item.Label>New organization</DropdownMenu.Item.Label>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
      <CreateOrganizationModal store={store} />
    </>
  );
};

export default OrganizationDropDown;
