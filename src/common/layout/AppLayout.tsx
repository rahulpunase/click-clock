import AppHeader from "@/common/components/AppHeader";
import AppLoader from "@/common/components/AppLoader";
import AppSideDrawer from "@/common/components/AppSideDrawer";
import { useGetCurrentOrganizations } from "@/common/hooks/useGetCurrentOrganizations";
import DrawerLayout from "@/common/layout/DrawerLayout";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { Navigate, Outlet } from "react-router-dom";

const AppLayout = () => {
  const { organizations, isLoading } = useGetCurrentOrganizations();

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
          <AppSideDrawer />
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

export default AppLayout;
