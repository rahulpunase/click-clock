import { File } from "lucide-react";
import { useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import PageLook from "@/design-system/patterns/PageLook";
import { Skeleton } from "@/design-system/ui/Skeleton/Skeleton";

import DefaultSpaceContent from "@/pages/spaces/components/DefaultSpaceContent";

import { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";

const { Content, Header } = PageLook;

const SpaceIdPage = () => {
  const { spaceId } = useParams();

  const { data: spaces } = useGetSpaces();

  const selectedSpace = spaces.find((item) => item._id === spaceId);

  return (
    <PageLook>
      <Header icon={File}>
        <Header.Heading variant="heading-1">
          {selectedSpace?.name ?? ""}
        </Header.Heading>
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
