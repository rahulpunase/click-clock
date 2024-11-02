import { capitalize } from "lodash-es";
import { Check } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import OnBoardingStep from "@/design-system/patterns/OnBoardingStep";
import Icon from "@/design-system/ui/Icon/Icon";
import { cn } from "@/design-system/utils/utils";

import useOnBoardingStore from "@/pages/onboarding/context/useOnBoardingStore";
import { options, optionsMap } from "@/pages/onboarding/utils/constants";
import { StepProps } from "@/pages/onboarding/utils/types";

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
              <Flex
                flex="flex-1"
                className={cn(
                  "rounded-md border border-accent-border p-4 cursor-pointer",
                  selectedPersona === item && "bg-primary text-white",
                )}
                justifyContent="justify-between"
                role="button"
                onClick={() => setSelectedPersona(item)}
              >
                {capitalize(item)}
                {selectedPersona === item && <Icon IconName={Check} />}
              </Flex>
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
