import { zodResolver } from "@hookform/resolvers/zod";
import omit from "lodash-es/omit";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Avatar } from "@/design-system/ui/Avatar/Avatar";
import { Button } from "@/design-system/ui/Button/Button";
import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/design-system/ui/Form/form";
import { Input } from "@/design-system/ui/Input/Input";
import { Separator } from "@/design-system/ui/Separator/Separator";
import { Text } from "@/design-system/ui/Text/Text";
import { Textarea } from "@/design-system/ui/Textarea/Textarea";

import { useUpdateProfile } from "@/common/hooks/db/user/mutations/useUpdateProfile";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";
import type { useGetUserProfile } from "@/common/hooks/db/user/queries/useGetUserProfile";

type EditProfileModalProps = {
  profile: ReturnType<typeof useGetUserProfile>["data"];
  store: ReturnType<typeof useDialogStore>;
};

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  email: z.string().email(),
  bio: z.string().optional(),
  orgRole: z.string().optional(),
  nickName: z.string().optional(),
  phone: z.string().optional(),
});

const EditProfileModal = ({ profile, store }: EditProfileModalProps) => {
  const { data: user } = useGetCurrentUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const name = (profile?.name ?? user?.name)?.split(" ");
  const emailAddress = profile?.email ?? user?.email;

  const formId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: name?.[0],
      lastName: name?.[1],
      email: emailAddress,
      bio: profile?.bio,
      nickName: profile?.nickName,
      orgRole: profile?.orgRole,
    },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = omit(values, "firstName", "lastName");
    updateProfile(
      {
        ...payload,
        name: values.firstName + " " + values.lastName,
      },
      {
        onSuccess: () => store.hide(),
      },
    );
  };

  return (
    <Dialog open onOpenChange={store.hide}>
      <Dialog.Content>
        <Dialog.Content.Header>
          <Dialog.Content.Header.Title>
            Edit profile
          </Dialog.Content.Header.Title>
        </Dialog.Content.Header>
        <Dialog.Content.Main>
          <Flex className="flex-col">
            <Flex direction="flex-col" gap="gap-2">
              <Avatar className="border border-accent-border size-20">
                <Avatar.AvatarFallback>
                  {profile?.name[0]}
                </Avatar.AvatarFallback>
              </Avatar>
              <Flex>
                <Flex direction="flex-col" flex="flex-1">
                  <Text variant="heading-2">
                    {form.watch("firstName") + " " + form.watch("lastName")}
                  </Text>
                  <Text variant="subtext-1">{form.watch("email")}</Text>
                </Flex>
                <Flex alignItems="items-center">
                  <Button variant="secondary" icon="link" size="sm">
                    Copy link
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Flex className="mt-6">
              <Form {...form}>
                <form
                  className="w-full"
                  id={formId}
                  onSubmit={form.handleSubmit(onFormSubmit)}
                >
                  <Flex gap="gap-4" direction="flex-col">
                    <Flex gap="gap-2">
                      <FormField
                        name="firstName"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full flex-1">
                            <FormControl>
                              <Input
                                icon="user"
                                placeholder="First name"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="lastName"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full flex-1">
                            <FormControl>
                              <Input
                                icon="user"
                                placeholder="Last name"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Flex>
                    <Flex>
                      <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full flex-1">
                            <FormControl>
                              <Input
                                icon="mail"
                                placeholder="Last name"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Flex>
                    <Flex>
                      <FormField
                        name="orgRole"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full flex-1">
                            <FormControl>
                              <Input
                                icon="briefcase"
                                placeholder="Role"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Flex>
                    <Separator />
                    <Flex>
                      <FormField
                        name="bio"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full flex-1">
                            <FormControl>
                              <Textarea placeholder="Bio" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Flex>
                    <Separator />
                    <Flex className="flex-1" gap="gap-2">
                      <FormField
                        name="nickName"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full flex-1">
                            {/* <FormLabel>Display name</FormLabel> */}
                            <FormControl>
                              <Input
                                icon="user"
                                placeholder="Display name"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="phone"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full flex-1">
                            {/* <FormLabel>Display name</FormLabel> */}
                            <FormControl>
                              <Input
                                icon="phone"
                                placeholder="Phone number"
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
            </Flex>
          </Flex>
        </Dialog.Content.Main>
        <Dialog.Content.Footer>
          <Flex gap="gap-3">
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
            <Button form={formId} type="submit" isLoading={isPending}>
              Save
            </Button>
          </Flex>
        </Dialog.Content.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default EditProfileModal;
