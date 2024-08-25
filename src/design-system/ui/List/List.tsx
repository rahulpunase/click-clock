import { Flex } from "@/design-system/layout/Flex/Flex";

const List = ({ children }) => {
  return (
    <Flex
      as="ul"
      direction="flex-col"
      gap="gap-1"
      className="w-full"
      aria-label="list"
    >
      {children}
    </Flex>
  );
};

List.displayName = "List";

export { List };
