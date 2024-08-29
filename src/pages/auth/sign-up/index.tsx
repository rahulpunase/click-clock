import { Flex } from "@/design-system/layout/Flex/Flex";
import { Card } from "@/design-system/ui/Card/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/design-system/ui/Form/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/design-system/ui/Input/input";
import { Button } from "@/design-system/ui/Button/Button";
import { Text } from "@/design-system/ui/Text/Text";
import { Separator } from "@/design-system/ui/Separator/Separator";
import { useAuthActions } from "@convex-dev/auth/react";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const SignUp = () => {
  const { signIn } = useAuthActions();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <Flex>
      <Card className="w-[26rem] shadow-2xl shadow-primary">
        <Card.Header className="px-10 py-4">
          <Card.Header.Title variant="heading-2">
            Sign up to get started
          </Card.Header.Title>
        </Card.Header>
        <Card.Content className="pb-6 p-10">
          <Flex className="pb-2" gap="gap-2">
            <Button
              variant="outline"
              icon="Github"
              onClick={() => signIn("github")}
            >
              Sign Up with github
            </Button>
            <Button variant="outline" onClick={() => signIn("google")}>
              Sign Up with Google
            </Button>
          </Flex>
          <Flex alignItems="items-center" gap="gap-2">
            <Separator className="flex-1" />
            <Text variant="subtext">Or</Text>
            <Separator className="flex-1" />
          </Flex>
          <Form {...form}>
            <form action="" className="flex flex-col gap-5">
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
              <Button type="submit">Sign Up to continue</Button>
            </form>
          </Form>
        </Card.Content>
      </Card>
    </Flex>
  );
};

export default SignUp;
