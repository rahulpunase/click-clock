import { Flex } from "@/design-system/layout/Flex/Flex";
import { Skeleton } from "@/design-system/ui/Skeleton/Skeleton";

const BoardViewLoading = () => {
  return (
    <Flex
      className="pl-4 min-w-0 animate-in fade-in max-h-full pb-2"
      gap="gap-4"
      flex="flex-1"
      direction="flex-row"
      data-component="BoardView"
    >
      <Flex className="max-h-full h-full" gap="gap-3">
        {[1, 2, 3, 4].map((ind) => {
          return (
            <Flex className="min-w-[280px] max-w-[280px] h-full" key={ind}>
              <Skeleton className="h-full w-full" />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default BoardViewLoading;
