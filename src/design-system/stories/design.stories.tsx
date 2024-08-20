import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "@/design-system/layout/Flex/Flex";
import _vars from "../style/_vars";
import { Text } from "../ui/Text/Text";
import { capitalize } from "lodash-es";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Design-Tokens/Colors",
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  //   argTypes: {
  //     variant: "input"
  //     size: "default"
  //   },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Main: Story = {
  render: () => {
    const colors = _vars.colors;
    const allKeys = Object.keys(_vars.colors);
    const normalColors = allKeys.filter((k) => typeof colors[k] === "string");
    const mapColors = allKeys.filter((k) => typeof colors[k] === "object");
    return (
      <Flex direction="flex-col" gap="gap-8">
        <Flex direction="flex-col">
          <Text variant="heading-2" className="py-6">
            Normal Colors
          </Text>
          <Flex direction="flex-col">
            {normalColors.map((key) => (
              <Flex gap="gap-2" direction="flex-row" alignItems="items-center">
                <Text className="w-[100px]">{capitalize(key)}</Text>:
                <Flex
                  style={{
                    background: colors[key],
                    height: "40px",
                    borderRadius: "8px",
                  }}
                  className="w-[100px]"
                />
                <Text variant="body-1">{colors[key]}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>

        <Flex direction="flex-col">
          <Text variant="heading-2" className="pb-4">
            App Colors
          </Text>
          <Flex direction="flex-col" gap="gap-4">
            {mapColors.map((k) => {
              const colorObject = colors[k];
              return (
                <Flex direction="flex-col">
                  <Text variant="heading-1" className="py-6">
                    {capitalize(k)}
                  </Text>
                  <Flex direction="flex-col" gap="gap-2">
                    {Object.keys(colorObject).map((name) => {
                      return (
                        <Flex
                          gap="gap-2"
                          direction="flex-row"
                          alignItems="items-center"
                        >
                          <Text className="w-[100px]">{capitalize(name)}</Text>:
                          <Flex
                            style={{
                              background: colorObject[name],
                              height: "40px",
                              borderRadius: "8px",
                            }}
                            className="w-[100px]"
                          />
                          <Text variant="body-1">{colorObject[name]}</Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    );
  },
};
