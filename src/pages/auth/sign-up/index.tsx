import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

const formSchema = z
  .object({
    email: z.string().email().min(1, {
      message: "Email must be at least 1 character.",
    }),
    fullName: z.string().min(1, {
      message: "Full name must be at least 1 character",
    }),
    password: z.string().min(1, {
      message: "Password must be at least 1 character",
    }),
    confirmPassword: z.string().min(1, {
      message: "Password must be at least 1 character",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const SignUp = () => {
  const { signIn } = useAuthActions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  const submitHandler = async ({
    fullName,
    email,
    password,
  }: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await signIn("password", {
        name: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        flow: "signUp",
      });
      navigate(`/home`);
    } catch (e) {
      // set error
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex>
      <Card className="shadow-2xl transition-shadow">
        <Card.Header className="px-10 py-4">
          <Card.Header.Title variant="heading-2">
            Sign up to get started
          </Card.Header.Title>
        </Card.Header>
        <Card.Content className="pb-6 p-8 max-w-[500px]">
          {error && <Banner text={error} variant="error" className="mb-4" />}
          <Flex className="pb-2" gap="gap-2">
            <Button
              variant="outline"
              icon={Github}
              isLoading={loading}
              onClick={() => signIn("github", { flow: "signUp" })}
            >
              Sign Up with github
            </Button>
            <Button
              variant="outline"
              isLoading={loading}
              onClick={() => signIn("google", { flow: "signUp" })}
            >
              Sign Up with Google
            </Button>
          </Flex>
          <Flex alignItems="items-center" gap="gap-2">
            <Separator className="flex-1" />
            <Text variant="subtext">Or</Text>
            <Separator className="flex-1" />
          </Flex>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(submitHandler)}
            >
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder="Create a strong password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button isLoading={loading} type="submit">
                Sign Up to continue
              </Button>
            </form>
          </Form>
        </Card.Content>
      </Card>
    </Flex>
  );
};

export default SignUp;
