import MessagesContainer from "@/pages/inbox/Messages/MessagesContainer";

import PageLook from "@/design-system/patterns/PageLook";

const { Header, Content } = PageLook;

const InboxPage = () => {
  return (
    <PageLook>
      <Header icon="message-circle">
        <Header.Heading>Inbox</Header.Heading>
      </Header>
      <Content>
        <Content.Main noPadding fitHeight={false} verticalOverflow="off">
          <MessagesContainer />
        </Content.Main>
      </Content>
    </PageLook>
  );
};

export default InboxPage;
