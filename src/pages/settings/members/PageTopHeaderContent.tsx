import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Input } from "@/design-system/ui/Input/input";

import { useGenerateInviteLink } from "@/common/hooks/db/organizations/mutations/useGenerateInviteLink";
import { useGetSelectedOrganization } from "@/common/hooks/db/organizations/useGetSelectedOrganization";
import { generateInviteUrl } from "@/common/utils/misc-utils";

const PageTopHeaderContent = () => {
  const [copied, setCopied] = useState(false);
  const selectedOrg = useGetSelectedOrganization();

  const { mutate: generateInviteLink } = useGenerateInviteLink();

  const onGenerateInviteLink = () => {
    generateInviteLink({});
  };

  const inviteLink = selectedOrg?.inviteLinkCipher
    ? generateInviteUrl(selectedOrg._id, selectedOrg.inviteLinkCipher)
    : "";

  const onLinkCopy = () => {
    window.navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <Flex className="mt-8" gap="gap-32">
      <Flex gap="gap-2" flex="flex-[4]">
        <Input readOnly disabled value={inviteLink} />
        <Flex className="gap-2">
          <Button
            variant="outline"
            icon={copied ? "CopyCheck" : "Copy"}
            disabled={!inviteLink}
            onClick={onLinkCopy}
          >
            {copied ? "Copied" : "Copy link"}
          </Button>
          <Button onClick={() => onGenerateInviteLink()} disabled={copied}>
            Generate invite link
          </Button>
        </Flex>
      </Flex>
      <Flex flex="flex-1">
        <Button variant="link" icon="FileUp">
          Export csv
        </Button>
        <Button variant="link">Learn more</Button>
      </Flex>
    </Flex>
  );
};

export default PageTopHeaderContent;
