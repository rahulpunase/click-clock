import AppLoader from "@/common/components/AppLoader";
import { useGetCurrentUser } from "@/common/hooks/useGetCurrentUser";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Text } from "@/design-system/ui/Text/Text";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { pathname } = useLocation();

  const { data, isLoading } = useGetCurrentUser();

  if (isLoading) {
    return <AppLoader />;
  }

  if (!isLoading && data) {
    return <Navigate to="/" />;
  }

  const isSignInPage = pathname === "/auth/sign-in";
  const linkText = isSignInPage
    ? "Don't have an account?"
    : "Already have an account?";

  const link = isSignInPage ? "/auth/sign-up" : "/auth/sign-in";
  return (
    <Flex direction="flex-col" className="h-full">
      <Flex
        className="w-full px-8 py-6"
        alignItems="items-center"
        justifyContent="justify-between"
      >
        <Text variant="heading-3">LOGO</Text>
        <Flex alignItems="items-center" gap="gap-8">
          <Flex>
            <Link to={link}>
              <Text variant="body-1" className="text-text-link text-nowrap">
                {linkText}
              </Text>
            </Link>
          </Flex>
          <Button
            className="shadow-xl"
            render={(props) => <Link to={link} {...props} />}
          >
            {isSignInPage ? "Sign up" : "Sign in "}
          </Button>
        </Flex>
      </Flex>
      <Flex
        flex="flex-1"
        alignItems="items-center"
        justifyContent="justify-center"
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
