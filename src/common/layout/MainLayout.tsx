import { Outlet } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";

const MainLayout = () => {
  return (
    <Flex className="h-[100vh]" direction="flex-col">
      <Outlet />
    </Flex>
  );
};

export default MainLayout;
