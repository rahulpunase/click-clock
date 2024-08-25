import PageLook from "@/common/patterns/PageLook";
const { Header, Content } = PageLook;

const InboxPage = () => {
  return (
    <PageLook>
      <Header icon="MessageCircle">
        <Header.Heading>Inbox</Header.Heading>
      </Header>
      <Content>
        <Content.Main>Main inbox content</Content.Main>
      </Content>
    </PageLook>
  );
};

export default InboxPage;
