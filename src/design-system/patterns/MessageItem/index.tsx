import React, { ComponentProps, PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Avatar as AvatarComp } from "@/design-system/ui/Avatar/Avatar";
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
  return <Text variant="heading-1" {...props} />;
};

UserName.displayName = "UserName";

type TimeProps = {
  children: string;
  className?: string;
};

const Time = ({ children, ...props }: TimeProps) => {
  const time = formatTo(Number(children), "hh:mm a");

  return (
    <Tooltip content={formatTo(Number(children), "MMM dd, hh:mm a")}>
      <Text
        variant="subtext"
        className={cn("invisible group-hover:visible", props?.className)}
        {...props}
      >
        ﹒{time}
      </Text>
    </Tooltip>
  );
};

Time.displayName = "Time";

const Actions = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      gap="gap-1"
      className="absolute p-[2px] right-2 invisible translate-y-[-50%] group-hover:visible border border-accent-border rounded-sm bg-background-body"
    >
      {children}
    </Flex>
  );
};

Actions.displayName = "Actions";

const Item = Object.assign(
  ({
    id,
    content,
    children,
  }: PropsWithChildren & {
    id: string;
    content: string;
  }) => {
    const { actions, time } = extractChildren(children, {
      actions: Actions,
      time: Time,
    });
    return (
      <Flex
        id={id}
        className="hover:bg-background-card p-2 px-2 group rounded-sm relative"
      >
        <Flex alignItems="items-center">
          <Flex flex="flex-1" dangerouslySetInnerHTML={{ __html: content }} />
          {time}
        </Flex>
        {actions}
      </Flex>
    );
  },
  {
    Actions,
    Time,
    displayName: "Item",
  },
);

const Content = Object.assign(
  ({ children }: { children: React.ReactNode }) => {
    return <div className="message-collections">{children}</div>;
  },
  {
    Item,
    displayName: "Content",
  },
);

const Status = ({ children }: PropsWithChildren) => {
  return <div className="absolute top-[-4px] right-0">{children}</div>;
};

Status.displayName = "Status";

const Avatar = Object.assign(
  ({
    children,
    image,
    fallback,
  }: PropsWithChildren & { image?: string; fallback: string }) => {
    const { status } = extractChildren(children, {
      status: Status,
    });
    return (
      <Flex className="relative">
        <AvatarComp className=" border border-accent-border bg-background">
          <AvatarComp.AvatarFallback>{fallback}</AvatarComp.AvatarFallback>
          <AvatarComp.AvatarImage src={image} />
        </AvatarComp>
        {status}
      </Flex>
    );
  },
  {
    displayName: "Avatar",
    Status,
  },
);

const MessageItem = Object.assign(
  React.forwardRef<HTMLDivElement, MessageItemProps>(
    ({ children, align, ...props }, ref) => {
      const { userName, content, avatar, actions, time } = extractChildren(
        children,
        {
          userName: UserName,
          content: Content,
          avatar: Avatar,
          actions: Actions,
          time: Time,
          status: Status,
        },
      );
      return (
        <Flex
          className={cn(
            "w-full rounded-md py-2 relative will-change-auto",
            "MessageItem",
          )}
          justifyContent={align === "left" ? "justify-start" : "justify-end"}
          {...props}
          ref={ref}
        >
          <Flex
            flex="flex-1"
            className="order-2 relative"
            gap="gap-2"
            direction={align === "left" ? "flex-row" : "flex-row-reverse"}
          >
            {avatar}
            <Flex
              className="rounded-md text-sm relative w-full"
              direction="flex-col"
            >
              <Flex gap="gap-2" alignItems="items-center">
                <Flex alignItems="items-center">
                  {userName}
                  {time &&
                    React.cloneElement(time, {
                      ...time.props,
                      className: "visible",
                    })}
                </Flex>
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
    Status,
    Time,
  },
);

export default MessageItem;
