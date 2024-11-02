import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";

import ManagementStyle from "@/pages/onboarding/components/steps/ManagementStyle";
import PersonaInfo from "@/pages/onboarding/components/steps/PersonaInfo";
import TeamSizeInfo from "@/pages/onboarding/components/steps/TeamSizeInfo";

const AllStepRenderer = () => {
  const [step, setStep] = useState(1);

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const onPreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const renderSteps = () => {
    switch (step) {
      case 1: {
        return <PersonaInfo onNextStep={onNextStep} />;
      }
      case 2: {
        return (
          <TeamSizeInfo
            onPreviousStep={onPreviousStep}
            onNextStep={onNextStep}
          />
        );
      }
      case 3: {
        return <ManagementStyle onNextStep={onNextStep} />;
      }
    }
  };

  return (
    <Flex
      flex="flex-1"
      alignItems="items-start"
      justifyContent="justify-center"
      className="pt-[10%]"
    >
      {renderSteps()}
    </Flex>
  );
};

export default AllStepRenderer;
