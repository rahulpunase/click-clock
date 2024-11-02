import { Navigate } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";

import AmazingSideBar from "@/common/components/AmazingSideBar";
import AppLoader from "@/common/components/AppLoader";
import AllStepRenderer from "@/common/components/organization/AllStepRenderer";
import { OnBoardingStoreProvider } from "@/common/components/organization/context/OnBoardingContext";
import { useGetSelectedOrganization } from "@/common/hooks/db/organizations/useGetSelectedOrganization";

const OnBoardingPage = () => {
  const { selectedOrg, isLoading } = useGetSelectedOrganization();

  if (isLoading && !selectedOrg) {
    return <AppLoader />;
  }

  if (selectedOrg) {
    return <Navigate to="/home" replace />;
  }

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
