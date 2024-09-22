import { Filter, Pencil } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";

const Header = () => {
  return (
    <Flex className="w-full px-2 py-2">
      <Flex flex="flex-1"></Flex>
      <Flex alignItems="items-center" gap="gap-2">
        <IconButton variant="ghost" size="smallIcon" icon={Filter} />
        <IconButton variant="ghost" size="smallIcon" icon={Pencil} />
      </Flex>
    </Flex>
  );
};

export default Header;
