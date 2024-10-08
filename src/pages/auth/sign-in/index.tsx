import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Banner from "@/design-system/ui/Banner/Banner";
import { Button } from "@/design-system/ui/Button/Button";
import { Card } from "@/design-system/ui/Card/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/design-system/ui/Form/form";
import { Input } from "@/design-system/ui/Input/Input";
import { Separator } from "@/design-system/ui/Separator/Separator";
import { Text } from "@/design-system/ui/Text/Text";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password is required.",
  }),
});

const SignIn = () => {
  const { signIn } = useAuthActions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmitHandler = async (value: z.infer<typeof formSchema>) => {
    setLoading(true);
    await signIn("password", {
      email: value.email,
      password: value.password,
      flow: "signIn",
    }).catch(() => {
      setError("Unable to login. Mismatch email and password");
    });
    setLoading(false);
  };

  return (
    <Flex>
      <Card className="w-[26rem] shadow-2xl transition-shadow">
        <Card.Header className="px-10 py-4">
          <Card.Header.Title variant="heading-2">
            Sign in seconds
          </Card.Header.Title>
        </Card.Header>
        <Card.Content className="pb-6 p-10 max-w-[26rem]">
          {error && <Banner text={error} variant="error" className="mb-4" />}
          <Flex className="pb-2" gap="gap-2">
            <Button
              variant="outline"
              icon={Github}
              onClick={() => signIn("github", { flow: "signIn" })}
              isLoading={loading}
            >
              Login with github
            </Button>
            <Button
              variant="outline"
              onClick={() => signIn("google", { flow: "signIn" })}
              isLoading={loading}
            >
              Login with Google
            </Button>
          </Flex>
          <Flex alignItems="items-center" gap="gap-2">
            <Separator className="flex-1" />
            <Text variant="subtext">Or</Text>
            <Separator className="flex-1" />
          </Flex>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(formSubmitHandler)}
              className="flex flex-col gap-5"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your work email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button isLoading={loading} type="submit">
                Login to continue
              </Button>
            </form>
          </Form>
          <Flex className="pt-6" justifyContent="justify-center">
            <Link to="/auth/forgot-password">
              <Text variant="body-1" className="text-text-link">
                Forgot password?
              </Text>
            </Link>
          </Flex>
        </Card.Content>
      </Card>
    </Flex>
  );
};

export default SignIn;
