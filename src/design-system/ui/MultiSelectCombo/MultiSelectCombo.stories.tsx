import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/MultiSelectCombo",
  component: MultiSelectCombo,
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
} satisfies Meta<typeof MultiSelectCombo>;

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "sveltekit1",
    label: "SvelteKit1",
  },
  {
    value: "nuxt.js1",
    label: "Nuxt.js1",
  },
  {
    value: "remix1",
    label: "Remix1",
  },
  {
    value: "astro1",
    label: "Astro1",
  },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalMultiSelectCombo: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    console.log({ selected });

    return (
      <Flex className="w-[300px]">
        <MultiSelectCombo
          data={frameworks}
          selected={selected}
          setSelected={setSelected}
          // onValuePicked={onValuePicked}
        />
      </Flex>
    );
  },
};
