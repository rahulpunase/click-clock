import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { isEmpty } from "lodash-es";
import { Check, Send, X } from "lucide-react";
import { useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { cn } from "@/design-system/utils/utils";

import MenuOptions from "@/pages/inbox/Messages/ChatInputBox/MenuOptions";

import { useCreateMessage } from "@/common/hooks/db/messages/mutations/useCreateMessage";
import { useEditMessage } from "@/common/hooks/db/messages/mutations/useEditMessage";

import { Id } from "@db/_generated/dataModel";

import "./ChatInputBox.scss";

const KeyboardHandler = ({ onSubmit }: { onSubmit: () => void }) =>
  Extension.create({
    name: "keyboardHandler",
    addKeyboardShortcuts() {
      return {
        Enter: () => {
          if (!isEmpty(this.editor.getText())) {
            onSubmit();
          }
          return this.editor.commands.focus();
        },
        "Shift-Enter": () => {
          return this.editor.commands.first(({ commands }) => [
            () => commands.newlineInCode(),
            () => commands.createParagraphNear(),
            () => commands.liftEmptyBlock(),
            () => commands.splitBlock(),
          ]);
        },
      };
    },
  });

type ChatInputBoxProps = {
  content?: string;
  isEditingMode?: boolean;
  onCancel?: () => void;
  messageId?: Id<"messages">;
};

const ChatInputBox = ({
  content,
  onCancel,
  isEditingMode = false,
  messageId,
}: ChatInputBoxProps) => {
  const params = useParams();
  const editor = useEditor({
    content: content,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your message from here",
      }),
      KeyboardHandler({
        onSubmit,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
  });

  const { mutate: createMessage } = useCreateMessage({
    onSuccess: () => {
      editor?.commands.clearContent();
    },
  });

  const { mutate: editMessage } = useEditMessage({
    onSuccess: () => {
      editor?.commands.clearContent();
    },
  });

  if (!editor) {
    return null;
  }

  function onSubmit() {
    const text = editor?.getHTML() ?? "";
    if (isEditingMode && messageId) {
      return editMessage({
        content: text,
        messageId,
      });
    }
    return createMessage({
      channelId: params.channelId as Id<"channels">,
      content: text,
    });
  }

  return (
    <Flex
      className={cn(
        "min-h-[92px] bg-background-body",
        !isEditingMode && "p-2 px-3",
      )}
      shrink="shrink-0"
    >
      <Flex
        className={cn(
          "border rounded-md border-accent-border  bg-background h-full w-full",
          "ChatInputBox",
        )}
        direction="flex-col"
      >
        <Flex direction="flex-col">
          <MenuOptions editor={editor} />
          <Flex className="overflow-y-auto max-h-[420px] cursor-text">
            <EditorContent className="w-full" name="message" editor={editor} />
          </Flex>
        </Flex>
        <Flex gap="gap-2" justifyContent="justify-end" className="pr-2 pb-2">
          {isEditingMode && (
            <IconButton
              size="xSmallIcon"
              variant="secondary"
              icon={X}
              tooltip="Cancel"
              onClick={onCancel}
            />
          )}
          <IconButton
            size="xSmallIcon"
            variant="default"
            icon={isEditingMode ? Check : Send}
            tooltip="Apply"
            onClick={onSubmit}
            disabled={!editor.getText()}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatInputBox;
