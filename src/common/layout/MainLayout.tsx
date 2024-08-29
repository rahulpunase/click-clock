import { Flex } from "@/design-system/layout/Flex/Flex";
import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUser } from "@/common/hooks/useGetCurrentUser";
import { Loader } from "lucide-react";

const Layout = () => {
  const { data, isLoading } = useGetCurrentUser();
  console.log({ data, isLoading });
  return (
    <Flex className="h-[100vh]" direction="flex-col">
      {/* {isLoading && <Loader className="animate-spin" />}
      {!isLoading && !data && <Navigate to="/auth/sign-in" />}
      {!isLoading && data && <Outlet />} */}
      <Outlet />
    </Flex>
  );
};

export default Layout;
