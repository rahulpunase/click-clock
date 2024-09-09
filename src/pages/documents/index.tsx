import DocumentCollections from "@/pages/documents/documentCollections";
import DocumentsDisplayDashboard from "@/pages/documents/documentsDisplayDashboard";

import PageLook from "@/design-system/patterns/PageLook";

const { Content, Header } = PageLook;

const Documents = () => {
  return (
    <PageLook>
      <Header icon="file-text">
        <Header.Heading>Documents</Header.Heading>
      </Header>
      <Content>
        <Content.Main>
          <DocumentsDisplayDashboard />
          <DocumentCollections />
        </Content.Main>
      </Content>
    </PageLook>
  );
};

export default Documents;
