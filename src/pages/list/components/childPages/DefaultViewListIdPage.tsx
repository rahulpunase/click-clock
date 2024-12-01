import { Flex } from "@/design-system/layout/Flex/Flex";

import SpaceIsDeletedAlert from "@/pages/list/components/alerts/SpaceIsDeletedAlert";
import Filters from "@/pages/list/components/Filters";
import TableView from "@/pages/list/components/TableView";

const DefaultListIdPage = () => {
  return (
    <Flex
      direction="flex-col"
      data-page="default-list-page"
      className="w-full min-h-0"
    >
      <SpaceIsDeletedAlert />
      <Filters />
      <Flex className="mt-2 overflow-auto" flex="flex-1">
        <TableView />
      </Flex>
    </Flex>
  );
};

export default DefaultListIdPage;
