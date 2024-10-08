import { Flex } from "@/design-system/layout/Flex/Flex";
import PageLook from "@/design-system/patterns/PageLook";
import { Card } from "@/design-system/ui/Card/Card";
import { Text } from "@/design-system/ui/Text/Text";

import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";

const { Content, Header } = PageLook;

export function HomePage() {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <PageLook key="home">
      <Header icon="house">
        <Header.Heading>Home</Header.Heading>
      </Header>
      <Content>
        <Content.Main>
          <Flex>
            <Text variant="heading-3">Hello, {currentUser?.name ?? ""}</Text>
          </Flex>
          <Flex wrap="flex-wrap" className="gap-4 w-full" direction="flex-row">
            <Flex direction="flex-col" flex="flex-1" gap="gap-4">
              <Card>
                <Card.Header>
                  <Card.Header.Title>Agenda</Card.Header.Title>
                </Card.Header>
                <Card.Content className="min-h-[300px] max-h-[400px]">
                  Some data here
                </Card.Content>
              </Card>
              <Card>
                <Card.Header>
                  <Card.Header.Title>Agenda</Card.Header.Title>
                </Card.Header>
                <Card.Content className="min-h-[300px] max-h-[400px]">
                  Some data here
                </Card.Content>
              </Card>
            </Flex>
            <Flex flex="flex-1" gap="gap-2">
              <Card>
                <Card.Header>
                  <Card.Header.Title>Agenda</Card.Header.Title>
                </Card.Header>
                <Card.Content className="min-h-[300px] max-h-[400px]">
                  Some data here
                </Card.Content>
              </Card>
            </Flex>
          </Flex>
        </Content.Main>
      </Content>
    </PageLook>
  );
}

export default HomePage;
