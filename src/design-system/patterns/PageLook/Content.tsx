import { ComponentProps, PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { extractChildren } from "@/design-system/utils/utils";

const Main = ({ ...props }: ComponentProps<typeof Flex>) => {
  return (
    <div
      className="pt-3 px-3 overflow-y-auto relative flex-1 pb-3 flex w-full"
      {...props}
    >
      <Flex
        direction="flex-col"
        className="p-6 pb-0 mb-6 w-full h-fit"
        gap="gap-4"
      >
        {props.children}
      </Flex>
    </div>
  );
};
Main.displayName = "Main";

const SideActions = ({ ...props }) => {
  return (
    <Flex
      className="max-h-full w-16 border-l border-accent-border "
      direction="flex-col"
      {...props}
    />
  );
};
SideActions.displayName = "SideActions";

const Content = Object.assign(
  ({ children }: PropsWithChildren) => {
    const extractedChildren = extractChildren(children, {
      main: Main,
      sideActions: SideActions,
    });

    return (
      <Flex
        grow="grow"
        flex="flex-1"
        className="min-w-0 min-h-0 overflow-y-auto overflow-x-hidden"
      >
        {extractedChildren.main}
        {extractedChildren.sideActions}
      </Flex>
    );
  },
  {
    displayName: "Content",
    Main,
    SideActions,
  },
);

export default Content;
