import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon from "@/design-system/ui/Icon/Icon";

const AppLoader = () => {
  return (
    <Flex
      className="w-full h-full"
      alignItems="items-center"
      justifyContent="justify-center"
    >
      <Icon name="loader" className="animate-spin" />
    </Flex>
  );
};

export default AppLoader;
