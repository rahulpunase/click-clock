import { useNavigate } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";

import AllStepRenderer from "@/pages/onboarding/components/AllStepRenderer";
import { OnBoardingStoreProvider } from "@/pages/onboarding/context/OnBoardingContext";

import AmazingSideBar from "@/common/components/AmazingSideBar";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";

const OnBoardingPage = () => {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUser();

  return (
    <OnBoardingStoreProvider>
      <Flex
        className="w-full h-full px-2"
        data-component="onboarding-page"
        direction="flex-row"
        gap="gap-4"
      >
        <AmazingSideBar />
        <AllStepRenderer />
      </Flex>
    </OnBoardingStoreProvider>
  );
};

export default OnBoardingPage;
