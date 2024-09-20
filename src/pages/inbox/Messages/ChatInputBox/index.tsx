import MenuOptions from "@/pages/inbox/Messages/ChatInputBox/MenuOptions";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn } from "@/design-system/utils/utils";

import { useCreateMessage } from "@/common/hooks/db/messages/mutations/useCreateMessage";

import { Id } from "@db/_generated/dataModel";

import "./ChatInputBox.scss";

const KeyboardHandler = ({ onSubmit }: { onSubmit: (text: string) => void }) =>
  Extension.create({
    name: "keyboardHandler",
    addKeyboardShortcuts() {
      return {
        Enter: () => {
          const text = this.editor.getHTML();
          onSubmit(text);
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

const ChatInputBox = () => {
  const params = useParams();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your message from here",
      }),
      KeyboardHandler({
        onSubmit,
      }),
    ],
  });

  const { mutate: createMessage, isPending } = useCreateMessage({
    onSuccess: () => {
      editor?.commands.clearContent();
    },
  });

  function onSubmit(text: string) {
    createMessage({
      channelId: params.channelId as Id<"channels">,
      content: text,
    });
  }

  return (
    <Flex className="min-h-[92px] p-2" shrink="shrink-0">
      <Flex
        className={cn(
          "border rounded-md border-accent-border h-full w-full",
          "ChatInputBox",
        )}
      >
        <Flex direction="flex-col">
          <MenuOptions />
          <Flex className="overflow-y-auto max-h-[120px]">
            <EditorContent name="message" editor={editor} />
          </Flex>
        </Flex>
        {/* <BubbleMenu
          tippyOptions={{
            placement: "left-start",
          }}
          className="bubble-menu"
          editor={editor}
        >
          <Flex
            gap="gap-1"
            className="p-1 bg-background border border-accent-border2 bg-zinc-50 rounded-sm"
          >
            <IconButton icon="bold" variant="ghost" size="xSmallIcon" />
            <IconButton icon="italic" variant="ghost" size="xSmallIcon" />
            <IconButton
              icon="strikethrough"
              variant="ghost"
              size="xSmallIcon"
            />
          </Flex>
        </BubbleMenu> */}
      </Flex>
    </Flex>
  );
};

export default ChatInputBox;
