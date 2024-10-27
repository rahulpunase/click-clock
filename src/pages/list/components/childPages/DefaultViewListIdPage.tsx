import { Flex } from "@/design-system/layout/Flex/Flex";

import Filters from "@/pages/list/components/Filters";
import TableView from "@/pages/list/components/TableView";

const DefaultListIdPage = () => {
  return (
    <Flex direction="flex-col" data-page="default-list-page" className="w-full">
      <Filters />
      <Flex className="mt-2" flex="flex-1">
        <TableView />
      </Flex>
    </Flex>
  );
};

export default DefaultListIdPage;
