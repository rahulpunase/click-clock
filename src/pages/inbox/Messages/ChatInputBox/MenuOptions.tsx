import { Bold, Italic, Strikethrough } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";

const MenuOptions = () => {
  return (
    <Flex gap="gap-1" className="p-1 bg-background rounded-sm">
      <IconButton icon={Bold} variant="ghost" size="xSmallIcon" />
      <IconButton icon={Italic} variant="ghost" size="xSmallIcon" />
      <IconButton icon={Strikethrough} variant="ghost" size="xSmallIcon" />
    </Flex>
  );
};

export default MenuOptions;
