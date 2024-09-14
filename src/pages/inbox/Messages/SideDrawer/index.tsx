import ChannelList from "@/pages/inbox/Messages/SideDrawer/ChannelList";
import DirectMessages from "@/pages/inbox/Messages/SideDrawer/DirectMessages";
import Header from "@/pages/inbox/Messages/SideDrawer/Header";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "@/design-system/ui/Text/Text";

const ChatItem = () => (
  <Flex
    as="li"
    className="border-b border-accent-border px-3 py-4"
    alignItems="items-center"
  >
    <Flex className="pr-2">
      <div className="size-10 border border-accent-border rounded-full"></div>
    </Flex>
    <Flex direction="flex-col">
      <Text variant="heading-1">Rahul Punase</Text>
      <Text variant="subtext">Some message by this user</Text>
    </Flex>
  </Flex>
);

const SideDrawer = () => {
  return (
    <Flex
      className="h-full w-[280px] border-r border-accent-border"
      direction="flex-col"
    >
      <Header />
      <Flex className="flex-1 px-2 py-4" direction="flex-col" gap="gap-2">
        <ChannelList />
        <DirectMessages />
      </Flex>
    </Flex>
  );
};

export default SideDrawer;
