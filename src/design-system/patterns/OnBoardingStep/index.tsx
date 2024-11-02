import { ComponentProps, PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Text } from "@/design-system/ui/Text/Text";
import { extractChildren } from "@/design-system/utils/utils";

const Heading = (props: ComponentProps<typeof Text>) => (
  <Text variant="heading-5">{props.children}</Text>
);
Heading.displayName = "Heading";

const Subtext = (props: ComponentProps<typeof Text>) => (
  <Text variant="subtext-1" className="mt-2">
    {props.children}
  </Text>
);
Subtext.displayName = "Subtext";

const Content = ({ children }: PropsWithChildren) => children;
Content.displayName = "Content";

const NextButton = (props: ComponentProps<typeof Button>) => (
  <Button {...props} variant="default" />
);
NextButton.displayName = "NextButton";

const PreviousButton = (props: ComponentProps<typeof Button>) => (
  <Button {...props} variant="outline" />
);
PreviousButton.displayName = "PreviousButton";

const OnBoardingStep = Object.assign(
  ({ children }: PropsWithChildren) => {
    const { heading, subtext, content, nextButton, previousButton } =
      extractChildren(children, {
        heading: Heading,
        subtext: Subtext,
        content: Content,
        nextButton: NextButton,
        previousButton: PreviousButton,
      });
    return (
      <Flex direction="flex-col" className="animate-in fade-in max-w-[70%]">
        {heading}
        {subtext}
        <Flex className="mt-8" direction="flex-col">
          {content}
        </Flex>
        <Flex
          className="mt-12 w-full"
          justifyContent="justify-between"
          alignItems="items-end"
        >
          {previousButton}
          {nextButton}
        </Flex>
      </Flex>
    );
  },
  {
    displayName: "OnBoardingStep",
    Heading,
    Subtext,
    Content,
    NextButton,
    PreviousButton,
  },
);

export default OnBoardingStep;
