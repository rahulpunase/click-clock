import React, { ComponentProps } from "react";

import { useDataListContext } from "@/design-system/patterns/FieldComposer/DataListContext";
import { Input } from "@/design-system/ui/Input/Input";

const InputField = React.forwardRef<any, ComponentProps<typeof Input>>(
  ({ ...props }, ref) => {
    const context = useDataListContext();

    const onBlur = (e: FocusEvent) => {
      context?.setEditing(false);
      props.onBlur?.(e);
    };
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
