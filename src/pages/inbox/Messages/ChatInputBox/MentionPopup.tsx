import { MentionNodeAttrs } from "@tiptap/extension-mention";
import { SuggestionProps } from "@tiptap/suggestion";
import React, { forwardRef } from "react";

import { Popover } from "@/design-system/ui/Popover/Popover";

type MentionPopupProps = {
  open: false;
} & SuggestionProps<unknown, MentionNodeAttrs>;

const MentionPopup = forwardRef<HTMLDivElement, MentionPopupProps>(
  (props, ref) => {
    if (!props.clientRect) {
      return;
    }
    const rect = props.clientRect();
    if (!rect) {
      return null;
    }
    console.log({ rect });
    return (
      <Popover open={props.open}>
        <Popover.Anchor
          style={{
            left: 300 + "px",
            top: 300 + "px",
            height: 30 + "px",
            width: 30 + "px",
          }}
          className="fixed size-4 bg-red-400"
        >
          <Popover.Trigger />
        </Popover.Anchor>
        <Popover.Content onOpenAutoFocus={(e) => e.preventDefault()}>
          <Popover.Content.Main>Hey</Popover.Content.Main>
        </Popover.Content>
      </Popover>
    );
  },
);

export default MentionPopup;
