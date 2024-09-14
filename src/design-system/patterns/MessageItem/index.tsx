import React, { ComponentProps, PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Avatar } from "@/design-system/ui/Avatar/Avatar";
import { Text } from "@/design-system/ui/Text/Text";
import { extractChildren } from "@/design-system/utils/utils";

type MessageItemProps = {
  align: "right" | "left";
} & PropsWithChildren;

const UserName = ({ ...props }: ComponentProps<typeof Text>) => {
  return <Text className="mb-1" variant="heading-1" {...props} />;
};

UserName.displayName = "UserName";

const Content = ({ children }: { children: string | string[] }) => {
  return (
    <div
      className="text-text-middle"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};
Content.displayName = "Content";

const MessageItem = Object.assign(
  ({ children, align }: MessageItemProps) => {
    const { userName, content, avatar } = extractChildren(children, {
      userName: UserName,
      content: Content,
      avatar: Avatar,
    });

    return (
      <Flex
        className="w-full hover:bg-zinc-200 p-2 rounded-md"
        justifyContent={align === "left" ? "justify-start" : "justify-end"}
      >
        <Flex
          className="max-w-[70%] order-2"
          gap="gap-2"
          direction={align === "left" ? "flex-row" : "flex-row-reverse"}
        >
          {avatar &&
            React.cloneElement(avatar, {
              ...avatar.props,
              className: "border border-accent-border bg-background",
            })}
          <Flex
            className="border border-accent-border rounded-md p-2 text-sm bg-background"
            direction="flex-col"
          >
            {userName}
            {content}
          </Flex>
        </Flex>
      </Flex>
    );
  },
  {
    displayName: "MessageItem",
    UserName,
    Content,
    Avatar,
  },
);

export default MessageItem;
