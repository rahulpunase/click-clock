import { CircleOff } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
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

export type OnChangeParam = { type: "color" | "icon"; value: string };

type IconSelectorProps = {
  onChange: (param: OnChangeParam) => void;
  color?: string;
  iconName?: keyof typeof AllSelectorIcons;
  tooltip?: JSX.Element;
  readonly?: boolean;
};

const IconSelector = ({
  onChange,
  iconName,
  color,
  readonly,
}: IconSelectorProps) => {
  const _color = color ?? "#939393";

  const iconToRender = iconName ? AllSelectorIcons[iconName]?.icon : undefined;

  if (readonly) {
    return (
      <Icon
        className="shrink-0 size-4 cursor-not-allowed"
        backgroundColor={_color}
        IconName={iconToRender ?? CircleOff}
        withPadding
      />
    );
  }

  return (
    <Popover>
      <Popover.Trigger>
        <Icon
          className="shrink-0 size-4 cursor-pointer"
          backgroundColor={_color}
          IconName={iconToRender ?? CircleOff}
          withPadding
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
