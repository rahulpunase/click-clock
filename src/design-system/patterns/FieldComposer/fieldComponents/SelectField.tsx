import React, { ComponentProps } from "react";

import { useFieldContext } from "@/design-system/patterns/FieldComposer/FieldContext";
import { Select } from "@/design-system/ui/Select/Select";

type SelectFieldProps = {
  options: { label: string; value: string }[];
  valueRenderer?: JSX.Element;
  placeholder?: string;
  onClear?: (val?: string) => void;
} & ComponentProps<typeof Select>;

const SelectField = React.forwardRef<any, SelectFieldProps>(
  ({ options, valueRenderer, placeholder, ...props }, ref) => {
    const context = useFieldContext();

    const onOpenChange = (open: boolean) => {
      props.onOpenChange?.(open);
      requestIdleCallback(() => context?.setEditing?.(false));
    };

    const onValueChange = (val: string) => {
      props.onValueChange?.(val);
      requestIdleCallback(() => context?.setEditing?.(false));
    };

    return (
      <Select
        {...props}
        ref={ref}
        open={context?.editing}
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
      >
        <Select.Trigger>
          {valueRenderer ? (
            valueRenderer
          ) : (
            <Select.Value
              className="border-none"
              placeholder={placeholder ?? "Empty"}
            />
          )}
        </Select.Trigger>
        <Select.Content clearable onClear={() => onValueChange("")}>
          {options.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    );
  },
);

SelectField.displayName = "SelectField";

export default SelectField;
