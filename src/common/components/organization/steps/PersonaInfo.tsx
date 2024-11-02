import { capitalize } from "lodash-es";

import { Flex } from "@/design-system/layout/Flex/Flex";
import OnBoardingStep from "@/design-system/patterns/OnBoardingStep";
import { Button } from "@/design-system/ui/Button/Button";

import {
  options,
  optionsMap,
} from "@/common/components/organization/constants";
import useOnBoardingStore from "@/common/components/organization/context/useOnBoardingStore";
import { StepProps } from "@/common/components/organization/types";

const PersonaInfo = ({ onNextStep }: StepProps) => {
  const { selectedPersona, setSelectedPersona } = useOnBoardingStore((s) => s);
  return (
    <OnBoardingStep>
      <OnBoardingStep.Heading>
        How do you want to use this workspace?
      </OnBoardingStep.Heading>
      <OnBoardingStep.Subtext>
        Workspace help group your data together
      </OnBoardingStep.Subtext>
      <OnBoardingStep.Content>
        <Flex className="w-full" gap="gap-6" direction="flex-col">
          <Flex alignItems="items-center" justifyContent="justify-center">
            <img
              className="h-[260px]"
              src={optionsMap[selectedPersona]?.image}
              alt="office"
            />
          </Flex>
          <Flex gap="gap-3">
            {options.map((item) => (
              <Button
                onClick={() => setSelectedPersona(item)}
                variant={selectedPersona === item ? "default" : "outline"}
                className="flex-1"
              >
                {capitalize(item)}
              </Button>
            ))}
          </Flex>
        </Flex>
      </OnBoardingStep.Content>
      <OnBoardingStep.NextButton onClick={onNextStep}>
        Next step
      </OnBoardingStep.NextButton>
    </OnBoardingStep>
  );
};

export default PersonaInfo;
