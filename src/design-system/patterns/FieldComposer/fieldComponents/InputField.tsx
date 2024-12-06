import React, { ComponentProps } from "react";

import { useDataListContext } from "@/design-system/patterns/FieldComposer/DataListContext";
import { Input } from "@/design-system/ui/Input/Input";
import { Textarea } from "@/design-system/ui/Textarea/Textarea";

const InputField = React.forwardRef<any, ComponentProps<typeof Input>>(
  ({ ...props }, ref) => {
    const context = useDataListContext();

    const onBlur = (e: FocusEvent) => {
      context?.setEditing(false);
      props.onBlur?.(e);
    };

    if (props?.value?.length > 30) {
      return (
        <Textarea
          {...props}
          autoFocus
          ref={ref}
          onBlur={onBlur}
          onFocus={(e) => {
            e.target.setSelectionRange?.(
              props.value.length,
              props.value.length,
            );
          }}
        />
      );
    }

    return (
      <Input
        {...props}
        className="p-2 font-light focus-visible:ring-0 border border-primary focus-visible:ring-offset-2"
        onBlur={onBlur}
        autoFocus
        ref={ref}
      />
    );
  },
);

export default InputField;
