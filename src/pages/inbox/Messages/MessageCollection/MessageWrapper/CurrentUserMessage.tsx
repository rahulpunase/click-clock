import ChatInputBox from "@/pages/inbox/Messages/ChatInputBox";
import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import { prepareMessageToRender } from "@/pages/inbox/utils";
import { Copy, CopyCheck, Ellipsis, SmilePlus } from "lucide-react";
import { useRef, useState } from "react";

import MessageItem from "@/design-system/patterns/MessageItem";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";

import { useDeleteMessage } from "@/common/hooks/db/messages/mutations/useDeleteMessage";
import UserOnlineStatus from "@/common/hooks/onlinePresence/UserOnlineStatus";
import { getUrlPrefix } from "@/common/utils/misc-utils";

type CurrentUserMessageProps = {
  messageItems: ReturnType<typeof prepareMessageToRender>[""][number]["items"];
  user: ReturnType<typeof prepareMessageToRender>[""][number]["user"];
};

const CurrentUserMessage = ({
  user,
  messageItems,
}: CurrentUserMessageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { channelId } = useMessageContext();
  const [copied, setCopied] = useState(false);

  const { mutate: deleteMessage } = useDeleteMessage({});

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
    <MessageItem align="left" ref={ref}>
      <MessageItem.UserName>{user?.name ?? ""}</MessageItem.UserName>
      <MessageItem.Time>
        {messageItems[0]._creationTime.toString()}
      </MessageItem.Time>
      <MessageItem.Content>
        {messageItems.map((messageItem) => (
          <MessageItem.Content.Item
            id={`${channelId}/${messageItem._id}`}
            key={`${channelId}/${messageItem._id}`}
            content={messageItem.content}
          >
            {({ setIsEditing }) => (
              <>
                <MessageItem.Content.Item.EditingContent>
                  <ChatInputBox
                    isEditingMode
                    content={messageItem.content}
                    onCancel={() => setIsEditing(false)}
                    messageId={messageItem._id}
                  />
                </MessageItem.Content.Item.EditingContent>
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
                  <DropdownMenu>
                    <DropdownMenu.Trigger asChild>
                      <IconButton
                        size="smallIcon"
                        variant="ghost"
                        icon={Ellipsis}
                      />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content side="left">
                        <DropdownMenu.Item onClick={() => setIsEditing(true)}>
                          <DropdownMenu.Item.Label>
                            Edit message
                          </DropdownMenu.Item.Label>
                        </DropdownMenu.Item>
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
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                          variant="destructive"
                          onClick={() =>
                            deleteMessage({
                              messageId: messageItem._id,
                            })
                          }
                        >
                          <DropdownMenu.Item.Label>
                            Delete message
                          </DropdownMenu.Item.Label>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu>
                </MessageItem.Content.Item.Actions>
              </>
            )}
          </MessageItem.Content.Item>
        ))}
      </MessageItem.Content>
      <MessageItem.Avatar fallback={user?.name?.[0] ?? "M"}>
        <MessageItem.Avatar.Status>
          <UserOnlineStatus userId={user?._id ?? ""} />
        </MessageItem.Avatar.Status>
      </MessageItem.Avatar>
    </MessageItem>
  );
};

export default CurrentUserMessage;
