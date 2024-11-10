import { Flex } from "@/design-system/layout/Flex/Flex";

import BoardView from "@/pages/list/components/BoardView";
import Filters from "@/pages/list/components/Filters";

const BoardViewListIdPage = () => {
  return (
    <Flex
      direction="flex-col"
      data-page="board-view-list-page"
      className="w-full min-h-0"
      flex="flex-1"
    >
      <Filters />
      <Flex className="pt-2 flex-1 overflow-x-auto overflow-y-hidden max-h-full min-h-0">
        <BoardView />
      </Flex>
    </Flex>
  );
};

export default BoardViewListIdPage;
