import { Link, Outlet, useLocation } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Text } from "@/design-system/ui/Text/Text";

const AuthLayout = () => {
  const { pathname } = useLocation();

  const isSignInPage = pathname === "/auth/sign-in";
  const linkText = isSignInPage
    ? "Don't have an account?"
    : "Already have an account?";

  const link = isSignInPage ? "/auth/sign-up" : "/auth/sign-in";
  return (
    <>
      <Flex direction="flex-col" className="h-full">
        <Flex
          className="w-full px-8 py-4"
          alignItems="items-center"
          justifyContent="justify-between"
        >
          <Text variant="heading-3">LOGO</Text>
          <Flex alignItems="items-center" gap="gap-8">
            <Link to={link}>
              <Text variant="body-1" className="text-text-link text-nowrap">
                {linkText}
              </Text>
            </Link>
            <Button className="shadow-xl" href={link}>
              {isSignInPage ? "Sign up" : "Sign in"}
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
    </>
  );
};

export default AuthLayout;
