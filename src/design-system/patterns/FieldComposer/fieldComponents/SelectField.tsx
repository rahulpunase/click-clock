import React, { ComponentProps } from "react";

import { useDataListContext } from "@/design-system/patterns/FieldComposer/DataListContext";
import { Select } from "@/design-system/ui/Select/Select";

type SelectFieldProps = {
  options: { label: string; value: string }[];
  valueRenderer?: JSX.Element;
  placeholder?: string;
} & ComponentProps<typeof Select>;

const SelectField = React.forwardRef<any, SelectFieldProps>(
  ({ options, valueRenderer, placeholder, ...props }, ref) => {
    const context = useDataListContext();
    const onBlur = () => {
      props.onOpenChange?.(false);
    };

    const onOpenChange = (open: boolean) => {
      context?.setEditing?.(false);
      props.onOpenChange?.(open);
    };

    return (
      <Select
        ref={ref}
        open={context?.editing}
        onOpenChange={onOpenChange}
        {...props}
      >
        <Select.Trigger onBlur={onBlur}>
          {valueRenderer ? (
            valueRenderer
          ) : (
            <Select.Value
              className="border-none"
              placeholder={placeholder ?? "Empty"}
            />
          )}
        </Select.Trigger>
        <Select.Content clearable>
          {options.map((item) => (
            <Select.Item value={item.value}>{item.label}</Select.Item>
          ))}
        </Select.Content>
      </Select>
    );
  },
);

export default SelectField;
