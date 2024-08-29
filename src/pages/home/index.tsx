import { Flex } from "@/design-system/layout/Flex/Flex";
import PageLook from "@/design-system/patterns/PageLook";
import { Card } from "@/design-system/ui/Card/Card";
import { Text } from "@/design-system/ui/Text/Text";

const { Content, Header } = PageLook;

const Homepage = () => {
  return (
    <PageLook>
      <Header icon="House">
        <Header.Heading>Home</Header.Heading>
      </Header>
      <Content>
        <Content.Main>
          <Flex direction="flex-col" className="p-6" gap="gap-4">
            <Flex>
              <Text variant="heading-3">Hello, Rahul</Text>
            </Flex>
            <Flex
              wrap="flex-wrap"
              className="gap-4 w-full"
              direction="flex-row"
            >
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
          </Flex>
        </Content.Main>
      </Content>
    </PageLook>
  );
};

export default Homepage;
