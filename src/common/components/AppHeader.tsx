import { Flex } from "@/design-system/layout/Flex/Flex";

const AppHeader = () => {
  return (
    <Flex
      className="w-full h-[--app-header-height]"
      aria-labelledby="app header"
      shrink="shrink-0"
    ></Flex>
  );
};

export default AppHeader;
