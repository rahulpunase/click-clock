import { Navigate, Outlet } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";

import AppHeader from "@/common/components/AppHeader";
import AppLoader from "@/common/components/AppLoader";
import SettingsSideBar from "@/common/components/settings/sidebar/SettingsSideBar";
import { useGetCurrentOrganizations } from "@/common/hooks/db/organizations/queries/useGetCurrentOrganizations";
import DrawerLayout from "@/common/layout/DrawerLayout";

const AppSettingsLayout = () => {
  const { data: organizations, isLoading } = useGetCurrentOrganizations();
  if (isLoading) {
    return <AppLoader />;
  }

  if (!isLoading && organizations?.length === 0) {
    return <Navigate replace to="/onboarding" />;
  }

  return (
    <>
      <AppHeader />
      <Flex flex="flex-1" className="mb-1 min-h-0 min-w-0">
        <DrawerLayout>
          <SettingsSideBar />
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

export default AppSettingsLayout;
