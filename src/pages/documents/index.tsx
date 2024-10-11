import { FileText } from "lucide-react";

import PageLook from "@/design-system/patterns/PageLook";

import DocumentCollections from "@/pages/documents/documentCollections";
import DocumentsDisplayDashboard from "@/pages/documents/documentsDisplayDashboard";

const { Content, Header } = PageLook;

const Documents = () => {
  return (
    <PageLook>
      <Header icon={FileText}>
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
