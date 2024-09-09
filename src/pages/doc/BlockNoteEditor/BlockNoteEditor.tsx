import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import debounce from "lodash-es/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { useToast } from "@/design-system/ui/Toast/useToast";

import { useUpdateDocument } from "@/common/hooks/db/documents/mutations/useUpdateDocument";

import { Id } from "@db/_generated/dataModel";

const BlockNoteEditor = ({
  initialContent,
  name,
}: {
  initialContent?: string;
  name?: string;
}) => {
  const params = useParams();

  const { mutate: updateDocument } = useUpdateDocument({});

  const nameInputRef = useRef<HTMLTextAreaElement>(null);

  const toast = useToast();

  const onSave = () => {
    updateDocument(
      {
        documentId: params.docId as Id<"documents">,
        content: JSON.stringify(editor.document),
        name: nameInputRef.current?.value ?? "",
      },
      {
        onSuccess: () => {
          toast.toast({
            title: "Details saved",
          });
        },
      },
    );
  };

  const debouncedSave = useCallback(debounce(onSave, 1000), []);

  const editor = useCreateBlockNote({
    initialContent: initialContent && JSON.parse(initialContent),
    defaultStyles: false,
  });

  if (!params.docId) {
    return null;
  }

  if (!document) {
    return null;
  }

  const css = `
   [data-level="1"] {
        --level: 2em;
      }
`;

  return (
    <Flex className="w-full pl-20 pt-14 mb-20" direction="flex-col">
      <Flex className="ml-12 mb-4">
        <textarea
          className="outline-none text-5xl w-full resize-none h-[60px] text-text-middle font-medium"
          placeholder="Untitled"
          onChange={debouncedSave}
          defaultValue={name}
          ref={nameInputRef}
        />
      </Flex>
      <>
        <style>{css}</style>
        <BlockNoteView
          className="w-full"
          editor={editor}
          theme="light"
          spellCheck="true"
          onChange={debouncedSave}
        />
      </>
    </Flex>
  );
};

export default BlockNoteEditor;
