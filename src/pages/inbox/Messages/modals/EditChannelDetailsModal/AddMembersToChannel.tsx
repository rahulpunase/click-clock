import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";

import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";

import { useAddMembersToChannel } from "@/common/hooks/db/channels/mutations/useAddMembersToChannel";
import { useGetMembersWhoCanJoinChannel } from "@/common/hooks/db/organizations/queries/useGetMembersWhoCanJoinChannel";

import { Id } from "@db/_generated/dataModel";

type AddMembersToChannelProps = {
  onSuccess: () => void;
};
const AddMembersToChannel = ({ onSuccess }: AddMembersToChannelProps) => {
  const { channel, channelId } = useMessageContext();
  const { data: membersWhoCanJoinChannel } = useGetMembersWhoCanJoinChannel({
    channelId: channelId as Id<"channels">,
  });
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const { mutate: addMembersToChannel } = useAddMembersToChannel({});

  return (
    <Flex direction="flex-col" gap="gap-2">
      <Flex className="mt-4">
        <MultiSelectCombo
          options={membersWhoCanJoinChannel?.map((member) => ({
            label: member.user?.name ?? "Unknown",
            value: member.userId ?? "",
          }))}
          onValueChange={() => {}}
        />
      </Flex>
      <Button
        disabled={!selectedMembers.length}
        onClick={() => {
          if (!channel?._id) {
            return;
          }
          addMembersToChannel(
            {
              channelId: channel?._id,
              users: selectedMembers as Id<"users">[],
            },
            {
              onSuccess: () => onSuccess(),
            },
          );
        }}
      >
        Add members
      </Button>
    </Flex>
  );
};

export default AddMembersToChannel;
