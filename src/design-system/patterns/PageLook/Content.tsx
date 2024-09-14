import { ComponentProps, PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn, extractChildren } from "@/design-system/utils/utils";

type MainProps = ComponentProps<typeof Flex> & {
  noPadding?: boolean;
  fitHeight?: boolean;
  verticalOverflow?: "off" | "on";
  horizontalOverflow?: "off" | "on";
};

const Main = ({
  noPadding,
  fitHeight = true,
  verticalOverflow = "on",
  horizontalOverflow = "off",
  ...props
}: MainProps) => {
  return (
    <div
      className={cn(
        "overflow-y-hidden relative flex-1 flex w-full",
        !noPadding && "pt-3 px-3 pb-3 ",
        verticalOverflow === "on" ? "overflow-y-auto" : "overflow-y-hidden",
        horizontalOverflow === "on" ? "overflow-x-auto" : "overflow-x-hidden",
      )}
      {...props}
    >
      <Flex
        direction="flex-col"
        className={cn(
          "w-full",
          !noPadding && "p-6 pb-0 mb-6",
          fitHeight && "h-fit",
        )}
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
