import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
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
import { Input } from "@/design-system/ui/Input/input";

import { useSpaceContext } from "@/common/components/sidebar/spaces/context/SpaceListContext";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().optional(),
});

const CreateNewFolderModal = () => {
  const { createNewFolderModalStore } = useSpaceContext();
  const createFolder = useMutation(api.folders.create);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    if (createNewFolderModalStore.data?.spaceId) {
      await createFolder({
        name: values.name,
        spaceId: createNewFolderModalStore.data.spaceId as Id<"spaces">,
      });
    }
    createNewFolderModalStore.hide();
  };

  return (
    <Dialog
      open={createNewFolderModalStore.open}
      onOpenChange={createNewFolderModalStore.hide}
    >
      <Dialog.DialogContent>
        <Dialog.DialogHeader>
          <Dialog.DialogTitle>Create new folder</Dialog.DialogTitle>
          <Dialog.DialogDescription>
            A folder will keep you work organized.
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
              <Flex className="mt-4">
                <Button type="submit">Create Folder</Button>
              </Flex>
            </Flex>
          </form>
        </Form>
      </Dialog.DialogContent>
    </Dialog>
  );
};

export { CreateNewFolderModal };
