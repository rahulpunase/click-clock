import { Hash } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";

import { formatTo } from "@/common/utils/date-utils";

type ChannelCreationItemProps = {
  channelName: string;
  channelDate: number;
};

const ChannelCreationItem = ({
  channelName,
  channelDate,
}: ChannelCreationItemProps) => {
  return (
    <Flex
      className="py-4 border-b border-accent-border"
      direction="flex-col"
      gap="gap-2"
    >
      <Flex gap="gap-2" alignItems="items-center">
        <Icon IconName={Hash} /> <Text variant="heading-3">{channelName}</Text>
      </Flex>
      <Text variant="heading-2">This is the start of channel journey</Text>
      <Text>
        You created this channel on {formatTo(channelDate, "MMM dd, hh:mm a")}.
        Start using it to connect with the people.
      </Text>
    </Flex>
  );
};

export default ChannelCreationItem;
