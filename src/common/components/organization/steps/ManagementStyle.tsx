import { Flex } from "@/design-system/layout/Flex/Flex";
import OnBoardingStep from "@/design-system/patterns/OnBoardingStep";
import { Button } from "@/design-system/ui/Button/Button";

import { managementStyles } from "@/common/components/organization/constants";
import useOnBoardingStore from "@/common/components/organization/context/useOnBoardingStore";
import { StepProps } from "@/common/components/organization/types";

const ManagementStyle = ({ onNextStep, onPreviousStep }: StepProps) => {
  const { selectedManagementStyle, setSelectedManagementStyle } =
    useOnBoardingStore((s) => s);
  return (
    <OnBoardingStep>
      <OnBoardingStep.Heading>
        How would you like to manage?
      </OnBoardingStep.Heading>
      <OnBoardingStep.Subtext>
        Don't worry, you can always add more in the future.
      </OnBoardingStep.Subtext>
      <OnBoardingStep.Content>
        <Flex
          className="w-full"
          gap="gap-6"
          direction="flex-row"
          wrap="flex-wrap"
          justifyContent="justify-center"
        >
          {managementStyles.map((item) => (
            <Button
              variant={item === selectedManagementStyle ? "default" : "outline"}
              onClick={() => setSelectedManagementStyle(item)}
            >
              {item}
            </Button>
          ))}
        </Flex>
      </OnBoardingStep.Content>
      <OnBoardingStep.PreviousButton onClick={onPreviousStep}>
        Go back
      </OnBoardingStep.PreviousButton>
      <OnBoardingStep.NextButton onClick={onNextStep}>
        Next step
      </OnBoardingStep.NextButton>
    </OnBoardingStep>
  );
};

export default ManagementStyle;
