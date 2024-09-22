import { MessagesProvider } from "@/pages/inbox/Messages/provider/MessagesProvider";
import { MessageCircle } from "lucide-react";
import { Outlet } from "react-router-dom";

import PageLook from "@/design-system/patterns/PageLook";

const { Header, Content } = PageLook;

const InboxPage = () => {
  return (
    <MessagesProvider>
      <PageLook>
        <Header icon={MessageCircle}>
          <Header.Heading>Inbox</Header.Heading>
        </Header>
        <Content>
          <Content.Main noPadding fitHeight={false} verticalOverflow="off">
            <Outlet />
          </Content.Main>
        </Content>
      </PageLook>
    </MessagesProvider>
  );
};

export default InboxPage;
