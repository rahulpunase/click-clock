import { Check } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import EmptyState from "@/design-system/patterns/EmptyState";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { Command } from "@/design-system/ui/Command/Command";
import { Label } from "@/design-system/ui/Label/label";
import { Popover } from "@/design-system/ui/Popover/Popover";
import { Text } from "@/design-system/ui/Text/Text";
import { cn } from "@/design-system/utils/utils";

type MultiSelectComboData = {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
};

type MultiSelectComboProps = {
  data: MultiSelectComboData[];
  selected: string[];
  setSelected: (valueToSet: MultiSelectComboProps["selected"]) => void;
  onValuePicked?: (value: string, type: "delete" | "add") => void;
  label?: string;
  isSingleSelect?: boolean;
  internalLabel?: string;
};

const MultiSelectCombo = ({
  data,
  label,
  selected,
  setSelected,
  isSingleSelect,
}: MultiSelectComboProps) => {
  const getSelectedItem = (selectedItemId: string) => {
    return data.find((item) => item.value === selectedItemId);
  };

  const _onSelect = (value: string, type: "delete" | "add") => {
    const removeItem = () => {
      const itemToDelete = selected.findIndex(
        (selectedId) => selectedId === value,
      );
      if (itemToDelete > -1) {
        const newSelected = [...selected];
        newSelected.splice(itemToDelete, 1);
        setSelected(newSelected);
      }
      return itemToDelete === -1;
    };

    if (type === "add") {
      if (isSingleSelect) {
        if (removeItem()) {
          setSelected([value]);
        }
      } else {
        setSelected([...selected, ...[value]]);
      }
    } else {
      removeItem();
    }
  };

  return (
    <Flex direction="flex-col" className="space-y-2 w-full">
      {label && <Label>{label}</Label>}
      <Popover>
        <Popover.Trigger asChild>
          <button className="flex min-h-10 w-full rounded-md border border-accent-border bg-background px-3 py-2 text-sm ring-offset-background gap-1 max-h-24 placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 overflow-auto flex-wrap focus-visible:ring-primary-hover focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 items-center">
            {selected.map((selectedItemId) => {
              const item = getSelectedItem(selectedItemId);
              return (
                <Badge
                  size="small"
                  isDeletable
                  variant="secondary"
                  onDelete={(e) => {
                    e.stopPropagation();
                    _onSelect(selectedItemId, "delete");
                  }}
                >
                  {item?.label}
                </Badge>
              );
            })}
            {isSingleSelect && !selected.length && (
              <Text variant="subtext">Pick</Text>
            )}
            {!isSingleSelect && <Text variant="subtext">Pick values</Text>}
          </button>
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
