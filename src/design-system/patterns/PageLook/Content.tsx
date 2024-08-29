import { Flex } from "@/design-system/layout/Flex/Flex";
import { extractChildren } from "@/design-system/utils/utils";
import { ComponentProps, PropsWithChildren } from "react";

const Main = ({ ...props }: ComponentProps<typeof Flex>) => {
  return (
    <div
      className="pt-3 pl-3 overflow-y-auto relative flex-1 pb-3"
      {...props}
    />
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
      <Flex grow="grow" flex="flex-1" className="min-w-0 min-h-0 ">
        {extractedChildren.main}
        {extractedChildren.sideActions}
      </Flex>
    );
  },
  {
    displayName: "Content",
    Main,
    SideActions,
  }
);

export default Content;
