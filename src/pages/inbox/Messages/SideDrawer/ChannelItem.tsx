import { Link, useLocation } from "react-router-dom";

import { ListItem } from "@/design-system/ui/List/List.Item";

import { useGetChannels } from "@/common/hooks/db/channels/queries/useGetChannels";

type ChannelItemProps = {
  channel: ReturnType<typeof useGetChannels>["data"][number];
};

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const { pathname } = useLocation();
  return (
    <ListItem
      variant="nav"
      icon="hash"
      render={(props) => <Link to={`/inbox/c/${channel._id}`} {...props} />}
      isSelected={pathname === `/inbox/c/${channel._id}`}
    >
      <ListItem.Label>{channel.name}</ListItem.Label>
    </ListItem>
  );
};

export default ChannelItem;
