import { Flex } from "@/design-system/layout/Flex/Flex";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex className="h-[100vh]" direction="flex-col">
      <Outlet />
    </Flex>
  );
};

export default Layout;
