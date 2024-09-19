import AddNewChannelMemberModal from "@/pages/inbox/Messages/modals/AddNewChannelMemberModal";
import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import {
  isAdmin,
  isGeneralChannel,
  isMemberLoggedInUser,
} from "@/pages/inbox/utils";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";
import { Input } from "@/design-system/ui/Input/input";
import { List } from "@/design-system/ui/List/List";
import { ListItem } from "@/design-system/ui/List/List.Item";
import { Text } from "@/design-system/ui/Text/Text";

import { useRemoveMemberFromChannel } from "@/common/hooks/db/channels/mutations/useRemoveMemberFromChannel";
import { useGetAllChannelMembers } from "@/common/hooks/db/channels/queries/useGetAllChannelMembers";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";

import { Id } from "@db/_generated/dataModel";

const ChannelMembers = () => {
  const { data: user } = useGetCurrentUser();
  const { channelId, channel } = useMessageContext();
  const addNewChannelMemberModal = useDialogStore();

  const { data: channelMembers } = useGetAllChannelMembers({
    channelId: channelId as Id<"channels">,
  });

  const { mutate: removeMemberFromChannel } = useRemoveMemberFromChannel({});

  return (
    <>
      <Flex direction="flex-col" gap="gap-4">
        <Input placeholder="Search members" />
        <Button
          icon="user-pen"
          variant="ghost"
          onClick={addNewChannelMemberModal.show}
        >
          Add people
        </Button>
        <Flex direction="flex-col">
          <Text variant="heading-1">In this channel</Text>
          {channelMembers.map((member) => (
            <List>
              <ListItem variant="nav" key={member._id}>
                <ListItem.Label>{member.user?.name}</ListItem.Label>
                {member.role === "admin" && (
                  <ListItem.Badge variant="secondary">Admin</ListItem.Badge>
                )}
                {!isAdmin(member) &&
                  isMemberLoggedInUser(member, user?._id) &&
                  !channel?.isGeneral && (
                    <ListItem.Dropdown>
                      <ListItem.Dropdown.Content>
                        <ListItem.Dropdown.Item
                          variant="destructive"
                          onClick={() =>
                            removeMemberFromChannel({
                              memberToRemoveId: member.user._id,
                              channelId: channelId,
                            })
                          }
                        >
                          <ListItem.Dropdown.Item.Label>
                            Remove from the channel
                          </ListItem.Dropdown.Item.Label>
                        </ListItem.Dropdown.Item>
                      </ListItem.Dropdown.Content>
                    </ListItem.Dropdown>
                  )}
              </ListItem>
            </List>
          ))}
        </Flex>
      </Flex>
      {addNewChannelMemberModal.open && (
        <AddNewChannelMemberModal store={addNewChannelMemberModal} />
      )}
    </>
  );
};

export default ChannelMembers;
