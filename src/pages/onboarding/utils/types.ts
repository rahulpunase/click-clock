export type StepProps = {
  onNextStep: () => void;
  onPreviousStep?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
};
