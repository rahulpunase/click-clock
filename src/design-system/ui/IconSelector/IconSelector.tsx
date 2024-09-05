import { useEffect, useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Popover } from "@/design-system/ui/Popover/Popover";
import { Separator } from "@/design-system/ui/Separator/Separator";
import { cn } from "@/design-system/utils/utils";

const colors = [
  "#ff0000",
  "#ff8700",
  "#ffd300",
  "#a1ff0a",
  "#0aff99",
  "#a167a5",
  "#147df5",
  "#580aff",
  "#be0aff",
  "#4f518c",
];

const actualIcons: Array<IconName> = [
  "database",
  "bookmark",
  "smile",
  "airplay",
  "arrow-up-narrow-wide",
  "brackets",
  "bike",
];

export type OnChangeParam = { color: string; icon: IconName };

type IconSelectorProps = {
  onChange: (param: OnChangeParam) => void;
};

const IconSelector = ({ onChange }: IconSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedIcon, setSelectedIcon] = useState(actualIcons[0]);

  useEffect(() => {
    onChange?.({
      color: selectedColor,
      icon: selectedIcon,
    });
  }, [selectedColor, selectedIcon]);

  return (
    <Popover>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="size-10 bg-secondary rounded-md shrink-0 flex justify-center items-center text-white"
          style={{
            background: selectedColor,
          }}
        >
          <Icon name={selectedIcon} className="size-6" />
        </button>
      </Popover.Trigger>
      <Popover.Content className="w-[200px] z-[100]">
        <Popover.Content.Header>
          <Popover.Content.Header.Title>
            Space color
          </Popover.Content.Header.Title>
        </Popover.Content.Header>
        <Popover.Content.Description>
          <Flex wrap="flex-wrap" gap="gap-1" className="pb-2 pt-2">
            {colors.map((color) => (
              <button
                style={{
                  background: color,
                }}
                className={cn(
                  "size-4 rounded-full",
                  color === selectedColor && "ring-1 ring-offset-2",
                )}
                onClick={() => {
                  setSelectedColor(color);
                }}
              />
            ))}
          </Flex>
          <Separator className="" />
          <Flex wrap="flex-wrap" gap="gap-2" className="pt-2">
            {actualIcons.map((iconKey) => {
              return (
                <Icon
                  name={iconKey}
                  className="size-4 cursor-pointer"
                  onClick={() => {
                    setSelectedIcon(iconKey);
                  }}
                />
              );
            })}
          </Flex>
        </Popover.Content.Description>
      </Popover.Content>
    </Popover>
  );
};

export default IconSelector;
