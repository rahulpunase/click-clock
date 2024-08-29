import { Flex } from "@/design-system/layout/Flex/Flex";
import { Loader } from "lucide-react";

const AppLoader = () => {
  return (
    <Flex
      className="w-full h-full"
      alignItems="items-center"
      justifyContent="justify-center"
    >
      <Loader className="animate-spin" />
    </Flex>
  );
};

export default AppLoader;
