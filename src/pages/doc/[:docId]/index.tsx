import BlockNoteEditor from "@/pages/doc/BlockNoteEditor/BlockNoteEditor";
import { useParams } from "react-router-dom";

import PageLook from "@/design-system/patterns/PageLook";

import { useGetDocument } from "@/common/hooks/db/documents/queries/useGetDocument";

import { Id } from "@db/_generated/dataModel";

const { Content, Header } = PageLook;

const DocPage = () => {
  const params = useParams();

  const documentId = params.docId as Id<"documents">;

  const { data: document } = useGetDocument({
    documentId,
  });

  return (
    <PageLook>
      <Header icon="file">
        <Header.Heading>Create doc</Header.Heading>
      </Header>
      <Content>
        <Content.Main>
          {document && (
            <BlockNoteEditor
              key={documentId}
              initialContent={document.content ?? ""}
            />
          )}
        </Content.Main>
      </Content>
    </PageLook>
  );
};
export default DocPage;
