import { Flex } from "@/design-system/layout/Flex/Flex";

import BoardView from "@/pages/list/components/BoardView";
import Filters from "@/pages/list/components/Filters";

const BoardViewListIdPage = () => {
  return (
    <Flex
      direction="flex-col"
      data-page="board-view-list-page"
      className="w-full"
      flex="flex-1"
    >
      <Filters />
      <Flex className="mt-2 overflow-x-auto">
        <BoardView />
      </Flex>
    </Flex>
  );
};

export default BoardViewListIdPage;
