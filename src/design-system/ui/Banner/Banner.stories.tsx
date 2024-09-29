import type { Meta, StoryObj } from "@storybook/react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Banner from "@/design-system/ui/Banner/Banner";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalBanners: Story = {
  render: () => {
    return (
      <Flex gap="gap-4" direction="flex-col">
        <Banner text="This is some primary banner text" />
        <Banner text="This is some Success banner text" variant="success" />
        <Banner text="This is some Error text banner text" variant="error" />
        <Banner text="This is some Warning banner text" variant="warning" />
        <Banner
          text="This is some Warning banner text"
          variant="warning"
          withX
        />
      </Flex>
    );
  },
};
