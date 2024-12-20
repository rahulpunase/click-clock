import { Hash, Star } from "lucide-react";
import { useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import Icon from "@/design-system/ui/Icon/Icon";
import { Tabs } from "@/design-system/ui/Tabs/Tabs";
import { useToast } from "@/design-system/ui/Toast/useToast";
import { cn } from "@/design-system/utils/utils";

import ChannelDetails from "@/pages/inbox/Messages/modals/EditChannelDetailsModal/ChannelDetails";
import ChannelMembers from "@/pages/inbox/Messages/modals/EditChannelDetailsModal/ChannelMembers";
import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";

import { useUpdateChannel } from "@/common/hooks/db/channels/mutations/useUpdateChannel";

import { Id } from "@db/_generated/dataModel";

const EditChannelDetailsModal = () => {
  const { editChannelDetailsModalStore: store, channel } = useMessageContext();

  const toast = useToast();
  const { mutate: updateChannel } = useUpdateChannel({
    onSuccess: () => {
      toast.toast({
        title: "Channel updated successfully",
      });
    },
  });

  const params = useParams();

  const starChannel = () => {
    updateChannel({
      channelId: params.channelId as Id<"channels">,
      isFavorite: true,
    });
  };

  return (
    <Dialog open={store.open} onOpenChange={store.hide}>
      <Dialog.Content>
        <Dialog.Content.Header>
          <Dialog.Content.Header.Title>
            <Flex alignItems="items-center" gap="gap-1">
              <Icon IconName={Hash} />
              {channel?.name}
            </Flex>
          </Dialog.Content.Header.Title>
        </Dialog.Content.Header>
        <Dialog.Content.Main>
          <Flex>
            <IconButton
              size="s"
              variant="secondary"
              icon={Star}
              onClick={starChannel}
              iconClasses={cn(
                channel?.isFavorite && "fill-primary stroke-primary",
              )}
            />
          </Flex>
          <Tabs defaultValue="about">
            <Tabs.List defaultValue="about">
              <Tabs.Trigger value="about">About</Tabs.Trigger>
              <Tabs.Trigger value="members">Members</Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="about">
              <ChannelDetails />
            </Tabs.Content>
            <Tabs.Content value="members">
              <ChannelMembers />
            </Tabs.Content>
          </Tabs>
        </Dialog.Content.Main>
      </Dialog.Content>
    </Dialog>
  );
};

export default EditChannelDetailsModal;
