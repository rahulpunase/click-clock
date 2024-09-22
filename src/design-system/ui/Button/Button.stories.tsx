import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Text } from "design-system/ui/Text/Text";
import {
  Airplay,
  AlignHorizontalDistributeCenter,
  AlignVerticalDistributeEnd,
  BookMarked,
  Ghost,
  Link,
} from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";

import { Button } from "./Button";
import { IconButton } from "./IconButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Button",
  component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalButtons: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-8" direction="flex-col">
        <Flex gap="gap-6" direction="flex-col">
          <Text variant="heading-1">Normal buttons</Text>
          <Flex gap="gap-8">
            <Button onClick={() => alert("I am CLICKED")} variant="default">
              Default Button
            </Button>
            <Button onClick={() => alert("I am CLICKED")} variant="secondary">
              Secondary Button
            </Button>
            <Button onClick={() => alert("I am CLICKED")} variant="destructive">
              Destructive Button
            </Button>
            <Button onClick={() => alert("I am CLICKED")} variant="ghost">
              Ghost Button
            </Button>
            <Button onClick={() => alert("I am CLICKED")} variant="link">
              Link Button
            </Button>
            <Button onClick={() => alert("I am CLICKED")} variant="outline">
              Outline Button
            </Button>
            <Button
              isLoading
              onClick={() => alert("I am CLICKED")}
              variant="outline"
            >
              Outline Button
            </Button>
            <Button
              isLoading
              onClick={() => alert("I am CLICKED")}
              variant="default"
            >
              Default Button
            </Button>
          </Flex>
        </Flex>

        <Flex gap="gap-6" direction="flex-col">
          <Text variant="heading-1">Button with icons</Text>
          <Flex gap="gap-8">
            <Button
              onClick={() => alert("I am CLICKED")}
              variant="default"
              icon={AlignVerticalDistributeEnd}
            >
              Default Button
            </Button>
            <Button
              onClick={() => alert("I am CLICKED")}
              variant="secondary"
              icon={Airplay}
            >
              Secondary Button
            </Button>
            <Button
              onClick={() => alert("I am CLICKED")}
              variant="destructive"
              icon={AlignHorizontalDistributeCenter}
            >
              Destructive Button
            </Button>
            <Button
              onClick={() => alert("I am CLICKED")}
              variant="ghost"
              icon={Ghost}
            >
              Ghost Button
            </Button>
            <Button
              onClick={() => alert("I am CLICKED")}
              variant="link"
              icon={Link}
            >
              Link Button
            </Button>
            <Button
              onClick={() => alert("I am CLICKED")}
              variant="outline"
              icon={BookMarked}
            >
              Outline Button
            </Button>
          </Flex>
        </Flex>

        <Flex gap="gap-6" direction="flex-col">
          <Text variant="heading-1">Small Buttons</Text>
          <Flex gap="gap-8">
            <Button
              onClick={() => alert("I am CLICKED")}
              size="sm"
              variant="default"
              icon={AlignVerticalDistributeEnd}
            >
              Default Button
            </Button>
            <Button
              onClick={() => alert("I am CLICKED")}
              size="sm"
              variant="secondary"
              icon={Airplay}
            >
              Secondary Button
            </Button>
            <Button
              onClick={() => alert("I am CLICKED")}
              size="sm"
              variant="destructive"
              icon={AlignHorizontalDistributeCenter}
            >
              Destructive Button
            </Button>
            <Button
              onClick={() => alert("I am CLICKED")}
              size="sm"
              variant="ghost"
              icon={Ghost}
            >
              Ghost Button
            </Button>
            <Button
              onClick={() => alert("I am CLICKED")}
              size="sm"
              variant="link"
              icon={Link}
            >
              Link Button
            </Button>
            <Button
              onClick={() => alert("I am CLICKED")}
              size="xsm"
              variant="outline"
              icon={BookMarked}
            >
              Outline Button
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export const IconButtons: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-8" direction="flex-col">
        <Flex gap="gap-4">
          <IconButton icon={AlignVerticalDistributeEnd} variant="default" />
          <IconButton icon={AlignVerticalDistributeEnd} variant="secondary" />
          <IconButton icon={AlignVerticalDistributeEnd} variant="destructive" />
          <IconButton icon={AlignVerticalDistributeEnd} variant="ghost" />
          <IconButton icon={AlignVerticalDistributeEnd} variant="link" />
          <IconButton icon={AlignVerticalDistributeEnd} variant="outline" />
          <IconButton
            isLoading
            icon={AlignVerticalDistributeEnd}
            variant="outline"
          />
        </Flex>
        <Flex gap="gap-4">
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="default"
            size="smallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="secondary"
            size="smallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="destructive"
            size="smallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="ghost"
            size="smallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="link"
            size="smallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="outline"
            size="smallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="outline"
            size="smallIcon"
            isLoading
          />
        </Flex>
        <Flex gap="gap-4">
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="default"
            size="xSmallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="secondary"
            size="xSmallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="destructive"
            size="xSmallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="ghost"
            size="xSmallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="link"
            size="xSmallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="outline"
            size="xSmallIcon"
          />
          <IconButton
            icon={AlignVerticalDistributeEnd}
            variant="outline"
            size="xSmallIcon"
            isLoading
          />
        </Flex>
      </Flex>
    );
  },
};
