import AppHeader from "@/common/components/AppHeader";
import AppSideDrawer from "@/common/components/AppSideDrawer";
import DrawerLayout from "@/common/layout/DrawerLayout";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
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
