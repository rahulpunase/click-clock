import DefaultImage from "@/assets/default-empty.svg";
import { ComponentProps, PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "@/design-system/ui/Text/Text";
import { extractChildren } from "@/design-system/utils/utils";

const Label = ({ ...props }: ComponentProps<typeof Text>) => (
  <Text variant="heading-1" className="text-center" {...props} />
);

Label.displayName = "Label";

const Subtext = ({ ...props }: ComponentProps<typeof Text>) => (
  <Text variant="body-1" className="text-center text-text-muted" {...props} />
);

Subtext.displayName = "Subtext";

const Actions = ({ children }: PropsWithChildren) => {
  return children;
};

const EmptyState = Object.assign(
  ({ children }: PropsWithChildren) => {
    const extractedChildren = extractChildren(children, {
      label: Label,
      subtext: Subtext,
      actions: Actions,
    });

    return (
      <Flex
        className="p-6 max-w-[380px]"
        alignItems="items-center"
        justifyContent="justify-center"
        data-empty-state
      >
        <Flex direction="flex-col">
          <Flex justifyContent="justify-center">
            <img src={DefaultImage} alt="no-data" />
          </Flex>
          {extractedChildren.label}
          {extractedChildren.subtext}
          {extractedChildren.actions && (
            <Flex
              gap="gap-2"
              alignItems="items-center"
              justifyContent="justify-center"
              className="pt-4"
            >
              {extractedChildren.actions}
            </Flex>
          )}
        </Flex>
      </Flex>
    );
  },
  {
    displayName: "EmptyState",
    Label,
    Subtext,
    Actions,
  },
);

export default EmptyState;
