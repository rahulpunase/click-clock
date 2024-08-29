import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { useAuthActions } from "@convex-dev/auth/react";

const AppHeader = () => {
  const { signOut } = useAuthActions();
  return (
    <Flex
      className="w-full h-[--app-header-height]"
      aria-labelledby="app header"
      shrink="shrink-0"
    ></Flex>
  );
};

export default AppHeader;
