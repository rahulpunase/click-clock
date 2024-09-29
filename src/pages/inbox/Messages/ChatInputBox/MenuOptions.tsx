import AddLinkModal, {
  type AddLinkModalDialogData,
} from "@/pages/inbox/Messages/ChatInputBox/AddLinkModal";
import { Editor } from "@tiptap/react";
import { Bold, Italic, Link, Strikethrough } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";
import { Separator } from "@/design-system/ui/Separator/Separator";

const MenuOptions = ({ editor }: { editor: Editor }) => {
  const onBoldToggle = () => editor.chain().focus().toggleBold().run();
  const onItalicToggle = () => editor.chain().focus().toggleItalic().run();
  const onStrikeThrough = () => editor.chain().focus().toggleItalic().run();

  const addLinkModalStore = useDialogStore<AddLinkModalDialogData>();

  const openLinkModal = () => {
    const { view, state } = editor;
    const { from, to } = view.state.selection;
    const text = state.doc.textBetween(from, to, "");

    addLinkModalStore.show({
      link: "",
      text,
    });
  };

  const onSetLink = (link: string) => {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: link })
      .run();
    addLinkModalStore.hide();
  };

  return (
    <Flex gap="gap-1" className="p-1 bg-background rounded-sm">
      <IconButton
        onClick={onBoldToggle}
        icon={Bold}
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        size="xSmallIcon"
      />
      <IconButton
        onClick={onItalicToggle}
        icon={Italic}
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        size="xSmallIcon"
      />
      <IconButton
        onClick={onStrikeThrough}
        icon={Strikethrough}
        variant={editor.isActive("strike") ? "secondary" : "ghost"}
        size="xSmallIcon"
      />
      <Separator orientation="vertical" />
      <IconButton
        onClick={openLinkModal}
        icon={Link}
        variant={editor.isActive("link") ? "secondary" : "ghost"}
        size="xSmallIcon"
      />
      <AddLinkModal store={addLinkModalStore} onSubmit={onSetLink} />
    </Flex>
  );
};

export default MenuOptions;
