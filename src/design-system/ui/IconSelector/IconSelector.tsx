import { CircleOff } from "lucide-react";
import { ComponentProps } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import Icon from "@/design-system/ui/Icon/Icon";
import {
  AllSelectorIcons,
  AllSelectorIconsByGroup,
  IconSelectorColors,
} from "@/design-system/ui/IconSelector/AllIcons";
import { Popover } from "@/design-system/ui/Popover/Popover";
import { Separator } from "@/design-system/ui/Separator/Separator";
import { Text } from "@/design-system/ui/Text/Text";
import { cn } from "@/design-system/utils/utils";

export type OnChangeParam = {
  color: string;
  icon: keyof typeof AllSelectorIcons;
};

type IconSelectorProps = {
  onChange: (param: { type: "color" | "icon"; value: string }) => void;
  size?: ComponentProps<typeof IconButton>["size"];
  color?: string;
  iconName?: keyof typeof AllSelectorIcons;
  tooltip?: JSX.Element;
};

const IconSelector = ({
  onChange,
  size = "icon",
  iconName,
  color,
  tooltip,
}: IconSelectorProps) => {
  const _color = color ?? "#939393";

  return (
    <Popover>
      <Popover.Trigger asChild>
        <IconButton
          className="shrink-0"
          style={{
            background: _color,
          }}
          icon={iconName ? AllSelectorIcons[iconName]?.icon : CircleOff}
          size={size}
          tooltip={iconName ? tooltip : "Incorrect icon"}
        />
      </Popover.Trigger>
      <Popover.Content className="w-[200px] z-[100]">
        <Popover.Content.Header>
          <Popover.Content.Header.Title>
            Space color
          </Popover.Content.Header.Title>
        </Popover.Content.Header>
        <Popover.Content.Main>
          <Flex wrap="flex-wrap" gap="gap-1" className="pb-2 pt-2">
            {IconSelectorColors.map((_color) => (
              <button
                key={_color}
                style={{
                  background: _color,
                }}
                className={cn(
                  "size-4 rounded-full",
                  color === _color && "ring-1 ring-offset-2",
                )}
                onClick={() =>
                  onChange({
                    type: "color",
                    value: _color,
                  })
                }
              />
            ))}
          </Flex>
          <Separator className="" />
          <Flex
            wrap="flex-wrap"
            gap="gap-3"
            className="pt-2"
            direction="flex-col"
          >
            {Object.keys(AllSelectorIconsByGroup).map((key) => (
              <Flex direction="flex-col" gap="gap-1" key={key}>
                <Text variant="subtext-1">{key}</Text>
                <Flex gap="gap-2">
                  {AllSelectorIconsByGroup[key].map((iconItem) => {
                    return (
                      <Icon
                        key={iconItem.key}
                        IconName={iconItem.icon}
                        className="size-4 cursor-pointer"
                        onClick={() => {
                          onChange({
                            type: "icon",
                            value: iconItem.key,
                          });
                        }}
                      />
                    );
                  })}
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Popover.Content.Main>
      </Popover.Content>
    </Popover>
  );
};

export default IconSelector;
