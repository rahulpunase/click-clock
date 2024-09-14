import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon from "@/design-system/ui/Icon/Icon";
import { Skeleton } from "@/design-system/ui/Skeleton/Skeleton";
import { Text } from "@/design-system/ui/Text/Text";

const ContainerHeader = () => {
  const { channel, isChannelLoading } = useMessageContext();
  return (
    <Flex
      className="h-[54px] border-b border-accent-border px-4"
      shrink="shrink-0"
      alignItems="items-center"
    >
      <Flex gap="gap-1" alignItems="items-center">
        <Icon name="hash" />
        {isChannelLoading && <Skeleton className="h-6 w-[160px]" />}
        <Text variant="heading-2">{channel?.name ?? ""}</Text>
      </Flex>
    </Flex>
  );
};

export default ContainerHeader;
