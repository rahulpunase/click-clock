import { useNavigate } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Card } from "@/design-system/ui/Card/Card";

import OnBoardingForm from "@/common/components/onboarding/OnBoardingForm";

const OnBoardingPage = () => {
  const navigate = useNavigate();

  return (
    <Flex
      className="w-full h-full"
      alignItems="items-center"
      justifyContent="justify-center"
      data-component="onboarding-page"
    >
      <Card className="w-[420px] flex-none">
        <Card.Header>
          <Card.Header.Title>Create an organization</Card.Header.Title>
          <Card.Header.Subtext>
            The organization will help create your data grouped
          </Card.Header.Subtext>
        </Card.Header>
        <Card.Content className="pb-4">
          <OnBoardingForm onSuccess={() => navigate("/")} />
        </Card.Content>
      </Card>
    </Flex>
  );
};

export default OnBoardingPage;
