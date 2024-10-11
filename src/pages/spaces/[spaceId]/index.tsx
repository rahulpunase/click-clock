import { File } from "lucide-react";

import PageLook from "@/design-system/patterns/PageLook";

const { Content, Header } = PageLook;

const SpaceIdPage = () => {
  return (
    <PageLook>
      <Header icon={File}>
        <Header.Heading>Space with SpaceId</Header.Heading>
      </Header>
      <Content>
        <Content.Main>
          {/* {document && (
        <BlockNoteEditor initialContent={document.content ?? ""} />
      )} */}
        </Content.Main>
      </Content>
    </PageLook>
  );
};

export default SpaceIdPage;
