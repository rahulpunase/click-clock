import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Toast, ToastAction } from "@/design-system/ui/Toast/toast";
import { Toaster } from "@/design-system/ui/Toast/toaster";
import { useToast } from "@/design-system/ui/Toast/useToast";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Toast",
  component: Toast,
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
export const NormalToast: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    const { toast } = useToast();
    return (
      <Flex gap="gap-8" direction="flex-col">
        <Button
          onClick={() =>
            toast({
              title: "Toast",
              description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
          }
        >
          Open Toast
        </Button>
        <Toaster />
      </Flex>
    );
  },
};
