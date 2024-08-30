import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/design-system/ui/Form/form";
import { Input } from "@/design-system/ui/Input/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../convex/_generated/api";

const formSchema = z.object({
  organizationName: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
});

const OnBoardingForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const createOrganization = useMutation(api.organizations.create);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    await createOrganization({
      name: values.organizationName,
    });
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <Flex gap="gap-4" direction="flex-col">
          <FormField
            name="organizationName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>*Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </Flex>
      </form>
    </Form>
  );
};

export default OnBoardingForm;