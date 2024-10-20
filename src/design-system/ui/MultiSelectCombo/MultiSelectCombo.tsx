import { Check } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import EmptyState from "@/design-system/patterns/EmptyState";
import { Command } from "@/design-system/ui/Command/Command";
import { Label } from "@/design-system/ui/Label/label";
import MultiSelectComboInput from "@/design-system/ui/MultiSelectCombo/MultiSelectComboInput";
import { MultiSelectComboData } from "@/design-system/ui/MultiSelectCombo/type";
import { Popover } from "@/design-system/ui/Popover/Popover";
import { cn } from "@/design-system/utils/utils";

type MultiSelectComboProps = {
  data: MultiSelectComboData[];
  selected: string[];
  setSelected: (valueToSet: MultiSelectComboProps["selected"]) => void;
  onValuePicked?: (value: string, type: "delete" | "add") => void;
  label?: string;
  isSingleSelect?: boolean;
  internalLabel?: string;
  placeholder?: string;
};

const MultiSelectCombo = ({
  data,
  label,
  selected,
  setSelected,
  isSingleSelect,
  placeholder,
}: MultiSelectComboProps) => {
  const _onSelect = (value: string, type: "delete" | "add") => {
    const removeItem = () => {
      const itemIndex = selected.indexOf(value);
      if (itemIndex > -1) {
        const newSelected = [...selected];
        newSelected.splice(itemIndex, 1);
        setSelected(newSelected);
      }
      return itemIndex === -1;
    };

    if (type === "add") {
      if (isSingleSelect) {
        if (removeItem()) {
          setSelected([value]);
        }
      } else {
        setSelected([...selected, value]);
      }
    } else {
      removeItem();
    }
  };

  return (
    <Flex direction="flex-col" className="space-y-2 w-full">
      {label && <Label>{label}</Label>}
      <Popover>
        <Popover.Trigger>
          <MultiSelectComboInput
            selected={selected}
            isSingleSelect={isSingleSelect}
            onSelect={_onSelect}
            data={data}
            placeholder={placeholder}
          />
        </Popover.Trigger>
        <Popover.Content align="start">
          <Popover.Content.Main>
            <Command>
              <Command.Input className="px-0" placeholder="Search..." />
              <Command.List>
                <Command.Empty>
                  <EmptyState>
                    <EmptyState.Label>No values</EmptyState.Label>
                  </EmptyState>
                </Command.Empty>
                <Command.Group className="px-0">
                  {data.map((item) => {
                    const alreadyExists = selected.find(
                      (selectedValue) => selectedValue === item.value,
                    );
                    return (
                      <Command.Item
                        key={item.value}
                        value={item.value}
                        onSelect={() =>
                          _onSelect(
                            item.value,
                            alreadyExists ? "delete" : "add",
                          )
                        }
                        disabled={item.disabled}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            alreadyExists ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {item.label}
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              </Command.List>
            </Command>
          </Popover.Content.Main>
        </Popover.Content>
      </Popover>
    </Flex>
  );
};

export default MultiSelectCombo;
