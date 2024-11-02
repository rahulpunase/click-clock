import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/design-system/ui/Input/Input";

import { useCreateOrganization } from "@/common/hooks/db/organizations/mutations/useCreateOrganization";

import { Doc } from "@db/_generated/dataModel";

const formSchema = z.object({
  organizationName: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
});

type AdditionalParams = Pick<
  Doc<"organizations">,
  "persona" | "orgMemberCount" | "managementStyle"
>;
const OnBoardingForm = ({
  onSuccess,
  additionalParams,
}: {
  onSuccess?: () => void;
  additionalParams?: AdditionalParams;
}) => {
  const { mutate: createOrg, isPending } = useCreateOrganization();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    createOrg(
      {
        name: values.organizationName,
        ...additionalParams,
      },
      {
        onSuccess,
      },
    );
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
          <Button type="submit" isLoading={isPending}>
            Create
          </Button>
        </Flex>
      </form>
    </Form>
  );
};

export default OnBoardingForm;
