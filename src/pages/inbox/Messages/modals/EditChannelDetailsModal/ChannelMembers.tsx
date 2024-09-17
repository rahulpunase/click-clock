import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";

import { useAddMembersToChannel } from "@/common/hooks/db/channels/mutations/useAddMembersToChannel";
import { useGetMembers } from "@/common/hooks/db/user/queries/useGetMembers";

import { Id } from "@db/_generated/dataModel";

const ChannelMembers = () => {
  const { channel } = useMessageContext();
  const { data: orgMembers } = useGetMembers();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const { mutate: addMembersToChannel } = useAddMembersToChannel({});

  return (
    <Flex direction="flex-col" gap="gap-2">
      <Flex className="mt-4">
        <MultiSelectCombo
          data={orgMembers?.map((member) => ({
            label: member.user?.name ?? "",
            value: member.user?._id ?? "",
          }))}
          selected={selectedMembers}
          setSelected={setSelectedMembers}
          label="Add members"
        />
      </Flex>
      <Button
        disabled={!selectedMembers.length}
        onClick={() => {
          if (!channel?._id) {
            return;
          }
          addMembersToChannel({
            channelId: channel?._id,
            members: selectedMembers as Id<"users">[],
          });
        }}
      >
        Add members
      </Button>
    </Flex>
  );
};

export default ChannelMembers;
