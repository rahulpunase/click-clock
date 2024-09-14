import { useRef } from "react";

import MessageItem from "@/design-system/patterns/MessageItem";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";

import type { useGetAllMessages } from "@/common/hooks/db/messages/queries/useGetAllMessages";
import { formatTo } from "@/common/utils/date-utils";

type CurrentUserMessageType = {
  message: ReturnType<typeof useGetAllMessages>["data"][number];
};

const CurrentUserMessage = ({ message }: CurrentUserMessageType) => {
  const ref = useRef<HTMLDivElement>(null);

  const onOpenChange = (bool: boolean) => {
    if (bool) {
      ref.current?.classList.add("bg-zinc-200");
      ref.current?.classList.add("hovering");
    } else {
      ref.current?.classList.remove("bg-zinc-200");
      ref.current?.classList.remove("hovering");
    }
  };

  return (
    <>
      <MessageItem align="left" ref={ref}>
        <MessageItem.UserName>{message.user?.name ?? ""}</MessageItem.UserName>
        <MessageItem.Content>{message.content}</MessageItem.Content>
        <MessageItem.Time>
          {formatTo(message._creationTime, "h:mm a")}
        </MessageItem.Time>
        <MessageItem.Avatar>
          <MessageItem.Avatar.AvatarFallback>
            {message.user?.name?.[0]}
          </MessageItem.Avatar.AvatarFallback>
        </MessageItem.Avatar>
        <MessageItem.Actions>
          <Button icon="smile-plus" size="sm" variant="ghost">
            React
          </Button>
          <IconButton size="smallIcon" variant="ghost" icon="copy" />
          <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenu.Trigger asChild>
              <IconButton size="smallIcon" variant="ghost" icon="ellipsis" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content side="left">
                <DropdownMenu.Item>
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
                <DropdownMenu.Item variant="destructive">
                  <DropdownMenu.Item.Label>
                    Delete message
                  </DropdownMenu.Item.Label>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu>
        </MessageItem.Actions>
      </MessageItem>
    </>
  );
};

export default CurrentUserMessage;
