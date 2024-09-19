import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Card } from "@/design-system/ui/Card/Card";
import Icon from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";

import useAppAlertDialog from "@/common/hooks/alert/useAppAlertModal";
import { useRemoveMemberFromChannel } from "@/common/hooks/db/channels/mutations/useRemoveMemberFromChannel";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";

const ChannelDetails = () => {
  const { channel, editChannelDetailsModalStore } = useMessageContext();
  const { data: user } = useGetCurrentUser();
  const { mutate: removeMemberFromChannel } = useRemoveMemberFromChannel({
    onSuccess: () => {
      editChannelDetailsModalStore.hide();
    },
  });

  const [Alert, show, hide] = useAppAlertDialog({
    options: {
      title: "Membership is required in General channel.",
      description:
        "This channel helps you keep in connect with the organization members",
      actionButtonText: "okay",
      hideCancel: true,
    },
    onAction() {
      hide();
    },
  });

  const onTryingToLeave = () => {
    if (channel?.isGeneral) {
      return show();
    }
    if (!user?._id) {
      return;
    }
    removeMemberFromChannel({
      memberToRemoveId: user?._id,
      channelId: channel?._id,
    });
  };

  return (
    <>
      <Flex className="pt-2" gap="gap-3" direction="flex-col">
        <Card>
          <Card.Content>
            <Flex alignItems="items-center" justifyContent="justify-between">
              <Flex direction="flex-col">
                <Text variant="heading-1">Channel name</Text>
                <Flex gap="gap-1" alignItems="items-center">
                  <Icon name="hash" className="size-4" />
                  <Text>{channel?.name ?? ""}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Button variant="ghost">Edit</Button>
              </Flex>
            </Flex>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Flex direction="flex-col" gap="gap-2">
              <Flex
                alignItems="items-center"
                justifyContent="justify-between"
                className="border-b border-accent-border pb-3"
              >
                <Flex direction="flex-col">
                  <Text variant="heading-1">Description</Text>
                  <Flex gap="gap-1" alignItems="items-center">
                    <Text variant="body-1">Add a description</Text>
                  </Flex>
                </Flex>
                <Flex>
                  <Button variant="ghost">Edit</Button>
                </Flex>
              </Flex>

              {/* <Flex
              alignItems="items-center"
              justifyContent="justify-between"
              className="border-b border-accent-border pb-3"
            >
              <Flex direction="flex-col">
                <Text variant="heading-1">Channel name</Text>
                <Flex gap="gap-1" alignItems="items-center">
                  <Icon name="hash" className="size-4" />
                  <Text>{channel?.name ?? ""}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Button variant="ghost">Edit</Button>
              </Flex>
            </Flex> */}

              <Flex
                alignItems="items-center"
                justifyContent="justify-between"
                className="border-b border-accent-border pb-3"
              >
                <Flex direction="flex-col">
                  <Text variant="heading-1">Created by</Text>
                  <Flex gap="gap-1" alignItems="items-center">
                    <Icon name="user" className="size-4" />
                    <Text>{channel?.createdByUser?.name ?? ""}</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Button variant="destructive" onClick={onTryingToLeave}>
                  Leave channel
                  {channel?.isCurrentUserAdmin && "- you are admin"}
                </Button>
              </Flex>
            </Flex>
          </Card.Content>
        </Card>
      </Flex>
      {Alert}
    </>
  );
};

export default ChannelDetails;
