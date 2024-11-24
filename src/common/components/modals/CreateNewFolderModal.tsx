import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
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

import { useCreateEditFolder } from "@/common/hooks/db/folders/mutations/useCreateEditFolder";
import { useGlobalModalContext } from "@/common/hooks/useGlobalModalContext";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().optional(),
});

const CreateNewFolderModal = () => {
  const { createNewFolderModalStore } = useGlobalModalContext();
  const { mutate: createEditFolder } = useCreateEditFolder();

  const formId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    if (createNewFolderModalStore.data?.spaceId) {
      createEditFolder(
        {
          name: values.name,
          spaceId: createNewFolderModalStore.data.spaceId,
          parentFolderId: createNewFolderModalStore.data.parentFolderId,
        },
        {
          onSuccess: createNewFolderModalStore.hide,
        },
      );
    }
  };

  return (
    <Dialog
      open={createNewFolderModalStore.open}
      onOpenChange={createNewFolderModalStore.hide}
    >
      <Dialog.Content>
        <Dialog.Content.Header>
          <Dialog.Content.Header.Title>
            Create new folder
          </Dialog.Content.Header.Title>
          <Dialog.Content.Header.Description>
            A folder will keep you work organized.
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
            Create Folder
          </Button>
        </Dialog.Content.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default CreateNewFolderModal;
