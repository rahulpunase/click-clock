import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useToggle } from "react-use";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { ListItem } from "@/design-system/ui/List/List.Item";

import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import ChannelItem from "@/pages/inbox/Messages/SideDrawer/ChannelItem";

const ChannelList = () => {
  const [on, toggle] = useToggle(true);

  const { createNewChannelModalStore, channels } = useMessageContext();

  return (
    <Flex direction="flex-col" className="w-full">
      <Flex justifyContent="justify-between">
        <Button
          icon={on ? ChevronDown : ChevronRight}
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
          size="xs"
          icon={Plus}
          tooltip="Add channel"
        />
      </Flex>
      {on && (
        <Flex direction="flex-col">
          {channels.map((channel) => (
            <ChannelItem key={channel._id} channel={channel} />
          ))}
        </Flex>
      )}
      <ListItem icon={Plus} variant="secondary">
        <ListItem.Label>Add Channels</ListItem.Label>
      </ListItem>
    </Flex>
  );
};

export default ChannelList;
