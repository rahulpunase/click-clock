import PageLook from "@/design-system/patterns/PageLook";

const { Content, Header } = PageLook;

const SpaceIdPage = () => {
  console.log("space id");
  return (
    <PageLook>
      <Header icon="file">
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
