import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { icons } from "lucide-react";
import { Text } from "../ui/Text/Text";
import { Card } from "../ui/Card/Card";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Design-Tokens/Icons",
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "",
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
    return (
      <Flex direction="flex-col" className="p-4">
        <Text variant="heading-2" className="py-4">
          Icons
        </Text>
        <Flex wrap="flex-wrap" gap="gap-4" justifyContent="justify-between">
          {Object.keys(icons).map((iconKey) => {
            const LucidIcon = icons[iconKey as keyof typeof icons];
            if (!LucidIcon) return null;
            return (
              <Card>
                <Card.Content>
                  <Flex
                    direction="flex-col"
                    alignItems="items-center"
                    justifyContent="justify-center"
                    className="size-24"
                    gap="gap-2"
                  >
                    <LucidIcon className="size-8 text-text" />
                    <Text
                      as="span"
                      variant="body-1"
                      align={"center"}
                      className="w-full break-words"
                    >
                      {iconKey}
                    </Text>
                  </Flex>
                </Card.Content>
              </Card>
            );
          })}
        </Flex>
      </Flex>
    );
  },
};
