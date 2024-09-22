import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Card } from "@/design-system/ui/Card/Card";
import { Dialog } from "@/design-system/ui/Dialog/Dialog";
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
import { Input } from "@/design-system/ui/Input/Input";
import { Switch } from "@/design-system/ui/Switch/Switch";
import { useToast } from "@/design-system/ui/Toast/useToast";

import { useSpaceContext } from "@/common/components/sidebar/spaces/context/SpaceListContext";
import { useCreateEditSpace } from "@/common/hooks/db/spaces/mutations/useCreateEditSpace";
import { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";

import { Id } from "@db/_generated/dataModel";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  icon: z.string(),
  color: z.string(),
  description: z.string().optional(),
  isPrivate: z.boolean(),
});

const CreateNewSpaceModal = () => {
  const { createSpaceModalStore } = useSpaceContext();

  const isEditFlow = createSpaceModalStore.data?.flow === "edit";

  const { mutate: createOrEditSpace } = useCreateEditSpace();

  const { data: spaces } = useGetSpaces();

  const showToast = useToast();

  const formId = useId();

  const spaceToEdit = spaces.find(
    (space) => space._id === createSpaceModalStore.data?.spaceId,
  );

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

  useEffect(() => {
    if (spaceToEdit) {
      form.setValue("name", spaceToEdit.name);
      form.setValue("description", spaceToEdit.description);
      form.setValue("color", spaceToEdit.color ?? "");
      form.setValue("icon", spaceToEdit.icon ?? "");
      form.setValue("isPrivate", spaceToEdit.isPrivate ?? false);
    }
  }, [spaceToEdit]);

  const onIconSelectorChange = (data: OnChangeParam) => {
    form.setValue("color", data.color);
    form.setValue("icon", data.icon);
  };

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    createOrEditSpace(
      {
        color: values.color,
        icon: values.icon,
        isPrivate: values.isPrivate,
        name: values.name,
        spaceId: createSpaceModalStore.data?.spaceId as Id<"spaces">,
        description: values.description,
      },
      {
        onSuccess: () => {
          createSpaceModalStore.hide();
          showToast.toast({
            title: "Space created successfully",
            variant: "default",
          });
        },
      },
    );
  };

  return (
    <Dialog
      open={createSpaceModalStore.open}
      onOpenChange={createSpaceModalStore.hide}
    >
      <Dialog.Content>
        <Dialog.Content.Header>
          <Dialog.Content.Header.Title>
            {isEditFlow ? "Edit space" : "Create new space"}
          </Dialog.Content.Header.Title>
          <Dialog.Content.Header.Description>
            A Space represents teams, departments, or groups, each with its own
            Lists, workflows, and settings.
          </Dialog.Content.Header.Description>
        </Dialog.Content.Header>
        <Dialog.Content.Main>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} id={formId}>
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
                              <FormLabel>
                                Make space private (optional)
                              </FormLabel>
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
              </Flex>
            </form>
          </Form>
        </Dialog.Content.Main>
        <Dialog.Content.Footer>
          <Button type="submit" form={formId}>
            Create Space
          </Button>
        </Dialog.Content.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export { CreateNewSpaceModal };
