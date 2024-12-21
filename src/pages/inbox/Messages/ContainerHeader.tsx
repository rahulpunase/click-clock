import { Ellipsis, EllipsisVertical, Hash } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";
import Icon from "@/design-system/ui/Icon/Icon";
import { Skeleton } from "@/design-system/ui/Skeleton/Skeleton";
import { Text } from "@/design-system/ui/Text/Text";

import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";

const ContainerHeader = () => {
  const { channel, isChannelLoading, editChannelDetailsModalStore } =
    useMessageContext();
  return (
    <Flex
      className="h-[54px] border-b border-accent-border px-4"
      shrink="shrink-0"
      alignItems="items-center"
      justifyContent="justify-between"
    >
      <Flex gap="gap-1" alignItems="items-center">
        <Icon IconName={Hash} />
        {isChannelLoading && <Skeleton className="h-6 w-[160px]" />}
        <Text variant="heading-2">{channel?.name ?? ""}</Text>
      </Flex>
      <Flex>
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <IconButton
              tooltip="More actions"
              variant="ghost"
              size="s"
              icon={EllipsisVertical}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="left" align="start">
            <DropdownMenu.Label>More Actions</DropdownMenu.Label>
            <DropdownMenu.Item onClick={editChannelDetailsModalStore.show}>
              <DropdownMenu.Item.Label>
                Open channel details
              </DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <DropdownMenu.Item.Label>
                Edit notification details
              </DropdownMenu.Item.Label>
              <DropdownMenu.Item.SubText>
                Every new message is your notificationP
              </DropdownMenu.Item.SubText>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <DropdownMenu.Item.Label>Star channel</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item variant="destructive">
              <DropdownMenu.Item.Label>Leave channel</DropdownMenu.Item.Label>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </Flex>
    </Flex>
  );
};

export default ContainerHeader;
