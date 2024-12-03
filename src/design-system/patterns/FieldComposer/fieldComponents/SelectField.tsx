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
    const dataList = useDataListContext();
    const onBlur = () => {
      if (dataList) {
        dataList.setEditing(false);
      }
    };

    const onOpenChange = (open: boolean) => {
      if (dataList) {
        dataList.setEditing(false);
        props.onOpenChange?.(open);
      }
    };

    return (
      <Select
        ref={ref}
        open={dataList?.editing}
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
