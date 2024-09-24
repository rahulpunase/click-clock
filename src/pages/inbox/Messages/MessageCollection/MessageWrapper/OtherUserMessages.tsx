import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import type { groupMessagesAsPerUserInOrder } from "@/pages/inbox/utils";
import { Copy, CopyCheck, Ellipsis, SmilePlus } from "lucide-react";
import { useState } from "react";

import MessageItem from "@/design-system/patterns/MessageItem";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";

import UserOnlineStatus from "@/common/hooks/onlinePresence/UserOnlineStatus";
import { getUrlPrefix } from "@/common/utils/misc-utils";

type OtherUserMessagesProps = {
  messageItems: ReturnType<typeof groupMessagesAsPerUserInOrder>[""]["items"];
  user: ReturnType<typeof groupMessagesAsPerUserInOrder>[""]["user"];
};

const OtherUserMessages = ({ user, messageItems }: OtherUserMessagesProps) => {
  const { channelId } = useMessageContext();
  const [copied, setCopied] = useState(false);

  const copyLink = (messageId: string) => {
    setCopied(true);
    navigator.clipboard.writeText(
      getUrlPrefix(`/archive/${channelId}/${messageId}`),
    );
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <MessageItem align="left">
      <MessageItem.UserName>{user?.name ?? ""}</MessageItem.UserName>
      <MessageItem.Content>
        {messageItems.map((messageItem) => (
          <MessageItem.Content.Item
            id={`${channelId}/${messageItem._id}`}
            key={`${channelId}/${messageItem._id}`}
            content={messageItem.content}
          >
            <MessageItem.Content.Item.Time>
              {messageItem._creationTime.toString()}
            </MessageItem.Content.Item.Time>
            <MessageItem.Content.Item.Actions>
              <Button icon={SmilePlus} size="sm" variant="ghost">
                React
              </Button>
              <IconButton
                size="smallIcon"
                variant="ghost"
                icon={copied ? CopyCheck : Copy}
                onClick={() => copyLink(messageItem._id)}
                tooltip={copied ? "Copied" : "Copy link"}
              />
              <DropdownMenu onOpenChange={() => {}}>
                <DropdownMenu.Trigger asChild>
                  <IconButton
                    size="smallIcon"
                    variant="ghost"
                    icon={Ellipsis}
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content side="left">
                    <DropdownMenu.Item>
                      <DropdownMenu.Item.Label>
                        Forward message
                      </DropdownMenu.Item.Label>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>
                      <DropdownMenu.Item.Label>
                        Pin to channel
                      </DropdownMenu.Item.Label>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <DropdownMenu.Item.Label>
                        Remind me about this
                      </DropdownMenu.Item.Label>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu>
            </MessageItem.Content.Item.Actions>
          </MessageItem.Content.Item>
        ))}
      </MessageItem.Content>
      <MessageItem.Time>
        {messageItems[0]._creationTime.toString()}
      </MessageItem.Time>
      <MessageItem.Avatar fallback={user?.name?.[0] ?? "M"}>
        <MessageItem.Avatar.Status>
          <UserOnlineStatus userId={user?._id ?? ""} />
        </MessageItem.Avatar.Status>
      </MessageItem.Avatar>
    </MessageItem>
  );
};

export default OtherUserMessages;
