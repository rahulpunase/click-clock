import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";

const MenuOptions = () => {
  return (
    <Flex gap="gap-1" className="p-1 bg-card rounded-sm">
      <IconButton icon="bold" variant="ghost" size="xSmallIcon" />
      <IconButton icon="italic" variant="ghost" size="xSmallIcon" />
      <IconButton icon="strikethrough" variant="ghost" size="xSmallIcon" />
    </Flex>
  );
};

export default MenuOptions;
