import AdvancedProfileUpdate from "@/pages/settings/profile/AdvancedProfileUpdate";
import BasicProfileUpdate from "@/pages/settings/profile/BasicProfileUpdate";
import EditProfileModal from "@/pages/settings/profile/EditProfileModal";

import { Flex } from "@/design-system/layout/Flex/Flex";
import PageLook from "@/design-system/patterns/PageLook";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";
import { Text } from "@/design-system/ui/Text/Text";

import { useGetUserProfile } from "@/common/hooks/db/user/queries/useGetUserProfile";

const ProfileSettingsPage = () => {
  const { data: profile, isLoading } = useGetUserProfile();
  const modalStore = useDialogStore();

  const onEditClick = () => modalStore.show();

  return (
    <PageLook>
      <PageLook.Header>
        <PageLook.Header.Heading>Profile settings</PageLook.Header.Heading>
      </PageLook.Header>
      <PageLook.Content>
        <PageLook.Content.Main>
          <Flex>
            <Text variant="heading-3">My Profile</Text>
          </Flex>
          <Flex direction="flex-col" gap="gap-6">
            <BasicProfileUpdate
              onEditClick={onEditClick}
              isLoading={isLoading}
              profile={profile}
            />
            <AdvancedProfileUpdate
              onEditClick={onEditClick}
              isLoading={isLoading}
              profile={profile}
            />
            {modalStore.open && (
              <EditProfileModal store={modalStore} profile={profile} />
            )}
          </Flex>
        </PageLook.Content.Main>
      </PageLook.Content>
    </PageLook>
  );
};

export default ProfileSettingsPage;
