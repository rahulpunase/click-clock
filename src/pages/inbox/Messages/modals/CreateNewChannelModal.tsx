import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import debounce from "lodash-es/debounce";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { Input } from "@/design-system/ui/Input/Input";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";
import { Switch } from "@/design-system/ui/Switch/Switch";

import { useCreateChannel } from "@/common/hooks/db/channels/mutations/useCreateChannel";
import { useMatchChannelName } from "@/common/hooks/db/channels/queries/useMatchChannelName";
import { useGetMembersWhoCanJoinChannel } from "@/common/hooks/db/organizations/queries/useGetMembersWhoCanJoinChannel";

import { api } from "@db/_generated/api";
import { Id } from "@db/_generated/dataModel";

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
  isPrivate: z.boolean().optional(),
});

const CreateNewChannelModal = () => {
  const { createNewChannelModalStore: store, channelId } = useMessageContext();
  const { data: membersWhoCanJoinChannel } = useGetMembersWhoCanJoinChannel({
    channelId: channelId as Id<"channels">,
  });
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { mutate: createChannel } = useCreateChannel({
    onSuccess: (data) => {
      navigate(`/inbox/c/${data}`);
      console.log({ data });
      store.hide();
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    createChannel({
      name: values.name,
      description: values.description,
      isPrivate: values.isPrivate,
    });
  };

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const match = useAction(api.channels.matchNameAction);

  const debounceFn = useCallback(debounce(match, 1000), [match]);

  const onChange = (e) => {
    debounceFn({
      name: e.target.value,
    });
  };

  return (
    <Dialog open={store.open} onOpenChange={store.hide}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.DialogTitle>Create new channel</Dialog.DialogTitle>
          <Dialog.DialogDescription>
            Channel allow users to connect with other users in the organization
          </Dialog.DialogDescription>
        </Dialog.Header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            placeholder="eg. My new channel"
                            type="text"
                            {...field}
                            onChange={onChange}
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
                          placeholder="Description about the channel"
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
                              Make channel private (optional)
                            </FormLabel>
                            <FormDescription>
                              Only the members can connect with each other
                            </FormDescription>
                          </Flex>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              name="isPrivate"
                            />
                          </FormControl>
                        </Flex>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card.Content>
              </Card>
              {form.watch("isPrivate") && (
                <Flex className="mt-4">
                  <MultiSelectCombo
                    data={membersWhoCanJoinChannel?.map((member) => ({
                      label: member.user?.name ?? "Unknown",
                      value: member.userId,
                    }))}
                    selected={selectedMembers}
                    setSelected={setSelectedMembers}
                    label="Add members"
                  />
                </Flex>
              )}
              <Flex className="mt-4">
                <Button type="submit">Create channel</Button>
              </Flex>
            </Flex>
          </form>
        </Form>
        <Dialog.DialogFooter></Dialog.DialogFooter>
      </Dialog.Content>
    </Dialog>
  );
};

export default CreateNewChannelModal;
