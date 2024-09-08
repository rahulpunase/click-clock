import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import debounce from "lodash-es/debounce";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";

import { useUpdateDocument } from "@/common/hooks/db/documents/mutations/useUpdateDocument";

import { Id } from "@db/_generated/dataModel";

const BlockNoteEditor = ({ initialContent }: { initialContent?: string }) => {
  const params = useParams();

  const { mutate: updateDocument } = useUpdateDocument({});

  const onSave = () => {
    updateDocument({
      documentId: params.docId as Id<"documents">,
      content: JSON.stringify(editor.document),
    });
  };

  const debouncedSave = useCallback(debounce(onSave, 1000), []);

  const editor = useCreateBlockNote({
    initialContent: initialContent && JSON.parse(initialContent),
  });

  if (!params.docId) {
    return null;
  }

  if (!document) {
    return null;
  }

  return (
    <Flex className="w-full pl-20 pt-14 mb-20">
      <BlockNoteView
        className="w-full"
        editor={editor}
        theme="light"
        spellCheck="true"
        onChange={debouncedSave}
      />
    </Flex>
  );
};

export default BlockNoteEditor;
