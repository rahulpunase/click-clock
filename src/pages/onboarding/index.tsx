import { useNavigate } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Card } from "@/design-system/ui/Card/Card";
import { Text } from "@/design-system/ui/Text/Text";

import OnBoardingForm from "@/common/components/onboarding/OnBoardingForm";
import { UserProfileDropdown } from "@/common/components/sidebar/UserProfileDropdown";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";

const OnBoardingPage = () => {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUser();

  return (
    <Flex
      className="w-full h-full"
      alignItems="items-center"
      justifyContent="justify-center"
      data-component="onboarding-page"
      direction="flex-col"
      gap="gap-4"
    >
      <Flex>
        <Text variant="heading-2">Hello, {user?.name ?? ""}</Text>
      </Flex>
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
      <UserProfileDropdown />
    </Flex>
  );
};

export default OnBoardingPage;
