import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Card } from "@/design-system/ui/Card/Card";
import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/design-system/ui/Form/form";
import IconSelector, {
  type OnChangeParam,
} from "@/design-system/ui/IconSelector/IconSelector";
import { Input } from "@/design-system/ui/Input/input";
import { Switch } from "@/design-system/ui/Switch/Switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../../convex/_generated/api";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  icon: z.string(),
  color: z.string(),
  description: z.string().optional(),
  isPrivate: z.boolean(),
});

const CreateNewSpaceModal = ({
  store,
}: {
  store: ReturnType<typeof useDialogStore>;
}) => {
  const createSpace = useAction(api.spaces.create);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
      color: "",
      description: "",
      isPrivate: false,
    },
  });

  const onIconSelectorChange = (data: OnChangeParam) => {
    form.setValue("color", data.color);
    form.setValue("icon", data.icon);
  };

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    await createSpace({
      color: values.color,
      icon: values.icon,
      isPrivate: values.isPrivate,
      name: values.name,
    });
    store.hide();
  };

  return (
    <Dialog open={store.open} onOpenChange={store.hide}>
      <Dialog.DialogContent>
        <Dialog.DialogHeader>
          <Dialog.DialogTitle>Create new space</Dialog.DialogTitle>
          <Dialog.DialogDescription>
            A Space represents teams, departments, or groups, each with its own
            Lists, workflows, and settings.
          </Dialog.DialogDescription>
        </Dialog.DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <Flex direction="flex-col" gap="gap-2">
              <Flex className="w-full" alignItems="items-center" gap="gap-2">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Icon & name</FormLabel>
                      <Flex gap="gap-2">
                        <IconSelector onChange={onIconSelectorChange} />
                        <FormControl>
                          <Input
                            placeholder="eg. Engineering, HR"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                      </Flex>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Flex>
              <Flex>
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Some good things about the space"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Flex>
              <Card className="mt-4">
                <Card.Content>
                  <FormField
                    name="isPrivate"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Flex justifyContent="justify-between">
                          <Flex direction="flex-col" className="gap-1">
                            <FormLabel>Make space private (optional)</FormLabel>
                            <FormDescription>
                              Receive emails about new products, features, and
                              more.
                            </FormDescription>
                          </Flex>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </Flex>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card.Content>
              </Card>
              <Flex className="mt-4">
                <Button type="submit">Create Space</Button>
              </Flex>
            </Flex>
          </form>
        </Form>
      </Dialog.DialogContent>
    </Dialog>
  );
};

export default CreateNewSpaceModal;
