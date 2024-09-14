import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import ChannelItem from "@/pages/inbox/Messages/SideDrawer/ChannelItem";
import { useToggle } from "react-use";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { ListItem } from "@/design-system/ui/List/List.Item";

import { useGetChannels } from "@/common/hooks/db/channels/queries/useGetChannels";

const ChannelList = () => {
  const [on, toggle] = useToggle(true);
  const { data: channels } = useGetChannels();

  const { createNewChannelModalStore } = useMessageContext();

  return (
    <Flex direction="flex-col" className="w-full">
      <Flex justifyContent="justify-between">
        <Button
          icon={on ? "chevron-down" : "chevron-right"}
          size="sm"
          variant="ghost"
          onClick={toggle}
          className="justify-start"
          block
        >
          Channels
        </Button>
        <IconButton
          onClick={createNewChannelModalStore.show}
          size="xSmallIcon"
          icon="plus"
        />
      </Flex>
      {on && (
        <Flex direction="flex-col">
          {channels.map((channel) => (
            <ChannelItem key={channel._id} channel={channel} />
          ))}
        </Flex>
      )}
      <ListItem icon="plus" variant="secondary">
        <ListItem.Label>Add Channels</ListItem.Label>
      </ListItem>
    </Flex>
  );
};

export default ChannelList;
