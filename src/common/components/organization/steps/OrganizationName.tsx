import { useNavigate } from "react-router-dom";

import OnBoardingStep from "@/design-system/patterns/OnBoardingStep";

import OnBoardingForm from "@/common/components/onboarding/OnBoardingForm";
import useOnBoardingStore from "@/common/components/organization/context/useOnBoardingStore";
import { StepProps } from "@/common/components/organization/types";

const OrganizationName = ({ onPreviousStep }: StepProps) => {
  const { selectedManagementStyle, noOfEmployees, selectedPersona } =
    useOnBoardingStore((s) => s);
  const navigate = useNavigate();
  return (
    <OnBoardingStep>
      <OnBoardingStep.Heading>
        Last step, let's name your organization?
      </OnBoardingStep.Heading>
      <OnBoardingStep.Subtext>This can't be changed.</OnBoardingStep.Subtext>
      <OnBoardingStep.Content>
        <OnBoardingForm
          additionalParams={{
            managementStyle: selectedManagementStyle,
            orgMemberCount: noOfEmployees,
            persona: selectedPersona,
          }}
          onSuccess={() => navigate("/")}
        />
      </OnBoardingStep.Content>
      <OnBoardingStep.PreviousButton onClick={onPreviousStep}>
        Go back
      </OnBoardingStep.PreviousButton>
    </OnBoardingStep>
  );
};

export default OrganizationName;
