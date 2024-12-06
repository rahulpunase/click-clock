import { ComponentProps, PropsWithChildren } from "react";

import { Popover } from "@/design-system/ui/Popover/Popover";

type Props = {
  setEditing?: (b: boolean) => void;
} & PropsWithChildren<ComponentProps<typeof Popover>>;
const InlinePopover = ({ children, setEditing, ...props }: Props) => {
  return (
    <Popover open={props.open} onOpenChange={() => setEditing?.(false)}>
      <Popover.Anchor className="absolute left-0 w-full" />
      <Popover.Content
        align="start"
        side="top"
        className="p-0 min-h-[40px]  w-[--radix-popover-trigger-width]"
      >
        <Popover.Content.Main>{children}</Popover.Content.Main>
      </Popover.Content>
    </Popover>
  );
};

export default InlinePopover;
