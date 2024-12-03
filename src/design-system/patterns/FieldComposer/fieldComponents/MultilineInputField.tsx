import { ComponentProps } from "react";

import { useDataListContext } from "@/design-system/patterns/FieldComposer/DataListContext";
import { Popover } from "@/design-system/ui/Popover/Popover";
import { Textarea } from "@/design-system/ui/Textarea/Textarea";

function MultilineInputField({ ...props }: ComponentProps<typeof Textarea>) {
  const context = useDataListContext();

  const onBlur = (e) => {
    if (context) {
      context.setEditing(false);
    }
    props.onBlur?.(e);
  };

  return (
    <Popover open={context?.editing}>
      <Popover.Anchor className="absolute w-full left-0 top-0"></Popover.Anchor>
      <Popover.Content className="p-0 w-[240px]" align="start" side="top">
        <Popover.Content.Main>
          <Textarea
            {...props}
            onBlur={onBlur}
            autoFocus
            className="border-none p-2"
          />
        </Popover.Content.Main>
      </Popover.Content>
    </Popover>
  );
}

export default MultilineInputField;
