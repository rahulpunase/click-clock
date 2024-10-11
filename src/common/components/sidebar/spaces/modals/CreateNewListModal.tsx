import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Card } from "@/design-system/ui/Card/Card";
import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/design-system/ui/Form/form";
import { Input } from "@/design-system/ui/Input/Input";
import { Switch } from "@/design-system/ui/Switch/Switch";

import { useSpaceContext } from "@/common/components/sidebar/spaces/context/SpaceListContext";
import { useCreateList } from "@/common/hooks/db/lists/mutations/useCreateList";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().optional(),
  isPrivate: z.boolean(),
});

const CreateNewListModal = () => {
  const { createNewListModalStore } = useSpaceContext();
  const { mutate: createList } = useCreateList();

  const formId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      isPrivate: false,
    },
  });

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    console.log(createNewListModalStore.data);
    if (createNewListModalStore.data?.spaceId) {
      createList(
        {
          name: values.name,
          spaceId: createNewListModalStore.data.spaceId,
          parentFolderId: createNewListModalStore.data.parentFolderId,
          isPrivate: false,
          description: values.description,
        },
        {
          onSuccess: createNewListModalStore.hide,
        },
      );
    }
  };

  return (
    <Dialog
      open={createNewListModalStore.open}
      onOpenChange={createNewListModalStore.hide}
    >
      <Dialog.Content>
        <Dialog.Content.Header>
          <Dialog.Content.Header.Title>
            Create new list
          </Dialog.Content.Header.Title>
          <Dialog.Content.Header.Description>
            List is used to organize the task, epic and todos.
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
                        <FormLabel>Name</FormLabel>
                        <Flex gap="gap-2">
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
                                  Make this list private (optional)
                                </FormLabel>
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
              </Flex>
            </form>
          </Form>
        </Dialog.Content.Main>
        <Dialog.Content.Footer>
          <Button type="submit" form={formId}>
            Create new list
          </Button>
        </Dialog.Content.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export { CreateNewListModal };
