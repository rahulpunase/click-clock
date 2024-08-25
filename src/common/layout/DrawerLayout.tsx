import { Flex } from "@/design-system/layout/Flex/Flex";
import { PropsWithChildren } from "react";

const DrawerLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      className="w-[--side-drawer-width]"
      aria-labelledby="app side drawer"
      shrink="shrink-0"
    >
      {children}
    </Flex>
  );
};

export default DrawerLayout;
