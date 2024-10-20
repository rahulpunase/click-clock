import { Flex } from "@/design-system/layout/Flex/Flex";

import LoaderAnimation from "@/common/components/AppLoader/Loader";

type AppLoaderProps = {
  label?: string;
};
const AppLoader = ({ label }: AppLoaderProps) => {
  return (
    <Flex
      className="w-full h-full animate-out fade-out"
      alignItems="items-center"
      justifyContent="justify-center"
      aria-label="app-loader"
      id="app-loader"
    >
      <LoaderAnimation label={label} />
    </Flex>
  );
};

export default AppLoader;
