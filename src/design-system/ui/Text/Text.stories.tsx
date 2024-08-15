import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Text } from "./Text";
import { Flex } from "@/design-system/layout/Flex/Flex";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Text",
  component: Text,
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
  args: { onClick: fn(), children: <span>Button</span> },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Typography: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-8" direction="flex-col">
        <Flex
          gap="gap-4"
          direction="flex-col"
          className="border border-accent-border p-4 rounded-sm"
        >
          <Text as="h1" variant="heading-1">
            Headings
          </Text>
          <Text as="h1" variant="heading-1">
            I am a heading Text
          </Text>
          <Text as="h1" variant="heading-2">
            I am a heading Text
          </Text>
          <Text as="h1" variant="heading-3">
            I am a heading Text
          </Text>
        </Flex>
        <Flex
          gap="gap-4"
          direction="flex-col"
          className="border border-accent-border p-4 rounded-sm"
        >
          <Text as="h1" variant="heading-1">
            Body Texts
          </Text>
          <Text as="p" variant="body-1">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled
          </Text>
          <Text as="p" variant="body-2">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled
          </Text>
          <Text as="p" variant="body-3">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled
          </Text>
        </Flex>
        <Flex gap="gap-2">
          <Flex
            gap="gap-4"
            direction="flex-col"
            className="w-[30%] border border-accent-border p-4 rounded-sm"
          >
            <Text as="h1" variant="heading-1">
              Wrap
            </Text>
            <Text as="div" variant="body-2" align="left">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled
            </Text>
          </Flex>
          <Flex
            gap="gap-4"
            direction="flex-col"
            className="w-[400px] border border-accent-border p-4 rounded-sm"
          >
            <Text as="h1" variant="heading-1">
              Wrap
            </Text>
            <Text as="div" variant="body-2" align="center">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled
            </Text>
          </Flex>
          <Flex
            gap="gap-4"
            direction="flex-col"
            className="w-[400px] border border-accent-border p-4 rounded-sm"
          >
            <Text as="h1" variant="heading-1">
              Wrap
            </Text>
            <Text as="div" variant="body-2" align="right">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};
