import type { Preview } from "@storybook/react";

import "../src/design-system/style/global.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: (story) => {
    document.querySelector("html")?.setAttribute("theme-preference", "light");
    return story();
  },
};

export default preview;
