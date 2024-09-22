import { Hash, Lock } from "lucide-react";
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
      icon={Hash}
      render={(props) => <Link to={`/inbox/c/${channel._id}`} {...props} />}
      isSelected={pathname === `/inbox/c/${channel._id}`}
      className="animate-in fade-in-0"
    >
      <ListItem.Label>{channel.name}</ListItem.Label>
      {channel.isPrivate && <ListItem.SmallIcon icon={Lock} />}
    </ListItem>
  );
};

export default ChannelItem;
