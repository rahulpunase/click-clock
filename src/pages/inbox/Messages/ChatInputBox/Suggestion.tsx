import { MentionNodeAttrs } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import { SuggestionOptions } from "@tiptap/suggestion";
import { createPortal } from "react-dom";

import MentionList from "@/pages/inbox/Messages/ChatInputBox/MentionList";
import MentionPopup from "@/pages/inbox/Messages/ChatInputBox/MentionPopup";

const Suggestion: Omit<SuggestionOptions<any, MentionNodeAttrs>, "editor"> = {
  items: ({ query }) => {
    return [
      "Lea Thompson",
      "Cyndi Lauper",
      "Tom Cruise",
      "Madonna",
      "Jerry Hall",
      "Joan Collins",
      "Winona Ryder",
      "Christina Applegate",
      "Alyssa Milano",
      "Molly Ringwald",
      "Ally Sheedy",
      "Debbie Harry",
      "Olivia Newton-John",
      "Elton John",
      "Michael J. Fox",
      "Axl Rose",
      "Emilio Estevez",
      "Ralph Macchio",
      "Rob Lowe",
      "Jennifer Grey",
      "Mickey Rourke",
      "John Cusack",
      "Matthew Broderick",
      "Justine Bateman",
      "Lisa Bonet",
    ]
      .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 5);
  },

  render: () => {
    // let component;
    let popup: ReactRenderer;

    return {
      onStart: (props) => {
        if (!props.editor) {
          return;
        }
        if (!props.clientRect) {
          return;
        }
        props.editor.isInitialized = true;

        popup = new ReactRenderer(MentionPopup, {
          props: {
            ...props,
            open: true,
          },
          editor: props.editor,
        });
      },

      onUpdate(props) {
        // component.updateProps(props);
        // if (!props.clientRect) {
        //   return;
        // }
        // popup[0].setProps({
        //   getReferenceClientRect: props.clientRect,
        // });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup.updateProps({
            open: false,
          });

          return true;
        }

        // return component.ref?.onKeyDown(props);
      },

      onExit() {
        // popup[0].destroy();
        // component.destroy();
        console.log(popup);
        // popup.updateProps({
        //   open: false,
        // });
        popup.destroy();
      },
    };
  },
};

export default Suggestion;
