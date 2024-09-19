import MemberData from "@/pages/settings/members/MemberData";
import PageTopHeaderContent from "@/pages/settings/members/PageTopHeaderContent";
import RequestData from "@/pages/settings/members/RequestData";

import { Flex } from "@/design-system/layout/Flex/Flex";
import PageLook from "@/design-system/patterns/PageLook";
import { Tabs } from "@/design-system/ui/Tabs/Tabs";
import { Text } from "@/design-system/ui/Text/Text";

import { useGetMembers } from "@/common/hooks/db/organizations/queries/useGetMembers";
import { useGetSelectedOrganization } from "@/common/hooks/db/organizations/useGetSelectedOrganization";
import { useGetAllRequests } from "@/common/hooks/db/requests/queries/useGetAllRequests";

const MembersPage = () => {
  const selectedOrg = useGetSelectedOrganization();

  const { data: allRequests } = useGetAllRequests();
  const { data: members } = useGetMembers();

  const pendingRequests =
    allRequests?.filter(
      (reqData) => !(reqData.req.isApproved || reqData.req.isDenied),
    ) ?? 0;

  return (
    <PageLook>
      <PageLook.Header>
        <PageLook.Header.Heading>
          Members settings for {selectedOrg?.name ?? ""}
        </PageLook.Header.Heading>
      </PageLook.Header>
      <PageLook.Content>
        <PageLook.Content.Main>
          <Flex direction="flex-col" className="p-4" flex="flex-1">
            <Text variant="heading-2">Manage people</Text>
            <PageTopHeaderContent />
            <Flex className="mt-8" flex="flex-1">
              <Tabs defaultValue="members">
                <Tabs.List>
                  <Tabs.Trigger value="members">Members</Tabs.Trigger>
                  <Tabs.Trigger value="requests">
                    Requests {pendingRequests && `(${pendingRequests.length})`}
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="members">
                  <MemberData members={members} />
                </Tabs.Content>
                <Tabs.Content value="requests">
                  <RequestData getAllRequests={allRequests ?? []} />
                </Tabs.Content>
              </Tabs>
            </Flex>
          </Flex>
        </PageLook.Content.Main>
      </PageLook.Content>
    </PageLook>
  );
};

export default MembersPage;
