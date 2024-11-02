import { Flex } from "@/design-system/layout/Flex/Flex";
import OnBoardingStep from "@/design-system/patterns/OnBoardingStep";
import { Slider } from "@/design-system/ui/Slider/Slider";
import { Text } from "@/design-system/ui/Text/Text";

import useOnBoardingStore from "@/pages/onboarding/context/useOnBoardingStore";
import { StepProps } from "@/pages/onboarding/utils/types";

const TeamSizeInfo = ({ onNextStep, onPreviousStep }: StepProps) => {
  const { noOfEmployees, setNumberOfEmployees } = useOnBoardingStore((s) => s);
  return (
    <OnBoardingStep>
      <OnBoardingStep.Heading>
        How many teammates are there in your organization?
      </OnBoardingStep.Heading>
      <OnBoardingStep.Subtext>
        We've provided our services to all the sizes.
      </OnBoardingStep.Subtext>
      <OnBoardingStep.Content>
        <Flex className="mb-4">
          <Text variant="heading-3">{`More than ${noOfEmployees} people`}</Text>
        </Flex>
        <Slider
          onValueChange={(val) => setNumberOfEmployees(val[0])}
          defaultValue={[noOfEmployees]}
          min={10}
          max={1000}
          step={10}
        />
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

export default TeamSizeInfo;
