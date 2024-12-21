import React, { ComponentProps } from "react";

import InlinePopover from "@/design-system/patterns/FieldComposer/fieldComponents/InlinePopover";
import { useFieldContext } from "@/design-system/patterns/FieldComposer/FieldContext";
import { Input } from "@/design-system/ui/Input/Input";
import { Textarea } from "@/design-system/ui/Textarea/Textarea";

const InputField = React.forwardRef<any, ComponentProps<typeof Input>>(
  ({ ...props }, ref) => {
    const context = useFieldContext();

    const onBlur = (e: FocusEvent) => {
      context?.setEditing(false);
      props.onBlur?.(e);
    };

    const _children =
      props?.value?.length > 30 ? (
        <Textarea
          {...props}
          autoFocus
          ref={ref}
          onBlur={onBlur}
          className="border border-primary"
          onFocus={(e) => {
            e.target.setSelectionRange?.(
              props.value.length,
              props.value.length,
            );
          }}
        />
      ) : (
        <Input
          {...props}
          className="p-2 font-light focus-visible:ring-0 border border-primary focus-visible:ring-offset-2"
          onBlur={onBlur}
          autoFocus
          ref={ref}
        />
      );

    return (
      <InlinePopover open={context?.editing} setEditing={context?.setEditing}>
        {_children}
      </InlinePopover>
    );
  },
);

export default InputField;
