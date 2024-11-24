import { File } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import PageLook from "@/design-system/patterns/PageLook";

import DefaultSpaceContent from "@/pages/spaces/components/DefaultSpaceContent";

const { Content, Header } = PageLook;

const SpaceIdPage = () => {
  return (
    <PageLook>
      <Header icon={File}>
        <Header.Heading>Space with SpaceId</Header.Heading>
      </Header>
      <Content>
        <Content.Main fitHeight={false}>
          <Flex className="w-full h-full mb-20" alignItems="items-center">
            <DefaultSpaceContent />
          </Flex>
        </Content.Main>
      </Content>
    </PageLook>
  );
};

export default SpaceIdPage;
