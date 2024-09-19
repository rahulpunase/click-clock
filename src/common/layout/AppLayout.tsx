import { Navigate, Outlet } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Card } from "@/design-system/ui/Card/Card";

import AppHeader from "@/common/components/AppHeader";
import AppLoader from "@/common/components/AppLoader";
import { OrganizationDropDown } from "@/common/components/organization/OrganizationDropDown";
import { SideBar } from "@/common/components/sidebar/Sidebar";
import { useGetCurrentOrganizations } from "@/common/hooks/db/organizations/queries/useGetCurrentOrganizations";
import { useGetSelectedOrganization } from "@/common/hooks/db/organizations/useGetSelectedOrganization";
import DrawerLayout from "@/common/layout/DrawerLayout";

const AppLayout = () => {
  const { data: organizations, isLoading } = useGetCurrentOrganizations();
  const selectedOrganization = useGetSelectedOrganization();

  if (isLoading) {
    return <AppLoader />;
  }

  if (!isLoading && organizations && organizations.length === 0) {
    return <Navigate replace to="/onboarding" />;
  }

  if (!isLoading && organizations.length && !selectedOrganization) {
    return (
      <Flex
        justifyContent="justify-center"
        alignItems="items-center"
        className="w-full h-full"
      >
        <Card className="w-[420px] flex-none">
          <Card.Header>
            <Card.Header.Title>
              Yay! You can join these organizations
            </Card.Header.Title>
          </Card.Header>
          <Card.Content>
            <OrganizationDropDown />
          </Card.Content>
        </Card>
      </Flex>
    );
  }

  return (
    <>
      <AppHeader />
      <Flex flex="flex-1" className="mb-1 min-h-0 min-w-0">
        <DrawerLayout>
          <SideBar />
        </DrawerLayout>
        <Flex
          as="main"
          grow="grow"
          direction="flex-col"
          className="mr-1 relative min-w-0 min-h-0 h-full"
        >
          <Outlet />
        </Flex>
      </Flex>
    </>
  );
};

export { AppLayout };
