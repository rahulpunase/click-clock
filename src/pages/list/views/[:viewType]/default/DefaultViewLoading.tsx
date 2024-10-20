import { Flex } from "@/design-system/layout/Flex/Flex";
import { Skeleton } from "@/design-system/ui/Skeleton/Skeleton";

const DefaultViewLoading = () => {
  return (
    <Flex direction="flex-col" className="px-2 py-3 w-full" gap="gap-4">
      <Flex gap="gap-2">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </Flex>
      <Flex>
        <Skeleton className="h-6 w-64 rounded-full" />
      </Flex>
      <Flex className="pl-8 w-full" gap="gap-2">
        <Skeleton className="h-6 w-[500px]" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
      </Flex>
      <Flex className="pl-8 w-full" gap="gap-2">
        <Skeleton className="h-6 w-[500px]" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
      </Flex>
      <Flex className="pl-8 w-full" gap="gap-2">
        <Skeleton className="h-6 w-[500px]" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
      </Flex>
      <Flex className="pt-8">
        <Skeleton className="h-6 w-64 rounded-full" />
      </Flex>
      <Flex className="pl-8 w-full" gap="gap-2">
        <Skeleton className="h-6 w-[500px]" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
      </Flex>
      <Flex className="pl-8 w-full" gap="gap-2">
        <Skeleton className="h-6 w-[500px]" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
      </Flex>
      <Flex className="pl-8 w-full" gap="gap-2">
        <Skeleton className="h-6 w-[500px]" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
      </Flex>
    </Flex>
  );
};

export default DefaultViewLoading;
