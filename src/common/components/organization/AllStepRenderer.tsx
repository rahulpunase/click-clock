import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";

import ManagementStyle from "@/common/components/organization/steps/ManagementStyle";
import OrganizationName from "@/common/components/organization/steps/OrganizationName";
import PersonaInfo from "@/common/components/organization/steps/PersonaInfo";
import TeamSizeInfo from "@/common/components/organization/steps/TeamSizeInfo";

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
        return (
          <ManagementStyle
            onPreviousStep={onPreviousStep}
            onNextStep={onNextStep}
          />
        );
      }
      case 4: {
        return (
          <OrganizationName
            onNextStep={() => {}}
            onPreviousStep={onPreviousStep}
          />
        );
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
