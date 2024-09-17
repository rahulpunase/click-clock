import React, { ComponentProps, PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Avatar } from "@/design-system/ui/Avatar/Avatar";
import { Text } from "@/design-system/ui/Text/Text";
import { Tooltip } from "@/design-system/ui/Tooltip/Tooltip";
import { cn, extractChildren } from "@/design-system/utils/utils";

import { formatTo } from "@/common/utils/date-utils";

import "./MessageItem.scss";

type MessageItemProps = {
  align: "right" | "left";
  selected?: boolean;
} & PropsWithChildren &
  ComponentProps<"div">;

const UserName = ({ ...props }: ComponentProps<typeof Text>) => {
  return <Text className="mb-1" variant="heading-1" {...props} />;
};

UserName.displayName = "UserName";

type TimeProps = {
  children: string;
};

const Time = ({ children }: TimeProps) => {
  const time = formatTo(Number(children), "hh:mm a");
  return (
    <Tooltip content={formatTo(Number(children), "MMM dd, hh:mm a")}>
      <Text className="mb-1" variant="subtext">
        {time}
      </Text>
    </Tooltip>
  );
};

UserName.displayName = "Time";

const Content = ({ children }: { children: string | string[] }) => {
  return (
    <div
      className="text-text-middle"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};
Content.displayName = "Content";

const Actions = ({ children }: PropsWithChildren) => {
  return <Flex gap="gap-1">{children}</Flex>;
};

Actions.displayName = "Actions";

const MessageItem = Object.assign(
  React.forwardRef<HTMLDivElement, MessageItemProps>(
    ({ children, selected, align, ...props }, ref) => {
      const { userName, content, avatar, actions, time } = extractChildren(
        children,
        {
          userName: UserName,
          content: Content,
          avatar: Avatar,
          actions: Actions,
          time: Time,
        },
      );

      return (
        <Flex
          className={cn(
            "w-full p-2 rounded-md relative group will-change-auto hover:bg-zinc-200",
            "MessageItem",
          )}
          justifyContent={align === "left" ? "justify-start" : "justify-end"}
          {...props}
          ref={ref}
        >
          <Flex
            className="max-w-[70%] order-2 relative"
            gap="gap-2"
            direction={align === "left" ? "flex-row" : "flex-row-reverse"}
          >
            {avatar &&
              React.cloneElement(avatar, {
                ...avatar.props,
                className: "border border-accent-border bg-background",
              })}
            <Flex
              className="border border-accent-border rounded-md p-2 text-sm bg-background relative"
              direction="flex-col"
            >
              <Flex gap="gap-2" alignItems="items-center">
                <div>{userName}</div>
                <div>{time}</div>
              </Flex>
              {content}
            </Flex>
          </Flex>
          {actions && (
            <Flex
              className={cn(
                "invisible absolute group-hover:visible border border-accent-border2 top-0 shadow-sm rounded-md bg-background z-10 p-1 translate-y-[-50%] hovering:visible",
                "action",
                align === "right" && "left-2",
                align === "left" && "right-2",
              )}
            >
              {actions}
            </Flex>
          )}
        </Flex>
      );
    },
  ),
  {
    displayName: "MessageItem",
    UserName,
    Content,
    Avatar,
    Actions,
    Time,
  },
);

export default MessageItem;
