import React from "react";
import { Flex } from "@/design-system/layout/Flex/Flex";
import ListItem from "./List.Item";

const List = ({ children }) => {
  return (
    <Flex direction="flex-col" gap="gap-1" className="w-full">
      {children}
    </Flex>
  );
};

List.displayName = "List";
List.Item = ListItem;

export { List, ListItem };
