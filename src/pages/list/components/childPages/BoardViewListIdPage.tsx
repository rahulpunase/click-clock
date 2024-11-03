import { Flex } from "@/design-system/layout/Flex/Flex";

import BoardView from "@/pages/list/components/BoardView";
import Filters from "@/pages/list/components/Filters";

const BoardViewListIdPage = () => {
  return (
    <Flex direction="flex-col" data-page="default-list-page">
      <Filters />
      <Flex className="mt-2" flex="flex-1">
        <BoardView />
      </Flex>
    </Flex>
  );
};

export default BoardViewListIdPage;
