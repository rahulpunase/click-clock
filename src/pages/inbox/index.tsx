import PageLook from "@/design-system/patterns/PageLook";

const { Header, Content } = PageLook;

const InboxPage = () => {
  return (
    <PageLook>
      <Header icon="message-circle">
        <Header.Heading>Inbox</Header.Heading>
      </Header>
      <Content>
        <Content.Main>Main inbox content</Content.Main>
      </Content>
    </PageLook>
  );
};

export default InboxPage;
