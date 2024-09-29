import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/design-system/ui/Form/form";
import { Input } from "@/design-system/ui/Input/Input";

export type AddLinkModalDialogData = {
  link: string;
  text: string;
};

type AddLinkModalProps = {
  store: ReturnType<typeof useDialogStore<AddLinkModalDialogData>>;
  onSubmit: (link: string) => void;
};

const schema = z.object({
  text: z.string().min(1, { message: "Text is required" }),
  link: z.string().min(1, { message: "Link is required" }),
});
const AddLinkModal = ({ store, onSubmit }: AddLinkModalProps) => {
  const formId = useId();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: store.data?.text ?? "",
    },
  });

  useEffect(() => {
    form.setValue("text", store.data?.text ?? "");
  }, [form, store.data]);

  return (
    <Dialog open={store.open} onOpenChange={store.hide}>
      <Dialog.Content>
        <Dialog.Content.Header>
          <Dialog.Content.Header.Title>Add link</Dialog.Content.Header.Title>
        </Dialog.Content.Header>
        <Dialog.Content.Main>
          <Form {...form}>
            <form
              id={formId}
              onSubmit={form.handleSubmit(({ link }) => onSubmit(link))}
            >
              <Flex gap="gap-2" direction="flex-col">
                <FormField
                  name="text"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Engineering, HR"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="link"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.example.com"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Flex>
            </form>
          </Form>
        </Dialog.Content.Main>
        <Dialog.Content.Footer>
          <Flex gap="gap-2">
            <Button variant="outline" onClick={store.hide}>
              Cancel
            </Button>
            <Button type="submit" form={formId} variant="default">
              Add link
            </Button>
          </Flex>
        </Dialog.Content.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default AddLinkModal;
